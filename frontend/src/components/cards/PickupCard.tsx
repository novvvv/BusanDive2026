"use client";

import { ArrowOutIcon, BoxIcon } from "@/components/common/Icons";
import { useLang } from "@/lib/i18n";
import type { PickupVM } from "@/lib/types";

/** 짐캐리 픽업 카드 (§5.2) — 예약은 외부 이동임을 버튼 문구에 명시 */
export default function PickupCard({ p }: { p: PickupVM }) {
  const { lang, T } = useLang();
  const registeredLabel = {
    ko: "등록 숙소",
    ja: "登録宿泊先",
    en: "Registered stay",
  }[lang];

  return (
    <div className="flex flex-col gap-[11px] rounded-lg border border-line bg-card px-[15px] py-3.5 shadow-card">
      <div className="flex items-center gap-[7px]">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-heritage-bg text-heritage">
          <BoxIcon />
        </div>
        <span className="text-[14px] font-bold text-ink">{T.pickupTitle}</span>
        <span className="ml-auto rounded-[7px] bg-congestion-1bg px-2 py-[3px] text-caption font-bold text-success">
          {registeredLabel}
        </span>
      </div>
      <div className="text-[13.5px] font-semibold text-ink">{p.hotel}</div>
      <div className="flex gap-2">
        <div className="flex-1 rounded-xs bg-canvas px-[11px] py-[9px]">
          <div className="mb-0.5 text-[10.5px] text-gray">{T.pickupDropOff}</div>
          {/* 수치·시각은 언어 무관 원본 그대로 (§7-③) */}
          <div className="text-[13.5px] font-bold text-ink">{p.dropOffBy}</div>
        </div>
        <div className="flex-1 rounded-xs bg-canvas px-[11px] py-[9px]">
          <div className="mb-0.5 text-[10.5px] text-gray">{T.pickupCollect}</div>
          <div className="text-[13.5px] font-bold text-ink">{p.collectFrom}</div>
        </div>
      </div>
      <button
        onClick={p.onReserve}
        className="flex min-h-[46px] w-full items-center justify-center gap-1.5 rounded-sm bg-primary text-[14.5px] font-bold text-white active:scale-[0.98] active:bg-primary-dark"
      >
        {T.reserve}
        <ArrowOutIcon stroke="#fff" />
      </button>
    </div>
  );
}
