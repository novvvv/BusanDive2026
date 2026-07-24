"use client";

import { ImagePlaceholderIcon, PinIcon } from "@/components/common/Icons";
import { useLang } from "@/lib/i18n";
import type { PoiVM } from "@/lib/types";

/** 관광지 추천 카드 — 가로 스와이프 캐러셀. 이미지 없는 변형 필수 (§5.1) */
export default function PoiCarousel({ pois }: { pois: PoiVM[] }) {
  const { T } = useLang();
  return (
    <div className="hd-scroll ml-[38px] flex gap-[11px] overflow-x-auto pb-1.5 pt-0.5">
      {pois.map((p) => (
        <button
          key={p.id}
          onClick={p.onGo}
          className="w-[186px] flex-none overflow-hidden rounded-lg border border-line bg-card text-left shadow-card active:scale-[0.98]"
        >
          {p.hasImage ? (
            // 부산시 API MAIN_IMG 자리 — mock에선 플레이스홀더
            <div className="flex h-24 items-center justify-center bg-gradient-to-br from-[#F3E7DA] to-[#EADBC8] text-[#C9B49C]">
              <ImagePlaceholderIcon />
            </div>
          ) : (
            <div className="flex h-14 items-center bg-primary-bg px-3.5 text-label font-bold text-primary-dark">
              {p.name}
            </div>
          )}
          <div className="flex flex-col gap-[7px] px-3 pb-[13px] pt-[11px]">
            <div className="flex flex-col gap-px">
              <div className="text-[14px] font-bold leading-snug text-ink">{p.name}</div>
              {/* 고유명사 원문 병기 (§7-③) — 보조 크기·회색 위계 */}
              {p.orig && <div className="text-caption font-medium text-gray">{p.orig}</div>}
            </div>
            <div className="flex items-center gap-[5px] text-[11.5px] text-sub">
              <PinIcon />
              <span className="truncate">
                {p.station} · {p.walk}
              </span>
            </div>
            <div className="text-[9.5px] text-gray">{T.walkEst}</div>
          </div>
        </button>
      ))}
    </div>
  );
}
