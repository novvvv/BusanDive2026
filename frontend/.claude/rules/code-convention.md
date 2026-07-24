# 코드 컨벤션

> 핵심 요약: `function` 선언 컴포넌트 + `default export`, `'use client'`는 리프에 가깝게,
> 파생 상태는 useEffect가 아니라 렌더 중 계산, Tailwind 클래스는 동적 조합 금지(완전한 문자열만),
> 문구는 전부 `L10n`+`useLang`, 데이터는 뷰모델 경계, import는 `@/` 절대경로.

---

## 1. 네이밍

- 변수/함수 `camelCase`, 모듈 레벨 상수 `UPPER_SNAKE_CASE` (`LOCKERS`, `CDOT`, `NEAR`).
- boolean은 `is`/`has`/`should` 접두사 (`isPickup`, `hasImage`, `shouldReset`). 부정형 이름 금지
  (`isNotReady` ✕ → `isReady`로 뒤집는다).
- 컴포넌트 파일 `PascalCase.tsx`. 작은 관련 컴포넌트 모음은 소문자 파일 + named export (`notices.tsx`).
- 내부 이벤트 핸들러 `handleXXX`, prop으로 받는 콜백 `onXXX`. prop → 핸들러 연결은
  `onSubmit={handleSubmit}` 형태로 이름이 짝을 이루게.
- 타입 접미사: 뷰모델 `XxxVM`, 컴포넌트 props `Props`(로컬) 또는 `XxxProps`(export 시),
  API 원본 스키마는 접미사 없이 도메인명 (`Locker`, `Poi`).
- 축약어 금지: `btn`, `idx`, `err` 대신 `button`, `index`, `error`. 단 관례가 압도적인 것은 허용
  (`props`, `ref`, `id`, `url`).

## 2. 컴포넌트 설계

### 서버/클라이언트 경계 (App Router에서 가장 중요한 결정)

- `'use client'`는 **필요한 컴포넌트에만, 트리의 리프에 가깝게**. 페이지·레이아웃은 서버로 남길 수
  있으면 남긴다 (지금 `(tabs)/layout.tsx`가 서버인 이유).
- Provider는 반드시 별도 클라이언트 파일로 분리하고 `{children}`을 받는다 — children으로 넘어간
  서버 컴포넌트는 클라이언트 경계 아래에서도 서버 렌더를 유지한다.
- 서버 컴포넌트에 이벤트 핸들러·훅·브라우저 API를 넣지 않는다. 반대로 클라이언트 컴포넌트에서
  fs·secret 접근 금지.
- 경계를 넘는 props는 직렬화 가능해야 한다 — 함수·클래스 인스턴스 전달 금지.

### 구조

- `function` 선언 + `default export`. 화살표 함수 컴포넌트 금지 (스택트레이스·hoisting 일관성).
- 한 파일에서만 쓰는 하위 컴포넌트는 **같은 파일 하단**에 둔다 (`ChatScreen`의 `Avatar`/`AiRow`).
  두 번째 사용처가 생기는 순간 승격 — 그 전에 미리 분리하지 않는다.
- 컴포넌트가 250줄을 넘으면 분리를 검토하되, "화면 하나 = 엔진 하나"인 경우(ChatScreen)는
  응집도를 우선하고 렌더 조각만 뽑는다.
- early return으로 중첩을 줄인다. `조건 && <JSX/>`에서 조건이 숫자일 수 있으면
  `조건 > 0 && …` 또는 삼항 — `0`이 그대로 렌더되는 함정 방지.
- 리스트 key는 안정된 id (`lk.id`, `m.id`). **index key 금지** — 재정렬·삭제 시 상태가 꼬인다.
  채팅 스트림처럼 클라이언트 생성 항목은 uid 카운터로 id를 만들어 붙인다 (`uid("locker")`).

### Props

- 2~3개면 인라인 타입, 그 이상이거나 export 하면 `interface Props`.
- `{...rest}` spread로 DOM에 흘려보내지 않는다 — 받는 prop을 명시적으로 나열.
- 기본값은 구조분해에서 (`{ size = 18 }`). `defaultProps` 금지.
- 렌더 자원(JSX 조각)은 `extra`, `children` 같은 슬롯 prop으로 — render prop 함수는 마지막 수단.

## 3. 훅·상태

### useEffect 최소주의 — 대부분의 effect는 버그다

- **파생 상태는 렌더 중 계산한다.** `useState`+`useEffect`로 복사하지 않는다.

  ```tsx
  // ✕ 상태 복사 — 렌더 한 프레임 어긋나고, 동기화 버그의 온상
  const [list, setList] = useState<Locker[]>([]);
  useEffect(() => { setList(raw.filter((x) => x.name.includes(q))); }, [raw, q]);

  // ○ 렌더 중 계산 (LockersPage 패턴)
  const list = q ? raw.filter((x) => x.name.includes(q)) : raw;
  ```

