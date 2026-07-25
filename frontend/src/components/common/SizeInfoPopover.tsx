"use client";

import { InfoIcon } from "@/components/common/Icons";
import { useLang } from "@/lib/i18n";

/** 사이즈 안내 팝오버 — 위드락커 크기별 규격 (LockersPage·LockerSheet 공용) */
export default function SizeInfoPopover({ align = "left" }: { align?: "left" | "right" }) {
  const { lang, T } = useLang();
  const L = {
    sizeInfo: { ko: "사이즈 안내", ja: "サイズ案内", en: "Sizes" }[lang],
    sizeUnit: { ko: "가로 × 세로 × 깊이 (cm)", ja: "幅 × 高さ × 奥行 (cm)", en: "W × H × D (cm)" }[lang],
  };
  const sizeRows = [
    { k: T.small, dim: "37 × 27 × 55" },
    { k: T.medium, dim: "37 × 37 × 55" },
    { k: T.large, dim: "37 × 57 × 55" },
    { k: T.xl, dim: "37 × 87 × 55" },
  ];

  return (
    <details className="group relative">
      <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 text-[10.5px] font-semibold text-primary-dark [&::-webkit-details-marker]:hidden">
        <InfoIcon size={13} />
        {L.sizeInfo}
      </summary>
      <div
        className={`absolute top-full z-overlay w-[158px] cursor-default rounded-xs border border-line bg-card px-[13px] py-[11px] shadow-raised ${
          align === "right" ? "right-0" : "left-0"
        }`}
      >
        <div className="mb-[7px] text-[10px] text-gray">{L.sizeUnit}</div>
        {sizeRows.map((r) => (
          <div key={r.k} className="flex items-center justify-between gap-2.5 py-[3px] text-[11.5px]">
            <span className="text-sub">{r.k}</span>
            <span className="font-bold tabular-nums text-ink">{r.dim}</span>
          </div>
        ))}
      </div>
    </details>
  );
}
