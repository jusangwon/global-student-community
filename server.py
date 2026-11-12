"""
GlobalTalk demo server
- index.html 을 서빙하고
- /api/translate 요청을 Gemini API로 중계합니다. (API 키는 브라우저에 노출되지 않음)

키 위치: ../keys/gemkey  (키 문자열 한 줄)
실행:    python server.py   ->  http://localhost:8787
"""
import atexit
import json
import os
import re
import socket
import subprocess
import time
import sys
import threading
import urllib.error
import urllib.request
import webbrowser
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

BASE = Path(__file__).resolve().parent
POSTS_FILE = BASE / "posts.json"
POSTS_LOCK = threading.Lock()
KEY_FILE = BASE.parent / "keys" / "gemkey"
FALLBACK_KEY_FILE = BASE.parent.parent / "service befor edit" / "keys" / "gemkey"
# 앞에서부터 차례로 시도. 하루 할당량 소진·모델 종료 시 자동으로 다음 모델 사용.
# 바꾸려면: set GEMINI_MODEL=모델1,모델2
MODELS = [m.strip() for m in os.environ.get(
    "GEMINI_MODEL", "gemini-flash-lite-latest,gemini-flash-latest,gemini-2.5-flash").split(",") if m.strip()]
DEAD = set()
PORT = int(os.environ.get("PORT", "8787"))
STATE = {"model": MODELS[0], "tunnelUrl": "", "lanUrl": ""}

LANG_NAMES = {
    "ko": "Korean", "ja": "Japanese", "en": "English", "ru": "Russian",
    "zh": "Simplified Chinese", "es": "Spanish", "fr": "French",
    "de": "German", "vi": "Vietnamese", "mn": "Mongolian (Cyrillic)",
    "th": "Thai", "id": "Indonesian", "uz": "Uzbek (Latin)",
}

STATIC = {
    "/": ("index.html", "text/html; charset=utf-8"),
    "/index.html": ("index.html", "text/html; charset=utf-8"),
    "/styles.css": ("styles.css", "text/css; charset=utf-8"),
    "/app.js": ("app.js", "text/javascript; charset=utf-8"),
    "/manifest.json": ("manifest.json", "application/manifest+json; charset=utf-8"),
    "/image/profile/profile_icon.svg": ("image/profile/profile_icon.svg", "image/svg+xml; charset=utf-8"),
}

RESPONSE_SCHEMA = {
    "type": "OBJECT",
    "properties": {
        "items": {
            "type": "ARRAY",
            "items": {
                "type": "OBJECT",
                "properties": {
                    "id": {"type": "STRING"},
                    "sourceLang": {"type": "STRING"},
                    "translation": {"type": "STRING"},
                },
                "required": ["id", "sourceLang", "translation"],
            },
        }
    },
    "required": ["items"],
}


def read_key() -> str:
    env_key = os.environ.get("GEMINI_API_KEY", "").strip()
    if env_key:
        return env_key
    for candidate in (BASE / "keys" / "gemkey", KEY_FILE, FALLBACK_KEY_FILE):
        try:
            raw = candidate.read_text(encoding="utf-8-sig").strip()
            if raw:
                if "=" in raw:
                    raw = raw.split("=", 1)[1].strip().strip('"').strip("'")
                return raw.splitlines()[0].strip()
        except FileNotFoundError:
            continue
    return ""


