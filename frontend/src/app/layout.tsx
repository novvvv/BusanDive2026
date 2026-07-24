import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "반나절 · 半日 · Half Day",
  description: "짐을 내려놓으면, 마지막 반나절이 여행이 됩니다.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover", // 웹뷰 safe-area 대응 (§3)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        {/* 모바일 웹뷰 전용 — 태블릿에서 안 깨지게 430px 컨테이너 상한 */}
        <div className="relative mx-auto h-dvh w-full max-w-webview overflow-hidden bg-canvas shadow-[0_0_40px_rgba(42,35,32,0.12)]">
          <LangProvider>{children}</LangProvider>
        </div>
      </body>
    </html>
  );
}
