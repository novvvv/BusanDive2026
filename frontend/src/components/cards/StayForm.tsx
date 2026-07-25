"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";

/** 숙소/여행지 입력 폼 — mode별 필드 분기. 제출 후 요약으로 접힘 (§FE설계 3) */
export default function StayForm({
  mode,
  done,
  stayVal,
  spotVal,
  onSubmit,
}: {
  mode: "pickup" | "spot";
  done: boolean;
  stayVal?: string;
  spotVal?: string;
  onSubmit: (stay: string, spot: string) => void;
}) {
  const { lang } = useLang();
  const [stay, setStay] = useState("");
  const [spot, setSpot] = useState("");
  const isPickup = mode === "pickup";

  const L = {
    formTitle: isPickup
      ? { ko: "짐 픽업을 위해 아래 정보를 입력해주세요", ja: "荷物の集荷のため、以下の情報を入力してください", en: "Enter the details below for luggage pickup" }[lang]
      : { ko: "보관함 추천을 위해 알려주세요", ja: "ロッカーのご提案のため教えてください", en: "Tell us for a locker match" }[lang],
    stayLabel: { ko: "숙소", ja: "宿泊先", en: "Where you stay" }[lang],
    stayPh: { ko: "예) 서면 스테이 호텔", ja: "例）西面ステイホテル", en: "e.g. Seomyeon Stay Hotel" }[lang],
    spotLabel: { ko: "마지막날 여행지", ja: "最終日の旅先", en: "Last-day destination" }[lang],
    spotPh: { ko: "예) 감천문화마을", ja: "例）甘川文化村", en: "e.g. Gamcheon Village" }[lang],
    submit: { ko: "입력", ja: "入力", en: "Submit" }[lang],
    note: isPickup
      ? { ko: "숙소로 픽업 오고, 여행지 동선의 보관함도 함께 찾아드려요.", ja: "宿へ集荷に伺い、旅先動線のロッカーも一緒に探します。", en: "We pick up at your stay and also find lockers along your route." }[lang]
      : { ko: "여행지 근처 지하철 물품 보관소만 추천해드려요.", ja: "旅先近くの地下鉄ロッカーのみおすすめします。", en: "We recommend metro lockers near your destination only." }[lang],
    stayDone: { ko: "숙소", ja: "宿泊先", en: "Stay" }[lang],
    spotDone: { ko: "여행지", ja: "旅先", en: "Destination" }[lang],
  };

  // 16px 미만이면 iOS가 포커스 시 강제 줌
  // ponytail: 40px — 44px 터치 타깃 규칙 예외(칩과 동일 판단), 문제 되면 min-h-[44px] 복귀
  const inputCls =
    "min-h-9 w-full rounded-xs border border-line bg-canvas px-[13px] text-[16px] text-ink outline-none focus:border-primary focus:bg-card";

  return (
    <div className="flex min-w-0 flex-1 max-w-[82%] flex-col gap-3 rounded-md rounded-tl-[5px] border border-line bg-card px-[15px] py-3.5 shadow-card">
      {!done ? (
        <>
          <div className="text-[14px] font-bold text-ink">{L.formTitle}</div>
          {isPickup && (
            <label className="flex flex-col gap-1.5">
              <span className="text-[11.5px] font-semibold text-sub">{L.stayLabel}</span>
              <input
                value={stay}
                onChange={(e) => setStay(e.target.value)}
                placeholder={L.stayPh}
                className={inputCls}
              />
            </label>
          )}
          <label className="flex flex-col gap-1.5">
            <span className="text-[11.5px] font-semibold text-sub">{L.spotLabel}</span>
            <input
              value={spot}
              onChange={(e) => setSpot(e.target.value)}
              placeholder={L.spotPh}
              className={inputCls}
            />
          </label>
          <button
            onClick={() => {
              if (isPickup && !stay.trim()) return;
              if (!spot.trim()) return;
              onSubmit(stay.trim(), spot.trim());
            }}
            className="flex min-h-9 w-full items-center justify-center rounded-sm bg-primary text-[13.5px] font-bold text-white active:scale-[0.98] active:bg-primary-dark"
          >
            {L.submit}
          </button>
          <div className="text-center text-[10.5px] leading-normal text-gray">{L.note}</div>
        </>
      ) : (
        <>
          <div className="text-label font-bold text-ink">{L.formTitle}</div>
          {isPickup && (
            <div className="flex items-baseline gap-2">
              <span className="w-[52px] flex-none text-[11.5px] text-gray">{L.stayDone}</span>
              <span className="text-[13.5px] font-semibold text-ink">{stayVal}</span>
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <span className="w-[52px] flex-none text-[11.5px] text-gray">{L.spotDone}</span>
            <span className="text-[13.5px] font-semibold text-ink">{spotVal}</span>
          </div>
        </>
      )}
    </div>
  );
}
