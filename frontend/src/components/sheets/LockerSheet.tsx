"use client";

import { Fragment } from "react";
import BottomSheet from "@/components/common/BottomSheet";
import { InfoIcon } from "@/components/common/Icons";
import { ALT_LOCKER, CONGESTION_WEEK, LOCKERS, STATIONS } from "@/lib/content";
import { useLang } from "@/lib/i18n";

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
  const lk = [...LOCKERS, ALT_LOCKER].find((x) => x.id === lockerId);
  if (!lk) return null;

  const st = STATIONS[lk.station];
  const days = CONGESTION_WEEK.days[lang];
  const hourSuffix = { ko: "시", ja: "時", en: ":00" }[lang];

  const rows = [
    { k: T.small, v: `12${T.slots}`, fee: "2,000원", hi: false },
    { k: T.medium, v: `20${T.slots}`, fee: "3,000원", hi: false },
    { k: T.large, v: `18${T.slots}`, fee: "4,000원", hi: false },
    { k: T.xl, v: `${lk.xl_count}${T.slots}`, fee: lk.fee.amount, hi: true },
  ];

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
    <BottomSheet onClose={onClose} scroll>
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-[21px] font-extrabold tracking-tight text-ink">{tr(st.name)}</span>
        {lang !== "ko" && <span className="text-label font-medium text-gray">· {st.orig}</span>}
      </div>

      {/* §7-① 보유 칸수 ≠ 실시간 잔여 — 상시 노출 */}
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-canvas px-2 py-1 text-caption text-gray">
        <InfoIcon size={12} />
        {T.held}
      </div>

      <div className="mb-2 text-[12px] font-bold text-gray">{labels.size}</div>
      <div className="mb-[18px] flex gap-2">
        {rows.map((r) => (
          <div
            key={r.k}
            className={`flex-1 rounded-sm border px-1.5 py-2.5 text-center ${
              r.hi ? "border-primary-line bg-primary-bg" : "border-line bg-canvas"
            }`}
          >
            <div className={`mb-[3px] text-caption font-semibold ${r.hi ? "text-primary-dark" : "text-gray"}`}>
              {r.k}
            </div>
            <div className={`text-body font-extrabold ${r.hi ? "text-primary-dark" : "text-ink"}`}>{r.v}</div>
            <div className={`mt-1 text-[10.5px] font-bold ${r.hi ? "text-primary-dark" : "text-gray"}`}>
              {r.fee}
            </div>
          </div>
        ))}
      </div>

      <div className="-mt-2 mb-4 text-[10.5px] text-gray">{labels.feeBasis}</div>

      <div className="mb-[18px] rounded-sm bg-canvas px-3.5 py-3">
        <div className="mb-[3px] text-caption text-gray">{labels.loc}</div>
        <div className="text-[14px] font-bold leading-snug text-ink">
          {lk.detail_loc.floor} · {tr(lk.detail_loc.exits)}
        </div>
      </div>

      {/* 혼잡 타임라인 — 라벨은 항상 과거형(§7-②), 색+텍스트 병행 */}
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[14px] font-bold text-ink">{labels.cong}</span>
      </div>
      <div className="mb-2.5 flex flex-wrap gap-2.5">
        {T.cong.map((l, i) => (
          <span key={l} className="inline-flex items-center gap-1 text-caption text-sub">
            <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: CDOT[i] }} />
            {l}
          </span>
        ))}
      </div>
      <div className="mb-2 grid grid-cols-[auto_repeat(4,1fr)] items-center gap-[5px]">
        <div />
        {CONGESTION_WEEK.hours.map((h) => (
          <div key={h} className="text-center text-[10px] font-semibold text-gray">
            {h}
            {hourSuffix}
          </div>
        ))}
        {CONGESTION_WEEK.grid.map((row, di) => (
          <Fragment key={di}>
            <div className="text-center text-[10.5px] font-bold text-sub">{days[di]}</div>
            {row.map((g, hi) => (
              <div
                key={hi}
                className="h-[22px] rounded-[5px]"
                style={{ background: CBG[g - 1] }}
              />
            ))}
          </Fragment>
        ))}
      </div>
      {lk.congestion && (
        <div className="text-[10.5px] leading-normal text-gray">
          {tr(lk.congestion.sample)} {T.asOf} · {T.held}
        </div>
      )}
    </BottomSheet>
  );
}
