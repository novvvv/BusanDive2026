"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { LANGS, UI, t, type L10n, type Lang, type UiStrings } from "./content";

const KEY = "hd_lang";

interface LangCtx {
  lang: Lang;
  /** 저장된 언어가 복원되기 전이면 false (온보딩 스킵 판단용) */
  ready: boolean;
  stored: boolean;
  setLang: (l: Lang) => void;
  T: UiStrings;
  tr: <V>(obj: L10n<V>) => V;
  langShort: string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");
  const [ready, setReady] = useState(false);
  const [stored, setStored] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY) as Lang | null;
      if (saved && UI[saved]) {
        setLangState(saved);
        setStored(true);
      }
    } catch {}
    setReady(true);
  }, []);

  const setLang = (l: Lang) => {
    try {
      localStorage.setItem(KEY, l);
    } catch {}
    setLangState(l);
    setStored(true);
  };

  return (
    <Ctx.Provider
      value={{
        lang,
        ready,
        stored,
        setLang,
        T: UI[lang],
        tr: (obj) => t(obj, lang),
        langShort: LANGS.find((l) => l.code === lang)!.short,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
