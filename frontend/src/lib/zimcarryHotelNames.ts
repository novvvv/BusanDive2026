import type { SubwayNameLanguage } from "@/lib/subwayNames";

/**
 * 짐캐리 등록 숙소명 ja/en 표기 — zimcarry_hotels.json의 name(ko) 키 기준.
 * 공식 외국어 표기가 없는 숙소는 외래어 역추정(베스트 에포트) 표기다.
 * 미등록 이름은 한국어 원문을 그대로 반환한다. 주소는 현지 제시용 정보라 번역하지 않는다.
 */

// [ja, en]
const NAME_L10N: Record<string, [string, string]> = {
  "오데이즈 오시리아 레지던스": ["オデイズ・オシリア・レジデンス", "Odays Osiria Residence"],
  "마티에 부산하버시티": ["マティエ釜山ハーバーシティ", "Matie Busan Harbor City"],
  "팔라티움 해운대 바이 소노펠리체": ["パラティウム海雲台 バイ ソノフェリーチェ", "Palatium Haeundae by Sono Felice"],
  "루메드풀빌라": ["ルメドプールヴィラ", "Lumed Pool Villa"],
  "호텔 온나": ["ホテル・オンナ", "Hotel Onna"],
  "호텔 노아": ["ホテル・ノア", "Hotel Noah"],
  "호텔마르쉐": ["ホテルマルシェ", "Hotel Marche"],
  "더퍼스트오션 광안(13층 보관함)*": ["ザ・ファーストオーシャン広安（13階ロッカー）", "The First Ocean Gwangan (13F locker)"],
  "네스트리호텔": ["ネストリーホテル", "Nestree Hotel"],
  "남포 호텔 MGM 자갈치역점": ["南浦ホテルMGMチャガルチ駅店", "Nampo Hotel MGM Jagalchi Station"],
  "JB플러스호텔": ["JBプラスホテル", "JB Plus Hotel"],
  "아늑시그니처호텔": ["アヌク・シグネチャーホテル", "Aneuk Signature Hotel"],
  "벨모어호텔(구 O호텔)": ["ベルモアホテル（旧Oホテル）", "Bellmore Hotel (former O Hotel)"],
  "송정 스카이풀빌라 부티크(스카이풀빌라 옆건물)": ["松亭スカイプールヴィラ・ブティック（スカイプールヴィラ隣）", "Songjeong Sky Pool Villa Boutique (next to Sky Pool Villa)"],
  "더디셈버스테이 부산송도오션테라스": ["ザ・ディセンバーステイ釜山松島オーシャンテラス", "The December Stay Busan Songdo Ocean Terrace"],
  "호텔 게스후 광안리": ["ホテル・ゲスフー広安里", "Hotel Guess Who Gwangalli"],
  "더무어 웰니스 풀빌라": ["ザ・ムーア・ウェルネス・プールヴィラ", "The Moor Wellness Pool Villa"],
  "더바인엘시티레지던스(그 외 엘시티레지던스 이용 불가)": ["ザ・バインLCTレジデンス（他のLCTレジデンスは利用不可）", "The Vine LCT Residence (other LCT residences unavailable)"],
  "료칸바다다(호텔바다다)": ["旅館バダダ（ホテルバダダ）", "Ryokan Badada (Hotel Badada)"],
  "H-에비뉴 송정해수욕장점": ["H-アベニュー松亭海水浴場店", "H-Avenue Songjeong Beach"],
  "유니크스테이": ["ユニークステイ", "Unique Stay"],
  "캔버스 호스텔 블랙": ["キャンバスホステル・ブラック", "Canvas Hostel Black"],
  "어반그루브호텔 서면점": ["アーバングルーブホテル西面店", "Urban Groove Hotel Seomyeon"],
  "KT&G 상상마당부산 스테이": ["KT&G サンサンマダン釜山ステイ", "KT&G Sangsangmadang Busan Stay"],
  "쏘타스위트 부산서면": ["ソタスイート釜山西面", "Sota Suite Busan Seomyeon"],
  "엘모멘토 송도": ["エルモメント松島", "El Momento Songdo"],
  "마란트호텔": ["マラントホテル", "Marant Hotel"],
  "엘모멘토 광안": ["エルモメント広安", "El Momento Gwangan"],
  "와이컬렉션 해운대비치(1층 프론트)": ["Yコレクション海雲台ビーチ（1階フロント）", "Y Collection Haeundae Beach (1F front desk)"],
  "엘시티 와이컬렉션(지하 4층)(외 기타 엘시티 숙소 이용 불가)": ["LCT Yコレクション（地下4階）（他のLCT宿泊施設は利用不可）", "LCT Y Collection (B4) (other LCT stays unavailable)"],
  "광안리 아정모텔": ["広安里アジョンモーテル", "Gwangalli Ajeong Motel"],
  "보다스테이 2호점 / 3호점": ["ボダステイ2号店/3号店", "Boda Stay Branch 2 / 3"],
  "보다스테이 더펜트": ["ボダステイ・ザ・ペント", "Boda Stay The Pent"],
  "해운대 뉴시즈레지던스 (3층 307호)": ["海雲台ニューシーズレジデンス（3階307号）", "Haeundae New Seas Residence (Rm 307, 3F)"],
  "비에이치스토리(부산홀릭스토리)": ["BHストーリー（釜山ホリックストーリー）", "BH Story (Busan Holic Story)"],
  "메르드로브 호텔": ["メルドローブホテル", "Merdrove Hotel"],
  "UH 컨티넨탈 센터포인트": ["UHコンチネンタル・センターポイント", "UH Continental Centerpoint"],
  "H-에비뉴호텔 해운대점": ["H-アベニューホテル海雲台店", "H-Avenue Hotel Haeundae"],
  "바뮤호텔": ["バミューホテル", "Bamu Hotel"],
  "시카고 호텔": ["シカゴホテル", "Chicago Hotel"],
  "코티스 더 브릿지": ["コティス・ザ・ブリッジ", "Cotis The Bridge"],
  "코지트리호텔 서면점": ["コジーツリーホテル西面店", "Cozy Tree Hotel Seomyeon"],
  "그랜드 오시리아 레지던스": ["グランド・オシリア・レジデンス", "Grand Osiria Residence"],
  "호텔더루아남포롯데점": ["ホテル・ザ・ルア南浦ロッテ店", "Hotel The Lua Nampo Lotte"],
  "부산뷰호텔": ["釜山ビューホテル", "Busan View Hotel"],
  "트레블로지스위트 부산센텀": ["トラベロッジスイート釜山センタム", "Travelodge Suites Busan Centum"],
  "부산게스트하우스 노마드인부산": ["釜山ゲストハウス・ノマドイン釜山", "Busan Guesthouse Nomad in Busan"],
  "애프터챕터 호텔": ["アフターチャプターホテル", "After Chapter Hotel"],
  "래디언트 남포 호텔 (5층보관함)": ["ラディアント南浦ホテル（5階ロッカー）", "Radiant Nampo Hotel (5F locker)"],
  "투에이치호텔": ["トゥーエイチホテル", "Two H Hotel"],
  "라메르호텔": ["ラメールホテル", "La Mer Hotel"],
  "소노문 해운대": ["ソノムーン海雲台", "Sono Moon Haeundae"],
  "시티호텔": ["シティホテル", "City Hotel"],
  "호텔 야자 광안리점": ["ホテルヤジャ広安里店", "Hotel Yaja Gwangalli"],
  "L7 해운대": ["L7海雲台", "L7 Haeundae"],
  "모이지 게스트하우스": ["モイジゲストハウス", "Moiji Guesthouse"],
  "빌라쥬 드 아난티 (매너하우스)": ["ヴィラージュ・ド・アナンティ（マナーハウス）", "Village de Ananti (Manor House)"],
  "빌라쥬 드 아난티 (클리퍼)": ["ヴィラージュ・ド・アナンティ（クリッパー）", "Village de Ananti (Clipper)"],
  "센텀프리미어호텔 (센텀프라임호텔)": ["センタムプレミアホテル（センタムプライムホテル）", "Centum Premier Hotel (Centum Prime Hotel)"],
  "위더스오션 (20층)": ["ウィザスオーシャン（20階）", "Withus Ocean (20F)"],
  "리엔호텔": ["リエンホテル", "Lien Hotel"],
  "나무늘보호텔 서면점": ["ナムヌルボホテル西面店", "Namuneulbo Hotel Seomyeon"],
  "마리쏠 (로비3층)": ["マリソル（ロビー3階）", "Marisol (lobby 3F)"],
  "브라운도트호텔 부산역점": ["ブラウンドットホテル釜山駅店", "Browndot Hotel Busan Station"],
  "부산 서면 리순덕호텔": ["釜山西面リスンドクホテル", "Busan Seomyeon Lisundeok Hotel"],
  "(T) 어반스테이 부산송도해변(그랩디건물 2층)": ["(T)アーバンステイ釜山松島ビーチ（グラブ・ジ・オーシャンビル2階）", "(T) Urban Stay Busan Songdo Beach (2F, Grab The Ocean bldg)"],
  "프라임관광호텔": ["プライム観光ホテル", "Prime Tourist Hotel"],
  "리베로 호텔": ["リベロホテル", "Libero Hotel"],
  "해운대 호텔 준": ["海雲台ホテルジュン", "Haeundae Hotel Joon"],
  "클리프 베이 호텔 해운대": ["クリフベイホテル海雲台", "Cliff Bay Hotel Haeundae"],
  "센트럴7호텔 (구)이비스 앰배서더 부산시티센터": ["セントラル7ホテル（旧イビスアンバサダー釜山シティセンター）", "Central 7 Hotel (former ibis Ambassador Busan City Centre)"],
  "스테이오": ["ステイオー", "Stay O"],
  "와이컬렉션 by UH FLAT 오시리아": ["Yコレクション by UH FLAT オシリア", "Y Collection by UH FLAT Osiria"],
  "부산 해운대 캔버스호스텔": ["釜山海雲台キャンバスホステル", "Busan Haeundae Canvas Hostel"],
  "부산 스테이온 풀빌라": ["釜山ステイオンプールヴィラ", "Busan Stay On Pool Villa"],
  "부산 송정 감동 호텔": ["釜山松亭カムドンホテル", "Busan Songjeong Gamdong Hotel"],
  "부산 송정 호텔 데이즈A(Days.A)": ["釜山松亭ホテルデイズA（Days.A）", "Busan Songjeong Hotel Days.A"],
  "부산 송정 애플": ["釜山松亭アップル", "Busan Songjeong Apple"],
  "부산 송정 코코호텔": ["釜山松亭ココホテル", "Busan Songjeong Coco Hotel"],
  "부산 송정 호텔 가인": ["釜山松亭ホテルガイン", "Busan Songjeong Hotel Gain"],
  "부산 송정 호텔 데이즈B(Days B)": ["釜山松亭ホテルデイズB（Days B）", "Busan Songjeong Hotel Days B"],
  "송정 쿠무다 레스메종 (쿠무다 건물 5~8층)": ["松亭クムダ・レメゾン（クムダビル5〜8階）", "Songjeong Kumuda Les Maison (5–8F, Kumuda bldg)"],
  "부산 송정 호텔 홍단": ["釜山松亭ホテルホンダン", "Busan Songjeong Hotel Hongdan"],
  "부산 송정 호텔 플레르": ["釜山松亭ホテルフルール", "Busan Songjeong Hotel Fleur"],
  "부산 송정 브룩스 호텔": ["釜山松亭ブルックスホテル", "Busan Songjeong Brooks Hotel"],
  "부산 헤운대송정미연펜션": ["釜山海雲台松亭ミヨンペンション", "Busan Haeundae Songjeong Miyeon Pension"],
  "송정호텔블루캐슬": ["松亭ホテルブルーキャッスル", "Songjeong Hotel Blue Castle"],
  "아스티호텔 부산": ["アスティホテル釜山", "Asti Hotel Busan"],
  "라마다 앙코르 바이 윈덤 부산역": ["ラマダアンコール by ウィンダム釜山駅", "Ramada Encore by Wyndham Busan Station"],
  "부산역 노떼 라 미아": ["釜山駅ノッテ・ラ・ミア", "Busan Station Notte La Mia"],
  "부산 남포동 Hotel 버튼": ["釜山南浦洞ホテルボタン", "Busan Nampo-dong Hotel Button"],
  "센트럴파크 호텔 부산": ["セントラルパークホテル釜山", "Central Park Hotel Busan"],
  "남포 리자인호텔": ["南浦リザインホテル", "Nampo Lizain Hotel"],
  "남포 스테이웰 호텔": ["南浦ステイウェルホテル", "Nampo Staywell Hotel"],
  "지엔비 호텔": ["GNBホテル", "GNB Hotel"],
  "호텔 아벤트리 부산": ["ホテルアベンツリー釜山", "Hotel Aventree Busan"],
  "부산 남포동 투헤븐": ["釜山南浦洞トゥヘブン", "Busan Nampo-dong To Heaven"],
  "남포동 J": ["南浦洞J", "Nampo-dong J"],
  "남포동 아리아": ["南浦洞アリア", "Nampo-dong Aria"],
  "마론 호텔 남포": ["マロンホテル南浦", "Maron Hotel Nampo"],
  "호텔린 남포": ["ホテルリン南浦", "Hotellin Nampo"],
  "남포 MU호텔": ["南浦MUホテル", "Nampo MU Hotel"],
  "광안리 썬시티호텔": ["広安里サンシティホテル", "Gwangalli Sun City Hotel"],
  "광안리 W호텔(더블유호텔)": ["広安里Wホテル", "Gwangalli W Hotel"],
  "송도 EL호텔": ["松島ELホテル", "Songdo EL Hotel"],
  "송도 브이호텔": ["松島Vホテル", "Songdo V Hotel"],
  "송도 99.9호텔": ["松島99.9ホテル", "Songdo 99.9 Hotel"],
  "서면 호텔 YTT": ["西面ホテルYTT", "Seomyeon Hotel YTT"],
  "서면 시티호텔 G&G": ["西面シティホテルG&G", "Seomyeon City Hotel G&G"],
  "넘버25 서면1번가점": ["ナンバー25西面1番街店", "Number 25 Seomyeon Ilbeonga"],
  "W레지던스호텔 센텀시티 (프론트306호)((센텀 빅토리아,센텀시티호텔 배송불가))": ["Wレジデンスホテルセンタムシティ（フロント306号／センタムビクトリア・センタムシティホテルは配送不可）", "W Residence Hotel Centum City (front desk Rm 306; no delivery to Centum Victoria/Centum City Hotel)"],
  "W레지던스호텔 해운대 (프론트 6층)": ["Wレジデンスホテル海雲台（フロント6階）", "W Residence Hotel Haeundae (front desk 6F)"],
  "서면 사우스반데코 호텔": ["西面サウスバンデコホテル", "Seomyeon South Vandeco Hotel"],
  "광안리 브릿지 호텔": ["広安里ブリッジホテル", "Gwangalli Bridge Hotel"],
  "아난티 앳 부산 빌라쥬": ["アナンティ・アット釜山ヴィラージュ", "Ananti at Busan Village"],
  "남포 코티스 더 그라운드": ["南浦コティス・ザ・グラウンド", "Nampo Cotis The Ground"],
  "부산 기장브라운도트펜션": ["釜山機張ブラウンドットペンション", "Busan Gijang Browndot Pension"],
  "부산 광안리 호텔 미라주": ["釜山広安里ホテルミラージュ", "Busan Gwangalli Hotel Mirage"],
  "부산 송정 에스스테이": ["釜山松亭Sステイ", "Busan Songjeong S Stay"],
  "호시카게료칸 동부산": ["ホシカゲ旅館東釜山", "Hoshikage Ryokan East Busan"],
  "부산 관광 호텔": ["釜山観光ホテル", "Busan Tourist Hotel"],
  "센텀 비즈니스 호텔": ["センタムビジネスホテル", "Centum Business Hotel"],
  "힐사이드 호텔": ["ヒルサイドホテル", "Hillside Hotel"],
  "부산 영도 호텔 브릿지": ["釜山影島ホテルブリッジ", "Busan Yeongdo Hotel Bridge"],
  "투헤븐 호텔 부산 송도": ["トゥヘブンホテル釜山松島", "To Heaven Hotel Busan Songdo"],
  "굿올데이즈 호텔 부산": ["グッドオールデイズホテル釜山", "Good Ol' Days Hotel Busan"],
  "송정 메이플하우스": ["松亭メープルハウス", "Songjeong Maple House"],
  "센텀 컨벤션 호텔((센텀 빅토리아,센텀시티호텔 배송불가))": ["センタムコンベンションホテル（センタムビクトリア・センタムシティホテルは配送不可）", "Centum Convention Hotel (no delivery to Centum Victoria/Centum City Hotel)"],
  "뉴시즈오시리아": ["ニューシーズオシリア", "New Seas Osiria"],
  "영도 글랜스": ["影島グランス", "Yeongdo Glance"],
  "해운대 HAUTE(오뜨)": ["海雲台HAUTE（オート）", "Haeundae HAUTE"],
  "이제 부산 호텔": ["イジェ釜山ホテル", "Ije Busan Hotel"],
  "부산역 비즈니스(BSB)호텔": ["釜山駅ビジネス（BSB）ホテル", "Busan Station Business (BSB) Hotel"],
  "부산역 아몬드 호텔": ["釜山駅アーモンドホテル", "Busan Station Almond Hotel"],
  "부산역 호텔 르이데아": ["釜山駅ホテル・ル・イデア", "Busan Station Hotel Le Idea"],
  "부산역 팝콘": ["釜山駅ポップコーン", "Busan Station Popcorn"],
  "호텔 포레 프리미어 남포": ["ホテルフォーレプレミア南浦", "Hotel Foret Premier Nampo"],
  "토요코인 부산역 1호점": ["東横INN釜山駅1", "Toyoko Inn Busan Station No.1"],
  "하운드 호텔 부산역": ["ハウンドホテル釜山駅", "Hound Hotel Busan Station"],
  "서면 호텔25H 더파크": ["西面ホテル25H ザ・パーク", "Seomyeon Hotel 25H The Park"],
  "윈덤 그랜드 부산(송도)": ["ウィンダムグランド釜山（松島）", "Wyndham Grand Busan (Songdo)"],
  "동백호텔 해운대점": ["トンベクホテル海雲台店", "Dongbaek Hotel Haeundae"],
  "서면 프렌치코드": ["西面フレンチコード", "Seomyeon French Code"],
  "남포동 더 하운드": ["南浦洞ザ・ハウンド", "Nampo-dong The Hound"],
  "베스트 루이스 해밀턴 호텔 오션테라스(뷰포르 건물 운송X)": ["ベストルイスハミルトンホテル・オーシャンテラス（ビューフォールビルは運送不可）", "Best Louis Hamilton Hotel Ocean Terrace (no delivery to Viewfor bldg)"],
  "더클럽호텔 기장연화리점": ["ザ・クラブホテル機張蓮花里店", "The Club Hotel Gijang Yeonhwa-ri"],
  "넘버25 기장연화리점": ["ナンバー25機張蓮花里店", "Number 25 Gijang Yeonhwa-ri"],
  "송정 하루": ["松亭ハル", "Songjeong Haru"],
  "송정 아이엠": ["松亭アイエム", "Songjeong I.M"],
  "송정 더 쿨리스트 호텔": ["松亭ザ・クーリストホテル", "Songjeong The Coolest Hotel"],
  "브라운도트 영도대교점": ["ブラウンドット影島大橋店", "Browndot Yeongdo Bridge"],
  "송정 리자인 호텔": ["松亭リザインホテル", "Songjeong Lizain Hotel"],
  "송정 젬2": ["松亭ジェム2", "Songjeong Gem 2"],
  "송정 젬": ["松亭ジェム", "Songjeong Gem"],
  "송도 아바 호텔": ["松島アバホテル", "Songdo Aba Hotel"],
  "송도 호텔 더메이": ["松島ホテル・ザ・メイ", "Songdo Hotel The May"],
  "호텔공간공감 부산역점": ["ホテルコンガンコンガム釜山駅店", "Hotel Gonggan Gonggam Busan Station"],
  "H-에비뉴 서면역점": ["H-アベニュー西面駅店", "H-Avenue Seomyeon Station"],
  "송정 더퍼스트오션": ["松亭ザ・ファーストオーシャン", "Songjeong The First Ocean"],
  "커넥트 부산 호텔": ["コネクト釜山ホテル", "Connect Busan Hotel"],
  "남포동 소유호텔": ["南浦洞ソユホテル", "Nampo-dong Soyu Hotel"],
  "넘버25 남포대청점": ["ナンバー25南浦大庁店", "Number 25 Nampo Daecheong"],
  "토요코인 부산중앙역점": ["東横INN釜山中央駅", "Toyoko Inn Busan Jungang Station"],
  "송정 스카이 풀빌라": ["松亭スカイプールヴィラ", "Songjeong Sky Pool Villa"],
  "브라운도트 송도해수욕장점": ["ブラウンドット松島海水浴場店", "Browndot Songdo Beach"],
  "광안리 와바클래식": ["広安里ワバクラシック", "Gwangalli Waba Classic"],
  "해운대 나인": ["海雲台ナイン", "Haeundae Nine"],
  "부산 콘트호텔": ["釜山コントホテル", "Busan Cont Hotel"],
  "남포동 호텔 와(wa)": ["南浦洞ホテルワ（wa）", "Nampo-dong Hotel Wa"],
  "더휴식 아늑호텔 부산 남포점": ["ザ・ヒュシク・アヌクホテル釜山南浦店", "The Hyusik Aneuk Hotel Busan Nampo"],
  "남포 오션투헤븐 호텔 스파": ["南浦オーシャントゥヘブンホテル・スパ", "Nampo Ocean To Heaven Hotel Spa"],
  "남포동 엘리제": ["南浦洞エリゼ", "Nampo-dong Elysee"],
  "타워힐 호텔": ["タワーヒルホテル", "Tower Hill Hotel"],
  "G호텔": ["Gホテル", "G Hotel"],
  "스탠포드 호텔 부산": ["スタンフォードホテル釜山", "Stanford Hotel Busan"],
  "그리핀베이 호텔": ["グリフィンベイホテル", "Griffin Bay Hotel"],
  "코모도호텔 부산": ["コモドホテル釜山", "Commodore Hotel Busan"],
  "모가스테이": ["モガステイ", "Moga Stay"],
  "크라운 하버 호텔 부산": ["クラウンハーバーホテル釜山", "Crown Harbor Hotel Busan"],
  "커들스테이": ["カドルステイ", "Cuddle Stay"],
  "브라운도트 해운대점": ["ブラウンドット海雲台店", "Browndot Haeundae"],
  "그랜드 모먼트": ["グランドモーメント", "Grand Moment"],
  "송정 H.모먼트(에이치모먼트)": ["松亭H.モーメント", "Songjeong H.Moment"],
  "광안리 마린뷰호텔": ["広安里マリンビューホテル", "Gwangalli Marine View Hotel"],
  "송정 나무늘보 호텔": ["松亭ナムヌルボホテル", "Songjeong Namuneulbo Hotel"],
  "브라운도트 기장연화리점": ["ブラウンドット機張蓮花里店", "Browndot Gijang Yeonhwa-ri"],
  "노스하버호텔 부산": ["ノースハーバーホテル釜山", "North Harbor Hotel Busan"],
  "광안비치호텔 더 엠(THE M)": ["広安ビーチホテル・ザ・エム（THE M）", "Gwangan Beach Hotel THE M"],
  "레니스 호텔 서면": ["レニスホテル西面", "Lenis Hotel Seomyeon"],
  "해운대 블루스토리 호텔": ["海雲台ブルーストーリーホテル", "Haeundae Blue Story Hotel"],
  "타이드어웨이 풀빌라": ["タイドアウェイプールヴィラ", "Tideaway Pool Villa"],
  "송정 고준관 호텔": ["松亭コジュングァンホテル", "Songjeong Gojungwan Hotel"],
  "송정 여우비 호텔": ["松亭ヨウビホテル", "Songjeong Yeoubi Hotel"],
  "해운대 폴에이리조트": ["海雲台ポールAリゾート", "Haeundae Pol A Resort"],
  "광안리 호텔 프리마베라": ["広安里ホテルプリマヴェーラ", "Gwangalli Hotel Primavera"],
  "광안리 더클럽호텔": ["広安里ザ・クラブホテル", "Gwangalli The Club Hotel"],
  "마티에 오시리아": ["マティエオシリア", "Matie Osiria"],
  "해운대 광수호텔": ["海雲台クァンスホテル", "Haeundae Gwangsu Hotel"],
  "영도 그랜드베른 호텔": ["影島グランドベルンホテル", "Yeongdo Grand Bern Hotel"],
  "송정 모네의 여름": ["松亭モネの夏", "Songjeong Monet's Summer"],
  "아일랜드 호텔 부산": ["アイランドホテル釜山", "Island Hotel Busan"],
  "GP호텔 (지피호텔)": ["GPホテル", "GP Hotel"],
  "호텔아델라 부산 영도": ["ホテルアデラ釜山影島", "Hotel Adela Busan Yeongdo"],
  "그랩 디 오션 송도": ["グラブ・ジ・オーシャン松島", "Grab The Ocean Songdo"],
  "페어필드 바이 메리어트 송도비치": ["フェアフィールド・バイ・マリオット釜山松島ビーチ", "Fairfield by Marriott Busan Songdo Beach"],
  "라발스 호텔 부산": ["ラバルスホテル釜山", "Lavalse Hotel Busan"],
  "베이하운드 호텔 영도": ["ベイハウンドホテル影島", "Bayhound Hotel Yeongdo"],
  "브라운도트 서면1호점": ["ブラウンドット西面1号店", "Browndot Seomyeon No.1"],
  "서면 호텔 하이든": ["西面ホテルハイドン", "Seomyeon Hotel Haydn"],
  "서면 콤마": ["西面コンマ", "Seomyeon Comma"],
  "서면 그린비 호텔": ["西面グリーンビーホテル", "Seomyeon Greenbee Hotel"],
  "서면 호텔 치즈": ["西面ホテルチーズ", "Seomyeon Hotel Cheese"],
  "호텔 벨루스": ["ホテルベルース", "Hotel Bellus"],
  "서면 호텔 초원": ["西面ホテルチョウォン", "Seomyeon Hotel Chowon"],
  "서면 샤이어호텔": ["西面シャイアホテル", "Seomyeon Shire Hotel"],
  "서면 IB호텔 (아이비호텔)": ["西面IBホテル", "Seomyeon IB Hotel"],
  "서면 더클럽호텔": ["西面ザ・クラブホテル", "Seomyeon The Club Hotel"],
  "서면 라이온호텔": ["西面ライオンホテル", "Seomyeon Lion Hotel"],
  "서면 비즈니스 호텔 J7": ["西面ビジネスホテルJ7", "Seomyeon Business Hotel J7"],
  "서면 덴바스타 센트럴 호텔": ["西面デンバスタセントラルホテル", "Seomyeon Denbasta Central Hotel"],
  "서면 퀸스호텔": ["西面クイーンズホテル", "Seomyeon Queens Hotel"],
  "광안리 Y(와이호텔)": ["広安里Yホテル", "Gwangalli Y Hotel"],
  "호텔얌 광안리점": ["ホテルヤム広安里店", "Hotel Yam Gwangalli"],
  "해운대 호텔아라": ["海雲台ホテルアラ", "Haeundae Hotel Ara"],
  "광안리 언플랜드88 (10층)": ["広安里アンプランド88（10階）", "Gwangalli Unplanned 88 (10F)"],
  "송정 하운드호텔": ["松亭ハウンドホテル", "Songjeong Hound Hotel"],
  "해운대 송정스케치.K": ["海雲台松亭スケッチ.K", "Haeundae Songjeong Sketch.K"],
  "광안리 호텔 마레": ["広安里ホテルマーレ", "Gwangalli Hotel Mare"],
  "해운대 폴마레펜션(송정)": ["海雲台ポルマーレペンション（松亭）", "Haeundae Polmare Pension (Songjeong)"],
  "UH Suite The 해운대(하버타운 이용불가)": ["UH Suite The 海雲台（ハーバータウン利用不可）", "UH Suite The Haeundae (Harbour Town unavailable)"],
  "송정 빈티지하우스 펜션": ["松亭ヴィンテージハウスペンション", "Songjeong Vintage House Pension"],
  "서면 라라비안코 비즈니스 호텔": ["西面ララビアンコビジネスホテル", "Seomyeon Lala Bianco Business Hotel"],
  "해운대 피카소": ["海雲台ピカソ", "Haeundae Picasso"],
  "광안리 HY리얼티호텔": ["広安里HYリアルティホテル", "Gwangalli HY Realty Hotel"],
  "라비드아틀란 호텔 해운대2": ["ラ・ヴィ・ダトランホテル海雲台2", "La Vie d'Atlan Hotel Haeundae 2"],
  "하운드 해운대 2호점 가든&테라스": ["ハウンド海雲台2号店ガーデン&テラス", "Hound Haeundae No.2 Garden & Terrace"],
  "광안리 호텔 라움103": ["広安里ホテルラウム103", "Gwangalli Hotel Raum 103"],
  "부산 AG405": ["釜山AG405", "Busan AG405"],
  "해운대 센트럴 호텔": ["海雲台セントラルホテル", "Haeundae Central Hotel"],
  "광안리 디옴므 호텔": ["広安里ディオムホテル", "Gwangalli D'Homme Hotel"],
  "해운대 온다 호텔": ["海雲台オンダホテル", "Haeundae Onda Hotel"],
  "MS호텔 해운대": ["MSホテル海雲台", "MS Hotel Haeundae"],
  "해운대 JB디자인 호텔": ["海雲台JBデザインホテル", "Haeundae JB Design Hotel"],
  "호텔 일루아": ["ホテルイルア", "Hotel Illua"],
  "호텔 인트로 해운대": ["ホテルイントロ海雲台", "Hotel Intro Haeundae"],
  "호텔얌 해운대점": ["ホテルヤム海雲台店", "Hotel Yam Haeundae"],
  "YAJA 해운대점": ["YAJA海雲台店", "YAJA Haeundae"],
  "해운대 해리움호텔": ["海雲台ヘリウムホテル", "Haeundae Haerium Hotel"],
  "호텔 휘겔리 해운대": ["ホテルヒュゲリ海雲台", "Hotel Hyggelig Haeundae"],
  "해운대 호텔 여기어때": ["海雲台ホテルヨギオッテ", "Haeundae Hotel Yeogieottae"],
  "하운드호텔 해운대 시그니처": ["ハウンドホテル海雲台シグネチャー", "Hound Hotel Haeundae Signature"],
  "펠릭스 By STX 호텔": ["フェリックス by STXホテル", "Felix by STX Hotel"],
  "해운대 씨클라우드 호텔 앤 레지던스(6층)": ["海雲台シークラウドホテル&レジデンス（6階）", "Haeundae Sea Cloud Hotel & Residence (6F)"],
  "한화리조트 해운대": ["ハンファリゾート海雲台", "Hanwha Resort Haeundae"],
  "플레아드블랑 해운대": ["プレイアード・ブラン海雲台", "Pleiade Blanc Haeundae"],
  "해운대 호텔 폭시": ["海雲台ホテルフォクシー", "Haeundae Hotel Foxy"],
  "페어필드 바이 메리어트 해운대": ["フェアフィールド・バイ・マリオット釜山海雲台", "Fairfield by Marriott Busan Haeundae"],
  "파라다이스 호텔 부산(신관)": ["パラダイスホテル釜山（新館）", "Paradise Hotel Busan (New Wing)"],
  "파라다이스 호텔 부산(본관)": ["パラダイスホテル釜山（本館）", "Paradise Hotel Busan (Main Wing)"],
  "토요코인 부산해운대 2호점": ["東横INN釜山海雲台2", "Toyoko Inn Busan Haeundae No.2"],
  "해운대 클라우드 나인": ["海雲台クラウドナイン", "Haeundae Cloud Nine"],
  "코오롱 씨클라우드호텔(4층)": ["コーロン・シークラウドホテル（4階）", "Kolon Sea Cloud Hotel (4F)"],
  "이코노미 해운대": ["エコノミー海雲台", "Economy Haeundae"],
  "이비스 앰배서더 해운대": ["イビスアンバサダー釜山海雲台", "ibis Ambassador Busan Haeundae"],
  "이비스 버젯 앰배서더 해운대": ["イビスバジェットアンバサダー海雲台", "ibis budget Ambassador Haeundae"],
  "웨스틴조선 부산": ["ウェスティン朝鮮釜山", "The Westin Josun Busan"],
  "해운대 오렌지": ["海雲台オレンジ", "Haeundae Orange"],
  "해운대 오게스트": ["海雲台オゲスト", "Haeundae O'Guest"],
  "엘리시아 호텔 해운대": ["エリシアホテル海雲台", "Elysia Hotel Haeundae"],
  "해운대 S-one(에스원)": ["海雲台S-one", "Haeundae S-one"],
  "해운대 썬클라우드 호텔(6층)": ["海雲台サンクラウドホテル（6階）", "Haeundae Sun Cloud Hotel (6F)"],
  "신라스테이 해운대": ["新羅ステイ海雲台", "Shilla Stay Haeundae"],
  "해운대 싼타페": ["海雲台サンタフェ", "Haeundae Santa Fe"],
  "더 펫텔": ["ザ・ペッテル", "The Pettel"],
  "시그니엘 부산": ["シグニエル釜山", "Signiel Busan"],
  "해운대 쇼 호텔": ["海雲台ショーホテル", "Haeundae Show Hotel"],
  "해운대 소사이어티 호텔": ["海雲台ソサエティホテル", "Haeundae Society Hotel"],
  "해운대 센텀 호텔(센텀 빅토리아,센텀시티호텔 배송불가)": ["海雲台センタムホテル（センタムビクトリア・センタムシティホテルは配送不可）", "Haeundae Centum Hotel (no delivery to Centum Victoria/Centum City Hotel)"],
  "센텀프리머스호텔": ["センタムプリムスホテル", "Centum Primus Hotel"],
  "해운대 선셋 호텔": ["海雲台サンセットホテル", "Haeundae Sunset Hotel"],
  "해운대 호텔 V(브이)": ["海雲台ホテルV", "Haeundae Hotel V"],
  "부산도시공사 아르피나": ["釜山都市公社アルピナ", "Busan Metropolitan Corp. Arpina"],
  "해운대 베이몬드 호텔": ["海雲台ベイモンドホテル", "Haeundae Baymond Hotel"],
  "베스트웨스턴 해운대 호텔": ["ベストウェスタン海雲台ホテル", "Best Western Haeundae Hotel"],
  "베스트 루이스 해밀턴 해운대": ["ベストルイスハミルトン海雲台", "Best Louis Hamilton Haeundae"],
  "베니키아 호텔 해운대": ["ベニキアホテル海雲台", "Benikea Hotel Haeundae"],
  "마리안느 호텔": ["マリアンヌホテル", "Marianne Hotel"],
  "미포 오션사이드 호텔": ["尾浦オーシャンサイドホテル", "Mipo Oceanside Hotel"],
  "해운대 모모쥬스": ["海雲台モモジュース", "Haeundae Momo Juice"],
  "해운대 더반호텔": ["海雲台ザ・バンホテル", "Haeundae The Ban Hotel"],
  "라마다 앙코르 바이 윈덤 해운대": ["ラマダアンコール by ウィンダム海雲台", "Ramada Encore by Wyndham Haeundae"],
  "해운대 더베이 호텔": ["海雲台ザ・ベイホテル", "Haeundae The Bay Hotel"],
  "노엘 비즈니스 호텔": ["ノエルビジネスホテル", "Noel Business Hotel"],
  "그린나래 호텔 해운대": ["グリンナレホテル海雲台", "Greennarae Hotel Haeundae"],
  "그랜드조선 부산": ["グランド朝鮮釜山", "Grand Josun Busan"],
  "해운대 게리쿠퍼": ["海雲台ゲイリークーパー", "Haeundae Gary Cooper"],
  "호텔 센트럴베이 광안": ["ホテルセントラルベイ広安", "Hotel Central Bay Gwangan"],
  "광안리 더뷰 게스트하우스": ["広安里ザ・ビューゲストハウス", "Gwangalli The View Guesthouse"],
  "광안리 호텔1(호텔원)": ["広安里ホテル1（ホテルワン）", "Gwangalli Hotel 1 (Hotel One)"],
  "광안리 호텔 메종": ["広安里ホテルメゾン", "Gwangalli Hotel Maison"],
  "뉴시즈 광안 호텔(구 런더너)": ["ニューシーズ広安ホテル（旧ロンドナー）", "New Seas Gwangan Hotel (former Londoner)"],
  "호메르스 호텔": ["ホメルスホテル", "Homers Hotel"],
  "광안리 하운드호텔": ["広安里ハウンドホテル", "Gwangalli Hound Hotel"],
  "광안리 문 베이 호텔 (문베이관광호텔)": ["広安里ムーンベイホテル（ムーンベイ観光ホテル）", "Gwangalli Moon Bay Hotel"],
  "광안리 투헤븐": ["広安里トゥヘブン", "Gwangalli To Heaven"],
  "켄트호텔 광안리": ["ケントホテル広安里", "Kent Hotel Gwangalli"],
  "광안리 오션투헤븐 호텔": ["広安里オーシャントゥヘブンホテル", "Gwangalli Ocean To Heaven Hotel"],
  "광안리 오션스테이 호텔": ["広安里オーシャンステイホテル", "Gwangalli Ocean Stay Hotel"],
  "광안리 호텔 오션뷰": ["広安里ホテルオーシャンビュー", "Gwangalli Hotel Ocean View"],
  "H-에비뉴 광안리해변점(오션브릿지)": ["H-アベニュー広安里海辺店（オーシャンブリッジ）", "H-Avenue Gwangalli Beach (Ocean Bridge)"],
  "H-에비뉴 광안리점(바다마루)": ["H-アベニュー広安里店（バダマル）", "H-Avenue Gwangalli (Badamaru)"],
  "호텔 아쿠아 펠리스": ["ホテルアクアパレス", "Hotel Aqua Palace"],
  "광안리 씨유": ["広安里シーユー", "Gwangalli See U"],
  "광안리 보나트리호텔": ["広安里ボナツリーホテル", "Gwangalli Bona Tree Hotel"],
  "베스트 루이스 해밀턴 광안": ["ベストルイスハミルトン広安", "Best Louis Hamilton Gwangan"],
  "광안리 호텔 망고": ["広安里ホテルマンゴー", "Gwangalli Hotel Mango"],
  "오션 더포인트 호텔": ["オーシャン・ザ・ポイントホテル", "Ocean The Point Hotel"],
  "광안리 넘버25": ["広安里ナンバー25", "Gwangalli Number 25"],
  "광안리 그레이 193": ["広安里グレー193", "Gwangalli Gray 193"],
  "광안리 누리 호텔": ["広安里ヌリホテル", "Gwangalli Nuri Hotel"],
  "아난티 앳 부산 코브": ["アナンティ・アット釜山コーブ", "Ananti at Busan Cove"],
  "송정 올라호텔": ["松亭オラホテル", "Songjeong Olla Hotel"],
  "아난티 코브(펜트하우스)": ["アナンティコーブ（ペントハウス）", "Ananti Cove (Penthouse)"],
  "송정 호텔": ["松亭ホテル", "Songjeong Hotel"],
  "브라운도트 송정점": ["ブラウンドット松亭店", "Browndot Songjeong"],
  "마린케이 풀빌라펜션(송정)": ["マリンKプールヴィラペンション（松亭）", "Marine K Pool Villa Pension (Songjeong)"],
  "송정 라온호텔": ["松亭ラオンホテル", "Songjeong Raon Hotel"],
  "서면 하운드호텔": ["西面ハウンドホテル", "Seomyeon Hound Hotel"],
  "하운드호텔 서면 범천": ["ハウンドホテル西面凡川", "Hound Hotel Seomyeon Beomcheon"],
  "서면 티티 호텔": ["西面ティティホテル", "Seomyeon Titi Hotel"],
  "서면 TRT호텔": ["西面TRTホテル", "Seomyeon TRT Hotel"],
  "토요코인 부산서면점": ["東横INN釜山西面", "Toyoko Inn Busan Seomyeon"],
  "아바니 센트럴 부산": ["アバニセントラル釜山", "Avani Central Busan"],
  "아르반 호텔": ["アルバンホテル", "Arban Hotel"],
  "솔라리아 니시테츠 부산": ["ソラリア西鉄ホテル釜山", "Solaria Nishitetsu Hotel Busan"],
  "브라운도트 서면역점 비즈니스": ["ブラウンドット西面駅店ビジネス", "Browndot Seomyeon Station Business"],
  "브라운도트 서면 범천점(골드)": ["ブラウンドット西面凡川店（ゴールド）", "Browndot Seomyeon Beomcheon (Gold)"],
  "부산 비즈니스 호텔(서면)": ["釜山ビジネスホテル（西面）", "Busan Business Hotel (Seomyeon)"],
  "롯데호텔 부산": ["ロッテホテル釜山", "Lotte Hotel Busan"],
  "서면 경성여관": ["西面京城旅館", "Seomyeon Gyeongseong Inn"],
  "뉴시즈 센텀호텔": ["ニューシーズセンタムホテル", "New Seas Centum Hotel"],
  "파크 하얏트 부산": ["パークハイアット釜山", "Park Hyatt Busan"],
};

