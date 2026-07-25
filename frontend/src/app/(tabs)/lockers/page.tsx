"use client";

import { useState } from "react";
import AppHeader from "@/components/common/AppHeader";
import { PinIcon, SearchIcon } from "@/components/common/Icons";
import LineBadge from "@/components/common/LineBadge";
import SizeInfoPopover from "@/components/common/SizeInfoPopover";
import { useLang } from "@/lib/i18n";
import { SUBWAY_LOCKER_LOCATIONS } from "@/lib/subwayLockers";
import {
  localizeSubwayStationName,
  matchesSubwayStationName,
} from "@/lib/subwayNames";

/** 보관소 현황 (§FE설계 1 — 하단 탭) — 부산 지하철 위드락커, 표시는 보유 칸수 */
export default function LockersPage() {
  const { lang, T } = useLang();
  const [query, setQuery] = useState("");

  const L = {
    title: { ko: "물품 보관소", ja: "ロッカー現況", en: "Lockers" }[lang],
    searchPh: { ko: "역명 검색 (남포·부산·자갈치…)", ja: "駅名で検索", en: "Search station" }[lang],
    feeUnit: { ko: "요금은 3시간 기준", ja: "料金は3時間ごと", en: "Prices per 3 hrs" }[lang],
    sizeLabel: { ko: "크기별 보유 개수·요금", ja: "サイズ別 保有数·料金", en: "Slots & price by size" }[lang],
  };

  const q = query.trim();
  const list = q
    ? SUBWAY_LOCKER_LOCATIONS.filter((locker) =>
        matchesSubwayStationName(locker.name, locker.line, q),
      )
    : SUBWAY_LOCKER_LOCATIONS;

  return (
    <div className="flex min-h-0 flex-1 animate-fade-up flex-col">
      <AppHeader title={L.title} />

      {/* 검색 */}
      <div className="flex-none bg-canvas px-3.5 pb-1 pt-1">
        <div className="flex h-11 items-center gap-2 rounded-xs bg-card px-3.5 shadow-card">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={L.searchPh}
            /* 16px 미만이면 iOS가 포커스 시 강제 줌 */
            className="w-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none"
          />
        </div>
      </div>

      <div className="hd-scroll flex flex-1 flex-col gap-[11px] overflow-y-auto p-3.5 pt-2">
        {/* summary가 터치 타깃 44px을 유지해 세로가 부풀어 — 네거티브 마진으로 시각 간격만 회수 */}
        <div className="-mb-3 -mt-2.5 flex flex-wrap items-center gap-2 px-0.5">
          <SizeInfoPopover />
        </div>

        {list.length === 0 && (
          <div className="px-4 py-[30px] text-center text-[13.5px] text-sub">{T.noResult}</div>
        )}

        {list.map((lk) => {
          const stationName = localizeSubwayStationName(
            lk.name,
            lk.line,
            lang,
          );
          return (
            <div
              key={lk.id}
              className="flex flex-col gap-2.5 rounded-md border border-line bg-card p-3.5 shadow-card"
            >
              <div className="flex flex-col gap-1.5">
                <div className="flex flex-wrap items-center gap-[7px]">
                  <LineBadge line={lk.line} />
                  <span className="text-body font-bold text-ink">{stationName}</span>
                  {lang !== "ko" && (
                    <span className="text-caption font-medium text-gray">
                      · {lk.name}역
                    </span>
                  )}
                </div>
                <span className="flex items-start gap-1 text-[12px] leading-snug text-sub">
                  <span className="mt-0.5 flex-none">
                    <PinIcon size={13} />
                  </span>
                  {lk.loc}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-caption font-bold text-sub">{L.sizeLabel}</span>
                <span className="text-[10px] font-semibold text-gray">{L.feeUnit}</span>
              </div>
              <div className="flex gap-1.5">
                {[
                  { k: T.small, v: lk.s, p: "2,000원" },
                  { k: T.medium, v: lk.m, p: "3,000원" },
                  { k: T.large, v: lk.l, p: "4,000원" },
                  { k: T.xl, v: lk.xl, p: "6,000원" },
                ].map((c) => (
                  <div
                    key={c.k}
                    className="flex-1 rounded-[9px] border border-line bg-canvas px-0.5 py-1.5 text-center"
                  >
                    <div className="text-[10px] font-semibold text-gray">{c.k}</div>
                    <div className="mt-px text-label font-extrabold text-ink">
                      {c.v}
                      {T.slots}
                    </div>
                    <div className="mt-0.5 text-[9px] font-semibold text-gray">{c.p}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
