/**
 * 반나절 · 半日 · Half Day — mock data + i18n 문자열
 * 디자인 핸드오프 부록 A 스키마 / 부록 B 수치를 그대로 사용.
 * 수치·요금·시각은 언어 무관 원본 유지(§7-③). 고유명사는 name(주언어) + orig(원문) 병기.
 */

export type Lang = "ko" | "ja" | "en";
export type L10n<T = string> = Record<Lang, T>;

export const LANGS: { code: Lang; label: string; short: string }[] = [
  { code: "ko", label: "한국어", short: "한국어" },
  { code: "ja", label: "日本語", short: "日本語" },
  { code: "en", label: "English", short: "English" },
];

export const OB: L10n<{ tagline: string; pick: string }> = {
  ko: { tagline: "짐을 내려놓으면, 마지막 반나절이 여행이 됩니다.", pick: "언어를 선택해 주세요" },
  ja: { tagline: "荷物を下ろせば、最後の半日が旅になる。", pick: "言語を選んでください" },
  en: { tagline: "Set your bags down — your last half day becomes a trip.", pick: "Choose your language" },
};

export interface UiStrings {
  inputPlaceholder: string;
  source: string;
  detail: string;
  pickTogo: string;
  held: string;
  walkEst: string;
  reserve: string;
  mapTitle: string;
  back: string;
  xl: string;
  medium: string;
  small: string;
  large: string;
  slots: string;
  poiStation: string;
  walkMin: (n: number) => string;
  distFromPoi: (m: number) => string;
  cong: [string, string, string, string];
  congAdvice: string;
  lockerTitle: string;
  pickupTitle: string;
  pickupDropOff: string;
  pickupCollect: string;
  floor: string;
  asOf: string;
  choicesQ: string;
  choices: [string, string, string];
  retry: string;
  netErr: string;
  loadingPoi: string;
  loadingLocker: string;
  loadingCong: string;
  loadingRag: string;
  noResult: string;
  officialCh: string;
  langSheetTitle: string;
  edgeTitle: string;
  edgeHint: string;
  citedFrom: string;
  altTitle: string;
  reserveNote: string;
}