def translate(target: str, items: list) -> list:
    key = read_key()
    if not key:
        raise RuntimeError("keys/gemkey 파일이 비어 있습니다. Gemini API 키를 넣어주세요.")

    lang_name = LANG_NAMES.get(target, target)
    prompt = f"""You are the real-time translation engine of a global social network (like X/Twitter).
Translate the "text" of every post below into {lang_name} (language code: {target}).

Rules:
- Sound like a native {lang_name} speaker writing a casual social media post. Keep the original tone and nuance.
- Keep emojis, @mentions, URLs, HTML tags like <br>, and placeholders in curly braces like {{lang}} or {{n}} exactly as they are.
- Translate hashtag words too, but keep the leading "#" and no spaces inside a hashtag.
- If a post is already written in {lang_name}, return it unchanged.
- Never add notes, quotes or explanations.
- "sourceLang" = ISO 639-1 code of the post's original language (e.g. ko, ja, en, ru, zh, es).
- Return every id exactly once.

Posts (JSON):
{json.dumps(items, ensure_ascii=False)}"""

    last_err = "사용 가능한 Gemini 모델이 없습니다."
    for model in [m for m in MODELS if m not in DEAD]:
        gen_cfg = {
            "temperature": 0.3,
            "responseMimeType": "application/json",
            "responseSchema": RESPONSE_SCHEMA,
        }
        if model.startswith("gemini-2.5-flash"):
            gen_cfg["thinkingConfig"] = {"thinkingBudget": 0}  # 번역은 빠르게

        body = json.dumps({
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": gen_cfg,
        }).encode("utf-8")
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"
        req = urllib.request.Request(url, data=body, method="POST", headers={
            "Content-Type": "application/json",
            "x-goog-api-key": key,
        })
        for attempt in range(2):
            try:
                with urllib.request.urlopen(req, timeout=90) as resp:
                    data = json.loads(resp.read().decode("utf-8"))
                parts = data["candidates"][0]["content"]["parts"]
                text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
                STATE["model"] = model
                return json.loads(text)["items"]
            except urllib.error.HTTPError as e:
                detail = e.read().decode("utf-8", "replace")
                try:
                    detail = json.loads(detail)["error"]["message"]
                except Exception:
                    pass
                last_err = f"Gemini API 오류 ({e.code}, {model}): {str(detail).splitlines()[0][:200]}"
                m = re.search(r"retry in ((?:\d+h)?(?:\d+m)?[\d.]+s)", str(detail))
                daily = "PerDay" in str(detail) or (m and ("h" in m.group(1) or "m" in m.group(1).rstrip("s")))
                if e.code in (400, 403, 404) or (e.code == 429 and daily):
                    # 모델 종료 / 하루 할당량 소진 → 이번 실행 동안 이 모델은 건너뜀
                    DEAD.add(model)
                    print(f"[model] {model} 사용 불가 ({e.code}) → 다음 모델로")
                    break
                if e.code in (429, 500, 503) and attempt == 0:
                    sec = re.match(r"([\d.]+)s$", m.group(1)) if m else None
                    wait = min(float(sec.group(1)) + 1 if sec else 8, 40)
                    print(f"[rate-limit] {e.code} {model} → {wait:.0f}s 뒤 다시 시도")
                    time.sleep(wait)
                    continue
                print(f"[model] {model} 실패 ({e.code}) → 다음 모델로")
                break
            except (urllib.error.URLError, TimeoutError, KeyError, ValueError) as e:
                last_err = f"{model}: {e}"
                break
    raise RuntimeError(last_err)


def load_posts():
    if not POSTS_FILE.exists():
        return None
    try:
        return json.loads(POSTS_FILE.read_text(encoding="utf-8"))
    except Exception:
        return None


def save_posts(posts: list):
    POSTS_FILE.write_text(json.dumps(posts, ensure_ascii=False, indent=2), encoding="utf-8")


PLACES_FILE = BASE / "places.json"


def load_places():
    if not PLACES_FILE.exists():
        return None
    try:
        return json.loads(PLACES_FILE.read_text(encoding="utf-8"))
    except Exception:
        return None


def save_places(places: list):
    PLACES_FILE.write_text(json.dumps(places, ensure_ascii=False, indent=2), encoding="utf-8")


