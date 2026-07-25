"use client";

/**
 * 상태·엣지 케이스 인라인 카드 모음 (§6)
 * 원칙: 모든 분기는 다음 행동으로 이어진다 — dead-end 금지 (§7-⑤)
 */

import {
  ArrowOutIcon,
  ArrowRightIcon,
  QuestionIcon,
  RetryIcon,
  WarnIcon,
} from "@/components/common/Icons";
import { useLang } from "@/lib/i18n";
import type { ChipVM, LockerVM } from "@/lib/types";
import LockerCard from "./LockerCard";

/** 픽업 불가 (UNREGISTERED / DEADLINE_PASSED) — 실패 톤이 아니라 "대신 이 방법" 톤 */
export function PickFailCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="min-[360px]:ml-[38px] flex items-start gap-2.5 rounded-md border border-l-[3px] border-line border-l-heritage bg-card px-[15px] py-[13px] shadow-card">
      <div className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-heritage-bg text-[#B07A12]">
        <WarnIcon />
      </div>
      <div className="flex flex-col gap-[3px]">
        <div className="text-[13.5px] font-bold text-ink">{title}</div>
        <div className="text-label leading-normal text-sub">{body}</div>
      </div>
    </div>
  );
}

/** 한 정거장 거리 대안 역 재제안 (인근 특대 없음) */
export function AltCard({ altTitle, locker }: { altTitle: string; locker: LockerVM }) {
  return (
    <div className="min-[360px]:ml-[38px] flex flex-col gap-2">
      <span className="inline-flex items-center gap-[5px] self-start rounded-lg bg-primary-bg px-2.5 py-[5px] text-caption font-bold text-primary-dark">
        <ArrowRightIcon />
        {altTitle}
      </span>
      <LockerCard lk={locker} />
    </div>
  );
}

/** 경계 응답 — 에러가 아니다. 정직함의 디자인 순간 (§5.5). 경고색 남용 금지 */
export function BoundaryCard({ body, channels }: { body: string; channels: ChipVM[] }) {
  return (
    <div className="min-[360px]:ml-[38px] flex flex-col gap-3 rounded-md border border-dashed border-line-strong bg-card p-[15px]">
      <div className="flex items-start gap-2">
        <div className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-canvas text-sub">
          <QuestionIcon />
        </div>
        <div className="text-[13.5px] leading-relaxed text-ink">{body}</div>
      </div>
      <div className="flex flex-col gap-2">
        {channels.map((ch) => (
          <button
            key={ch.label}
            onClick={ch.onClick}
            className="flex min-h-[44px] w-full items-center justify-between rounded-xs border border-line-strong bg-canvas px-3.5 text-[13.5px] font-semibold text-ink active:scale-[0.98]"
          >
            {ch.label}
            <ArrowOutIcon />
          </button>
        ))}
      </div>
    </div>
  );
}

/** 결과 0건 — 다른 지역 제안 칩 동반 */
export function ZeroCard({ body, chips }: { body: string; chips: ChipVM[] }) {
  return (
    <div className="min-[360px]:ml-[38px] flex flex-col gap-2.5">
      <div className="rounded-md rounded-tl-md border border-line bg-card px-3.5 py-3 text-[14px] leading-normal text-ink shadow-card">
        {body}
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.label}
            onClick={c.onClick}
            className="min-h-11 rounded-full border border-primary-line bg-card px-[15px] text-[13.5px] font-semibold text-primary-dark active:scale-[0.96] active:bg-primary-bg"
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** 네트워크 오류 — 인라인 + 재시도. 전체 화면 오류 금지, 대화 맥락 보존 (§6) */
export function NetErrCard({ body, onRetry }: { body: string; onRetry: () => void }) {
  const { T } = useLang();
  return (
    <div className="min-[360px]:ml-[38px] flex items-center gap-[11px] rounded-md border border-[#F0D2CE] bg-card px-[15px] py-[13px]">
      <div className="flex-1 text-label leading-normal text-sub">{body}</div>
      <button
        onClick={onRetry}
        className="flex min-h-11 flex-none items-center gap-[5px] rounded-xs border border-primary-line bg-primary-bg px-[15px] text-label font-bold text-primary-dark active:scale-[0.97]"
      >
        <RetryIcon />
        {T.retry}
      </button>
    </div>
  );
}