export const UI: L10n<UiStrings> = {
  ko: {
    inputPlaceholder: "보관함·짐 픽업·갈 만한 곳을 물어보세요",
    source: "출처 보기", detail: "상세 보기", pickTogo: "여기로 갈래",
    held: "2026 기준 보유 개수 기준 · 실시간 잔여 아님", walkEst: "직선거리 기준 추정",
    reserve: "짐캐리에서 예약하기", mapTitle: "지도", back: "채팅으로 돌아가기",
    xl: "특대", medium: "중", small: "소", large: "대", slots: "개",
    poiStation: "인근 역", walkMin: (n) => `도보 ${n}분`, distFromPoi: (m) => `여기서 ${m}m`,
    cong: ["여유", "보통", "혼잡", "심함"],
    congAdvice: "오전을 추천해요.",
    lockerTitle: "보관함", pickupTitle: "짐캐리 픽업",
    pickupDropOff: "숙소 프론트 맡김", pickupCollect: "거점 수령", floor: "층", asOf: "기준",
    choicesQ: "무엇을 도와드릴까요? 아래에서 골라주세요.",
    choices: ["관광지 추천", "짐 보관", "이용 방법"],
    retry: "다시 시도", netErr: "연결이 원활하지 않아요. 잠시 후 다시 시도해 주세요.",
    loadingPoi: "갈 만한 곳을 찾고 있어요…", loadingLocker: "보관함을 찾고 있어요…",
    loadingCong: "혼잡 데이터를 확인하고 있어요…", loadingRag: "이용 안내 문서를 찾고 있어요…",
    noResult: "조건에 맞는 결과를 찾지 못했어요.", officialCh: "공식 채널로 문의하기",
    langSheetTitle: "언어 선택", edgeTitle: "상태 · 엣지 케이스 데모",
    edgeHint: "심사 시연용 — 각 상태의 대응 UI를 대화에 삽입해요.",
    citedFrom: "문서 근거", altTitle: "한 정거장 거리 대안",
    reserveNote: "예약은 짐캐리 사이트에서 가능해요",
  },
  ja: {
    inputPlaceholder: "ロッカー・集荷・観光地を質問できます",
    source: "出典を見る", detail: "詳しく見る", pickTogo: "ここに行く",
    held: "2026年基準 · 保有数ベース · リアルタイム残数ではありません", walkEst: "直線距離の目安",
    reserve: "ジムキャリーで予約する", mapTitle: "地図", back: "チャットに戻る",
    xl: "特大", medium: "中", small: "小", large: "大", slots: "個",
    poiStation: "最寄り駅", walkMin: (n) => `徒歩${n}分`, distFromPoi: (m) => `ここから${m}m`,
    cong: ["ゆとり", "ふつう", "混雑", "非常に混雑"],
    congAdvice: "午前がおすすめです。",
    lockerTitle: "ロッカー", pickupTitle: "ジムキャリー集荷",
    pickupDropOff: "宿泊先フロントに預ける", pickupCollect: "拠点で受取", floor: "階", asOf: "時点",
    choicesQ: "何をお手伝いしましょう？下から選んでください。",
    choices: ["観光地のおすすめ", "荷物を預ける", "使い方"],
    retry: "再試行", netErr: "接続が不安定です。しばらくして再度お試しください。",
    loadingPoi: "行き先を探しています…", loadingLocker: "ロッカーを探しています…",
    loadingCong: "混雑データを確認しています…", loadingRag: "利用案内の文書を探しています…",
    noResult: "条件に合う結果が見つかりませんでした。", officialCh: "公式チャネルに問い合わせる",
    langSheetTitle: "言語を選択", edgeTitle: "状態 · エッジケースのデモ",
    edgeHint: "審査デモ用 — 各状態の対応UIを会話に挿入します。",
    citedFrom: "文書の根拠", altTitle: "一駅先の代わりの駅",
    reserveNote: "予約はジムキャリーのサイトで行えます",
  },
  en: {
    inputPlaceholder: "Ask about lockers, pickup, or places to go",
    source: "View source", detail: "View details", pickTogo: "Go here",
    held: "As of 2026 · based on total lockers · not live availability", walkEst: "Est. from straight-line distance",
    reserve: "Reserve on GimCarry", mapTitle: "Map", back: "Back to chat",
    xl: "XL", medium: "M", small: "S", large: "L", slots: "",
    poiStation: "Nearest station", walkMin: (n) => `${n} min walk`, distFromPoi: (m) => `${m}m away`,
    cong: ["Light", "Moderate", "Busy", "Very busy"],
    congAdvice: "Mornings are recommended.",
    lockerTitle: "Locker", pickupTitle: "GimCarry pickup",
    pickupDropOff: "Leave at hotel front", pickupCollect: "Collect at hub", floor: "Floor", asOf: "as of",
    choicesQ: "How can I help? Pick one below.",
    choices: ["Recommend spots", "Store luggage", "How to use"],
    retry: "Retry", netErr: "Connection is unstable. Please try again shortly.",
    loadingPoi: "Finding places to go…", loadingLocker: "Finding lockers…",
    loadingCong: "Checking crowd data…", loadingRag: "Finding the usage guide…",
    noResult: "No results matched your criteria.", officialCh: "Contact official channel",
    langSheetTitle: "Select language", edgeTitle: "State · edge-case demos",
    edgeHint: "For the judging demo — inserts each state's UI into the chat.",
    citedFrom: "Document evidence", altTitle: "Alternative station one stop away",
    reserveNote: "Reservation is available on the GimCarry site",
  },
};

// ── 역 (부록 B) ──────────────────────────────
export type StationId = "nampo" | "busan" | "jagalchi";

export const STATIONS: Record<StationId, { name: L10n; orig: string; xl: number; line: number }> = {
  nampo: { name: { ko: "남포역", ja: "南浦駅", en: "Nampo Stn." }, orig: "남포역", xl: 56, line: 1 },
  busan: { name: { ko: "부산역", ja: "釜山駅", en: "Busan Stn." }, orig: "부산역", xl: 78, line: 1 },
  jagalchi: { name: { ko: "자갈치역", ja: "チャガルチ駅", en: "Jagalchi Stn." }, orig: "자갈치역", xl: 45, line: 1 },
};

export const FEE_XL = { amount: "6,000원", per: { ko: "3시간", ja: "3時間", en: "3 hrs" } as L10n };

// ── 관광지 (recommend_poi) ──────────────────
export interface Poi {
  id: string;
  name: L10n;
  orig: string;
  station: StationId;
  walk_min: number;
  xl_locker_count: number;
  tags: L10n<string[]>;
  image: boolean;
  x: number;
  y: number;
}

