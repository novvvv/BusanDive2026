"use client";

import { BackIcon, BoxIcon, LockerIcon } from "@/components/common/Icons";
import { LOCKERS, POIS, STATIONS, ZC } from "@/lib/content";
import { useLang } from "@/lib/i18n";

// 짐캐리 보관함 데모 좌표 (placeholder 지도 기준 %)
const ZC_POS = [
  { x: 82, y: 28 },
  { x: 26, y: 64 },
  { x: 40, y: 73 },
];

/**
 * 지도 뷰 — SDK 미연동. placeholder 배경 + 절대좌표 마커 데모 (§4.3).
 * 실 SDK(카카오/네이버) 삽입 지점: 아래 .map-canvas div를 교체한다.
 */
export default function MapOverlay({
  onClose,
  onLockerTap,
}: {
  onClose: () => void;
  onLockerTap: (lockerId: string) => void;
}) {
  const { lang, T, tr } = useLang();
  const legend = {
    poi: { ko: "관광지", ja: "観光地", en: "Spot" }[lang],
    locker: { ko: "지하철 보관소", ja: "地下鉄ロッカー", en: "Metro" }[lang],
    zc: { ko: "짐캐리 보관함", ja: "ジムキャリー", en: "GimCarry" }[lang],
  };

  return (
    <div className="absolute inset-0 z-overlay flex animate-fade-up flex-col bg-canvas">
      <div className="flex h-14 flex-none items-center gap-3 bg-canvas px-3">
        <button
          onClick={onClose}
          aria-label={T.back}
          className="flex h-11 w-11 items-center justify-center rounded-xs text-ink active:scale-[0.92]"
        >
          <BackIcon />
        </button>
        <span className="text-body-lg font-bold text-ink">{T.mapTitle}</span>
      </div>

      <div
        className="map-canvas relative flex-1 overflow-hidden"
        style={{
          background:
            "repeating-linear-gradient(0deg,#EFEAE1 0 1px,transparent 1px 48px)," +
            "repeating-linear-gradient(90deg,#EFEAE1 0 1px,transparent 1px 48px),#F4EFE7",
        }}
      >
        {/* 범례 */}
        {/* 320px대·긴 언어(ja)에서 한 줄 초과 시 줄바꿈 */}
        <div className="absolute left-3 top-3 flex max-w-[calc(100%-24px)] flex-wrap gap-x-3 gap-y-1 rounded-xxs border border-line bg-white/85 px-3 py-2 text-caption font-semibold text-sub">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-full border-2 border-white bg-primary shadow-[0_0_0_1px_#D9502E]" />
            {legend.poi}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-[13px] w-[13px] rounded border-2 border-white bg-ink" />
            {legend.locker}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-[13px] w-[13px] rounded border-2 border-white bg-success" />
            {legend.zc}
          </span>
        </div>

        {/* 관광지 POI 마커 */}
        {POIS.map((p) => (
          <div
            key={p.id}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-0.5"
            style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }}
          >
            <div className="whitespace-nowrap rounded-[7px] border border-line bg-white/90 px-2 py-0.5 text-[10.5px] font-bold text-ink">
              {tr(p.name)}
            </div>
            <div className="h-3.5 w-3.5 rounded-full border-[3px] border-white bg-primary shadow" />
          </div>
        ))}

        {/* 보관소(역) 마커 — 특대 칸수 뱃지, 탭 → 상세 시트 */}
        {LOCKERS.map((lk) => (
          <button
            key={lk.id}
            onClick={() => onLockerTap(lk.id)}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-[3px] active:scale-[0.94]"
            style={{ left: `${(lk.x ?? 0) * 100}%`, top: `${(lk.y ?? 0) * 100}%` }}
          >
            <div className="flex items-center gap-1.5 rounded-lg bg-ink px-2 py-1 text-white shadow-raised">
              <LockerIcon size={13} stroke="#fff" />
              <span className="whitespace-nowrap text-caption font-bold">
                {tr(STATIONS[lk.station].name)}
              </span>
              <span className="whitespace-nowrap text-caption font-extrabold text-heritage">
                {T.xl} {lk.xl_count}
              </span>
            </div>
            <div className="h-0 w-0 border-x-[6px] border-t-8 border-x-transparent border-t-ink" />
          </button>
        ))}

        {/* 짐캐리 보관함 마커 */}
        {ZC.lockers.map((z, i) => (
          <div
            key={z.place}
            className="absolute flex -translate-x-1/2 -translate-y-full flex-col items-center gap-[3px]"
            style={{ left: `${ZC_POS[i].x}%`, top: `${ZC_POS[i].y}%` }}
          >
            <div className="flex items-center gap-1.5 rounded-lg bg-success px-2 py-1 text-white shadow-raised">
              <BoxIcon size={12} />
              <span className="whitespace-nowrap text-caption font-bold">{z.place}</span>
            </div>
            <div className="h-0 w-0 border-x-[6px] border-t-8 border-x-transparent border-t-success" />
          </div>
        ))}
      </div>
    </div>
  );
}
