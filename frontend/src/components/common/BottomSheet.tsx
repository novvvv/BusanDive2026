"use client";

/** 스크림 + 하단 시트 셸. 스크림 탭/Esc로 닫힘, 시트 내부 클릭은 전파 차단. */
export default function BottomSheet({
  onClose,
  children,
  z = "z-sheet",
}: {
  onClose: () => void;
  children: React.ReactNode;
  z?: string;
}) {
  return (
    <div
      className={`absolute inset-0 ${z} flex animate-scrim-in flex-col justify-end bg-ink/30`}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      {/* 88% 캡 상시 적용 — 짧은 화면(가로모드·소형)에서 내용이 넘치면 시트 내부 스크롤 */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="hd-scroll max-h-[88%] animate-sheet-up overflow-y-auto rounded-t-xl bg-card"
      >
        <div className="sticky top-0 z-[2] bg-card px-5 pb-1.5 pt-2.5">
          <div className="mx-auto h-1 w-10 rounded-full bg-line-strong" />
        </div>
        <div className="px-5 pb-[calc(28px+env(safe-area-inset-bottom))] pt-1.5">{children}</div>
      </div>
    </div>
  );
}