class Handler(BaseHTTPRequestHandler):
    def _send(self, code, payload, ctype="application/json; charset=utf-8"):
        body = payload if isinstance(payload, bytes) else json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        path = self.path.split("?")[0]
        if path in STATIC:
            name, ctype = STATIC[path]
            target_file = (BASE.parent / name) if (name.startswith("image/") and (BASE.parent / name).exists()) else (BASE / name)
            self._send(200, target_file.read_bytes(), ctype)
        elif path == "/api/status":
            self._send(200, {
                "hasKey": bool(read_key()),
                "model": STATE["model"],
            })
        elif path == "/api/posts":
            with POSTS_LOCK:
                self._send(200, {"posts": load_posts()})
        elif path == "/api/places":
            with POSTS_LOCK:
                self._send(200, {"places": load_places()})
        else:
            self._send(404, {"error": "not found"})

    def do_POST(self):
        path = self.path.split("?")[0]
        if path == "/api/places":
            try:
                length = int(self.headers.get("Content-Length", 0))
                if length > 3_000_000:
                    return self._send(413, {"error": "too large"})
                req = json.loads(self.rfile.read(length).decode("utf-8"))
                action = req.get("action")
                with POSTS_LOCK:
                    cur = load_places()
                    if action == "init":
                        if cur is None and isinstance(req.get("places"), list):
                            cur = req["places"]
                            save_places(cur)
                    elif action == "save" and isinstance(req.get("places"), list):
                        cur = req["places"]
                        save_places(cur)
                return self._send(200, {"places": cur})
            except Exception as e:
                print(f"[places error] {e}")
                return self._send(500, {"error": str(e)})
        if path == "/api/posts":
            try:
                length = int(self.headers.get("Content-Length", 0))
                if length > 2_000_000:
                    return self._send(413, {"error": "too large"})
                req = json.loads(self.rfile.read(length).decode("utf-8"))
                action = req.get("action")
                with POSTS_LOCK:
                    cur = load_posts()
                    if action == "init":
                        if cur is None and isinstance(req.get("posts"), list):
                            cur = req["posts"]
                            save_posts(cur)
                    elif action == "add" and isinstance(req.get("post"), dict):
                        cur = cur if isinstance(cur, list) else []
                        cur.insert(0, req["post"])
                        save_posts(cur)
                    elif action == "update":
                        cur = cur if isinstance(cur, list) else []
                        pid = req.get("id")
                        field = req.get("field")
                        if pid and field in ("comments", "reacts", "reports"):
                            for p in cur:
                                if p.get("id") == pid:
                                    p[field] = req.get("value")
                                    break
                            save_posts(cur)
                    elif action == "reset":
                        if POSTS_FILE.exists():
                            POSTS_FILE.unlink()
                        cur = None
                return self._send(200, {"posts": cur})
            except Exception as e:
                print(f"[posts error] {e}")
                return self._send(500, {"error": str(e)})

        if path != "/api/translate":
            return self._send(404, {"error": "not found"})
        try:
            length = int(self.headers.get("Content-Length", 0))
            if length > 400_000:
                return self._send(413, {"error": "too large"})
            req = json.loads(self.rfile.read(length).decode("utf-8"))
            target = str(req["target"])[:5]
            items = [{"id": str(i["id"]), "text": str(i["text"])[:2000]} for i in req["items"][:300]]
            out = translate(target, items)
            print(f"[translate] {len(items)} posts -> {target}")
            self._send(200, {"items": out})
        except Exception as e:
            print(f"[error] {e}")
            self._send(500, {"error": str(e)})

    def log_message(self, *args):
        pass


def get_lan_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"


if __name__ == "__main__":
    url = f"http://localhost:{PORT}"
    lan_ip = get_lan_ip()
    print(f"PC 접속 주소          ->  {url}")
    print(f"모바일(같은 Wi-Fi)    ->  http://{lan_ip}:{PORT}")
    print(f"Gemini models         ->  {' → '.join(MODELS)}")
    print(f"API key               ->  {'OK' if read_key() else 'MISSING (' + str(KEY_FILE) + ')'}")
    if os.environ.get("NO_BROWSER") != "1" and not os.environ.get("RENDER") and not os.environ.get("RAILWAY_ENVIRONMENT"):
        try:
            threading.Timer(0.8, lambda: webbrowser.open(url)).start()
        except Exception:
            pass
    ThreadingHTTPServer(("0.0.0.0", PORT), Handler).serve_forever()