export const POIS: Poi[] = [
  { id: "gamcheon", name: { ko: "감천문화마을", ja: "甘川文化村", en: "Gamcheon Culture Village" }, orig: "감천문화마을", station: "nampo", walk_min: 8, xl_locker_count: 56, tags: { ko: ["예술", "사진"], ja: ["アート", "写真"], en: ["Art", "Photo"] }, image: true, x: 0.3, y: 0.68 },
  { id: "biff", name: { ko: "BIFF광장", ja: "BIFF広場", en: "BIFF Square" }, orig: "BIFF광장", station: "nampo", walk_min: 4, xl_locker_count: 56, tags: { ko: ["거리음식"], ja: ["グルメ"], en: ["Street food"] }, image: false, x: 0.52, y: 0.44 },
  { id: "gukje", name: { ko: "국제시장", ja: "国際市場", en: "Gukje Market" }, orig: "국제시장", station: "nampo", walk_min: 6, xl_locker_count: 56, tags: { ko: ["시장", "쇼핑"], ja: ["市場", "買い物"], en: ["Market", "Shopping"] }, image: true, x: 0.6, y: 0.55 },
  { id: "yongdusan", name: { ko: "용두산공원", ja: "龍頭山公園", en: "Yongdusan Park" }, orig: "용두산공원", station: "nampo", walk_min: 5, xl_locker_count: 56, tags: { ko: ["전망", "공원"], ja: ["展望", "公園"], en: ["View", "Park"] }, image: true, x: 0.44, y: 0.36 },
];

// ── 보관함 (search_locker) + 혼잡(get_congestion) ──
export interface Congestion {
  grade: 1 | 2 | 3 | 4;
  peak: L10n;
  sample: L10n;
}

export interface Locker {
  id: string;
  station: StationId;
  xl_count: number;
  fee: typeof FEE_XL;
  detail_loc: { floor: string; exits: L10n };
  distance_m: number;
  congestion: Congestion | null;
  x?: number;
  y?: number;
  /** 데모용 근사 좌표 (카카오맵 마커) */
  lat?: number;
  lng?: number;
}

export const LOCKERS: Locker[] = [
  {
    id: "lk-nampo", station: "nampo", xl_count: 56, fee: FEE_XL,
    detail_loc: { floor: "B1", exits: { ko: "3·4·6번 출입구 방향", ja: "3・4・6番出口方向", en: "toward Exits 3·4·6" } },
    distance_m: 120,
    congestion: { grade: 3, peak: { ko: "주말 14~17시", ja: "週末14〜17時", en: "weekends 14–17" }, sample: { ko: "2025년 승하차 데이터", ja: "2025年 乗降データ", en: "2025 ridership data" } },
    x: 0.5, y: 0.5, lat: 35.0977, lng: 129.0272,
  },
  {
    id: "lk-jagalchi", station: "jagalchi", xl_count: 45, fee: FEE_XL,
    detail_loc: { floor: "B1", exits: { ko: "7번 출입구 방향", ja: "7番出口方向", en: "toward Exit 7" } },
    distance_m: 600,
    congestion: { grade: 2, peak: { ko: "평일 저녁", ja: "平日夕方", en: "weekday evenings" }, sample: { ko: "2025년 승하차 데이터", ja: "2025年 乗降データ", en: "2025 ridership data" } },
    x: 0.34, y: 0.6, lat: 35.0979, lng: 129.0207,
  },
];

// 대안 역 (인근 특대 없음 케이스)
export const ALT_LOCKER: Locker = {
  id: "lk-busan", station: "busan", xl_count: 78, fee: FEE_XL,
  detail_loc: { floor: "1F", exits: { ko: "중앙 대합실", ja: "中央待合室", en: "central hall" } },
  distance_m: 1800,
  congestion: { grade: 4, peak: { ko: "승차 18~19시", ja: "乗車18〜19時", en: "boarding 18–19" }, sample: { ko: "2025년 승하차 데이터", ja: "2025年 乗降データ", en: "2025 ridership data" } },
};

// ── 혼잡 타임라인 (시트 확장형) 남포역 예시 ──
// grade 1~4, 요일(월~일) × 시간대(09,12,15,18)
export const CONGESTION_WEEK = {
  hours: ["09", "12", "15", "18"],
  days: {
    ko: ["월", "화", "수", "목", "금", "토", "일"],
    ja: ["月", "火", "水", "木", "金", "土", "日"],
    en: ["M", "T", "W", "T", "F", "S", "S"],
  } as L10n<string[]>,
  grid: [
    [1, 2, 2, 2], [1, 2, 2, 2], [1, 2, 2, 3], [1, 2, 2, 3], [2, 2, 3, 3],
    [2, 3, 4, 3], [2, 3, 4, 3],
  ],
};