export function localizeZimcarryHotelName(
  name: string,
  lang: SubwayNameLanguage,
): string {
  if (lang === "ko") return name;
  const entry = NAME_L10N[name];
  if (!entry) return name; // 미등록은 원문 유지 — 지어내지 않는다
  return lang === "ja" ? entry[0] : entry[1];
}

// ── 주소 로마자 변환 (국어의 로마자 표기법 기반, 도로명주소 영문 표기 형식) ──
// 해외 예약 플랫폼 관례대로 ja/en 모두 로마자 주소를 쓴다. 한자 변환은 지어내지 않는다.

const INIT = ["g", "kk", "n", "d", "tt", "r", "m", "b", "pp", "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"];
const MED = ["a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa", "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"];
const FIN = ["", "k", "k", "k", "n", "n", "n", "t", "l", "k", "m", "p", "l", "l", "p", "l", "m", "p", "p", "t", "t", "ng", "t", "t", "k", "t", "p", "t"];
// 다음 음절이 모음(ㅇ)으로 시작할 때 연음되는 받침 표기
const FIN_LIAISON = ["", "g", "kk", "gs", "n", "nj", "nh", "d", "r", "lg", "lm", "lb", "ls", "lt", "lp", "lh", "m", "b", "bs", "s", "ss", "ng", "j", "ch", "k", "t", "p", "h"];

