"use client";

import { useState } from "react";
import AppHeader from "@/components/common/AppHeader";
import { ArrowOutIcon, ChevronDownIcon, SearchIcon, StayIcon } from "@/components/common/Icons";
import { ZC } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { ZIMCARRY_FAQ_SECTIONS } from "@/lib/zimcarryFaq";
import { localizeZimcarryHotelAddress, localizeZimcarryHotelName } from "@/lib/zimcarryHotelNames";
import { ZIMCARRY_HOTELS } from "@/lib/zimcarryHotels";
import { ZIMCARRY_PICKUP_POLICY } from "@/lib/zimcarryPolicy";

type PkView = "use" | "hotel" | "locker" | "faq";

const STEPS = [
  { ko: ["예약·결제", "당일 온라인은 오전 11시 이전\n매장 접수는 오후 3시 이전"], ja: ["予約·決済", "当日オンラインは11時まで\n店舗受付は15時まで"], en: ["Reserve", "Online by 11:00\nIn-store by 15:00"] },
  { ko: ["짐 사진 등록", "알림톡에서 맡길 짐 1장 촬영·업로드"], ja: ["荷物の写真", "通知から荷物を1枚撮影"], en: ["Photo", "1 photo via alert-talk"] },
  { ko: ["출발지에 맡기기", "숙소·보관함은 오전 11시 이전 (매장 상이)"], ja: ["預ける", "宿·ロッカーは11時まで"], en: ["Drop off", "By 11:00 (store varies)"] },
  { ko: ["짐 수송 시작", "직원이 픽업하면 운송 시작"], ja: ["輸送開始", "スタッフ集荷後に輸送"], en: ["Transit", "Starts after pickup"] },
];

