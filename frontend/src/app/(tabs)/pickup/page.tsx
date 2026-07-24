"use client";

import { useState } from "react";
import AppHeader from "@/components/common/AppHeader";
import { ArrowOutIcon, SearchIcon } from "@/components/common/Icons";
import { ZC } from "@/lib/content";
import { useLang } from "@/lib/i18n";

type PkView = "use" | "hotel" | "locker" | "faq";

const HOTELS = [
  { name: { ko: "서면 스테이 호텔", ja: "西面ステイホテル", en: "Seomyeon Stay Hotel" }, area: { ko: "서면 · 도보 5분", ja: "西面 · 徒歩5分", en: "Seomyeon · 5 min" }, ok: true },
  { name: { ko: "남포 게스트하우스", ja: "南浦ゲストハウス", en: "Nampo Guesthouse" }, area: { ko: "남포 · 도보 3분", ja: "南浦 · 徒歩3分", en: "Nampo · 3 min" }, ok: true },
  { name: { ko: "광안리 오션뷰", ja: "広安里オーシャンビュー", en: "Gwangalli Oceanview" }, area: { ko: "광안리 · 도보 8분", ja: "広安里 · 徒歩8分", en: "Gwangalli · 8 min" }, ok: true },
  { name: { ko: "해운대 게스트하우스", ja: "海雲台ゲストハウス", en: "Haeundae Guesthouse" }, area: { ko: "해운대 · 미등록", ja: "海雲台 · 未登録", en: "Haeundae · unregistered" }, ok: false },
];

const STEPS = [
  { ko: ["예약·결제", "당일 온라인은 오전 11시 이전\n매장 접수는 오후 3시 이전"], ja: ["予約·決済", "当日オンラインは11時まで\n店舗受付は15時まで"], en: ["Reserve", "Online by 11:00\nIn-store by 15:00"] },
  { ko: ["짐 사진 등록", "알림톡에서 맡길 짐 1장 촬영·업로드"], ja: ["荷物の写真", "通知から荷物を1枚撮影"], en: ["Photo", "1 photo via alert-talk"] },
  { ko: ["출발지에 맡기기", "숙소·보관함은 오전 11시 이전 (매장 상이)"], ja: ["預ける", "宿·ロッカーは11時まで"], en: ["Drop off", "By 11:00 (store varies)"] },
  { ko: ["짐 수송 시작", "직원이 픽업하면 운송 시작"], ja: ["輸送開始", "スタッフ集荷後に輸送"], en: ["Transit", "Starts after pickup"] },
];

