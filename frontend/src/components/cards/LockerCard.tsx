"use client";

import { ChevronRightIcon } from "@/components/common/Icons";
import LineBadge from "@/components/common/LineBadge";
import { useLang } from "@/lib/i18n";
import type { LockerVM } from "@/lib/types";

/**
 * 보관함 카드 (§5.2) — 비타협 원칙:
 * §7-① "보유 칸수 기준 · 실시간 잔여 아님" 카드 내 상시 노출
 * §7-② 혼잡 문구는 과거형, 색+텍스트 라벨 병행
 */
export default function LockerCard({ lk }: { lk: LockerVM }) {
  const { lang, T } = useLang();
  const feeLabel = { ko: "특대 요금", ja: "特大 料金", en: "XL fee" }[lang];
  const locLabel = { ko: "상세 위치", ja: "詳しい場所", en: "Location" }[lang];

  return (
    <button
      onClick={lk.onDetail}
      className="flex w-full flex-col gap-2.5 rounded-lg border border-line bg-card px-[15px] py-3.5 text-left shadow-card active:scale-[0.99]"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-px">
          <div className="flex items-center gap-[7px]">
            {lk.line !== undefined && <LineBadge line={lk.line} />}
            <div className="text-[14.5px] font-bold text-ink">
              {lk.station}{" "}
              {lk.stationOrig && (
                <span className="text-caption font-medium text-gray">{lk.stationOrig}</span>
              )}
            </div>
          </div>
          <div className="text-[11.5px] text-sub">{lk.dist}</div>
        </div>
        <span className="flex flex-none items-center gap-[3px] text-[12px] font-semibold text-primary-dark">
          {T.detail}
          <ChevronRightIcon />
        </span>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-px">
          <span className="text-[10.5px] text-gray">{feeLabel}</span>
          <span className="text-[14px] font-bold text-ink">{lk.fee}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-px">
          <span className="text-[10.5px] text-gray">{locLabel}</span>
          <span className="truncate text-label font-semibold text-ink">{lk.loc}</span>
        </div>
      </div>

      {lk.cong && (
        <div
          className="flex items-start gap-[7px] rounded-xs px-[11px] py-[9px]"
          style={{ background: lk.cong.bg }}
        >
          <span
            className="mt-px inline-flex flex-none items-center rounded-md px-[7px] py-0.5 text-[10.5px] font-bold text-white"
            style={{ background: lk.cong.color }}
          >
            {lk.cong.label}
          </span>
          <span className="flex flex-col gap-0.5">
            <span className="text-[12px] leading-snug text-ink">{lk.cong.text}</span>
            <span className="text-[9.5px] text-sub">{lk.cong.sample}</span>
          </span>
        </div>
      )}

    </button>
  );
}
