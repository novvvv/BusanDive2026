"use client";

import BottomSheet from "@/components/common/BottomSheet";
import { CheckIcon } from "@/components/common/Icons";
import { LANGS } from "@/lib/content";
import { useLang } from "@/lib/i18n";

/** 언어 전환 시트 — 이력 유지, 이후 답변만 새 언어 (§8 다국어) */
export default function LangSheet({ onClose }: { onClose: () => void }) {
  const { lang, setLang, T } = useLang();
  return (
    <BottomSheet onClose={onClose} z="z-langsheet">
      <div className="mb-3 text-[16px] font-bold text-ink">{T.langSheetTitle}</div>
      <div className="flex flex-col gap-2">
        {LANGS.map((l) => {
          const active = l.code === lang;
          return (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                onClose();
              }}
              className={`flex min-h-[52px] w-full items-center justify-between rounded-sm border px-4 text-[16px] font-bold active:scale-[0.98] ${
                active
                  ? "border-primary-line bg-primary-bg text-primary-dark"
                  : "border-line-strong bg-card text-ink"
              }`}
            >
              {l.label}
              {active && <CheckIcon />}
            </button>
          );
        })}
      </div>
    </BottomSheet>
  );
}
