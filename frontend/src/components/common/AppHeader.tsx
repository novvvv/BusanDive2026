"use client";

import { GlobeIcon, MapIcon, SunLogo } from "@/components/common/Icons";
import { useUi } from "@/components/common/UiProvider";
import { useLang } from "@/lib/i18n";

/**
 * 공용 헤더 — 언어 전환은 어디서든 상시 가능 (§8).
 * title 없으면 로고+서비스명(채팅 홈), 있으면 페이지 타이틀.
 */
export default function AppHeader({
  title,
  showMap = true,
  extra,
}: {
  title?: string;
  showMap?: boolean;
  extra?: React.ReactNode;
}) {
  const { langShort } = useLang();
  const { openLangSheet, openMap } = useUi();

  return (
    <div className="z-header flex h-14 flex-none items-center justify-between border-b border-line bg-card pl-4 pr-2.5">
      {title ? (
        <span className="text-[18px] font-extrabold tracking-tight text-ink">{title}</span>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex h-[30px] w-[30px] items-center justify-center rounded-[9px] bg-primary">
            <SunLogo size={19} />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-body-lg font-extrabold tracking-tight text-ink">반나절</span>
            <span className="text-caption font-medium text-gray">Half Day</span>
          </div>
        </div>
      )}
      <div className="flex items-center gap-[7px]">
        {extra}
        <button
          onClick={openLangSheet}
          aria-label="언어 전환"
          className="flex min-h-[38px] items-center gap-1 rounded-full border border-line-strong bg-card px-3 text-label font-semibold text-sub active:scale-[0.96]"
        >
          <GlobeIcon />
          {langShort}
        </button>
        {showMap && (
          <button
            onClick={openMap}
            aria-label="지도 보기"
            className="flex h-10 w-10 items-center justify-center rounded-xs bg-primary-bg text-primary active:scale-[0.94]"
          >
            <MapIcon />
          </button>
        )}
      </div>
    </div>
  );
}