// ── RAG (요금·이용법) ────────────────────────
export const RAG_FEE = {
  answer: {
    ko: "특대형 보관함은 6,000원 / 3시간이에요. 교통카드나 신용카드로 결제하고, 화면 안내에 따라 칸을 열면 돼요. 3시간 초과 시 추가 요금이 붙어요.",
    ja: "特大ロッカーは 6,000원 / 3時間 です。交通カードかクレジットカードで決済し、画面の案内に従って扉を開けます。3時間を超えると追加料金がかかります。",
    en: "The XL locker is 6,000원 / 3 hrs. Pay by transit or credit card and open the door following the on-screen guide. Exceeding 3 hrs adds a surcharge.",
  } as L10n,
  as_of: "2025.06",
  sources: [
    {
      id: "s1", name: { ko: "위드락커 이용안내", ja: "ウィズロッカー利用案内", en: "WithLocker User Guide" } as L10n, as_of: "2025.06",
      quote: { ko: "특대형 6,000원(3시간 기준). 초과 30분당 1,000원.", ja: "特大 6,000원（3時間）。超過30分ごとに1,000원。", en: "XL 6,000원 (3 hrs). +1,000원 per extra 30 min." } as L10n,
    },
    {
      id: "s2", name: { ko: "부산교통공사 물품보관함 안내", ja: "釜山交通公社 コインロッカー案内", en: "Busan Transport Corp. Locker Guide" } as L10n, as_of: "2025.03",
      quote: { ko: "결제는 교통·신용카드. 지정 시간 초과 시 자동 정산.", ja: "決済は交通・クレジットカード。指定時間超過で自動精算。", en: "Pay by transit/credit card; auto-settled if time exceeded." } as L10n,
    },
  ],
};

// 근거 없는 질문 (경계 응답)
export const BOUNDARY_CHANNELS: L10n[] = [
  { ko: "짐캐리 고객센터", ja: "ジムキャリー カスタマーセンター", en: "GimCarry Support" },
  { ko: "부산교통공사", ja: "釜山交通公社", en: "Busan Transport Corp." },
];

export const t = <T,>(obj: L10n<T>, lang: Lang): T => (obj[lang] != null ? obj[lang] : obj.ko);

