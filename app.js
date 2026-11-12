/* ================= 데이터 ================= */
const TAGS = {
  '돼지고기': {zh:'猪肉', en:'Pork', vi:'Thịt heo', ja:'豚肉'},
  '소고기':   {zh:'牛肉', en:'Beef', vi:'Thịt bò', ja:'牛肉'},
  '해산물':   {zh:'海鲜', en:'Seafood', vi:'Hải sản', ja:'海産物'},
  '계란':     {zh:'鸡蛋', en:'Egg', vi:'Trứng', ja:'卵'},
  '유제품':   {zh:'乳制品', en:'Dairy', vi:'Sữa', ja:'乳製品'},
  '밀':       {zh:'小麦', en:'Wheat (gluten)', vi:'Lúa mì', ja:'小麦'},
  '대두':     {zh:'大豆', en:'Soy', vi:'Đậu nành', ja:'大豆'}
};

const STORE = {
  '한식당': {zh:'韩式餐厅', en:'Korean restaurant', vi:'Quán Hàn Quốc', ja:'韓国料理店'},
  '고깃집': {zh:'烤肉店', en:'Korean BBQ', vi:'Quán nướng Hàn Quốc', ja:'焼肉店'},
  '분식':   {zh:'韩式小吃店', en:'Korean snack bar', vi:'Quán ăn vặt Hàn Quốc', ja:'韓国の軽食店'},
  '중식당': {zh:'中餐厅', en:'Chinese restaurant', vi:'Quán Trung Hoa', ja:'中華料理店'},
  '일식당': {zh:'日式餐厅', en:'Japanese restaurant', vi:'Quán Nhật Bản', ja:'日本料理店'},
  '치킨집': {zh:'炸鸡店', en:'Chicken shop', vi:'Quán gà rán', ja:'チキン店'},
  '카페':   {zh:'咖啡店', en:'Café', vi:'Quán cà phê', ja:'カフェ'}
};

const SPICY = {
  zh:['不辣','微辣','辣','很辣'],
  en:['Not spicy','Mild','Spicy','Very spicy'],
  vi:['Không cay','Hơi cay','Cay','Rất cay'],
  ja:['辛くない','少し辛い','辛い','とても辛い']
};

const ORDER_TPL = {
  zh: n => `请给我一份${n}。`,
  en: n => `One ${n}, please.`,
  vi: n => `Cho tôi một ${n}.`,
  ja: n => `${n}を一つください。`
};

const LABEL = {
  spice:    {zh:'辣度', en:'Spice level', vi:'Độ cay', ja:'辛さ'},
  say:      {zh:'点餐时这样说', en:'Say this to order', vi:'Nói câu này khi gọi món', ja:'注文はこう言います'},
  warnPre:  {zh:'含有你要避开的食材：', en:'Contains an ingredient you avoid: ', vi:'Có nguyên liệu bạn cần tránh: ', ja:'避けたい食材が含まれます：'},
  noTag:    {zh:'未标注过敏原', en:'No listed allergens', vi:'Không ghi nhận dị ứng', ja:'表示対象の食材なし'},
  listen:   {zh:'听一下', en:'Listen', vi:'Nghe', ja:'再生'},
  copy:     {zh:'复制', en:'Copy', vi:'Sao chép', ja:'コピー'},
  storeType:{zh:'店铺类型', en:'Type of place', vi:'Loại quán', ja:'店の種類'},
  none:     {zh:'没有找到已登记的菜单', en:'No menu found in our list', vi:'Không tìm thấy món trong danh sách', ja:'登録メニューが見つかりません'},
  found:    {zh:n=>`找到 ${n} 道菜`, en:n=>`${n} dishes found`, vi:n=>`Tìm thấy ${n} món`, ja:n=>`${n}品見つかりました`},
  warnCount:{zh:n=>`，其中 ${n} 道含有你避开的食材`, en:n=>`, ${n} with an ingredient you avoid`, vi:n=>`, ${n} món có nguyên liệu bạn tránh`, ja:n=>`、${n}品に避けたい食材あり`}
};

/* 지원 지역: 다른 학교를 추가하려면 여기에 항목을 더하면 됩니다 */
const AREAS = [
  {id:'gnu-jinju', naverQuery:'경상국립대학교 진주',
   name:{zh:'庆尚国立大学附近（晋州）', en:'Near Gyeongsang National University (Jinju)', vi:'Gần ĐH Quốc gia Gyeongsang (Jinju)', ja:'慶尚国立大学近く（晋州）'}}
];

const SEED_PLACES = [];

const CATEGORIES = [
  {emo:'', ko:'한식당', ex:'김치찌개'},
  {emo:'', ko:'고깃집', ex:'삼겹살'},
  {emo:'', ko:'분식', ex:'떡볶이'},
  {emo:'', ko:'중식당', ex:'짬뽕'},
  {emo:'', ko:'일식당', ex:'돈까스'},
  {emo:'', ko:'치킨집', ex:'양념치킨'},
  {emo:'', ko:'카페', ex:'아메리카노'}
];

/* 피드 추천 반응 */
const REACTS = [
  {e:'rec', key:'rxRec'},
  {e:'like', key:'rxLike'},
  {e:'tasty', key:'rxTasty'},
  {e:'best', key:'rxBest'},
  {e:'thanks', key:'rxThanks'}
];

/* 국가 (글쓴이의 나라 표시) */
const COUNTRIES = [
  {code:'VN', flag:'VN', name:{zh:'越南', en:'Vietnam', vi:'Việt Nam', ja:'ベトナム'}},
  {code:'CN', flag:'CN', name:{zh:'中国', en:'China', vi:'Trung Quốc', ja:'中国'}},
  {code:'JP', flag:'JP', name:{zh:'日本', en:'Japan', vi:'Nhật Bản', ja:'日本'}},
  {code:'TW', flag:'TW', name:{zh:'台湾', en:'Taiwan', vi:'Đài Loan', ja:'台湾'}},
  {code:'TH', flag:'TH', name:{zh:'泰国', en:'Thailand', vi:'Thái Lan', ja:'タイ'}},
  {code:'ID', flag:'ID', name:{zh:'印度尼西亚', en:'Indonesia', vi:'Indonesia', ja:'インドネシア'}},
  {code:'PH', flag:'PH', name:{zh:'菲律宾', en:'Philippines', vi:'Philippines', ja:'フィリピン'}},
  {code:'MN', flag:'MN', name:{zh:'蒙古', en:'Mongolia', vi:'Mông Cổ', ja:'モンゴル'}},
  {code:'UZ', flag:'UZ', name:{zh:'乌兹别克斯坦', en:'Uzbekistan', vi:'Uzbekistan', ja:'ウズベキスタン'}},
  {code:'KZ', flag:'KZ', name:{zh:'哈萨克斯坦', en:'Kazakhstan', vi:'Kazakhstan', ja:'カザフスタン'}},
  {code:'NP', flag:'NP', name:{zh:'尼泊尔', en:'Nepal', vi:'Nepal', ja:'ネパール'}},
  {code:'BD', flag:'BD', name:{zh:'孟加拉国', en:'Bangladesh', vi:'Bangladesh', ja:'バングラデシュ'}},
  {code:'RU', flag:'RU', name:{zh:'俄罗斯', en:'Russia', vi:'Nga', ja:'ロシア'}},
  {code:'US', flag:'US', name:{zh:'美国', en:'USA', vi:'Hoa Kỳ', ja:'アメリカ'}},
  {code:'KR', flag:'KR', name:{zh:'韩国', en:'Korea', vi:'Hàn Quốc', ja:'韓国'}},
  {code:'ES', flag:'ES', name:{zh:'西班牙', en:'Spain', vi:'Tây Ban Nha', ja:'スペイン'}},
  {code:'FR', flag:'FR', name:{zh:'法国', en:'France', vi:'Pháp', ja:'フランス'}},
  {code:'OT', flag:'OT', name:{zh:'其他', en:'Other', vi:'Khác', ja:'その他'}}
];

const PHRASES = [
  {ko:'맵지 않게 해 주세요.', rom:'Maepji anhge hae juseyo.', zh:'请不要太辣。', en:'Please make it not spicy.', vi:'Làm ít cay giúp tôi.', ja:'辛くしないでください。'},
  {ko:'알레르기가 있어요.', rom:'Allerjiga isseoyo.', zh:'我对某种食物过敏。', en:'I have a food allergy.', vi:'Tôi bị dị ứng thực phẩm.', ja:'アレルギーがあります。'},
  {ko:'고기 빼고 주세요.', rom:'Gogi ppaego juseyo.', zh:'请不要放肉。', en:'Without meat, please.', vi:'Cho tôi không có thịt.', ja:'肉抜きでお願いします。'},
  {ko:'포장해 주세요.', rom:'Pojanghae juseyo.', zh:'请打包。', en:'To go, please.', vi:'Cho tôi mang về.', ja:'持ち帰りでお願いします。'},
  {ko:'물 한 잔 주세요.', rom:'Mul han jan juseyo.', zh:'请给我一杯水。', en:'Water, please.', vi:'Cho tôi một ly nước.', ja:'お水をください。'},
  {ko:'계산해 주세요.', rom:'Gyesanhae juseyo.', zh:'请结账。', en:'Check, please.', vi:'Cho tôi thanh toán.', ja:'お会計お願いします。'},
  {ko:'여기요!', rom:'Yeogiyo!', zh:'服务员！', en:'Excuse me!', vi:'Ơi, cho tôi hỏi!', ja:'すみません！'}
];

const DICT = [
  {ko:'김치찌개', rom:'Gimchi-jjigae', alias:[], store:'한식당', spicy:2, tags:['돼지고기','대두'],
   name:{zh:'泡菜汤', en:'Kimchi stew', vi:'Canh kim chi', ja:'キムチチゲ'},
   desc:{zh:'发酵泡菜和猪肉、豆腐一起炖，酸辣味。', en:'Fermented kimchi stewed with pork and tofu. Sour and spicy.', vi:'Kim chi lên men nấu với thịt heo và đậu phụ, vị chua cay.', ja:'熟成キムチを豚肉・豆腐と煮込んだ、酸味と辛味のある鍋。'}},
  {ko:'된장찌개', rom:'Doenjang-jjigae', alias:[], store:'한식당', spicy:1, tags:['대두'],
   name:{zh:'大酱汤', en:'Soybean paste stew', vi:'Canh tương đậu', ja:'味噌チゲ'},
   desc:{zh:'大酱汤，有豆腐、土豆和蔬菜，味道咸香，不太辣。', en:'Savory soybean paste stew with tofu, potato and vegetables. Mild.', vi:'Canh tương đậu với đậu phụ, khoai tây và rau. Vị đậm, ít cay.', ja:'味噌で作る鍋。豆腐・じゃがいも・野菜入りで辛さは控えめ。'}},
  {ko:'비빔밥', rom:'Bibimbap', alias:[], store:'한식당', spicy:1, tags:['소고기','계란','대두'],
   name:{zh:'拌饭', en:'Bibimbap', vi:'Bibimbap (cơm trộn)', ja:'ビビンバ'},
   desc:{zh:'米饭上放蔬菜、牛肉和煎蛋，加辣酱拌着吃。', en:'Rice topped with seasoned vegetables, beef and a fried egg, mixed with gochujang.', vi:'Cơm trộn với rau, thịt bò và trứng ốp, trộn tương ớt Hàn Quốc.', ja:'ご飯に野菜・牛肉・目玉焼きをのせ、コチュジャンで混ぜて食べる。'}},
  {ko:'냉면', rom:'Naengmyeon', alias:[], store:'한식당', spicy:0, tags:['소고기','계란'],
   name:{zh:'冷面', en:'Naengmyeon (cold noodles)', vi:'Mì lạnh Naengmyeon', ja:'冷麺（ネンミョン）'},
   desc:{zh:'荞麦面配冰凉的牛肉高汤，上面有梨、鸡蛋和黄瓜。', en:'Buckwheat noodles in icy beef broth, topped with pear, boiled egg and cucumber.', vi:'Mì kiều mạch trong nước dùng bò lạnh, ăn kèm lê, trứng luộc và dưa chuột.', ja:'そば粉の麺を冷たい牛だしで食べる。梨・ゆで卵・きゅうりがのる。'}},
  {ko:'삼겹살', rom:'Samgyeopsal', alias:[], store:'고깃집', spicy:0, tags:['돼지고기'],
   name:{zh:'五花肉', en:'Samgyeopsal (pork belly)', vi:'Thịt ba chỉ nướng', ja:'サムギョプサル（豚バラ）'},
   desc:{zh:'烤五花肉，用生菜包着吃，配大蒜和包饭酱。', en:'Grilled pork belly wrapped in lettuce with garlic and ssamjang.', vi:'Thịt ba chỉ nướng, cuốn rau xà lách, tỏi và tương ssamjang.', ja:'豚バラを焼いて、サンチュに包み、ニンニクとサムジャンで食べる。'}},
  {ko:'불고기', rom:'Bulgogi', alias:[], store:'고깃집', spicy:0, tags:['소고기','밀','대두'],
   name:{zh:'烤牛肉', en:'Bulgogi (marinated beef)', vi:'Bò nướng Bulgogi', ja:'プルコギ'},
   desc:{zh:'用甜酱油腌的薄牛肉，炒着或烤着吃，味道温和。', en:'Thin beef marinated in sweet soy sauce, grilled or stir-fried. Mild.', vi:'Thịt bò thái mỏng ướp nước tương ngọt, nướng hoặc xào. Vị nhẹ.', ja:'薄切り牛肉を甘辛醤油に漬けて焼く。辛くなく食べやすい。'}},
  {ko:'양념치킨', rom:'Yangnyeom chikin', alias:[], store:'치킨집', spicy:2, tags:['밀','대두'],
   name:{zh:'酱料炸鸡', en:'Yangnyeom chicken (sweet & spicy)', vi:'Gà rán sốt cay ngọt', ja:'ヤンニョムチキン'},
   desc:{zh:'炸鸡裹上甜辣酱，味道辣，甜甜的。', en:'Fried chicken coated in a sweet and spicy gochujang glaze.', vi:'Gà rán phủ sốt gochujang ngọt cay.', ja:'から揚げに甘辛いコチュジャンのタレをからめた料理。'}},
  {ko:'떡볶이', rom:'Tteokbokki', alias:[], store:'분식', spicy:2, tags:['대두','해산물'],
   name:{zh:'炒年糕', en:'Tteokbokki (spicy rice cakes)', vi:'Bánh gạo cay Tteokbokki', ja:'トッポッキ'},
   desc:{zh:'年糕用辣酱炒，常加鱼饼，很辣很甜。', en:'Chewy rice cakes in a spicy gochujang sauce, often with fish cake.', vi:'Bánh gạo dai nấu sốt gochujang cay, thường có chả cá.', ja:'もちもちの餅をコチュジャンの甘辛いタレで煮る。練り物入り。'}},
  {ko:'김밥', rom:'Gimbap', alias:[], store:'분식', spicy:0, tags:['계란','돼지고기'],
   name:{zh:'紫菜包饭', en:'Gimbap (seaweed rice roll)', vi:'Cơm cuộn Gimbap', ja:'キンパ（海苔巻き）'},
   desc:{zh:'紫菜卷饭，里面有蛋、火腿、蔬菜，不辣。', en:'Seaweed rice rolls with egg, ham, spinach and pickled radish. Not spicy.', vi:'Cơm cuộn rong biển với trứng, giăm bông, rau bina và củ cải muối. Không cay.', ja:'海苔で巻いたご飯。卵・ハム・ほうれん草・たくあん入り。辛くない。'}},
  {ko:'짜장면', rom:'Jjajangmyeon', alias:['짜장'], store:'중식당', spicy:0, tags:['돼지고기','밀','대두'],
   name:{zh:'炸酱面', en:'Jjajangmyeon (black bean noodles)', vi:'Mì đen Jjajangmyeon', ja:'チャジャンミョン（黒味噌の麺）'},
   desc:{zh:'黑春酱炒猪肉和蔬菜，甜咸，不辣。', en:'Noodles with sweet black bean sauce, pork and vegetables. Not spicy.', vi:'Mì sốt đậu đen ngọt có thịt heo và rau. Không cay.', ja:'黒味噌ソースに豚肉と野菜を合わせた麺。辛くない。'}},
  {ko:'짬뽕', rom:'Jjamppong', alias:[], store:'중식당', spicy:2, tags:['해산물','밀'],
   name:{zh:'海鲜辣汤面', en:'Jjamppong (spicy seafood noodle soup)', vi:'Mì cay hải sản Jjamppong', ja:'チャンポン（海鮮辛味麺）'},
   desc:{zh:'海鲜辣汤面，有鱿鱼和虾，汤很辣。', en:'Spicy red seafood noodle soup with squid and shrimp.', vi:'Mì nước cay đỏ có mực và tôm.', ja:'海鮮と唐辛子のスープの麺。赤くて辛い。'}},
  {ko:'탕수육', rom:'Tangsuyuk', alias:[], store:'중식당', spicy:0, tags:['돼지고기','밀','계란'],
   name:{zh:'糖醋肉', en:'Tangsuyuk (sweet & sour pork)', vi:'Thịt heo chua ngọt Tangsuyuk', ja:'タンスユク（酢豚風）'},
   desc:{zh:'炸猪肉裹上酸甜汁，外脆里嫩。', en:'Crispy fried pork with a sweet and sour sauce.', vi:'Thịt heo chiên giòn sốt chua ngọt.', ja:'豚肉の唐揚げに甘酢あんをかけた料理。'}},
  {ko:'돈까스', rom:'Donkkaseu', alias:['돈가스'], store:'일식당', spicy:0, tags:['돼지고기','밀','계란'],
   name:{zh:'炸猪排', en:'Donkkaseu (pork cutlet)', vi:'Sườn heo chiên xù Donkkaseu', ja:'トンカツ'},
   desc:{zh:'裹面包糠炸的猪排，配卷心菜和酱汁。', en:'Breaded and fried pork cutlet with cabbage and sauce.', vi:'Sườn heo chiên xù, ăn kèm bắp cải và sốt.', ja:'パン粉をつけて揚げた豚カツ。キャベツと特製ソース付き。'}},
  {ko:'라멘', rom:'Ramen', alias:[], store:'일식당', spicy:0, tags:['돼지고기','밀','계란','대두'],
   name:{zh:'拉面', en:'Ramen (pork bone broth)', vi:'Mì Ramen nước dùng xương heo', ja:'ラーメン（豚骨）'},
   desc:{zh:'猪骨汤底的拉面，配叉烧和溏心蛋。', en:'Noodles in pork bone broth with chashu pork and soft-boiled egg.', vi:'Mì trong nước dùng xương heo, có thịt xá xíu và trứng lòng đào.', ja:'豚骨スープの麺。チャーシューと半熟卵がのる。'}},
  {ko:'돼지국밥', rom:'Dwaeji-gukbap', alias:['국밥'], store:'한식당', spicy:1, tags:['돼지고기'],
   name:{zh:'猪肉汤饭', en:'Pork rice soup (dwaeji-gukbap)', vi:'Cơm canh heo Dwaeji-gukbap', ja:'豚肉スープご飯（テジクッパ）'},
   desc:{zh:'猪骨高汤泡饭，可加辣酱和虾酱调味。', en:'Rice in hot pork broth. Add salted shrimp and chili sauce to taste.', vi:'Cơm nóng trong nước dùng xương heo, thêm mắm tôm và ớt theo khẩu vị.', ja:'豚骨スープにご飯を入れた料理。好みで唐辛子やえびの塩辛を足す。'}},
  {ko:'설렁탕', rom:'Seolleongtang', alias:[], store:'한식당', spicy:0, tags:['소고기'],
   name:{zh:'牛骨汤', en:'Seolleongtang (beef bone soup)', vi:'Canh xương bò Seolleongtang', ja:'ソルロンタン（牛骨スープ）'},
   desc:{zh:'牛骨长时间熬的白汤，清淡，可加盐和葱。', en:'Milky beef bone broth with rice noodles and green onion. Mild.', vi:'Nước dùng xương bò hầm lâu, nhạt, ăn kèm hành lá và muối.', ja:'牛骨を長時間煮出した白濁スープ。あっさりしていて、塩やネギで調整する。'}},
  {ko:'아메리카노', rom:'Amerikano', alias:['아아'], store:'카페', spicy:0, tags:[],
   name:{zh:'美式咖啡', en:'Americano', vi:'Cà phê Americano', ja:'アメリカーノ'},
   desc:{zh:'浓缩咖啡加水，不加奶，苦味明显。', en:'Espresso diluted with hot or iced water. No milk, bold taste.', vi:'Espresso pha với nước nóng hoặc đá, không sữa, vị đắng.', ja:'エスプレッソを湯または氷で割ったもの。ミルクなし。'}},
  {ko:'카페라떼', rom:'Kape-latte', alias:['라떼'], store:'카페', spicy:0, tags:['유제품'],
   name:{zh:'拿铁', en:'Cafe latte', vi:'Cà phê sữa Latte', ja:'カフェラテ'},
   desc:{zh:'浓缩咖啡加热牛奶和奶泡，口感温和。', en:'Espresso with steamed milk and a little foam. Creamy and mild.', vi:'Espresso với sữa nóng và bọt sữa, vị béo nhẹ.', ja:'エスプレッソに温めたミルクとフォームを加えたもの。'}}
];

/* ================= 추가 메뉴 (한식·분식·중식·일식·카페·치킨·고기) ================= */
function addDish(ko, rom, alias, store, spicy, tags, n, d){
  DICT.push({ko, rom, alias, store, spicy, tags,
    name:{zh:n[0], en:n[1], vi:n[2], ja:n[3], mn:n[4]},
    desc:{zh:d[0], en:d[1], vi:d[2], ja:d[3], mn:d[4]}});
}

addDish('순두부찌개','Sundubu-jjigae',[],'한식당',2,['대두','계란','해산물'],
  ['嫩豆腐汤','Soft tofu stew','Canh đậu phụ non','スンドゥブチゲ','Зөөлөн тофу шөл'],
  ['嫩豆腐和海鲜一起煮的辣汤，常打一个生鸡蛋。','Silky tofu in a spicy seafood broth, often with a raw egg.','Đậu phụ non nấu nước cay hải sản, thường có trứng sống.','柔らかいおぼろ豆腐を海鮮入りの辛いスープで煮た鍋。卵を落とすことが多い。','Зөөлөн тофуг далайн хоолтой халуун шөлөөр чанасан. Ихэвчлэн өндөгтэй.']);
addDish('부대찌개','Budae-jjigae',[],'한식당',2,['돼지고기','유제품','밀','대두'],
  ['部队锅','Army base stew','Canh quân đội Budae','プデチゲ','Бюдэ чигэ (армийн шөл)'],
  ['火腿、香肠、泡面和芝士一起煮的辣汤，适合分享。','Spicy stew with ham, sausage, instant noodles and cheese. Great for sharing.','Canh cay với giăm bông, xúc xích, mì ăn liền và phô mai, hợp để ăn chung.','ハム・ソーセージ・インスタント麺・チーズを入れた辛い鍋。シェア向き。','Хам, сосиз, шуудан гоймон, бяслагтай халуун шөл. Хамтдаа идэхэд тохиромжтой.']);
addDish('갈비탕','Galbitang',[],'한식당',0,['소고기'],
  ['牛排骨汤','Beef short rib soup','Canh sườn bò','カルビタン','Галбитан (үхрийн хавирганы шөл)'],
  ['牛小排慢炖的清汤，味道清淡。','Clear, mild broth with slow-simmered beef short ribs.','Nước dùng trong, nhạt, sườn bò hầm lâu.','牛カルビをじっくり煮込んだ澄んだスープ。あっさり。','Үхрийн хавирга удаан буцалгасан тунгалаг, зөөлөн шөл.']);
addDish('닭갈비','Dak-galbi',[],'한식당',2,['밀','대두'],
  ['辣炒鸡排','Spicy stir-fried chicken','Gà xào cay Dak-galbi','タッカルビ','Такалби (халуун тахианы хуурга)'],
  ['鸡肉、年糕和蔬菜用辣酱炒，很辣。','Chicken, rice cakes and vegetables stir-fried in spicy gochujang sauce.','Gà, bánh gạo và rau xào sốt gochujang cay.','鶏肉・餅・野菜をコチュジャンで炒めた辛い料理。','Тахиа, будааны гулгуур, ногоо гохуджан соустай хуурсан халуун хоол.']);
addDish('제육볶음','Jeyuk-bokkeum',[],'한식당',2,['돼지고기','대두'],
  ['辣炒猪肉','Spicy stir-fried pork','Thịt heo xào cay','チェユクポックム','Чеюк бокүм (халуун гахайн хуурга)'],
  ['猪肉用辣酱和蔬菜快炒，很下饭。','Pork stir-fried with gochujang and vegetables. Goes well with rice.','Thịt heo xào gochujang và rau, ăn với cơm rất ngon.','豚肉をコチュジャンと野菜で炒めた辛い料理。ご飯に合う。','Гахайн мах гохуджан, ногоотой хуурсан халуун хоол. Будаатай сайн тохирно.']);
addDish('감자탕','Gamja-tang',[],'한식당',2,['돼지고기','대두'],
  ['土豆排骨汤','Pork bone & potato stew','Canh xương heo khoai tây','カムジャタン','Камжатан (гахайн ясны шөл)'],
  ['猪脊骨和土豆一起炖的辣汤，要慢慢啃肉。','Spicy stew of pork spine bones and potatoes. Eat slowly, picking meat off the bone.','Canh cay xương sống heo và khoai tây, ăn chậm từng miếng thịt.','豚の背骨とじゃがいもを煮た辛いスープ。骨の肉をほぐして食べる。','Гахайн нурууны яс, төмстэй халуун шөл. Ясны махыг удаан иднэ.']);
addDish('육개장','Yukgaejang',[],'한식당',2,['소고기'],
  ['辣牛肉汤','Spicy beef soup','Canh bò cay Yukgaejang','ユッケジャン','Юкгэжан (халуун үхрийн шөл)'],
  ['牛肉丝和葱、蔬菜一起煮的红辣汤。','Red, spicy beef soup with shredded beef, vegetables and green onion.','Canh bò đỏ cay, có thịt bò xé, rau và hành lá.','牛肉・野菜・ネギを入れた赤くて辛いスープ。','Үхрийн мах, ногоо, сонгинотой улаан халуун шөл.']);
addDish('해물파전','Haemul-pajeon',[],'분식',1,['해산물','밀','계란'],
  ['海鲜葱饼','Seafood pancake','Bánh hành hải sản','ヘムルパジョン','Хайл хэмүл пажон (далайн хоолтой шар)'],
  ['海鲜和葱放进面糊煎成的饼，外脆里软。','Crispy pancake with seafood and green onion in batter.','Bánh chiên giòn với hải sản và hành lá trong bột.','海鮮とネギを入れて焼いた、外はカリッと中はもちっとしたパンケーキ。','Далайн хоол, сонгинотой гурилан бялуу. Гадна нь хатуу, дотор нь зөөлөн.']);
addDish('칼국수','Kalguksu',[],'한식당',0,['밀','해산물'],
  ['刀切面','Knife-cut noodle soup','Mì cắt dao Kalguksu','カルグクス','Калгуксү (хутгаар таслсан гоймон)'],
  ['手切面条配海鲜或鸡肉高汤，清淡。','Hand-cut wheat noodles in a light anchovy or chicken broth.','Mì tự cắt trong nước dùng cá cơm hoặc gà, vị nhẹ.','手で切った小麦麺を、いりこか鶏のあっさりしたスープで食べる。','Гараар таслаж хийсэн гурилан гоймон, загасны эсвэл тахианы зөөлөн шөлтэй.']);
addDish('잡채','Japchae',[],'한식당',0,['소고기','대두','밀'],
  ['炒杂菜粉丝','Glass noodle stir-fry','Miến xào Japchae','チャプチェ','Жапче (шилэн гоймон хуурга)'],
  ['红薯粉丝和蔬菜、牛肉一起炒，甜咸口。','Sweet soy glass noodles stir-fried with vegetables and beef.','Miến khoai lang xào với rau và thịt bò, vị ngọt mặn.','さつま芋の春雨を野菜と牛肉と甘辛く炒めた料理。','Чихрийн шилэн гоймон, ногоо, үхрийн махтай хуурсан амтат-давстай хоол.']);
addDish('수제비','Sujebi',[],'한식당',0,['밀'],
  ['面片汤','Hand-torn dough soup','Canh bột xé Sujebi','スジェビ','Сужэби (гурилан хэсэгтэй шөл)'],
  ['手撕面片放进清汤，加蔬菜和土豆。','Hand-torn dough flakes in a clear broth with vegetables and potato.','Bột mì xé tay trong nước dùng trong, có rau và khoai tây.','手でちぎった生地を、野菜とじゃがいもと澄んだスープで煮る。','Гараар таслаж хийсэн гурилан хэсэг, ногоо, төмстэй тунгалаг шөл.']);
addDish('순대','Sundae',[],'분식',0,['돼지고기'],
  ['血肠','Korean blood sausage','Dồi huyết Hàn Quốc','スンデ','Сундэ (гахайн гэдэстэй хиам)'],
  ['猪肠里塞粉丝和猪血，通常蘸盐和蔬菜吃。','Pork intestine stuffed with glass noodles and blood, eaten with salt or vegetables.','Ruột heo nhồi miến và tiết, thường chấm muối hoặc ăn với rau.','豚の腸に春雨と血を詰めた料理。塩や野菜と一緒に食べる。','Гахайн гэдэст шилэн гоймон, цусыг хийж хийсэн. Давс эсвэл ногоотой иднэ.']);
addDish('호떡','Hotteok',[],'분식',0,['밀'],
  ['糖饼','Sweet filled pancake','Bánh kẹo Hotteok','ホットク','Хоттоок (чихэрлэг бялуу)'],
  ['面团里包黑糖和坚果，煎得焦香。','Pan-fried dough filled with brown sugar and nuts.','Bánh chiên nhân đường nâu và hạt.','黒砂糖とナッツを包んで焼いた、もちもちの甘いパンケーキ。','Хүрэн элсэн чихэр, самартай гурилан бялуу. Шарсан, зөөлөн.']);
addDish('어묵탕','Eomuk-tang',[],'분식',0,['해산물','밀'],
  ['鱼饼汤','Fish cake soup','Canh chả cá','オデンタン','Оомук тан (загасны бялуун шөл)'],
  ['鱼饼放在清汤里煮，热乎乎的。','Fish cakes simmered in a light broth. Warm and comforting.','Chả cá nấu trong nước dùng nhẹ, ấm bụng.','練り物を薄味のスープで煮た料理。体が温まる。','Загасны бялуу тунгалаг шөлөнд чанасан. Дулаахан.']);
addDish('라볶이','Rabokki',[],'분식',2,['밀','대두'],
  ['辣炒拉面和年糕','Spicy ramen & rice cakes','Mì ramen và bánh gạo cay','ラボッキ','Рабокки (халуун рамен, гулгуур)'],
  ['年糕和泡面一起用辣酱炒，很辣很甜。','Tteokbokki with instant ramen. Spicy and sweet.','Tteokbokki kết hợp mì ramen ăn liền, cay ngọt.','餅とインスタントラーメンをコチュジャンで煮た辛い料理。','Гулгуур, шуудан рамен халуун соустай. Халуун, амттай.']);
addDish('튀김','Twigim',[],'분식',0,['밀','계란'],
  ['炸物','Korean fried snacks','Đồ chiên vặt','ティギム','Тигим (шарсан хөнгөн хоол)'],
  ['裹面糊炸的蔬菜、海苔卷等小吃。','Battered and fried vegetables, seaweed rolls and other snacks.','Rau, cuộn rong biển và các món vặt chiên bột.','衣をつけて揚げた野菜や海苔巻きなどの軽食。','Гурилаар бүрсэн шарсан ногоо, самрын хэрчмэн.']);
addDish('마라탕','Malatang',[],'중식당',2,['밀','대두'],
  ['麻辣烫','Malatang (spicy hot pot soup)','Malatang (lẩu cay tê)','マーラータン','Мала тан (халуун ма-ла шөл)'],
  ['自选食材放进麻辣汤底里煮，麻辣味很重。','Pick your ingredients and simmer them in a numbing, spicy broth.','Chọn nguyên liệu rồi nấu trong nước dùng tê cay.','好きな具材を選んで、しびれる辛さのスープで煮る。','Дуртай орцоо сонгоод, мансуулагч халуун шөлөнд чанана.']);
addDish('양꼬치','Yang-kkochi',[],'중식당',1,[],
  ['羊肉串','Lamb skewers','Xiên thịt cừu','羊肉の串焼き','Хонины шанзан'],
  ['羊肉串撒孜然和辣椒面烤制。','Grilled lamb skewers with cumin and chili powder.','Thịt cừu xiên nướng với thì là và ớt bột.','羊肉の串焼き。クミンと唐辛子をかけて焼く。','Хонины мах шанзан, зира, халуун чинжүүтэй шарсан.']);
addDish('깐풍기','Kkanpunggi',[],'중식당',2,['밀','계란','대두'],
  ['辣炸鸡','Spicy fried chicken','Gà chiên cay kiểu Trung','カンプンギ','Канпунги (халуун тахиа)'],
  ['炸鸡裹上辣酱和葱，甜辣口味。','Crispy fried chicken tossed in a sweet, spicy sauce with green onion.','Gà chiên giòn đảo sốt cay ngọt với hành.','から揚げを甘辛いタレとネギで和えた料理。','Шарсан тахиаг чихэрлэг халуун соус, сонгинотой хутгана.']);
addDish('유산슬','Yusanseul',[],'중식당',0,['해산물','밀','계란'],
  ['什锦海鲜炒','Mixed seafood stir-fry','Hải sản xào tổng hợp','ユサンスル','Юсаншүл (холимог далайн хоолны хуурга)'],
  ['海鲜和蔬菜勾芡炒制，口感滑嫩。','Seafood and vegetables stir-fried in a light thick sauce.','Hải sản và rau xào sốt sánh nhẹ.','海鮮と野菜をとろみのあるソースで炒めた料理。','Далайн хоол, ногоог зөөлөн зуурмагтай соустай хуурсан.']);
addDish('우동','Udon',[],'일식당',0,['밀','해산물'],
  ['乌冬面','Udon noodles','Mì Udon','うどん','Удон гоймон'],
  ['粗面条配鲣鱼高汤，清淡鲜美。','Thick wheat noodles in a light dashi broth.','Mì udon dày trong nước dùng dashi nhẹ.','太い小麦麺をかつおだしのスープで食べる。あっさり。','Зузаан гурилан гоймон, загасны тунгалаг шөлтэй.']);
addDish('규동','Gyudon',[],'일식당',0,['소고기','대두'],
  ['牛肉盖饭','Beef rice bowl (gyudon)','Cơm bò Gyudon','牛丼','Гюдон (үхрийн махтай будаа)'],
  ['洋葱和牛肉用甜酱油煮，盖在米饭上。','Sweet soy-simmered beef and onion over rice.','Thịt bò và hành nấu nước tương ngọt, đặt trên cơm.','玉ねぎと牛肉を甘い醤油で煮て、ご飯にのせた丼。','Сонгино, үхрийн мах чихэрлэг соёсонд чанаж будаан дээр тавьсан.']);
addDish('초밥','Chobap',[],'일식당',0,['해산물','대두'],
  ['寿司','Sushi','Sushi','寿司','Суши'],
  ['醋饭配生鱼片或海鲜。','Vinegared rice topped with raw fish or seafood.','Cơm giấm phủ cá sống hoặc hải sản.','酢飯に生魚や海鮮をのせた料理。','Цагаан будаа, түүхий загас, далайн хоолтой.']);
addDish('바닐라라떼','Beonilla-latte',[],'카페',0,['유제품'],
  ['香草拿铁','Vanilla latte','Latte vani','バニララテ','Ванилийн латте'],
  ['浓缩咖啡配香草糖浆和牛奶。','Espresso with vanilla syrup and steamed milk.','Espresso với siro vani và sữa nóng.','エスプレッソにバニラシロップとミルクを加えた。','Эспрессо, ванилийн сироп, халуун сүүтэй.']);
addDish('녹차라떼','Nokcha-latte',[],'카페',0,['유제품'],
  ['抹茶拿铁','Green tea latte','Latte trà xanh','抹茶ラテ','Ногоон цайны латте'],
  ['抹茶粉配牛奶，清香微甜。','Matcha powder with steamed milk. Earthy and lightly sweet.','Bột trà xanh với sữa, vị thanh nhẹ.','抹茶パウダーとミルク。ほのかな甘さ。','Матча нунтаг, сүү. Бага зэрэг амттай.']);
addDish('콜드브루','Keoldeu-breu',[],'카페',0,[],
  ['冷萃咖啡','Cold brew','Cà phê ủ lạnh','コールドブリュー','Хүйтэн кофе (cold brew)'],
  ['用冷水慢泡的咖啡，苦味低，口感顺滑。','Coffee steeped slowly in cold water. Smooth and less bitter.','Cà phê ngâm nước lạnh lâu, ít đắng, vị mượt.','水で長時間抽出したコーヒー。苦味が少なく滑らか。','Хүйтэн усанд удаан дүрсэн кофе. Гашуун бага, жигд.']);
addDish('후라이드치킨','Peurai-deu chikin',[],'치킨집',0,['밀','계란'],
  ['炸鸡','Fried chicken','Gà rán','フライドチキン','Шарсан тахиа'],
  ['原味炸鸡，外脆里嫩。','Classic crispy fried chicken.','Gà rán kiểu truyền thống, giòn ngoài mềm trong.','定番のサクサク揚げチキン。','Уламжлалт шарсан тахиа, гадна нь хатуу, дотор нь зөөлөн.']);
addDish('간장치킨','Ganjang-chikin',[],'치킨집',0,['밀','대두'],
  ['酱油炸鸡','Soy garlic chicken','Gà sốt nước tương','ガンジャンチキン','Ганжан тахиа (соёны сармистай)'],
  ['炸鸡裹上甜咸的酱油蒜味酱。','Fried chicken glazed in sweet soy-garlic sauce.','Gà rán phủ sốt nước tương tỏi ngọt mặn.','甘辛い醤油とにんにくのタレをからめた揚げチキン。','Шарсан тахиа, чихэрлэг давстай соёны сармисан соустай.']);
addDish('갈비','Galbi',[],'고깃집',0,['소고기','대두','밀'],
  ['烤牛排骨','Marinated beef short ribs (galbi)','Sườn bò nướng Galbi','カルビ（味付け）','Галби (маринадласан үхрийн хавирга)'],
  ['甜酱油腌制的牛小排，烤着吃。','Beef short ribs marinated in sweet soy sauce and grilled.','Sườn bò ướp nước tương ngọt, nướng.','甘辛醤油に漬けた牛カルビを焼いて食べる。','Чихэрлэг соёсонд маринадласан үхрийн хавирга, шарсан.']);
addDish('목살','Moksal',[],'고깃집',0,['돼지고기'],
  ['猪颈肉','Pork neck (moksal)','Thịt heo cổ nướng','モクサル（豚肩ロース）','Моксаль (гахайн хүзүүний мах)'],
  ['厚切猪颈肉烤制，肉质柔嫩。','Thick-cut grilled pork neck. Juicy and tender.','Thịt heo cổ cắt dày nướng, mềm ngọt.','厚切りの豚首肉を焼いたもの。柔らかくジューシー。','Зузаан зүсэж шарсан гахайн хүзүүний мах. Зөөлөн, шүүслэг.']);
addDish('차돌박이','Chadol-bagi',[],'고깃집',0,['소고기'],
  ['牛胸肉片','Thin beef brisket slices','Thịt bò ức mỏng','チャドルバギ（牛胸肉の薄切り）','Чадолбаги (нимгэн үхрийн мах)'],
  ['薄切牛胸肉，烤至微焦，蘸盐吃。','Thin beef brisket grilled until crisp, dipped in salt and sesame oil.','Thịt bò ức thái mỏng nướng giòn, chấm muối mè.','薄切りの牛胸肉をカリッと焼き、塩とごま油で食べる。','Нимгэн үхрийн хөхний мах шарж, давс, зэрэгцээ тослоор иднэ.']);

/* ================= 국·찌개 추가 묶음 ================= */
addDish('미역국','Miyeok-guk',[],'한식당',0,['소고기'],
  ['海带汤','Seaweed soup','Canh rong biển','미역국（わかめスープ）','Миёк гук (далайн хялгай шөл)'],
  ['海带和牛肉一起煮的清汤，常在生日时喝。','Light soup of seaweed and beef, traditionally eaten on birthdays.','Canh rong biển nấu thịt bò, thường ăn vào ngày sinh nhật.','わかめと牛肉を煮た澄んだスープ。誕生日に食べる習慣がある。','Далайн хялгай, үхрийн махтай тунгалаг шөл. Төрсөн өдөрт ихэвчлэн иднэ.']);
addDish('콩나물국','Kongnamul-guk',[],'한식당',0,[],
  ['豆芽汤','Bean sprout soup','Canh giá đỗ','豆もやしのスープ','Буурцагны соёолжийн шөл'],
  ['豆芽和葱放进清汤，简单清爽。','Clear broth with soybean sprouts and green onion. Simple and refreshing.','Nước dùng trong với giá đỗ và hành lá, đơn giản, thanh mát.','もやしとネギを入れたあっさりしたスープ。','Соёолж, сонгинотой энгийн, цэвэр шөл.']);
addDish('북어국','Bugeo-guk',[],'한식당',0,['해산물'],
  ['黄太鱼干汤','Dried pollack soup','Canh cá khô Bugeo','북어국（干しダラのスープ）','Бугэо гук (хатаасан загасны шөл)'],
  ['干明太鱼撕碎后加豆芽、蛋液煮的汤，适合解酒。','Shredded dried pollack with egg and soybean sprouts. Often eaten as a hangover soup.','Cá khô xé nhỏ nấu với giá đỗ và trứng, thường ăn giải rượu.','干しダラを裂いて、もやしと卵で煮たスープ。二日酔いにも。','Хатаасан загасыг урт зүсэж, соёолж, өндөгтэй чанасан. Архины дараа иддэг.']);
addDish('청국장','Cheonggukjang',[],'한식당',2,['대두','해산물'],
  ['大酱汤','Fermented soybean stew','Canh tương đậu Cheonggukjang','清国醤（チョングクジャン）','Чонггүкжан (исгэлэн соёолонгийн шөл)'],
  ['发酵大豆做的浓稠汤，气味独特。','Thick stew made from fermented soybeans. Strong, distinctive smell.','Canh đậu nành lên men đặc, mùi rất đặc trưng.','発酵させた大豆で作る濃厚な鍋。独特の香り。','Исгэсэн соёолонгоор хийсэн зузаан шөл. Өвөрмөц үнэртэй.']);
addDish('동태찌개','Dongtae-jjigae',[],'한식당',2,['해산물','대두'],
  ['明太鱼汤','Pollack stew','Canh cá minh thái','タラのチゲ','Донтэ чигэ (тарагийн халуун шөл)'],
  ['生明太鱼和豆腐、豆芽一起煮的辣汤。','Spicy stew of fresh pollack, tofu and bean sprouts.','Canh cay cá minh thái với đậu phụ và giá đỗ.','生タラと豆腐・もやしを入れた辛い鍋。','Шинэ тараг, тофу, соёолжтой халуун шөл.']);
addDish('삼계탕','Samgyetang',[],'한식당',0,[],
  ['人参鸡汤','Ginseng chicken soup','Gà hầm sâm Samgyetang','参鶏湯（サムゲタン）','Самгэтан (ханжуул тахиа)'],
  ['整只童子鸡塞糯米、人参和枣煮的补汤。','Whole young chicken stuffed with rice, ginseng and dates, simmered as a restorative soup.','Gà non nhồi gạo nếp, sâm và táo tàu, hầm thành món bổ dưỡng.','丸鶏にもち米・高麗人参・ナツメを詰めて煮込んだ滋養スープ。','Бүтэн залуу тахияанд шар будаа, ханжуул, бөөрөлзгөнө хийж чанасан.']);
addDish('추어탕','Chueo-tang',[],'한식당',1,[],
  ['泥鳅汤','Loach soup','Canh lươn Chueotang','ドジョウ汁（チュオタン）','Чучотан (шоройн шөл)'],
  ['泥鳅磨碎后煮成的浓汤，常配花椒粉。','Thick soup of ground loach, often sprinkled with pepper powder.','Canh lươn xay nhuyễn, thường rắc tiêu.','ドジョウをすりつぶして煮た濃いスープ。山椒をかけて食べる。','Шороог нунтаглаж чанасан зузаан шөл. Гаа нунтаг сэлгэж иднэ.']);
addDish('매운탕','Maeuntang',[],'한식당',2,['해산물'],
  ['辣鱼汤','Spicy fish stew','Canh cá cay Maeuntang','メウンタン（辛い魚鍋）','Мэвүнтан (халуун загасны шөл)'],
  ['鱼和蔬菜用辣椒酱煮的辣汤。','Fish and vegetables simmered in a spicy red broth.','Cá và rau nấu trong nước sốt ớt cay.','魚と野菜を唐辛子ダレで煮た辛いスープ。','Загас, ногоог халуун улаан шөлөнд чанасан.']);
addDish('뼈해장국','Ppyeo-haejangguk',[],'한식당',2,['돼지고기','대두'],
  ['排骨解酒汤','Pork bone hangover soup','Canh xương giải rượu','ポッピョへジャンク（豚骨の二日酔いスープ）','Ппё хэжанг гук (гахайн ясны шөл)'],
  ['猪骨加血、豆芽和辣椒粉熬的汤，解酒常见。','Pork bone soup with congealed blood and soybean sprouts, spiced with chili. A popular hangover remedy.','Canh xương heo với tiết và giá đỗ, cay, thường ăn giải rượu.','豚の骨・血・もやしを唐辛子で煮た、二日酔いに人気のスープ。','Гахайн яс, цус, соёолжтой, халуун чинжүүтэй шөл. Архины дараа алдартай.']);

/* ================= 추가 묶음 2 (밥·면·구이·반찬·분식·디저트·음료·중식·일식) ================= */
addDish('김치볶음밥','Kimchi-bokkeumbap',[],'한식당',2,['돼지고기','계란'],
  ['泡菜炒饭','Kimchi fried rice','Cơm chiên kim chi','キムチチャーハン','Кимчи шарсан будаа'],
  ['泡菜和米饭一起炒，带一点辣味。','Rice stir-fried with kimchi and a little chili.','Cơm chiên với kim chi, hơi cay.','キムチとご飯を炒めた、少し辛い料理。','Кимчитэй будааг хуурсан, бага зэрэг халуун.']);
addDish('돌솥비빔밥','Dolsot-bibimbap',[],'한식당',1,['계란','대두'],
  ['石锅拌饭','Stone pot bibimbap','Bibimbap nồi đá','石鍋ビビンバ','Чулуун саванд бибимбап'],
  ['石锅里的拌饭，底部锅巴很香脆。','Bibimbap served in a hot stone bowl, with crispy rice at the bottom.','Bibimbap trong nồi đá nóng, đáy cơm giòn.','石鍋で出る混ぜご飯。底のおこげが香ばしい。','Халуун чулуун саванд үйлчилдэг бибимбап, доод талын будаа шарсан.']);
addDish('제육덮밥','Jeyuk-deopbap',[],'한식당',2,['돼지고기','대두'],
  ['辣炒猪肉盖饭','Spicy pork rice bowl','Cơm thịt heo xào cay','チェユクトッピ（豚の辛炒め丼）','Чеюк дэпбап (халуун гахайн будаа)'],
  ['辣炒猪肉盖在米饭上。','Spicy stir-fried pork served over rice.','Thịt heo xào cay đặt trên cơm.','辛い豚炒めをご飯にのせた丼。','Халуун гахайн махыг будаан дээр тавьсан.']);
addDish('불고기덮밥','Bulgogi-deopbap',[],'한식당',0,['소고기','대두','밀'],
  ['烤牛肉盖饭','Bulgogi rice bowl','Cơm bò bulgogi','プルコギ丼','Булгоги дэпбап'],
  ['甜咸的牛肉烤肉盖在米饭上。','Sweet soy beef over rice.','Thịt bò ngọt mặn đặt trên cơm.','甘辛い牛肉を炒めてご飯にのせた丼。','Чихэрлэг, давстай үхрийн махыг будаан дээр.']);
addDish('카레라이스','Kare-raisu',[],'일식당',1,['밀','소고기'],
  ['咖喱饭','Curry rice','Cơm cà ri','カレーライス','Карри будаа'],
  ['咖喱酱浇在白米饭上。','Curry sauce served over rice.','Sốt cà ri rưới trên cơm.','ごはんにカレーをかけた料理。','Будаан дээр карри соус.']);
addDish('가츠동','Katsudon',[],'일식당',0,['돼지고기','계란','밀'],
  ['炸猪排盖饭','Pork cutlet rice bowl','Cơm cốt lết','カツ丼','Кацудон (шарсан гахайн махтай будаа)'],
  ['炸猪排和鸡蛋放在米饭上。','Breaded pork cutlet and egg over rice.','Cốt lết heo và trứng đặt trên cơm.','とんかつと卵をのせた丼。','Шарсан гахайн мах, өндөгтэй будаа.']);
addDish('오야코동','Oyakodon',[],'일식당',0,['계란','대두','밀'],
  ['亲子丼','Chicken and egg rice bowl','Cơm gà trứng','親子丼','Оякодон (тахиа, өндөгтэй будаа)'],
  ['鸡肉和鸡蛋一起煮，放在米饭上。','Chicken and egg simmered over rice.','Gà và trứng hầm đặt trên cơm.','鶏肉と卵を煮て、ご飯にのせた丼。','Тахиа, өндөгийг чанаж будаан дээр тавьсан.']);
addDish('텐동','Tendon',[],'일식당',0,['해산물','계란','밀'],
  ['天妇罗盖饭','Tempura rice bowl','Cơm tempura','天丼','Тэндон (тэмпура будаа)'],
  ['炸虾和蔬菜天妇罗盖在米饭上。','Tempura shrimp and vegetables over rice.','Tôm và rau tempura đặt trên cơm.','海老と野菜の天ぷらをのせた丼。','Шарсан шрімп, ногоо будаан дээр.']);
addDish('잔치국수','Janchi-guksu',[],'한식당',0,['계란','밀'],
  ['喜宴面','Party noodle soup','Mì xúc Janchi','チャンチグクス','Жанчи гуксү (гоймон шөлтэй)'],
  ['细面条配清淡的鸡蛋和蔬菜高汤。','Thin wheat noodles in a light broth, with egg and vegetables.','Mì sợi nhỏ trong nước dùng nhẹ, có trứng và rau.','細い麺にあっさりしたスープ、卵と野菜をのせた麺料理。','Нимгэн гоймон, зөөлөн шөл, өндөг, ногоотой.']);
addDish('쫄면','Jjolmyeon',[],'분식',2,['밀','계란','대두'],
  ['辣拌Q面','Chewy spicy noodles','Mì dai cay Jjolmyeon','ジョルミョン（辛い冷麺）','Жолмён (халуун шуудан гоймон)'],
  ['弹牙的粗面条拌辣酱和蔬菜。','Chewy thick noodles tossed in spicy gochujang sauce.','Mì dai trộn sốt gochujang cay.','コシのある太麺をコチュジャンで和えた辛い料理。','Зузаан, мөлхөгөр гоймоныг халуун соустай холисон.']);
addDish('비빔냉면','Bibim-naengmyeon',[],'한식당',2,['밀','계란','대두'],
  ['拌冷面','Spicy cold noodles','Mì lạnh trộn cay','ビビン冷麺','Бибим нэнгмён (халуун хүйтэн гоймон)'],
  ['冷面拌上辣酱，口感爽辣。','Cold buckwheat noodles tossed in spicy sauce.','Mì lạnh trộn sốt cay.','冷麺をコチュジャンで和えた辛い冷麺。','Хүйтэн гоймоныг халуун соустай холисон.']);
addDish('떡국','Tteok-guk',[],'한식당',0,['소고기','밀'],
  ['年糕汤','Rice cake soup','Canh bánh gạo Tteokguk','トックッ（餅スープ）','Ттөк гук (гулгуурын шөл)'],
  ['牛肉高汤煮年糕片，新年常吃。','Sliced rice cakes in beef broth, traditionally eaten on New Year.','Bánh gạo thái lát nấu nước dùng bò, ăn dịp Tết.','牛だしで煮た薄切りの餅。お正月に食べる。','Үхрийн шөлд чанасан гулгуур, шинэ жилд иддэг.']);
addDish('만둣국','Mandu-guk',[],'한식당',0,['돼지고기','밀','계란'],
  ['饺子汤','Dumpling soup','Canh bánh bao Mandu','マンドゥクック（餃子スープ）','Мандү гук (бууз шөл)'],
  ['饺子放进清汤煮，热乎乎的。','Dumplings simmered in a clear broth.','Bánh bao nấu trong nước dùng trong.','餃子を澄んだスープで煮た料理。','Бууз тунгалаг шөлд чанасан.']);
addDish('오므라이스','Omurice',[],'일식당',0,['계란','유제품','밀'],
  ['蛋包饭','Omurice','Cơm trứng Omurice','オムライス','Омурайс (өндөгтэй будаа)'],
  ['炒饭外面包上薄蛋皮，淋番茄酱。','Fried rice wrapped in a thin omelet, topped with ketchup.','Cơm chiên bọc trứng mỏng, rưới sốt cà chua.','チキンライスを薄焼き卵で包み、ケチャップをかけた料理。','Шарсан будааг нимгэн өндөгөөр боосон, кетчуптэй.']);
addDish('야키소바','Yakisoba',[],'일식당',1,['밀','해산물','돼지고기'],
  ['炒面','Yakisoba','Mì xào Yakisoba','焼きそば','Якисоба (хуурсан гоймон)'],
  ['蔬菜和肉炒的酱汁炒面。','Stir-fried noodles with vegetables, meat and sweet sauce.','Mì xào với rau, thịt và sốt ngọt.','野菜と肉をソースで炒めた焼きそば。','Ногоо, мах, амттай соустай хуурсан гоймон.']);
addDish('샤브샤브','Syabu-syabu',[],'일식당',0,['소고기','대두'],
  ['涮涮锅','Shabu-shabu','Shabu-shabu','しゃぶしゃぶ','Шабушабу (хуурсан шөлтэй хоол)'],
  ['薄肉片在汤里涮熟，蘸酱吃。','Thin meat swished in broth and dipped in sauce.','Thịt mỏng nhúng nước dùng, chấm sốt.','薄切り肉をだしにくぐらせて、タレで食べる。','Нимгэн махыг шөлд дүрж, соусанд чилээж иднэ.']);
addDish('고등어구이','Godeungeo-gui',[],'한식당',0,['해산물'],
  ['烤青花鱼','Grilled mackerel','Cá thu nướng','サバの塩焼き','Шарсан скумбри'],
  ['整条青花鱼盐烤，配白饭很合适。','Salt-grilled whole mackerel, a classic side with rice.','Cá thu nướng muối, ăn với cơm.','サバを塩焼きにした定番のおかず。','Давсаар шарсан бүтэн скумбри, будаатай сайн.']);
addDish('갈치구이','Galchi-gui',[],'한식당',0,['해산물'],
  ['烤带鱼','Grilled hairtail','Cá hairtail nướng','タチウオの塩焼き','Шарсан галчи (хайрцагт загас)'],
  ['带鱼抹盐烤制，肉质细嫩。','Salt-grilled hairtail fish with tender white meat.','Cá hairtail nướng muối, thịt mềm.','タチウオを塩焼きにした料理。身がやわらかい。','Давстай шарсан галчи, махаар зөөлөн.']);
addDish('낙지볶음','Nakji-bokkeum',[],'한식당',2,['해산물','대두'],
  ['辣炒章鱼','Spicy stir-fried octopus','Bạch tuộc xào cay','ナクチボックム（タコの辛炒め）','Нактжи бокүм (халуун хуурга)'],
  ['章鱼和蔬菜用辣酱快炒。','Octopus and vegetables stir-fried in spicy gochujang.','Bạch tuộc và rau xào sốt gochujang cay.','タコと野菜をコチュジャンで炒めた辛い料理。','Далайн аман, ногоог халуун соустай хуурсан.']);
addDish('오징어볶음','Ojingeo-bokkeum',[],'한식당',2,['해산물','대두'],
  ['辣炒鱿鱼','Spicy stir-fried squid','Mực xào cay','オジンオボックム（イカの辛炒め）','Ожингё бокүм (халуун кальмар хуурга)'],
  ['鱿鱼切片和蔬菜用辣酱炒。','Squid and vegetables stir-fried in spicy gochujang.','Mực và rau xào sốt gochujang cay.','イカと野菜をコチュジャンで炒めた辛い料理。','Кальмар, ногоог халуун соустай хуурсан.']);
addDish('계란말이','Gyeran-mari',[],'한식당',0,['계란','유제품'],
  ['韩式蛋卷','Rolled omelet','Trứng cuộn Hàn Quốc','卵焼き（韓国風）','Өндөг ороолт'],
  ['鸡蛋卷成长条，松软微甜。','Rolled egg omelet, soft and lightly sweet.','Trứng cuộn mềm, vị ngọt nhẹ.','ふんわりした甘めの卵焼き。','Зөөлөн, бага зэрэг амттай өндөг ороолт.']);
addDish('두부조림','Dubu-jorim',[],'한식당',1,['대두'],
  ['酱烧豆腐','Braised tofu','Đậu phụ kho','豆腐の煮物','Тофу жорим (соустай тофу)'],
  ['豆腐用酱油和辣椒煮至入味。','Tofu braised in soy sauce and chili.','Đậu phụ kho nước tương và ớt.','豆腐を醤油と唐辛子で煮詰めた料理。','Тофуг соёс, чинжүүтэй чанасан.']);
addDish('두부김치','Dubu-kimchi',[],'한식당',1,['대두'],
  ['豆腐泡菜','Tofu with kimchi','Đậu phụ kim chi','豆腐キムチ','Тофу кимчи'],
  ['煎豆腐配炒泡菜，常作下酒菜。','Pan-fried tofu with stir-fried kimchi, a popular side dish.','Đậu phụ chiên ăn kèm kim chi xào.','焼き豆腐にキムチ炒めを添えた料理。','Шарсан тофу, кимчи хуурга.']);
addDish('김치전','Kimchijeon',[],'분식',1,['밀','계란','대두'],
  ['泡菜煎饼','Kimchi pancake','Bánh xèo kim chi','キムチチヂミ','Кимчи бялуу'],
  ['泡菜和面糊煎成的饼，外脆内软。','Pancake made with kimchi and batter, crispy outside.','Bánh kim chi chiên giòn ngoài.','キムチ入りの小麦粉のパンケーキ。外はカリッと。','Кимчитэй гурилан бялуу, гадна нь хатуу.']);
addDish('감자전','Gamjajeon',[],'분식',0,['밀','계란'],
  ['土豆煎饼','Potato pancake','Bánh khoai tây chiên','ポテジョン（じゃがいものチヂミ）','Гамжажон (төмсний бялуу)'],
  ['磨碎土豆煎成的饼，口感松软。','Grated potato pancake, crispy and soft.','Bánh khoai tây bào chiên giòn.','すりおろしたじゃがいもを焼いたパンケーキ。','Тараасан төмсөөр хийсэн бялуу.']);
addDish('치즈떡볶이','Chijeu-tteokbokki',[],'분식',2,['유제품','밀','대두'],
  ['芝士炒年糕','Cheese tteokbokki','Tteokbokki phô mai','チーズトッポッキ','Бяслагтай ттөкбокки'],
  ['辣炒年糕上铺满拉丝芝士。','Tteokbokki topped with melted cheese.','Tteokbokki cay phủ phô mai kéo sợi.','辛いトッポッキにとろけるチーズをのせた料理。','Халуун ттөкбокки, дээр нь халуун бяслаг.']);
addDish('참치김밥','Chamchi-gimbap',[],'분식',0,['해산물','계란','밀'],
  ['金枪鱼紫菜包饭','Tuna gimbap','Cơm cuộn cá ngừ','ツナキンパ','Тунцтэй гимбаб'],
  ['金枪鱼拌美乃滋卷进紫菜饭卷。','Seaweed rice roll with tuna and mayo.','Cơm cuộn rong biển với cá ngừ và sốt mayonnaise.','ツナマヨを巻いた海苔巻き。','Тунцтэй майонезтэй далайн хялгай ороолт.']);
addDish('치즈김밥','Chijeu-gimbap',[],'분식',0,['유제품','계란'],
  ['芝士紫菜包饭','Cheese gimbap','Cơm cuộn phô mai','チーズキンパ','Бяслагтай гимбаб'],
  ['紫菜饭卷里加了芝士和蛋皮。','Seaweed rice roll with cheese and egg.','Cơm cuộn rong biển có phô mai và trứng.','チーズと卵を入れた海苔巻き。','Бяслаг, өндөгтэй далайн хялгай ороолт.']);
addDish('핫도그','Hotdog',[],'분식',0,['밀','돼지고기','계란'],
  ['韩式热狗','Korean corn dog','Corn dog Hàn Quốc','ホットドッグ','Халуун хот дог'],
  ['面衣炸香肠，外酥内软。','Sausage coated in batter and fried, crispy outside.','Xúc xích bọc bột chiên giòn.','衣をつけて揚げたソーセージ。','Гурилаар бүрсэн шарсан усан хиам.']);
addDish('팥빙수','Patbingsu',[],'카페',0,['유제품','대두'],
  ['红豆刨冰','Red bean shaved ice','Đá bào đậu đỏ','パッピンス（小豆のかき氷）','Патбингсү (буурцагтай мөс)'],
  ['刨冰上加红豆、年糕和练乳。','Shaved ice with sweet red beans, rice cakes and condensed milk.','Đá bào với đậu đỏ, bánh gạo và sữa đặc.','かき氷に小豆・餅・練乳をのせたデザート。','Мөсөнд буурцаг, гулгуур, нөхөр сүү.']);
addDish('붕어빵','Bungeobbang',[],'분식',0,['밀','계란','유제품'],
  ['鲫鱼饼','Fish-shaped waffle','Bánh cá Bungeoppang','プンオッパン（鯛焼き）','Бунгоббан (загас хэлбэртэй бялуу)'],
  ['鱼形的饼，里面包红豆或奶油。','Fish-shaped pastry filled with red bean or custard.','Bánh hình cá nhân đậu đỏ hoặc kem.','鯛の形をした焼き菓子。あんこやクリーム。','Загас хэлбэртэй, буурцаг эсвэл тос.']);
addDish('식혜','Sikhye',[],'카페',0,[],
  ['甜米酒饮','Sweet rice drink','Nước gạo ngọt Sikhye','シッケ（甘酒風の飲み物）','Шикхэ (амттай будааны ундаа)'],
  ['麦芽和米煮成的甜饮，解腻。','Sweet, cold drink made from rice and malt.','Thức uống gạo ngọt, mát.','麦芽と米で作る甘い飲み物。','Будаа, шар тарианаас хийсэн амттай ундаа.']);
addDish('수정과','Sujeonggwa',[],'카페',0,[],
  ['桂皮饮','Cinnamon punch','Nước quế Sujeonggwa','スジョングァ（シナモンの飲み物）','Сужонгва (шанцай ундаа)'],
  ['生姜和桂皮煮的甜饮，加柿饼。','Cinnamon and ginger punch with persimmon.','Nước quế gừng ngọt có hồng khô.','ショウガとシナモンの甘い飲み物。','Женжифүү, шанцайтай амттай ундаа.']);
addDish('미숫가루','Misugaru',[],'카페',0,['밀','대두'],
  ['炒米粉饮','Grain powder drink','Bột ngũ cốc Misugaru','ミスルガル（穀物粉の飲み物）','Мисугару (үр тарианы нунтаг ундаа)'],
  ['炒过的谷物粉用牛奶或水调成。','Roasted grain powder mixed with milk or water.','Bột ngũ cốc rang pha với sữa hoặc nước.','炒った穀物の粉を牛乳や水で溶いた飲み物。','Шарсан үрийн нунтаг, сүү эсвэл усаар.']);
addDish('아인슈페너','Ainsupenner',[],'카페',0,['유제품'],
  ['维也纳咖啡','Einspänner coffee','Cà phê Einspänner','アインシュペナー','Айнсүпенэр кофе'],
  ['浓缩咖啡上面加满奶油。','Espresso topped with whipped cream.','Espresso phủ kem tươi.','エスプレッソにホイップクリームをのせたコーヒー。','Эспрессо, дээр нь цагаан тос.']);
addDish('카푸치노','Kapuchino',[],'카페',0,['유제품'],
  ['卡布奇诺','Cappuccino','Cappuccino','カプチーノ','Капучино'],
  ['浓缩咖啡配等量的奶泡。','Espresso with equal parts steamed milk and foam.','Espresso với sữa và bọt sữa.','エスプレッソに同量のミルクフォーム。','Эспрессо, адил хэмжээтэй сүүний хөөс.']);
addDish('카라멜마키아토','Karamel-makiato',[],'카페',0,['유제품'],
  ['焦糖玛奇朵','Caramel macchiato','Caramel macchiato','キャラメルマキアート','Карамел макиато'],
  ['香草牛奶配焦糖和浓缩咖啡。','Vanilla milk with espresso and caramel.','Sữa vani, espresso và caramel.','バニラミルクにエスプレッソとキャラメル。','Ванилийн сүү, эспрессо, карамел.']);
addDish('모카라떼','Moka-latte',[],'카페',0,['유제품'],
  ['摩卡拿铁','Mocha latte','Latte mocha','モカラテ','Мока латте'],
  ['浓缩咖啡配巧克力和牛奶。','Espresso with chocolate and steamed milk.','Espresso với sô cô la và sữa.','エスプレッソにチョコレートとミルク。','Эспрессо, шоколад, сүү.']);
addDish('마파두부','Mapa-dubu',[],'중식당',2,['대두','돼지고기'],
  ['麻婆豆腐','Mapo tofu','Đậu phụ Mapo','麻婆豆腐','Мапо тофу'],
  ['豆腐和肉末用花椒和辣酱炒。','Tofu and minced pork in a spicy, numbing sauce.','Đậu phụ và thịt băm sốt cay tê.','豆腐と挽肉を花椒と唐辛子で煮込んだ料理。','Тофу, нарийн мах, халуун мансуулагч соус.']);
addDish('고추잡채','Gochu-japchae',[],'중식당',2,['돼지고기','계란','밀'],
  ['辣椒炒肉丝','Spicy stir-fried pork','Thịt xào ớt','唐辛子と豚肉の炒め','Халуун гахайн хуурга'],
  ['猪肉丝和青椒一起炒，微辣。','Pork and green pepper stir-fried, lightly spicy.','Thịt heo xào ớt xanh, hơi cay.','豚肉とピーマンの炒め物。少し辛い。','Гахай, ногоон чинжүүтэй хуурсан, бага зэрэг халуун.']);
addDish('간짜장','Gan-jjajang',[],'중식당',0,['돼지고기','밀','대두'],
  ['干炸酱面','Dry black bean noodles','Mì tương đen khô','カンチャジャン（汁なし醤）','Гань жажан (хуурай хар буурцагтай гоймон)'],
  ['汤汁少的炸酱面，拌匀后吃。','Dry noodles with black bean sauce, mixed before eating.','Mì tương đen khô, trộn đều rồi ăn.','汁の少ない黒味噌ソースの麺。混ぜて食べる。','Шөлгүй хар буурцагтай гоймон, холиод иднэ.']);
addDish('야키니쿠','Yakiniku',[],'고깃집',0,['소고기','대두'],
  ['烧肉','Yakiniku (Japanese BBQ)','Yakiniku (thịt nướng Nhật)','焼肉','Якиники (шарсан мах)'],
  ['牛肉片在烤盘上自己烤着吃。','Thin beef slices grilled at your table.','Thịt bò thái mỏng tự nướng trên bàn.','テーブルで自分で焼いて食べる肉料理。','Ширээн дээрээ өөрөө шарж иддэг үхрийн мах.']);
addDish('닭발','Dakbal',[],'고깃집',2,[],
  ['辣鸡爪','Spicy chicken feet','Chân gà cay','タッパル（辛い鶏足）','Дакбал (халуун тахианы хөл)'],
  ['鸡爪用辣酱卤或炒，很辣。','Chicken feet braised or stir-fried in spicy gochujang sauce.','Chân gà hầm hoặc xào sốt cay.','鶏の足を辛いタレで煮込んだ料理。','Тахианы хөлийг халуун соустай чанасан.']);
addDish('파닭','Pa-dak',[],'치킨집',0,['밀','계란'],
  ['葱炸鸡','Scallion chicken','Gà rán hành lá','パダク（ネギチキン）','Па дак (сонгинотой тахиа)'],
  ['炸鸡配大量葱丝，清爽。','Fried chicken topped with lots of green onion.','Gà rán phủ nhiều hành lá.','たっぷりのネギをのせた揚げチキン。','Олон сонгинотой шарсан тахиа.']);

/* ================= 화면 문구 ================= */
const I18N = {
  zh: {
    navHome:'探索', navMap:'地图', navReviews:'社区', navScan:'菜单拍照', navSaved:'收藏', savedTitle:'收藏的菜单', savedDesc:'收藏想再看的菜单。', savedEmpty:'还没有收藏的菜单。点击菜单卡片上的 ☆ 即可收藏。', saveBtn:'☆ 收藏', savedBtn:'★ 已收藏',
    badge:'留学生专用 · 测试版',
    heroTitle:'看不懂招牌也能点餐<br>', heroSub:'拍下菜单或招牌，就能告诉你这是什么店、菜是什么、该怎么点。',
    searchPh:'输入菜名，例如 김치찌개', searchBtn:'查找', aria:'语言',
    sec1Title:'① 用照片识别', sec1Desc:'拍下招牌或菜单，识别文字并找出菜品。',
    upload:'拍照 / 选择照片', ocrBtn:'开始识别文字', sampleBtn:'用示例菜单试试',
    ocrLabel:'识别出的文字（错了可以直接修改）', ocrPh:'拍照识别，或直接粘贴菜单文字。', matchBtn:'从这些文字中找菜单',
    sec2Title:'② 避开的食材', sec2Desc:'勾选后，含有这些食材的菜会显示警示。',
    sec3Title:'③ 点餐句子', carouselTitle:'这些店也能读', faqTitle:'常见问题',
    ctaTitle:'今晚去附近的店看看吧？', ctaBtn:'去读菜单',
    footer:'© 2026 附近店铺指南 · 原型<br>菜单词典为示例数据，可能与实际菜单不同，过敏请务必向店员确认。',
    introResult:'在上面搜索菜名，或拍一张照片试试。', noResultHint:'直接输入菜名，或点下面的示例试试。',
    toastPickFile:'请先选择照片。', toastNoFile:'先选择照片再开始识别。', toastNoText:'请先识别文字或输入内容。',
    toastNeedName:'请输入菜名。', toastFound:n=>`找到 ${n} 道菜。`, toastNotFound:'没有找到菜单，请检查文字。',
    toastNoTess:'识别工具加载失败，请检查网络或直接输入文字。', toastOcrOk:'已读取文字，请确认后找菜单。',
    toastOcrEmpty:'没有读到文字，请靠近一点再拍或直接输入。', toastOcrErr:'识别出错了，请直接输入文字或试试示例。',
    toastPhotoOk:'照片已选择，请点击“开始识别文字”。', toastSpeech:'此浏览器不支持语音播放。',
    toastCopied:'已复制，请给店员看。', toastCopyFail:'复制失败，请长按文字复制。',
    toastAvoidOn:n=>`已为含${n}的菜品显示警示。`, toastAvoidOff:n=>`已取消${n}警示。`,
    toastLang:'已切换语言。',
    prep:'准备中…（第一次需要下载韩语数据，会慢一点）', reading:'识别文字中…', anon:'匿名',
    mapPageTitle:'学校附近店铺地图',
    mapIntro:'这里无法显示地图图片，所以每家店都有一个网上地图链接，点击即可在网上地图中查看。',
    filterAll:'全部', filterFood:'餐厅', filterPlay:'游玩',
    playSoon:'游玩信息将在下一步加入。', noPlaces:'还没有登记的店铺，请在下面直接添加。',
    menuShow:'查看菜单', menuHide:'收起菜单', openNaver:'在 Naver 地图查看', delPlace:'删除',
    exampleTag:'示例', addToggle:'添加店铺', addClose:'关闭',
    addNamePh:'店名', addAddrPh:'地址（可选）',
    addMenuPh:'从 Naver 地图复制菜单后粘贴。每行一道菜，例如：김치찌개 9,000원',
    addSubmit:'保存', addKind:'类型',
    toastPlaceNeed:'请输入店名。', toastPlaceAdded:'店铺已添加。', toastPlaceDel:'店铺已删除。',
    unmatched:'还不在我们的说明词典里，只显示价格。', noMenu:'暂无菜单信息。',
    feedTitle:'留学生动态', feedDesc:'分享你的留学生活、美食和地点。',
    writeFab:'写帖子', writeTitle:'写帖子',
    fNickPh:'昵称（必填）', fCountry:'国籍', fTitlePh:'标题', fBodyPh:'写下你的体验…',
    fTagsPh:'话题标签（例：자취요리 가성비 매운음식）', fPlacePh:'地点（店名）', fAddrPh:'地址（可选）',
    fFavPh:'最好吃的菜', fPhoto:'添加照片（最多 3 张）', fSubmit:'发布', fCancel:'关闭',
    feedEmpty:'还没有帖子，来发第一篇吧！', fNeedNick:'请输入昵称。', fNeedTitle:'请输入标题。', fNeedBody:'请输入内容。',
    fPosted:'帖子已发布，谢谢！', fPhotoLimit:'最多只能添加 3 张照片。',
    fOffline:'目前只保存在这台设备上。连接共享存储后，所有人都能看到。', fSaveFail:'保存失败，请稍后再试。',
    fPlaceLabel:'', fFavLabel:'最好吃的菜：',
    rxRec:'推荐', rxLike:'喜欢', rxTasty:'好吃', rxBest:'最棒', rxThanks:'感谢',
    sortRecent:'最新', sortPopular:'推荐多',
    faq: [
      {q:'照片会被传到服务器吗？', a:'文字识别在你的浏览器里完成，本应用不保存照片。只是识别引擎和韩语数据第一次使用时需要从网上下载。'},
      {q:'识别不准怎么办？', a:'在明亮的地方靠近、水平拍摄。识别错误时可以直接修改文字框，再找菜单。'},
      {q:'所有菜都能识别吗？', a:'目前只是约 50 道常见菜的示例词典，词典里没有的菜无法识别。'},
      {q:'翻译和食材说明准确吗？', a:'说明是简短概括，不同店的食材和做法可能不同。有过敏或宗教饮食限制，请务必向店员确认。'},
      {q:'只想看不能吃的食材怎么办？', a:'在②中勾选要避开的食材，含有该食材的菜会显示红色警示。'},
      {q:'网上地图的菜单能自动读取吗？', a:'不能自动读取。请在网上地图中复制菜单，粘贴到“添加店铺”里，就能生成菜单列表。'}
    ]
  },
  en: {
    navHome:'Explore', navMap:'Map', navReviews:'Community', navScan:'Scan menu', navSaved:'Saved', savedTitle:'Saved dishes', savedDesc:'Dishes you want to revisit.', savedEmpty:'No saved dishes yet. Tap ☆ on a menu card to save it.', saveBtn:'☆ Save', savedBtn:'★ Saved',
    badge:'For international students · Beta',
    heroTitle:'Can’t read the signs?<br>You can still order', heroSub:'Take a photo of a menu or sign. We’ll tell you what kind of place it is, what the dishes are, and what to say.',
    searchPh:'Type a dish, e.g. 김치찌개', searchBtn:'Search', aria:'Language',
    sec1Title:'① Read from a photo', sec1Desc:'Photograph a sign or menu. We read the text and find the dishes.',
    upload:'Take or choose a photo', ocrBtn:'Read the text', sampleBtn:'Try the sample menu',
    ocrLabel:'Recognized text (edit it if something is wrong)', ocrPh:'Read a photo, or paste the menu text here.', matchBtn:'Find dishes in this text',
    sec2Title:'② Ingredients to avoid', sec2Desc:'Check an ingredient and dishes containing it will show a warning.',
    sec3Title:'③ Ordering phrases', carouselTitle:'We can read these shops too', faqTitle:'FAQ',
    ctaTitle:'Ready to try a shop nearby tonight?', ctaBtn:'Read a menu',
    footer:'© 2026 Neighborhood Shop Guide · Prototype<br>The menu list is sample data and may differ from the real menu. Always confirm allergies with staff.',
    introResult:'Search a dish above, or try a photo.', noResultHint:'Type a dish name, or try one of the examples below.',
    toastPickFile:'Please choose a photo first.', toastNoFile:'Choose a photo before reading the text.', toastNoText:'Read a photo or type some text first.',
    toastNeedName:'Please type a dish name.', toastFound:n=>`${n} dishes found.`, toastNotFound:'No dishes found. Check the text and try again.',
    toastNoTess:'The text reader could not load. Check your connection or type the text.', toastOcrOk:'Text read. Check it, then find dishes.',
    toastOcrEmpty:'No text found. Move closer or type it in.', toastOcrErr:'Reading failed. Type the text or try the sample.',
    toastPhotoOk:'Photo selected. Tap “Read the text”.', toastSpeech:'This browser cannot play speech.',
    toastCopied:'Copied. Show it to the staff.', toastCopyFail:'Copy failed. Long-press the text to copy it.',
    toastAvoidOn:n=>`Warnings on for dishes with ${n}.`, toastAvoidOff:n=>`Warnings off for ${n}.`,
    toastLang:'Language changed.',
    prep:'Getting ready… (the first run downloads Korean data, so it takes a moment)', reading:'Reading text…', anon:'Anonymous',
    mapPageTitle:'Shops near campus',
    mapIntro:'Map pictures can’t be shown here, so each shop links to Naver Map, where you can see its location.',
    filterAll:'All', filterFood:'Food', filterPlay:'Fun',
    playSoon:'Fun spots are coming in the next step.', noPlaces:'No shops yet. Add one below.',
    menuShow:'See menu', menuHide:'Hide menu', openNaver:'View on Naver Map', delPlace:'Delete',
    exampleTag:'Example', addToggle:'Add a shop', addClose:'Close',
    addNamePh:'Shop name', addAddrPh:'Address (optional)',
    addMenuPh:'Paste the menu copied from Naver Map. One item per line, e.g. 김치찌개 9,000원',
    addSubmit:'Save', addKind:'Type',
    toastPlaceNeed:'Please enter a shop name.', toastPlaceAdded:'Shop added.', toastPlaceDel:'Shop deleted.',
    unmatched:'Not in our description list yet. Only the price is shown.', noMenu:'No menu info yet.',
    feedTitle:'Student feed', feedDesc:'Share your student life, food and places.',
    writeFab:'Write', writeTitle:'New post',
    fNickPh:'Nickname (required)', fCountry:'Country', fTitlePh:'Title', fBodyPh:'Write about your experience…',
    fTagsPh:'Hashtags (e.g. 자취요리 cheap spicy)', fPlacePh:'Place (shop name)', fAddrPh:'Address (optional)',
    fFavPh:'Favorite dish', fPhoto:'Add photos (up to 3)', fSubmit:'Post', fCancel:'Close',
    feedEmpty:'No posts yet. Be the first!', fNeedNick:'Please enter a nickname.', fNeedTitle:'Please enter a title.', fNeedBody:'Please write something.',
    fPosted:'Posted. Thank you!', fPhotoLimit:'You can add up to 3 photos.',
    fOffline:'Saved on this device only for now. Everyone will see posts once shared storage is connected.', fSaveFail:'Could not save. Please try again.',
    fPlaceLabel:'', fFavLabel:'Favorite dish: ',
    rxRec:'Recommend', rxLike:'Like', rxTasty:'Tasty', rxBest:'Best', rxThanks:'Thanks',
    sortRecent:'Newest', sortPopular:'Most liked',
    faq: [
      {q:'Is my photo sent to a server?', a:'Text reading runs inside your browser, and this app does not store photos. The reader and Korean data are downloaded once from the internet the first time you use it.'},
      {q:'What if the reading is wrong?', a:'Shoot in good light, close up and level. If the text is wrong, edit the box and then find dishes again.'},
      {q:'Can it read every dish?', a:'Not yet. It is a sample dictionary of about 50 common dishes, and anything not in it will not be found.'},
      {q:'Are the translations and ingredients accurate?', a:'They are short summaries, and each shop’s ingredients and cooking can differ. If you have an allergy or dietary rule, always confirm with the staff.'},
      {q:'How do I avoid ingredients I can’t eat?', a:'Check the ingredients in section ②. Dishes containing them get a red warning.'},
      {q:'Can the menu be read from Naver Map automatically?', a:'No. Copy the menu from Naver Map and paste it into “Add a shop” to create the menu list.'}
    ]
  },
  vi: {
    navHome:'Khám phá', navMap:'Bản đồ', navReviews:'Cộng đồng', navScan:'Quét thực đơn', navSaved:'Đã lưu', savedTitle:'Món đã lưu', savedDesc:'Các món bạn muốn xem lại.', savedEmpty:'Chưa có món nào được lưu. Nhấn ☆ trên thẻ món để lưu.', saveBtn:'☆ Lưu', savedBtn:'★ Đã lưu',
    badge:'Dành cho du học sinh · Bản thử',
    heroTitle:'Không đọc được biển hiệu?<br>Vẫn có thể gọi món', heroSub:'Chụp thực đơn hoặc biển hiệu để biết đây là quán gì, món ăn ra sao và nên nói gì khi gọi.',
    searchPh:'Nhập tên món, ví dụ 김치찌개', searchBtn:'Tìm', aria:'Ngôn ngữ',
    sec1Title:'① Đọc từ ảnh', sec1Desc:'Chụp biển hiệu hoặc thực đơn. Chúng tôi đọc chữ và tìm món.',
    upload:'Chụp hoặc chọn ảnh', ocrBtn:'Nhận dạng chữ', sampleBtn:'Thử thực đơn mẫu',
    ocrLabel:'Chữ nhận dạng được (có thể sửa nếu sai)', ocrPh:'Nhận dạng từ ảnh, hoặc dán chữ thực đơn vào đây.', matchBtn:'Tìm món trong đoạn chữ này',
    sec2Title:'② Nguyên liệu cần tránh', sec2Desc:'Chọn nguyên liệu và các món có nguyên liệu đó sẽ hiện cảnh báo.',
    sec3Title:'③ Câu gọi món', carouselTitle:'Chúng tôi cũng đọc được các quán này', faqTitle:'Câu hỏi thường gặp',
    ctaTitle:'Tối nay thử quán gần đây nhé?', ctaBtn:'Đọc thực đơn',
    footer:'© 2026 Hướng dẫn quán gần đây · Bản mẫu<br>Danh sách món chỉ là dữ liệu mẫu, có thể khác thực đơn thật. Hãy xác nhận dị ứng với nhân viên.',
    introResult:'Tìm món ở trên hoặc thử chụp ảnh.', noResultHint:'Nhập tên món, hoặc thử một ví dụ bên dưới.',
    toastPickFile:'Vui lòng chọn ảnh trước.', toastNoFile:'Chọn ảnh trước khi nhận dạng.', toastNoText:'Hãy nhận dạng ảnh hoặc nhập chữ trước.',
    toastNeedName:'Vui lòng nhập tên món.', toastFound:n=>`Tìm thấy ${n} món.`, toastNotFound:'Không tìm thấy món. Hãy kiểm tra lại chữ.',
    toastNoTess:'Không tải được công cụ đọc chữ. Kiểm tra mạng hoặc nhập chữ trực tiếp.', toastOcrOk:'Đã đọc chữ. Hãy kiểm tra rồi tìm món.',
    toastOcrEmpty:'Không đọc được chữ. Hãy chụp gần hơn hoặc nhập trực tiếp.', toastOcrErr:'Nhận dạng lỗi. Hãy nhập chữ hoặc thử mẫu.',
    toastPhotoOk:'Đã chọn ảnh. Bấm “Nhận dạng chữ”.', toastSpeech:'Trình duyệt này không phát được giọng nói.',
    toastCopied:'Đã sao chép. Hãy đưa cho nhân viên xem.', toastCopyFail:'Sao chép lỗi. Hãy nhấn giữ chữ để sao chép.',
    toastAvoidOn:n=>`Đã bật cảnh báo cho món có ${n}.`, toastAvoidOff:n=>`Đã tắt cảnh báo ${n}.`,
    toastLang:'Đã đổi ngôn ngữ.',
    prep:'Đang chuẩn bị… (lần đầu cần tải dữ liệu tiếng Hàn nên hơi lâu)', reading:'Đang đọc chữ…', anon:'Ẩn danh',
    mapPageTitle:'Quán gần trường',
    mapIntro:'Không thể hiển thị ảnh bản đồ ở đây, nên mỗi quán có liên kết đến Naver Map để xem vị trí.',
    filterAll:'Tất cả', filterFood:'Ăn uống', filterPlay:'Vui chơi',
    playSoon:'Địa điểm vui chơi sẽ được thêm ở bước tiếp theo.', noPlaces:'Chưa có quán nào. Hãy thêm bên dưới.',
    menuShow:'Xem thực đơn', menuHide:'Ẩn thực đơn', openNaver:'Xem trên Naver Map', delPlace:'Xóa',
    exampleTag:'Ví dụ', addToggle:'Thêm quán', addClose:'Đóng',
    addNamePh:'Tên quán', addAddrPh:'Địa chỉ (không bắt buộc)',
    addMenuPh:'Dán thực đơn đã sao chép từ Naver Map. Mỗi dòng một món, ví dụ: 김치찌개 9,000원',
    addSubmit:'Lưu', addKind:'Loại',
    toastPlaceNeed:'Vui lòng nhập tên quán.', toastPlaceAdded:'Đã thêm quán.', toastPlaceDel:'Đã xóa quán.',
    unmatched:'Món này chưa có trong danh sách giải thích. Chỉ hiện giá.', noMenu:'Chưa có thông tin thực đơn.',
    feedTitle:'Bảng tin du học sinh', feedDesc:'Chia sẻ cuộc sống du học, món ăn và địa điểm.',
    writeFab:'Viết bài', writeTitle:'Bài viết mới',
    fNickPh:'Biệt danh (bắt buộc)', fCountry:'Quốc tịch', fTitlePh:'Tiêu đề', fBodyPh:'Viết về trải nghiệm của bạn…',
    fTagsPh:'Hashtag (ví dụ: 자취요리 giá_rẻ cay)', fPlacePh:'Địa điểm (tên quán)', fAddrPh:'Địa chỉ (không bắt buộc)',
    fFavPh:'Món ngon nhất', fPhoto:'Thêm ảnh (tối đa 3)', fSubmit:'Đăng', fCancel:'Đóng',
    feedEmpty:'Chưa có bài viết. Hãy là người đầu tiên!', fNeedNick:'Vui lòng nhập biệt danh.', fNeedTitle:'Vui lòng nhập tiêu đề.', fNeedBody:'Vui lòng nhập nội dung.',
    fPosted:'Đã đăng. Cảm ơn bạn!', fPhotoLimit:'Chỉ được thêm tối đa 3 ảnh.',
    fOffline:'Hiện chỉ lưu trên thiết bị này. Khi kết nối kho dữ liệu chung, mọi người sẽ thấy bài viết.', fSaveFail:'Không lưu được. Vui lòng thử lại.',
    fPlaceLabel:'', fFavLabel:'Món ngon nhất: ',
    rxRec:'Giới thiệu', rxLike:'Thích', rxTasty:'Ngon', rxBest:'Tuyệt vời', rxThanks:'Cảm ơn',
    sortRecent:'Mới nhất', sortPopular:'Nhiều lượt thích',
    faq: [
      {q:'Ảnh có được gửi lên máy chủ không?', a:'Việc đọc chữ diễn ra trong trình duyệt của bạn và ứng dụng không lưu ảnh. Chỉ có bộ nhận dạng và dữ liệu tiếng Hàn là được tải từ internet lần đầu.'},
      {q:'Nhận dạng sai thì sao?', a:'Hãy chụp ở chỗ đủ sáng, gần và thẳng. Nếu chữ sai, bạn có thể sửa trong ô văn bản rồi tìm món lại.'},
      {q:'Có nhận dạng được mọi món không?', a:'Chưa. Đây là từ điển mẫu khoảng 50 món phổ biến, món nào không có trong đó sẽ không tìm thấy.'},
      {q:'Bản dịch và nguyên liệu có chính xác không?', a:'Đây là phần tóm tắt ngắn, nguyên liệu và cách nấu có thể khác từng quán. Nếu bị dị ứng hoặc có chế độ ăn riêng, hãy xác nhận với nhân viên.'},
      {q:'Làm sao để tránh nguyên liệu tôi không ăn được?', a:'Chọn nguyên liệu ở mục ②. Món có nguyên liệu đó sẽ hiện cảnh báo màu đỏ.'},
      {q:'Có tự đọc thực đơn từ Naver Map được không?', a:'Không tự động được. Hãy sao chép thực đơn từ Naver Map rồi dán vào “Thêm quán” để tạo danh sách món.'}
    ]
  },
  ja: {
    navHome:'探索', navMap:'マップ', navReviews:'コミュニティ', navScan:'メニュー撮影', navSaved:'保存', savedTitle:'保存したメニュー', savedDesc:'後で見たいメニューをまとめています。', savedEmpty:'まだ保存したメニューはありません。カードの ☆ を押すとここに追加されます。', saveBtn:'☆ 保存', savedBtn:'★ 保存済み',
    badge:'留学生向け · ベータ版',
    heroTitle:'看板が読めなくても<br>注文はできます', heroSub:'メニューや看板を撮ると、どんなお店か、料理の内容、注文の言い方がわかります。',
    searchPh:'料理名を入力（例：김치찌개）', searchBtn:'検索', aria:'言語',
    sec1Title:'① 写真から読む', sec1Desc:'看板やメニューを撮ると、文字を読んで料理を探します。',
    upload:'撮影 / 写真を選ぶ', ocrBtn:'文字認識を開始', sampleBtn:'サンプルメニューで試す',
    ocrLabel:'認識された文字（間違いは直接修正できます）', ocrPh:'写真から読み取るか、メニューの文字を貼り付けてください。', matchBtn:'この文字からメニューを探す',
    sec2Title:'② 避けたい食材', sec2Desc:'食材にチェックすると、その食材を含む料理に注意が表示されます。',
    sec3Title:'③ 注文フレーズ', carouselTitle:'他のお店も読めます', faqTitle:'よくある質問',
    ctaTitle:'今夜、近くのお店に行ってみませんか？', ctaBtn:'メニューを読む',
    footer:'© 2026 近所のお店ガイド · プロトタイプ<br>メニュー辞書はサンプルデータで、実際のメニューと異なる場合があります。アレルギーは必ずお店の方に確認してください。',
    introResult:'上で料理を検索するか、写真を撮ってみてください。', noResultHint:'料理名を入力するか、下の例を押してみてください。',
    toastPickFile:'先に写真を選んでください。', toastNoFile:'写真を選んでから認識を開始してください。', toastNoText:'先に文字を認識するか、入力してください。',
    toastNeedName:'料理名を入力してください。', toastFound:n=>`${n}品見つかりました。`, toastNotFound:'メニューが見つかりません。文字を確認してください。',
    toastNoTess:'文字認識ツールを読み込めませんでした。通信を確認するか、文字を直接入力してください。', toastOcrOk:'文字を読み取りました。内容を確認してメニューを探してください。',
    toastOcrEmpty:'文字が見つかりません。近づいて撮るか、直接入力してください。', toastOcrErr:'認識中に問題が起きました。文字を入力するか、サンプルを試してください。',
    toastPhotoOk:'写真を選びました。「文字認識を開始」を押してください。', toastSpeech:'このブラウザは音声再生に対応していません。',
    toastCopied:'コピーしました。店員に見せてください。', toastCopyFail:'コピーに失敗しました。文字を長押ししてコピーしてください。',
    toastAvoidOn:n=>`${n}を含む料理に警告を表示します。`, toastAvoidOff:n=>`${n}の警告を解除しました。`,
    toastLang:'言語を変更しました。',
    prep:'準備中…（初回は韓国語データをダウンロードするので少し時間がかかります）', reading:'文字を読み取り中…', anon:'匿名',
    mapPageTitle:'学校近くのお店',
    mapIntro:'ここでは地図の画像を表示できないため、各店舗からネイバー地図に移動して場所を確認できます。',
    filterAll:'すべて', filterFood:'食事', filterPlay:'遊び',
    playSoon:'遊び場所の情報は次のステップで追加されます。', noPlaces:'まだお店がありません。下から追加してください。',
    menuShow:'メニューを見る', menuHide:'メニューを閉じる', openNaver:'ネイバー地図で見る', delPlace:'削除',
    exampleTag:'例', addToggle:'お店を追加', addClose:'閉じる',
    addNamePh:'お店の名前', addAddrPh:'住所（任意）',
    addMenuPh:'ネイバー地図からメニューをコピーして貼り付けてください。1行に1品、例：김치찌개 9,000원',
    addSubmit:'保存', addKind:'種類',
    toastPlaceNeed:'お店の名前を入力してください。', toastPlaceAdded:'お店を追加しました。', toastPlaceDel:'お店を削除しました。',
    unmatched:'まだ説明辞書にないメニューです。価格のみ表示します。', noMenu:'メニュー情報がありません。',
    feedTitle:'留学生のフィード', feedDesc:'留学生活、料理、お店の情報をシェアしよう。',
    writeFab:'投稿する', writeTitle:'新しい投稿',
    fNickPh:'ニックネーム（必須）', fCountry:'国籍', fTitlePh:'タイトル', fBodyPh:'体験を書いてください…',
    fTagsPh:'ハッシュタグ（例：자취요리 가성비 매운음식）', fPlacePh:'場所（お店の名前）', fAddrPh:'住所（任意）',
    fFavPh:'一番おいしかったメニュー', fPhoto:'写真を追加（最大3枚）', fSubmit:'投稿', fCancel:'閉じる',
    feedEmpty:'まだ投稿がありません。最初の投稿をしましょう！', fNeedNick:'ニックネームを入力してください。', fNeedTitle:'タイトルを入力してください。', fNeedBody:'内容を入力してください。',
    fPosted:'投稿しました。ありがとうございます！', fPhotoLimit:'写真は最大3枚までです。',
    fOffline:'今はこの端末にだけ保存されます。共有ストレージにつながると、みんなに表示されます。', fSaveFail:'保存できませんでした。もう一度お試しください。',
    fPlaceLabel:'', fFavLabel:'一番おいしかったメニュー：',
    rxRec:'おすすめ', rxLike:'いいね', rxTasty:'美味しい', rxBest:'最高', rxThanks:'感謝',
    sortRecent:'新着順', sortPopular:'おすすめ順',
    faq: [
      {q:'写真はサーバーに送られますか？', a:'文字認識はブラウザの中で行われ、このアプリは写真を保存しません。認識エンジンと韓国語データだけ、初回にインターネットからダウンロードします。'},
      {q:'認識がうまくいかない場合は？', a:'明るい場所で、近くから、水平に撮ってみてください。文字が間違っていれば、入力欄で直してから料理を探せます。'},
      {q:'すべての料理を認識できますか？', a:'まだです。よく使われる約50品のサンプル辞書なので、辞書にない料理は見つかりません。'},
      {q:'翻訳と食材の説明は正確ですか？', a:'短い要約なので、お店ごとに食材や調理法は違う場合があります。アレルギーや宗教上の食事制限がある場合は、必ず店員に確認してください。'},
      {q:'食べられない食材だけ知りたいときは？', a:'②で避けたい食材にチェックしてください。その食材を含む料理に赤い警告が表示されます。'},
      {q:'ネイバー地図のメニューは自動で読めますか？', a:'自動では読めません。ネイバー地図でメニューをコピーし、「お店を追加」に貼り付けるとメニュー一覧が作られます。'}
    ]
  }
};

/* ================= 몽골어(mn) 추가 ================= */
const MN_TAGS = {'돼지고기':'Гахайн мах','소고기':'Үхрийн мах','해산물':'Далайн хоол','계란':'Өндөг','유제품':'Сүүн бүтээгдэхүүн','밀':'Гурил (буудай)','대두':'Соя'};
const MN_STORE = {'한식당':'Солонгос ресторан','고깃집':'Солонгос шарсан мах','분식':'Солонгос хөнгөн хоол','중식당':'Хятад ресторан','일식당':'Япон ресторан','치킨집':'Тахианы газар','카페':'Кафе'};
const MN_LABEL = {
  spice:'Халуун зэрэг', say:'Захиалахдаа ингэж хэлнэ', warnPre:'Таны зайлсхийх орц агуулсан: ', noTag:'Харшил бүртгэгдээгүй',
  listen:'Сонсох', copy:'Хуулах', storeType:'Газрын төрөл', none:'Жагсаалтад цэс олдсонгүй',
  found:n=>`${n} хоол олдлоо`, warnCount:n=>`, үүний ${n} нь таны зайлсхийх орцтой`
};
const MN_COUNTRY = {VN:'Вьетнам', CN:'Хятад', JP:'Япон', TW:'Тайвань', TH:'Тайланд', ID:'Индонез', PH:'Филиппин', MN:'Монгол', UZ:'Узбекистан', KZ:'Казахстан', NP:'Непал', BD:'Бангладеш', RU:'Орос', US:'АНУ', OT:'Бусад'};
const MN_DICT = {
  '김치찌개':['Кимчи шөл','Исгэсэн кимчи, гахайн мах, тофутой хамт чанасан халуун шөл.'],
  '된장찌개':['Тэнжанг шөл','Тэнжан, тофу, ногоотой чанасан шөл. Бага зэрэг халуун.'],
  '비빔밥':['Бибимбап','Будаан дээр ногоо, үхрийн мах, шарсан өндөг тавьж, чанга амтлагчтай хольж иднэ.'],
  '냉면':['Нэнмён (хүйтэн гоймон)','Гурилан гоймон, мөстэй үхрийн махны шөлтэй, лууван, өндөг, өргөст хэмхтэй.'],
  '삼겹살':['Самгёпсаль (гахайн хавирга)','Шарсан гахайн мах, сарлагийн навчинд ороож, сармис, ssamjang-тай иднэ.'],
  '불고기':['Булголги','Чихэрлэг соёсонд маринадласан нимгэн үхрийн мах. Шарсан эсвэл жигнэсэн. Бага зэрэг амттай.'],
  '양념치킨':['Ёнёмчикин (амтлагч тахиа)','Чихэрлэг халуун соустай шарсан тахиа.'],
  '떡볶이':['Төоккбоки (халуун будааны гулгуур)','Чанга гохуджан соустай будааны гулгуур, загасан бүтээгдэхүүнтэй.'],
  '김밥':['Кимбап','Далайн хэрчмэлд будаа, өндөг, ногоо ороосон. Халуун биш.'],
  '짜장면':['Жажанмён','Хар бурам соустай гахайн мах, ногоотой гоймон. Чихэрлэг, халуун биш.'],
  '짬뽕':['Жамбонг (халуун далайн хоолтой гоймон)','Далайн хоол, шүүстэй улаан халуун шөлтэй гоймон.'],
  '탕수육':['Тансүүүк (амтат гахайн мах)','Шарсан гахайн махыг чихэрлэг хүчиллэг соустай.'],
  '돈까스':['Донкаскү (гахайн котлет)','Талхны үрсээр бүрсэн шарсан гахайн мах, байцаа, соустай.'],
  '라멘':['Рамен','Гахайн ясны шөлтэй гоймон, чашу мах, хагас чанасан өндөгтэй.'],
  '돼지국밥':['Гахайн шөлтэй будаа','Гахайн ясны шөлтэй будаа. Хүсвэл чинжүү, шанцай нэмнэ.'],
  '설렁탕':['Соллёнгтан (үхрийн ясны шөл)','Үхрийн ясыг удаан буцалгасан цагаан шөл. Бага зэрэг амттай.'],
  '아메리카노':['Американо','Эспрессо, дулаан эсвэл мөсөн ус. Сүүгүй, гашуун.'],
  '카페라떼':['Кафе латте','Эспрессо, халуун сүү, хөөс. Зөөлөн амттай.']
};
const MN_PHRASES = {
  '맵지 않게 해 주세요.':'Хэт халуун бус хийгээрэй.',
  '알레르기가 있어요.':'Надад хоолны харшил бий.',
  '고기 빼고 주세요.':'Махгүйгээр өгнө үү.',
  '포장해 주세요.':'Авч явахаар боож өгнө үү.',
  '물 한 잔 주세요.':'Нэг аяга ус өгнө үү.',
  '계산해 주세요.':'Тооцоогоо хийж өгнө үү.',
  '여기요!':'Энд ээ!'
};
const MN_SPICY = ['Халуун биш','Бага зэрэг халуун','Халуун','Маш халуун'];
const MN_AREA = 'Гёнсан үндэсний их сургуулийн ойр (Чинжү)';

Object.keys(MN_TAGS).forEach(k => { TAGS[k].mn = MN_TAGS[k]; });
Object.keys(MN_STORE).forEach(k => { STORE[k].mn = MN_STORE[k]; });
Object.keys(MN_LABEL).forEach(k => { LABEL[k].mn = MN_LABEL[k]; });
SPICY.mn = MN_SPICY;
ORDER_TPL.mn = n => `${n} нэгийг өгнө үү.`;
AREAS[0].name.mn = MN_AREA;
COUNTRIES.forEach(c => { c.name.mn = MN_COUNTRY[c.code]; });
AREAS[0].name.mn = MN_AREA;
DICT.forEach(it => { const m = MN_DICT[it.ko]; if (m) { it.name.mn = m[0]; it.desc.mn = m[1]; } });
PHRASES.forEach(p => { p.mn = MN_PHRASES[p.ko]; });

I18N.mn = {
  navHome:'Хайх', navMap:'Газрын зураг', navReviews:'Нийгэмлэг', navScan:'Цэс уншуулах', navSaved:'Хадгалсан', savedTitle:'Хадгалсан хоолнууд', savedDesc:'Дахин харахыг хүссэн хоолнуудаа цуглуулна.', savedEmpty:'Одоогоор хадгалсан хоол алга. Цэсний карт дээрх ☆ дээр дарна уу.', saveBtn:'☆ Хадгалах', savedBtn:'★ Хадгалсан',
  badge:'Гадаад оюутнуудад · Туршилтын хувилбар',
  heroTitle:'Тэмдэгт уншиж чадахгүй юу?<br>Гэхдээ захиалга өгч болно', heroSub:'Цэс эсвэл тэмдэгтийн зургийг аваарай. Ямар газар, ямар хоол, юу гэж хэлэхээ хэлж өгнө.',
  searchPh:'Хоолны нэр бичнэ үү, жишээ: 김치찌개', searchBtn:'Хайх', aria:'Хэл',
  sec1Title:'① Зургаас унших', sec1Desc:'Тэмдэгт эсвэл цэсний зургийг аваарай. Бид текстийг уншаад хоолыг олно.',
  upload:'Зураг авах эсвэл сонгох', ocrBtn:'Текстийг уншуулах', sampleBtn:'Жишээ цэсээр туршина уу',
  ocrLabel:'Таниулсан текст (буруу бол засаж болно)', ocrPh:'Зураг уншуулах эсвэл цэсний текстийг энд буулгана уу.', matchBtn:'Энэ текстээс хоол хайх',
  sec2Title:'② Зайлсхийх орц', sec2Desc:'Орцыг сонговол тэр орц агуулсан хоолд анхааруулга харагдана.',
  sec3Title:'③ Захиалгын үг', carouselTitle:'Бусад газрыг ч уншиж чадна', faqTitle:'Түгээмэл асуулт',
  ctaTitle:'Өнөө орой ойр орчмын газар очих уу?', ctaBtn:'Цэс унших',
  footer:'© 2026 Ойр орчмын газрын гарын авлага · Туршилт<br>Хоолны жагсаалт жишээ өгөгдөл тул жинхэнэ цэстэй ялгаатай байж болно. Харшлаа ажилтнаас заавал асуугаарай.',
  introResult:'Дээр хоолны нэр хайх эсвэл зураг авч үзнэ үү.', noResultHint:'Хоолны нэр бичих эсвэл доорх жишээг дарна уу.',
  toastPickFile:'Эхлээд зураг сонгоно уу.', toastNoFile:'Текст унших өмнө зураг сонгоно уу.', toastNoText:'Эхлээд зураг уншуулах эсвэл текст оруулна уу.',
  toastNeedName:'Хоолны нэр бичнэ үү.', toastFound:n=>`${n} хоол олдлоо.`, toastNotFound:'Хоол олдсонгүй. Текстээ шалгаад дахин оролдоно уу.',
  toastNoTess:'Текст уншигч ачаалагдсангүй. Интернэтээ шалгах эсвэл текстээ шууд оруулна уу.', toastOcrOk:'Текст уншигдлаа. Шалгаад хоол хайна уу.',
  toastOcrEmpty:'Текст олдсонгүй. Ойртож авах эсвэл шууд оруулна уу.', toastOcrErr:'Уншихад алдаа гарлаа. Текстээ оруулах эсвэл жишээг туршина уу.',
  toastPhotoOk:'Зураг сонгогдлоо. “Текстийг уншуулах” дарна уу.', toastSpeech:'Энэ хөтөч дуу тоглуулж чадахгүй.',
  toastCopied:'Хуулагдлаа. Ажилтанд харуулна уу.', toastCopyFail:'Хуулж чадсангүй. Текстийг удаан дарж хуулна уу.',
  toastAvoidOn:n=>`${n} агуулсан хоолд анхааруулга асаалаа.`, toastAvoidOff:n=>`${n}-ийн анхааруулгыг унтраалаа.`,
  toastLang:'Хэл солигдлоо.',
  prep:'Бэлтгэж байна… (эхний удаа Солонгос хэлний өгөгдөл татна)', reading:'Текст уншиж байна…', anon:'Нэргүй',
  mapPageTitle:'Сургуулийн ойр газрууд',
  mapIntro:'Энд газрын зургийн зураг харуулах боломжгүй тул газар бүр Naver Map руу холбоостой.',
  filterAll:'Бүгд', filterFood:'Хоол', filterPlay:'Зугаа',
  playSoon:'Зугаа цэнгэлийн мэдээлэл дараагийн алхамд нэмэгдэнэ.', noPlaces:'Газар бүртгэгдээгүй байна. Доороос нэмнэ үү.',
  menuShow:'Цэс харах', menuHide:'Цэс хаах', openNaver:'Naver Map дээр харах', delPlace:'Устгах',
  exampleTag:'Жишээ', addToggle:'Газар нэмэх', addClose:'Хаах',
  addNamePh:'Газрын нэр', addAddrPh:'Хаяг (заавал биш)',
  addMenuPh:'Naver Map-аас цэсийг хуулж буулгана уу. Мөр бүрт нэг хоол, жишээ: 김치찌개 9,000원',
  addSubmit:'Хадгалах', addKind:'Төрөл',
  toastPlaceNeed:'Газрын нэрийг оруулна уу.', toastPlaceAdded:'Газар нэмэгдлээ.', toastPlaceDel:'Газар устгагдлаа.',
  unmatched:'Энэ хоол тайлбарын жагсаалтад хараахан алга. Зөвхөн үнийг харуулна.', noMenu:'Цэсний мэдээлэл алга.',
  feedTitle:'Оюутнуудын мэдээлэл', feedDesc:'Оюутны амьдрал, хоол, газруудаа хуваалцаарай.',
  writeFab:'Бичих', writeTitle:'Шинэ нийтлэл',
  fNickPh:'Нэр хочоо оруулна уу (заавал)', fCountry:'Улс', fTitlePh:'Гарчиг', fBodyPh:'Туршлагаа бичнэ үү…',
  fTagsPh:'Хэш тэг (жишээ: 자취요리 үнэ_цэнэтэй халуун)', fPlacePh:'Газар (дэлгүүрийн нэр)', fAddrPh:'Хаяг (заавал биш)',
  fFavPh:'Хамгийн дуртай хоол', fPhoto:'Зураг нэмэх (хамгийн ихдээ 3)', fSubmit:'Нийтлэх', fCancel:'Хаах',
  feedEmpty:'Одоогоор нийтлэл алга. Эхний нийтлэлийг та бичээрэй!', fNeedNick:'Нэр хочоо оруулна уу.', fNeedTitle:'Гарчиг оруулна уу.', fNeedBody:'Агуулга оруулна уу.',
  fPosted:'Нийтлэгдлээ. Баярлалаа!', fPhotoLimit:'Хамгийн ихдээ 3 зураг нэмнэ.',
  fOffline:'Одоогоор зөвхөн энэ төхөөрөмжид хадгалагдана. Хамтын сан холбогдвол бүгд харна.', fSaveFail:'Хадгалж чадсангүй. Дахин оролдоно уу.',
  fPlaceLabel:'', fFavLabel:'Хамгийн дуртай хоол: ',
  rxRec:'Зөвлөе', rxLike:'Таалагдлаа', rxTasty:'Амттай', rxBest:'Маш сайн', rxThanks:'Баярлалаа',
  sortRecent:'Шинэ нь эхэнд', sortPopular:'Олон сэтгэгдэлтэй',
  faq: [
    {q:'Зураг сервер рүү илгээгддэг үү?', a:'Текст уншилт таны хөтөч дотор явагдах бөгөөд энэ апп зургийг хадгалдаггүй. Уншигч болон Солонгос хэлний өгөгдөл анх ашиглахад интернэтээс нэг удаа татагдана.'},
    {q:'Уншилт буруу бол яах вэ?', a:'Гэрэлтэй газар, ойрхон, шулуун байдлаар авна уу. Текст буруу бол хайрцагт засаад дахин хоол хайна уу.'},
    {q:'Бүх хоолыг уншиж чадах уу?', a:'Одоогоор 50 орчим түгээмэл хоолын жишээ тайлбарын сан байгаа тул түүнд байхгүй хоол олдохгүй.'},
    {q:'Орчуулга, орцын тайлбар зөв үү?', a:'Тайлбар товч хураангуй тул газар бүрийн орц, хийх арга ялгаатай байж болно. Харшил эсвэл хоолны хязгаарлалттай бол ажилтнаас заавал баталгаажуулна уу.'},
    {q:'Идэж болохгүй орцыг яаж зайлсхийх вэ?', a:'② хэсэгт орцыг сонгоно уу. Тэр орц агуулсан хоолд улаан анхааруулга гарна.'},
    {q:'Naver Map-ийн цэсийг автоматаар уншиж болох уу?', a:'Автоматаар уншиж чадахгүй. Naver Map-аас цэсийг хуулаад “Газар нэмэх” хэсэгт буулгавал цэсийн жагсаалт үүснэ.'}
  ]
};

/* ================= 상태 & 유틸 ================= */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm = s => String(s).replace(/\s+/g, '').toLowerCase();

// 이 기기에만 남는 저장소 (실패해도 앱은 계속 동작)
const db = {
  get(k, d){ try { const v = JSON.parse(localStorage.getItem(k)); return v ?? d; } catch(_) { return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch(_) { return false; } }
};

/* ================= 한국어(ko) 데이터 ================= */
Object.keys(TAGS).forEach(k => { TAGS[k].ko = k; });
Object.keys(STORE).forEach(k => { STORE[k].ko = k; });
Object.assign(LABEL.spice, {ko:'맵기'}); Object.assign(LABEL.say, {ko:'주문할 때 이렇게 말해요'});
Object.assign(LABEL.warnPre, {ko:'피하는 재료가 들어 있어요: '}); Object.assign(LABEL.noTag, {ko:'표시된 알레르기 재료 없음'});
Object.assign(LABEL.listen, {ko:'듣기'}); Object.assign(LABEL.copy, {ko:'복사'});
Object.assign(LABEL.storeType, {ko:'가게 종류'}); Object.assign(LABEL.none, {ko:'등록된 메뉴를 찾지 못했어요'});
LABEL.found.ko = n => `${n}개 메뉴를 찾았어요`; LABEL.warnCount.ko = n => `, 그중 ${n}개에 피하는 재료가 있어요`;
SPICY.ko = ['안 매움','약간 매움','매움','아주 매움'];
ORDER_TPL.ko = n => `${n} 하나 주세요.`;
AREAS[0].name.ko = '경상국립대학교 주변 (진주)';
DICT.forEach(it => { it.name.ko = it.ko; });

I18N.ko = {
  navHome:'메뉴 찾기', navMap:'주변', navReviews:'게시판', navScan:'메뉴 사진', navSaved:'즐겨찾기', savedTitle:'저장한 정보', savedDesc:'다시 보고 싶은 정보를 모아뒀어요.', savedEmpty:'아직 저장한 메뉴가 없어요. 메뉴 카드의 ☆를 눌러 저장하세요.', saveBtn:'☆ 저장', savedBtn:'★ 저장됨',
  badge:'유학생 전용 · 베타',
  heroTitle:'오늘의 학식<br>', heroSub:'',
  searchPh:'음식 이름을 검색해 보세요 (예: 김치찌개)', searchBtn:'검색', aria:'언어',
  sec1Title:'① 사진으로 읽기', sec1Desc:'간판이나 메뉴판을 찍으면 글자를 읽고 음식을 찾아요.',
  upload:'사진 촬영 / 선택', ocrBtn:'사진 글자 읽기', sampleBtn:'예시 메뉴 넣기',
  ocrLabel:'읽은 글자 (틀리면 직접 고칠 수 있어요)', ocrPh:'사진으론 안보이는 기타사항을 넣어주세요(선택)', matchBtn:'사진 촬영',
  sec2Title:'② 피하는 재료', sec2Desc:'재료를 선택하면 그 재료가 든 음식에 경고가 표시돼요.',
  sec3Title:'③ 주문 표현', carouselTitle:'이런 가게도 읽을 수 있어요', faqTitle:'자주 묻는 질문',
  ctaTitle:'오늘 저녁 근처 가게에 가볼까요?', ctaBtn:'메뉴 읽으러 가기',
  footer:'© 2026 이방인 · 프로토타입<br>메뉴 사전은 예시 데이터라 실제와 다를 수 있어요. 알레르기는 꼭 직원에게 확인하세요.',
  introResult:'위에서 음식 이름을 검색하거나 사진을 촬영해 보세요.', noResultHint:'음식 이름을 직접 입력하거나 사진을 찍어 보세요.',
  toastPickFile:'먼저 사진을 선택하세요.', toastNoFile:'글자를 읽기 전에 사진을 선택하세요.', toastNoText:'먼저 사진을 촬영하거나 글자를 입력하세요.',
  toastNeedName:'음식 이름을 입력하세요.', toastFound:n=>`${n}개 메뉴를 찾았어요.`, toastNotFound:'메뉴를 찾지 못했어요. 글자를 확인해 주세요.',
  toastNoTess:'글자 인식 도구를 불러오지 못했어요. 인터넷을 확인하거나 직접 입력하세요.', toastOcrOk:'사진에서 글자를 읽어 메뉴를 찾았어요.',
  toastOcrEmpty:'글자를 찾지 못했어요. 가까이서 다시 찍거나 직접 입력하세요.', toastOcrErr:'읽는 중 오류가 났어요. 직접 입력해 보세요.',
  toastPhotoOk:'사진을 불러왔어요. 글자를 읽고 메뉴를 찾는 중…', toastSpeech:'이 브라우저는 음성 재생을 지원하지 않아요.',
  toastCopied:'복사했어요. 직원에게 보여주세요.', toastCopyFail:'복사하지 못했어요. 글자를 길게 눌러 복사하세요.',
  toastAvoidOn:n=>`${n}이(가) 든 음식에 경고를 표시해요.`, toastAvoidOff:n=>`${n} 경고를 껐어요.`,
  toastLang:'언어를 바꿨어요.',
  prep:'준비 중… (처음에는 한국어 데이터를 내려받아 조금 걸려요)', reading:'글자 읽는 중…', anon:'익명',
  mapPageTitle:'주변 가게',
  mapIntro:'여기서는 지도 그림을 보여줄 수 없어서, 가게마다 네이버 지도 링크를 달아 두었어요.',
  filterAll:'전체', filterFood:'음식', filterPlay:'즐길 거리',
  playSoon:'즐길 거리 정보는 다음 단계에서 추가돼요.', noPlaces:'아직 등록된 가게가 없어요. 아래에서 추가해 주세요.',
  menuShow:'메뉴 보기', menuHide:'메뉴 접기', openNaver:'네이버 지도에서 보기', delPlace:'삭제',
  exampleTag:'예시', addToggle:'＋ 가게 정보 추가', addClose:'닫기',
  addNamePh:'가게 이름', addAddrPh:'주소 (선택)',
  addMenuPh:'네이버 지도에서 메뉴를 복사해 붙여 넣으세요. 한 줄에 하나씩, 예: 김치찌개 9,000원',
  addSubmit:'저장', addKind:'종류',
  toastPlaceNeed:'가게 이름을 입력하세요.', toastPlaceAdded:'가게를 추가했어요.', toastPlaceDel:'가게를 삭제했어요.',
  unmatched:'아직 설명 사전에 없는 메뉴예요. 가격만 보여드려요.', noMenu:'메뉴 정보가 아직 없어요.',
  feedTitle:'학생 게시판', feedDesc:'학교와 주변 생활 이야기를 나눠요.',
  writeFab:'글쓰기', writeTitle:'새 글 쓰기',
  fNickPh:'닉네임 (필수)', fCountry:'국가', fTitlePh:'제목', fBodyPh:'어떤 언어로 써도 자동 번역돼요…',
  fTagsPh:'태그 (예: 자취요리 가성비 매운음식)', fPlacePh:'가게 이름', fAddrPh:'주소 (선택)',
  fFavPh:'추천 메뉴', fPhoto:'사진 추가 (최대 3장)', fSubmit:'게시하기', fCancel:'닫기',
  feedEmpty:'아직 글이 없어요. 첫 글을 써 보세요!', fNeedNick:'닉네임을 입력하세요.', fNeedTitle:'제목을 입력하세요.', fNeedBody:'내용을 입력하세요.',
  fPosted:'글이 등록됐어요. 고마워요!', fPhotoLimit:'사진은 최대 3장까지 넣을 수 있어요.',
  fOffline:'지금은 이 기기에만 저장돼요.', fSaveFail:'저장하지 못했어요. 다시 시도해 주세요.',
  fPlaceLabel:'', fFavLabel:'추천 메뉴: ',
  rxRec:'추천', rxLike:'좋아요', rxTasty:'맛있어요', rxBest:'최고', rxThanks:'고마워요',
  sortRecent:'최신순', sortPopular:'추천순',
  boardUnion:'연합', catAll:'전체', catFood:'먹을 곳', catPlay:'놀 곳', catInfo:'생활 정보', catQ:'질문', catFree:'자유', report:'신고', reportDone:'신고됨', pCatLabel:'게시판',
  hubBack:'← 게시판 목록', hubHint:'들어갈 게시판을 고르세요.', pHobbyLabel:'관심사 게시판', pHobbyNone:'선택 안 함 (국가 게시판에만 올리기)', hMusic:'음악', hSports:'운동', hGame:'게임', hMovie:'영화·드라마', hTravel:'여행', hPhoto:'사진', hCook:'요리', hKpop:'K-POP', hBook:'독서',
  navMore:'더 보기', moreTitle:'더 보기', dHome:'사진과 이름으로 음식 검색', dScan:'메뉴판을 찍어서 읽기', dMap:'학교 근처 정보 모아보기', dSaved:'나중에 볼 음식 모아보기',
  appName:'이름 미정', seedName:'예시 식당 (실제 가게 아님)',
  faq:[
    {q:'사진이 서버로 보내지나요?', a:'글자 인식은 브라우저 안에서 이뤄지고, 이 앱은 사진을 저장하지 않아요. 인식 도구와 한국어 데이터만 처음 쓸 때 인터넷에서 한 번 내려받아요.'},
    {q:'인식이 틀리면 어떻게 하나요?', a:'밝은 곳에서 가까이, 수평으로 찍어 주세요. 글자가 틀리면 상자에서 직접 고친 뒤 다시 음식을 찾으면 돼요.'},
    {q:'모든 음식을 다 읽을 수 있나요?', a:'아직은 자주 먹는 음식 약 100개의 예시 사전이라, 사전에 없는 음식은 찾지 못해요.'},
    {q:'번역과 재료 설명은 정확한가요?', a:'짧게 요약한 설명이라 가게마다 재료와 조리법이 다를 수 있어요. 알레르기나 종교적인 식단 제한이 있으면 꼭 직원에게 확인하세요.'},
    {q:'못 먹는 재료만 피하고 싶어요.', a:'“먹지 않는 재료”에서 재료를 선택하면 그 재료가 든 음식에 빨간 경고가 떠요.'},
    {q:'네이버 지도 메뉴를 자동으로 읽을 수 있나요?', a:'자동으로는 안 돼요. 네이버 지도에서 메뉴를 복사해 “가게 정보 추가”에 붙여 넣으면 메뉴 목록이 만들어져요.'}
  ]
};

/* ================= 커뮤니티 및 UI 기본 다국어 사전 (토큰 절약을 위해 12개 지원 언어 전체 기본값 내장) ================= */
const I18N_C = {
  ko:{navBoard:'게시판', navMenu:'메뉴 찾기', navProfile:'내 정보', navSaved:'즐겨찾기', savedTitle:'저장한 정보', savedDesc:'다시 보고 싶은 정보를 모아뒀어요.',
    boardTitle:'학생 게시판', boardDesc:'어떤 언어로 써도, 모두가 자기 나라 언어로 읽어요.',
    trFrom:'{lang}에서 번역됨', showOrig:'원문 보기', showTr:'번역 보기', translating:'Gemini가 번역 중…', trFailed:'번역 실패', retry:'다시 시도',
    comments:'댓글', commentPh:'어떤 언어로든 댓글을 남겨 보세요', commentSend:'등록', commented:'댓글이 등록됐어요', noComments:'아직 댓글이 없어요. 먼저 인사해 보세요!', backList:'← 목록으로', writer:'글쓴이',
    anonPost:'익명으로 쓰기', profTitle:'내 정보', profDesc:'국적에 따라 보이는 언어가 정해져요.', nickLabel:'닉네임', natLabel:'국적 설정',
    natNote:'국적을 바꾸고 저장하면 메뉴와 모든 글·댓글이 그 나라 언어로 자동 번역돼요.', profSave:'저장', natSaved:'국적이 변경됐어요', profSaved:'저장됐어요', schoolName:'경상국립대학교',
    uiTranslating:'화면을 불러오는 중…', noKey:'Gemini API 키가 없어요 — keys/gemkey 파일에 키를 넣고 server.py를 다시 실행하세요.', noServer:'서버가 실행되지 않았어요 — run.bat(또는 python server.py)으로 열어 주세요.',
    heroEyebrow:'학교 주변 먹거리 도우미', heroTitle:'오늘의 학식<br>', heroSub:'', ctaPhoto:'식권사러가기', quickTitle:'Quick Search', photoTitle:'메뉴판 번역', photoDesc:'사진 속 한글 메뉴를 읽고 음식 정보를 찾아요.', pickPhoto:'사진 촬영', ocrPh:'사진으론 안보이는 기타사항을 넣어주세요(선택)', matchBtn:'사진 촬영',
    avoidTitle:'먹지 않는 재료', avoidNote:'선택해두면 프로필에 저장돼요', resultTitle:'메뉴 결과', phraseTitle:'식당에서 쓰는 한마디', nearbyTitle:'주변 가게 둘러보기', nearbyCard:'학교 근처 가게와 메뉴', nearbyDesc:'학생들이 함께 채우는 동네 안내', nearbyGo:'둘러보기', moreLink:'더 보기 ›',
    mapDesc:'학생들이 주로 방문하는 가게를 모아요.', areaLabel:'지역', menuInfo:'메뉴 정보', bodyLabel:'내용', tagsLabel:'태그', postingAs:'작성자', dBoard:'학교 생활 이야기', resetDemo:'데모 초기화', hotTitle:'실시간 인기 글', recentTitle:'최신 글', seeAll:'전체 보기 ›', boardHome:'← 게시판 홈'},
  en:{navBoard:'Board', navMenu:'Menu', navProfile:'Me', navSaved:'Favorites', savedTitle:'Saved info', savedDesc:'Information you want to revisit.',
    boardTitle:'Student board', boardDesc:'Write in any language — everyone reads it in their own.',
    trFrom:'Translated from {lang}', showOrig:'Show original', showTr:'Show translation', translating:'Translating with Gemini…', trFailed:'Translation failed', retry:'Retry',
    comments:'Comments', commentPh:'Write a comment in any language', commentSend:'Send', commented:'Comment added', noComments:'No comments yet. Say hi!', backList:'← Back to list', writer:'Author',
    anonPost:'Post anonymously', profTitle:'My info', profDesc:'Your nationality decides the language you see.', nickLabel:'Nickname', natLabel:'Nationality',
    natNote:'Save after changing your nationality — menus, posts and comments switch to that country’s language.', profSave:'Save', natSaved:'Nationality changed', profSaved:'Saved', schoolName:'Gyeongsang National University',
    uiTranslating:'Loading interface…', noKey:'No Gemini API key — put your key in keys/gemkey and restart server.py.', noServer:'Server is not running — open this page via run.bat (python server.py).',
    heroEyebrow:'Campus food helper', heroTitle:'Today’s Campus Meal<br>', heroSub:'', ctaPhoto:'Buy meal ticket', quickTitle:'Quick Search', photoTitle:'Translate menu board', photoDesc:'We read the Korean menu in your photo and find the dishes.', pickPhoto:'Take photo', ocrPh:'Add any extra notes not visible in the photo (optional)', matchBtn:'Take photo',
    avoidTitle:'Ingredients I don’t eat', avoidNote:'Saved to your profile when selected', resultTitle:'Menu results', phraseTitle:'Useful Korean at restaurants', nearbyTitle:'Explore nearby shops', nearbyCard:'Shops and menus near campus', nearbyDesc:'A neighborhood guide filled in by students', nearbyGo:'Explore', moreLink:'More ›',
    mapDesc:'Popular shops visited by students.', areaLabel:'Area', menuInfo:'Menu info', bodyLabel:'Content', tagsLabel:'Tags', postingAs:'Posting as', dBoard:'Campus life stories', resetDemo:'Reset demo', hotTitle:'Trending now', recentTitle:'Latest posts', seeAll:'See all ›', boardHome:'← Board home'},
  zh:{navBoard:'论坛', navMenu:'找菜单', navProfile:'我的', navSaved:'收藏夹', savedTitle:'收藏的信息', savedDesc:'汇集了想再次查看的信息。',
    boardTitle:'学生论坛', boardDesc:'无论用什么语言发帖，大家都能用母语阅读。',
    trFrom:'译自 {lang}', showOrig:'查看原文', showTr:'查看翻译', translating:'Gemini 正在翻译…', trFailed:'翻译失败', retry:'重试',
    comments:'评论', commentPh:'可以用任何语言写评论', commentSend:'发送', commented:'评论已发布', noComments:'还没有评论，来打个招呼吧！', backList:'← 返回列表', writer:'作者',
    anonPost:'匿名发帖', profTitle:'我的信息', profDesc:'界面语言会根据你的国籍自动设置。', nickLabel:'昵称', natLabel:'国籍设置',
    natNote:'修改国籍并保存后，菜单及所有帖子、评论都会自动翻译为对应语言。', profSave:'保存', natSaved:'国籍已修改', profSaved:'已保存', schoolName:'庆尚国立大学',
    uiTranslating:'正在加载界面…', noKey:'没有 Gemini API 密钥 — 请在 keys/gemkey 中填入密钥并重启 server.py。', noServer:'服务器未运行 — 请通过 run.bat（或 python server.py）打开。',
    heroEyebrow:'校园周边美食助手', heroTitle:'今日学生食堂<br>', heroSub:'', ctaPhoto:'去买餐券', quickTitle:'Quick Search', photoTitle:'菜单板翻译', photoDesc:'读取照片中的韩文菜单并查找菜品信息。', pickPhoto:'拍照', ocrPh:'请输入照片中看不到的其他事项（可选）', matchBtn:'拍照',
    avoidTitle:'不吃的食材', avoidNote:'勾选后会保存在个人资料中', resultTitle:'菜单结果', phraseTitle:'餐厅常用韩语', nearbyTitle:'逛逛附近店铺', nearbyCard:'学校附近的店铺与菜单', nearbyDesc:'学生们共同完善的周边指南', nearbyGo:'去看看', moreLink:'更多 ›',
    mapDesc:'汇集学生们常去的店铺。', areaLabel:'地区', menuInfo:'菜单信息', bodyLabel:'内容', tagsLabel:'标签', postingAs:'发帖身份', dBoard:'校园生活故事', resetDemo:'重置演示', hotTitle:'实时热门帖', recentTitle:'最新帖子', seeAll:'查看全部 ›', boardHome:'← 论坛首页'},
  ja:{navBoard:'掲示板', navMenu:'メニュー', navProfile:'マイページ', navSaved:'お気に入り', savedTitle:'保存した情報', savedDesc:'後で見返したい情報をまとめています。',
    boardTitle:'学生掲示板', boardDesc:'どの言語で書いても、みんな自分の言語で読めます。',
    trFrom:'{lang}から翻訳', showOrig:'原文を表示', showTr:'翻訳を表示', translating:'Geminiが翻訳中…', trFailed:'翻訳に失敗しました', retry:'再試行',
    comments:'コメント', commentPh:'どの言語でもコメントできます', commentSend:'送信', commented:'コメントしました', noComments:'まだコメントがありません。あいさつしてみましょう！', backList:'← 一覧へ', writer:'投稿者',
    anonPost:'匿名で投稿', profTitle:'マイページ', profDesc:'国籍によって表示言語が決まります。', nickLabel:'ニックネーム', natLabel:'国籍設定',
    natNote:'国籍を変えて保存すると、メニューとすべての投稿・コメントがその国の言語に自動翻訳されます。', profSave:'保存', natSaved:'国籍を変更しました', profSaved:'保存しました', schoolName:'慶尚国立大学',
    uiTranslating:'画面を読み込み中…', noKey:'Gemini APIキーがありません — keys/gemkey にキーを入れて server.py を再起動してください。', noServer:'サーバーが起動していません — run.bat で開いてください。',
    heroEyebrow:'キャンパス周辺のグルメガイド', heroTitle:'今日の学食<br>', heroSub:'', ctaPhoto:'食券を買いに行く', quickTitle:'Quick Search', photoTitle:'メニュー表の翻訳', photoDesc:'写真のハングルメニューを読み取り、料理情報を探します。', pickPhoto:'写真を撮る', ocrPh:'写真では見えないその他の事項を入力してください（任意）', matchBtn:'写真を撮る',
    avoidTitle:'食べない食材', avoidNote:'選択しておくとプロフィールに保存されます', resultTitle:'メニュー結果', phraseTitle:'お店で使えるひとこと', nearbyTitle:'近くのお店を見る', nearbyCard:'学校近くのお店とメニュー', nearbyDesc:'学生みんなでつくる街の案内', nearbyGo:'見てみる', moreLink:'もっと見る ›',
    mapDesc:'学生がよく訪れるお店を集めています。', areaLabel:'地域', menuInfo:'メニュー情報', bodyLabel:'内容', tagsLabel:'タグ', postingAs:'投稿者', dBoard:'学校生活の話', resetDemo:'デモをリセット', hotTitle:'リアルタイム人気投稿', recentTitle:'新着投稿', seeAll:'すべて見る ›', boardHome:'← 掲示板ホーム'},
  vi:{navBoard:'Bảng tin', navMenu:'Tìm món', navProfile:'Cá nhân', navSaved:'Yêu thích', savedTitle:'Thông tin đã lưu', savedDesc:'Tổng hợp những thông tin bạn muốn xem lại.',
    boardTitle:'Bảng tin sinh viên', boardDesc:'Viết bằng bất kỳ ngôn ngữ nào — mọi người đều đọc bằng ngôn ngữ của mình.',
    trFrom:'Dịch từ {lang}', showOrig:'Xem bản gốc', showTr:'Xem bản dịch', translating:'Gemini đang dịch…', trFailed:'Dịch thất bại', retry:'Thử lại',
    comments:'Bình luận', commentPh:'Viết bình luận bằng bất kỳ ngôn ngữ nào', commentSend:'Gửi', commented:'Đã thêm bình luận', noComments:'Chưa có bình luận nào. Hãy chào nhau nhé!', backList:'← Quay lại danh sách', writer:'Tác giả',
    anonPost:'Đăng ẩn danh', profTitle:'Thông tin của tôi', profDesc:'Ngôn ngữ hiển thị được quyết định theo quốc tịch của bạn.', nickLabel:'Biệt danh', natLabel:'Quốc tịch',
    natNote:'Đổi quốc tịch và lưu lại — thực đơn cùng mọi bài viết, bình luận sẽ tự động dịch sang ngôn ngữ đó.', profSave:'Lưu', natSaved:'Đã đổi quốc tịch', profSaved:'Đã lưu', schoolName:'Đại học Quốc gia Gyeongsang',
    uiTranslating:'Đang tải giao diện…', noKey:'Chưa có khóa Gemini API — hãy thêm khóa vào keys/gemkey và khởi động lại server.py.', noServer:'Máy chủ chưa chạy — hãy mở bằng run.bat (hoặc python server.py).',
    heroEyebrow:'Trợ lý ẩm thực quanh trường', heroTitle:'Thực đơn căng tin hôm nay<br>', heroSub:'', ctaPhoto:'Mua phiếu ăn', quickTitle:'Quick Search', photoTitle:'Dịch bảng thực đơn', photoDesc:'Đọc thực đơn tiếng Hàn trong ảnh và tìm thông tin món ăn.', pickPhoto:'Chụp ảnh', ocrPh:'Nhập thêm ghi chú không thấy trong ảnh (tùy chọn)', matchBtn:'Chụp ảnh',
    avoidTitle:'Nguyên liệu không ăn', avoidNote:'Chọn trước để lưu vào hồ sơ của bạn', resultTitle:'Kết quả thực đơn', phraseTitle:'Câu tiếng Hàn hữu ích ở quán', nearbyTitle:'Khám phá quán quanh trường', nearbyCard:'Quán ăn và thực đơn gần trường', nearbyDesc:'Cẩm nang khu phố do sinh viên cùng đóng góp', nearbyGo:'Khám phá', moreLink:'Xem thêm ›',
    mapDesc:'Tổng hợp các quán sinh viên thường ghé.', areaLabel:'Khu vực', menuInfo:'Thông tin thực đơn', bodyLabel:'Nội dung', tagsLabel:'Thẻ', postingAs:'Đăng với tên', dBoard:'Chuyện đời sống sinh viên', resetDemo:'Đặt lại bản thử', hotTitle:'Bài viết nổi bật', recentTitle:'Bài viết mới nhất', seeAll:'Xem tất cả ›', boardHome:'← Trang chủ bảng tin'},
  mn:{navBoard:'Самбар', navMenu:'Цэс хайх', navProfile:'Миний мэдээлэл', navSaved:'Дуртай', savedTitle:'Хадгалсан мэдээлэл', savedDesc:'Дахин харахыг хүссэн мэдээллээ цуглуулсан.',
    boardTitle:'Оюутны самбар', boardDesc:'Ямар ч хэлээр бичсэн хүн бүр өөрийн хэлээр уншина.',
    trFrom:'{lang} хэлнээс орчуулсан', showOrig:'Эх бичвэр харах', showTr:'Орчуулга харах', translating:'Gemini орчуулж байна…', trFailed:'Орчуулга амжилтгүй', retry:'Дахин оролдох',
    comments:'Сэтгэгдэл', commentPh:'Ямар ч хэлээр сэтгэгдэл бичээрэй', commentSend:'Илгээх', commented:'Сэтгэгдэл нэмэгдлээ', noComments:'Одоогоор сэтгэгдэл алга. Эхлээд мэндчилээрэй!', backList:'← Жагсаалт руу буцах', writer:'Зохиогч',
    anonPost:'Нэргүй нийтлэх', profTitle:'Миний мэдээлэл', profDesc:'Таны харьяаллаар харагдах хэл тодорхойлогдоно.', nickLabel:'Нэр хоч', natLabel:'Иргэншил тохируулах',
    natNote:'Иргэншлээ солиод хадгалбал цэс болон бүх нийтлэл, сэтгэгдэл тухайн хэл рүү автоматаар орчуулагдана.', profSave:'Хадгалах', natSaved:'Иргэншил солигдлоо', profSaved:'Хадгалагдлаа', schoolName:'Гёнсан Үндэсний Их Сургууль',
    uiTranslating:'Дэлгэцийг ачаалж байна…', noKey:'Gemini API түлхүүр алга — keys/gemkey файлд түлхүүрээ хийгээд server.py-г дахин ажиллуулна уу.', noServer:'Сервер ажиллахгүй байна — run.bat (эсвэл python server.py)-аар нээнэ үү.',
    heroEyebrow:'Сургуулийн орчмын хоолны туслах', heroTitle:'Өнөөдрийн оюутны хоол<br>', heroSub:'', ctaPhoto:'Хоолны талон авах', quickTitle:'Quick Search', photoTitle:'Цэсний самбар орчуулах', photoDesc:'Зураг дээрх солонгос цэсийг уншиж хоолны мэдээллийг олно.', pickPhoto:'Зураг авах', ocrPh:'Зураг дээр харагдахгүй нэмэлт мэдээллийг оруулна уу (сонголтоор)', matchBtn:'Зураг авах',
    avoidTitle:'Иддэггүй орц', avoidNote:'Сонгосон орц профайлд хадгалагдана', resultTitle:'Цэсний үр дүн', phraseTitle:'Зоогийн газарт хэрэгтэй үгс', nearbyTitle:'Ойр орчмын газрууд', nearbyCard:'Сургуулийн ойролцоох газар ба цэс', nearbyDesc:'Оюутнууд хамтдаа бүтээдэг орчмын хөтөч', nearbyGo:'Үзэх', moreLink:'Дэлгэрэнгүй ›',
    mapDesc:'Оюутнуудын ихэвчлэн очдог газруудыг цуглуулсан.', areaLabel:'Бүс', menuInfo:'Цэсний мэдээлэл', bodyLabel:'Агуулга', tagsLabel:'Тэг', postingAs:'Нийтлэгч', dBoard:'Оюутны амьдралын түүх', resetDemo:'Демо шинэчлэх', hotTitle:'Эрэлттэй нийтлэл', recentTitle:'Шинэ нийтлэл', seeAll:'Бүгдийг харах ›', boardHome:'← Самбарын нүүр'}
};
for (const l of Object.keys(I18N_C)) if (I18N[l]) Object.assign(I18N[l], I18N_C[l]);

/* ================= 나머지 6개 지원 언어(ru, es, fr, th, id, uz) 기본 UI 사전 내장 ================= */
const EXTRA_UI_LANGS = {
  ru: {
    tags:{'돼지고기':'Свинина','소고기':'Говядина','해산물':'Морепродукты','계란':'Яйцо','유제품':'Молочные продукты','밀':'Пшеница (глютен)','대두':'Соя'},
    store:{'한식당':'Корейский ресторан','고깃집':'Корейское барбекю','분식':'Корейская закусочная','중식당':'Китайский ресторан','일식당':'Японский ресторан','치킨집':'Кафе с курочкой','카페':'Кафе'},
    spicy:['Не острое','Слегка острое','Острое','Очень острое'],
    orderTpl: n => `Один «${n}», пожалуйста.`,
    label:{spice:'Острота', say:'Скажите при заказе', warnPre:'Содержит нежелательный ингредиент: ', noTag:'Аллергены не указаны', listen:'Прослушать', copy:'Копировать', storeType:'Тип заведения', none:'Блюда не найдены в списке', found:n=>`Найдено блюд: ${n}`, warnCount:n=>`, из них ${n} с нежелательными ингредиентами`},
    area:'Рядом с Национальным университетом Кёнсан (Чинджу)',
    ui:{
      navBoard:'Форум', navMenu:'Меню', navMap:'Рядом', navSaved:'Избранное', navProfile:'Профиль', navMore:'Ещё',
      boardTitle:'Студенческий форум', boardDesc:'Пишите на любом языке — каждый читает на своём.',
      hotTitle:'Популярное сейчас', recentTitle:'Новые записи', seeAll:'Смотреть все ›', boardHome:'← На главную форума', hubBack:'← К списку разделов',
      boardUnion:'Общий', catAll:'Все', catFood:'Где поесть', catPlay:'Досуг', catInfo:'Жизнь и учёба', catQ:'Вопросы', catFree:'Свободное',
      hMusic:'Музыка', hSports:'Спорт', hGame:'Игры', hMovie:'Кино и сериалы', hTravel:'Путешествия', hPhoto:'Фото', hCook:'Кулинария', hKpop:'K-POP', hBook:'Книги',
      trFrom:'Переведено с: {lang}', showOrig:'Показать оригинал', showTr:'Показать перевод', translating:'Gemini переводит…', trFailed:'Ошибка перевода', retry:'Повторить',
      comments:'Комментарии', commentPh:'Напишите комментарий на любом языке', commentSend:'Отправить', commented:'Комментарий добавлен', noComments:'Комментариев пока нет. Напишите первым!', backList:'← К списку', writer:'Автор',
      report:'Пожаловаться', reportDone:'Отправлено', rxRec:'Рекомендую', rxLike:'Нравится', rxTasty:'Вкусно', rxBest:'Супер', rxThanks:'Спасибо',
      writeTitle:'Новая запись', postingAs:'Автор', anon:'Анонимно', anonPost:'Опубликовать анонимно', pCatLabel:'Раздел', pHobbyLabel:'Раздел по интересам', pHobbyNone:'Не выбрано (только раздел страны)',
      fTitlePh:'Заголовок', bodyLabel:'Содержание', fBodyPh:'Пишите на любом языке — переведётся автоматически…', tagsLabel:'Теги', fTagsPh:'Теги (например: готовка недорого острое)', fPlacePh:'Название заведения', fAddrPh:'Адрес (необязательно)', fFavPh:'Рекомендуемое блюдо', fPhoto:'Добавить фото (до 3)', fSubmit:'Опубликовать',
      feedEmpty:'Записей пока нет. Будьте первым!', fNeedTitle:'Введите заголовок.', fNeedBody:'Введите текст записи.', fPosted:'Запись опубликована!', fPhotoLimit:'Можно добавить до 3 фото.', fSaveFail:'Не удалось сохранить. Попробуйте снова.', fPlaceLabel:'', fFavLabel:'Рекомендуемое блюдо: ',
      heroEyebrow:'Гид по еде у кампуса', heroTitle:'Меню столовой сегодня<br>', heroSub:'', ctaPhoto:'Купить талон на питание', quickTitle:'Quick Search',
      searchPh:'Введите название блюда (например: 김치찌개)', searchBtn:'Поиск', photoTitle:'Перевод меню', photoDesc:'Распознаём корейское меню по фото и находим описание блюд.', pickPhoto:'Сделать фото', ocrBtn:'Распознать текст', ocrPh:'Добавьте примечания, которых не видно на фото (необязательно)', matchBtn:'Сделать фото',
      resultTitle:'Результаты поиска', introResult:'Найдите блюдо выше или сфотографируйте меню.', noResultHint:'Введите название блюда или сделайте фото меню.',
      avoidTitle:'Ингредиенты, которые я не ем', avoidNote:'Сохраняется в вашем профиле при выборе',
      nearbyTitle:'Заведения рядом', nearbyCard:'Кафе и меню возле университета', nearbyDesc:'Гид по району, который создают сами студенты', nearbyGo:'Смотреть', moreLink:'Ещё ›',
      mapPageTitle:'Заведения рядом', mapDesc:'Популярные места, которые часто посещают студенты.', areaLabel:'Район', filterAll:'Все', filterFood:'Еда', filterPlay:'Развлечения',
      playSoon:'Информация о развлечениях скоро появится.', noPlaces:'Заведений пока нет. Добавьте ниже.', menuShow:'Показать меню', menuHide:'Скрыть меню', openNaver:'Открыть в Naver Картах', delPlace:'Удалить', exampleTag:'Пример',
      addToggle:'＋ Добавить заведение', addClose:'Закрыть', addNamePh:'Название заведения', addKind:'Тип', addAddrPh:'Адрес (необязательно)', menuInfo:'Меню', addMenuPh:'Скопируйте меню из Naver Карт (по одному блюду на строку, например: 김치찌개 9,000원)', addSubmit:'Сохранить',
      savedTitle:'Сохранённое', savedDesc:'Информация, к которой вы хотите вернуться.', savedEmpty:'Сохранённых блюд пока нет. Нажмите ☆ на карточке блюда.', saveBtn:'☆ В избранное', savedBtn:'★ Сохранено',
      profTitle:'Мой профиль', profDesc:'Язык интерфейса зависит от выбранной страны.', nickLabel:'Никнейм', natLabel:'Страна и язык', natNote:'После сохранения страны меню, записи и комментарии автоматически переключатся на выбранный язык.', profSave:'Сохранить', natSaved:'Страна изменена', profSaved:'Сохранено', schoolName:'Национальный университет Кёнсан',
      moreTitle:'Разделы', dBoard:'Истории студенческой жизни', dHome:'Поиск блюд по фото и названию', dMap:'Полезные места рядом с кампусом', dSaved:'Сохранённые блюда и заметки', resetDemo:'Сбросить демо',
      appName:'이름 미정', seedName:'Пример ресторана (не настоящее заведение)', unmatched:'Этого блюда пока нет в словаре. Показана только цена.', noMenu:'Информации о меню пока нет.',
      prep:'Подготовка… (при первом запуске загружаются корейские данные)', reading:'Распознавание текста…',
      toastPhotoOk:'Фото загружено. Распознаём текст…', toastOcrOk:'Текст распознан, ищем блюда.', toastOcrEmpty:'Текст не найден. Сфотографируйте ближе или введите вручную.', toastOcrErr:'Ошибка распознавания. Введите текст вручную.', toastNoFile:'Сначала выберите фото.', toastNoText:'Сначала сделайте фото или введите текст.', toastNeedName:'Введите название блюда.', toastFound:n=>`Найдено блюд: ${n}.`, toastNotFound:'Блюда не найдены.', toastNoTess:'Не удалось загрузить модуль OCR.', toastSpeech:'Ваш браузер не поддерживает озвучивание.', toastCopied:'Скопировано. Покажите сотруднику.', toastCopyFail:'Не удалось скопировать.', toastAvoidOn:n=>`Включено предупреждение для: ${n}.`, toastAvoidOff:n=>`Предупреждение выключено для: ${n}.`, toastPlaceNeed:'Введите название заведения.', toastPlaceAdded:'Заведение добавлено.', toastPlaceDel:'Заведение удалено.',
      noKey:'Нет ключа Gemini API — укажите ключ в keys/gemkey и перезапустите server.py.', noServer:'Сервер не запущен — откройте через run.bat (или python server.py).',
      faq:[
        {q:'Отправляется ли фото на сервер?', a:'Распознавание текста происходит прямо в браузере, приложение не сохраняет фото.'},
        {q:'Что делать, если текст распознан неверно?', a:'Снимайте при хорошем освещении прямо и близко. Вы также можете исправить текст в поле вручную.'},
        {q:'Все ли блюда можно распознать?', a:'Сейчас в словаре около 100 популярных блюд. Блюда вне словаря могут не определяться.'},
        {q:'Точны ли описания ингредиентов?', a:'Это краткие описания, рецепт зависит от конкретного кафе. При аллергии обязательно уточняйте у персонала.'},
        {q:'Как отметить продукты, которые я не ем?', a:'Отметьте их в разделе «Ингредиенты, которые я не ем» — на блюдах появится красное предупреждение.'},
        {q:'Можно ли загрузить меню из Naver Карт?', a:'Скопируйте список меню из Naver Карт и вставьте его в форму «Добавить заведение».'}
      ]
    }
  },
  es: {
    tags:{'돼지고기':'Cerdo','소고기':'Res','해산물':'Mariscos','계란':'Huevo','유제품':'Lácteos','밀':'Trigo (gluten)','대두':'Soja'},
    store:{'한식당':'Restaurante coreano','고깃집':'Barbacoa coreana','분식':'Comida rápida coreana','중식당':'Restaurante chino','일식당':'Restaurante japonés','치킨집':'Pollería coreana','카페':'Cafetería'},
    spicy:['Nada picante','Poco picante','Picante','Muy picante'],
    orderTpl: n => `Uno de ${n}, por favor.`,
    label:{spice:'Nivel de picante', say:'Di esto para pedir', warnPre:'Contiene un ingrediente que evitas: ', noTag:'Sin alérgenos registrados', listen:'Escuchar', copy:'Copiar', storeType:'Tipo de local', none:'No se encontraron platos registrados', found:n=>`${n} platos encontrados`, warnCount:n=>`, ${n} con ingredientes que evitas`},
    area:'Cerca de la Universidad Nacional de Gyeongsang (Jinju)',
    ui:{
      navBoard:'Foro', navMenu:'Menú', navMap:'Cerca', navSaved:'Favoritos', navProfile:'Mi perfil', navMore:'Más',
      boardTitle:'Foro estudiantil', boardDesc:'Escribe en cualquier idioma — todos lo leen en el suyo.',
      hotTitle:'Tendencias ahora', recentTitle:'Publicaciones recientes', seeAll:'Ver todo ›', boardHome:'← Inicio del foro', hubBack:'← Volver a tableros',
      boardUnion:'General', catAll:'Todo', catFood:'Dónde comer', catPlay:'Qué hacer', catInfo:'Vida universitaria', catQ:'Preguntas', catFree:'Libre',
      hMusic:'Música', hSports:'Deportes', hGame:'Juegos', hMovie:'Cine y series', hTravel:'Viajes', hPhoto:'Fotografía', hCook:'Cocina', hKpop:'K-POP', hBook:'Lectura',
      trFrom:'Traducido del {lang}', showOrig:'Ver original', showTr:'Ver traducción', translating:'Traduzco con Gemini…', trFailed:'Error al traducir', retry:'Reintentar',
      comments:'Comentarios', commentPh:'Escribe un comentario en cualquier idioma', commentSend:'Enviar', commented:'Comentario publicado', noComments:'Aún no hay comentarios. ¡Saluda primero!', backList:'← Volver a la lista', writer:'Autor',
      report:'Reportar', reportDone:'Reportado', rxRec:'Recomiendo', rxLike:'Me gusta', rxTasty:'Rico', rxBest:'Genial', rxThanks:'Gracias',
      writeTitle:'Nueva publicación', postingAs:'Publicando como', anon:'Anónimo', anonPost:'Publicar de forma anónima', pCatLabel:'Categoría', pHobbyLabel:'Tablero de interés', pHobbyNone:'Ninguno (solo tablero del país)',
      fTitlePh:'Título', bodyLabel:'Contenido', fBodyPh:'Escribe en cualquier idioma, se traducirá automáticamente…', tagsLabel:'Etiquetas', fTagsPh:'Etiquetas (ej: cocina barato picante)', fPlacePh:'Nombre del local', fAddrPh:'Dirección (opcional)', fFavPh:'Plato recomendado', fPhoto:'Añadir fotos (máx. 3)', fSubmit:'Publicar',
      feedEmpty:'Aún no hay publicaciones. ¡Sé el primero!', fNeedTitle:'Escribe un título.', fNeedBody:'Escribe el contenido.', fPosted:'¡Publicación enviada!', fPhotoLimit:'Puedes subir hasta 3 fotos.', fSaveFail:'No se pudo guardar. Inténtalo de nuevo.', fPlaceLabel:'', fFavLabel:'Plato recomendado: ',
      heroEyebrow:'Ayudante de comida del campus', heroTitle:'Menú Universitario de Hoy<br>', heroSub:'', ctaPhoto:'Comprar ticket de comida', quickTitle:'Quick Search',
      searchPh:'Busca el nombre de un plato (ej: 김치찌개)', searchBtn:'Buscar', photoTitle:'Traducir cartel de menú', photoDesc:'Leemos el menú en coreano de tu foto y buscamos la información.', pickPhoto:'Tomar foto', ocrBtn:'Leer texto de la foto', ocrPh:'Añade notas que no se vean en la foto (opcional)', matchBtn:'Tomar foto',
      resultTitle:'Resultados del menú', introResult:'Busca un plato arriba o toma una foto del menú.', noResultHint:'Escribe el nombre del plato o fotografía el menú.',
      avoidTitle:'Ingredientes que no como', avoidNote:'Se guarda en tu perfil al seleccionarlo',
      nearbyTitle:'Explorar locales cercanos', nearbyCard:'Locales y menús cerca del campus', nearbyDesc:'Guía del barrio completada entre estudiantes', nearbyGo:'Explorar', moreLink:'Más ›',
      mapPageTitle:'Locales cercanos', mapDesc:'Recopilamos los locales más visitados por estudiantes.', areaLabel:'Zona', filterAll:'Todo', filterFood:'Comida', filterPlay:'Ocio',
      playSoon:'Pronto añadiremos lugares de ocio.', noPlaces:'Aún no hay locales registrados. Añade uno abajo.', menuShow:'Ver menú', menuHide:'Ocultar menú', openNaver:'Ver en Naver Map', delPlace:'Eliminar', exampleTag:'Ejemplo',
      addToggle:'＋ Añadir local', addClose:'Cerrar', addNamePh:'Nombre del local', addKind:'Tipo', addAddrPh:'Dirección (opcional)', menuInfo:'Información del menú', addMenuPh:'Copia y pega el menú desde Naver Map (uno por línea, ej: 김치찌개 9,000원)', addSubmit:'Guardar',
      savedTitle:'Información guardada', savedDesc:'Información que guardaste para volver a ver.', savedEmpty:'Aún no has guardado platos. Toca ☆ en una tarjeta de menú.', saveBtn:'☆ Guardar', savedBtn:'★ Guardado',
      profTitle:'Mi perfil', profDesc:'Tu nacionalidad define el idioma en pantalla.', nickLabel:'Apodo', natLabel:'Nacionalidad', natNote:'Al cambiar y guardar tu nacionalidad, los menús, publicaciones y comentarios se mostrarán en ese idioma.', profSave:'Guardar', natSaved:'Nacionalidad actualizada', profSaved:'Guardado', schoolName:'Universidad Nacional de Gyeongsang',
      moreTitle:'Explorar más', dBoard:'Historias de la vida en el campus', dHome:'Buscar comida por foto o nombre', dMap:'Información cerca del campus', dSaved:'Platos guardados para después', resetDemo:'Reiniciar demo',
      appName:'이름 미정', seedName:'Restaurante de ejemplo (no es real)', unmatched:'Aún no está en nuestro diccionario. Solo se muestra el precio.', noMenu:'Aún no hay información del menú.',
      prep:'Preparando… (la primera vez descarga datos en coreano)', reading:'Leyendo texto…',
      toastPhotoOk:'Foto cargada. Leyendo menú…', toastOcrOk:'Texto leído, buscando platos.', toastOcrEmpty:'No se detectó texto. Acércate más o escribe manualmente.', toastOcrErr:'Error al leer la foto. Escribe el texto directamente.', toastNoFile:'Selecciona una foto primero.', toastNoText:'Toma una foto o escribe texto primero.', toastNeedName:'Escribe el nombre de un plato.', toastFound:n=>`${n} platos encontrados.`, toastNotFound:'No se encontraron platos.', toastNoTess:'No se pudo cargar el lector OCR.', toastSpeech:'Este navegador no soporta voz.', toastCopied:'Copiado. Muéstraselo al personal.', toastCopyFail:'Error al copiar.', toastAvoidOn:n=>`Aviso activado para ${n}.`, toastAvoidOff:n=>`Aviso desactivado para ${n}.`, toastPlaceNeed:'Escribe el nombre del local.', toastPlaceAdded:'Local añadido.', toastPlaceDel:'Local eliminado.',
      noKey:'Falta la clave de Gemini API — colócala en keys/gemkey y reinicia server.py.', noServer:'El servidor no está activo — ábrelo con run.bat (o python server.py).',
      faq:[
        {q:'¿Mi foto se envía a algún servidor?', a:'El reconocimiento de texto ocurre en tu navegador y la app no guarda tus fotos.'},
        {q:'¿Qué hago si lee mal el texto?', a:'Toma la foto con buena luz y de frente, o corrige el texto manualmente en el cuadro.'},
        {q:'¿Puede reconocer todos los platos?', a:'Por ahora cuenta con un diccionario de unos 100 platos frecuentes.'},
        {q:'¿Son exactos los ingredientes mostrados?', a:'Son resúmenes orientativos; cada local cocina distinto. Si tienes alergias, confirma siempre con el personal.'},
        {q:'¿Cómo evito ingredientes que no puedo comer?', a:'Márcalos en «Ingredientes que no como» y verás una alerta roja en esos platos.'},
        {q:'¿Lee menús de Naver Map automáticamente?', a:'Copia el menú desde Naver Map y pégalo en «Añadir local» para generar las tarjetas.'}
      ]
    }
  },
  fr: {
    tags:{'돼지고기':'Porc','소고기':'Bœuf','해산물':'Fruits de mer','계란':'Œuf','유제품':'Produits laitiers','밀':'Blé (gluten)','대두':'Soja'},
    store:{'한식당':'Restaurant coréen','고깃집':'Barbecue coréen','분식':'Snack coréen','중식당':'Restaurant chinois','일식당':'Restaurant japonais','치킨집':'Poulet frit','카페':'Café'},
    spicy:['Non épicé','Légèrement épicé','Épicé','Très épicé'],
    orderTpl: n => `Un ${n}, s’il vous plaît.`,
    label:{spice:'Niveau d’épice', say:'Dites ceci pour commander', warnPre:'Contient un ingrédient que vous évitez : ', noTag:'Aucun allergène signalé', listen:'Écouter', copy:'Copier', storeType:'Type d’établissement', none:'Aucun plat trouvé dans la liste', found:n=>`${n} plats trouvés`, warnCount:n=>`, dont ${n} avec un ingrédient évité`},
    area:'Près de l’Université nationale de Gyeongsang (Jinju)',
    ui:{
      navBoard:'Forum', navMenu:'Menu', navMap:'Autour', navSaved:'Favoris', navProfile:'Profil', navMore:'Plus',
      boardTitle:'Forum étudiant', boardDesc:'Écrivez dans n’importe quelle langue — chacun lit dans la sienne.',
      hotTitle:'Tendances', recentTitle:'Publications récentes', seeAll:'Tout voir ›', boardHome:'← Accueil du forum', hubBack:'← Retour aux salons',
      boardUnion:'Général', catAll:'Tout', catFood:'Où manger', catPlay:'Sorties', catInfo:'Vie pratique', catQ:'Questions', catFree:'Discussion libre',
      hMusic:'Musique', hSports:'Sport', hGame:'Jeux', hMovie:'Cinéma & séries', hTravel:'Voyage', hPhoto:'Photo', hCook:'Cuisine', hKpop:'K-POP', hBook:'Lecture',
      trFrom:'Traduit de : {lang}', showOrig:'Voir l’original', showTr:'Voir la traduction', translating:'Traduction par Gemini…', trFailed:'Échec de la traduction', retry:'Réessayer',
      comments:'Commentaires', commentPh:'Écrivez un commentaire dans n’importe quelle langue', commentSend:'Envoyer', commented:'Commentaire ajouté', noComments:'Aucun commentaire pour le moment. Dites bonjour !', backList:'← Retour à la liste', writer:'Auteur',
      report:'Signaler', reportDone:'Signalé', rxRec:'Recommandé', rxLike:'J’aime', rxTasty:'Délicieux', rxBest:'Top', rxThanks:'Merci',
      writeTitle:'Nouvelle publication', postingAs:'Publié en tant que', anon:'Anonyme', anonPost:'Publier anonymement', pCatLabel:'Salon', pHobbyLabel:'Salon par intérêt', pHobbyNone:'Aucun (salon du pays uniquement)',
      fTitlePh:'Titre', bodyLabel:'Contenu', fBodyPh:'Écrivez dans n’importe quelle langue, la traduction est automatique…', tagsLabel:'Tags', fTagsPh:'Tags (ex : cuisine bon_plan épicé)', fPlacePh:'Nom du lieu', fAddrPh:'Adresse (optionnel)', fFavPh:'Plat recommandé', fPhoto:'Ajouter des photos (max. 3)', fSubmit:'Publier',
      feedEmpty:'Aucune publication pour l’instant. Soyez le premier !', fNeedTitle:'Veuillez saisir un titre.', fNeedBody:'Veuillez saisir un contenu.', fPosted:'Publication enregistrée !', fPhotoLimit:'Jusqu’à 3 photos maximum.', fSaveFail:'Échec de l’enregistrement.', fPlaceLabel:'', fFavLabel:'Plat recommandé : ',
      heroEyebrow:'Guide gourmand autour du campus', heroTitle:'Menu Universitaire du Jour<br>', heroSub:'', ctaPhoto:'Acheter un ticket repas', quickTitle:'Quick Search',
      searchPh:'Rechercher un plat (ex : 김치찌개)', searchBtn:'Rechercher', photoTitle:'Traduire un panneau de menu', photoDesc:'Nous lisons le menu coréen sur votre photo et trouvons les plats.', pickPhoto:'Prendre une photo', ocrBtn:'Lire le texte', ocrPh:'Ajoutez d’autres détails non visibles sur la photo (optionnel)', matchBtn:'Prendre une photo',
      resultTitle:'Résultats du menu', introResult:'Recherchez un plat ci-dessus ou prenez une photo.', noResultHint:'Tapez le nom d’un plat ou photographiez le menu.',
      avoidTitle:'Ingrédients que je ne mange pas', avoidNote:'Enregistré dans votre profil une fois coché',
      nearbyTitle:'Explorer les adresses proches', nearbyCard:'Boutiques et menus près du campus', nearbyDesc:'Un guide de quartier enrichi par les étudiants', nearbyGo:'Explorer', moreLink:'Voir plus ›',
      mapPageTitle:'Adresses proches', mapDesc:'Les lieux les plus fréquentés par les étudiants.', areaLabel:'Zone', filterAll:'Tout', filterFood:'Repas', filterPlay:'Loisirs',
      playSoon:'Les lieux de loisirs arrivent bientôt.', noPlaces:'Aucun lieu enregistré. Ajoutez-en un ci-dessous.', menuShow:'Voir le menu', menuHide:'Masquer le menu', openNaver:'Voir sur Naver Map', delPlace:'Supprimer', exampleTag:'Exemple',
      addToggle:'＋ Ajouter un lieu', addClose:'Fermer', addNamePh:'Nom du lieu', addKind:'Catégorie', addAddrPh:'Adresse (optionnel)', menuInfo:'Infos menu', addMenuPh:'Copiez-collez le menu depuis Naver Map (un plat par ligne, ex : 김치찌개 9,000원)', addSubmit:'Enregistrer',
      savedTitle:'Infos enregistrées', savedDesc:'Retrouvez ici les informations que vous avez mises de côté.', savedEmpty:'Aucun plat enregistré. Appuyez sur ☆ sur une fiche menu.', saveBtn:'☆ Enregistrer', savedBtn:'★ Enregistré',
      profTitle:'Mon profil', profDesc:'Votre nationalité détermine la langue d’affichage.', nickLabel:'Pseudo', natLabel:'Nationalité', natNote:'Changez de nationalité et enregistrez : les menus, publications et commentaires s’afficheront dans cette langue.', profSave:'Enregistrer', natSaved:'Nationalité modifiée', profSaved:'Enregistré', schoolName:'Université nationale de Gyeongsang',
      moreTitle:'Plus de rubriques', dBoard:'Récits de la vie étudiante', dHome:'Chercher un plat par photo ou par nom', dMap:'Adresses utiles autour du campus', dSaved:'Plats mis de côté', resetDemo:'Réinitialiser la démo',
      appName:'이름 미정', seedName:'Restaurant exemple (fictif)', unmatched:'Pas encore dans notre dictionnaire. Seul le prix est affiché.', noMenu:'Aucune information de menu.',
      prep:'Préparation… (téléchargement initial des données coréennes)', reading:'Lecture du texte…',
      toastPhotoOk:'Photo chargée. Lecture du menu…', toastOcrOk:'Texte lu, recherche des plats.', toastOcrEmpty:'Aucun texte détecté. Rapprochez-vous ou saisissez-le.', toastOcrErr:'Erreur de lecture.', toastNoFile:'Choisissez d’abord une photo.', toastNoText:'Prenez une photo ou saisissez du texte.', toastNeedName:'Entrez le nom d’un plat.', toastFound:n=>`${n} plats trouvés.`, toastNotFound:'Aucun plat trouvé.', toastNoTess:'Impossible de charger l’outil OCR.', toastSpeech:'Synthèse vocale non prise en charge.', toastCopied:'Copié. Montrez-le au personnel.', toastCopyFail:'Échec de la copie.', toastAvoidOn:n=>`Alerte activée pour : ${n}.`, toastAvoidOff:n=>`Alerte désactivée pour : ${n}.`, toastPlaceNeed:'Entrez le nom du lieu.', toastPlaceAdded:'Lieu ajouté.', toastPlaceDel:'Lieu supprimé.',
      noKey:'Clé Gemini API manquante — ajoutez-la dans keys/gemkey et relancez server.py.', noServer:'Serveur arrêté — lancez run.bat (ou python server.py).',
      faq:[
        {q:'Ma photo est-elle envoyée sur un serveur ?', a:'La reconnaissance de texte s’effectue dans votre navigateur ; aucune photo n’est stockée.'},
        {q:'Que faire si la lecture est incorrecte ?', a:'Prenez la photo bien éclairée et de face, ou corrigez directement le texte reconnu.'},
        {q:'Tous les plats sont-ils reconnus ?', a:'Le dictionnaire contient environ 100 plats coréens courants.'},
        {q:'Les ingrédients indiqués sont-ils exacts ?', a:'Il s’agit d’un résumé indicatif. En cas d’allergie, vérifiez toujours auprès du personnel.'},
        {q:'Comment éviter certains ingrédients ?', a:'Cochez-les dans « Ingrédients que je ne mange pas » pour afficher un avertissement rouge.'},
        {q:'Peut-on importer un menu depuis Naver Map ?', a:'Copiez le menu sur Naver Map et collez-le dans « Ajouter un lieu ».'}
      ]
    }
  },
  th: {
    tags:{'돼지고기':'เนื้อหมู','소고기':'เนื้อวัว','해산물':'อาหารทะเล','계란':'ไข่','유제품':'นมและผลิตภัณฑ์จากนม','밀':'ข้าวสาลี (กลูเตน)','대두':'ถั่วเหลือง'},
    store:{'한식당':'ร้านอาหารเกาหลี','고깃집':'ร้านปิ้งย่างเกาหลี','분식':'ร้านอาหารว่างเกาหลี','중식당':'ร้านอาหารจีน','일식당':'ร้านอาหารญี่ปุ่น','치킨집':'ร้านไก่ทอด','카페':'คาเฟ่'},
    spicy:['ไม่เผ็ด','เผ็ดน้อย','เผ็ด','เผ็ดมาก'],
    orderTpl: n => `ขอ ${n} 1 ที่ครับ/ค่ะ`,
    label:{spice:'ระดับความเผ็ด', say:'พูดแบบนี้ตอนสั่งอาหาร', warnPre:'มีวัตถุดิบที่คุณหลีกเลี่ยง: ', noTag:'ไม่มีข้อมูลสารก่อภูมิแพ้', listen:'ฟังเสียง', copy:'คัดลอก', storeType:'ประเภทร้าน', none:'ไม่พบเมนูที่ลงทะเบียนไว้', found:n=>`พบ ${n} เมนู`, warnCount:n=>` (มี ${n} เมนูที่มีวัตถุดิบที่คุณหลีกเลี่ยง)`},
    area:'รอบมหาวิทยาลัยแห่งชาติคยองซัง (จินจู)',
    ui:{
      navBoard:'บอร์ด', navMenu:'ค้นหาเมนู', navMap:'รอบๆ', navSaved:'รายการโปรด', navProfile:'ข้อมูลของฉัน', navMore:'เพิ่มเติม',
      boardTitle:'บอร์ดนักศึกษา', boardDesc:'เขียนด้วยภาษาใดก็ได้ — ทุกคนอ่านในภาษาของตัวเอง',
      hotTitle:'โพสต์ยอดนิยมตอนนี้', recentTitle:'โพสต์ล่าสุด', seeAll:'ดูทั้งหมด ›', boardHome:'← หน้าแรกบอร์ด', hubBack:'← กลับไปหน้ารวมบอร์ด',
      boardUnion:'รวมทุกชาติ', catAll:'ทั้งหมด', catFood:'ร้านอร่อย', catPlay:'ที่เที่ยว', catInfo:'ข้อมูลการใช้ชีวิต', catQ:'คำถาม', catFree:'พูดคุยทั่วไป',
      hMusic:'ดนตรี', hSports:'กีฬา', hGame:'เกม', hMovie:'หนัง·ซีรีส์', hTravel:'ท่องเที่ยว', hPhoto:'ถ่ายภาพ', hCook:'ทำอาหาร', hKpop:'K-POP', hBook:'หนังสือ',
      trFrom:'แปลจากภาษา{lang}', showOrig:'ดูต้นฉบับ', showTr:'ดูคำแปล', translating:'Gemini กำลังแปล…', trFailed:'แปลไม่สำเร็จ', retry:'ลองใหม่',
      comments:'ความคิดเห็น', commentPh:'แสดงความคิดเห็นด้วยภาษาใดก็ได้', commentSend:'ส่ง', commented:'เพิ่มความคิดเห็นแล้ว', noComments:'ยังไม่มีความคิดเห็น มาทักทายกันเถอะ!', backList:'← กลับไปหน้ารายการ', writer:'ผู้เขียน',
      report:'รายงาน', reportDone:'รายงานแล้ว', rxRec:'แนะนำ', rxLike:'ถูกใจ', rxTasty:'อร่อย', rxBest:'สุดยอด', rxThanks:'ขอบคุณ',
      writeTitle:'เขียนโพสต์ใหม่', postingAs:'โพสต์ในชื่อ', anon:'ไม่ระบุชื่อ', anonPost:'โพสต์แบบไม่ระบุชื่อ', pCatLabel:'หมวดหมู่', pHobbyLabel:'บอร์ดความสนใจ', pHobbyNone:'ไม่เลือก (โพสต์เฉพาะบอร์ดประเทศ)',
      fTitlePh:'หัวข้อ', bodyLabel:'เนื้อหา', fBodyPh:'เขียนด้วยภาษาอะไรก็ได้ ระบบจะแปลให้อัตโนมัติ…', tagsLabel:'แท็ก', fTagsPh:'แท็ก (เช่น ทำอาหารเอง คุ้มค่า เผ็ด)', fPlacePh:'ชื่อร้าน', fAddrPh:'ที่อยู่ (ไม่บังคับ)', fFavPh:'เมนูแนะนำ', fPhoto:'เพิ่มรูปภาพ (สูงสุด 3 รูป)', fSubmit:'โพสต์เลย',
      feedEmpty:'ยังไม่มีโพสต์ มาเขียนโพสต์แรกกันเถอะ!', fNeedTitle:'กรุณากรอกหัวข้อ', fNeedBody:'กรุณากรอกเนื้อหา', fPosted:'โพสต์เรียบร้อยแล้ว ขอบคุณครับ/ค่ะ!', fPhotoLimit:'เพิ่มรูปได้สูงสุด 3 รูป', fSaveFail:'บันทึกไม่สำเร็จ กรุณาลองอีกครั้ง', fPlaceLabel:'', fFavLabel:'เมนูแนะนำ: ',
      heroEyebrow:'ผู้ช่วยเรื่องอาหารรอบมหาวิทยาลัย', heroTitle:'อาหารโรงอาหารวันนี้<br>', heroSub:'', ctaPhoto:'ไปซื้อคูปองอาหาร', quickTitle:'Quick Search',
      searchPh:'ค้นหาชื่ออาหาร (เช่น 김치찌개)', searchBtn:'ค้นหา', photoTitle:'แปลป้ายเมนู', photoDesc:'อ่านเมนูภาษาเกาหลีจากรูปถ่ายและค้นหาข้อมูลอาหาร', pickPhoto:'ถ่ายรูป', ocrBtn:'อ่านข้อความในรูป', ocrPh:'ใส่รายละเอียดเพิ่มเติมที่มองไม่เห็นในรูป (ไม่บังคับ)', matchBtn:'ถ่ายรูป',
      resultTitle:'ผลลัพธ์เมนู', introResult:'ค้นหาชื่ออาหารด้านบน หรือถ่ายรูปป้ายเมนูได้เลย', noResultHint:'พิมพ์ชื่ออาหาร หรือถ่ายรูปเมนูเพื่อค้นหา',
      avoidTitle:'วัตถุดิบที่ไม่ทาน', avoidNote:'เลือกไว้แล้วจะบันทึกในโปรไฟล์ของคุณ',
      nearbyTitle:'สำรวจร้านค้าใกล้เคียง', nearbyCard:'ร้านค้าและเมนูใกล้มหาวิทยาลัย', nearbyDesc:'คู่มือย่านรอบมอที่นักศึกษาช่วยกันเติมเต็ม', nearbyGo:'สำรวจ', moreLink:'ดูเพิ่ม ›',
      mapPageTitle:'ร้านค้าใกล้เคียง', mapDesc:'รวบรวมร้านที่นักศึกษานิยมไปกัน', areaLabel:'พื้นที่', filterAll:'ทั้งหมด', filterFood:'อาหาร', filterPlay:'ที่เที่ยว/กิจกรรม',
      playSoon:'ข้อมูลสถานที่ท่องเที่ยวจะอัปเดตเร็วๆ นี้', noPlaces:'ยังไม่มีร้านค้าที่ลงทะเบียน เพิ่มด้านล่างได้เลย', menuShow:'ดูเมนู', menuHide:'ซ่อนเมนู', openNaver:'ดูใน Naver Map', delPlace:'ลบ', exampleTag:'ตัวอย่าง',
      addToggle:'＋ เพิ่มข้อมูลร้านค้า', addClose:'ปิด', addNamePh:'ชื่อร้าน', addKind:'ประเภท', addAddrPh:'ที่อยู่ (ไม่บังคับ)', menuInfo:'ข้อมูลเมนู', addMenuPh:'คัดลอกเมนูจาก Naver Map มาวาง (บรรทัดละ 1 เมนู เช่น 김치찌개 9,000원)', addSubmit:'บันทึก',
      savedTitle:'ข้อมูลที่บันทึกไว้', savedDesc:'รวบรวมข้อมูลที่คุณอยากกลับมาดูอีกครั้ง', savedEmpty:'ยังไม่มีเมนูที่บันทึกไว้ กด ☆ บนการ์ดเมนูเพื่อบันทึก', saveBtn:'☆ บันทึก', savedBtn:'★ บันทึกแล้ว',
      profTitle:'ข้อมูลของฉัน', profDesc:'ภาษาที่แสดงจะตั้งค่าตามสัญชาติของคุณ', nickLabel:'ชื่อเล่น', natLabel:'ตั้งค่าสัญชาติ', natNote:'เมื่อเปลี่ยนสัญชาติและกดบันทึก เมนูรวมถึงโพสต์และคอมเมนต์ทั้งหมดจะแปลเป็นภาษานั้นโดยอัตโนมัติ', profSave:'บันทึก', natSaved:'เปลี่ยนสัญชาติแล้ว', profSaved:'บันทึกแล้ว', schoolName:'มหาวิทยาลัยแห่งชาติคยองซัง',
      moreTitle:'ดูเพิ่มเติม', dBoard:'เรื่องราวชีวิตในรั้วมหาวิทยาลัย', dHome:'ค้นหาอาหารด้วยรูปถ่ายและชื่อเมนู', dMap:'รวมข้อมูลร้านเด็ดรอบมหาวิทยาลัย', dSaved:'รวมเมนูที่บันทึกไว้ดูภายหลัง', resetDemo:'รีเซ็ตเดโม',
      appName:'이름 미정', seedName:'ร้านอาหารตัวอย่าง (ไม่ใช่ร้านจริง)', unmatched:'ยังไม่มีในพจนานุกรมคำอธิบาย แสดงเฉพาะราคา', noMenu:'ยังไม่มีข้อมูลเมนู',
      prep:'กำลังเตรียมการ… (ครั้งแรกจะดาวน์โหลดข้อมูลภาษาเกาหลีสักครู่)', reading:'กำลังอ่านข้อความ…',
      toastPhotoOk:'เลือกรูปแล้ว กำลังอ่านเมนู…', toastOcrOk:'อ่านข้อความแล้ว กำลังค้นหาเมนู', toastOcrEmpty:'ไม่พบข้อความ กรุณาถ่ายใกล้ขึ้นหรือพิมพ์เอง', toastOcrErr:'เกิดข้อผิดพลาดในการอ่าน กรุณาพิมพ์ข้อความเอง', toastNoFile:'กรุณาเลือกรูปภาพก่อน', toastNoText:'กรุณาถ่ายรูปหรือพิมพ์ข้อความก่อน', toastNeedName:'กรุณาพิมพ์ชื่ออาหาร', toastFound:n=>`พบ ${n} เมนู`, toastNotFound:'ไม่พบเมนู กรุณาตรวจสอบตัวอักษร', toastNoTess:'โหลดเครื่องมืออ่านข้อความไม่สำเร็จ', toastSpeech:'เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง', toastCopied:'คัดลอกแล้ว ยื่นให้พนักงานดูได้เลย', toastCopyFail:'คัดลอกไม่สำเร็จ', toastAvoidOn:n=>`เปิดคำเตือนสำหรับเมนูที่มี${n}แล้ว`, toastAvoidOff:n=>`ปิดคำเตือน${n}แล้ว`, toastPlaceNeed:'กรุณากรอกชื่อร้าน', toastPlaceAdded:'เพิ่มร้านค้าแล้ว', toastPlaceDel:'ลบร้านค้าแล้ว',
      noKey:'ไม่มี Gemini API key — ใส่คีย์ในไฟล์ keys/gemkey แล้วรัน server.py ใหม่', noServer:'เซิร์ฟเวอร์ยังไม่ทำงาน — กรุณาเปิดผ่าน run.bat (หรือ python server.py)',
      faq:[
        {q:'รูปถ่ายจะถูกส่งไปยังเซิร์ฟเวอร์หรือไม่?', a:'การอ่านข้อความทำงานในเบราว์เซอร์ของคุณ และแอปไม่เก็บรูปภาพไว้'},
        {q:'ถ้าอ่านข้อความผิดต้องทำอย่างไร?', a:'ถ่ายในที่สว่าง ใกล้ และตรง หรือแก้ไขข้อความในกล่องด้วยตัวเองแล้วค้นหาใหม่'},
        {q:'อ่านอาหารได้ทุกเมนูไหม?', a:'ขณะนี้มีฐานข้อมูลเมนูยอดนิยมประมาณ 100 เมนู เมนูที่อยู่นอกรายการอาจยังไม่แสดงคำอธิบาย'},
        {q:'คำแปลและข้อมูลวัตถุดิบแม่นยำหรือไม่?', a:'เป็นข้อมูลสรุปเบื้องต้น แต่ละร้านอาจใช้วัตถุดิบต่างกัน หากแพ้อาหารโปรดถามพนักงานทุกครั้ง'},
        {q:'อยากหลีกเลี่ยงวัตถุดิบที่ทานไม่ได้?', a:'ติ๊กเลือกในหัวข้อ “วัตถุดิบที่ไม่ทาน” เมนูที่มีส่วนผสมนั้นจะขึ้นคำเตือนสีแดง'},
        {q:'ดึงเมนูจาก Naver Map อัตโนมัติได้ไหม?', a:'คัดลอกรายการเมนูจาก Naver Map แล้ววางในฟอร์ม “เพิ่มข้อมูลร้านค้า” ได้เลย'}
      ]
    }
  },
  id: {
    tags:{'돼지고기':'Daging babi','소고기':'Daging sapi','해산물':'Makanan laut','계란':'Telur','유제품':'Produk susu','밀':'Gandum (gluten)','대두':'Kedelai'},
    store:{'한식당':'Restoran Korea','고깃집':'BBQ Korea','분식':'Kedai camilan Korea','중식당':'Restoran Tiongkok','일식당':'Restoran Jepang','치킨집':'Kedai ayam goreng','카페':'Kafe'},
    spicy:['Tidak pedas','Agak pedas','Pedas','Sangat pedas'],
    orderTpl: n => `Tolong pesan satu ${n}.`,
    label:{spice:'Tingkat pedas', say:'Ucapkan ini saat memesan', warnPre:'Mengandung bahan yang Anda hindari: ', noTag:'Tidak ada alergen tercatat', listen:'Dengarkan', copy:'Salin', storeType:'Jenis tempat', none:'Menu tidak ditemukan dalam daftar', found:n=>`Ditemukan ${n} hidangan`, warnCount:n=>`, ${n} di antaranya mengandung bahan yang dihindari`},
    area:'Sekitar Universitas Nasional Gyeongsang (Jinju)',
    ui:{
      navBoard:'Forum', navMenu:'Cari Menu', navMap:'Sekitar', navSaved:'Favorit', navProfile:'Profil', navMore:'Lainnya',
      boardTitle:'Forum Mahasiswa', boardDesc:'Tulis dalam bahasa apa pun — semua orang membaca dalam bahasa mereka sendiri.',
      hotTitle:'Populer Saat Ini', recentTitle:'Postingan Terbaru', seeAll:'Lihat semua ›', boardHome:'← Beranda Forum', hubBack:'← Kembali ke daftar papan',
      boardUnion:'Gabungan', catAll:'Semua', catFood:'Kuliner', catPlay:'Hiburan', catInfo:'Info Kampus', catQ:'Tanya Jawab', catFree:'Bebas',
      hMusic:'Musik', hSports:'Olahraga', hGame:'Game', hMovie:'Film & Drama', hTravel:'Travel', hPhoto:'Fotografi', hCook:'Memasak', hKpop:'K-POP', hBook:'Buku',
      trFrom:'Diterjemahkan dari {lang}', showOrig:'Lihat asli', showTr:'Lihat terjemahan', translating:'Gemini sedang menerjemahkan…', trFailed:'Gagal menerjemahkan', retry:'Coba lagi',
      comments:'Komentar', commentPh:'Tulis komentar dalam bahasa apa saja', commentSend:'Kirim', commented:'Komentar ditambahkan', noComments:'Belum ada komentar. Ayo sapa duluan!', backList:'← Kembali ke daftar', writer:'Penulis',
      report:'Laporkan', reportDone:'Dilaporkan', rxRec:'Rekomendasi', rxLike:'Suka', rxTasty:'Enak', rxBest:'Mantap', rxThanks:'Terima kasih',
      writeTitle:'Tulis Postingan Baru', postingAs:'Memposting sebagai', anon:'Anonim', anonPost:'Posting secara anonim', pCatLabel:'Kategori', pHobbyLabel:'Papan Minat', pHobbyNone:'Tidak dipilih (hanya papan negara)',
      fTitlePh:'Judul', bodyLabel:'Isi', fBodyPh:'Tulis dalam bahasa apa saja, akan diterjemahkan otomatis…', tagsLabel:'Tag', fTagsPh:'Tag (misal: masak_sendiri hemat pedas)', fPlacePh:'Nama tempat/toko', fAddrPh:'Alamat (opsional)', fFavPh:'Menu rekomendasi', fPhoto:'Tambah foto (maks. 3)', fSubmit:'Terbitkan',
      feedEmpty:'Belum ada postingan. Jadilah yang pertama!', fNeedTitle:'Masukkan judul.', fNeedBody:'Masukkan isi postingan.', fPosted:'Postingan berhasil diterbitkan!', fPhotoLimit:'Maksimal 3 foto.', fSaveFail:'Gagal menyimpan. Coba lagi.', fPlaceLabel:'', fFavLabel:'Menu rekomendasi: ',
      heroEyebrow:'Asisten Kuliner Sekitar Kampus', heroTitle:'Menu Kantin Hari Ini<br>', heroSub:'', ctaPhoto:'Beli kupon makan', quickTitle:'Quick Search',
      searchPh:'Cari nama makanan (misal: 김치찌개)', searchBtn:'Cari', photoTitle:'Terjemahkan Papan Menu', photoDesc:'Membaca menu bahasa Korea di foto Anda dan mencari info hidangannya.', pickPhoto:'Ambil Foto', ocrBtn:'Baca teks foto', ocrPh:'Tambahkan catatan lain yang tidak terlihat di foto (opsional)', matchBtn:'Ambil Foto',
      resultTitle:'Hasil Menu', introResult:'Cari nama makanan di atas atau ambil foto papan menu.', noResultHint:'Ketik nama makanan atau foto papan menu.',
      avoidTitle:'Bahan yang Tidak Saya Makan', avoidNote:'Disimpan ke profil Anda saat dipilih',
      nearbyTitle:'Jelajahi Tempat Sekitar', nearbyCard:'Toko dan menu dekat kampus', nearbyDesc:'Panduan lingkungan kampus yang diisi bersama mahasiswa', nearbyGo:'Jelajahi', moreLink:'Selengkapnya ›',
      mapPageTitle:'Tempat Sekitar', mapDesc:'Mengumpulkan tempat yang sering dikunjungi mahasiswa.', areaLabel:'Area', filterAll:'Semua', filterFood:'Makanan', filterPlay:'Hiburan',
      playSoon:'Info tempat hiburan akan segera hadir.', noPlaces:'Belum ada tempat terdaftar. Tambahkan di bawah.', menuShow:'Lihat menu', menuHide:'Tutup menu', openNaver:'Lihat di Naver Map', delPlace:'Hapus', exampleTag:'Contoh',
      addToggle:'＋ Tambah Info Tempat', addClose:'Tutup', addNamePh:'Nama tempat', addKind:'Jenis', addAddrPh:'Alamat (opsional)', menuInfo:'Info menu', addMenuPh:'Salin dan tempel menu dari Naver Map (satu per baris, misal: 김치찌개 9,000원)', addSubmit:'Simpan',
      savedTitle:'Info Tersimpan', savedDesc:'Kumpulan informasi yang ingin Anda lihat kembali.', savedEmpty:'Belum ada menu tersimpan. Tekan ☆ pada kartu menu.', saveBtn:'☆ Simpan', savedBtn:'★ Tersimpan',
      profTitle:'Info Saya', profDesc:'Bahasa tampilan ditentukan berdasarkan kewarganegaraan Anda.', nickLabel:'Nama panggilan', natLabel:'Kewarganegaraan', natNote:'Ubah kewarganegaraan lalu simpan — menu, postingan, dan komentar akan otomatis tampil dalam bahasa tersebut.', profSave:'Simpan', natSaved:'Kewarganegaraan diubah', profSaved:'Tersimpan', schoolName:'Universitas Nasional Gyeongsang',
      moreTitle:'Jelajahi Lainnya', dBoard:'Cerita kehidupan kampus', dHome:'Cari makanan lewat foto & nama', dMap:'Info tempat di sekitar kampus', dSaved:'Menu yang disimpan untuk nanti', resetDemo:'Reset demo',
      appName:'이름 미정', seedName:'Restoran Contoh (bukan toko asli)', unmatched:'Belum ada di kamus deskripsi kami. Hanya menampilkan harga.', noMenu:'Belum ada info menu.',
      prep:'Menyiapkan… (unduhan awal data bahasa Korea memerlukan sedikit waktu)', reading:'Membaca teks…',
      toastPhotoOk:'Foto dipilih. Membaca menu…', toastOcrOk:'Teks terbaca, mencari menu.', toastOcrEmpty:'Teks tidak ditemukan. Ambil foto lebih dekat atau ketik langsung.', toastOcrErr:'Gagal membaca teks. Silakan ketik langsung.', toastNoFile:'Pilih foto terlebih dahulu.', toastNoText:'Ambil foto atau masukkan teks terlebih dahulu.', toastNeedName:'Masukkan nama makanan.', toastFound:n=>`Ditemukan ${n} menu.`, toastNotFound:'Menu tidak ditemukan.', toastNoTess:'Gagal memuat alat OCR.', toastSpeech:'Browser ini tidak mendukung suara.', toastCopied:'Disalin. Tunjukkan kepada staf.', toastCopyFail:'Gagal menyalin.', toastAvoidOn:n=>`Peringatan aktif untuk makanan dengan ${n}.`, toastAvoidOff:n=>`Peringatan ${n} dimatikan.`, toastPlaceNeed:'Masukkan nama tempat.', toastPlaceAdded:'Tempat ditambahkan.', toastPlaceDel:'Tempat dihapus.',
      noKey:'Tidak ada kunci Gemini API — masukkan kunci di keys/gemkey lalu jalankan ulang server.py.', noServer:'Server belum berjalan — buka melalui run.bat (atau python server.py).',
      faq:[
        {q:'Apakah foto saya dikirim ke server?', a:'Pengenalan teks berjalan di dalam browser Anda dan aplikasi ini tidak menyimpan foto.'},
        {q:'Bagaimana jika hasil bacaannya salah?', a:'Ambil foto di tempat terang dan sejajar, atau perbaiki teks secara manual di kotak teks.'},
        {q:'Apakah semua makanan bisa dikenali?', a:'Saat ini tersedia sekitar 100 kamus hidangan populer Korea.'},
        {q:'Apakah terjemahan dan info bahan akurat?', a:'Ini adalah ringkasan umum; bahan tiap restoran bisa berbeda. Jika memiliki alergi atau pantangan, selalu pastikan kepada staf.'},
        {q:'Bagaimana cara menghindari bahan pantangan?', a:'Centang bahan di bagian “Bahan yang Tidak Saya Makan” untuk menampilkan peringatan merah.'},
        {q:'Bisakah membaca menu Naver Map secara otomatis?', a:'Salin menu dari Naver Map lalu tempelkan ke bagian “Tambah Info Tempat”.'}
      ]
    }
  },
  uz: {
    tags:{'돼지고기':'Cho‘chqa go‘shti','소고기':'Mol go‘shti','해산물':'Dengiz mahsulotlari','계란':'Tuxum','유제품':'Sut mahsulotlari','밀':'Bug‘doy (glyuten)','대두':'Soya'},
    store:{'한식당':'Koreys restorani','고깃집':'Koreys kabobxonasi','분식':'Koreys tamaddixonasi','중식당':'Xitoy restorani','일식당':'Yapon restorani','치킨집':'Qovurilgan tovuq','카페':'Kafe'},
    spicy:['Achchiq emas','Biroz achchiq','Achchiq','Juda achchiq'],
    orderTpl: n => `Bitta ${n} bering, iltimos.`,
    label:{spice:'Achchiqlik darajasi', say:'Buyurtma berganda shunday deng', warnPre:'Siz saqlanadigan mahsulot bor: ', noTag:'Allergenlar ko‘rsatilmagan', listen:'Tinglash', copy:'Nusxalash', storeType:'Joy turi', none:'Ro‘yxatdan menyu topilmadi', found:n=>`${n} ta taom topildi`, warnCount:n=>`, shundan ${n} tasida siz yemaydigan mahsulot bor`},
    area:'Kyeongsang Milliy Universiteti atrofi (Jinju)',
    ui:{
      navBoard:'Forum', navMenu:'Menyu', navMap:'Atrofda', navSaved:'Sevimlilar', navProfile:'Profilim', navMore:'Yana',
      boardTitle:'Talabalar forumi', boardDesc:'Istalgan tilda yozing — hamma o‘z ona tilida o‘qiydi.',
      hotTitle:'Hozirgi ommabop postlar', recentTitle:'So‘nggi postlar', seeAll:'Barchasini ko‘rish ›', boardHome:'← Forum bosh sahifasi', hubBack:'← Bo‘limlar ro‘yxatiga',
      boardUnion:'Umumiy', catAll:'Barchasi', catFood:'Ovqatlanish', catPlay:'Dam olish', catInfo:'Foydali ma’lumot', catQ:'Savollar', catFree:'Erkin mavzu',
      hMusic:'Musiqa', hSports:'Sport', hGame:'O‘yinlar', hMovie:'Kino va seriallar', hTravel:'Sayohat', hPhoto:'Foto', hCook:'Pazandalik', hKpop:'K-POP', hBook:'Kitoblar',
      trFrom:'{lang} tilidan tarjima qilindi', showOrig:'Aslini ko‘rish', showTr:'Tarjimani ko‘rish', translating:'Gemini tarjima qilmoqda…', trFailed:'Tarjima xatosi', retry:'Qayta urinish',
      comments:'Izohlar', commentPh:'Istalgan tilda izoh qoldiring', commentSend:'Yuborish', commented:'Izoh qo‘shildi', noComments:'Hozircha izohlar yo‘q. Birinchi bo‘lib salomlashing!', backList:'← Ro‘yxatga qaytish', writer:'Muallif',
      report:'Shikoyat', reportDone:'Yuborildi', rxRec:'Tavsiya qilaman', rxLike:'Yoqdi', rxTasty:'Mazali', rxBest:'Zo‘r', rxThanks:'Rahmat',
      writeTitle:'Yangi post yozish', postingAs:'Muallif', anon:'Anonim', anonPost:'Anonim tarzda yozish', pCatLabel:'Bo‘lim', pHobbyLabel:'Qiziqish bo‘limi', pHobbyNone:'Tanlanmagan (faqat davlat bo‘limi)',
      fTitlePh:'Sarlavha', bodyLabel:'Matn', fBodyPh:'Istalgan tilda yozing, avtomatik tarjima qilinadi…', tagsLabel:'Teglar', fTagsPh:'Teglar (masalan: oshxona arzon achchiq)', fPlacePh:'Oshxona/joy nomi', fAddrPh:'Manzil (ixtiyoriy)', fFavPh:'Tavsiya etilgan taom', fPhoto:'Rasm qo‘shish (maks. 3 ta)', fSubmit:'Joylashtirish',
      feedEmpty:'Hozircha postlar yo‘q. Birinchi bo‘lib yozing!', fNeedTitle:'Sarlavhani kiriting.', fNeedBody:'Matnni kiriting.', fPosted:'Post joylandi, rahmat!', fPhotoLimit:'Ko‘pi bilan 3 ta rasm qo‘shish mumkin.', fSaveFail:'Saqlab bo‘lmadi. Qayta urinib ko‘ring.', fPlaceLabel:'', fFavLabel:'Tavsiya etilgan taom: ',
      heroEyebrow:'Kampus atrofidagi ovqatlanish yordamchisi', heroTitle:'Bugungi Talabalar Oshxonasi<br>', heroSub:'', ctaPhoto:'Ovqat talonini olish', quickTitle:'Quick Search',
      searchPh:'Taom nomini qidiring (masalan: 김치찌개)', searchBtn:'Qidirish', photoTitle:'Menyu tarjimasi', photoDesc:'Rasmdagi koreyscha menyuni o‘qib, taom ma’lumotlarini topamiz.', pickPhoto:'Rasmga olish', ocrBtn:'Rasm matnini o‘qish', ocrPh:'Rasmda ko‘rinmagan qo‘shimcha ma’lumotlarni kiriting (ixtiyoriy)', matchBtn:'Rasmga olish',
      resultTitle:'Menyu natijalari', introResult:'Yuqoridan taom qidiring yoki menyuni rasmga oling.', noResultHint:'Taom nomini yozing yoki menyuni suratga oling.',
      avoidTitle:'Yemaydigan mahsulotlarim', avoidNote:'Belgilab qo‘ysangiz, profilingizda saqlanadi',
      nearbyTitle:'Atrofdagi joylarni ko‘rish', nearbyCard:'Universitet yaqinidagi oshxonalar va menyular', nearbyDesc:'Talabalar birgalikda boyitadigan hudud qo‘llanmasi', nearbyGo:'Ko‘rish', moreLink:'Batafsil ›',
      mapPageTitle:'Atrofdagi joylar', mapDesc:'Talabalar ko‘p boradigan joylar to‘plami.', areaLabel:'Hudud', filterAll:'Barchasi', filterFood:'Ovqat', filterPlay:'Ko‘ngilochar',
      playSoon:'Ko‘ngilochar joylar tez orada qo‘shiladi.', noPlaces:'Hozircha joylar yo‘q. Pastdan qo‘shing.', menuShow:'Menyuni ko‘rish', menuHide:'Menyuni yopish', openNaver:'Naver Map’da ko‘rish', delPlace:'O‘chirish', exampleTag:'Namuna',
      addToggle:'＋ Joy ma’lumotini qo‘shish', addClose:'Yopish', addNamePh:'Joy nomi', addKind:'Turi', addAddrPh:'Manzil (ixtiyoriy)', menuInfo:'Menyu ma’lumoti', addMenuPh:'Naver Map’dan menyuni nusxalab joylang (har qatorda bittadan, masalan: 김치찌개 9,000원)', addSubmit:'Saqlash',
      savedTitle:'Saqlangan ma’lumotlar', savedDesc:'Qayta ko‘rmoqchi bo‘lgan ma’lumotlaringiz.', savedEmpty:'Hozircha saqlangan taomlar yo‘q. Menyu kartasidagi ☆ tugmasini bosing.', saveBtn:'☆ Saqlash', savedBtn:'★ Saqlangan',
      profTitle:'Mening ma’lumotlarim', profDesc:'Ko‘rinadigan til tanlangan davlatingizga qarab belgilanadi.', nickLabel:'Taxallus', natLabel:'Davlatni tanlash', natNote:'Davlatingizni o‘zgartirib saqlasangiz, menyu hamda barcha post va izohlar o‘sha tilga avtomatik tarjima qilinadi.', profSave:'Saqlash', natSaved:'Davlat o‘zgartirildi', profSaved:'Saqlandi', schoolName:'Kyeongsang Milliy Universiteti',
      moreTitle:'Boshqa bo‘limlar', dBoard:'Universitet hayoti hikoyalari', dHome:'Rasm va nom orqali taom qidirish', dMap:'Universitet atrofidagi joylar', dSaved:'Keyinroq ko‘rish uchun saqlanganlar', resetDemo:'Demoni tiklash',
      appName:'이름 미정', seedName:'Namuna oshxona (haqiqiy emas)', unmatched:'Hozircha lug‘atimizda yo‘q. Faqat narxi ko‘rsatiladi.', noMenu:'Menyu ma’lumoti yo‘q.',
      prep:'Tayyorlanmoqda… (birinchi marta koreyscha ma’lumotlar yuklanadi)', reading:'Matn o‘qilmoqda…',
      toastPhotoOk:'Rasm tanlandi. Menyu o‘qilmoqda…', toastOcrOk:'Matn o‘qildi, taomlar qidirilmoqda.', toastOcrEmpty:'Matn topilmadi. Yaqinroqdan rasmga oling yoki qo‘lda kiriting.', toastOcrErr:'O‘qishda xatolik yuz berdi.', toastNoFile:'Avval rasmni tanlang.', toastNoText:'Avval rasmga oling yoki matn kiriting.', toastNeedName:'Taom nomini kiriting.', toastFound:n=>`${n} ta taom topildi.`, toastNotFound:'Taom topilmadi.', toastNoTess:'OCR vositasini yuklab bo‘lmadi.', toastSpeech:'Brauzer ovozli o‘qishni qo‘llamaydi.', toastCopied:'Nusxalandi. Xodimga ko‘rsating.', toastCopyFail:'Nusxalab bo‘lmadi.', toastAvoidOn:n=>`${n} bor taomlar uchun ogohlantirish yoqildi.`, toastAvoidOff:n=>`${n} ogohlantirishi o‘chirildi.`, toastPlaceNeed:'Joy nomini kiriting.', toastPlaceAdded:'Joy qo‘shildi.', toastPlaceDel:'Joy o‘chirildi.',
      noKey:'Gemini API kaliti yo‘q — kalitni keys/gemkey fayliga qo‘ying va server.py ni qayta ishga tushiring.', noServer:'Server ishlamayapti — run.bat (yoki python server.py) orqali oching.',
      faq:[
        {q:'Rasm serverga yuboriladimi?', a:'Matnni aniqlash brauzeringiz ichida bajariladi va ilova rasmlarni saqlamaydi.'},
        {q:'Matn xato o‘qilsa nima qilish kerak?', a:'Yorug‘ joyda yaqinroqdan tekis rasmga oling yoki matn katagida o‘zingiz tuzating.'},
        {q:'Barcha taomlarni taniy oladimi?', a:'Hozircha eng ko‘p uchraydigan ~100 ta taom lug‘ati mavjud.'},
        {q:'Tarjima va tarkib ma’lumotlari aniqmi?', a:'Bu qisqacha ma’lumot bo‘lib, har bir oshxonada farq qilishi mumkin. Allergiya yoki parhez cheklovingiz bo‘lsa, albatta xodimdan so‘rang.'},
        {q:'Yemaydigan mahsulotlarimni qanday ajrataman?', a:'“Yemaydigan mahsulotlarim” bo‘limida belgilang — bunday taomlarda qizil ogohlantirish chiqadi.'},
        {q:'Naver Map menyusini avtomatik o‘qiydimi?', a:'Naver Map’dan menyuni nusxalab, “Joy ma’lumotini qo‘shish” qismiga joylashtiring.'}
      ]
    }
  }
};

for (const [l, pack] of Object.entries(EXTRA_UI_LANGS)) {
  Object.keys(pack.tags).forEach(k => { if (TAGS[k]) TAGS[k][l] = pack.tags[k]; });
  Object.keys(pack.store).forEach(k => { if (STORE[k]) STORE[k][l] = pack.store[k]; });
  SPICY[l] = pack.spicy;
  ORDER_TPL[l] = pack.orderTpl;
  Object.keys(pack.label).forEach(k => { if (LABEL[k]) LABEL[k][l] = pack.label[k]; });
  AREAS[0].name[l] = pack.area;
  I18N[l] = Object.assign({}, I18N.en, pack.ui);
}
for (const it of DICT) {
  if (it.name && !it.name.ko) it.name.ko = it.ko;
}
for (const c of COUNTRIES) {
  if (c.code === 'OT') c.name.ko = '기타';
}

/* ================= 국적 → 언어 ================= */
const NATIONS = [
  {code:'KR', lang:'ko'}, {code:'US', lang:'en'}, {code:'CN', lang:'zh'}, {code:'JP', lang:'ja'},
  {code:'VN', lang:'vi'}, {code:'MN', lang:'mn'}, {code:'RU', lang:'ru'}, {code:'ES', lang:'es'},
  {code:'FR', lang:'fr'}, {code:'TH', lang:'th'}, {code:'ID', lang:'id'}, {code:'UZ', lang:'uz'}
];
const DATA_LANGS = ['zh','en','vi','ja','mn','ko','ru','es','fr','th','id','uz'];   // 모든 지원 언어에 기본 UI/태그/라벨 데이터 내장
let profile = db.get('gc_profile', null) || {nick:'GlobalUser', nat:'KR', lang:'ko'};
const dl = () => DATA_LANGS.includes(profile.lang) ? profile.lang : 'en';
function langName(code, inL){ try { return new Intl.DisplayNames([inL || profile.lang], {type:'language'}).of(code); } catch(_) { return code; } }
function regionName(code, inL){ try { return new Intl.DisplayNames([inL || profile.lang], {type:'region'}).of(code); } catch(_) { return code; } }
function countryName(c){ if (!c) return ''; return c.name[profile.lang] || (c.code !== 'OT' ? regionName(c.code) : '') || c.name.en; }

let avoided = new Set(db.get('ggg_avoid', []));
let lastItems = null;      // null = 아직 검색 안 함
let currentFile = null;
let toastTimer = null;
const mapState = { area: AREAS[0].id, kind: 'all', open: new Set() };

// 피드 상태
let CDB = null;            // 공유 데이터베이스 (연결되면 사용)
let USER = null;
let feedLive = false;
let feedPosts = [];
let feedSort = 'recent';
let pendingPhotos = [];
let myUid = db.get('ggg_uid', null);
if (!myUid) { myUid = 'u' + Math.random().toString(36).slice(2, 10); db.set('ggg_uid', myUid); }

// DOM 참조
const searchInput = $('searchInput');
const photoInput = $('photoInput');
const preview = $('preview');
const previewWrap = $('previewWrap');
const fileName = $('fileName');
const ocrBtn = $('ocrBtn');
const progressWrap = $('progressWrap');
const progressBar = $('progressBar');
const progressText = $('progressText');
const ocrText = $('ocrText');
const avoidBox = $('avoidBox');
const summaryBox = $('summaryBox');
const resultList = $('resultList');
const phraseList = $('phraseList');
const catCarousel = $('catCarousel');
const faqBox = $('faqBox');
const areaSel = $('areaSel');
const placeListEl = $('placeList');
const placeNames = $('placeNames');
const addToggle = $('addToggle');
const addForm = $('addForm');
const addName = $('addName');
const addKind = $('addKind');
const addAddr = $('addAddr');
const addMenu = $('addMenu');
const kindSeg = $('kindSeg');
const feedList = $('feedList');
const feedNotice = $('feedNotice');
const fab = $('fab');
const sheetBg = $('sheetBg');
const postForm = $('postForm');
const pNick = $('pNick');
const pCountry = $('pCountry');
const pCat = $('pCat');
const pHobby = $('pHobby');
const pTitle = $('pTitle');
const pBody = $('pBody');
const pTags = $('pTags');
const pPlace = $('pPlace');
const pAddr = $('pAddr');
const pFav = $('pFav');
const pPhotos = $('pPhotos');
const pPhotoPrev = $('pPhotoPrev');
const postMsg = $('postMsg');

function lang(){ return profile.lang || 'en'; }
function t(key, ...args){
  const dict = I18N[lang()] || I18N.en;
  const v = dict[key] ?? I18N.en[key];
  return typeof v === 'function' ? v(...args) : (v ?? key);
}
function txt(obj){ return obj[lang()] || obj[dl()] || obj.en; }

/* 커뮤니티 확장 문구 (연합 게시판 · 카테고리 · 신고) */
const I18N_EXTRA = {
  zh:{boardUnion:'联合', catAll:'全部', catFood:'吃的地方', catPlay:'好玩的地方', catInfo:'生活信息', catQ:'提问', catFree:'自由话题', report:'举报', reportDone:'已举报', pCatLabel:'分类'},
  en:{boardUnion:'All students', catAll:'All', catFood:'Food', catPlay:'Things to do', catInfo:'Life info', catQ:'Questions', catFree:'Free talk', report:'Report', reportDone:'Reported', pCatLabel:'Category'},
  vi:{boardUnion:'Chung', catAll:'Tất cả', catFood:'Ăn uống', catPlay:'Chỗ chơi', catInfo:'Thông tin đời sống', catQ:'Hỏi đáp', catFree:'Tự do', report:'Báo cáo', reportDone:'Đã báo cáo', pCatLabel:'Chuyên mục'},
  ja:{boardUnion:'連合', catAll:'すべて', catFood:'食べる場所', catPlay:'遊ぶ場所', catInfo:'生活情報', catQ:'質問', catFree:'雑談', report:'通報', reportDone:'通報済み', pCatLabel:'カテゴリー'},
  mn:{boardUnion:'Нэгдсэн', catAll:'Бүгд', catFood:'Хоол', catPlay:'Газар', catInfo:'Амьдралын мэдээлэл', catQ:'Асуулт', catFree:'Чөлөөт', report:'Мэдээлэх', reportDone:'Мэдээлсэн', pCatLabel:'Ангилал'}
};
for (const l of Object.keys(I18N_EXTRA)) if (I18N[l]) Object.assign(I18N[l], I18N_EXTRA[l]);

/* 게시판 목록 (에타식) · 취미 게시판 */
const I18N_EXTRA2 = {
  zh:{hubBack:'← 返回板块列表', hubHint:'选择想进入的板块。', pHobbyLabel:'兴趣板块', pHobbyNone:'不选（仅发到国家板块）', hMusic:'音乐', hSports:'运动', hGame:'游戏', hMovie:'电影·剧集', hTravel:'旅行', hPhoto:'摄影', hCook:'做饭', hKpop:'K-POP', hBook:'阅读'},
  en:{hubBack:'← Back to boards', hubHint:'Pick a board to enter.', pHobbyLabel:'Hobby board', pHobbyNone:'None (country board only)', hMusic:'Music', hSports:'Sports', hGame:'Games', hMovie:'Movies & TV', hTravel:'Travel', hPhoto:'Photo', hCook:'Cooking', hKpop:'K-POP', hBook:'Books'},
  vi:{hubBack:'← Quay lại danh sách', hubHint:'Chọn một chuyên mục để vào.', pHobbyLabel:'Chuyên mục sở thích', pHobbyNone:'Không chọn (chỉ đăng vào chuyên mục quốc gia)', hMusic:'Âm nhạc', hSports:'Thể thao', hGame:'Game', hMovie:'Phim & truyền hình', hTravel:'Du lịch', hPhoto:'Nhiếp ảnh', hCook:'Nấu ăn', hKpop:'K-POP', hBook:'Sách'},
  ja:{hubBack:'← 掲示板一覧へ', hubHint:'入りたい掲示板を選んでください。', pHobbyLabel:'趣味の掲示板', pHobbyNone:'なし（国の掲示板のみ）', hMusic:'音楽', hSports:'スポーツ', hGame:'ゲーム', hMovie:'映画・ドラマ', hTravel:'旅行', hPhoto:'写真', hCook:'料理', hKpop:'K-POP', hBook:'読書'},
  mn:{hubBack:'← Самбар руу буцах', hubHint:'Орох самбараа сонгоно уу.', pHobbyLabel:'Сонирхлын самбар', pHobbyNone:'Сонгохгүй (зөвхөн улсын самбар)', hMusic:'Хөгжим', hSports:'Спорт', hGame:'Тоглоом', hMovie:'Кино & цуврал', hTravel:'Аялал', hPhoto:'Гэрэл зураг', hCook:'Хоол хийх', hKpop:'K-POP', hBook:'Ном'}
};
for (const l of Object.keys(I18N_EXTRA2)) if (I18N[l]) Object.assign(I18N[l], I18N_EXTRA2[l]);
const I18N_EXTRA3 = {
  zh:{navMore:'更多', moreTitle:'更多功能', dHome:'通过拍照和菜名查找美食', dScan:'拍照读取菜单', dMap:'学校周边精选信息', dSaved:'保存以便日后查看的菜单'},
  en:{navMore:'More', moreTitle:'Explore more', dHome:'Find food by photo & name', dScan:'Photograph a menu and read it', dMap:'Info around the campus', dSaved:'Dishes saved to check later'},
  vi:{navMore:'Thêm', moreTitle:'Xem thêm', dHome:'Tìm món ăn qua ảnh và tên món', dScan:'Chụp thực đơn để đọc', dMap:'Thông tin quanh trường', dSaved:'Món đã lưu để xem lại'},
  ja:{navMore:'その他', moreTitle:'その他の機能', dHome:'写真と名前で料理を検索', dScan:'メニューを撮って読み取る', dMap:'大学周辺のまとめ情報', dSaved:'後で見るために保存したメニュー'},
  mn:{navMore:'Бусад', moreTitle:'Бусад цэс', dHome:'Зураг болон нэрээр хоол хайх', dScan:'Цэсний зураг уншуулах', dMap:'Сургуулийн орчмын мэдээлэл', dSaved:'Дараа үзэхээр хадгалсан хоол'}
};
for (const l of Object.keys(I18N_EXTRA3)) if (I18N[l]) Object.assign(I18N[l], I18N_EXTRA3[l]);
const I18N_EXTRA4 = {
  zh:{appName:'이름 미정', seedName:'示例餐厅（不是真实店铺）'},
  en:{appName:'이름 미정', seedName:'Sample restaurant (not a real shop)'},
  vi:{appName:'이름 미정', seedName:'Quán mẫu (không phải quán thật)'},
  ja:{appName:'이름 미정', seedName:'例のお店（実在しません）'},
  mn:{appName:'이름 미정', seedName:'Жишээ ресторан (бодит дэлгүүр биш)'}
};
for (const l of Object.keys(I18N_EXTRA4)) if (I18N[l]) Object.assign(I18N[l], I18N_EXTRA4[l]);

/* 동네 탐방(반경·지도·다중후기) · 스크랩 · 새글쓰기 개편 다국어 사전 (12개 언어 내장) */
const I18N_REVAMP = {
  ko:{
    navMap:'동네 탐방', navSaved:'스크랩',
    hashtagHint:'본문에 #태그를 적으면 자동 등록돼요',
    mapPageTitle:'동네 탐방', mapDesc:'식당부터 유원지·기념관·축제까지, 지도에서 장소를 선택하고 후기와 별점을 함께 나눠요.',
    areaLabel:'탐방 반경',
    rad1:'가좌동 · 1km 이내 (학교 주변)', rad5:'진주 시내 · 5km 이내', rad15:'진주권 · 15km 이내', rad30:'근교 탐방 · 30km 이내',
    filterAll:'전체', filterFood:'식당·카페', filterSpot:'유원지·명소', filterCulture:'기념관·전시', filterFest:'축제·행사',
    addToggle:'＋ 장소 선택 및 후기 남기기', addClose:'닫기',
    mapSearchLabel:'1. 지도에서 장소 검색 또는 핀 찍기', mapSearchPh:'장소·가게·명소·축제 검색 (예: 진주성, 가좌동 돈까스)',
    addNamePh:'장소 / 가게 이름', addKind:'분류', addAddrPh:'주소 / 위치 설명 (선택)',
    ratingLabel:'별점 평가', reviewLabel:'방문 후기 / 평가', reviewPh:'어떤 점이 좋았나요? 다른 학생들을 위해 솔직한 후기를 남겨주세요',
    menuInfo:'메뉴 정보 (식당인 경우 선택 입력)', addSubmit:'후기 저장',
    reviewsShow:'후기 보기', reviewsHide:'후기 접기', writeReviewHere:'＋ 나도 후기 남기기', focusOnMap:'📍 지도에서 보기',
    noPlaces:'선택한 반경 내 등록된 장소가 없어요. 지도에서 장소를 선택해 첫 후기를 남겨보세요!',
    savedTitle:'스크랩', savedDesc:'스크랩한 게시물과 동네 탐방 장소, 메뉴를 모아보고 검색해요.',
    savedEmpty:'아직 스크랩한 항목이 없어요. 게시물이나 동네 장소, 메뉴의 ☆ 스크랩을 눌러보세요.',
    saveBtn:'☆ 스크랩', savedBtn:'★ 스크랩됨',
    scrapSearchPh:'스크랩한 제목, 내용, 장소명, #해시태그 검색…',
    scrapTabPost:'게시물', scrapTabPlace:'동네 장소', scrapTabMenu:'메뉴',
    scrapNoMatch:'검색어와 일치하는 스크랩 항목이 없어요.',
    dMap:'식당·명소·축제 지도와 후기', dSaved:'스크랩한 게시물·장소 모아보기',
    toastScrapOn:'스크랩에 저장했어요.', toastScrapOff:'스크랩을 해제했어요.', toastReviewAdded:'장소 후기가 등록되었어요!'
  },
  en:{
    navMap:'Explore', navSaved:'Scraps',
    hashtagHint:'Write #hashtags in the body to tag automatically',
    mapPageTitle:'Local Explorer', mapDesc:'From restaurants to parks, memorials & festivals — pick a place on the map and share ratings & reviews.',
    areaLabel:'Radius',
    rad1:'Gajwa-dong · Within 1km (Campus)', rad5:'Jinju City · Within 5km', rad15:'Greater Jinju · Within 15km', rad30:'Nearby Trips · Within 30km',
    filterAll:'All', filterFood:'Food & Café', filterSpot:'Parks & Spots', filterCulture:'Museums & Halls', filterFest:'Festivals',
    addToggle:'＋ Pick Place & Write Review', addClose:'Close',
    mapSearchLabel:'1. Search a place or tap on the map', mapSearchPh:'Search restaurant, park, museum, festival…',
    addNamePh:'Place / Shop Name', addKind:'Category', addAddrPh:'Address / Location note (optional)',
    ratingLabel:'Star Rating', reviewLabel:'Your Review', reviewPh:'How was it? Share your honest review and tips for other students',
    menuInfo:'Menu Info (optional, for restaurants)', addSubmit:'Save Review',
    reviewsShow:'Reviews', reviewsHide:'Hide Reviews', writeReviewHere:'＋ Add My Review', focusOnMap:'📍 View on Map',
    noPlaces:'No places in this radius yet. Pick a spot on the map and leave the first review!',
    savedTitle:'Scrapbook', savedDesc:'View and search your scrapped posts, local places, and menus.',
    savedEmpty:'Nothing scrapped yet. Tap ☆ Scrap on any post, place, or menu.',
    saveBtn:'☆ Scrap', savedBtn:'★ Scrapped',
    scrapSearchPh:'Search scrapped titles, posts, places, #hashtags…',
    scrapTabPost:'Posts', scrapTabPlace:'Places', scrapTabMenu:'Menus',
    scrapNoMatch:'No scrapped items match your search.',
    dMap:'Map & reviews for food, spots & festivals', dSaved:'Your scrapped posts & places',
    toastScrapOn:'Saved to Scraps.', toastScrapOff:'Removed from Scraps.', toastReviewAdded:'Review posted!'
  },
  zh:{
    navMap:'周边探索', navSaved:'收藏夹',
    hashtagHint:'在正文中输入 #标签 即可自动识别',
    mapPageTitle:'周边探索', mapDesc:'从餐厅到游乐园、纪念馆、庆典，在地图上选择地点并分享评分与评价。',
    areaLabel:'探索半径',
    rad1:'加佐洞 · 1km以内（学校周边）', rad5:'晋州市区 · 5km以内', rad15:'晋州全境 · 15km以内', rad30:'周边郊游 · 30km以内',
    filterAll:'全部', filterFood:'餐厅·咖啡', filterSpot:'游乐园·景点', filterCulture:'纪念馆·展览', filterFest:'庆典·活动',
    addToggle:'＋ 选择地点并写评价', addClose:'关闭',
    mapSearchLabel:'1. 在地图上搜索地点或点击选点', mapSearchPh:'搜索餐厅、景点、纪念馆、庆典（如：晋州城）',
    addNamePh:'地点 / 店铺名称', addKind:'分类', addAddrPh:'地址 / 位置说明（选填）',
    ratingLabel:'星级评分', reviewLabel:'探访评价 / 后记', reviewPh:'体验如何？为其他同学留下真实评价吧',
    menuInfo:'菜单信息（餐厅选填）', addSubmit:'保存评价',
    reviewsShow:'查看评价', reviewsHide:'收起评价', writeReviewHere:'＋ 我也要写评价', focusOnMap:'📍 在地图上查看',
    noPlaces:'当前半径内还没有地点，在地图上选点留下第一条评价吧！',
    savedTitle:'收藏夹 (Scrap)', savedDesc:'集中查看并搜索你收藏的帖子、周边地点与菜单。',
    savedEmpty:'还没有收藏任何内容。点击帖子、地点或菜单上的 ☆ 即可收藏。',
    saveBtn:'☆ 收藏', savedBtn:'★ 已收藏',
    scrapSearchPh:'搜索已收藏的标题、内容、地点、#标签…',
    scrapTabPost:'帖子', scrapTabPlace:'周边地点', scrapTabMenu:'菜单',
    scrapNoMatch:'没有找到匹配的收藏内容。',
    dMap:'餐厅·景点·庆典地图与评价', dSaved:'查看收藏的帖子与地点',
    toastScrapOn:'已加入收藏夹。', toastScrapOff:'已取消收藏。', toastReviewAdded:'评价已发布！'
  },
  ja:{
    navMap:'周辺探索', navSaved:'スクラップ',
    hashtagHint:'本文に #タグ を書くと自動登録されます',
    mapPageTitle:'周辺探索', mapDesc:'食堂から遊園地・記念館・祭りまで、地図で場所を選んで写真・星評価・レビューを共有しましょう。',
    areaLabel:'探索半径',
    rad1:'加佐洞 · 1km以内（大学周辺）', rad5:'晋州市内 · 5km以内', rad15:'晋州圏 · 15km以内', rad30:'近郊探索 · 30km以内',
    filterAll:'すべて', filterFood:'食堂・カフェ', filterSpot:'遊園地・名所', filterCulture:'記念館・展示', filterFest:'祭り・イベント',
    addToggle:'＋ 場所を選んでレビューを書く', addClose:'閉じる',
    mapSearchLabel:'1. 地図で場所を検索またはタップして選択', mapSearchPh:'お店・名所・記念館・祭りを検索（例：晋州城）',
    addNamePh:'場所 / お店の名前', addKind:'分類', addAddrPh:'住所 / 場所の説明（任意）',
    ratingLabel:'星評価', reviewLabel:'訪問レビュー / 感想', reviewPh:'どんな点が良かったですか？他の学生のためにレビューを残してください',
    menuInfo:'メニュー情報（飲食店の場合・任意）', addSubmit:'レビューを保存',
    reviewsShow:'レビューを見る', reviewsHide:'レビューを閉じる', writeReviewHere:'＋ 自分もレビューを書く', focusOnMap:'📍 地図で見る',
    noPlaces:'この半径内にはまだ登録がありません。地図から選んで最初のレビューを書きましょう！',
    savedTitle:'スクラップ', savedDesc:'スクラップした投稿や周辺の場所、メニューをまとめて検索できます。',
    savedEmpty:'まだスクラップした項目がありません。投稿や場所の ☆ を押して保存しましょう。',
    saveBtn:'☆ スクラップ', savedBtn:'★ スクラップ済',
    scrapSearchPh:'スクラップしたタイトル、内容、場所名、#タグを検索…',
    scrapTabPost:'投稿', scrapTabPlace:'場所', scrapTabMenu:'メニュー',
    scrapNoMatch:'検索語に一致するスクラップがありません。',
    dMap:'食堂・名所・祭りの地図とレビュー', dSaved:'スクラップした投稿と場所',
    toastScrapOn:'スクラップに保存しました。', toastScrapOff:'スクラップを解除しました。', toastReviewAdded:'レビューを登録しました！'
  },
  vi:{
    navMap:'Khám phá', navSaved:'Đã lưu',
    hashtagHint:'Viết #hashtag trong nội dung để tự động gắn thẻ',
    mapPageTitle:'Khám phá quanh vùng', mapDesc:'Từ quán ăn đến khu vui chơi, nhà tưởng niệm, lễ hội — chọn trên bản đồ và chia sẻ đánh giá, chấm sao.',
    areaLabel:'Bán kính',
    rad1:'Gajwa-dong · Trong 1km (Quanh trường)', rad5:'Nội ô Jinju · Trong 5km', rad15:'Khu vực Jinju · Trong 15km', rad30:'Vùng lân cận · Trong 30km',
    filterAll:'Tất cả', filterFood:'Quán ăn·Café', filterSpot:'Điểm vui chơi', filterCulture:'Bảo tàng·Triển lãm', filterFest:'Lễ hội·Sự kiện',
    addToggle:'＋ Chọn địa điểm & Viết đánh giá', addClose:'Đóng',
    mapSearchLabel:'1. Tìm địa điểm hoặc chạm trên bản đồ', mapSearchPh:'Tìm quán ăn, điểm vui chơi, lễ hội…',
    addNamePh:'Tên địa điểm / quán', addKind:'Phân loại', addAddrPh:'Địa chỉ / Mô tả vị trí (tùy chọn)',
    ratingLabel:'Đánh giá sao', reviewLabel:'Nhận xét / Đánh giá', reviewPh:'Trải nghiệm của bạn thế nào? Hãy chia sẻ cho các bạn sinh viên khác nhé',
    menuInfo:'Thực đơn (tùy chọn cho quán ăn)', addSubmit:'Lưu đánh giá',
    reviewsShow:'Xem đánh giá', reviewsHide:'Ẩn đánh giá', writeReviewHere:'＋ Viết đánh giá của tôi', focusOnMap:'📍 Xem trên bản đồ',
    noPlaces:'Chưa có địa điểm nào trong bán kính này. Hãy chọn trên bản đồ và viết đánh giá đầu tiên!',
    savedTitle:'Mục đã lưu (Scrap)', savedDesc:'Xem và tìm kiếm các bài viết, địa điểm và món ăn bạn đã lưu.',
    savedEmpty:'Chưa có mục nào được lưu. Hãy nhấn ☆ trên bài viết hoặc địa điểm.',
    saveBtn:'☆ Lưu lại', savedBtn:'★ Đã lưu',
    scrapSearchPh:'Tìm kiếm bài viết, địa điểm, #hashtag đã lưu…',
    scrapTabPost:'Bài viết', scrapTabPlace:'Địa điểm', scrapTabMenu:'Thực đơn',
    scrapNoMatch:'Không tìm thấy mục đã lưu phù hợp.',
    dMap:'Bản đồ & đánh giá quán ăn, điểm chơi, lễ hội', dSaved:'Bài viết & địa điểm đã lưu',
    toastScrapOn:'Đã lưu vào Scrap.', toastScrapOff:'Đã bỏ lưu.', toastReviewAdded:'Đã đăng đánh giá!'
  },
  mn:{
    navMap:'Орчин тойрон', navSaved:'Хадгалсан',
    hashtagHint:'Бичвэртээ #таг бичвэл автоматаар бүртгэгдэнэ',
    mapPageTitle:'Орчин тойрны хайгуул', mapDesc:'Хоолны газраас эхлээд парк, дурсгалын газар, наадам хүртэл газрын зургаас сонгож сэтгэгдэл, үнэлгээ үлдээгээрэй.',
    areaLabel:'Хүрээ',
    rad1:'Гажва-дун · 1км дотор (Сургууль орчим)', rad5:'Жинжү хот · 5км дотор', rad15:'Жинжү бүс · 15км дотор', rad30:'Ойр орчим · 30км дотор',
    filterAll:'Бүгд', filterFood:'Хоол·Кафе', filterSpot:'Парк·Үзвэр', filterCulture:'Музей·Үзэсгэлэн', filterFest:'Баяр·Наадам',
    addToggle:'＋ Газар сонгох & Сэтгэгдэл бичих', addClose:'Хаах',
    mapSearchLabel:'1. Газрын зургаас хайх эсвэл дарж сонгох', mapSearchPh:'Хоолны газар, үзвэр, наадам хайх…',
    addNamePh:'Газар / Дэлгүүрийн нэр', addKind:'Ангилал', addAddrPh:'Хаяг / Байршлын тайлбар (заавал биш)',
    ratingLabel:'Одны үнэлгээ', reviewLabel:'Сэтгэгдэл / Үнэлгээ', reviewPh:'Ямар байсан бэ? Бусад оюутнуудад сэтгэгдлээ хуваалцаарай',
    menuInfo:'Цэсний мэдээлэл (хоолны газар бол)', addSubmit:'Сэтгэгдэл хадгалах',
    reviewsShow:'Сэтгэгдэл харах', reviewsHide:'Сэтгэгдэл хаах', writeReviewHere:'＋ Сэтгэгдэл нэмэх', focusOnMap:'📍 Зураг дээр харах',
    noPlaces:'Энэ зайд бүртгэлтэй газар алга. Газрын зургаас сонгож анхны сэтгэгдлийг үлдээгээрэй!',
    savedTitle:'Скрап (Хадгалсан)', savedDesc:'Хадгалсан нийтлэл, газар болон цэсээ нэг дороос харж хайгаарай.',
    savedEmpty:'Одоогоор хадгалсан зүйл алга. Нийтлэл болон газрын ☆ товчийг дарж хадгална уу.',
    saveBtn:'☆ Хадгалах', savedBtn:'★ Хадгалсан',
    scrapSearchPh:'Хадгалсан гарчиг, агуулга, газар, #таг хайх…',
    scrapTabPost:'Нийтлэл', scrapTabPlace:'Газар', scrapTabMenu:'Цэс',
    scrapNoMatch:'Хайлтад тохирох хадгалсан зүйл олдсонгүй.',
    dMap:'Хоол, үзвэр, наадмын газрын зураг & сэтгэгдэл', dSaved:'Хадгалсан нийтлэл ба газрууд',
    toastScrapOn:'Скрапт хадгаллаа.', toastScrapOff:'Хадгалсныг цуцаллаа.', toastReviewAdded:'Сэтгэгдэл нэмэгдлээ!'
  },
  ru:{
    navMap:'Обзор мест', navSaved:'Закладки',
    hashtagHint:'Напишите #хэштег в тексте для автоматического добавления',
    mapPageTitle:'Обзор окрестностей', mapDesc:'От кафе до парков, музеев и фестивалей — выбирайте место на карте и оставляйте фото, оценки и отзывы.',
    areaLabel:'Радиус',
    rad1:'Каджва-дон · до 1 км (у кампуса)', rad5:'Центр Чинджу · до 5 км', rad15:'Весь Чинджу · до 15 км', rad30:'Окрестности · до 30 км',
    filterAll:'Все', filterFood:'Еда и кафе', filterSpot:'Парки и места', filterCulture:'Музеи и залы', filterFest:'Фестивали',
    addToggle:'＋ Выбрать место и оставить отзыв', addClose:'Закрыть',
    mapSearchLabel:'1. Найдите место или нажмите на карту', mapSearchPh:'Поиск кафе, парка, музея, фестиваля…',
    addNamePh:'Название места / заведения', addKind:'Категория', addAddrPh:'Адрес / описание (необязательно)',
    ratingLabel:'Оценка', reviewLabel:'Ваш отзыв', reviewPh:'Поделитесь впечатлениями для других студентов',
    menuInfo:'Меню (необязательно, для кафе)', addSubmit:'Сохранить отзыв',
    reviewsShow:'Отзывы', reviewsHide:'Скрыть отзывы', writeReviewHere:'＋ Оставить свой отзыв', focusOnMap:'📍 На карте',
    noPlaces:'В этом радиусе пока нет мест. Выберите точку на карте и оставьте первый отзыв!',
    savedTitle:'Закладки (Скрап)', savedDesc:'Просматривайте и ищите сохранённые посты, места и блюда.',
    savedEmpty:'Пока нет закладок. Нажмите ☆ на любом посте, месте или блюде.',
    saveBtn:'☆ В закладки', savedBtn:'★ В закладках',
    scrapSearchPh:'Поиск по сохранённым постам, местам, #хэштегам…',
    scrapTabPost:'Посты', scrapTabPlace:'Места', scrapTabMenu:'Меню',
    scrapNoMatch:'Ничего не найдено среди закладок.',
    dMap:'Карта и отзывы о кафе, парках и фестивалях', dSaved:'Сохранённые посты и места',
    toastScrapOn:'Добавлено в закладки.', toastScrapOff:'Удалено из закладок.', toastReviewAdded:'Отзыв опубликован!'
  },
  es:{
    navMap:'Explorar', navSaved:'Guardados',
    hashtagHint:'Escribe #etiquetas en el texto para registrarlas automáticamente',
    mapPageTitle:'Explorar la zona', mapDesc:'Desde restaurantes hasta parques, museos y festivales: elige un lugar en el mapa y comparte fotos, estrellas y reseñas.',
    areaLabel:'Radio',
    rad1:'Gajwa-dong · Hasta 1 km (Campus)', rad5:'Centro de Jinju · Hasta 5 km', rad15:'Área de Jinju · Hasta 15 km', rad30:'Alrededores · Hasta 30 km',
    filterAll:'Todo', filterFood:'Comida y café', filterSpot:'Parques y sitios', filterCulture:'Museos y salas', filterFest:'Festivales',
    addToggle:'＋ Elegir lugar y escribir reseña', addClose:'Cerrar',
    mapSearchLabel:'1. Busca un lugar o toca el mapa', mapSearchPh:'Buscar restaurante, parque, museo, festival…',
    addNamePh:'Nombre del lugar / local', addKind:'Categoría', addAddrPh:'Dirección / nota de ubicación (opcional)',
    ratingLabel:'Valoración', reviewLabel:'Tu reseña', reviewPh:'¿Qué tal estuvo? Comparte tu opinión con otros estudiantes',
    menuInfo:'Información del menú (opcional)', addSubmit:'Guardar reseña',
    reviewsShow:'Ver reseñas', reviewsHide:'Ocultar reseñas', writeReviewHere:'＋ Añadir mi reseña', focusOnMap:'📍 Ver en el mapa',
    noPlaces:'Aún no hay lugares en este radio. ¡Elige uno en el mapa y deja la primera reseña!',
    savedTitle:'Scrap (Guardados)', savedDesc:'Consulta y busca tus publicaciones, lugares y menús guardados.',
    savedEmpty:'Aún no has guardado nada. Toca ☆ en una publicación, lugar o menú.',
    saveBtn:'☆ Guardar', savedBtn:'★ Guardado',
    scrapSearchPh:'Buscar por título, contenido, lugar o #etiqueta…',
    scrapTabPost:'Publicaciones', scrapTabPlace:'Lugares', scrapTabMenu:'Menús',
    scrapNoMatch:'No hay elementos guardados que coincidan con la búsqueda.',
    dMap:'Mapa y reseñas de comida, lugares y festivales', dSaved:'Publicaciones y lugares guardados',
    toastScrapOn:'Guardado en Scrap.', toastScrapOff:'Eliminado de Scrap.', toastReviewAdded:'¡Reseña publicada!'
  },
  fr:{
    navMap:'Explorer', navSaved:'Favoris',
    hashtagHint:'Écrivez #hashtag dans le texte pour l’ajouter automatiquement',
    mapPageTitle:'Explorer les alentours', mapDesc:'Des restaurants aux parcs, musées et festivals : choisissez un lieu sur la carte et partagez photos, notes et avis.',
    areaLabel:'Rayon',
    rad1:'Gajwa-dong · Moins de 1 km (Campus)', rad5:'Centre de Jinju · Moins de 5 km', rad15:'Région de Jinju · Moins de 15 km', rad30:'Aux alentours · Moins de 30 km',
    filterAll:'Tout', filterFood:'Restos & cafés', filterSpot:'Parcs & sites', filterCulture:'Musées & expos', filterFest:'Festivals',
    addToggle:'＋ Choisir un lieu et donner un avis', addClose:'Fermer',
    mapSearchLabel:'1. Rechercher un lieu ou toucher la carte', mapSearchPh:'Rechercher un restaurant, parc, musée, festival…',
    addNamePh:'Nom du lieu / commerce', addKind:'Catégorie', addAddrPh:'Adresse / indication (optionnel)',
    ratingLabel:'Note (étoiles)', reviewLabel:'Votre avis', reviewPh:'Partagez votre avis avec les autres étudiants',
    menuInfo:'Infos menu (optionnel)', addSubmit:'Enregistrer l’avis',
    reviewsShow:'Voir les avis', reviewsHide:'Masquer les avis', writeReviewHere:'＋ Ajouter mon avis', focusOnMap:'📍 Voir sur la carte',
    noPlaces:'Aucun lieu dans ce rayon. Sélectionnez un point sur la carte pour laisser le premier avis !',
    savedTitle:'Scrap (Favoris)', savedDesc:'Retrouvez et recherchez vos publications, lieux et menus enregistrés.',
    savedEmpty:'Aucun élément enregistré. Appuyez sur ☆ sur une publication, un lieu ou un menu.',
    saveBtn:'☆ Enregistrer', savedBtn:'★ Enregistré',
    scrapSearchPh:'Rechercher dans vos publications, lieux, #hashtags…',
    scrapTabPost:'Publications', scrapTabPlace:'Lieux', scrapTabMenu:'Menus',
    scrapNoMatch:'Aucun favori ne correspond à votre recherche.',
    dMap:'Carte et avis : restos, sites et festivals', dSaved:'Publications et lieux enregistrés',
    toastScrapOn:'Ajouté aux favoris.', toastScrapOff:'Retiré des favoris.', toastReviewAdded:'Avis publié !'
  },
  th:{
    navMap:'สำรวจย่าน', navSaved:'สแครป',
    hashtagHint:'พิมพ์ #แฮชแท็ก ในเนื้อหาเพื่อลงทะเบียนอัตโนมัติ',
    mapPageTitle:'สำรวจรอบเมือง', mapDesc:'ตั้งแต่ร้านอาหาร สวนสนุก พิพิธภัณฑ์ ไปจนถึงงานเทศกาล เลือกสถานที่บนแผนที่แล้วแชร์รูปภาพ ดาว และรีวิวร่วมกัน',
    areaLabel:'รัศมี',
    rad1:'คาจวาดง · ไม่เกิน 1 กม. (รอบมอ)', rad5:'ในเมืองชินจู · ไม่เกิน 5 กม.', rad15:'เขตชินจู · ไม่เกิน 15 กม.', rad30:'ชานเมือง · ไม่เกิน 30 กม.',
    filterAll:'ทั้งหมด', filterFood:'ร้านอาหาร·คาเฟ่', filterSpot:'ที่เที่ยว·แลนด์มาร์ก', filterCulture:'พิพิธภัณฑ์·นิทรรศการ', filterFest:'เทศกาล·อีเวนต์',
    addToggle:'＋ เลือกสถานที่และเขียนรีวิว', addClose:'ปิด',
    mapSearchLabel:'1. ค้นหาสถานที่หรือแตะบนแผนที่', mapSearchPh:'ค้นหาร้านอาหาร ที่เที่ยว พิพิธภัณฑ์ เทศกาล…',
    addNamePh:'ชื่อสถานที่ / ร้านค้า', addKind:'หมวดหมู่', addAddrPh:'ที่อยู่ / คำอธิบายตำแหน่ง (ไม่บังคับ)',
    ratingLabel:'คะแนนดาว', reviewLabel:'รีวิว / ความคิดเห็น', reviewPh:'ประทับใจอะไรบ้าง? แชร์รีวิวให้นักศึกษาคนอื่นๆ กันเถอะ',
    menuInfo:'ข้อมูลเมนู (สำหรับร้านอาหาร ไม่บังคับ)', addSubmit:'บันทึกรีวิว',
    reviewsShow:'ดูรีวิว', reviewsHide:'ซ่อนรีวิว', writeReviewHere:'＋ เขียนรีวิวของฉัน', focusOnMap:'📍 ดูบนแผนที่',
    noPlaces:'ยังไม่มีสถานที่ในรัศมีนี้ เลือกจุดบนแผนที่แล้วเขียนรีวิวแรกได้เลย!',
    savedTitle:'สแครป (ที่บันทึกไว้)', savedDesc:'รวมโพสต์ สถานที่ และเมนูที่คุณสแครปไว้ พร้อมค้นหาได้ทันที',
    savedEmpty:'ยังไม่มีรายการที่สแครป กด ☆ บนโพสต์ สถานที่ หรือเมนูเพื่อบันทึก',
    saveBtn:'☆ สแครป', savedBtn:'★ สแครปแล้ว',
    scrapSearchPh:'ค้นหาชื่อเรื่อง เนื้อหา สถานที่ หรือ #แฮชแท็ก ที่สแครปไว้…',
    scrapTabPost:'โพสต์', scrapTabPlace:'สถานที่', scrapTabMenu:'เมนู',
    scrapNoMatch:'ไม่พบรายการสแครปที่ตรงกับคำค้นหา',
    dMap:'แผนที่และรีวิวร้านอาหาร ที่เที่ยว เทศกาล', dSaved:'รวมโพสต์และสถานที่ที่สแครปไว้',
    toastScrapOn:'บันทึกในสแครปแล้ว', toastScrapOff:'ยกเลิกสแครปแล้ว', toastReviewAdded:'เพิ่มรีวิวเรียบร้อยแล้ว!'
  },
  id:{
    navMap:'Jelajah', navSaved:'Scrap',
    hashtagHint:'Tulis #tagar di dalam isi postingan untuk ditambahkan otomatis',
    mapPageTitle:'Jelajah Sekitar', mapDesc:'Dari restoran hingga taman hiburan, museum, dan festival — pilih lokasi di peta dan bagikan foto, rating bintang & ulasan.',
    areaLabel:'Radius',
    rad1:'Gajwa-dong · Dalam 1 km (Dekat Kampus)', rad5:'Kota Jinju · Dalam 5 km', rad15:'Area Jinju · Dalam 15 km', rad30:'Sekitar · Dalam 30 km',
    filterAll:'Semua', filterFood:'Resto & Kafe', filterSpot:'Wisata & Taman', filterCulture:'Museum & Pameran', filterFest:'Festival & Acara',
    addToggle:'＋ Pilih Lokasi & Tulis Ulasan', addClose:'Tutup',
    mapSearchLabel:'1. Cari lokasi atau ketuk pada peta', mapSearchPh:'Cari restoran, tempat wisata, museum, festival…',
    addNamePh:'Nama Tempat / Toko', addKind:'Kategori', addAddrPh:'Alamat / catatan lokasi (opsional)',
    ratingLabel:'Rating Bintang', reviewLabel:'Ulasan Anda', reviewPh:'Bagaimana pengalaman Anda? Bagikan ulasan jujur untuk mahasiswa lain',
    menuInfo:'Info Menu (opsional untuk restoran)', addSubmit:'Simpan Ulasan',
    reviewsShow:'Lihat Ulasan', reviewsHide:'Tutup Ulasan', writeReviewHere:'＋ Tambah Ulasan Saya', focusOnMap:'📍 Lihat di Peta',
    noPlaces:'Belum ada tempat dalam radius ini. Pilih titik di peta dan tulis ulasan pertama!',
    savedTitle:'Scrap (Tersimpan)', savedDesc:'Lihat dan cari postingan, lokasi, serta menu yang Anda simpan.',
    savedEmpty:'Belum ada item yang disimpan. Tekan ☆ Scrap pada postingan, lokasi, atau menu.',
    saveBtn:'☆ Scrap', savedBtn:'★ Tersimpan',
    scrapSearchPh:'Cari judul, isi, nama tempat, atau #tagar yang disimpan…',
    scrapTabPost:'Postingan', scrapTabPlace:'Lokasi', scrapTabMenu:'Menu',
    scrapNoMatch:'Tidak ada item Scrap yang cocok dengan pencarian.',
    dMap:'Peta & ulasan kuliner, wisata, dan festival', dSaved:'Postingan & lokasi yang disimpan',
    toastScrapOn:'Disimpan ke Scrap.', toastScrapOff:'Dihapus dari Scrap.', toastReviewAdded:'Ulasan berhasil dikirim!'
  },
  uz:{
    navMap:'Atrofni ko‘rish', navSaved:'Skrap',
    hashtagHint:'Matn ichida #heshteg yozsangiz avtomatik qo‘shiladi',
    mapPageTitle:'Atrofni o‘rganish', mapDesc:'Oshxonalardan tortib istirohat bog‘lari, muzeylar va festivallargacha — xaritadan joy tanlab, rasm, baho va fikrlarni ulashing.',
    areaLabel:'Radius',
    rad1:'Gajva-dong · 1 km ichida (Kampus atrofi)', rad5:'Jinju markazi · 5 km ichida', rad15:'Jinju hududi · 15 km ichida', rad30:'Atrof hududlar · 30 km ichida',
    filterAll:'Barchasi', filterFood:'Oshxona va kafe', filterSpot:'Bog‘ va maskanlar', filterCulture:'Muzey va ko‘rgazma', filterFest:'Festival va tadbir',
    addToggle:'＋ Joy tanlash va fikr qoldirish', addClose:'Yopish',
    mapSearchLabel:'1. Xaritadan joy qidiring yoki ustiga bosing', mapSearchPh:'Oshxona, bog‘, muzey, festival qidirish…',
    addNamePh:'Joy / oshxona nomi', addKind:'Toifa', addAddrPh:'Manzil / joylashuv izohi (ixtiyoriy)',
    ratingLabel:'Yulduzli baho', reviewLabel:'Fikr va taassurot', reviewPh:'Qanday taassurot qoldirdi? Boshqa talabalar uchun fikringizni yozing',
    menuInfo:'Menyu ma’lumoti (oshxona uchun ixtiyoriy)', addSubmit:'Fikrni saqlash',
    reviewsShow:'Fikrlarni ko‘rish', reviewsHide:'Fikrlarni yopish', writeReviewHere:'＋ Fikr qo‘shish', focusOnMap:'📍 Xaritada ko‘rish',
    noPlaces:'Bu radiusda hozircha joylar yo‘q. Xaritadan joy tanlab birinchi fikrni qoldiring!',
    savedTitle:'Skrap (Saqlanganlar)', savedDesc:'Saqlangan postlar, joylar va menyularni bir joyda ko‘ring va qidiring.',
    savedEmpty:'Hozircha saqlangan narsalar yo‘q. Post, joy yoki menyudagi ☆ tugmasini bosing.',
    saveBtn:'☆ Skrap', savedBtn:'★ Saqlangan',
    scrapSearchPh:'Saqlangan sarlavha, matn, joy nomi, #heshteg qidirish…',
    scrapTabPost:'Postlar', scrapTabPlace:'Joylar', scrapTabMenu:'Menyu',
    scrapNoMatch:'Qidiruvga mos saqlangan ma’lumot topilmadi.',
    dMap:'Oshxona, maskan va festivallar xaritasi hamda fikrlar', dSaved:'Saqlangan postlar va joylar',
    toastScrapOn:'Skrapga saqlandi.', toastScrapOff:'Skrapdan o‘chirildi.', toastReviewAdded:'Fikringiz qo‘shildi!'
  }
};
for (const [l, dict] of Object.entries(I18N_REVAMP)) {
  if (I18N[l]) Object.assign(I18N[l], dict);
}

const HOBBIES = [];   // 관심사 게시판 제거
const PREP_BOARDS = [
  { code: 'P:KR', country: 'KR', flag: '🇰🇷', key: 'prepKR' },
  { code: 'P:US', country: 'US', flag: '🇺🇸', key: 'prepUS' },
  { code: 'P:CN', country: 'CN', flag: '🇨🇳', key: 'prepCN' },
  { code: 'P:JP', country: 'JP', flag: '🇯🇵', key: 'prepJP' }
];
let feedMode = 'home';   // 'home' = 에타식 메인(인기 글 + 최신 글), 'feed' = 게시판 하나의 글 목록
function boardOk(p, code){
  if (code.startsWith('P:')) return p.prepCountry === code.slice(2);
  if (code === 'all') return true;
  return !p.prepCountry && p.country === code;
}
function boardCount(code){
  return feedPosts.filter(p => (p.reports || []).length < REPORT_HIDE_AT && boardOk(p, code)).length;
}
function renderHub(){
  const cards = [{code:'all', emoji:'', name:t('boardUnion')}]
    .concat(COUNTRIES.map(c => ({code:c.code, emoji:c.flag, name:countryName(c)})));
  const hub = $('boardHub'), keepScroll = hub.scrollLeft;
  hub.innerHTML = cards.map(c =>
    `<button type="button" class="hub-card${feedMode === 'feed' && feedBoard === c.code ? ' on' : ''}" data-board="${esc(c.code)}"><span class="hub-emoji" aria-hidden="true">${c.emoji}</span><b>${esc(c.name)}</b><span class="muted small">${boardCount(c.code)}</span></button>`
  ).join('');
  hub.scrollLeft = keepScroll;

  const pHub = $('prepHub');
  if (pHub) {
    const keepPrepScroll = pHub.scrollLeft;
    pHub.innerHTML = PREP_BOARDS.map(b =>
      `<button type="button" class="hub-card${feedMode === 'feed' && feedBoard === b.code ? ' on' : ''}" data-board="${esc(b.code)}"><span class="hub-emoji" aria-hidden="true">${b.flag}</span><b>${esc(t(b.key))}</b><span class="muted small">${boardCount(b.code)}</span></button>`
    ).join('');
    pHub.scrollLeft = keepPrepScroll;
  }
}
function enterBoard(code){ feedBoard = code; feedCat = 'all'; feedMode = 'feed'; renderFeed(); }
function backToHub(){ feedMode = 'home'; renderFeed(); }
$('hubBack').addEventListener('click', backToHub);
const POST_CATS = ['free','q','info','food','play'];   // 기본값: 자유게시판('free')
const REPORT_HIDE_AT = 3;
let feedBoard = 'all';
let feedCat = 'all';
function catLabel(c){ return t({food:'catFood',play:'catPlay',info:'catInfo',q:'catQ',free:'catFree'}[c] || 'catFree'); }

function renderBars(){
  const bb = $('boardBar');
  bb.innerHTML = [`<button type="button" data-board="all" class="${feedBoard==='all'?'on':''}">${esc(t('boardUnion'))}</button>`]
    .concat(PREP_BOARDS.map(b => `<button type="button" data-board="${esc(b.code)}" class="${feedBoard===b.code?'on':''}">${b.flag} ${esc(t(b.key))}</button>`))
    .concat(COUNTRIES.map(c => `<button type="button" data-board="${esc(c.code)}" class="${feedBoard===c.code?'on':''}">${c.flag} ${esc(countryName(c))}</button>`))
    .join('');
  const cb = $('catBar');
  const cats = ['all', ...POST_CATS];
  cb.innerHTML = cats.map(c => `<button type="button" data-cat="${c}" class="${feedCat===c?'on':''}">${esc(c==='all' ? t('catAll') : catLabel(c))}</button>`).join('');
}

function isVisible(p){
  if ((p.reports || []).length >= REPORT_HIDE_AT) return false;
  if (!boardOk(p, feedBoard)) return false;
  if (feedCat !== 'all' && (p.cat || 'free') !== feedCat) return false;
  return true;
}

async function saveField(post, field, value){
  if (CDB) {
    await CDB.collection('posts').doc(post.id).update({[field]: value});
    return;
  }
  const list = db.get('gc_posts_v2', []);
  const p = list.find(x => x.id === post.id);
  if (p) { p[field] = value; db.set('gc_posts_v2', list); }
  feedPosts = list;
  try {
    const r = await fetch('/api/posts', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({action:'update', id:post.id, field, value})
    });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data.posts)) { feedPosts = data.posts; db.set('gc_posts_v2', feedPosts); }
    }
  } catch (_) {}
}

async function toggleReport(postId){
  const p = feedPosts.find(x => x.id === postId);
  if (!p) return;
  const who = myUid || 'local';
  const list = (p.reports || []).slice();
  const next = list.includes(who) ? list.filter(x => x !== who) : [...list, who];
  p.reports = next;
  renderFeed();
  try { await saveField(p, 'reports', next); }
  catch (_) { toast(t('fSaveFail')); }
}

function toast(msg){
  const el = $('toastEl');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2200);
}

function speak(text){
  if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') { toast(t('toastSpeech')); return; }
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = 0.9;
    speechSynthesis.speak(u);
  } catch (_) { toast(t('toastSpeech')); }
}

async function copyText(text){
  let ok = false;
  try {
    await navigator.clipboard.writeText(text);
    ok = true;
  } catch (_) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { ok = document.execCommand('copy'); } catch (__) { ok = false; }
    ta.remove();
  }
  toast(ok ? t('toastCopied') : t('toastCopyFail'));
}

/* ================= 메뉴 파싱 & 검색 ================= */
function parseMenu(text){
  return String(text).split(/\n+/).map(s => s.trim()).filter(Boolean).map(line => {
    const m = line.match(/^(.+?)\s+([\d,]+)\s*원?$/);
    const name = m ? m[1].trim() : line;
    const price = m ? `${m[2]}원` : '';
    const n = norm(name);
    const dict = bestMatch(name);
    return {name, price, dict};
  });
}

// 한 줄에 여러 메뉴 이름이 겹쳐 잡히면 더 긴 이름을 우선합니다 (예: 닭갈비 안의 갈비, 바닐라라떼 안의 라떼)
function findInText(text){
  const lines = String(text).split(/\n+/).map(norm).filter(Boolean);
  const keysOf = it => [it.ko, ...it.alias].map(norm);
  const found = [];
  for (const line of lines) {
    const hits = DICT.filter(it => keysOf(it).some(k => line.includes(k)));
    const kept = hits.filter(a => !keysOf(a).some(ka => line.includes(ka) && hits.some(b => b !== a && keysOf(b).some(kb => line.includes(kb) && kb.length > ka.length && kb.includes(ka)))));
    for (const it of kept) if (!found.includes(it)) found.push(it);
  }
  return found;
}

function bestMatch(text){
  const n = norm(text);
  let best = null, bestLen = 0;
  for (const it of DICT) {
    for (const k of [it.ko, ...it.alias]) {
      const nk = norm(k);
      if (n.includes(nk) && nk.length > bestLen) { best = it; bestLen = nk.length; }
    }
  }
  return best;
}

function findLoose(q){
  const hits = findInText(q);
  if (hits.length) return hits;
  const n = norm(q);
  return DICT.filter(it => [it.ko, ...it.alias].some(k => norm(k).includes(n)));
}

function runSearch(q){
  const text = String(q).trim();
  if (!text) { toast(t('toastNeedName')); return; }
  searchInput.value = text;
  const items = findLoose(text);
  showResults(items);
  $('results').scrollIntoView({behavior:'smooth', block:'start'});
  toast(items.length ? t('toastFound', items.length) : t('toastNotFound'));
}

function runMatch(){
  const text = ocrText.value.trim();
  if (!text) { toast(t('toastNoText')); return; }
  const items = findInText(text);
  showResults(items);
  $('results').scrollIntoView({behavior:'smooth', block:'start'});
  toast(items.length ? t('toastFound', items.length) : t('toastNotFound'));
}

/* ================= 메뉴 카드 ================= */
function menuCard(item, l, price){
  const bad = item.tags.filter(tg => avoided.has(tg));
  const sayKo = `${item.ko} 하나 주세요.`;
  const sayRom = `${item.rom} hana juseyo.`;
  const sayTr = ORDER_TPL[l](txt(item.name));
  const dots = '●'.repeat(item.spicy) + '○'.repeat(3 - item.spicy);
  const tagHtml = item.tags.length
    ? item.tags.map(tg => `<span class="tag${avoided.has(tg) ? ' bad' : ''}">${esc(TAGS[tg][l])}</span>`).join('')
    : `<span class="tag">${esc(LABEL.noTag[l])}</span>`;
  return `
  <article class="menu-card${bad.length ? ' warn' : ''}">
    <div class="menu-head">
      <h3>${esc(txt(item.name))}</h3>
      ${price ? `<span class="price">${esc(price)}</span>` : `<span class="store-tag">${esc(STORE[item.store][l])}</span>`}
    </div>
    <p class="desc">${esc(txt(item.desc))}</p>
    <div class="meta">${esc(LABEL.spice[l])}: ${dots} ${esc(SPICY[l][item.spicy])}</div>
    <div class="tags">${tagHtml}</div>
    ${bad.length ? `<div class="alert">${esc(LABEL.warnPre[l])}${bad.map(tg => esc(TAGS[tg][l])).join(', ')}</div>` : ''}
    <div style="margin-top:10px"><button class="btn-ghost btn-sm save-btn${db.get('ggg_saved', []).includes(item.ko) ? ' on' : ''}" type="button" data-save="${esc(item.ko)}">${esc(db.get('ggg_saved', []).includes(item.ko) ? t('savedBtn') : t('saveBtn'))}</button></div>
    <div class="say">
      <div class="lab">${esc(LABEL.say[l])}</div>
      <div class="ko">${esc(sayKo)}</div>
      <div class="rom">${esc(sayRom)}</div>
      <div class="tr">${esc(sayTr)}</div>
      <div class="btns">
        <button class="btn-ghost btn-sm" type="button" data-speak="${esc(sayKo)}">${esc(LABEL.listen[l])}</button>
        <button class="btn-ghost btn-sm" type="button" data-copy="${esc(sayKo)}">${esc(LABEL.copy[l])}</button>
      </div>
    </div>
  </article>`;
}

function genericMenuCard(p, l){
  const sayKo = `${p.name} 하나 주세요.`;
  return `
  <article class="menu-card">
    <div class="menu-head">
      <h3>${esc(p.name)}</h3>
      ${p.price ? `<span class="price">${esc(p.price)}</span>` : ''}
    </div>
    <p class="desc">${esc(t('unmatched'))}</p>
    <div class="say">
      <div class="lab">${esc(LABEL.say[l])}</div>
      <div class="ko">${esc(sayKo)}</div>
      <div class="tr">${esc(ORDER_TPL[l](p.name))}</div>
      <div class="btns">
        <button class="btn-ghost btn-sm" type="button" data-speak="${esc(sayKo)}">${esc(LABEL.listen[l])}</button>
        <button class="btn-ghost btn-sm" type="button" data-copy="${esc(sayKo)}">${esc(LABEL.copy[l])}</button>
      </div>
    </div>
  </article>`;
}

function menuListHtml(menuText, l){
  const items = parseMenu(menuText);
  if (!items.length) return `<div class="muted">${esc(t('noMenu'))}</div>`;
  return items.map(p => p.dict ? menuCard(p.dict, l, p.price) : genericMenuCard(p, l)).join('');
}

/* ================= 홈 렌더링 ================= */
function showResults(items){
  lastItems = items;
  const l = dl();
  if (!items.length) {
    summaryBox.hidden = true;
    resultList.innerHTML = `<div class="empty">${esc(LABEL.none[l])}<br><small>${esc(t('noResultHint'))}</small></div>`;
    return;
  }
  const stores = [...new Set(items.map(i => i.store))];
  const badCount = items.filter(i => i.tags.some(tg => avoided.has(tg))).length;
  summaryBox.hidden = false;
  summaryBox.innerHTML = `
    <div class="muted">${esc(LABEL.storeType[l])}</div>
    <div>${stores.map(s => `<span class="pill">${esc(STORE[s][l])}</span>`).join('')}</div>
    <div class="muted" style="margin-top:6px">${esc(LABEL.found[l](items.length))}${badCount ? `<span class="warn-text">${esc(LABEL.warnCount[l](badCount))}</span>` : ''}</div>`;
  resultList.innerHTML = items.map(i => menuCard(i, l)).join('');
}

function renderIntro(){
  if (lastItems === null) resultList.innerHTML = `<div class="empty">${esc(t('introResult'))}</div>`;
}

function renderAvoid(){
  const l = dl();
  avoidBox.innerHTML = Object.keys(TAGS).map(tg => `
    <label class="check">
      <input type="checkbox" value="${esc(tg)}" ${avoided.has(tg) ? 'checked' : ''} />
      <span>${esc(TAGS[tg][l])}</span>
    </label>`).join('');
}

function renderPhrases(){
  if (!phraseList) return;
  const l = dl();
  phraseList.innerHTML = PHRASES.map(p => `
    <div class="phrase">
      <div class="ko">${esc(p.ko)}</div>
      <div class="rom">${esc(p.rom)}</div>
      ${l === 'ko' ? '' : `<div class="tr">${esc(p[l] || p.en)}</div>`}
      <div class="btns">
        <button class="btn-ghost btn-sm" type="button" data-speak="${esc(p.ko)}">${esc(LABEL.listen[l])}</button>
        <button class="btn-ghost btn-sm" type="button" data-copy="${esc(p.ko)}">${esc(LABEL.copy[l])}</button>
      </div>
    </div>`).join('');
}

function renderCategories(){
  if (!catCarousel) return;
  const l = dl();
  catCarousel.innerHTML = CATEGORIES.map(c => {
    const d = DICT.find(x => x.ko === c.ex);
    return `
    <button class="cat" type="button" data-q="${esc(c.ex)}">
      <b>${esc(STORE[c.ko][l] || STORE[c.ko].en)}</b>
      <span>${esc(d ? txt(d.name) : c.ex)}</span>
    </button>`;
  }).join('');
}

function renderFaq(){
  const items = ((I18N[lang()] || {}).faq || I18N.en.faq);
  faqBox.innerHTML = items.map((f, i) => `
    <div class="faq-item">
      <button class="faq-q" type="button" aria-expanded="false" aria-controls="faq${i}">${esc(f.q)}</button>
      <div class="faq-a" id="faq${i}" hidden>${esc(f.a)}</div>
    </div>`).join('');
}

/* ================= 동네 탐방 (지도 · 반경 · 장소 후기 · 별점 · 중복 병합) ================= */
/*
 * [지도 API 교체 안내 (TODO: Kakao Maps / Naver Maps 전환 시)]
 * 현재는 별도 API 키 없이 즉시 동작하는 오픈소스 Leaflet + OpenStreetMap(Nominatim)이 연동되어 있습니다.
 * 추후 카카오맵(Kakao Maps) 또는 네이버 지도(Naver Maps)로 교체할 때는 아래 3개 함수만 교체하면 됩니다:
 *   1. initExploreMap()    : L.map('exploreMap') -> new kakao.maps.Map(...) 또는 new naver.maps.Map(...)
 *   2. updateMapMarkers()  : L.marker / L.circle -> kakao.maps.Marker / Circle
 *   3. searchPlaceOnMap()  : Nominatim fetch     -> new kakao.maps.services.Places().keywordSearch(...)
 */
const CAMPUS_CENTER = { lat: 35.1538, lng: 128.0996 }; // 기준점: 경상국립대학교 가좌캠퍼스 (진주시 가좌동)
const RADIUS_LIST = [
  { id: '1',  km: 1,  key: 'rad1',  zoom: 15 },
  { id: '5',  km: 5,  key: 'rad5',  zoom: 13 },
  { id: '15', km: 15, key: 'rad15', zoom: 11 },
  { id: '30', km: 30, key: 'rad30', zoom: 10 }
];

mapState.radius = '1'; // 디폴트: 가까운 반경 (1km 이내 · 가좌동)
let exploreMap = null;
let exploreCircle = null;
let exploreMarkers = [];
let pickedPinMarker = null;
let addRating = 5;
let pendingPlacePhotos = [];

function haversineKm(lat1, lng1, lat2, lng2){
  const toRad = d => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function seedExplorePlaces(){
  const ago = m => new Date(Date.now() - m * 60000).toISOString();
  return [
    {
      id: 'pl-gajwa-kimbap',
      kind: 'food',
      name: '가좌동 캠퍼스 김밥·분식 (예시)',
      addr: '경남 진주시 가좌길 74번길 (정문 도보 3분)',
      lat: 35.1552,
      lng: 128.1018,
      menuText: '김치찌개 8,000\n된장찌개 7,500\n떡볶이 4,500\n김밥 3,500\n라면 4,500\n돈까스 8,500',
      seed: true,
      reviews: [
        { id: 'rv-1', nick: 'Yuki', country: 'JP', srcLang: 'ja', stars: 5, body: '正門から近くて一人でも入りやすいです！チーズトッポッキがおすすめ。', photos: [], createdAt: ago(180) },
        { id: 'rv-2', nick: '민지', country: 'KR', srcLang: 'ko', stars: 4, body: '시험기간에 빨리 밥 먹기 좋아요. 돈까스 바삭하고 양 많음!', photos: [], createdAt: ago(65) }
      ]
    },
    {
      id: 'pl-gajwa-halal',
      kind: 'food',
      name: '가좌 아시안 커리 & 케밥 하우스',
      addr: '경남 진주시 가좌동 대학로 부근',
      lat: 35.1524,
      lng: 128.1031,
      menuText: '치킨케밥 6,500\n양고기커리 10,000\n갈릭난 2,500\n라씨 3,500',
      seed: false,
      reviews: [
        { id: 'rv-3', nick: 'Aziz', country: 'UZ', srcLang: 'uz', stars: 5, body: 'Halol taom qidirayotgan talabalar uchun eng зўр joy! Kabobi juda mazali.', photos: [], createdAt: ago(240) },
        { id: 'rv-4', nick: 'Alex', country: 'US', srcLang: 'en', stars: 5, body: 'Great portions and student discount if you show your ID.', photos: [], createdAt: ago(95) }
      ]
    },
    {
      id: 'pl-namgang-fest',
      kind: 'fest',
      name: '진주 남강유등축제 (남강 둔치)',
      addr: '경남 진주시 남강로 626 일원',
      lat: 35.1904,
      lng: 128.0825,
      menuText: '',
      seed: false,
      reviews: [
        { id: 'rv-5', nick: 'Linh', country: 'VN', srcLang: 'vi', stars: 5, body: 'Đèn lồng trên sông Namgang buổi tối đẹp cực kỳ! Nhất định phải đi cùng bạn bè nhé ✨', photos: [], createdAt: ago(420) },
        { id: 'rv-6', nick: '王磊', country: 'CN', srcLang: 'zh', stars: 5, body: '夜景非常震撼，还有很多小吃摊，推荐晚上7点以后去！', photos: [], createdAt: ago(310) }
      ]
    },
    {
      id: 'pl-jinjuseong',
      kind: 'culture',
      name: '진주성 & 국립진주박물관',
      addr: '경남 진주시 남강로 626 (본성동)',
      lat: 35.1912,
      lng: 128.0795,
      menuText: '',
      seed: false,
      reviews: [
        { id: 'rv-7', nick: 'Dmitry', country: 'RU', srcLang: 'ru', stars: 5, body: 'Красивая крепость и отличный музей внутри. Вход в музей бесплатный!', photos: [], createdAt: ago(500) }
      ]
    },
    {
      id: 'pl-jinyangho',
      kind: 'spot',
      name: '진양호 공원 & 전망대 유원지',
      addr: '경남 진주시 남강로1번길 130 (판문동)',
      lat: 35.1765,
      lng: 128.0342,
      menuText: '',
      seed: false,
      reviews: [
        { id: 'rv-8', nick: 'María', country: 'ES', srcLang: 'es', stars: 5, body: 'El atardecer desde el mirador del lago Jinyangho es precioso. Ideal para pasear el fin de semana.', photos: [], createdAt: ago(720) }
      ]
    },
    {
      id: 'pl-sacheon-cable',
      kind: 'spot',
      name: '사천 바다케이블카 & 각산 전망대',
      addr: '경남 사천시 사천대로 18 (대방동 · 근교 나들이)',
      lat: 34.9362,
      lng: 128.0468,
      menuText: '',
      seed: false,
      reviews: [
        { id: 'rv-9', nick: '준호', country: 'KR', srcLang: 'ko', stars: 5, body: '학교에서 시외버스로 30~40분이면 가요! 바다 위를 건너는 케이블카 뷰가 최고입니다.', photos: [], createdAt: ago(980) }
      ]
    }
  ];
}

let explorePlaces = [];
function loadLocalPlaces(){
  let list = db.get('gc_places_v2', null);
  if (!Array.isArray(list) || !list.length) {
    list = seedExplorePlaces();
    db.set('gc_places_v2', list);
  }
  explorePlaces = list;
}
loadLocalPlaces();

async function syncServerPlaces(){
  try {
    const r = await fetch('/api/places');
    if (!r.ok) return;
    const data = await r.json();
    if (Array.isArray(data.places)) {
      const oldJson = JSON.stringify(explorePlaces);
      const newJson = JSON.stringify(data.places);
      if (oldJson !== newJson) {
        explorePlaces = data.places;
        db.set('gc_places_v2', explorePlaces);
        renderMap();
        if (location.hash === '#saved') renderSaved();
        translatePending();
      }
    } else {
      const initR = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'init', places: explorePlaces })
      });
      if (initR.ok) {
        const d = await initR.json();
        if (Array.isArray(d.places)) {
          explorePlaces = d.places;
          db.set('gc_places_v2', explorePlaces);
          renderMap();
        }
      }
    }
  } catch (_) {}
}

function allPlaces(){
  return explorePlaces;
}

function kindLabelOf(kind){
  if (kind === 'food') return t('filterFood');
  if (kind === 'spot') return t('filterSpot');
  if (kind === 'culture') return t('filterCulture');
  if (kind === 'fest') return t('filterFest');
  return t('filterSpot');
}

function avgStarsOf(p){
  const rvs = p.reviews || [];
  if (!rvs.length) return 0;
  const sum = rvs.reduce((acc, r) => acc + (Number(r.stars) || 5), 0);
  return sum / rvs.length;
}

function starsStr(n){
  const rounded = Math.round(Number(n) || 5);
  return '★'.repeat(Math.max(1, Math.min(5, rounded))) + '☆'.repeat(Math.max(0, 5 - rounded));
}

function placeUnitsOf(p){
  const out = [];
  for (const rv of (p.reviews || [])) {
    if (rv && rv.body) out.push([`${p.id}:r:${rv.id}`, rv.body, rv.srcLang]);
  }
  return out;
}

function isPlaceScrapped(id){
  return db.get('gc_scrap_places', []).includes(id);
}

function toggleScrapPlace(id){
  const list = db.get('gc_scrap_places', []);
  const idx = list.indexOf(id);
  const on = idx < 0;
  if (on) list.unshift(id); else list.splice(idx, 1);
  db.set('gc_scrap_places', list);
  toast(on ? t('scrapAdded') : t('scrapRemoved'));
  renderMap();
  if (location.hash === '#saved') renderSaved();
}

function isPostScrapped(id){
  return db.get('gc_scrap_posts', []).includes(id);
}

function toggleScrapPost(id){
  const list = db.get('gc_scrap_posts', []);
  const idx = list.indexOf(id);
  const on = idx < 0;
  if (on) list.unshift(id); else list.splice(idx, 1);
  db.set('gc_scrap_posts', list);
  toast(on ? t('scrapAdded') : t('scrapRemoved'));
  renderFeed();
  if (location.hash === '#saved') renderSaved();
}

const DEFAULT_AVATAR = 'image/profile/profile_icon.svg';
function getAvatarSrc(item){
  if (!item) return profile.avatar || DEFAULT_AVATAR;
  if (item.anon) return DEFAULT_AVATAR;
  if (item.authorId && item.authorId === myUid && profile.avatar) return profile.avatar;
  return item.avatar || DEFAULT_AVATAR;
}
function getVerifyInfo(item){
  if (!item) return { type: profile.verifyType || '', school: profile.verifySchool || '', country: profile.verifyCountry || '' };
  if (item.authorId && item.authorId === myUid) {
    return { type: profile.verifyType || '', school: profile.verifySchool || '', country: profile.verifyCountry || '' };
  }
  return { type: item.verifyType || '', school: item.verifySchool || '', country: item.verifyCountry || '' };
}
function avatarImgHtml(item){
  const src = getAvatarSrc(item);
  const v = getVerifyInfo(item);
  const badge = v.type === 'enrolled'
    ? `<span class="av-vbadge enrolled" title="${esc(t('vBadgeEnrolled'))}">✓</span>`
    : v.type === 'alumni'
    ? `<span class="av-vbadge alumni" title="${esc(t('vBadgeAlumni'))}">🎓</span>`
    : '';
  return `<img src="${esc(src)}" alt="" onerror="this.onerror=null;this.src='${DEFAULT_AVATAR}'" />${badge}`;
}
function verifyPillHtml(item){
  const v = getVerifyInfo(item);
  if (!v.type) return '';
  const schoolPart = (!item?.anon && v.school) ? ` · ${v.school}` : (v.country ? ` · ${v.country}` : '');
  if (v.type === 'enrolled') {
    return `<span class="v-pill enrolled" title="${esc((v.school || '') + ' ' + t('vBadgeEnrolled'))}">${esc(t('vBadgeEnrolled'))}${esc(schoolPart)}</span>`;
  }
  if (v.type === 'alumni') {
    return `<span class="v-pill alumni" title="${esc((v.school || '') + ' ' + t('vBadgeAlumni'))}">${esc(t('vBadgeAlumni'))}${esc(schoolPart)}</span>`;
  }
  return '';
}

function placeCard(p, l){
  const open = mapState.open.has(p.id);
  const kindLabel = kindLabelOf(p.kind);
  const distKm = (p.lat && p.lng) ? haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(p.lat), Number(p.lng)) : 0;
  const distBadge = `${distKm.toFixed(1)}km`;
  const rvs = p.reviews || [];
  const avg = avgStarsOf(p);
  const scrapped = isPlaceScrapped(p.id);
  const naverUrl = `https://map.naver.com/p/search/${encodeURIComponent(`${p.name} 진주`)}`;

  const reviewsHtml = rvs.length ? `
    <div class="review-box">
      <div class="review-box-head">
        <span>💬 ${esc(t('reviewsCount', rvs.length))}</span>
        <span class="star-badge">${starsStr(avg)} ${avg.toFixed(1)}</span>
      </div>
      <div class="review-list">
        ${rvs.map(rv => {
          const rk = `${p.id}:r:${rv.id}`;
          const orig = showOrig.has(rk);
          const c = COUNTRIES.find(x => x.code === rv.country);
          const flag = c ? c.flag : (rv.country || 'KR');
          const rPhotos = (rv.photos || []).map(src => `<img src="${esc(src)}" alt="" />`).join('');
          return `<div class="review-card">
            <div class="review-meta">
              <div class="review-author">
                <span class="av av-wrap" style="width:26px;height:26px">${avatarImgHtml(rv)}</span>
                <b>${esc(rv.nick || t('anon'))}</b>${verifyPillHtml(rv)}
                <span class="muted small">${esc(flag)} · ${esc(relTime(rv.createdAt))}</span>
              </div>
              <span class="review-stars">${starsStr(rv.stars)} ${(Number(rv.stars) || 5).toFixed(1)}</span>
            </div>
            <p class="${unitCls([rk])}" style="margin:4px 0 0;line-height:1.55">${esc(vis(rk, rv.body, orig))}</p>
            ${trBadge([rk], rk)}
            ${rPhotos ? `<div class="review-photos">${rPhotos}</div>` : ''}
          </div>`;
        }).join('')}
      </div>
    </div>` : '';

  let menuBody = '';
  if (open && p.kind === 'food' && p.menuText) {
    menuBody = menuListHtml(p.menuText || '', l);
  }

  return `
  <article class="card place" id="place-${esc(p.id)}">
    <div class="menu-head">
      <div>
        <h3>${esc(p.seed ? t('seedName') : p.name)}</h3>
        <div class="muted small" style="margin-top:4px">📍 ${esc(p.addr || '진주')} · <b>${esc(distBadge)}</b>${p.seed ? ` · <b>${esc(t('exampleTag'))}</b>` : ''}</div>
      </div>
      <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap">
        ${rvs.length ? `<span class="star-badge">★ ${avg.toFixed(1)} (${rvs.length})</span>` : ''}
        <span class="store-tag">${esc(kindLabel)}</span>
      </div>
    </div>
    <div class="btns" style="margin-top:10px">
      <button class="btn-ghost btn-sm" type="button" data-review-place="${esc(p.id)}">${esc(t('writeReviewHere'))}</button>
      <button class="btn-ghost btn-sm${scrapped ? ' on' : ''}" type="button" data-scrap-place="${esc(p.id)}">${scrapped ? esc(t('scrappedBtn')) : esc(t('scrapBtn'))}</button>
      ${(p.kind === 'food' && p.menuText) ? `<button class="btn-ghost btn-sm" type="button" data-menu="${esc(p.id)}">${open ? esc(t('menuHide')) : esc(t('menuShow'))}</button>` : ''}
      ${(p.lat && p.lng) ? `<button class="btn-ghost btn-sm" type="button" data-focus-map="${esc(p.id)}">🗺️ 지도 위치</button>` : ''}
      <a class="btn-ghost btn-sm" href="${esc(naverUrl)}" target="_blank" rel="noopener">${esc(t('openNaver'))}</a>
    </div>
    ${menuBody}
    ${reviewsHtml}
  </article>`;
}

function initExploreMap(){
  const box = $('exploreMap');
  if (!box || typeof L === 'undefined') return;
  if (exploreMap) {
    setTimeout(() => exploreMap.invalidateSize(), 60);
    return;
  }
  exploreMap = L.map(box, { zoomControl: true }).setView([CAMPUS_CENTER.lat, CAMPUS_CENTER.lng], 15);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(exploreMap);

  // 기준점 마커 (경상국립대 가좌캠퍼스)
  L.circleMarker([CAMPUS_CENTER.lat, CAMPUS_CENTER.lng], {
    radius: 8,
    color: '#007a70',
    fillColor: '#007a70',
    fillOpacity: 0.9,
    weight: 2
  }).addTo(exploreMap).bindPopup('<b>📍 경상국립대학교 가좌캠퍼스 (기준점)</b>');

  // 지도 클릭으로 장소 위치 직접 지정
  exploreMap.on('click', async e => {
    const { lat, lng } = e.latlng;
    setPickedLocation(lat, lng, addName.value.trim() || '', '');
    if (addForm.hidden) {
      addForm.hidden = false;
      addToggle.textContent = t('addClose');
    }
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${lang()}`);
      if (r.ok) {
        const d = await r.json();
        const addr = d.display_name ? d.display_name.split(',').slice(0, 4).join(', ') : `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        const suggested = d.name || '';
        setPickedLocation(lat, lng, addName.value.trim() || suggested, addr);
      }
    } catch (_) {}
  });
}

function setPickedLocation(lat, lng, name, addr, kind){
  $('addLat').value = Number(lat).toFixed(6);
  $('addLng').value = Number(lng).toFixed(6);
  if (name && !addName.value.trim()) addName.value = name;
  else if (name) addName.value = name;
  if (addr) addAddr.value = addr;
  if (kind) addKind.value = kind;
  const badge = $('selectedPlaceBadge');
  if (badge) {
    const dist = haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(lat), Number(lng));
    badge.hidden = false;
    badge.textContent = `${t('mapPicked')}: ${addName.value || '선택한 위치'} (${dist.toFixed(1)}km)`;
  }
  if (exploreMap && typeof L !== 'undefined') {
    if (pickedPinMarker) exploreMap.removeLayer(pickedPinMarker);
    pickedPinMarker = L.marker([lat, lng]).addTo(exploreMap)
      .bindPopup(`<b>📌 ${esc(addName.value || '선택한 위치')}</b><br><small>${esc(addAddr.value || '')}</small>`)
      .openPopup();
    exploreMap.panTo([lat, lng]);
  }
}

function updateMapMarkers(filteredList, radObj){
  if (!exploreMap || typeof L === 'undefined') return;
  if (exploreCircle) exploreMap.removeLayer(exploreCircle);
  exploreCircle = L.circle([CAMPUS_CENTER.lat, CAMPUS_CENTER.lng], {
    radius: radObj.km * 1000,
    color: '#007a70',
    fillColor: '#00a396',
    fillOpacity: 0.08,
    weight: 1.5,
    dashArray: '5,4'
  }).addTo(exploreMap);

  exploreMarkers.forEach(m => exploreMap.removeLayer(m));
  exploreMarkers = [];
  filteredList.forEach(p => {
    if (!p.lat || !p.lng) return;
    const avg = avgStarsOf(p);
    const rvs = (p.reviews || []).length;
    const m = L.marker([Number(p.lat), Number(p.lng)]).addTo(exploreMap);
    m.bindPopup(`
      <div style="min-width:160px">
        <b>${esc(p.seed ? t('seedName') : p.name)}</b>
        <div style="font-size:12px;color:#555;margin:3px 0">${esc(kindLabelOf(p.kind))} · ★ ${avg ? avg.toFixed(1) : '5.0'} (${rvs})</div>
        <div style="font-size:11px;color:#777">${esc(p.addr || '')}</div>
      </div>
    `);
    exploreMarkers.push(m);
  });
}

async function searchPlaceOnMap(){
  const q = ($('mapSearchInput').value || '').trim();
  const box = $('mapSearchResults');
  if (!q || !box) return;
  box.hidden = false;
  box.innerHTML = `<div class="map-search-item"><small>${esc(t('reading'))}</small></div>`;

  // 1) 이미 등록된 동네 장소 중 일치 항목 우선 표시 (중복 방지 & 후기 합치기 유도)
  const localMatches = allPlaces().filter(p =>
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    (p.addr || '').toLowerCase().includes(q.toLowerCase())
  );

  // 2) OpenStreetMap Nominatim 장소 검색 (진주/경남 반경 우선 검색 + 전국 검색)
  let osmItems = [];
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q + ' 진주')}&limit=5&accept-language=${lang()}`;
    const r = await fetch(url);
    if (r.ok) osmItems = await r.json();
    if (!osmItems.length) {
      const r2 = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(q)}&countrycodes=kr&limit=5&accept-language=${lang()}`);
      if (r2.ok) osmItems = await r2.json();
    }
  } catch (_) {}

  const rows = [];
  localMatches.forEach(p => {
    const dist = haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(p.lat || CAMPUS_CENTER.lat), Number(p.lng || CAMPUS_CENTER.lng));
    rows.push(`<button type="button" class="map-search-item" data-pick-lat="${p.lat}" data-pick-lng="${p.lng}" data-pick-name="${esc(p.name)}" data-pick-addr="${esc(p.addr || '')}" data-pick-kind="${esc(p.kind)}">
      <b>⭐ [등록된 장소] ${esc(p.name)} (${(p.reviews || []).length}개 후기)</b>
      <small>${esc(p.addr || '')} · ${dist.toFixed(1)}km</small>
    </button>`);
  });

  osmItems.forEach(it => {
    const name = it.name || (it.display_name ? it.display_name.split(',')[0] : q);
    const addr = it.display_name ? it.display_name.split(',').slice(0, 4).join(', ') : '';
    const dist = haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(it.lat), Number(it.lon));
    rows.push(`<button type="button" class="map-search-item" data-pick-lat="${it.lat}" data-pick-lng="${it.lon}" data-pick-name="${esc(name)}" data-pick-addr="${esc(addr)}">
      <b>📍 ${esc(name)}</b>
      <small>${esc(addr)} · 캠퍼스에서 ${dist.toFixed(1)}km</small>
    </button>`);
  });

  box.innerHTML = rows.length
    ? rows.join('')
    : `<div class="map-search-item"><small>검색 결과가 없어요. 지도를 직접 클릭해 핀을 찍거나 아래에 이름을 입력해 주세요.</small></div>`;
}

function renderAddPhotoThumbs(){
  const box = $('addPhotoPrev');
  if (!box) return;
  box.innerHTML = pendingPlacePhotos.map((src, i) =>
    `<img src="${esc(src)}" alt="" data-rmplacephoto="${i}" title="×" />`).join('');
}

function renderStarPicker(){
  const box = $('starPicker');
  if (!box) return;
  box.querySelectorAll('button[data-star]').forEach(b => {
    b.classList.toggle('on', Number(b.dataset.star) <= addRating);
  });
  const txtEl = $('starValueText');
  if (txtEl) txtEl.textContent = addRating.toFixed(1);
}

let placeSort = 'dist'; // 'dist' | 'stars' | 'reviews'

function renderMap(){
  const l = dl();
  if (!RADIUS_LIST.some(r => r.id === mapState.radius)) mapState.radius = '1';
  const radObj = RADIUS_LIST.find(r => r.id === mapState.radius) || RADIUS_LIST[0];

  areaSel.innerHTML = RADIUS_LIST.map(r => `<option value="${esc(r.id)}">${esc(t(r.key))}</option>`).join('');
  areaSel.value = mapState.radius;
  kindSeg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.kind === mapState.kind));
  if ($('placeSortSeg')) {
    $('placeSortSeg').querySelectorAll('button[data-place-sort]').forEach(b => {
      b.classList.toggle('on', b.dataset.placeSort === placeSort);
    });
  }

  const cap = $('mapCaption');
  if (cap) cap.textContent = t('mapCaption');

  const list = allPlaces().filter(p => {
    const dist = (p.lat && p.lng)
      ? haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(p.lat), Number(p.lng))
      : 0.5;
    const inRadius = dist <= radObj.km;
    const inKind = mapState.kind === 'all' || p.kind === mapState.kind;
    return inRadius && inKind;
  }).sort((a, b) => {
    const da = haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(a.lat || CAMPUS_CENTER.lat), Number(a.lng || CAMPUS_CENTER.lng));
    const db2 = haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(b.lat || CAMPUS_CENTER.lat), Number(b.lng || CAMPUS_CENTER.lng));
    if (placeSort === 'stars') {
      const diff = avgStarsOf(b) - avgStarsOf(a);
      if (Math.abs(diff) > 0.01) return diff;
    } else if (placeSort === 'reviews') {
      const diff = (b.reviews || []).length - (a.reviews || []).length;
      if (diff !== 0) return diff;
    }
    return da - db2;
  });

  if (!list.length) {
    placeListEl.innerHTML = `<div class="empty">${esc(t('noPlaces'))}</div>`;
  } else {
    placeListEl.innerHTML = list.map(p => placeCard(p, l)).join('');
  }

  placeNames.innerHTML = allPlaces().map(p => `<option value="${esc(p.name)}"></option>`).join('');
  addToggle.textContent = addForm.hidden ? t('addToggle') : t('addClose');
  if ($('addMenuWrap')) $('addMenuWrap').hidden = addKind.value !== 'food';
  renderStarPicker();

  if (!$('page-map').hidden) {
    initExploreMap();
    updateMapMarkers(list, radObj);
  }
}

/* ================= 피드 (공유 저장소 / 이 기기 저장) ================= */
function rowsOf(snap){
  try {
    const docs = snap && (snap.docs || (Array.isArray(snap) ? snap : null));
    if (!docs) return [];
    return docs.map(d => {
      const data = typeof d.data === 'function' ? d.data() : d;
      return {...data, id: d.id || data.id};
    });
  } catch (_) { return []; }
}

function loadLocalFeed(){
  let list = db.get('gc_posts_v2', null);
  if (!Array.isArray(list)) { list = seedPosts(); db.set('gc_posts_v2', list); }
  feedPosts = list;
  renderFeed();
}

async function syncServerPosts(){
  try {
    const r = await fetch('/api/posts');
    if (!r.ok) return;
    const data = await r.json();
    if (Array.isArray(data.posts)) {
      const oldJson = JSON.stringify(feedPosts);
      const newJson = JSON.stringify(data.posts);
      if (oldJson !== newJson) {
        feedPosts = data.posts;
        db.set('gc_posts_v2', feedPosts);
        renderFeed();
        if (location.hash === '#saved') renderSaved();
        translatePending();
      }
    } else {
      const initR = await fetch('/api/posts', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({action:'init', posts: feedPosts})
      });
      if (initR.ok) {
        const d = await initR.json();
        if (Array.isArray(d.posts)) { feedPosts = d.posts; db.set('gc_posts_v2', feedPosts); renderFeed(); }
      }
    }
  } catch (_) {}
}

async function initBackends(){
  try {
    if (window.claude && typeof window.claude.use === 'function') {
      CDB = await window.claude.use('db');
      USER = await window.claude.use('user');
      if (USER && typeof USER.id === 'function') myUid = await USER.id();
    }
  } catch (_) { CDB = null; }

  if (CDB) {
    try {
      CDB.collection('posts').orderBy('createdAt', 'desc').limit(200).onSnapshot(snap => {
        feedPosts = rowsOf(snap);
        feedLive = true;
        renderFeed();
      });
      feedLive = true;
    } catch (_) {
      CDB = null;
      feedLive = false;
      loadLocalFeed();
    }
  } else {
    feedLive = false;
    loadLocalFeed();
    syncServerPosts();
    syncServerPlaces();
    setInterval(() => {
      syncServerPosts();
      syncServerPlaces();
    }, 4000);
  }
  renderFeed();
}

async function savePost(post){
  if (CDB) {
    await CDB.collection('posts').doc(post.id).set(post);
    return;
  }
  const list = db.get('gc_posts_v2', []);
  list.unshift(post);
  if (!db.set('gc_posts_v2', list)) throw new Error('storage full');
  feedPosts = list;
  try {
    const r = await fetch('/api/posts', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({action:'add', post})
    });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data.posts)) { feedPosts = data.posts; db.set('gc_posts_v2', feedPosts); }
    }
  } catch (_) {}
}

async function saveReacts(post, reacts){
  await saveField(post, 'reacts', reacts);
}

async function toggleReact(postId, emoji){
  const p = feedPosts.find(x => x.id === postId);
  if (!p) return;
  const reacts = JSON.parse(JSON.stringify(p.reacts || {}));
  const list = reacts[emoji] || [];
  reacts[emoji] = list.includes(myUid) ? list.filter(x => x !== myUid) : [...list, myUid];
  p.reacts = reacts;
  renderFeed();
  try { await saveReacts(p, reacts); }
  catch (_) { toast(t('fSaveFail')); }
}

function reactCount(p){
  return Object.values(p.reacts || {}).reduce((a, arr) => a + (Array.isArray(arr) ? arr.length : 0), 0);
}

function extractHashtags(text){
  if (!text) return [];
  const matches = String(text).match(/#[^\s#.,!?;:()\[\]{}"']+/g) || [];
  return [...new Set(matches)].slice(0, 10);
}

function prepBadgeHtml(p){
  if (!p || !p.prepCountry) return '';
  const b = PREP_BOARDS.find(x => x.country === p.prepCountry);
  if (!b) return '';
  return `<span class="prep-post-tag">${b.flag} ${esc(t(b.key))}</span>`;
}

function postCard(p, l, full){
  const c = COUNTRIES.find(x => x.code === p.country);
  const flag = c ? c.flag : 'ETC';
  const cname = c ? countryName(c) : '';
  const allTags = [...new Set([...(p.tags || []), ...extractHashtags(p.body)])];
  const tags = allTags.map(tg => `<span class="htag">${esc(tg)}</span>`).join('');
  const photos = (p.photos || []).map(src => `<img class="post-img" src="${esc(src)}" alt="" />`).join('');
  const btns = REACTS.map(rc => {
    const arr = (p.reacts || {})[rc.e] || [];
    const on = arr.includes(myUid);
    return `<button type="button" class="react${on ? ' on' : ''}" data-react="${esc(p.id)}" data-emoji="${esc(rc.e)}" aria-pressed="${on}">${esc(t(rc.key))} <b>${arr.length}</b></button>`;
  }).join('');
  const kt = p.id + ':t', kb = p.id + ':b';
  const orig = showOrig.has(p.id);
  const ncm = (p.comments || []).length;
  const scrapped = isPostScrapped(p.id);
  return `
  <article class="post${full ? '' : ' clamp'}">
    <div class="post-head">
      <div class="av av-wrap" aria-hidden="true">${avatarImgHtml(p)}</div>
      <div>
        <b>${esc(authorName(p))}</b>${verifyPillHtml(p)} <span class="muted">${flag} ${esc(cname)}</span>
        <div class="muted small">${esc(relTime(p.createdAt))}</div>
      </div>
    </div>
    ${full ? photos : (p.photos || []).slice(0, 1).map(src => `<img class="post-img" src="${esc(src)}" alt="" />`).join('')}
    <div class="post-body">
      <div class="muted small">${prepBadgeHtml(p)}${esc(catLabel(p.cat || 'free'))}</div>
      <h3 class="${unitCls([kt])}" data-open="${esc(p.id)}">${esc(vis(kt, p.title, orig))}</h3>
      <p class="${unitCls([kb])}" ${full ? '' : `data-open="${esc(p.id)}"`}>${esc(vis(kb, p.body, orig))}</p>
      ${trBadge([kt, kb], p.id)}
      ${tags ? `<div style="margin-top:10px">${tags}</div>` : ''}
      <div class="reacts">${btns}</div>
      <div class="report-row">
        <div style="display:flex;gap:8px;align-items:center">
          ${full ? '' : `<button type="button" class="cmt-link" data-open="${esc(p.id)}">💬 ${esc(t('comments'))} ${ncm}</button>`}
          <button type="button" class="btn-ghost btn-sm${scrapped ? ' on' : ''}" data-scrap-post="${esc(p.id)}">${scrapped ? esc(t('scrappedBtn')) : esc(t('scrapBtn'))}</button>
        </div>
        <button type="button" class="btn-ghost btn-sm" data-report="${esc(p.id)}" aria-pressed="${(p.reports || []).includes(myUid || 'local')}">${(p.reports || []).includes(myUid || 'local') ? esc(t('reportDone')) : esc(t('report'))}</button>
      </div>
    </div>
  </article>`;
}

function renderFeed(){
  const notice = !api.checked ? '' : !api.server ? t('noServer') : !api.hasKey ? t('noKey') : '';
  feedNotice.hidden = !notice;
  feedNotice.textContent = notice;
  renderBars();
  renderHub();
  const home = feedMode !== 'feed';
  $('boardHome').hidden = !home;
  $('feedWrap').hidden = home;
  $('catBar').hidden = home;
  $('hubWrap').hidden = home;
  $('boardName').textContent = boardTitle(feedBoard);
  renderPostDetail();
  if (home) renderBoardHome();
  let list = feedPosts.filter(isVisible);
  if (feedSort === 'popular') list.sort((a, b) => reactCount(b) - reactCount(a));
  else list.sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || '')));
  const l = dl();
  feedList.innerHTML = list.length
    ? list.slice(0, 100).map(p => postCard(p, l)).join('')
    : `<div class="empty">${esc(t('feedEmpty'))}</div>`;
  document.querySelectorAll('[data-sort]').forEach(b => b.classList.toggle('on', b.dataset.sort === feedSort));
}

/* 에타식 게시판 메인: 실시간 인기 글 + 최신 글 */
function rowMeta(p){
  return `${esc(p.country || 'OT')} · ${esc(relTime(p.createdAt))} · ♡ ${reactCount(p)} · 💬 ${(p.comments || []).length}`;
}
function rowTrMark(p){
  const k = [p.id + ':t', p.id + ':b'].find(isTrKey);
  return k ? `<span class="row-tr">✨ ${esc(t('trFrom').replace('{lang}', langName(TR[k].src)))}</span>` : '';
}
function rowItem(p){
  const kt = p.id + ':t', kb = p.id + ':b';
  return `<a class="row" data-open="${esc(p.id)}">
    <b class="${unitCls([kt])}">${prepBadgeHtml(p)}${esc(vis(kt, p.title))}</b>
    <span class="row-prev ${unitCls([kb])}">${esc(vis(kb, p.body))}</span>
    <span class="row-meta"><span>${esc(authorName(p))}${verifyPillHtml(p)} · ${rowMeta(p)}</span>${rowTrMark(p)}</span>
  </a>`;
}
function renderBoardHome(){
  const visible = feedPosts.filter(p => (p.reports || []).length < REPORT_HIDE_AT);
  const hot = [...visible].sort((a, b) => reactCount(b) - reactCount(a)).slice(0, 2);
  const recent = [...visible].sort((a, b) => String(b.createdAt || '').localeCompare(String(a.createdAt || ''))).slice(0, 10);
  $('hotList').innerHTML = hot.map(p => {
    const kt = p.id + ':t', kb = p.id + ':b';
    return `<a class="hot-card" data-open="${esc(p.id)}">
      <span class="hot-cat">${esc(catLabel(p.cat || 'free'))}</span>
      <b class="${unitCls([kt])}">${prepBadgeHtml(p)}${esc(vis(kt, p.title))}</b>
      <p class="${unitCls([kb])}">${esc(vis(kb, p.body))}</p>
      <span class="row-meta"><span>${rowMeta(p)}</span>${rowTrMark(p)}</span>
    </a>`;
  }).join('');
  $('recentList').innerHTML = recent.length ? recent.map(rowItem).join('') : `<div class="empty">${esc(t('feedEmpty'))}</div>`;
}

/* 글쓰기 시트 (게시판 기본값: 자유 'free', 유학 준비 게시판 선택 지원) */
function renderPostForm(){
  const me = COUNTRIES.find(c => c.code === profile.nat);
  $('pAuthor').innerHTML = `${esc(t('postingAs'))}: <b>${esc($('pAnon').checked ? t('anon') : profile.nick)}</b>${verifyPillHtml(null)} · ${esc(profile.nat)} ${esc(countryName(me))}`;
  const pPrep = $('pPrep');
  if (pPrep) {
    const keepPrep = pPrep.value || '';
    pPrep.innerHTML = `<option value="">${esc(t('pPrepNormal'))}</option>` +
      PREP_BOARDS.map(b => `<option value="${b.country}">${b.flag} ${esc(t(b.key))}</option>`).join('');
    pPrep.value = keepPrep;
  }
  const keepCat = pCat.value && POST_CATS.includes(pCat.value) ? pCat.value : 'free';
  pCat.innerHTML = POST_CATS.map(c => `<option value="${c}">${esc(catLabel(c))}</option>`).join('');
  pCat.value = keepCat;
  renderThumbs();
}

function renderThumbs(){
  pPhotoPrev.innerHTML = pendingPhotos.map((src, i) =>
    `<img src="${esc(src)}" alt="" data-rmphoto="${i}" title="×" />`).join('');
}

function compressImage(file){
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const s = Math.min(1, 640 / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.width * s));
      c.height = Math.max(1, Math.round(img.height * s));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.7));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('image')); };
    img.src = url;
  });
}

function openSheet(){
  pCat.value = 'free'; // 새 글 쓰기 시 기본값: 자유게시판
  renderPostForm();
  if ($('pPrep')) {
    $('pPrep').value = (feedMode === 'feed' && feedBoard.startsWith('P:')) ? feedBoard.slice(2) : '';
  }
  postMsg.textContent = '';
  sheetBg.hidden = false;
}
function closeSheet(){ sheetBg.hidden = true; }

/* ================= 화면 문구 & 전체 렌더 ================= */
function applyUI(){
  const dict = I18N[lang()] || I18N.en;
  document.documentElement.lang = lang();
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = dict[el.dataset.i18n];
    if (typeof v === 'string') el.textContent = v;
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const v = dict[el.dataset.i18nHtml];
    if (typeof v === 'string') el.innerHTML = esc(v).replace(/&lt;br\s*\/?&gt;/gi, '<br>');
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const v = dict[el.dataset.i18nPh];
    if (typeof v === 'string') el.placeholder = v;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const v = dict[el.dataset.i18nAria];
    if (typeof v === 'string') el.setAttribute('aria-label', v);
  });
  document.querySelectorAll('.chip[data-q]').forEach(el => {
    const d = DICT.find(x => x.ko === el.dataset.q);
    if (d) el.textContent = txt(d.name);
  });
}

function renderAll(){
  applyUI();
  renderAvoid();
  renderPhrases();
  renderCategories();
  renderFaq();
  if (lastItems === null) renderIntro();
  else showResults(lastItems);
  renderMap();
  renderFeed();
  renderSaved();
  renderProfile();
  renderTop();
  if (!sheetBg.hidden) renderPostForm();
}

/* ================= 페이지 전환 (해시 기반) ================= */
const PAGES = ['board', 'post', 'home', 'scan', 'map', 'saved', 'profile'];
let detailId = null;
function showPage(){
  let h = location.hash.replace('#', '');
  if (h === 'reviews') h = 'board';
  if (h === 'more') h = 'profile';
  detailId = h.startsWith('post-') ? h.slice(5) : null;
  if (detailId) h = 'post';
  const page = PAGES.includes(h) ? h : 'board';
  const shown = page === 'scan' ? 'home' : page;
  ['board', 'post', 'home', 'map', 'saved', 'profile'].forEach(p => { $('page-' + p).hidden = p !== shown; });
  const tabPage = page === 'post' ? 'board' : page === 'scan' ? 'home' : page;
  document.querySelectorAll('.tabs a').forEach(a => a.classList.toggle('on', a.dataset.page === tabPage));
  fab.hidden = page !== 'board';
  if (page === 'post') renderPostDetail();
  if (page === 'profile') renderProfile();
  if (page === 'map') {
    renderMap();
    setTimeout(() => { if (exploreMap) exploreMap.invalidateSize(); }, 80);
  }
  if (page === 'scan') setTimeout(() => $('scan').scrollIntoView({behavior: 'smooth'}), 0);
  else window.scrollTo(0, 0);
  if (page === 'saved') renderSaved();
}

/* ================= 스크랩 (게시물 + 동네 장소 + 메뉴 통합 & 검색) ================= */
let scrapTab = 'all';

function renderSaved(){
  const l = dl();
  const q = (($('scrapSearch') && $('scrapSearch').value) || '').trim().toLowerCase();
  if ($('scrapSeg')) {
    $('scrapSeg').querySelectorAll('button[data-scrap-tab]').forEach(b => {
      b.classList.toggle('on', b.dataset.scrapTab === scrapTab);
    });
  }

  const postIds = db.get('gc_scrap_posts', []);
  const placeIds = db.get('gc_scrap_places', []);
  const menuKos = db.get('ggg_saved', []);

  const scrappedPosts = feedPosts.filter(p => postIds.includes(p.id)).filter(p => {
    if (!q) return true;
    const kt = p.id + ':t', kb = p.id + ':b';
    const hay = [
      p.title, p.body, vis(kt, p.title), vis(kb, p.body),
      ...(p.tags || []), ...extractHashtags(p.body), p.nick
    ].join(' ').toLowerCase();
    return hay.includes(q);
  });

  const scrappedPlaces = allPlaces().filter(p => placeIds.includes(p.id)).filter(p => {
    if (!q) return true;
    const rvText = (p.reviews || []).map(r => r.body).join(' ');
    const hay = [p.name, p.addr, p.menuText, rvText, kindLabelOf(p.kind)].join(' ').toLowerCase();
    return hay.includes(q);
  });

  const scrappedMenus = DICT.filter(it => menuKos.includes(it.ko)).filter(it => {
    if (!q) return true;
    const hay = [it.ko, it.rom, Object.values(it.name || {}).join(' '), Object.values(it.desc || {}).join(' ')].join(' ').toLowerCase();
    return hay.includes(q);
  });

  const chunks = [];
  if (scrapTab === 'all' || scrapTab === 'post') {
    scrappedPosts.forEach(p => {
      chunks.push(`<div><span class="scrap-badge">📋 ${esc(t('scrapTabPost'))}</span>${postCard(p, l, false)}</div>`);
    });
  }
  if (scrapTab === 'all' || scrapTab === 'place') {
    scrappedPlaces.forEach(p => {
      chunks.push(`<div><span class="scrap-badge">📍 ${esc(t('scrapTabPlace'))}</span>${placeCard(p, l)}</div>`);
    });
  }
  if (scrapTab === 'all' || scrapTab === 'menu') {
    scrappedMenus.forEach(it => {
      chunks.push(`<div><span class="scrap-badge">🍽️ ${esc(t('scrapTabMenu'))}</span>${menuCard(it, l)}</div>`);
    });
  }

  $('savedList').innerHTML = chunks.length
    ? chunks.join('')
    : `<div class="empty">${esc(t('savedEmpty'))}</div>`;
}

function toggleSave(ko){
  const list = db.get('ggg_saved', []);
  const i = list.indexOf(ko);
  if (i >= 0) list.splice(i, 1); else list.push(ko);
  db.set('ggg_saved', list);
  const on = list.includes(ko);
  toast(on ? t('scrapAdded') : t('scrapRemoved'));
  document.querySelectorAll('[data-save]').forEach(b => {
    if (b.dataset.save === ko) {
      b.textContent = on ? t('savedBtn') : t('saveBtn');
      b.classList.toggle('on', on);
    }
  });
  if (location.hash === '#saved') renderSaved();
}
window.addEventListener('hashchange', showPage);

function setProgress(p, text){
  progressWrap.hidden = false;
  progressBar.style.width = `${Math.round((p || 0) * 100)}%`;
  progressText.textContent = text;
}

/* ================= 이벤트 등록 ================= */

avoidBox.addEventListener('change', e => {
  const cb = e.target;
  if (cb.type !== 'checkbox') return;
  if (cb.checked) avoided.add(cb.value); else avoided.delete(cb.value);
  db.set('ggg_avoid', [...avoided]);
  if (lastItems !== null) showResults(lastItems);
  toast(cb.checked ? t('toastAvoidOn', cb.value) : t('toastAvoidOff', cb.value));
});

$('searchForm').addEventListener('submit', e => {
  e.preventDefault();
  runSearch(searchInput.value);
});

$('ctaBtn').addEventListener('click', () => $('scan').scrollIntoView({behavior:'smooth'}));

async function runOcrAndMatch(){
  if (!currentFile) { toast(t('toastNoFile')); return; }
  if (typeof Tesseract === 'undefined') { toast(t('toastNoTess')); return; }
  ocrBtn.disabled = true;
  setProgress(0.02, t('prep'));
  let worker = null;
  try {
    worker = await Tesseract.createWorker('kor+eng', 1, {
      logger: m => {
        if (m.status === 'recognizing text') setProgress(m.progress, t('reading'));
        else setProgress(0.05, t('prep'));
      }
    });
    const { data } = await worker.recognize(currentFile);
    const recognized = (data.text || '').trim();
    const extra = ocrText.value.trim();
    ocrText.value = [recognized, extra && extra !== recognized ? extra : ''].filter(Boolean).join('\n');
    if (ocrText.value) {
      toast(t('toastOcrOk'));
      runMatch();
    } else {
      toast(t('toastOcrEmpty'));
    }
  } catch (err) {
    toast(t('toastOcrErr'));
  } finally {
    if (worker) { try { await worker.terminate(); } catch (_) {} }
    ocrBtn.disabled = false;
    progressWrap.hidden = true;
    progressText.textContent = '';
  }
}

photoInput.addEventListener('change', e => {
  const f = e.target.files && e.target.files[0];
  if (!f) return;
  currentFile = f;
  preview.src = URL.createObjectURL(f);
  previewWrap.hidden = false;
  fileName.textContent = f.name;
  ocrBtn.disabled = false;
  toast(t('toastPhotoOk'));
  runOcrAndMatch();
});

ocrBtn.addEventListener('click', runOcrAndMatch);

const SAMPLE_TEXT = `김치찌개 9,000
된장찌개 8,000
삼겹살 (1인분) 13,000
냉면 9,000
떡볶이 5,000
아메리카노 4,000`;

if ($('sampleBtn')) {
  $('sampleBtn').addEventListener('click', () => {
    ocrText.value = SAMPLE_TEXT;
    runMatch();
  });
}
$('matchBtn').addEventListener('click', () => {
  if (ocrText.value.trim()) runMatch();
  else if (currentFile) runOcrAndMatch();
  else photoInput.click();
});

// 동네 탐방 (반경 선택 · 장소 검색 · 별점 · 사진 · 후기 저장 · 중복 병합)
areaSel.addEventListener('change', () => {
  mapState.radius = areaSel.value;
  const radObj = RADIUS_LIST.find(r => r.id === mapState.radius);
  if (exploreMap && radObj) exploreMap.setView([CAMPUS_CENTER.lat, CAMPUS_CENTER.lng], radObj.zoom);
  renderMap();
});

addKind.addEventListener('change', () => {
  if ($('addMenuWrap')) $('addMenuWrap').hidden = addKind.value !== 'food';
});

addToggle.addEventListener('click', () => {
  addForm.hidden = !addForm.hidden;
  renderMap();
  if (!addForm.hidden) setTimeout(() => addForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
});

if ($('mapSearchBtn')) {
  $('mapSearchBtn').addEventListener('click', searchPlaceOnMap);
}
if ($('mapSearchInput')) {
  $('mapSearchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); searchPlaceOnMap(); }
  });
}

if ($('starPicker')) {
  $('starPicker').addEventListener('click', e => {
    const b = e.target.closest('button[data-star]');
    if (!b) return;
    addRating = Number(b.dataset.star) || 5;
    renderStarPicker();
  });
}

if ($('addPhotos')) {
  $('addPhotos').addEventListener('change', async e => {
    const files = [...(e.target.files || [])];
    for (const f of files) {
      if (pendingPlacePhotos.length >= 3) { toast(t('fPhotoLimit')); break; }
      try { pendingPlacePhotos.push(await compressImage(f)); }
      catch (_) { toast(t('fSaveFail')); }
    }
    $('addPhotos').value = '';
    renderAddPhotoThumbs();
  });
}

addName.addEventListener('input', () => {
  const match = allPlaces().find(p => p.name.trim().toLowerCase() === addName.value.trim().toLowerCase());
  if (match) {
    addKind.value = match.kind || 'food';
    if (match.addr && !addAddr.value) addAddr.value = match.addr;
    if (match.lat && match.lng) setPickedLocation(match.lat, match.lng, match.name, match.addr, match.kind);
    if ($('addMenuWrap')) $('addMenuWrap').hidden = addKind.value !== 'food';
  }
});

addForm.addEventListener('submit', async e => {
  e.preventDefault();
  const name = addName.value.trim();
  const reviewBody = ($('addReview') ? $('addReview').value : '').trim();
  if (!name) { toast(t('toastPlaceNeed')); return; }
  if (!reviewBody) { toast(t('fNeedBody')); return; }

  const norm = s => String(s || '').trim().toLowerCase().replace(/\s+/g, '');
  const existing = explorePlaces.find(p => norm(p.name) === norm(name));

  const review = {
    id: 'rv-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    nick: profile.nick,
    country: profile.nat,
    srcLang: profile.lang,
    avatar: profile.avatar || '',
    verifyType: profile.verifyType || '',
    verifySchool: profile.verifySchool || '',
    verifyCountry: profile.verifyCountry || '',
    stars: addRating,
    body: reviewBody,
    photos: pendingPlacePhotos.slice(),
    createdAt: new Date().toISOString(),
    authorId: myUid
  };

  const latVal = parseFloat($('addLat').value) || (existing ? existing.lat : (CAMPUS_CENTER.lat + (Math.random() - 0.5) * 0.006));
  const lngVal = parseFloat($('addLng').value) || (existing ? existing.lng : (CAMPUS_CENTER.lng + (Math.random() - 0.5) * 0.006));

  let targetPlace;
  if (existing) {
    existing.reviews = [review, ...(existing.reviews || [])];
    if (addAddr.value.trim()) existing.addr = addAddr.value.trim();
    if (addMenu.value.trim()) existing.menuText = [existing.menuText, addMenu.value.trim()].filter(Boolean).join('\n');
    targetPlace = existing;
  } else {
    targetPlace = {
      id: 'pl-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      kind: addKind.value || 'food',
      name,
      addr: addAddr.value.trim() || '경남 진주시 가좌동 부근',
      lat: latVal,
      lng: lngVal,
      menuText: addMenu.value.trim(),
      seed: false,
      reviews: [review]
    };
    explorePlaces.unshift(targetPlace);
  }

  // 새로 추가한 장소가 현재 반경 밖에 있으면 반경을 자동으로 넓혀서 바로 보이게 처리
  const distKm = haversineKm(CAMPUS_CENTER.lat, CAMPUS_CENTER.lng, Number(targetPlace.lat), Number(targetPlace.lng));
  const curRad = RADIUS_LIST.find(r => r.id === mapState.radius) || RADIUS_LIST[0];
  if (distKm > curRad.km) {
    const fit = RADIUS_LIST.find(r => distKm <= r.km) || RADIUS_LIST[RADIUS_LIST.length - 1];
    mapState.radius = fit.id;
  }

  db.set('gc_places_v2', explorePlaces);
  try {
    const r = await fetch('/api/places', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add_or_review', place: targetPlace, review })
    });
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data.places)) {
        explorePlaces = data.places;
        db.set('gc_places_v2', explorePlaces);
      }
    }
  } catch (_) {}

  addName.value = '';
  addAddr.value = '';
  addMenu.value = '';
  if ($('addReview')) $('addReview').value = '';
  if ($('mapSearchInput')) $('mapSearchInput').value = '';
  if ($('mapSearchResults')) $('mapSearchResults').hidden = true;
  if ($('selectedPlaceBadge')) $('selectedPlaceBadge').hidden = true;
  $('addLat').value = '';
  $('addLng').value = '';
  addRating = 5;
  pendingPlacePhotos = [];
  renderAddPhotoThumbs();
  addForm.hidden = true;
  renderMap();
  toast(t('toastPlaceAdded'));
  translatePending();
});

// 스크랩 검색창
if ($('scrapSearch')) {
  $('scrapSearch').addEventListener('input', () => renderSaved());
}

// 피드: 글쓰기 시트
fab.addEventListener('click', openSheet);
$('sheetClose').addEventListener('click', closeSheet);
sheetBg.addEventListener('click', e => { if (e.target === sheetBg) closeSheet(); });

pPhotos.addEventListener('change', async e => {
  const files = [...(e.target.files || [])];
  for (const f of files) {
    if (pendingPhotos.length >= 3) { toast(t('fPhotoLimit')); break; }
    try { pendingPhotos.push(await compressImage(f)); }
    catch (_) { toast(t('fSaveFail')); }
  }
  pPhotos.value = '';
  renderThumbs();
});

postForm.addEventListener('submit', async e => {
  e.preventDefault();
  const nick = profile.nick;
  const title = pTitle.value.trim();
  const body = pBody.value.trim();
  if (!title) { postMsg.textContent = t('fNeedTitle'); return; }
  if (!body) { postMsg.textContent = t('fNeedBody'); return; }
  const tags = extractHashtags(body);
  const isAnon = $('pAnon').checked;
  const prepVal = ($('pPrep') && $('pPrep').value) ? $('pPrep').value : '';
  const post = {
    id: 'p-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
    nick,
    country: profile.nat,
    anon: isAnon,
    avatar: (!isAnon && profile.avatar) ? profile.avatar : '',
    verifyType: profile.verifyType || '',
    verifySchool: profile.verifySchool || '',
    verifyCountry: profile.verifyCountry || '',
    prepCountry: prepVal,
    comments: [],
    cat: pCat.value || 'free',
    hobby: '',
    reports: [],
    title,
    body,
    tags,
    place: '',
    addr: '',
    favMenu: '',
    photos: pendingPhotos.slice(),
    createdAt: new Date().toISOString(),
    authorId: myUid,
    reacts: {}
  };
  postMsg.textContent = '';
  try {
    await savePost(post);
  } catch (_) {
    postMsg.textContent = t('fSaveFail');
    return;
  }
  pTitle.value = '';
  pBody.value = '';
  pCat.value = 'free';
  if ($('pPrep')) $('pPrep').value = '';
  if (prepVal && feedBoard !== 'P:' + prepVal) {
    feedBoard = 'P:' + prepVal;
    feedMode = 'list';
  }
  pendingPhotos = [];
  renderThumbs();
  closeSheet();
  renderFeed();
  toast(t('fPosted'));
  translatePending();   // 원문 언어 감지 (+ 필요하면 번역)
});

// 피드 정렬 & 추천 반응 & 스크랩 & 지도 상호작용 & 사진 라이트박스 & 사진 제거
document.addEventListener('click', e => {
  const zoomImg = e.target.closest('.post-img, .review-photos img');
  if (zoomImg && zoomImg.src && $('lightboxModal') && $('lightboxImg')) {
    $('lightboxImg').src = zoomImg.src;
    $('lightboxModal').hidden = false;
    $('lightboxModal').setAttribute('aria-hidden', 'false');
    return;
  }
  if (e.target.closest('#lightboxClose') || e.target === $('lightboxModal')) {
    if ($('lightboxModal')) {
      $('lightboxModal').hidden = true;
      $('lightboxModal').setAttribute('aria-hidden', 'true');
    }
    return;
  }
  const el = e.target.closest('[data-q],[data-speak],[data-copy],[data-menu],[data-del],[data-kind],[data-place-sort],[data-sort],[data-react],[data-rmphoto],[data-rmplacephoto],[data-save],[data-scrap-post],[data-scrap-place],[data-scrap-tab],[data-pick-lat],[data-review-place],[data-focus-map],[data-board],[data-cat],[data-report]');
  if (!el) return;
  if (el.dataset.placeSort !== undefined) { placeSort = el.dataset.placeSort; renderMap(); return; }
  if (el.dataset.board !== undefined) { enterBoard(el.dataset.board); return; }
  if (el.dataset.cat !== undefined) { feedCat = el.dataset.cat; renderFeed(); return; }
  if (el.dataset.report !== undefined) { toggleReport(el.dataset.report); return; }
  if (el.dataset.save !== undefined) { toggleSave(el.dataset.save); return; }
  if (el.dataset.scrapPost !== undefined) { toggleScrapPost(el.dataset.scrapPost); return; }
  if (el.dataset.scrapPlace !== undefined) { toggleScrapPlace(el.dataset.scrapPlace); return; }
  if (el.dataset.scrapTab !== undefined) { scrapTab = el.dataset.scrapTab; renderSaved(); return; }
  if (el.dataset.pickLat !== undefined) {
    setPickedLocation(
      parseFloat(el.dataset.pickLat),
      parseFloat(el.dataset.pickLng),
      el.dataset.pickName || '',
      el.dataset.pickAddr || '',
      el.dataset.pickKind || ''
    );
    if ($('mapSearchResults')) $('mapSearchResults').hidden = true;
    return;
  }
  if (el.dataset.reviewPlace !== undefined) {
    const p = allPlaces().find(x => x.id === el.dataset.reviewPlace);
    if (p) {
      addForm.hidden = false;
      addName.value = p.name;
      addKind.value = p.kind || 'food';
      addAddr.value = p.addr || '';
      if (p.lat && p.lng) setPickedLocation(p.lat, p.lng, p.name, p.addr, p.kind);
      renderMap();
      setTimeout(() => {
        addForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if ($('addReview')) $('addReview').focus();
      }, 60);
    }
    return;
  }
  if (el.dataset.focusMap !== undefined) {
    const p = allPlaces().find(x => x.id === el.dataset.focusMap);
    if (p && p.lat && p.lng && exploreMap) {
      exploreMap.setView([Number(p.lat), Number(p.lng)], 16);
      $('exploreMap').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }
  if (el.dataset.q !== undefined) runSearch(el.dataset.q);
  else if (el.dataset.speak !== undefined) speak(el.dataset.speak);
  else if (el.dataset.copy !== undefined) copyText(el.dataset.copy);
  else if (el.dataset.menu !== undefined) {
    const id = el.dataset.menu;
    if (mapState.open.has(id)) mapState.open.delete(id); else mapState.open.add(id);
    renderMap();
  }
  else if (el.dataset.kind !== undefined) { mapState.kind = el.dataset.kind; renderMap(); }
  else if (el.dataset.sort !== undefined) { feedSort = el.dataset.sort; renderFeed(); }
  else if (el.dataset.react !== undefined) toggleReact(el.dataset.react, el.dataset.emoji);
  else if (el.dataset.rmphoto !== undefined) {
    pendingPhotos.splice(Number(el.dataset.rmphoto), 1);
    renderThumbs();
  }
  else if (el.dataset.rmplacephoto !== undefined) {
    pendingPlacePhotos.splice(Number(el.dataset.rmplacephoto), 1);
    renderAddPhotoThumbs();
  }
});

faqBox.addEventListener('click', e => {
  const b = e.target.closest('.faq-q');
  if (!b) return;
  const open = b.getAttribute('aria-expanded') === 'true';
  b.setAttribute('aria-expanded', String(!open));
  $(b.getAttribute('aria-controls')).hidden = open;
});

/* =====================================================================
   다국어 커뮤니티 확장: Gemini 번역 · 국적 설정 · 게시글 상세/댓글
   ===================================================================== */
let api = {checked:false, server:false, hasKey:false, model:''};
let TR = db.get('gc_tr_v1', {});                 // {key: {src, tr:{lang:text}}}
const pending = new Set(), failed = new Set(), showOrig = new Set(), fresh = new Set();

/* ---------- 작은 도우미 ---------- */
function relTime(iso){
  const ts = Date.parse(iso || ''); if (!ts) return '';
  const m = Math.round((Date.now() - ts) / 60000);
  try {
    const f = new Intl.RelativeTimeFormat(lang(), {numeric:'auto', style:'short'});
    if (m < 1) return f.format(0, 'minute');
    if (m < 60) return f.format(-m, 'minute');
    if (m < 1440) return f.format(-Math.round(m / 60), 'hour');
    if (m < 10080) return f.format(-Math.round(m / 1440), 'day');
  } catch (_) {}
  return String(iso).slice(0, 10);
}
const authorName = p => p.anon ? t('anon') : (p.nick || t('anon'));
function boardTitle(code){
  if (code === 'all') return t('boardUnion');
  if (code.startsWith('P:')) { const b = PREP_BOARDS.find(x => x.code === code.slice(2)); return b ? `${b.flag} ${t(b.key)}` : ''; }
  if (code.startsWith('H:')) { const h = HOBBIES.find(x => x.code === code.slice(2)); return h ? t(h.key) : ''; }
  return countryName(COUNTRIES.find(c => c.code === code));
}
const normLang = c => String(c || '').toLowerCase().split(/[-_]/)[0];

/* ---------- 번역 단위 (게시글 · 댓글 · 동네 장소 후기) ---------- */
function unitsOf(p){
  const out = [[p.id + ':t', p.title, p.srcLang], [p.id + ':b', p.body, p.srcLang]];
  for (const c of (p.comments || [])) out.push([p.id + ':' + c.id, c.body, c.srcLang]);
  return out;
}
function rec(key, src){ return TR[key] || (TR[key] = {src: src || null, tr:{}}); }
function isTrKey(key){ const r = TR[key]; return !!(r && r.src && r.src !== lang() && r.tr[lang()]); }
function vis(key, text, orig){ return (!orig && isTrKey(key)) ? TR[key].tr[lang()] : text; }
function unitCls(keys){ return (keys.some(k => pending.has(k)) ? 'loading' : '') + (keys.some(k => fresh.has(k)) ? ' fresh' : ''); }
function trBadge(keys, toggleKey){
  if (keys.some(k => pending.has(k)))
    return `<div class="trline"><span class="trpill">✨ <span class="shimmer">${esc(t('translating'))}</span></span></div>`;
  const k = keys.find(isTrKey);
  if (k) {
    const o = showOrig.has(toggleKey);
    return `<div class="trline"><span class="trpill">✨ ${esc(t('trFrom').replace('{lang}', langName(TR[k].src)))}</span><a data-tr-toggle="${esc(toggleKey)}">${esc(o ? t('showTr') : t('showOrig'))}</a></div>`;
  }
  if (keys.some(k => failed.has(k + '|' + lang())))
    return `<div class="trline err">⚠ ${esc(t('trFailed'))} · <a data-tr-retry>${esc(t('retry'))}</a></div>`;
  return '';
}

/* ---------- Gemini 호출 ---------- */
async function callTranslate(target, items){
  const r = await fetch('/api/translate', {method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({target, items})});
  const data = await r.json();
  if (!r.ok) throw new Error(data.error || ('HTTP ' + r.status));
  return data.items || [];
}
async function inChunks(target, items, size){
  const chunks = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return (await Promise.all(chunks.map(ch => callTranslate(target, ch)))).flat();
}

/* ---------- 게시글·댓글·장소후기 번역 ---------- */
let trBusy = false, trAgain = false;
async function translatePending(){
  if (!api.hasKey) return;
  if (trBusy) { trAgain = true; return; }
  const target = lang();
  const need = [];
  for (const p of feedPosts) for (const [k, text, src] of unitsOf(p)) {
    const r = rec(k, src);
    if (r.src !== target && !r.tr[target] && !failed.has(k + '|' + target)) need.push([k, text]);
  }
  for (const pl of allPlaces()) for (const [k, text, src] of placeUnitsOf(pl)) {
    const r = rec(k, src);
    if (r.src !== target && !r.tr[target] && !failed.has(k + '|' + target)) need.push([k, text]);
  }
  if (!need.length) return;
  trBusy = true;
  need.forEach(([k]) => pending.add(k));
  renderFeed();
  renderMap();
  try {
    const res = await inChunks(target, need.map(([k, text]) => ({id:k, text})), 100);
    const map = new Map(res.map(i => [String(i.id), i]));
    for (const [k] of need) {
      const it = map.get(k), r = TR[k];
      if (!it) { failed.add(k + '|' + target); continue; }
      if (!r.src) r.src = normLang(it.sourceLang) || target;   // 새 글·댓글·후기: 원문 언어 감지
      if (r.src === target) continue;
      r.tr[target] = it.translation;
      fresh.add(k);
    }
  } catch (e) {
    need.forEach(([k]) => failed.add(k + '|' + target));
    toast(t('trFailed') + ' — ' + e.message);
  } finally {
    need.forEach(([k]) => pending.delete(k));
    trBusy = false;
    db.set('gc_tr_v1', TR);
    renderFeed();
    renderMap();
    if (location.hash === '#saved') renderSaved();
    setTimeout(() => fresh.clear(), 900);
    if (trAgain) { trAgain = false; translatePending(); }
  }
}

/* ---------- 화면 문구 번역 (기본 12개 언어는 내장 디폴트 사전 사용 → API 토큰 절약) ---------- */
function mergeCachedUI(l){
  if (DATA_LANGS.includes(l)) return;
  const cached = db.get('gc_ui_' + l, null);
  if (cached) I18N[l] = Object.assign({}, cached, I18N[l] || {});
}
async function ensureUI(l){
  // 사용자가 작성한 게시글·댓글 외의 기본 UI 문구는 내장 사전을 사용하여 매번 Gemini API를 호출하지 않습니다.
  if (DATA_LANGS.includes(l) || !api.hasKey) return false;
  mergeCachedUI(l);
  const cur = I18N[l] || {};
  const items = Object.entries(I18N.en)
    .filter(([k, v]) => typeof v === 'string' && v && cur[k] === undefined)
    .map(([k, v]) => ({id:k, text:v}));
  const needFaq = !cur.faq;
  if (needFaq) I18N.en.faq.forEach((f, i) => items.push({id:`faq.${i}.q`, text:f.q}, {id:`faq.${i}.a`, text:f.a}));
  if (!items.length) return false;
  toast(t('uiTranslating'));
  try {
    const res = await inChunks(l, items, 300);   // 한 번의 요청으로 (무료 키 분당 5회 제한)
    const auto = db.get('gc_ui_' + l, {}) || {};
    const faq = needFaq ? I18N.en.faq.map(f => ({...f})) : null;
    for (const it of res) {
      const id = String(it.id), m = id.match(/^faq\.(\d+)\.(q|a)$/);
      if (m) { if (faq && faq[+m[1]]) faq[+m[1]][m[2]] = it.translation; }
      else auto[id] = it.translation;
    }
    if (faq) auto.faq = faq;
    db.set('gc_ui_' + l, auto);
    I18N[l] = Object.assign({}, auto, I18N[l] || {});
    return true;
  } catch (e) { toast(t('trFailed') + ' — ' + e.message); return false; }
}

/* ---------- 상단 · 내 정보 (기본 프로필 로고 · 인증 뱃지 · 국가별 유학 준비 게시판) ---------- */
const I18N_AVATAR = {
  ko:{
    profPhotoEdit:'프로필 사진 변경', profPhotoReset:'기본 로고로', profPhotoSaved:'프로필 사진이 변경되었어요.', profPhotoResetMsg:'기본 프로필 로고로 변경되었어요.',
    sortLabel:'정렬:', sortDist:'가까운 순', sortStars:'별점 높은 순', sortReviews:'후기 많은 순',
    prepSectionTitle:'✈️ 유학 준비 게시판', prepKR:'한국 유학 준비', prepUS:'미국 유학 준비', prepCN:'중국 유학 준비', prepJP:'일본 유학 준비',
    pPrepLabel:'게시판 구분', pPrepNormal:'일반 캠퍼스 게시판',
    vBadgeEnrolled:'재학 인증', vBadgeAlumni:'유학 선배', vBadgeUnverified:'유학 준비생 (미인증)',
    signupOpenNote:'💡 아직 유학을 오지 않은 유학 준비생도 별도 인증 없이 바로 가입하고 모든 유학 준비 게시판에서 자유롭게 질문·소통할 수 있습니다.',
    verifyTitle:'유학생 · 유학 경험자 인증 뱃지', verifyDesc:'재학 인증을 완료한 유학생이나 이미 유학을 다녀온 선배는 프로필과 게시글·댓글에 인증 뱃지가 작게 표시되어 유학 준비생들에게 신뢰도 높은 조언을 줄 수 있습니다.',
    verifyTypeLabel:'인증 구분', verifyTypeEnrolled:'✓ 재학생 인증 (현재 유학·교환·어학연수 중)', verifyTypeAlumni:'🎓 유학 경험/졸업 인증 (유학 선배 멘토)',
    verifyCountryLabel:'유학 국가', prepCountryKR:'🇰🇷 한국 (Korea)', prepCountryUS:'🇺🇸 미국 (USA)', prepCountryCN:'🇨🇳 중국 (China)', prepCountryJP:'🇯🇵 일본 (Japan)',
    verifySchoolLabel:'대학교 / 기관명', verifySchoolPh:'예: 경상국립대학교, UCLA, 도쿄대 등',
    verifyEmailLabel:'학교 이메일 또는 학생증/졸업증명 번호 (시연용 즉시 인증)', verifyEmailPh:'예: student@gnu.ac.kr 또는 20251234',
    verifySubmit:'✓ 인증 뱃지 적용하기', verifyClear:'미인증(유학 준비생) 상태로 전환',
    verifyDoneMsg:'인증 뱃지가 프로필에 적용되었어요!', verifyClearedMsg:'미인증(유학 준비생) 상태로 전환되었어요.'
  },
  en:{
    profPhotoEdit:'Change photo', profPhotoReset:'Default logo', profPhotoSaved:'Profile photo updated.', profPhotoResetMsg:'Reset to default profile logo.',
    sortLabel:'Sort:', sortDist:'Nearest', sortStars:'Top rated', sortReviews:'Most reviewed',
    prepSectionTitle:'✈️ Study Abroad Prep', prepKR:'Study in Korea', prepUS:'Study in USA', prepCN:'Study in China', prepJP:'Study in Japan',
    pPrepLabel:'Board Type', pPrepNormal:'General Campus Board',
    vBadgeEnrolled:'Verified Student', vBadgeAlumni:'Study Abroad Alumni', vBadgeUnverified:'Prospective Student (Unverified)',
    signupOpenNote:'💡 Prospective students who haven’t gone abroad yet can join freely without verification and ask questions in the Study Abroad Prep boards.',
    verifyTitle:'Student & Alumni Verification Badge', verifyDesc:'Verified current students and study-abroad alumni get a small badge next to their profile to give trusted advice to prospective students.',
    verifyTypeLabel:'Badge Type', verifyTypeEnrolled:'✓ Current International Student', verifyTypeAlumni:'🎓 Study Abroad Alumni / Mentor',
    verifyCountryLabel:'Study Destination', prepCountryKR:'🇰🇷 Korea', prepCountryUS:'🇺🇸 USA', prepCountryCN:'🇨🇳 China', prepCountryJP:'🇯🇵 Japan',
    verifySchoolLabel:'University / Institution', verifySchoolPh:'e.g., Gyeongsang National Univ., UCLA, Univ. of Tokyo',
    verifyEmailLabel:'School Email or Student/Alumni ID (Instant Pilot Verification)', verifyEmailPh:'e.g., student@gnu.ac.kr or 20251234',
    verifySubmit:'✓ Apply Verification Badge', verifyClear:'Switch to Unverified (Prospective Student)',
    verifyDoneMsg:'Verification badge applied to your profile!', verifyClearedMsg:'Switched to Prospective Student (unverified) status.'
  },
  zh:{
    profPhotoEdit:'更换头像', profPhotoReset:'恢复默认图标', profPhotoSaved:'头像已更新。', profPhotoResetMsg:'已恢复默认头像图标。',
    sortLabel:'排序:', sortDist:'距离最近', sortStars:'评分最高', sortReviews:'评价最多',
    prepSectionTitle:'✈️ 留学准备板块', prepKR:'韩国留学准备', prepUS:'美国留学准备', prepCN:'中国留学准备', prepJP:'日本留学准备',
    pPrepLabel:'板块类型', pPrepNormal:'普通校园板块',
    vBadgeEnrolled:'在读认证', vBadgeAlumni:'留学前辈', vBadgeUnverified:'准留学生（未认证）',
    signupOpenNote:'💡 尚未出国的准留学生无需认证即可注册，并在各国留学准备板块自由提问与交流。',
    verifyTitle:'在读留学生 · 留学前辈认证徽章', verifyDesc:'完成在读认证的留学生或已有留学经历的前辈将在个人资料和发帖旁显示小型认证徽章，为准留学生提供可靠建议。',
    verifyTypeLabel:'认证类型', verifyTypeEnrolled:'✓ 在读留学生认证（当前在读/交换/语言进修）', verifyTypeAlumni:'🎓 留学经历/毕业认证（留学前辈导师）',
    verifyCountryLabel:'留学国家', prepCountryKR:'🇰🇷 韩国 (Korea)', prepCountryUS:'🇺🇸 美国 (USA)', prepCountryCN:'🇨🇳 中国 (China)', prepCountryJP:'🇯🇵 日本 (Japan)',
    verifySchoolLabel:'大学 / 机构名称', verifySchoolPh:'例：庆尚国立大学、UCLA、东京大学等',
    verifyEmailLabel:'学校邮箱或学号/毕业证号（演示版即时认证）', verifyEmailPh:'例：student@gnu.ac.kr 或 20251234',
    verifySubmit:'✓ 启用认证徽章', verifyClear:'切换为未认证（准留学生）状态',
    verifyDoneMsg:'认证徽章已应用到您的个人资料！', verifyClearedMsg:'已切换为准留学生（未认证）状态。'
  },
  ja:{
    profPhotoEdit:'プロフィール画像変更', profPhotoReset:'基本ロゴに戻す', profPhotoSaved:'プロフィール画像を変更しました。', profPhotoResetMsg:'基本プロフィールロゴに戻しました。',
    sortLabel:'並び替え:', sortDist:'近い順', sortStars:'評価順', sortReviews:'口コミ順',
    prepSectionTitle:'✈️ 留学準備掲示板', prepKR:'韓国留学準備', prepUS:'アメリカ留学準備', prepCN:'中国留学準備', prepJP:'日本留学準備',
    pPrepLabel:'掲示板区分', pPrepNormal:'一般キャンパス掲示板',
    vBadgeEnrolled:'在学認証', vBadgeAlumni:'留学先輩', vBadgeUnverified:'留学準備生（未認証）',
    signupOpenNote:'💡 まだ留学していない留学準備生も、認証なしで登録して各国別の留学準備掲示板で自由に質問・交流できます。',
    verifyTitle:'留学生・留学経験者 認証バッジ', verifyDesc:'在学認証済みの留学生や留学経験者のプロフィール・投稿には小さな認証バッジが表示され、準備生へ信頼できるアドバイスができます。',
    verifyTypeLabel:'認証区分', verifyTypeEnrolled:'✓ 在学生認証（現在留学・交換・語学研修中）', verifyTypeAlumni:'🎓 留学経験・卒業認証（留学先輩メンター）',
    verifyCountryLabel:'留学国', prepCountryKR:'🇰🇷 韓国 (Korea)', prepCountryUS:'🇺🇸 アメリカ (USA)', prepCountryCN:'🇨🇳 中国 (China)', prepCountryJP:'🇯🇵 日本 (Japan)',
    verifySchoolLabel:'大学・機関名', verifySchoolPh:'例：慶尚国立大学、UCLA、東京大学など',
    verifyEmailLabel:'学校メールまたは学籍番号（デモ用即時認証）', verifyEmailPh:'例：student@gnu.ac.kr または 20251234',
    verifySubmit:'✓ 認証バッジを適用', verifyClear:'未認証（留学準備生）に切り替え',
    verifyDoneMsg:'認証バッジがプロフィールに適用されました！', verifyClearedMsg:'未認証（留学準備生）状態に切り替えました。'
  },
  vi:{
    profPhotoEdit:'Đổi ảnh đại diện', profPhotoReset:'Logo mặc định', profPhotoSaved:'Đã cập nhật ảnh đại diện.', profPhotoResetMsg:'Đã đặt lại logo mặc định.',
    sortLabel:'Sắp xếp:', sortDist:'Gần nhất', sortStars:'Đánh giá cao', sortReviews:'Nhiều review',
    prepSectionTitle:'✈️ Chuẩn bị du học', prepKR:'Chuẩn bị du học Hàn', prepUS:'Chuẩn bị du học Mỹ', prepCN:'Chuẩn bị du học Trung', prepJP:'Chuẩn bị du học Nhật',
    pPrepLabel:'Loại bảng tin', pPrepNormal:'Bảng tin trường chung',
    vBadgeEnrolled:'Đang theo học', vBadgeAlumni:'Cựu du học sinh', vBadgeUnverified:'Chuẩn bị du học',
    signupOpenNote:'💡 Học sinh đang chuẩn bị du học (chưa xuất cảnh) vẫn có thể đăng ký ngay và giao lưu trên các bảng tin chuẩn bị du học.',
    verifyTitle:'Huy hiệu xác thực Du học sinh & Tiền bối', verifyDesc:'Du học sinh đang theo học hoặc cựu du học sinh sẽ có huy hiệu nhỏ bên cạnh tên để tư vấn đáng tin cậy cho các bạn chuẩn bị du học.',
    verifyTypeLabel:'Loại xác thực', verifyTypeEnrolled:'✓ Xác thực đang theo học', verifyTypeAlumni:'🎓 Xác thực cựu du học sinh (Tiền bối)',
    verifyCountryLabel:'Quốc gia du học', prepCountryKR:'🇰🇷 Hàn Quốc', prepCountryUS:'🇺🇸 Hoa Kỳ', prepCountryCN:'🇨🇳 Trung Quốc', prepCountryJP:'🇯🇵 Nhật Bản',
    verifySchoolLabel:'Trường đại học / Cơ sở', verifySchoolPh:'VD: ĐH Quốc gia Gyeongsang, UCLA, ĐH Tokyo',
    verifyEmailLabel:'Email trường hoặc Mã SV (Xác thực ngay bản thử nghiệm)', verifyEmailPh:'VD: student@gnu.ac.kr hoặc 20251234',
    verifySubmit:'✓ Áp dụng huy hiệu', verifyClear:'Chuyển về trạng thái Chuẩn bị du học',
    verifyDoneMsg:'Đã gắn huy hiệu xác thực!', verifyClearedMsg:'Đã chuyển về trạng thái Chuẩn bị du học.'
  },
  mn:{
    profPhotoEdit:'Зураг солих', profPhotoReset:'Үндсэн лого', profPhotoSaved:'Профайл зураг шинэчлэгдлээ.', profPhotoResetMsg:'Үндсэн лого руу буцаалаа.',
    sortLabel:'Эрэмбэ:', sortDist:'Ойр нь', sortStars:'Өндөр үнэлгээтэй', sortReviews:'Олон сэтгэгдэлтэй',
    prepSectionTitle:'✈️ Гадаадад сурах бэлтгэл', prepKR:'Солонгост сурах бэлтгэл', prepUS:'АНУ-д сурах бэлтгэл', prepCN:'Хятадад сурах бэлтгэл', prepJP:'Японд сурах бэлтгэл',
    pPrepLabel:'Самбарын төрөл', pPrepNormal:'Ерөнхий кампус самбар',
    vBadgeEnrolled:'Суралцагч баталгаажсан', vBadgeAlumni:'Төгсөгч зөвлөх', vBadgeUnverified:'Сурахаар бэлтгэж буй',
    signupOpenNote:'💡 Гадаадад хараахан очоогүй сурагчид ч бүртгүүлж, бэлтгэлийн самбарт чөлөөтэй асуулт асууж харилцах боломжтой.',
    verifyTitle:'Оюутан болон Төгсөгчийн баталгаажуулах тэмдэг', verifyDesc:'Баталгаажсан оюутан болон төгсөгчид профайл дээрээ жижиг тэмдэгтэй болж, зөвлөгөө өгөх боломжтой.',
    verifyTypeLabel:'Тэмдгийн төрөл', verifyTypeEnrolled:'✓ Одоо суралцаж буй оюутан', verifyTypeAlumni:'🎓 Суралцаж төгссөн туршлагатай зөвлөх',
    verifyCountryLabel:'Суралцах улс', prepCountryKR:'🇰🇷 Солонгос', prepCountryUS:'🇺🇸 АНУ', prepCountryCN:'🇨🇳 Хятад', prepCountryJP:'🇯🇵 Япон',
    verifySchoolLabel:'Их сургууль / Байгууллага', verifySchoolPh:'Жнь: Gyeongsang National Univ., UCLA',
    verifyEmailLabel:'Сургуулийн имэйл эсвэл оюутны код', verifyEmailPh:'Жнь: student@gnu.ac.kr',
    verifySubmit:'✓ Тэмдэг идэвхжүүлэх', verifyClear:'Баталгаажаагүй төлөвт шилжих',
    verifyDoneMsg:'Баталгаажуулах тэмдэг идэвхжлээ!', verifyClearedMsg:'Сурахаар бэлтгэж буй төлөвт шилжлээ.'
  },
  ru:{
    profPhotoEdit:'Сменить фото', profPhotoReset:'По умолчанию', profPhotoSaved:'Фото профиля обновлено.', profPhotoResetMsg:'Восстановлен стандартный логотип.',
    sortLabel:'Сортировка:', sortDist:'Рядом', sortStars:'По рейтингу', sortReviews:'По отзывам',
    prepSectionTitle:'✈️ Подготовка к учёбе', prepKR:'Учёба в Корее', prepUS:'Учёба в США', prepCN:'Учёба в Китае', prepJP:'Учёба в Японии',
    pPrepLabel:'Раздел форума', pPrepNormal:'Общий кампус-форум',
    vBadgeEnrolled:'Подтверждён', vBadgeAlumni:'Выпускник', vBadgeUnverified:'Абитуриент',
    signupOpenNote:'💡 Будущие студенты, которые ещё не уехали учиться, могут свободно регистрироваться и общаться в разделах подготовки.',
    verifyTitle:'Значок верификации студента / выпускника', verifyDesc:'Подтверждённые студенты и выпускники получают значок рядом с именем, чтобы помогать советами будущим студентам.',
    verifyTypeLabel:'Тип верификации', verifyTypeEnrolled:'✓ Действующий студент по обмену/учёбе', verifyTypeAlumni:'🎓 Опыт учёбы за рубежом / Выпускник',
    verifyCountryLabel:'Страна обучения', prepCountryKR:'🇰🇷 Корея', prepCountryUS:'🇺🇸 США', prepCountryCN:'🇨🇳 Китай', prepCountryJP:'🇯🇵 Япония',
    verifySchoolLabel:'Университет / ВУЗ', verifySchoolPh:'Напр.: Gyeongsang National Univ., UCLA',
    verifyEmailLabel:'Учебный email или студ. билет', verifyEmailPh:'Напр.: student@gnu.ac.kr',
    verifySubmit:'✓ Применить значок', verifyClear:'Переключить на статус абитуриента',
    verifyDoneMsg:'Значок верификации добавлен!', verifyClearedMsg:'Статус переключён на абитуриента.'
  },
  es:{
    profPhotoEdit:'Cambiar foto', profPhotoReset:'Logo por defecto', profPhotoSaved:'Foto de perfil actualizada.', profPhotoResetMsg:'Restaurado al logo por defecto.',
    sortLabel:'Ordenar:', sortDist:'Más cerca', sortStars:'Mejor valorados', sortReviews:'Más reseñas',
    prepSectionTitle:'✈️ Preparación de estudios', prepKR:'Estudiar en Corea', prepUS:'Estudiar en EE. UU.', prepCN:'Estudiar en China', prepJP:'Estudiar en Japón',
    pPrepLabel:'Tipo de foro', pPrepNormal:'Foro general del campus',
    vBadgeEnrolled:'Estudiante verificado', vBadgeAlumni:'Exalumno mentor', vBadgeUnverified:'Futuro estudiante',
    signupOpenNote:'💡 Los futuros estudiantes que aún no han viajado pueden registrarse sin verificación y participar en los foros de preparación.',
    verifyTitle:'Insignia de verificación de estudiante / exalumno', verifyDesc:'Los estudiantes actuales y exalumnos verificados muestran una pequeña insignia para aconsejar a quienes preparan su viaje.',
    verifyTypeLabel:'Tipo de insignia', verifyTypeEnrolled:'✓ Estudiante internacional actual', verifyTypeAlumni:'🎓 Exalumno / Mentor con experiencia',
    verifyCountryLabel:'País de estudio', prepCountryKR:'🇰🇷 Corea', prepCountryUS:'🇺🇸 EE. UU.', prepCountryCN:'🇨🇳 China', prepCountryJP:'🇯🇵 Japón',
    verifySchoolLabel:'Universidad / Institución', verifySchoolPh:'Ej.: Gyeongsang National Univ., UCLA',
    verifyEmailLabel:'Correo universitario o ID de estudiante', verifyEmailPh:'Ej.: student@gnu.ac.kr',
    verifySubmit:'✓ Activar insignia', verifyClear:'Cambiar a futuro estudiante (sin verificar)',
    verifyDoneMsg:'¡Insignia de verificación activada!', verifyClearedMsg:'Cambiado a futuro estudiante.'
  },
  fr:{
    profPhotoEdit:'Changer la photo', profPhotoReset:'Logo par défaut', profPhotoSaved:'Photo de profil mise à jour.', profPhotoResetMsg:'Logo par défaut restauré.',
    sortLabel:'Trier :', sortDist:'Plus proche', sortStars:'Mieux notés', sortReviews:'Plus d’avis',
    prepSectionTitle:'✈️ Préparation aux études', prepKR:'Étudier en Corée', prepUS:'Étudier aux USA', prepCN:'Étudier en Chine', prepJP:'Étudier au Japon',
    pPrepLabel:'Type de forum', pPrepNormal:'Forum général du campus',
    vBadgeEnrolled:'Étudiant vérifié', vBadgeAlumni:'Ancien étudiant', vBadgeUnverified:'Futur étudiant',
    signupOpenNote:'💡 Les futurs étudiants qui ne sont pas encore partis peuvent s’inscrire librement et échanger dans les forums de préparation.',
    verifyTitle:'Badge de vérification étudiant / ancien', verifyDesc:'Les étudiants inscrits et anciens vérifiés disposent d’un petit badge pour conseiller les futurs étudiants.',
    verifyTypeLabel:'Type de badge', verifyTypeEnrolled:'✓ Étudiant international actuel', verifyTypeAlumni:'🎓 Ancien étudiant / Mentor',
    verifyCountryLabel:'Pays d’études', prepCountryKR:'🇰🇷 Corée', prepCountryUS:'🇺🇸 États-Unis', prepCountryCN:'🇨🇳 Chine', prepCountryJP:'🇯🇵 Japon',
    verifySchoolLabel:'Université / Établissement', verifySchoolPh:'Ex. : Gyeongsang National Univ., UCLA',
    verifyEmailLabel:'Email universitaire ou N° étudiant', verifyEmailPh:'Ex. : student@gnu.ac.kr',
    verifySubmit:'✓ Appliquer le badge', verifyClear:'Passer en statut non vérifié',
    verifyDoneMsg:'Badge de vérification appliqué !', verifyClearedMsg:'Statut changé en futur étudiant.'
  },
  th:{
    profPhotoEdit:'เปลี่ยนรูปโปรไฟล์', profPhotoReset:'โลโก้เริ่มต้น', profPhotoSaved:'อัปเดตรูปโปรไฟล์แล้ว', profPhotoResetMsg:'รีเซ็ตเป็นโลโก้เริ่มต้นแล้ว',
    sortLabel:'เรียงตาม:', sortDist:'ใกล้ที่สุด', sortStars:'คะแนนสูงสุด', sortReviews:'รีวิวมากสุด',
    prepSectionTitle:'✈️ เตรียมตัวเรียนต่อ', prepKR:'เตรียมเรียนต่อเกาหลี', prepUS:'เตรียมเรียนต่ออเมริกา', prepCN:'เตรียมเรียนต่อจีน', prepJP:'เตรียมเรียนต่อญี่ปุ่น',
    pPrepLabel:'ประเภทบอร์ด', pPrepNormal:'บอร์ดแคมปัสทั่วไป',
    vBadgeEnrolled:'ยืนยันนักศึกษาแล้ว', vBadgeAlumni:'รุ่นพี่ศิษย์เก่า', vBadgeUnverified:'ผู้เตรียมเรียนต่อ',
    signupOpenNote:'💡 นักเรียนที่ยังไม่ได้เดินทางไปเรียนต่อสามารถสมัครและพูดคุยในบอร์ดเตรียมตัวเรียนต่อได้ทันทีโดยไม่ต้องยืนยันตัวตน',
    verifyTitle:'ตรายืนยันนักศึกษาและรุ่นพี่ศิษย์เก่า', verifyDesc:'นักศึกษาปัจจุบันและรุ่นพี่ที่เคยไปเรียนต่อจะมีตราเล็กๆ แสดงหน้าโปรไฟล์เพื่อให้คำแนะนำที่น่าเชื่อถือ',
    verifyTypeLabel:'ประเภทการยืนยัน', verifyTypeEnrolled:'✓ นักศึกษาปัจจุบัน', verifyTypeAlumni:'🎓 รุ่นพี่ศิษย์เก่า / ผู้มีประสบการณ์',
    verifyCountryLabel:'ประเทศที่เรียน', prepCountryKR:'🇰🇷 เกาหลี', prepCountryUS:'🇺🇸 สหรัฐอเมริกา', prepCountryCN:'🇨🇳 จีน', prepCountryJP:'🇯🇵 ญี่ปุ่น',
    verifySchoolLabel:'มหาวิทยาลัย / สถาบัน', verifySchoolPh:'เช่น Gyeongsang National Univ., UCLA',
    verifyEmailLabel:'อีเมลสถาบันหรือรหัสนักศึกษา', verifyEmailPh:'เช่น student@gnu.ac.kr',
    verifySubmit:'✓ เปิดใช้ตรายืนยัน', verifyClear:'สลับเป็นสถานะผู้เตรียมเรียนต่อ',
    verifyDoneMsg:'เปิดใช้ตรายืนยันเรียบร้อยแล้ว!', verifyClearedMsg:'สลับเป็นสถานะผู้เตรียมเรียนต่อแล้ว'
  },
  id:{
    profPhotoEdit:'Ubah foto profil', profPhotoReset:'Logo bawaan', profPhotoSaved:'Foto profil diperbarui.', profPhotoResetMsg:'Dikembalikan ke logo bawaan.',
    sortLabel:'Urutkan:', sortDist:'Terdekat', sortStars:'Rating tertinggi', sortReviews:'Ulasan terbanyak',
    prepSectionTitle:'✈️ Persiapan Studi', prepKR:'Persiapan ke Korea', prepUS:'Persiapan ke AS', prepCN:'Persiapan ke Tiongkok', prepJP:'Persiapan ke Jepang',
    pPrepLabel:'Jenis Forum', pPrepNormal:'Forum Kampus Umum',
    vBadgeEnrolled:'Mahasiswa Terverifikasi', vBadgeAlumni:'Alumni Studi', vBadgeUnverified:'Calon Mahasiswa',
    signupOpenNote:'💡 Calon mahasiswa yang belum berangkat tetap bisa mendaftar tanpa verifikasi dan berdiskusi di forum persiapan studi.',
    verifyTitle:'Lencana Verifikasi Mahasiswa & Alumni', verifyDesc:'Mahasiswa aktif dan alumni studi luar negeri mendapat lencana kecil di profil untuk memberi saran terpercaya.',
    verifyTypeLabel:'Jenis Lencana', verifyTypeEnrolled:'✓ Mahasiswa Aktif Saat Ini', verifyTypeAlumni:'🎓 Alumni / Mentor Berpengalaman',
    verifyCountryLabel:'Negara Studi', prepCountryKR:'🇰🇷 Korea', prepCountryUS:'🇺🇸 AS', prepCountryCN:'🇨🇳 Tiongkok', prepCountryJP:'🇯🇵 Jepang',
    verifySchoolLabel:'Universitas / Institusi', verifySchoolPh:'Mis: Gyeongsang National Univ., UCLA',
    verifyEmailLabel:'Email Kampus atau Nomor Mahasiswa', verifyEmailPh:'Mis: student@gnu.ac.kr',
    verifySubmit:'✓ Terapkan Lencana', verifyClear:'Ubah ke Calon Mahasiswa (Belum Verifikasi)',
    verifyDoneMsg:'Lencana verifikasi diterapkan!', verifyClearedMsg:'Diubah ke status calon mahasiswa.'
  },
  uz:{
    profPhotoEdit:'Rasmni o‘zgartirish', profPhotoReset:'Standart logo', profPhotoSaved:'Profil rasmi yangilandi.', profPhotoResetMsg:'Standart logotip tiklandi.',
    sortLabel:'Saralash:', sortDist:'Eng yaqin', sortStars:'Yuqori baho', sortReviews:'Ko‘p sharh',
    prepSectionTitle:'✈️ O‘qishga tayyorgarlik', prepKR:'Koreyada o‘qish', prepUS:'AQSHda o‘qish', prepCN:'Xitoyda o‘qish', prepJP:'Yaponiyada o‘qish',
    pPrepLabel:'Bo‘lim turi', pPrepNormal:'Umumiy kampus bo‘limi',
    vBadgeEnrolled:'Tasdiqlangan talaba', vBadgeAlumni:'Bitiruvchi mentor', vBadgeUnverified:'Abituriyent',
    signupOpenNote:'💡 Hali chet elga ketmagan abituriyentlar ham tasdiqlashsiz ro‘yxatdan o‘tib, tayyorgarlik bo‘limlarida savol berishlari mumkin.',
    verifyTitle:'Talaba va bitiruvchi tasdiqlash nishoni', verifyDesc:'Tasdiqlangan talabalar va bitiruvchilar profilida kichik nishon ko‘rsatilib, abituriyentlarga ishonchli maslahat bera oladilar.',
    verifyTypeLabel:'Nishon turi', verifyTypeEnrolled:'✓ Hozirgi talaba', verifyTypeAlumni:'🎓 Chet elda o‘qigan bitiruvchi / Mentor',
    verifyCountryLabel:'O‘qish davlati', prepCountryKR:'🇰🇷 Koreya', prepCountryUS:'🇺🇸 AQSH', prepCountryCN:'🇨🇳 Xitoy', prepCountryJP:'🇯🇵 Yaponiya',
    verifySchoolLabel:'Universitet / Muassasa', verifySchoolPh:'Masalan: Gyeongsang National Univ., UCLA',
    verifyEmailLabel:'Universitet emaili yoki talaba ID', verifyEmailPh:'Masalan: student@gnu.ac.kr',
    verifySubmit:'✓ Nishonni faollashtirish', verifyClear:'Tasdiqlanmagan (abituriyent) holatiga o‘tish',
    verifyDoneMsg:'Tasdiqlash nishoni qo‘shildi!', verifyClearedMsg:'Abituriyent holatiga o‘tkazildi.'
  }
};
for (const [l, pack] of Object.entries(I18N_AVATAR)) {
  if (I18N[l]) Object.assign(I18N[l], pack);
}

function compressAvatar(file){
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const size = 180;
      const c = document.createElement('canvas');
      c.width = size;
      c.height = size;
      const ctx = c.getContext('2d');
      const minSide = Math.min(img.width, img.height);
      const sx = (img.width - minSide) / 2;
      const sy = (img.height - minSide) / 2;
      ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
      URL.revokeObjectURL(url);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('avatar')); };
    img.src = url;
  });
}

function renderTop(){
  const v = getVerifyInfo(null);
  $('natPill').textContent = `${profile.nat} · ${langName(profile.lang, profile.lang)}${v ? ' ' + v.icon : ''}`;
  const topImg = $('topAvatarImg');
  if (topImg) topImg.src = profile.avatar || DEFAULT_AVATAR;
  const topBadge = $('topAvatarBadge');
  if (topBadge) {
    if (v) {
      topBadge.hidden = false;
      topBadge.className = `av-vbadge ${v.cls}`;
      topBadge.textContent = v.icon;
      topBadge.title = v.title;
    } else {
      topBadge.hidden = true;
    }
  }
}
function renderProfile(){
  const me = COUNTRIES.find(c => c.code === profile.nat);
  const profImg = $('profAvImg');
  if (profImg) profImg.src = profile.avatar || DEFAULT_AVATAR;
  if ($('fAvatarReset')) $('fAvatarReset').hidden = !profile.avatar;
  const v = getVerifyInfo(null);
  const profBadge = $('profAvBadge');
  if (profBadge) {
    if (v) {
      profBadge.hidden = false;
      profBadge.className = `av-vbadge lg ${v.cls}`;
      profBadge.textContent = v.icon;
      profBadge.title = v.title;
    } else {
      profBadge.hidden = true;
    }
  }
  const profPill = $('profVerifyPill');
  if (profPill) {
    if (v) {
      profPill.hidden = false;
      profPill.className = `v-pill ${v.cls}`;
      profPill.textContent = `${v.icon} ${v.label}${v.school ? ' · ' + v.school : ''}`;
    } else {
      profPill.hidden = false;
      profPill.className = 'v-pill';
      profPill.style.background = '#f1f5f9';
      profPill.style.color = '#475569';
      profPill.style.borderColor = '#cbd5e1';
      profPill.textContent = `🌱 ${t('vBadgeUnverified')}`;
    }
  }
  const chip = $('verifyStatusChip');
  if (chip) {
    if (v) {
      chip.className = `v-status-chip ${v.cls}`;
      chip.textContent = `${v.icon} ${v.label}`;
    } else {
      chip.className = 'v-status-chip unverified';
      chip.textContent = t('vBadgeUnverified');
    }
  }
  if ($('verifyClearBtn')) $('verifyClearBtn').hidden = !v;
  if ($('vType') && profile.verifyType) $('vType').value = profile.verifyType;
  if ($('vCountry') && profile.verifyCountry) $('vCountry').value = profile.verifyCountry;
  if ($('vSchool') && document.activeElement !== $('vSchool')) $('vSchool').value = profile.verifySchool || '';
  if ($('vProof') && document.activeElement !== $('vProof')) $('vProof').value = profile.verifyProof || '';

  $('profName').textContent = profile.nick;
  const schoolText = profile.verifySchool || t('schoolName');
  $('profMeta').textContent = `${schoolText} · ${countryName(me)} · ${langName(profile.lang)}`;
  if (document.activeElement !== $('fNick')) $('fNick').value = profile.nick;
  $('fNat').innerHTML = NATIONS.map(n =>
    `<option value="${n.code}" ${n.code === profile.nat ? 'selected' : ''}>${n.code} · ${esc(regionName(n.code))} — ${esc(langName(n.lang, n.lang))}</option>`).join('');
}
if ($('verifyForm')) {
  $('verifyForm').addEventListener('submit', e => {
    e.preventDefault();
    profile.verifyType = ($('vType') && $('vType').value) || 'enrolled';
    profile.verifyCountry = ($('vCountry') && $('vCountry').value) || 'KR';
    profile.verifySchool = ($('vSchool') && $('vSchool').value.trim()) || t('schoolName');
    profile.verifyProof = ($('vProof') && $('vProof').value.trim()) || '';
    db.set('gc_profile', profile);
    renderAll();
    toast(t('verifyDoneMsg'));
  });
}
if ($('verifyClearBtn')) {
  $('verifyClearBtn').addEventListener('click', () => {
    profile.verifyType = '';
    profile.verifySchool = '';
    profile.verifyProof = '';
    db.set('gc_profile', profile);
    renderAll();
    toast(t('verifyClearedMsg'));
  });
}
if ($('profAv')) {
  $('profAv').addEventListener('click', () => {
    if ($('fAvatarInput')) $('fAvatarInput').click();
  });
}
if ($('fAvatarInput')) {
  $('fAvatarInput').addEventListener('change', async e => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    try {
      profile.avatar = await compressAvatar(f);
      db.set('gc_profile', profile);
      renderAll();
      toast(t('profPhotoSaved'));
    } catch (_) {
      toast(t('fSaveFail'));
    }
    $('fAvatarInput').value = '';
  });
}
if ($('fAvatarReset')) {
  $('fAvatarReset').addEventListener('click', () => {
    profile.avatar = '';
    db.set('gc_profile', profile);
    renderAll();
    toast(t('profPhotoResetMsg'));
  });
}
function goBoard(){ if (location.hash === '#board') showPage(); else location.hash = '#board'; }
function setNationality(nat){
  const n = NATIONS.find(x => x.code === nat) || NATIONS[0];
  profile.nat = n.code; profile.lang = n.lang;
  db.set('gc_profile', profile);
  mergeCachedUI(n.lang);
  feedMode = 'home';
  renderAll();
  goBoard();                                  // 바로 게시판으로 → 번역되는 모습을 보여줌
  toast(`${n.code} · ${t('natSaved')} — ${langName(n.lang)}`);
  translatePending();
  ensureUI(n.lang).then(changed => { if (changed) renderAll(); });
}
$('profileForm').addEventListener('submit', e => {
  e.preventDefault();
  profile.nick = $('fNick').value.trim() || profile.nick;
  const nat = $('fNat').value;
  if (nat !== profile.nat) setNationality(nat);   // ★ 언어는 여기서만 바뀜
  else { db.set('gc_profile', profile); renderAll(); toast(t('profSaved')); }
});
$('pAnon').addEventListener('change', () => {
  const me = COUNTRIES.find(c => c.code === profile.nat);
  const vHtml = $('pAnon').checked ? '' : (' ' + verifyPillHtml(null));
  $('pAuthor').innerHTML = `${esc(t('postingAs'))}: <b>${esc($('pAnon').checked ? t('anon') : profile.nick)}</b>${vHtml} · ${esc(profile.nat)} ${esc(countryName(me))}`;
});

/* ---------- 게시글 상세 · 댓글 ---------- */
function renderPostDetail(){
  const box = $('postDetail');
  if (!box || !detailId) return;
  const p = feedPosts.find(x => x.id === detailId);
  if (!p) { box.innerHTML = `<div class="empty">${esc(t('feedEmpty'))}</div>`; return; }
  const inp = $('cmInput'), keepVal = inp ? inp.value : '', keepFocus = inp && document.activeElement === inp;
  const keepAnon = $('cmAnon') ? $('cmAnon').checked : true;
  const cms = (p.comments || []).map(c => {
    const k = p.id + ':' + c.id, o = showOrig.has(k);
    const isWriter = c.authorId && c.authorId === p.authorId;
    return `<div class="cmt">
      <div class="cmt-head"><div class="av av-wrap">${avatarImgHtml(c)}</div><b>${esc(c.anon ? t('anon') : c.nick)}</b> ${verifyPillHtml(c)}
        <span class="muted small">${esc(c.country || 'OT')}</span>
        ${isWriter ? `<span class="writer">${esc(t('writer'))}</span>` : ''}<span class="muted small">${esc(relTime(c.createdAt))}</span></div>
      <p class="${unitCls([k])}">${esc(vis(k, c.body, o))}</p>
      ${trBadge([k], k)}
    </div>`;
  }).join('');
  box.innerHTML = postCard(p, dl(), true) + `
    <section class="cmt-section">
      <h3>💬 ${esc(t('comments'))} ${(p.comments || []).length}</h3>
      ${cms || `<div class="empty">${esc(t('noComments'))}</div>`}
      <div class="cmt-form">
        <input type="text" id="cmInput" maxlength="300" placeholder="${esc(t('commentPh'))}">
        <label class="check"><input type="checkbox" id="cmAnon" ${keepAnon ? 'checked' : ''}>${esc(t('anon'))}</label>
        <button type="button" data-cm-send>${esc(t('commentSend'))}</button>
      </div>
    </section>`;
  const ni = $('cmInput'); ni.value = keepVal; if (keepFocus) ni.focus();
}
async function submitComment(){
  const p = feedPosts.find(x => x.id === detailId);
  const text = ($('cmInput').value || '').trim();
  if (!p || !text) return;
  const isAnon = $('cmAnon').checked;
  const c = {id:'c' + Date.now(), nick:profile.nick, country:profile.nat, anon:isAnon,
    avatar:(!isAnon && profile.avatar) ? profile.avatar : '',
    verifyType: profile.verifyType || '',
    verifySchool: profile.verifySchool || '',
    verifyCountry: profile.verifyCountry || '',
    body:text, createdAt:new Date().toISOString(), authorId:myUid};
  const list = [...(p.comments || []), c];
  p.comments = list;
  $('cmInput').value = '';
  try { await saveField(p, 'comments', list); } catch (_) { toast(t('fSaveFail')); }
  renderFeed();
  toast(t('commented'));
  translatePending();
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-open],[data-back],[data-tr-toggle],[data-tr-retry],[data-cm-send],#resetDemo');
  if (!el) return;
  if (el.dataset.open !== undefined) { location.hash = '#post-' + el.dataset.open; return; }
  if (el.dataset.back !== undefined) { goBoard(); return; }
  if (el.dataset.trToggle !== undefined) {
    const k = el.dataset.trToggle;
    showOrig.has(k) ? showOrig.delete(k) : showOrig.add(k);
    renderFeed();
    renderMap();
    if (location.hash === '#saved') renderSaved();
    return;
  }
  if (el.dataset.trRetry !== undefined) {
    [...failed].filter(k => k.endsWith('|' + lang())).forEach(k => failed.delete(k)); translatePending(); return;
  }
  if (el.dataset.cmSend !== undefined) { submitComment(); return; }
  if (el.id === 'resetDemo') {
    ['gc_posts_v1', 'gc_posts_v2', 'gc_tr_v1', 'gc_profile'].forEach(k => { try { localStorage.removeItem(k); } catch (_) {} });
    fetch('/api/posts', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({action:'reset'})})
      .finally(() => { location.hash = '#board'; location.reload(); });
  }
});
document.addEventListener('keydown', e => {
  if (e.target.id === 'cmInput' && e.key === 'Enter' && !e.isComposing) { e.preventDefault(); submitComment(); }
});

/* ---------- 예시 글 (여러 나라 학생 + 국가별 유학 준비 게시판 질문/선배 조언) ---------- */
function seedPosts(){
  const ago = m => new Date(Date.now() - m * 60000).toISOString();
  const fake = n => Array.from({length:n}, (_, i) => 'seed' + i);
  const P = (id, nick, country, srcLang, cat, hobby, m, title, body, tags, extra, reacts, cms) => ({
    id, nick, country, srcLang, cat, hobby, title, body, tags, anon:false, reports:[], photos:[],
    place:'', addr:'', favMenu:'', verifyType:'enrolled', verifySchool:'경상국립대', verifyCountry:'KR',
    ...extra, createdAt:ago(m), authorId:'author-' + id,
    reacts:{rec:fake(reacts[0]), like:fake(reacts[1]), tasty:fake(reacts[2] || 0)},
    comments: cms.map(([cn, cc, cl, text, cm, isWriter, vType, vSchool, vCountry], i) => ({
      id:'c' + i, nick:cn, country:cc, srcLang:cl, anon:false,
      verifyType: vType !== undefined ? vType : 'enrolled',
      verifySchool: vSchool || '',
      verifyCountry: vCountry || 'KR',
      body:text, createdAt:ago(cm), authorId: isWriter ? 'author-' + id : 'u-' + id + i
    }))
  });
  return [
    P('s1','Yuki','JP','ja','food','cook',6,'学校の近くの新しいラーメン屋、最高でした🍜',
      '昨日、正門の近くに新しくできたラーメン屋に行ってきました！豚骨スープが濃厚で本当においしかった。誰か一緒に行きませんか？ #ラーメン #おすすめ',
      ['#ラーメン','#おすすめ'], {favMenu:'라멘'}, [12,8,6],
      [['민지','KR','ko','어디예요?? 저도 가보고 싶어요',4],['Alex','US','en','Is it vegetarian friendly?',3],['Yuki','JP','ja','正門から歩いて5分くらいです！野菜ラーメンもありました',2,true]]),
    P('sp-kr-1','Hạnh (유학준비생)','VN','vi','q','',12,'Mình đang chuẩn bị du học Hàn Quốc (GKS/D-2), cần TOPIK mấy급? 🇰🇷',
      'Chào các anh chị! Em đang ở Việt Nam chuẩn bị hồ sơ du học Hàn Quốc kỳ tới. Cho em hỏi phỏng vấn visa D-2 và ký túc xá trường có khó đăng ký không ạ? #한국유학 #D2비자 #기숙사',
      ['#한국유학','#D2비자','#기숙사'], {prepCountry:'KR', verifyType:'', verifySchool:''}, [18,14,0],
      [
        ['Linh','VN','vi','Chào em! Chị đang học năm 2 ở đây. TOPIK 3~4 là nộp hồ sơ ổn, ký túc xá ưu tiên tân sinh viên quốc tế nên cứ 신청 sớm nhé!',9,false,'enrolled','경상국립대 재학','KR'],
        ['민준','KR','ko','학교 국제어학원(D-4)부터 시작하는 친구들도 많아요. 기숙사는 합격 통지 받자마자 신청하면 거의 다 배정됩니다! 궁금한 거 있으면 편하게 물어보세요.',6,false,'alumni','경상국립대 졸업 멘토','KR'],
        ['Hạnh (유학준비생)','VN','vi','Dạ em cảm ơn anh chị nhiều ạ! 😭🙏',3,true,'','','KR']
      ]),
    P('s2','Dmitry','RU','ru','q','',18,'Где купить тёплую куртку недорого?',
      'Я первый год в Корее и не ожидал, что зимой здесь будет так холодно 🥶 Посоветуйте, где можно недорого купить тёплую куртку? #зима',
      ['#зима'], {}, [5,9,0],
      [['민지','KR','ko','중앙시장 가보세요! 저렴하고 종류도 많아요',15],['王磊','CN','zh','我是在网上买的，便宜很多',12],['Dmitry','RU','ru','Спасибо всем! 🙏',10,true]]),
    P('sp-us-1','하은 (유학준비생)','KR','ko','q','',24,'미국 교환학생 준비 중인데 J-1 비자 인터뷰랑 기숙사 팁 있을까요? 🇺🇸',
      '다음 학기 미국 주립대로 교환학생 지원 준비 중입니다! DS-2019 발급이 얼마나 걸렸는지, 그리고 기숙사 밀플랜을 어떻게 선택하면 좋을지 유학 다녀오신 선배님들 조언 부탁드려요! #미국유학 #교환학생 #J1비자',
      ['#미국유학','#교환학생','#J1비자'], {prepCountry:'US', verifyType:'', verifySchool:''}, [15,11,0],
      [
        ['준호','KR','ko','작년에 1년 교환 다녀왔어요! DS-2019는 서류 제출 후 4~6주 걸렸고, 밀플랜은 처음엔 중간 단계(주 10~14끼)로 시작해서 한 달 써보고 조정하는 걸 추천해요 👍',20,false,'alumni','UC Davis 교환 수료','US'],
        ['Alex','US','en','Feel free to ask me anything about US campus life or visa interviews! Keep your study plan clear and bring your bank statement & admission letter.',14,false,'enrolled','UCLA 재학','US']
      ]),
    P('sp-kr-2','민준','KR','ko','info','',30,'[선배 팁] 한국 유학 오기 전 출국 짐 싸기 & 외국인등록증(ARC) 신청 총정리 🇰🇷',
      '매 학기 한국 입국 준비하는 유학 준비생분들이 가장 많이 물어보는 체크리스트를 정리했어요! 1) 입국 직후 공항에서 개통 가능한 선불 유심 예약하기 2) 외국인등록증(ARC) 방문 예약은 입국 전에 하이코리아에서 미리 잡기 3) 상비약은 본인 나라에서 쓰던 것 챙겨오기! #한국유학꿀팁 #외국인등록증 #출국체크리스트',
      ['#한국유학꿀팁','#외국인등록증','#출국체크리스트'], {prepCountry:'KR', verifyType:'alumni', verifySchool:'경상국립대 유학 멘토', verifyCountry:'KR'}, [27,19,0],
      [
        ['Bat','MN','mn','Маш хэрэгтэй мэдээлэл байна! Анх ирэхэд ARC захиалга хийх хамгийн чухал байсан 👍',25,false,'enrolled','경상국립대 재학','KR'],
        ['Sardor (유학준비생)','UZ','uz','Katta rahmat! Men kelasi oy Koreyaga boraman, juda foydali bo‘ldi!',18,false,'','','KR']
      ]),
    P('sp-cn-1','지수 (유학준비생)','KR','ko','q','',36,'중국 어학연수/교환학생 준비 중인데 위챗페이 외국 카드 연동 잘 되나요? 🇨🇳',
      '이번에 중국 대학으로 어학연수 준비하고 있는 학생입니다. 출국 전에 알리페이·위챗페이에 한국 트래블로그나 비자카드 연동해가면 바로 결제가 가능한지 궁금해요! #중국유학 #어학연수 #위챗페이',
      ['#중국유학','#어학연수','#위챗페이'], {prepCountry:'CN', verifyType:'', verifySchool:''}, [12,9,0],
      [
        ['王磊','CN','zh','现在微信支付和支付宝都可以直接绑定韩国的Visa/Master卡了！不过到了学校后办一张中国本地银行卡会更方便。',31,false,'enrolled','북경어언대·경상국립대 복수학위','CN'],
        ['서연','KR','ko','작년 상하이 교환 다녀왔는데 알리페이에 트래블 카드 등록해가면 첫날부터 지하철·식당 다 결제돼요! 200위안 이상 결제 시 3% 수수료만 주의하세요 😊',22,false,'alumni','푸단대 교환 수료','CN']
      ]),
    P('s3','Alex','US','en','play','sports',40,'Anyone up for basketball this Saturday? 🏀',
      "We're playing at the campus court at 3pm. All levels welcome — just bring water! #basketball",
      ['#basketball'], {}, [7,11,0],
      [['Linh','VN','vi','Mình tham gia được không? Mình chơi chưa giỏi lắm 😅',30],['준호','KR','ko','저도 갈게요! 친구 한 명 데려가도 되나요?',25,false,'alumni','UC Davis 교환 수료','US']]),
    P('sp-jp-1','도윤 (유학준비생)','KR','ko','q','',46,'일본 교환학생/유학 준비할 때 재류자격인정증명서(COE) 언제쯤 오나요? 🇯🇵',
      '일본 국립대로 다음 학기 유학 준비 중인데 COE 발급이 생각보다 오래 걸린다고 해서 걱정이에요. 집 구하기나 유심/계좌 개설은 어떻게 준비하셨나요? #일본유학 #COE #교환학생',
      ['#일본유학','#COE','#교환학생'], {prepCountry:'JP', verifyType:'', verifySchool:''}, [16,12,0],
      [
        ['Yuki','JP','ja','COEは通常、出国1〜2ヶ月前に届きます！最初は大学の寮に入って、住民票を登録してからゆうちょ銀行の口座を作るのが一番スムーズですよ✨',41,false,'enrolled','도쿄대·경상국립대 교환','JP'],
        ['현우','KR','ko','일본 유학 2년 다녀왔습니다! 음성 통화 가능한 유심(모발·라인모바일 등)을 한국에서 미리 수령해가면 입국 직후 번호 인증할 때 정말 편해요.',33,false,'alumni','와세다대 졸업','JP']
      ]),
    P('s4','王磊','CN','zh','info','book',55,'期末考试期间图书馆24小时开放📚',
      '期末考试期间图书馆24小时开放！从12月9日到12月20日。座位很快就满了，记得提前在网上预约。 #图书馆 #期末',
      ['#图书馆','#期末'], {}, [21,14,0],
      [['Alex','US','en','Thank you so much!! This is really helpful.',48],['Bat','MN','mn','Баярлалаа! Маш хэрэгтэй мэдээлэл байна.',40]]),
    P('sp-us-2','준호','KR','ko','info','',64,'[유학 선배 후기] 미국 대학 유학·교환학생 출국 전 필수 준비물 & 초기 정착 비용 🇺🇸',
      '미국 교환학생 1년 다녀오면서 느낀 출국 전 핵심 팁 공유합니다! 1) 예방접종 증명서(MMR, 수두, 결핵 검사 등)는 영문으로 최소 한 달 전에 준비 2) 국제운전면허증 + 한국 면허증 원본 함께 지참 3) 초기 정착금(보증금·교재비 등)은 달러 체크카드 2장 이상 분산해 가세요! #미국유학후기 #교환학생팁 #출국준비',
      ['#미국유학후기','#교환학생팁','#출국준비'], {prepCountry:'US', verifyType:'alumni', verifySchool:'UC Davis 교환 수료', verifyCountry:'US'}, [22,15,0],
      [
        ['하은 (유학준비생)','KR','ko','예방접종 영문 증명서 미리 챙겨야겠네요! 정리해주셔서 정말 감사합니다 🙏',58,false,'','','US'],
        ['Alex','US','en','Spot on! Textbooks in the US are super expensive, so definitely rent or buy used copies from campus groups.',50,false,'enrolled','UCLA 재학','US']
      ]),
    P('sp-cn-2','서연','KR','ko','info','',72,'[유학 선배 팁] 중국 유학 비자(X1/X2) 신청부터 기숙사 입사·VPN 준비 총정리 🇨🇳',
      '중국 유학·어학연수 처음 가시는 분들을 위한 체크리스트입니다! 1) 입학허가서(录取通知书)와 JW202 서류 원본 확인 2) 한국에서 미리 로밍 또는 검증된 eSIM 설치해 가기 3) 도착 후 24시간 이내 주숙등기(기숙사는 행정실에서 일괄 처리해 주는 경우가 많으니 꼭 확인!) #중국유학팁 #X1비자 #주숙등기',
      ['#중국유학팁','#X1비자','#주숙등기'], {prepCountry:'CN', verifyType:'alumni', verifySchool:'푸단대 교환 수료', verifyCountry:'CN'}, [19,13,0],
      [
        ['지수 (유학준비생)','KR','ko','주숙등기 24시간 이내가 제일 걱정됐는데 기숙사 행정실에 먼저 물어봐야겠어요! 감사합니다 😊',65,false,'','','CN']
      ]),
    P('sp-jp-2','현우','KR','ko','info','',76,'[유학 선배 팁] 일본 유학 초기 정착 3대 미션: 재류카드·주민등록·유초은행 개설 🇯🇵',
      '일본 공항 도착부터 첫 1주일 동안 해야 할 순서예요! 1) 공항 입국심사대에서 재류카드 수령 및 자격외활동허가(아르바이트 허가) 도장 바로 받기 2) 거주지 구청(시야쿠쇼)에서 주민등록 및 국민건강보험 가입 3) 우체국(유초은행) 계좌 개설 순으로 진행하면 가장 빠릅니다! #일본유학팁 #재류카드 #유초은행',
      ['#일본유학팁','#재류카드','#유초은행'], {prepCountry:'JP', verifyType:'alumni', verifySchool:'와세다대 졸업', verifyCountry:'JP'}, [24,17,0],
      [
        ['도윤 (유학준비생)','KR','ko','공항에서 자격외활동허가 바로 받는 팁 진짜 꿀팁이네요!! 스크랩해뒀어요 👍',70,false,'','','JP'],
        ['Yuki','JP','ja','空港で資格外活動許可を申請するのは本当に大事です！後から申請すると時間がかかりますからね。',66,false,'enrolled','도쿄대·경상국립대 교환','JP']
      ]),
    P('s5','Linh','VN','vi','food','',85,'Tteokbokki ở gần cổng sau ngon lắm!',
      'Mình mới thử quán tteokbokki gần cổng sau. Cay vừa phải, giá rẻ, ăn kèm chả cá rất ngon 🔥 #tteokbokki',
      ['#tteokbokki'], {favMenu:'떡볶이'}, [9,6,12],
      [['Yuki','JP','ja','辛さはどのくらいですか？辛いのが苦手で…',70],['민지','KR','ko','거기 순대도 진짜 맛있어요 ㅎㅎ',61]]),
    P('s6','Bat','MN','mn','free','',120,'Монголоос ирсэн оюутнууд байна уу?',
      'Сайн байцгаана уу! Би энэ семестрт ирсэн. Хамтдаа хоол идэж, ярилцах найз хайж байна 😊',
      [], {}, [4,10,0],
      [['민지','KR','ko','반가워요! 유학생 모임에 한번 나와 보세요',100],['Alex','US','en','Welcome! 👋 Join us for basketball on Saturday!',95]]),
    P('s7','민지','KR','ko','q','kpop',170,'한국어 언어교환 하실 분 구해요!',
      '영어나 일본어를 배우고 싶은 한국인 학생이에요. 대신 한국어 공부를 도와드릴게요. 커피는 제가 살게요 ☕ #언어교환',
      ['#언어교환'], {}, [15,8,0],
      [['Yuki','JP','ja','ぜひお願いします！日本語なら教えられます',150],['Alex','US','en',"I'm in! My Korean is beginner level though 😅",140]]),
    P('s8','María','ES','es','free','',260,'¿Es normal extrañar tanto a mi familia?',
      'Llevo tres meses aquí y a veces me siento muy sola. La comida y la gente son geniales, pero extraño mucho a mi familia. ¿Les pasa lo mismo?',
      [], {}, [6,19,0],
      [['준호','KR','ko','완전 정상이에요. 힘들 때 게시판에 글 남겨 주세요!',240,false,'alumni','UC Davis 교환 수료','US'],['Dmitry','RU','ru','Держись! Мы все через это прошли 💪',230]])
  ];
}

/* ================= 초기화 (모든 등록이 끝난 뒤 실행) ================= */
mergeCachedUI(lang());
renderAll();
showPage();
initBackends();
fetch('/api/status').then(r => r.json())
  .then(s => { api = {checked:true, server:true, hasKey:!!s.hasKey, model:s.model}; })
  .catch(() => { api = {checked:true, server:false, hasKey:false, model:''}; })
  .finally(() => {
    renderFeed();
    translatePending();
    ensureUI(lang()).then(changed => { if (changed) renderAll(); });
  });