- **이벤트에 대한 반응은 이벤트 핸들러에서.** "제출되면 → push"를 effect로 감지하지 않는다.
- effect는 **외부 시스템 동기화 전용**: 스크롤 위치, localStorage, 타이머, 구독.
- effect 안 타이머·리스너는 반드시 cleanup. 반복 설정되는 타이머는 `useRef`로 핸들 보관 후
  `clearTimeout` (ChatScreen `timerRef` 패턴).
- 마운트 1회 로직은 StrictMode 이중 실행을 견뎌야 한다 — 멱등으로 만들거나 `bootedRef` 가드.

### 상태 배치

- 상태는 **사용하는 곳에서 가장 가까운 곳에**. 폼 입력값은 폼 컴포넌트 로컬(StayForm),
  화면 상태는 페이지/스크린, 전역은 정말 화면 3개 이상이 공유할 때만 Context.
- 전역 Provider는 `LangProvider`(언어)·`UiProvider`(오버레이·토스트) 두 개 유지. 추가하기 전에
  기존 것에 합칠 수 있는지 먼저 본다.
- `setState`가 이전 값에 의존하면 함수형 업데이트 `setX(prev => …)` — 연속 호출·비동기 콜백에서
  안전하다.
- 상태에 저장되는 콜백(칩 onClick 등)은 stale closure를 피하기 위해 `api.current.xxx`
  디스패처를 경유시킨다 (ChatScreen 패턴). 새 엔진을 만들면 같은 패턴을 쓴다.

  ```tsx
  // ✕ 저장 시점의 lang/T를 캡처 — 언어 전환 후에도 옛 언어로 응답
  setChips([{ label, onClick: () => act("locker") }]);

  // ○ ref 디스패처 경유 — 실행 시점의 최신 구현 사용
  setChips([{ label, onClick: () => api.current.act("locker") }]);
  // 매 렌더: api.current.act = act;
  ```

- `useMemo`/`useCallback`/`memo`는 **측정된 문제에만**. 기본은 안 쓰는 것 — 이 규모에선
  리렌더 비용보다 캐시 관리 비용이 크다.

### 커스텀 훅

- 파일당 1개, `useXXX`, **객체 반환** (`return { lang, tr, T }` — 위치 인자 튜플 금지).
- 훅이 JSX를 반환하기 시작하면 그건 컴포넌트다 — 분리한다.

## 4. 스타일 (Tailwind v3)

- 색·간격·radius·그림자·z-index는 `tailwind.config.ts` 토큰 클래스. 임의값은 토큰으로 표현
  불가능한 프로토타입 픽셀 맞춤에만 (`text-[10.5px]`), 색상 임의값(`bg-[#...]`)은 금지 —
  필요하면 토큰을 추가한다.
- **클래스 문자열을 동적으로 조합하지 않는다.** Tailwind는 소스에서 완전한 클래스명을 정적
  스캔한다 — 조합된 클래스는 CSS에서 누락된다.

  ```tsx
  // ✕ 빌드 CSS에 bg-congestion-3 없음 — 스타일 조용히 사라짐
  <span className={`bg-congestion-${grade}`} />

  // ○ 완전한 클래스 삼항
  <button className={active ? "bg-primary text-white" : "bg-card text-primary-dark"} />

  // ○ 런타임 값이면 inline style (LockerCard 혼잡 배지 패턴)
  <span style={{ background: CDOT[grade - 1] }} />
  ```

- 조건부 클래스는 템플릿 리터럴 + 삼항. 분기 3개 이상으로 복잡해지면 그때 `clsx` 도입 검토.
- 클래스 나열 순서: 레이아웃(flex/grid/위치) → 크기·간격 → 테두리·배경 → 타이포 → 상태(`active:` 등).
  prettier-plugin-tailwindcss를 쓰게 되면 그 순서를 따른다.
- 눌림 피드백 `active:scale-[0.9x]`, 등장 `animate-fade-up`, 시트 `animate-sheet-up`.
  reduced-motion은 globals.css가 일괄 처리하므로 컴포넌트에서 신경 쓰지 않는다.
- 뷰포트 단위는 `dvh`만 (`h-dvh`, `100dvh`) — 모바일 주소창 변동 대응. `vh` 금지.
- 하단 고정 요소는 safe-area 필수: `pb-[calc(Xpx+env(safe-area-inset-bottom))]`.
- 스크롤 영역: 부모 `min-h-0` + 자식 `flex-1 overflow-y-auto` 짝. 가로 스크롤은 `.hd-scroll`로
  스크롤바 숨김.

## 5. 다국어 (i18n)

- 사용자에게 보이는 모든 문구는 `{ko, ja, en}` `L10n` 객체 + `useLang()`의 `tr()`/`T`.
  **JSX에 단일 언어 하드코딩 금지.** aria-label도 가능하면 다국어 (최소한 한국어 고정은 허용).
