import type { SubwayNameLanguage } from "@/lib/subwayNames";

/**
 * SUBWAY_LOCKER_LOCATIONS.loc(한국어 정형 문구) → ja/en 로컬라이즈.
 * 데이터 파일이 자동 생성이라 번역을 데이터에 심지 않고 규칙으로 변환한다.
 * 미등록 문구는 한국어 원문을 그대로 반환한다 — 지어내지 않는다 (§7-④).
 */

interface LocSegmentL10n {
  ja: string;
  en: string;
}

// key는 공백 제거한 세그먼트 원문
const FIXED_SEGMENTS: Record<string, LocSegmentL10n> = {
  대합실고객센터근처: {
    ja: "コンコースのお客様センター付近",
    en: "Near the concourse customer center",
  },
  고객센터근처: { ja: "お客様センター付近", en: "Near the customer center" },
  고객센터맞은편: { ja: "お客様センター向かい", en: "Across from the customer center" },
  표내는곳인근: { ja: "改札口付近", en: "Near the ticket gates" },
  표내는곳앞쪽: { ja: "改札口前", en: "In front of the ticket gates" },
  화장실옆: { ja: "トイレ横", en: "Next to the restrooms" },
  화장실근처: { ja: "トイレ付近", en: "Near the restrooms" },
  만남의장소인근: { ja: "待ち合わせ場所付近", en: "Near the meeting point" },
  "2호선환승계단": { ja: "2号線乗換階段", en: "Line 2 transfer stairs" },
  gs편의점근처: { ja: "GSコンビニ付近", en: "Near the GS convenience store" },
  gs편의점맞은편: { ja: "GSコンビニ向かい", en: "Across from the GS convenience store" },
  현금지급기옆: { ja: "ATM横", en: "Next to the ATM" },
  서면롯데백화점출입구방향: {
    ja: "西面ロッテ百貨店出入口方面",
    en: "Toward the Lotte Dept. Store entrance",
  },
  에스컬레이터방향: { ja: "エスカレーター方面", en: "Toward the escalator" },
  "e/l출입구방향": { ja: "エレベーター出入口方面", en: "Toward the elevator exit" },
};

const FLOOR_PREFIX = /^\((?:B\d+|\d+F)\)\s*/;

function translateSegment(segment: string, lang: "ja" | "en"): string {
  const key = segment.replace(/\s+/g, "").toLowerCase();
  const fixed = FIXED_SEGMENTS[key];
  if (fixed) return fixed[lang];

  const elevator = key.match(/^(\d+)번엘리베이터옆$/);
  if (elevator) {
    return lang === "ja"
      ? `${elevator[1]}番エレベーター横`
      : `Next to Elevator ${elevator[1]}`;
  }

  const exitNear = key.match(/^(\d+)번출구인근$/);
  if (exitNear) {
    return lang === "ja" ? `出口${exitNear[1]}付近` : `Near Exit ${exitNear[1]}`;
  }

  if (/출입구방향$/.test(key)) {
    const numbers = key.match(/\d+/g);
    if (numbers) {
      const joined = numbers.join("·");
      return lang === "ja"
        ? `出口${joined}方面`
        : `Toward Exit${numbers.length > 1 ? "s" : ""} ${joined}`;
    }
  }

  return segment;
}

export function localizeSubwayLockerLoc(
  loc: string,
  lang: SubwayNameLanguage,
): string {
  if (lang === "ko") return loc;

  // "2, 5번출입구 방향"처럼 쉼표가 번호 나열인 경우 세그먼트로 쪼개지 않게 재결합
  const parts: string[] = [];
  let pending = "";
  for (const raw of loc.split(",")) {
    const piece = pending ? `${pending}, ${raw.trim()}` : raw.trim();
    const body = piece.replace(FLOOR_PREFIX, "").replace(/\s+/g, "");
    if (/^[\d,번]+$/.test(body)) {
      pending = piece;
      continue;
    }
    pending = "";
    parts.push(piece);
  }
  if (pending) parts.push(pending);

  return parts
    .map((part) => {
      const floor = part.match(FLOOR_PREFIX)?.[0]?.trim() ?? "";
      const body = part.replace(FLOOR_PREFIX, "").trim();
      const translated = body ? translateSegment(body, lang) : "";
      return [floor, translated].filter(Boolean).join(" ");
    })
    .filter(Boolean)
    .join(lang === "ja" ? "、" : ", ");
}