function romanizeHangul(word: string): string {
  const chars = Array.from(word);
  let out = "";
  let prevFinal = 0;
  for (const ch of chars) {
    const code = ch.charCodeAt(0) - 0xac00;
    if (code < 0 || code > 11171) {
      if (prevFinal) out += FIN[prevFinal];
      prevFinal = 0;
      out += ch;
      continue;
    }
    const ini = Math.floor(code / 588);
    const med = Math.floor((code % 588) / 28);
    let initial = INIT[ini];
    if (prevFinal) {
      const f = FIN[prevFinal];
      if (ini === 11) {
        out += FIN_LIAISON[prevFinal]; // 연음: 목+운 → mogun
        initial = "";
      } else if (ini === 5) {
        // ㄹ 자음동화: 황령→Hwangnyeong, 봉래→Bongnae, 신라→Silla, 백로→Baengno
        if (f === "ng" || f === "m") { out += f; initial = "n"; }
        else if (f === "n" || f === "l") { out += "l"; initial = "l"; }
        else if (f === "k") { out += "ng"; initial = "n"; }
        else if (f === "p") { out += "m"; initial = "n"; }
        else out += f;
      } else {
        out += f;
      }
    }
    out += initial;
    out += MED[med];
    prevFinal = code % 28;
  }
  if (prevFinal) out += FIN[prevFinal];
  return out;
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const ADMIN_SUFFIX: Record<string, string> = { 구: "gu", 군: "gun", 읍: "eup", 면: "myeon" };

function romanizeAdmin(unit: string): string {
  const suffix = ADMIN_SUFFIX[unit.slice(-1)];
  return `${capitalize(romanizeHangul(unit.slice(0, -1)))}-${suffix}`;
}

// "X대로"가 대로(daero)가 아니라 "X대+로"인 예외 (등대로 = 등대 + 로)
const ROAD_EXCEPTIONS: Record<string, string> = { 등대로: "Deungdae-ro" };

function romanizeRoad(road: string): string {
  if (ROAD_EXCEPTIONS[road]) return ROAD_EXCEPTIONS[road];
  const beonga = road.match(/^(.*?)(\d+)번가길$/);
  if (beonga) return `${romanizeRoad(beonga[1])} ${beonga[2]}beonga-gil`;
  const beon = road.match(/^(.*?)(\d+)번길$/);
  if (beon) return `${romanizeRoad(beon[1])} ${beon[2]}beon-gil`;
  const m = road.match(/^(.*?)(\d*)(대로|로|길)$/);
  if (!m) return capitalize(romanizeHangul(road));
  const suffix = { 대로: "daero", 로: "ro", 길: "gil" }[m[3]]!;
  const stem = capitalize(romanizeHangul(m[1]));
  return m[2] ? `${stem} ${m[2]}-${suffix}` : `${stem}-${suffix}`;
}

// "부산 [구/군] [읍/면?] [도로명] [번호]" — 뒤따르는 법정동·건물 표기는 표시에서 제외
const ADDRESS_RX = /^부산\s+(\S+[구군])\s+((?:\S+[읍면]\s+)?)(\S*?(?:대로|로|길))\s+([\d-]+)/;

export function localizeZimcarryHotelAddress(
  address: string,
  lang: SubwayNameLanguage,
): string {
  if (lang === "ko") return address;
  const m = address.match(ADDRESS_RX);
  if (!m) return address; // 파싱 불가 시 원문 유지
  const [, district, subTown, road, num] = m;
  const parts = [`${num} ${romanizeRoad(road)}`];
  if (subTown.trim()) parts.push(romanizeAdmin(subTown.trim()));
  parts.push(romanizeAdmin(district), "Busan");
  return parts.join(", ");
}
