"use client";

import { createContext, useContext, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import LangSheet from "@/components/sheets/LangSheet";
import LockerSheet from "@/components/sheets/LockerSheet";
import SourceSheet from "@/components/sheets/SourceSheet";
import MapOverlay from "@/components/sheets/MapOverlay";

type SheetState = { type: "locker"; lockerId: string } | { type: "source" } | null;

interface UiCtx {
  openLangSheet: () => void;
  openMap: () => void;
  closeMap: () => void;
  openLockerSheet: (lockerId: string) => void;
  openSourceSheet: () => void;
  toast: () => void;
}

const Ctx = createContext<UiCtx | null>(null);

/** 지도·시트는 라우트가 아닌 오버레이 — 3탭 어디서든 열 수 있다. */
export function UiProvider({ children }: { children: React.ReactNode }) {
  const [langSheet, setLangSheet] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [sheet, setSheet] = useState<SheetState>(null);
  const [toastOn, setToastOn] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>();
  const { T } = useLang();

  const toast = () => {
    setToastOn(true);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastOn(false), 2200);
  };

  return (
    <Ctx.Provider
      value={{
        openLangSheet: () => setLangSheet(true),
        openMap: () => setMapOpen(true),
        closeMap: () => setMapOpen(false),
        openLockerSheet: (lockerId) => setSheet({ type: "locker", lockerId }),
        openSourceSheet: () => setSheet({ type: "source" }),
        toast,
      }}
    >
      {children}

      {mapOpen && (
        <MapOverlay
          onClose={() => setMapOpen(false)}
          onLockerTap={(id) => setSheet({ type: "locker", lockerId: id })}
        />
      )}
      {langSheet && <LangSheet onClose={() => setLangSheet(false)} />}
      {sheet?.type === "locker" && (
        <LockerSheet lockerId={sheet.lockerId} onClose={() => setSheet(null)} />
      )}
      {sheet?.type === "source" && <SourceSheet onClose={() => setSheet(null)} />}

      {toastOn && (
        <div className="absolute inset-x-4 bottom-[calc(90px+env(safe-area-inset-bottom))] z-toast animate-fade-up rounded-sm bg-ink px-4 py-3 text-label leading-normal text-white shadow-raised">
          {T.reserveNote}
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useUi() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useUi must be used within UiProvider");
  return ctx;
}
