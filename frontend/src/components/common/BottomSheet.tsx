"use client";

/** 스크림 + 하단 시트 셸. 스크림 탭/Esc로 닫힘, 시트 내부 클릭은 전파 차단. */
export default function BottomSheet({
  onClose,
  children,
  z = "z-sheet",
  scroll = false,
}: {
  onClose: () => void;
  children: React.ReactNode;
  z?: string;
  scroll?: boolean;
}) {
  return (
    <div
      className={`absolute inset-0 ${z} flex animate-scrim-in flex-col justify-end bg-ink/30`}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`hd-scroll animate-sheet-up rounded-t-xl bg-card ${
          scroll ? "max-h-[88%] overflow-y-auto" : ""
        }`}
      >
        <div className="sticky top-0 z-[2] bg-card px-5 pb-1.5 pt-2.5">
          <div className="mx-auto h-1 w-10 rounded-full bg-line-strong" />
        </div>
        <div className="px-5 pb-[calc(28px+env(safe-area-inset-bottom))] pt-1.5">{children}</div>
      </div>
    </div>
  );
}
