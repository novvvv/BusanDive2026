"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SunLogo } from "@/components/common/Icons";
import { LANGS, OB } from "@/lib/content";
import { useLang } from "@/lib/i18n";

/**
 * 온보딩 · 언어 선택 (§4.1) — 1스크린, 스크롤 없음.
 * 언어 선택 즉시 채팅 진입(확인 단계 없음). 재방문 시 저장 언어로 온보딩 스킵.
 */
export default function Onboarding() {
  const router = useRouter();
  const { lang, ready, stored, setLang } = useLang();

  useEffect(() => {
    if (ready && stored) router.replace("/chat");
  }, [ready, stored, router]);

  if (!ready || stored) return null;

  const ob = OB[lang];

  return (
    <div className="absolute inset-0 flex animate-fade-up flex-col bg-canvas">
      <div className="flex flex-1 flex-col items-center justify-center gap-[22px] px-8 text-center">
        <div className="flex h-[78px] w-[78px] items-center justify-center rounded-xl bg-primary shadow-fab">
          <SunLogo size={46} />
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="flex flex-col items-center gap-[3px] text-ink">
            <span className="text-[32px] font-extrabold leading-none tracking-tight">반나절</span>
            <span className="text-body-lg font-semibold tracking-normal text-sub">はんにち</span>
            <span className="text-[16px] font-semibold text-sub">Half Day</span>
          </div>
          <p className="max-w-[300px] text-body leading-relaxed text-sub [text-wrap:pretty]">
            {ob.tagline}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2.5 px-6 pb-[calc(30px+env(safe-area-inset-bottom))]">
        <div className="mb-1.5 text-center text-[12.5px] text-gray">{ob.pick}</div>
        {LANGS.map((l) => (
          <button
            key={l.code}
            onClick={() => {
              setLang(l.code);
              router.push("/chat");
            }}
            className="flex min-h-14 w-full items-center justify-center rounded-md border border-line-strong bg-card text-body-lg font-bold text-ink active:scale-[0.97] active:border-primary active:text-primary"
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
