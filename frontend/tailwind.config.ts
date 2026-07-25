import type { Config } from "tailwindcss";

/**
 * 반나절 · 半日 · Half Day — Design Tokens
 * Brand direction: 1c "Sunset Relief" (terracotta + heritage yellow, cream canvas)
 * Mobile webview only (360–430px, base 390px). No dark mode (out of scope).
 *
 * 비타협 원칙 관련 토큰 주석은 그대로 유지할 것 (색맹 대응 혼잡 4등급 등).
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand — terracotta primary. 유일한 "행동" 색.
        primary: {
          DEFAULT: "#D9502E",
          dark: "#B23E20", // pressed / strong
          bg: "#FDECE4", // tinted surface (badge, selected chip)
          line: "#F0D8CC", // tinted border (selected chip, xl cell)
        },
        // Heritage yellow — 악센트/하이라이트 전용, 절대 CTA 색으로 쓰지 않음
        heritage: { DEFAULT: "#FFB23E", bg: "#FFF3DD" },
        // Ink / greyscale (warm-tinted)
        ink: "#2A2320", // text primary (AA on card/canvas)
        sub: "#6B5F58", // text secondary
        gray: "#A79B90", // text tertiary / placeholder
        line: "#EDE4DA", // hairline border
        "line-strong": "#E0D5C8",
        canvas: "#F6F3EF", // page background (warm gray-cream — 채도 낮춘 크림, 쿨 그레이 금지 유지)
        card: "#FFFFFF",
        // Status
        success: "#1E9E6A",
        danger: "#DB4A3D",
        warn: "#E0912F",
        // 혼잡 4등급 — 색 + 텍스트 라벨 병행 (색만으로 구분 금지, §3 접근성)
        // grade1 여유 / grade2 보통 / grade3 혼잡 / grade4 심함
        congestion: {
          "1": "#1E9E6A",
          "1bg": "#E3F3EC",
          "2": "#C99A2E",
          "2bg": "#FBF0D2",
          "3": "#E1712B",
          "3bg": "#FBE4D3",
          "4": "#C93F35",
          "4bg": "#F8DAD5",
        },
      },
      fontFamily: {
        // Pretendard(한/라틴) + 일본어 시스템 폴백
        sans: [
          "Pretendard",
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic",
          "Noto Sans JP",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }] — 타이트한 자간
        caption: ["11px", { lineHeight: "1.45", letterSpacing: "-0.01em" }],
        label: ["13px", { lineHeight: "1.5", letterSpacing: "-0.01em" }],
        body: ["15px", { lineHeight: "1.6", letterSpacing: "-0.01em" }],
        "body-lg": ["17px", { lineHeight: "1.6", letterSpacing: "-0.015em" }],
        title: ["19px", { lineHeight: "1.4", letterSpacing: "-0.02em" }],
        "title-lg": ["22px", { lineHeight: "1.35", letterSpacing: "-0.025em" }],
        display: ["28px", { lineHeight: "1.25", letterSpacing: "-0.03em" }],
        "display-lg": ["34px", { lineHeight: "1.2", letterSpacing: "-0.035em" }],
      },
      spacing: {
        // 4px grid + 모바일 side padding 토큰
        side: "20px", // compact default
        "side-lg": "24px",
        safe: "env(safe-area-inset-bottom)",
      },
      borderRadius: {
        xxs: "10px",
        xs: "12px", // icon tile
        sm: "14px",
        md: "18px",
        lg: "20px", // card
        xl: "24px", // bottom sheet top corners
        "2xl": "28px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(42,35,32,0.06)",
        raised: "0 3px 14px rgba(42,35,32,0.08)",
        sheet: "0 -8px 32px rgba(42,35,32,0.14)",
        fab: "0 6px 20px rgba(217,80,46,0.28)",
      },
      zIndex: {
        header: "10",
        docked: "20", // input bar / bottom CTA
        overlay: "30", // map overlay
        scrim: "40",
        sheet: "50",
        langsheet: "55",
        toast: "60",
      },
      maxWidth: {
        webview: "430px", // 태블릿에서 안 깨지게 컨테이너 상한
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "sheet-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "scrim-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        blink: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.25" } },
      },
      animation: {
        // prefers-reduced-motion 존중은 globals.css에서 일괄 처리
        "fade-up": "fade-up 220ms cubic-bezier(0.16,1,0.3,1)",
        "sheet-up": "sheet-up 260ms cubic-bezier(0.16,1,0.3,1)",
        "scrim-in": "scrim-in 200ms ease",
        blink: "blink 1s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