/** 짐캐리 픽업 (§FE설계 1 — 하단 탭) — 이용법/가능 숙소/무인 보관함/FAQ */
export default function PickupPage() {
  const { lang, T } = useLang();
  const [view, setView] = useState<PkView>("use");
  const [query, setQuery] = useState("");
  const [faqOpen, setFaqOpen] = useState("");

  const L = {
    title: { ko: "짐캐리 픽업", ja: "ジムキャリー集荷", en: "GimCarry Pickup" }[lang],
    howto: { ko: "이용 방법", ja: "使い方", en: "How it works" }[lang],
    reserveHint: {
      ko: `짐캐리 공식 사이트로 이동 · 당일 온라인 예약 ${ZIMCARRY_PICKUP_POLICY.onlineReservationBy}까지`,
      ja: `ジムキャリー公式サイトへ移動 · 当日オンライン予約は${ZIMCARRY_PICKUP_POLICY.onlineReservationBy}まで`,
      en: `Opens the GimCarry site · Same-day online booking by ${ZIMCARRY_PICKUP_POLICY.onlineReservationBy}`,
    }[lang],
    hotelLabel: { ko: "짐캐리 등록 숙소", ja: "ジムキャリー登録宿泊先", en: "GimCarry registered stays" }[lang],
    hotelCount: {
      ko: `${ZIMCARRY_HOTELS.length}개 등록`,
      ja: `${ZIMCARRY_HOTELS.length}軒 登録`,
      en: `${ZIMCARRY_HOTELS.length} registered`,
    }[lang],
    searchPh: { ko: "숙소명·지역 검색", ja: "宿名・エリアで検索", en: "Search stay / area" }[lang],
    zcTitle: { ko: "짐캐리 무인 보관함", ja: "ジムキャリー無人ロッカー", en: "GimCarry lockers" }[lang],
    zcHours: { ko: `운영 ${ZC.hours}`, ja: `営業 ${ZC.hours}`, en: `Open ${ZC.hours}` }[lang],
    zcFeeLabel: { ko: "크기별 요금", ja: "サイズ別 料金", en: "Price by size" }[lang],
    zcFeeBase: { ko: "기본 4시간 기준", ja: "基本4時間の料金", en: "Base fare for 4 hrs" }[lang],
    areaBadge: { ko: "부산", ja: "釜山", en: "Busan" }[lang],
    mapLabel: { ko: "카카오맵", ja: "カカオマップ", en: "Kakao Map" }[lang],
    faqTitle: { ko: "자주 묻는 질문 · 짐배송", ja: "よくある質問 · 配送", en: "FAQ · Delivery" }[lang],
    countUnit: { ko: "대", ja: "台", en: "" }[lang],
    segs: [
      { key: "use" as PkView, label: { ko: "이용 방법", ja: "使い方", en: "How" }[lang] },
      { key: "hotel" as PkView, label: { ko: "등록 숙소", ja: "登録宿泊先", en: "Stays" }[lang] },
      { key: "locker" as PkView, label: { ko: "무인 보관함", ja: "無人ロッカー", en: "Lockers" }[lang] },
      { key: "faq" as PkView, label: "FAQ" },
    ],
  };

  const q = query.trim().toLowerCase();
  const hotels = ZIMCARRY_HOTELS.filter(
    (hotel) =>
      !q ||
      hotel.name.toLowerCase().includes(q) ||
      localizeZimcarryHotelName(hotel.name, lang).toLowerCase().includes(q) ||
      hotel.address.toLowerCase().includes(q),
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
              className={`flex min-h-10 flex-none items-center whitespace-nowrap rounded-full border px-3.5 text-[12.5px] font-semibold active:scale-[0.96] ${
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
              <div className="flex flex-col gap-2">
                {STEPS.map((st, i) => (
                  <div key={i} className="flex items-start gap-2.5 rounded-sm border border-line bg-card p-3">
                    <div className="flex h-[22px] w-[22px] flex-none items-center justify-center rounded-full bg-primary-bg text-[12px] font-extrabold text-primary-dark">
                      {i + 1}
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-[12.5px] font-bold leading-[22px] text-ink">{st[lang][0]}</span>
                      <span className="whitespace-pre-line text-[11px] leading-normal text-sub">
                        {st[lang][1]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={ZIMCARRY_PICKUP_POLICY.reservationUrl}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-sm bg-primary text-label font-bold text-white active:scale-[0.98] active:bg-primary-dark"
              >
                {T.reserve}
                <ArrowOutIcon size={14} stroke="#fff" />
              </a>
              {/* 외부 딥링크 + 마감 근거 한 줄 (§7-④) — 시각은 정책 데이터 원본 유지 */}
              <span className="text-center text-[11px] text-gray">{L.reserveHint}</span>
            </div>
          </>
        )}

        {view === "hotel" && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-baseline justify-between">
              <span className="text-label font-bold text-ink">{L.hotelLabel}</span>
              <span className="text-[11.5px] text-gray">{L.hotelCount}</span>
            </div>
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
            {hotels.length === 0 && (
              <div className="p-6 text-center text-[13.5px] text-sub">{T.noResult}</div>
            )}
            {hotels.map((h) => (
              <div
                key={h.name}
                className="flex items-center justify-between gap-2.5 rounded-sm border border-line bg-card px-3.5 py-3"
              >
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="flex items-center gap-1.5 text-[14px] font-bold text-ink">
                    <span className="flex-none text-primary">
                      <StayIcon />
                    </span>
                    <span className="truncate">{localizeZimcarryHotelName(h.name, lang)}</span>
                  </span>
                  <span className="text-[11.5px] text-sub">
                    {localizeZimcarryHotelAddress(h.address, lang)}
                  </span>
                </div>
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
            {/* 크기별 요금 — 보관소 현황·상세 시트와 동일한 셀 그리드 패턴 (흰 카드로 묶음) */}
            <div className="flex flex-col gap-2 rounded-md border border-line bg-card p-3.5 shadow-card">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-caption font-bold text-sub">{L.zcFeeLabel}</span>
                <span className="text-[10px] font-semibold text-gray">{L.zcFeeBase}</span>
              </div>
              <div className="flex gap-1.5">
                {ZC.pricing.map((p, i) => (
                  <div
                    key={p.size}
                    className="flex-1 rounded-[9px] border border-line bg-canvas px-0.5 py-1.5 text-center"
                  >
                    <div className="text-[10px] font-semibold text-gray">
                      {[T.small, T.medium, T.large][i]}
                    </div>
                    <div className="mt-px text-label font-extrabold text-ink">{p.base}</div>
                  </div>
                ))}
              </div>
            </div>
            <span className="mt-1 w-fit rounded-full bg-primary-bg px-2.5 py-1 text-caption font-bold text-primary-dark">
              {L.areaBadge}
            </span>
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
          <div className="flex flex-col gap-4">
            <span className="-mb-1.5 text-label font-bold text-ink">{L.faqTitle}</span>
            {ZIMCARRY_FAQ_SECTIONS.map((section) => (
              <div key={section.id} className="flex flex-col gap-2">
                <span className="text-[12px] font-bold text-sub">{section.title[lang]}</span>
                {section.items.map((f, i) => {
                  const id = `${section.id}-${i}`;
                  const open = faqOpen === id;
                  return (
                    <div key={id} className="overflow-hidden rounded-sm border border-line bg-card">
                      <button
                        onClick={() => setFaqOpen(open ? "" : id)}
                        className="flex w-full items-start justify-between gap-2.5 px-3.5 py-[13px] text-left active:bg-canvas"
                      >
                        <span className="text-[12.5px] font-semibold leading-snug text-ink">
                          {f.q[lang]}
                        </span>
                        <span
                          className={`mt-0.5 flex-none text-primary transition-transform ${open ? "rotate-180" : ""}`}
                        >
                          <ChevronDownIcon size={15} />
                        </span>
                      </button>
                      {open && (
                        <div className="whitespace-pre-line px-3.5 pb-3.5 text-[12.5px] leading-relaxed text-sub">
                          {f.a[lang]}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
