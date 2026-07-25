"use client";

import { useLang } from "@/lib/i18n";

/** 부산 도시철도 호선 노선색 — 1 주황 / 2 초록 / 3 황토 / 4 파랑 / 5 부산-김해 경전철 보라 */
const LINE_COLORS: Record<number, string> = {
  1: "#F06A00",
  2: "#81BF48",
  3: "#BB8C00",
  4: "#217DCB",
  5: "#8652A1",
};

/** 호선 색상 뱃지 — 노선색은 데이터 값이라 동적 클래스 금지 규칙상 inline style */
export default function LineBadge({ line }: { line: number }) {
  const { lang } = useLang();
  const label = { ko: `${line}호선`, ja: `${line}号線`, en: `Line ${line}` }[lang];
  return (
    <span
      style={{ background: LINE_COLORS[line] }}
      className="flex-none rounded-md px-[7px] py-px text-caption font-bold text-white"
    >
      {label}
    </span>
  );
}
