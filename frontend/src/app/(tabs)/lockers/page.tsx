"use client";

import { useState } from "react";
import AppHeader from "@/components/common/AppHeader";
import { InfoIcon, PinIcon, SearchIcon } from "@/components/common/Icons";
import { SUBWAY_LOCKERS } from "@/lib/content";
import { useLang } from "@/lib/i18n";

const NEAR = ["nampo", "jagalchi", "jungang", "busan", "toseong"];

/** 보관소 현황 (§FE설계 1 — 하단 탭) — 부산 지하철 위드락커, 표시는 보유 칸수 */
export default function LockersPage() {
  const { lang, T } = useLang();
  const [query, setQuery] = useState("");
  const [near, setNear] = useState(false);

  const L = {
    title: { ko: "물품 보관소", ja: "ロッカー現況", en: "Lockers" }[lang],
    searchPh: { ko: "역명 검색 (남포·부산·자갈치…)", ja: "駅名で検索", en: "Search station" }[lang],
    nearFilter: { ko: "관광지 근처", ja: "観光地の近く", en: "Near spots" }[lang],
    feeUnit: { ko: "요금은 3시간 기준", ja: "料金は3時間ごと", en: "Prices per 3 hrs" }[lang],
    sizeLabel: { ko: "크기별 보유 개수·요금", ja: "サイズ別 保有数·料金", en: "Slots & price by size" }[lang],
    sizeInfo: { ko: "사이즈 안내", ja: "サイズ案内", en: "Sizes" }[lang],
    sizeUnit: { ko: "가로 × 세로 × 깊이 (cm)", ja: "幅 × 高さ × 奥行 (cm)", en: "W × H × D (cm)" }[lang],
    line: (n: number) => ({ ko: `${n}호선`, ja: `${n}号線`, en: `Line ${n}` })[lang],
    stationSuffix: { ko: "역", ja: "駅", en: "" }[lang],
  };

  const sizeRows = [
    { k: T.small, dim: "37 × 27 × 55" },
    { k: T.medium, dim: "37 × 37 × 55" },
    { k: T.large, dim: "37 × 57 × 55" },
    { k: T.xl, dim: "37 × 87 × 55" },
  ];

  let list = near ? SUBWAY_LOCKERS.filter((x) => NEAR.includes(x.id)) : SUBWAY_LOCKERS;
  const q = query.trim();
  if (q) list = list.filter((x) => x.name.includes(q));

  return (
    <div className="flex min-h-0 flex-1 animate-fade-up flex-col">
      <AppHeader title={L.title} />

      {/* 검색 + 필터 */}
      <div className="flex flex-none flex-col gap-2.5 border-b border-line bg-card px-3.5 py-3">
        <div className="flex h-11 items-center gap-2 rounded-xs border border-line-strong bg-canvas px-3.5">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={L.searchPh}
            /* 16px 미만이면 iOS가 포커스 시 강제 줌 */
            className="w-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none"
          />
        </div>
        <div className="hd-scroll flex gap-[7px] overflow-x-auto">
          <button
            onClick={() => setNear(!near)}
            className={`flex min-h-10 flex-none items-center whitespace-nowrap rounded-full border px-[15px] text-[12px] font-semibold active:scale-[0.96] ${
              near ? "border-primary bg-primary text-white" : "border-primary-line bg-white text-primary-dark"
            }`}
          >
            {L.nearFilter}
          </button>
        </div>
      </div>

      <div className="hd-scroll flex flex-1 flex-col gap-[11px] overflow-y-auto p-3.5">
        <div className="flex flex-wrap items-center gap-2 px-0.5">
          {/* 사이즈 안내 팝오버 */}
          <details className="group relative">
            <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1 text-[10.5px] font-semibold text-primary-dark [&::-webkit-details-marker]:hidden">
              <InfoIcon size={13} />
              {L.sizeInfo}
            </summary>
            <div className="absolute left-0 top-full z-overlay w-[158px] cursor-default rounded-xs border border-line bg-card px-[13px] py-[11px] shadow-raised">
              <div className="mb-[7px] text-[10px] text-gray">{L.sizeUnit}</div>
              {sizeRows.map((r) => (
                <div key={r.k} className="flex items-center justify-between gap-2.5 py-[3px] text-[11.5px]">
                  <span className="text-sub">{r.k}</span>
                  <span className="font-bold tabular-nums text-ink">{r.dim}</span>
                </div>
              ))}
            </div>
          </details>
          {/* §7-① 보유 칸수 기준 — 목록 상단 상시 노출 */}
          <span className="inline-flex items-center gap-1 rounded-[7px] bg-canvas px-2 py-[3px] text-[10.5px] text-gray">
            {T.held}
          </span>
        </div>

        {list.length === 0 && (
          <div className="px-4 py-[30px] text-center text-[13.5px] text-sub">{T.noResult}</div>
        )}

        {list.map((lk) => (
          <div
            key={lk.id}
            className="flex flex-col gap-2.5 rounded-md border border-line bg-card p-3.5 shadow-card"
          >
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-[7px]">
                <span className="flex-none rounded-md border border-primary-line bg-primary-bg px-[7px] py-px text-caption font-bold text-primary-dark">
                  {L.line(lk.line)}
                </span>
                <span className="text-body font-bold text-ink">
                  {lk.name}
                  {L.stationSuffix}
                </span>
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
                { k: T.small, v: lk.s, p: "2,000원", hi: false },
                { k: T.medium, v: lk.m, p: "3,000원", hi: false },
                { k: T.large, v: lk.l, p: "4,000원", hi: false },
                { k: T.xl, v: lk.xl, p: "6,000원", hi: true }, // 특대 강조 — 캐리어 기준 (§4.4)
              ].map((c) => (
                <div
                  key={c.k}
                  className={`flex-1 rounded-[9px] border px-0.5 py-1.5 text-center ${
                    c.hi ? "border-primary-line bg-primary-bg" : "border-line bg-canvas"
                  }`}
                >
                  <div className={`text-[10px] font-semibold ${c.hi ? "text-primary-dark" : "text-gray"}`}>
                    {c.k}
                  </div>
                  <div className={`mt-px text-label font-extrabold ${c.hi ? "text-primary-dark" : "text-ink"}`}>
                    {c.v}
                    {T.slots}
                  </div>
                  <div className={`mt-0.5 text-[9px] font-semibold ${c.hi ? "text-primary-dark" : "text-gray"}`}>
                    {c.p}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