// ── ZimCarry 실데이터 (부산 무인 보관함 + 이용안내 + FAQ) ──
export const ZC = {
  hours: "05:00 ~ 익일 00:00",
  hoursNote: "역마다 운영시간이 다르니 운영 시간 확인이 필요하다. 24시간 운영점은 별도로 (24H)로 표기된다 (예: 대구 동성로 보관함(24H)).",
  steps: [
    { n: 1, title: "무인 보관함 방문", desc: "보관하실 물품을 가지고 가까운 무인보관함을 방문해 주세요. 온라인 예약 서비스는 준비 중입니다." },
    { n: 2, title: "이용할 보관함 선택", desc: "보관할 물건의 크기에 맞는 보관함의 번호를 선택해 주세요." },
    { n: 3, title: "비밀번호 설정 및 결제", desc: "비밀번호를 설정하고 기본 이용 시간인 4시간에 대한 요금을 결제해 주세요. 4시간 이후에는 시간 당 요금이 추가됩니다." },
    { n: 4, title: "물품 보관", desc: "보관함 문이 열리면 물품을 보관하고 문을 반드시 닫아주세요." },
  ],
  pricing: [
    { size: "소형", base: "2,000원", add: "+2,000원 / 12시간" },
    { size: "중형", base: "3,000원", add: "+3,000원 / 12시간" },
    { size: "대형", base: "4,000원", add: "+4,000원 / 12시간" },
  ],
  sizes: [
    { type: "소형", label: "S사이즈 가방", dim: "좌우 45cm × 깊이 56cm × 높이 30cm" },
    { type: "중형", label: "M1 중형 기내용 캐리어", dim: "좌우 45cm × 깊이 56cm × 높이 45cm" },
    { type: "중대형", label: "M2 중대형 수하물 캐리어", dim: "좌우 45cm × 깊이 56cm × 높이 60cm" },
    { type: "대형", label: "L 대형 26인치 이상 캐리어", dim: "좌우 45cm × 깊이 56cm × 높이 90cm" },
  ],
  pricingNote: "기본 4시간(시작 ~ 4시간 이내) 요금이며, 4시간 이후에는 12시간마다 추가 요금이 반복 부과된다.",
  lockers: [
    { place: "씨클라우드호텔", area: "해운대", loc: "1층 로비", count: 16, lat: 35.1604439324117, lng: 129.162247021768, url: "https://map.kakao.com/link/search/부산 해운대 씨클라우드 호텔" },
    { place: "롯데면세점 8층", area: "광복·남포", loc: "안내데스크 옆", count: 25, lat: 35.156789983664, lng: 129.056416218143, url: "https://map.kakao.com/link/search/롯데면세점 부산점" },
    { place: "KT&G 상상마당 부산", area: "광복·남포", loc: "1층", count: 27, lat: 35.1542604, lng: 129.0572997, url: "https://map.kakao.com/link/search/KT&G 상상마당 부산" },
  ],
  faq: {
    짐배송: [
      { q: "[해외서비스] 서비스 예약자명과 호텔 예약자명이 같아야 하나요?", a: "아니오. 서비스/호텔 예약자명이 달라도 예약이 가능합니다. 호텔로 배송은 반드시 예약자명과 함께 도착 호텔의 예약자명을 정확히 입력해주시면 됩니다." },
      { q: "[해외서비스] 호텔에는 미리 연락해야 하나요?", a: "아니오. 고객님께서 호텔에 개인적으로 연락하실 필요 없습니다. 호텔에는 미리 연락할 필요 없이 서비스 이용 당일 호텔 프론트에 헬프카드를 보여주시고 맡기시면 됩니다." },
      { q: "사진 등록은 어떻게 하는 건가요?", a: "사진 등록 방법: 1) 알림톡에서 예약조회 링크를 선택합니다. 2) 짐배송 예약 내역에서 사진등록 버튼을 누릅니다. 3) 맡기실 짐을 사진으로 촬영합니다. 사진 등록 TIP: 가방이 2개 이상이라면 한번에 촬영해주세요. 등록된 사진은 추후 주소지 확인/가방 파손 등 확인 자료가 되므로 사진 미등록으로 인해 불이익이 발생할 수 있습니다. 사진 등록에 실패했거나 변경을 원할 경우, 짐배송 서비스 문의를 통해 담당자에게 [성함, 예약 번호, 짐 사진]을 전달해 주세요." },
      { q: "예약을 취소/환불 받고 싶어요.", a: "짐캐리의 예약 취소/환불은 다음과 같이 이루어집니다. 1) 홈페이지 예약: 서비스 이용 전날까지 카카오톡 채널 '짐캐리'를 통해 예약을 취소한 경우 결제 금액을 환불받을 수 있습니다. 서비스 이용 당일에는 취소가 가능하지만 환불은 불가합니다. 2) 짐캐리 매장 현장접수: 영수증을 지참한 경우 취소/환불이 가능합니다. 단, 고객님의 수하물 운송이 시작되면 취소/환불이 불가합니다. 3) 타 플랫폼 예약: 예약하신 플랫폼의 취소/환불 규정을 참고해주세요." },
      { q: "예약을 변경하고 싶어요.", a: "숙소명을 오기재했거나 숙소 또는 이용 일자에 변동이 있으신 경우, 카카오톡 채널 '짐캐리'를 통해 서비스 이용 전날까지 변경 내용을 남겨주시면 예약 내용 수정을 도와드립니다." },
      { q: "[숙소->역/공항] 구간은 짐을 언제 가지러 오시나요?", a: "[숙소->역/공항] 구간은 고객님께서 체크아웃 시간과 관계없이 11:00까지 숙소 프론트에 짐을 맡겨주셔야 하며, 맡기실 때 짐캐리 서비스 이용 예정이라고 말씀해주시면 저희가 픽업해서 역/공항으로 짐을 운송합니다. 인천공항점은 예외로 숙소에 짐 맡기는 시간이 10시까지입니다. 픽업된 짐은 오후 3시 이후부터 매장에서 찾으실 수 있으며, 영업시간 내에 찾아가지 못한 짐은 하루당 보관료에 따른 추가요금이 부과됩니다." },
      { q: "짐캐리 배송서비스는 제휴 호텔만 가능한가요?", a: "짐캐리 배송서비스는 제휴호텔 이외에도 현재 홈페이지에 등록되어 있는 숙소에 숙박하시면 이용이 가능합니다. 이용 원하시는 숙소가 제휴호텔에 없다면 카카오톡 채널 '짐캐리'로 숙소등록 문의 바랍니다. 에어비앤비/자택주소 배송은 짐캐리 사이트에서 주소지배송과 '코레일톡' 어플에서 이용 전날 오후 11시까지 예약 가능합니다. 상세주소와 보관장소를 정확히 알려주셔야 하며 설정하신 주소지로 수거/배송됩니다. 요금은 거리와 크기에 따라 달라질 수 있습니다. 수거는 오전 11시까지 문앞에 두고 알림톡에서 사진촬영 부탁드리며, 배송은 당일 오후 4~7시 사이 직접 받으시거나 부재 시 문앞에 배송됩니다. 인천공항 매장 이용 시 출발지에서 맡기는 시간 10시까지, 매장에 맡기는 시간 14시까지입니다." },
      { q: "짐캐리 배송예약 마감은 언제인가요?", a: "짐캐리 배송 예약은 다음과 같이 이루어집니다. 1) 홈페이지 예약: 서비스 이용 당일 11시까지 홈페이지에서 예약할 수 있습니다(단, 인천공항점은 10시입니다). 2) 당일 현장 접수: 짐캐리 매장에서 15시 이전(제주 14시 이전)까지 현장 접수 가능합니다(단, 인천공항점은 14시입니다). 단, 당일 현장 접수의 경우 배송 서비스가 조기 마감되면 이용이 불가할 수 있습니다." },
      { q: "[역/공항->숙소] 구간 이용 시 숙소에서 짐은 언제 받아볼 수 있나요?", a: "숙소 프론트에 16:00~19:00 사이에 순차적으로 도착합니다. 숙소 도착시간은 운송 당일 교통 상황, 경로에 따라 상이하여 정확한 시간을 지정할 수 없는 점 양해 부탁드립니다." },
      { q: "짐이 파손되거나 분실되면 어떡하나요?", a: "수하물의 분실 및 손실이 발생한 경우 짐캐리의 실수로 발생한 것을 입증해야 하며, 입증 시 보상의 최대 금액은 1,000,000원입니다. 상세한 내용은 주문 신청 시 약관을 참고해주시기 바랍니다." },
    ],
  },
};

