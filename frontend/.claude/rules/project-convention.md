# 프로젝트 컨벤션

> 핵심 요약: Next.js 14 App Router + TS + Tailwind v3, pnpm 9 / Node ≥20.9, `@/*` = `src/*`.
> 라우트 4개 + 오버레이(지도·시트는 라우트 아님). 새 파일은 "화면 전용 → 2곳 사용 시 승격" 규칙.
> 의존성 추가는 체크리스트 통과 후에만. 푸시 전 `pnpm typecheck && pnpm build` 직접 실행.

---

## 1. 스택

| 항목 | 지정 | 비고 |
| ---- | ---- | ---- |
| 프레임워크 | Next.js 14 (App Router), React 18 | Pages Router 문법(`getServerSideProps` 등) 금지 |
| 언어 | TypeScript strict | `tsconfig.json` strict 유지, 끄지 않는다 |
| 스타일 | Tailwind CSS v3 | 토큰 = `tailwind.config.ts` 단일 출처 |
| 패키지 매니저 | **pnpm 9.x 전용** | npm/yarn 명령 금지 — lockfile 하나만 유지 |
| Node | ≥ 20.9 | |
| 폰트 | Pretendard (CDN) | globals.css에서 import, next/font 미사용 (일어 폴백은 시스템 폰트) |
| 타깃 | 모바일 웹뷰 360~430px | 기준 390px. 데스크탑은 중립 배경 + `max-w-webview` 컨테이너 |

## 2. 디렉토리 구조와 배치 규칙

```text
frontend/
  src/
    app/                    # 라우팅 전용 — 페이지는 얇게, 조립만
      layout.tsx            # 뷰포트·webview 컨테이너·LangProvider
      page.tsx              # 온보딩·언어 선택 (/)
      globals.css           # Tailwind 지시문 + 전역 베이스 (여기 외 전역 CSS 금지)
      (tabs)/
        layout.tsx          # UiProvider + TabBar
        chat/page.tsx       # 채팅 홈 (핵심)
        lockers/page.tsx    # 보관소 현황
        pickup/page.tsx     # 짐캐리 픽업
    components/
      chat/                 # 채팅 화면 전용 (엔진 포함)
      cards/                # 채팅 인라인 카드 (Poi/Locker/Pickup/StayForm/notices)
      sheets/               # 오버레이 (LockerSheet/SourceSheet/LangSheet/MapOverlay)
      common/               # 2개 이상 화면이 쓰는 공용 (AppHeader/TabBar/BottomSheet/Icons/UiProvider)
    lib/
      content.ts            # mock 데이터 + i18n 문자열 (단일 출처)
      i18n.tsx              # LangProvider / useLang
      types.ts              # 뷰모델 (핸드오프 부록 A 미러)
      api.ts                # (예정) 유일한 네트워크 경계
```

### 배치 규칙

- 새 컴포넌트는 **사용하는 화면의 디렉토리**에 먼저 만든다. 두 번째 사용처가 생기면 `common/`으로
  승격 — 미리 공용화하지 않는다.
- 한 파일에서만 쓰는 하위 컴포넌트는 같은 파일 안에 (별도 파일로 쪼개지 않는다).
- `app/` 아래에 컴포넌트 파일을 두지 않는다 — `page.tsx`/`layout.tsx`/라우팅 파일만.
- 유틸 함수는 두 곳 이상에서 쓸 때만 `lib/`로. 한 곳이면 그 파일 안 로컬 함수.
- barrel 파일(`index.ts` 재수출) 금지 — 순환 import·번들 비대의 주범. 경로로 직접 import.

## 3. 라우팅·렌더링

- 라우트는 **화면 전환이 대화 맥락을 잃어도 되는 곳에만** 만든다. 지도·바텀시트·언어 선택은
  라우트가 아닌 오버레이(UiProvider 상태) — 뒤로가기로 대화가 사라지면 안 되기 때문.
- route group `(tabs)`가 하단 탭 3화면의 공용 레이아웃(UiProvider+TabBar)을 소유한다.
  탭 화면 추가 시: `(tabs)/<name>/page.tsx` 생성 → `TabBar` 항목 추가 → component-dictionary 갱신.
- 전 페이지 정적 프리렌더(`○ Static`) 유지가 기본. 페이지에서 요청 시점 데이터가 필요해지면
  그 페이지만 동적으로 전환하고 이 절에 기록한다.
