# CLAUDE.md

반나절(Half Day) 프론트엔드 레포. Claude Code가 이 프로젝트에서 작업할 때 반드시 따를 규칙과,
상세 문서를 **언제 읽을지**를 정의한다.

> 이 파일은 매 세션 컨텍스트에 항상 로드된다. 가볍게 유지하고, 상세 내용은 통째로 옮기지 말고
> 아래 포인터를 따라 **필요한 순간에** 해당 파일을 읽는다. (컨텍스트 엔지니어링)

---

## 작업 유형별 → 뭘 먼저 읽을 것

| 하려는 작업 | 작업 전에 읽을 파일 |
| ---------- | ------------------- |
| **UI·화면·컴포넌트·스타일** (모든 시각적 산출물) | 아래 "디자인 시스템" 절 + `tailwind.config.ts` (토큰 단일 출처) |
| 기존 컴포넌트 찾기·재사용 | [.claude/rules/component-dictionary.md](.claude/rules/component-dictionary.md) |
| 코드 작성 (네이밍·컴포넌트·훅·타입·import) | [.claude/rules/code-convention.md](.claude/rules/code-convention.md) |
| 프로젝트 구조·빌드·스크립트 | [.claude/rules/project-convention.md](.claude/rules/project-convention.md) |
| 커밋·브랜치·PR | [.claude/rules/git-conventions.md](.claude/rules/git-conventions.md) |
| 도메인 용어·식별자 (역/보관함/혼잡/픽업…) | [.claude/rules/term-dictionary.md](.claude/rules/term-dictionary.md) |

규칙 파일은 핵심 요약(상단)만 읽고 시작해도 되며, 해당 영역을 실제로 건드릴 때 세부 절을 펼쳐 본다.

---

## 디자인 시스템 — 항상 반영 (필수)

**UI를 만들거나 수정하는 모든 작업은 `tailwind.config.ts`의 토큰을 따른다.**
색상값·간격·radius·그림자를 새로 만들지 말고 토큰 클래스를 쓴다. 토큰으로 표현 불가능한
경우에만 임의값(`text-[10.5px]` 등)을 쓰되 최소화한다.

브랜드 방향: **Sunset Relief** — terracotta + heritage yellow, cream canvas.
시각·인터랙션 기준(SoT)은 claude design 프로토타입(`반나절_HalfDay_프로토타입.dc.html`).

### 핵심 토큰 (정확한 값은 `tailwind.config.ts` 확인)

- **브랜드**: `primary #D9502E` (유일한 "행동" 색), `primary-dark`(pressed), `primary-bg`(tinted), `primary-line`(tinted border). `heritage #FFB23E`는 악센트 전용 — **절대 CTA 색으로 쓰지 않음**.
- **중립색**: 웜 그레이 단계 `ink #2A2320`(본문) / `sub` / `gray` / `line` / `line-strong`. 배경 `canvas #F6F3EF`(웜 그레이 크림), 카드 `card #FFF`. 차가운 무채색 그레이 금지.
- **혼잡 4등급**: `congestion-1~4` (+ `-1bg~-4bg`) — **색+텍스트 라벨 병행 필수** (색맹 대응).
- **타입**: Pretendard + 일본어 폴백(Hiragino/Yu Gothic). 스케일 `caption 11 / label 13 / body 15 / body-lg 17 / title 19` — 타이트한 자간 내장.
- **radius**: `xxs 10 ~ 2xl 28`. 카드 `lg(20px)`, 시트 상단 `xl(24px)`, 칩은 `rounded-full`.
- **z-index**: `header 10 / docked 20 / overlay 30 / sheet 50 / langsheet 55 / toast 60` — 숫자 직접 쓰지 않는다.
- **레이아웃**: 모바일 웹뷰 전용 360~430px(기준 390px), `max-w-webview` 컨테이너. 터치 타깃 44px+. 다크모드 없음(범위 외).

### 비타협 UX 원칙 (디자인 재량 아님 — 심사 시연 대상)

1. **'보유 칸수' ≠ '실시간 잔여'** — 칸수 표시 지점마다 "보유 칸수 기준" 명시. 실시간처럼 보이는 장치(라이브 도트 등) 금지.
2. **혼잡은 과거형으로만** — "혼잡했어요" ○ / "혼잡할 거예요" ✕.
3. **수치·요금·시각 변형 금지, 고유명사 원문 병기** — `6,000원 / 3時間` 그대로. 병기는 보조 크기·회색.
4. **근거 없는 사실 표시 없음** — 요금·칸수·마감시간 옆엔 반드시 출처 또는 기준 시점.
5. **막다른 화면 금지** — 모든 불가·없음·오류 상태는 대안 행동 버튼/칩 동반.

