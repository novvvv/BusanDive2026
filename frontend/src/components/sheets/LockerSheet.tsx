"use client";

import { Fragment } from "react";
import BottomSheet from "@/components/common/BottomSheet";
import LineBadge from "@/components/common/LineBadge";
import SizeInfoPopover from "@/components/common/SizeInfoPopover";
import { ALT_LOCKER, CONGESTION_WEEK, LOCKERS, STATIONS } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { findSubwayCongestion } from "@/lib/subwayCongestion";
import { localizeSubwayLockerLoc } from "@/lib/subwayLockerLoc";
import { SUBWAY_LOCKER_LOCATIONS } from "@/lib/subwayLockers";
import { localizeSubwayStationName } from "@/lib/subwayNames";

// 혼잡 4등급 색 (congestion 토큰과 동일) — 라벨 병행 필수 (§7 색맹 대응)
const CBG = ["#E3F3EC", "#FBF0D2", "#FBE4D3", "#F8DAD5"];
const CDOT = ["#1E9E6A", "#C99A2E", "#E1712B", "#C93F35"];

/** 보관소 상세 시트 — 크기별 칸수(특대 강조) + 요금 + 상세 위치 + 혼잡 타임라인 (§4.4) */
export default function LockerSheet({
  lockerId,
  onClose,
}: {
  lockerId: string;
  onClose: () => void;
}) {
  const { lang, T, tr } = useLang();
  const mockLocker = [...LOCKERS, ALT_LOCKER].find((item) => item.id === lockerId);
  const subwayLocker = SUBWAY_LOCKER_LOCATIONS.find((item) => item.id === lockerId);
  if (!mockLocker && !subwayLocker) return null;
  const subwayCongestion = subwayLocker
    ? findSubwayCongestion(subwayLocker.id)
    : null;
  const mockCongestion = mockLocker?.congestion ?? null;

  const stationName = mockLocker
    ? localizeSubwayStationName(
        STATIONS[mockLocker.station].orig.replace(/역$/, ""),
        STATIONS[mockLocker.station].line,
        lang,
      )
    : localizeSubwayStationName(
        subwayLocker!.name,
        subwayLocker!.line,
        lang,
      );
  const stationOrig =
    lang === "ko"
      ? ""
      : mockLocker
        ? STATIONS[mockLocker.station].orig
        : `${subwayLocker!.name}역`;
  const days = CONGESTION_WEEK.days[lang];
  const hourSuffix = { ko: "시", ja: "時", en: ":00" }[lang];
  const congestionHours =
    subwayCongestion?.hours.map((hour) => String(hour).padStart(2, "0")) ??
    CONGESTION_WEEK.hours;
  const congestionGrid = subwayCongestion?.grid ?? CONGESTION_WEEK.grid;
  const congestionSample = subwayCongestion
    ? tr(subwayCongestion.sample)
    : mockCongestion
      ? tr(mockCongestion.sample)
      : "";

  const rows = [
    { k: T.small, v: `${subwayLocker?.s ?? 12}${T.slots}`, fee: "2,000원" },
    { k: T.medium, v: `${subwayLocker?.m ?? 20}${T.slots}`, fee: "3,000원" },
    { k: T.large, v: `${subwayLocker?.l ?? 18}${T.slots}`, fee: "4,000원" },
    {
      k: T.xl,
      v: `${subwayLocker?.xl ?? mockLocker!.xl_count}${T.slots}`,
      fee: mockLocker?.fee.amount ?? "6,000원",
    },
  ];
  const location = subwayLocker
    ? localizeSubwayLockerLoc(subwayLocker.loc, lang)
    : `${mockLocker!.detail_loc.floor} · ${tr(mockLocker!.detail_loc.exits)}`;

  const labels = {
    size: { ko: "크기별 보유 개수", ja: "サイズ別 保有数", en: "Lockers by size" }[lang],
    feeBasis: {
      ko: "3시간 기준 · 위드락커 운영",
      ja: "3時間あたり · ウィズロッカー運営",
      en: "per 3 hrs · operated by WithLocker",
    }[lang],
    loc: { ko: "상세 위치", ja: "詳しい場所", en: "Location" }[lang],
    cong: { ko: "지하철 혼잡 타임라인", ja: "地下鉄 混雑タイムライン", en: "Metro crowd timeline" }[lang],
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="mb-1 flex items-center gap-2">
        <LineBadge line={subwayLocker?.line ?? STATIONS[mockLocker!.station].line} />
        <span className="text-[21px] font-extrabold tracking-tight text-ink">{stationName}</span>
        {stationOrig && <span className="text-label font-medium text-gray">· {stationOrig}</span>}
      </div>

      <div className="mt-1 flex items-center justify-between">
        <span className="text-[12px] font-bold text-gray">{labels.size}</span>
        <SizeInfoPopover align="right" />
      </div>
      <div className="mb-[18px] flex gap-2">
        {rows.map((r) => (
          <div
            key={r.k}
            className="flex-1 rounded-sm border border-line bg-canvas py-2.5 text-center"
          >
            <div className="text-caption font-semibold text-gray">{r.k}</div>
            <div className="mt-[3px] text-body font-extrabold text-ink">{r.v}</div>
            <div className="mt-0.5 text-[10px] font-semibold text-gray">{r.fee}</div>
          </div>
        ))}
      </div>

      <div className="-mt-2 mb-4 text-[10.5px] text-gray">{labels.feeBasis}</div>

      <div className="mb-[18px] rounded-sm bg-canvas px-3.5 py-3">
        <div className="mb-[3px] text-caption text-gray">{labels.loc}</div>
        <div className="text-[14px] font-bold leading-snug text-ink">{location}</div>
      </div>

      {/* 혼잡 타임라인 — 라벨은 항상 과거형(§7-②), 색+텍스트 병행 */}
      {(subwayCongestion || mockCongestion) && (
        <>
          <div className="mb-2.5 flex items-center justify-between">
            <span className="text-[14px] font-bold text-ink">{labels.cong}</span>
          </div>
          <div className="mb-2.5 flex flex-wrap gap-2.5">
            {T.cong.map((label, index) => (
              <span key={label} className="inline-flex items-center gap-1 text-caption text-sub">
                <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: CDOT[index] }} />
                {label}
              </span>
            ))}
          </div>
          <div className="mb-2 grid grid-cols-[auto_repeat(4,1fr)] items-center gap-[5px]">
            <div />
            {congestionHours.map((hour) => (
              <div key={hour} className="text-center text-[10px] font-semibold text-gray">
                {hour}
                {hourSuffix}
              </div>
            ))}
            {congestionGrid.map((row, dayIndex) => (
              <Fragment key={days[dayIndex]}>
                <div className="text-center text-[10.5px] font-bold text-sub">{days[dayIndex]}</div>
                {row.map((grade, hourIndex) => (
                  <div
                    key={`${days[dayIndex]}-${congestionHours[hourIndex]}`}
                    className="h-[22px] rounded-[5px]"
                    style={{ background: CBG[grade - 1] }}
                  />
                ))}
              </Fragment>
            ))}
          </div>
          <div className="text-[10.5px] leading-normal text-gray">
            {congestionSample}
          </div>
        </>
      )}
    </BottomSheet>
  );
}