- 수치·요금·시각은 언어 무관 원본 유지 (`6,000원 / 3時間`). 환산·번역 금지 (§7-③).
- 고유명사는 원문 병기, ko 모드에서는 병기 생략 (`lang === "ko" ? "" : orig`).
- 공용 문구는 `content.ts`의 `UI`에, 화면 한정 문구는 해당 컴포넌트 안 `L` 객체에.
- **일본어는 한국어보다 20~40% 길다.** 칩·버튼·카드 타이틀은 `truncate` 또는 2줄 허용을
  컴포넌트 단위로 정하고, 가장 긴 언어(대개 ja) 기준으로 확인한다.
- 언어 전환 시 기존 스트림은 그대로 두고 이후 응답만 새 언어 — 메시지에 저장된 문자열을
  재번역하지 않는다 (의도된 동작).

## 6. 데이터 경계

- mock 단일 출처: `src/lib/content.ts` (핸드오프 부록 A·B 미러). **수치를 임의로 바꾸지 않는다.**
- 컴포넌트·Context는 `src/lib/types.ts` 뷰모델(`LockerVM`, `PoiVM`…)만 사용. 원본 스키마
  (`Locker`, `Poi`) → 뷰모델 변환은 엔진의 `xxxView()` 함수에서만. 컴포넌트가 원본 스키마를
  import 하기 시작하면 경계 위반.

  ```tsx
  // ✕ 카드가 원본 스키마 + 언어 분기까지 떠안음 — BE 스키마 변경이 컴포넌트 전파
  function LockerCard({ lk }: { lk: Locker }) {
    return <span>{lk.fee.amount} / {t(lk.fee.per, lang)}</span>;
  }

  // ○ 변환은 엔진의 lockerView(lk)에서, 카드는 완성된 문자열만
  function LockerCard({ lk }: { lk: LockerVM }) {
    return <span>{lk.fee}</span>; // "6,000원 / 3時間"
  }
  ```

- BE 연동 시:
  - `lib/api.ts`가 **유일한 네트워크 경계**. 컴포넌트에서 fetch 직접 호출 금지.
  - 서버 응답 타입은 `XxxResponse`(wire), 화면 타입은 `XxxVM`(view) — wire를 그대로 컴포넌트에
    흘리지 않고 매퍼에서 변환·정규화(sanitize 포함)한다.
  - 실패는 화면 전체 에러가 아니라 **인라인 오류 + 재시도** (`NetErrCard` 패턴, §6 dead-end 금지).
- 외부 링크는 `target="_blank" rel="noreferrer"` 세트로.

## 7. 타입·import

- `interface` 선호 (선언 병합·확장 명확). 유니온·매핑이 필요할 때만 `type`.
- enum 금지 — `as const` + union (`type Lang = "ko" | "ja" | "en"`).
- `any` 금지. 외부 입력은 `unknown`으로 받고 좁힌다. `as` 캐스팅은 경계(JSON 파싱, 유니온 push)
  에서만 — 컴포넌트 내부에서 `as`가 나오면 타입 설계를 다시 본다.
- non-null assertion(`!`)은 직전에 존재가 보장된 경우만, 그 이유가 코드에서 자명해야 한다
  (`LANGS.find(...)!` — LANGS가 상수라 안전).
- 도구 반환 스키마 필드명은 핸드오프 그대로 (`xl_count`, `detail_loc`, `as_of` — snake_case 유지).
  카멜로 바꿔 매핑하지 않는다 — BE·AI 팀과의 계약이다.
- import는 `@/` 절대경로. 상대경로는 같은 디렉토리 `./`만 허용. 순환 import가 생기면 공용 타입을
  `lib/types.ts`로 내리는 방향으로 해소.

## 8. 접근성·성능

- 아이콘 단독 버튼은 `aria-label` 필수. 터치 타깃 44×44px 이상 (`min-h-[44px]`).
- 정보를 색으로만 전달 금지 — 혼잡 등급은 항상 색+텍스트 라벨 (§7-②와 동일 원칙).
- 시트·오버레이는 스크림 탭 + Esc로 닫힌다 (BottomSheet가 처리 — 새 오버레이도 이 셸 사용).
- 이미지 도입 시 `next/image` + 명시적 width/height (CLS 방지). 현재는 플레이스홀더라 해당 없음.
- 무거운 라이브러리(차트·지도 SDK)는 `next/dynamic`으로 클라이언트 lazy load — 채팅 초기 번들에
  넣지 않는다.

## 9. 안티패턴 요약 (리뷰에서 바로 반려)

| 패턴 | 대신 |
| ---- | ---- |
| `useEffect`로 파생 상태 복사 | 렌더 중 계산 |
| index를 리스트 key로 | 안정 id / uid 카운터 |
| `text-${color}` 동적 클래스 | 완전한 클래스 삼항 or inline style |
| 컴포넌트에서 fetch/원본 스키마 사용 | `lib/api.ts` + 뷰모델 |
| JSX에 한국어 하드코딩 | `L10n` + `tr()` |
| 화면 전체 에러 페이지 | 인라인 오류 + 재시도 칩 |
| 선제적 `memo`/`useCallback` 도배 | 측정 후 필요한 곳만 |
| enum, `any`, `../../` import | union, `unknown`, `@/` |