---

## 코드·프로젝트 컨벤션 (핵심 요약)

전체 규칙은 [.claude/rules/](.claude/rules/) 참고. 코드를 쓰기 전 의도를 정리한다.

- **컴포넌트**: `function` 선언 + `default export`(공용 모음 파일은 named). 인터랙션 있으면 `'use client'`. 핸들러 `handleXXX`, prop 콜백 `onXXX`.
- **다국어**: 모든 사용자 문구는 `L10n` 객체(`{ko, ja, en}`) + `useLang()`의 `tr()/T`. 하드코딩 금지. 수치·요금·시각은 언어 무관 원본 유지.
- **데이터**: mock은 `src/lib/content.ts`가 단일 출처(핸드오프 부록 A·B 미러). 컴포넌트는 `types.ts` 뷰모델만 사용. BE 연동 시 `lib/api.ts`가 유일한 네트워크 경계.
- **상태**: Context + `useState`. 전역은 `LangProvider`/`UiProvider`만. 커스텀 훅은 `useXXX` + 객체 반환.
- **타입**: `interface` 선호, enum 대신 union. import는 `@/` 절대경로(상대 `../../` 지양).
- **스택**: Next.js 14 App Router + TS + Tailwind v3 + pnpm 9 / Node ≥20.

---

## 스킬 하네스 — 작업 단계별로 스킬을 건다 (필수)

스킬이 조금이라도 해당되면 **작업 시작 전에 먼저 invoke** 한다. 프로세스 스킬(superpowers)이
접근을 정하고, 구현 스타일 스킬(ponytail)이 그 안에서 코드를 최소로 유지한다.

| 상황 | 걸 스킬 | 시점 |
| ---- | ------- | ---- |
| 새 기능·화면·동작 변경 요청 | `superpowers:brainstorming` | 코드·계획 이전, 요구사항이 한 줄이라도 애매하면 |
| 여러 단계 작업의 스펙이 잡혔을 때 | `superpowers:writing-plans` | 구현 착수 전 |
| **모든 코드 작성·수정·리팩터링** | `ponytail:ponytail` | 코딩 시작 시 상시 — 사다리(YAGNI→재사용→stdlib→네이티브→기존 의존성→한 줄) 먼저 오르고 나서 쓴다 |
| 버그·테스트 실패·이상 동작 | `superpowers:systematic-debugging` | 수정안 내기 전 — 원인 규명이 먼저 |
| 작업 "완료" 선언 직전 | `superpowers:verification-before-completion` | `pnpm typecheck && pnpm build` 실행·출력 확인 후에만 완료 주장 |
| 큰 기능 완료·머지 전 | `superpowers:requesting-code-review` + `ponytail:ponytail-review` | 정확성 리뷰와 과설계 리뷰를 각각 |
| 리뷰 피드백 반영 | `superpowers:receiving-code-review` | 맹목 수용 금지 — 기술적 검증 후 반영 |
| PR 본문 작성 | `write-pr` (로컬 스킬) | main 대비 diff → `docs/PR.md` |

### 이 레포에서의 적용 원칙

- **ponytail 사다리와 컴포넌트 사전은 한 몸이다**: "이미 이 코드베이스에 있나?"(사다리 2단)의
  답은 `component-dictionary.md`에서 찾는다. 새로 만들기 전에 사전 먼저.
- 해커톤 데모 레포라 테스트 스위트는 없다. 대신 ponytail의 "비자명한 로직엔 실행 가능한 검증
  하나" 원칙을 따른다 — 검증 수단은 `pnpm typecheck`/`pnpm build`/화면 스모크 확인.
- 의도적으로 깎은 코너는 `// ponytail:` 주석으로 한계와 업그레이드 경로를 남긴다.
  누적분은 `/ponytail-debt`로 회수한다.
- 스킬 워크플로와 이 문서 규칙이 충돌하면 **이 문서(및 rules/)가 우선**한다.

---

## 응답·작업 원칙

- 한국어로 답한다. 확실한 정보만 답하고, 불확실하면 명시 후 검증 방법을 제시한다.
- 비가역적이거나 영향 범위가 큰 작업(파일 삭제, force push, 배포 등)은 먼저 경고하고 롤백 방법을 함께 제시한다.
- 요약은 핵심만 간결하게. 불필요한 서론·반복은 생략한다.
