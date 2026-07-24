"use client";

import BottomSheet from "@/components/common/BottomSheet";
import { DocIcon } from "@/components/common/Icons";
import { RAG_FEE } from "@/lib/content";
import { useLang } from "@/lib/i18n";

/** 근거 문서 시트 — RAG 출처 원문 + 기준 시점(as_of). 인용은 본문과 시각 구분 (§4.4) */
export default function SourceSheet({ onClose }: { onClose: () => void }) {
  const { T, tr } = useLang();
  const r = RAG_FEE;
  return (
    <BottomSheet onClose={onClose} scroll>
      <div className="mb-3.5 flex items-center gap-2">
        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-lg bg-heritage-bg text-[#8A6516]">
          <DocIcon size={15} />
        </div>
        <span className="text-[18px] font-extrabold text-ink">{T.citedFrom}</span>
      </div>
      <div className="mb-4 rounded-sm bg-canvas px-4 py-3 text-[14px] leading-relaxed text-ink">
        {tr(r.answer)}
      </div>
      <div className="flex flex-col gap-2.5">
        {r.sources.map((sc) => (
          <div key={sc.id} className="flex flex-col gap-1.5 rounded-sm border border-line px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[13.5px] font-bold text-ink">{tr(sc.name)}</span>
              <span className="whitespace-nowrap text-caption text-gray">
                {sc.as_of} {T.asOf}
              </span>
            </div>
            <div className="border-l-[3px] border-primary-line py-0.5 pl-3 text-label italic leading-normal text-sub">
              {tr(sc.quote)}
            </div>
          </div>
        ))}
      </div>
    </BottomSheet>
  );
}