// SUBWAY 부산 지하철 짐 보관함 (위드락커, Open API 실시간 · 표시는 보유 칸수) — page1/71
export const SUBWAY_FEE = "소 2,000 · 중 3,000 · 대 4,000 · 특대 6,000원 (3시간당)";
export const SUBWAY_TOTAL = 71;

export interface SubwayLocker {
  id: string;
  name: string;
  line: number;
  loc: string;
  s: number;
  m: number;
  l: number;
  xl: number;
}

export const SUBWAY_LOCKERS: SubwayLocker[] = [
  { id: "dadaepo-beach", name: "다대포해수욕장", line: 1, loc: "(B1) 대합실 고객센터 근처", s: 3, m: 8, l: 0, xl: 7 },
  { id: "dadaepo-port", name: "다대포항", line: 1, loc: "(B1) 표내는 곳 인근, 1번 엘리베이터 옆", s: 6, m: 4, l: 0, xl: 2 },
  { id: "hadan", name: "하단", line: 1, loc: "(B1) 1번 엘리베이터 옆, 3번출입구 방향", s: 10, m: 10, l: 1, xl: 7 },
  { id: "goejeong", name: "괴정", line: 1, loc: "(B1) 3번출입구 방향", s: 4, m: 4, l: 1, xl: 2 },
  { id: "toseong", name: "토성", line: 1, loc: "(B1) 표내는 곳 인근, 3번출입구 방향", s: 6, m: 6, l: 0, xl: 7 },
  { id: "jagalchi", name: "자갈치", line: 1, loc: "(B1) 표내는 곳 인근, 3번출입구 방향", s: 11, m: 28, l: 2, xl: 45 },
  { id: "nampo", name: "남포", line: 1, loc: "(B1) 표내는 곳 인근, 2·5번출입구 방향", s: 12, m: 32, l: 0, xl: 56 },
  { id: "jungang", name: "중앙", line: 1, loc: "(B1) 14번출입구 방향", s: 6, m: 6, l: 0, xl: 9 },
  { id: "busan", name: "부산", line: 1, loc: "(B1) 3·4·6번 출입구 방향", s: 10, m: 40, l: 7, xl: 78 },
  { id: "choryang", name: "초량", line: 1, loc: "(B1) 8번출입구 방향", s: 6, m: 2, l: 0, xl: 7 },
];