/** 짐캐리 픽업 (§FE설계 1 — 하단 탭) — 이용법/가능 숙소/무인 보관함/FAQ */
export default function PickupPage() {
  const { lang, T, tr } = useLang();
  const [view, setView] = useState<PkView>("use");
  const [query, setQuery] = useState("");
  const [faqOpen, setFaqOpen] = useState("");

  const L = {
    title: { ko: "짐캐리 픽업", ja: "ジムキャリー集荷", en: "GimCarry Pickup" }[lang],
    howto: { ko: "이용 방법", ja: "使い方", en: "How it works" }[lang],
    hotelLabel: { ko: "픽업 가능 숙소", ja: "集荷可能な宿", en: "Partner stays" }[lang],
    hotelCount: { ko: "343개 제휴", ja: "343軒 提携", en: "343 partners" }[lang],
    searchPh: { ko: "숙소명·지역 검색", ja: "宿名・エリアで検索", en: "Search stay / area" }[lang],
    ok: { ko: "가능", ja: "可能", en: "OK" }[lang],
    na: { ko: "미등록", ja: "未登録", en: "N/A" }[lang],
    zcTitle: { ko: "짐캐리 무인 보관함 · 부산", ja: "ジムキャリー無人ロッカー · 釜山", en: "GimCarry lockers · Busan" }[lang],
    zcHours: { ko: `운영 ${ZC.hours}`, ja: `営業 ${ZC.hours}`, en: `Open ${ZC.hours}` }[lang],
    zcFee: {
      ko: "소 2,000 · 중 3,000 · 대 4,000원 (기본 4시간, 이후 12시간마다 추가)",
      ja: "小2,000 · 中3,000 · 大4,000원（基本4時間・以降12時間毎）",
      en: "S 2,000 · M 3,000 · L 4,000원 (4 hrs base, +per 12 hrs)",
    }[lang],
    mapLabel: { ko: "카카오맵", ja: "カカオマップ", en: "Kakao Map" }[lang],
    faqTitle: { ko: "자주 묻는 질문 · 짐배송", ja: "よくある質問 · 配送", en: "FAQ · Delivery" }[lang],
    countUnit: { ko: "대", ja: "台", en: "" }[lang],
    segs: [
      { key: "use" as PkView, label: { ko: "이용 방법", ja: "使い方", en: "How" }[lang] },
      { key: "hotel" as PkView, label: { ko: "가능 숙소", ja: "対応の宿", en: "Stays" }[lang] },
      { key: "locker" as PkView, label: { ko: "무인 보관함", ja: "無人ロッカー", en: "Lockers" }[lang] },
      { key: "faq" as PkView, label: "FAQ" },
    ],
  };

  const q = query.trim().toLowerCase();
  const hotels = HOTELS.map((h) => ({ ...h, nameStr: tr(h.name), areaStr: tr(h.area) })).filter(
    (h) => !q || h.nameStr.toLowerCase().includes(q) || h.areaStr.toLowerCase().includes(q)
  );

  return (
    <div className="flex min-h-0 flex-1 animate-fade-up flex-col">
      <AppHeader title={L.title} showMap={false} />

      {/* 세그먼트 */}
      <div className="hd-scroll flex flex-none gap-1.5 overflow-x-auto px-3.5 pt-3">
        {L.segs.map((sg) => {
          const active = view === sg.key;
          return (
            <button
              key={sg.key}
              onClick={() => setView(sg.key)}
              className={`flex min-h-[34px] flex-none items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-semibold active:scale-[0.96] ${
                active ? "border-primary bg-primary text-white" : "border-primary-line bg-white text-primary-dark"
              }`}
            >
              {sg.label}
            </button>
          );
        })}
      </div>

      <div className="hd-scroll flex flex-1 flex-col gap-5 overflow-y-auto px-3.5 py-4">
        {view === "use" && (
          <>
            <div className="flex flex-col gap-[11px]">
              <span className="text-label font-bold text-ink">{L.howto}</span>
              <div className="grid grid-cols-2 gap-2">
                {STEPS.map((st, i) => (
                  <div key={i} className="flex flex-col gap-1.5 rounded-sm border border-line bg-card p-3">
                    <div className="flex items-center gap-[7px]">
                      <div className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-primary-bg text-[12px] font-extrabold text-primary-dark">
                        {i + 1}
                      </div>
                      <span className="text-[12.5px] font-bold text-ink">{st[lang][0]}</span>
                    </div>
                    <span className="whitespace-pre-line text-[10.5px] leading-normal text-sub">
                      {st[lang][1]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2 rounded-md border border-line bg-card p-3.5">
              <a
                href="https://zimcarry.net/reserve/res.php?res_type=transport&pNation=10"
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 w-full items-center justify-center gap-1.5 rounded-sm bg-primary text-body font-bold text-white active:scale-[0.98] active:bg-primary-dark"
              >
                {T.reserve}
                <ArrowOutIcon stroke="#fff" />
              </a>
            </div>
          </>
        )}

        {view === "hotel" && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-label font-bold text-ink">{L.hotelLabel}</span>
              <span className="text-[11.5px] text-gray">{L.hotelCount}</span>
            </div>
            <div className="flex h-[42px] items-center gap-2 rounded-xs border border-line-strong bg-canvas px-3.5">
              <SearchIcon />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={L.searchPh}
                className="flex-1 bg-transparent text-[14px] text-ink outline-none"
              />
            </div>
            {hotels.length === 0 && (
              <div className="p-6 text-center text-[13.5px] text-sub">{T.noResult}</div>
            )}
            {hotels.map((h) => (
              <div
                key={h.nameStr}
                className="flex items-center justify-between gap-2.5 rounded-sm border border-line bg-card px-3.5 py-3"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-[14px] font-bold text-ink">{h.nameStr}</span>
                  <span className="text-[11.5px] text-sub">{h.areaStr}</span>
                </div>
                <span
                  className={`flex-none rounded-lg px-2.5 py-1 text-caption font-bold ${
                    h.ok ? "bg-congestion-1bg text-success" : "bg-[#F1ECE6] text-gray"
                  }`}
                >
                  {h.ok ? L.ok : L.na}
                </span>
              </div>
            ))}
          </div>
        )}

        {view === "locker" && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-label font-bold text-ink">{L.zcTitle}</span>
              <span className="text-caption text-gray">{L.zcHours}</span>
            </div>
            <div className="rounded-xxs bg-canvas px-[11px] py-2 text-[11.5px] text-sub">{L.zcFee}</div>
            {ZC.lockers.map((z) => (
              <a
                key={z.place}
                href={z.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-2.5 rounded-sm border border-line bg-card px-3.5 py-3 no-underline"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-[14px] font-bold text-ink">{z.place}</span>
                  <span className="text-[11.5px] text-sub">
                    {z.area} · {z.loc} · {z.count}
                    {L.countUnit}
                  </span>
                </div>
                <span className="inline-flex flex-none items-center gap-[3px] text-caption font-bold text-primary-dark">
                  {L.mapLabel}
                  <ArrowOutIcon size={13} />
                </span>
              </a>
            ))}
          </div>
        )}

        {view === "faq" && (
          <div className="flex flex-col gap-2">
            <span className="text-label font-bold text-ink">{L.faqTitle}</span>
            {ZC.faq["짐배송"].map((f, i) => {
              const id = `d${i}`;
              const open = faqOpen === id;
              return (
                <div key={id} className="overflow-hidden rounded-sm border border-line bg-card">
                  <button
                    onClick={() => setFaqOpen(open ? "" : id)}
                    className="flex w-full items-start justify-between gap-2.5 px-3.5 py-[13px] text-left active:bg-canvas"
                  >
                    <span className="text-[12.5px] font-semibold leading-snug text-ink">{f.q}</span>
                    <span className="flex-none text-[18px] font-semibold leading-none text-primary">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <div className="px-3.5 pb-3.5 text-[12.5px] leading-relaxed text-sub">{f.a}</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
