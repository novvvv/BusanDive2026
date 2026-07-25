"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChatTabIcon, LockerIcon, TruckTabIcon } from "@/components/common/Icons";
import { useLang } from "@/lib/i18n";

/** 하단 3탭 고정 내비 (채팅/보관소/픽업) */
export default function TabBar() {
  const pathname = usePathname();
  const { lang } = useLang();

  const tabs = [
    { href: "/chat", label: { ko: "채팅", ja: "チャット", en: "Chat" }[lang], Icon: ChatTabIcon },
    { href: "/lockers", label: { ko: "보관소", ja: "ロッカー", en: "Lockers" }[lang], Icon: LockerIcon },
    { href: "/pickup", label: { ko: "픽업", ja: "集荷", en: "Pickup" }[lang], Icon: TruckTabIcon },
  ];

  return (
    <nav className="z-docked flex flex-none rounded-t-xl bg-card px-1 pb-[calc(8px+env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-4px_16px_rgba(42,35,32,0.06)]">
      {tabs.map(({ href, label, Icon }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            className={`flex flex-1 flex-col items-center gap-[3px] py-[5px] active:scale-[0.94] ${
              active ? "text-primary" : "text-gray"
            }`}
          >
            <Icon size={22} />
            <span className="text-[10.5px] font-bold">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