- `metadata`·`viewport`는 루트 `layout.tsx`에서만 선언 (viewport-fit=cover 필수 — safe-area).
- 리다이렉트 로직(온보딩 → /chat)은 클라이언트 `router.replace` — 저장 언어가 localStorage에
  있어 서버에서 판단 불가.

## 4. 스크립트·로컬 개발

```bash
pnpm dev          # 개발 서버 (기본 3000)
pnpm build        # 프로덕션 빌드
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm start        # 빌드 산출물 서빙 (데모 리허설용)
```

- 데모 확인은 `pnpm build && pnpm start`로 — dev 모드에서만 되는 상태로 두지 않는다.
- 확인 뷰포트: **390px 기준, 360/430 양 끝 확인**. 언어는 ja(가장 긴 문자열) 포함 3종.
- `pnpm-lock.yaml`은 항상 커밋. CI/동료와 버전 불일치의 유일한 방어선.

## 5. 의존성 정책

**추가 전 체크리스트** (전부 No일 때만 추가):

1. 표준 라이브러리/브라우저 API로 되는가? (`Intl`, `URLSearchParams`, CSS…)
2. 이미 설치된 것(React·Next·Tailwind)이 제공하는가?
3. 직접 쓰면 몇 줄인가? — 50줄 미만이면 직접 쓴다.

- 추가할 땐 `pnpm add`로만, 그리고 이 문서 스택 표 또는 아래에 **용도 한 줄**을 남긴다.
- 특히 금지: moment(→`Intl`), lodash 전체(→필요 함수 직접), UI 킷(디자인 시스템과 충돌),
  상태관리 라이브러리(Context로 충분한 규모).
- 지도 SDK(카카오/네이버)는 승인된 예정 항목 — 도입 시 `next/dynamic` lazy load +
  `MapOverlay`의 삽입 지점 주석 위치에.

현재 런타임 의존성: `next`, `react`, `react-dom` — 이게 전부이고, 그대로 유지하는 것이 목표.

## 6. 환경변수

- 현재 없음 (전부 mock).
- 도입 규칙:
  - 브라우저 노출 필요 시에만 `NEXT_PUBLIC_` 접두사 — **빌드 타임에 인라인**되므로 배포 환경별로
    빌드가 달라진다는 것을 인지하고 쓴다.
  - 서버 전용 비밀(API 키)은 접두사 없이, Route Handler/서버 컴포넌트에서만 접근.
  - `.env.local`은 gitignore (이미 처리됨), 필요한 키 목록은 `.env.example`로 커밋.
  - 첫 후보: `BACKEND_URL` (BE 연동 시). 추가하면 이 절을 갱신한다.

## 7. 품질 게이트

- **푸시 전**: 자동 게이트 없음 — `pnpm typecheck && pnpm build`를 직접 실행해 통과를 확인하고
  푸시한다. 배포·데모에서 실패할 것을 로컬에서 먼저 잡는 것이 원칙.
- **PR 전**: `.github/PULL_REQUEST_TEMPLATE.md` 체크리스트 — typecheck/build, 3언어 레이아웃,
  비타협 UX 원칙(§7) 위반 없음.
- 경고 방치 금지: 빌드 경고·lint 경고는 그 PR에서 해소하거나 사유를 명시한다. "노란 줄에 익숙해지면
  빨간 줄을 놓친다."

## 8. 배포

- 미정 (해커톤 데모). 현재 기준: 로컬 `pnpm build && pnpm start` 통과 상태를 항상 유지.
- 컨테이너화하게 되면 `output: "standalone"` 추가 + 멀티스테이지 Dockerfile — 결정 시 이 절 재작성.

## 9. 문서 동기화

코드와 문서가 어긋나면 문서를 고치는 커밋을 같이 낸다:

| 변경 | 갱신할 문서 |
| ---- | ----------- |
| 컴포넌트 추가·이동·삭제 | `.claude/rules/component-dictionary.md` (hook이 로그로 환기) |
| 새 도메인 용어·스키마 필드 | `.claude/rules/term-dictionary.md` |
| 구조·스크립트·의존성·환경변수 | 이 문서 |
| 토큰 추가·변경 | `tailwind.config.ts` 주석 + CLAUDE.md 핵심 토큰 절 |
