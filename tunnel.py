"""
외부 인터넷망(LTE/5G) 모바일 접속 경로 생성기 (별도 실행 프로그램)
- 서비스 UI에는 어떠한 시연용 요소도 노출하지 않고,
- 로컬 서버(127.0.0.1:8787)로 연결되는 외부 HTTPS 터널 경로만 유지합니다.
"""
import atexit
import os
import re
import socket
import subprocess
import sys
import time
import urllib.parse
import webbrowser
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding="utf-8")
except Exception:
    pass

PORT = int(os.environ.get("PORT", "8787"))
BASE = Path(__file__).resolve().parent


def is_server_up() -> bool:
    try:
        with socket.create_connection(("127.0.0.1", PORT), timeout=1.0):
            return True
    except OSError:
        return False


def get_lan_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"


def main():
    if not is_server_up():
        print(f"[1/2] 로컬 서비스 서버(server.py, 포트 {PORT})를 시작합니다...")
        srv = subprocess.Popen([sys.executable, str(BASE / "server.py")], cwd=str(BASE))
        atexit.register(lambda: srv.terminate() if srv.poll() is None else None)
        for _ in range(20):
            if is_server_up():
                break
            time.sleep(0.3)
    else:
        print(f"[1/2] 이미 실행 중인 로컬 서버(127.0.0.1:{PORT})에 연결합니다.")

    lan_url = f"http://{get_lan_ip()}:{PORT}"
    print(f"      같은 Wi-Fi 접속 주소 : {lan_url}")
    print("\n[2/2] 다른 인터넷망(LTE/5G) 접속용 HTTPS 터널을 연결 중입니다...")
    print("      (이 창을 닫지 마세요. 창이 열려 있는 동안 모바일 접속 경로가 유지됩니다.)\n")

    opened_qr = False
    while True:
        proc = None
        try:
            proc = subprocess.Popen(
                [
                    "ssh", "-T",
                    "-o", "StrictHostKeyChecking=accept-new",
                    "-o", "ServerAliveInterval=30",
                    "-o", "ServerAliveCountMax=3",
                    "-R", f"80:127.0.0.1:{PORT}",
                    "nokey@localhost.run",
                ],
                stdin=subprocess.PIPE,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
                encoding="utf-8",
                errors="replace",
            )
            atexit.register(lambda p=proc: p.terminate() if p.poll() is None else None)
            for line in proc.stdout:
                clean = re.sub(r"\x1b\[[0-9;]*[a-zA-Z]", "", line)
                m = re.search(r"https://[a-z0-9]+\.lhr\.life", clean)
                if m:
                    t_url = m.group(0)
                    qr_url = "https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=20&data=" + urllib.parse.quote(t_url, safe="")
                    print("=" * 68)
                    print(f"  [외부망(LTE/5G) 모바일 접속 주소] : {t_url}")
                    print(f"  [같은 Wi-Fi 모바일 접속 주소]     : {lan_url}")
                    print(f"  [고화질 QR코드 이미지 창]         : {qr_url}")
                    print("=" * 68)
                    if not opened_qr and os.environ.get("NO_QR_POPUP") != "1":
                        opened_qr = True
                        webbrowser.open(qr_url)
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"[터널 재연결 대기] {e}")
        finally:
            if proc and proc.poll() is None:
                try:
                    proc.terminate()
                except Exception:
                    pass
        time.sleep(3)


if __name__ == "__main__":
    main()

