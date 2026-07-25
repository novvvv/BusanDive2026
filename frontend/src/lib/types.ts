/**
 * 채팅 스트림 뷰모델 — 디자인 핸드오프 부록 A(도구 반환 스키마)의 미러.
 * 실제 API 연동 시 lib/api.ts가 같은 스키마로 채워 넣는다.
 */

export interface ChipVM {
  label: string;
  onClick: () => void;
  /** reset 칩(↻ 다시 하기)은 회색 보더로 구분 */
  variant?: "default" | "reset";
}

export interface PoiVM {
  id: string;
  hasImage: boolean;
  name: string;
  orig: string; // 원문 병기 (ko 모드에선 빈 문자열)
  station: string;
  walk: string;
  xlLabel: string;
  tags: string[];
  onGo: () => void;
}

export interface CongVM {
  grade: 1 | 2 | 3 | 4;
  label: string; // 색+텍스트 라벨 병행 (§7 색맹 대응)
  color: string;
  bg: string;
  text: string; // 항상 과거형 (§7-②)
  sample: string;
}

export interface LockerVM {
  id: string;
  station: string;
  line?: number; // 있으면 역명 앞에 호선 색상 뱃지(LineBadge) 렌더
  stationOrig: string;
  xlLabel: string;
  held: string; // "보유 칸수 기준 · 실시간 잔여 아님" (§7-①)
  fee: string;
  loc: string;
  dist: string;
  cong: CongVM | null; // null이면 혼잡 영역 자체를 렌더하지 않음
  onDetail: () => void;
}

export interface PickupVM {
  hotel: string;
  dropOffBy: string;
  collectFrom: string;
  source: string;
  onReserve: () => void;
}

export interface AttachVM {
  type: "source" | "congOpen";
  label: string;
  onClick: () => void;
}

export type Msg =
  | { id: string; kind: "user"; text: string }
  | { id: string; kind: "text"; text: string; attach?: AttachVM }
  | { id: string; kind: "poi"; pois: PoiVM[] }
  | { id: string; kind: "locker"; pickup: PickupVM | null; lockers: LockerVM[] }
  | { id: string; kind: "choices"; q: string; choices: ChipVM[] }
  | { id: string; kind: "pickfail"; title: string; body: string }
  | {
      id: string;
      kind: "stayform";
      mode: "pickup" | "spot";
      done: boolean;
      stayVal?: string;
      spotVal?: string;
    }
  | { id: string; kind: "alt"; altTitle: string; locker: LockerVM }
  | { id: string; kind: "boundary"; body: string; channels: ChipVM[] }
  | { id: string; kind: "zero"; body: string; chips: ChipVM[] }
  | { id: string; kind: "neterr"; body: string; onRetry: () => void };
