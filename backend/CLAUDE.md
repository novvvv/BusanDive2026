# CLAUDE.md — 반나절 Half Day 백엔드

부산 여행 마지막 반나절 AI 어시스턴트(**반나절 · 半日 · Half Day**)의 백엔드 프로젝트다.

- **스택**: Python 3.13+, FastAPI, LangGraph, LangChain, Pydantic v2, SQLAlchemy 2.0(async), uv
- **성격**: 여행객 질의를 의도 분류 → 데이터 결합(보관함·POI·픽업·혼잡) → RAG 답변으로
  오케스트레이션하는 에이전트 서버. 수치는 원본 그대로, 판정에는 항상 근거·기준시점을 실어 보낸다.
- **설계 원천**: `docs/03_be_설계.md` · `docs/04_ai_설계.md` (claude design 프로젝트) — 엔드포인트
  5종(`/api/chat`·lockers·pois·pickup·map), 판정 코드 7종, RAG 6단 파이프라인.

> 이 파일은 매 세션 로드된다. 가볍게 유지하고, 상세는 아래 포인터를 따라 필요한 순간에 읽는다.

---

## 규칙 문서 (반드시 따른다)

**충돌 시 우선순위: 용어 사전 > db-schema.sql > 컨벤션 가이드 > 일반 관례.**

| 문서 | 언제 본다 |
| --- | --- |
| [.claude/rules/term-dictionary.md](.claude/rules/term-dictionary.md) | 도메인 용어·필드명·intent·판정 코드를 정할 때 — **표준 식별자의 단일 출처** |
| [.claude/rules/db-schema.sql](.claude/rules/db-schema.sql) | 테이블·컬럼·타입·제약을 정할 때 — **물리 스키마(DDL)의 단일 출처**. `app/models/*.py`는 이 스키마와 일치해야 하며, 모델 변경은 hook이 [.claude/logs/db-schema-changelog.md](.claude/logs/db-schema-changelog.md)에 기록한다 |
| [.claude/rules/backend-conventions.md](.claude/rules/backend-conventions.md) | 일반 백엔드 코드(레이어·네이밍·비동기·예외·로깅·설정·테스트)를 작성할 때 |
| [.claude/rules/agent-conventions.md](.claude/rules/agent-conventions.md) | LangGraph 에이전트(State·Node·Edge·프롬프트·그래프)를 작성할 때 |
| [.claude/rules/git-conventions.md](.claude/rules/git-conventions.md) | 커밋·브랜치·PR |

> 에이전트 가이드는 백엔드 가이드 위에 얹는 특화 규칙이다. 그래프 관련은 agent 쪽이 우선.

## 동작 흐름 문서 (아키텍처 참조)

복잡한 흐름(파이프라인·스케줄러 등)이 구현되면 `.claude/docs/`에 mermaid 다이어그램 포함
문서로 정리하고 이 표에 등록한다. **코드가 바뀌면 함께 갱신한다.** (아직 없음 — 첫 후보:
`/api/chat` 오케스트레이션 흐름, RAG 파이프라인.)

---

## 핵심 원칙 (요약)

### 네이밍·식별자

- 필드·변수·컬럼은 **`snake_case`**. camelCase 금지 — FE 경계에서도 스키마 필드는 그대로 간다
  (FE `types.ts`가 snake_case 미러).
- 도메인 용어·intent·판정 코드는 **용어 사전의 표준 영문어** 그대로 (`xl_count`, `as_of`,
  `NO_HOTEL`). 임의 신조어 금지.
- 레이어는 접미사로 드러낸다: `_router` / `Service` / `Client` / `Repository` / Model·Schema.
- 동사 반환 형태 고정: `get_*`(1건/없으면 예외) · `find_*`(nullable) · `search_*`(다건) ·
  `check_*`/`validate_*`(판정).

### 레이어 경계

- 흐름: `Router → Service → Repository → DB` / Service → Client(외부 API·LLM).
- Router는 얇게(로직 없음). Repository는 Model만 반환. Model은 Schema를 모른다.
- 외부 호출은 반드시 **비동기 Client**를 통한다. Service가 httpx·SDK를 직접 부르지 않는다.
- 변환은 한 방향만, 대응 형식은 classmethod (`Response.from_model`).
- 모든 JSON 응답은 공통 봉투 `ApiResponse[T]`로 감싼다. 에러는 예외 핸들러가 도메인 예외의
  `code`를 포함해 통일한다.

### 에이전트 (LangGraph)

- 그래프는 상태 기계다. 흐름을 **State·Node·Edge**로 명시한다 (암묵 제어 흐름 금지).
- 노드는 `async def {동사}(state) -> dict` — **갱신할 키만 담은 부분 dict** 반환.
- 라우팅 함수는 `edges.py`에 모으고 반환 분기를 `Literal[...]`로 명시.
- 프롬프트는 `prompts.py`(`UPPER_SNAKE_PROMPT`), 모델 생성은 `shared/llm.py` 팩토리 한곳.
- 분류·추출은 `with_structured_output(Schema)`로 Pydantic 강제 (문자열 파싱 금지).
- 그래프는 **앱 시작 시 1번 컴파일**해 재사용. 그래프 호출은 Service를 통한다.
- 패키지 진입점은 `build_{name}_graph` 하나만 노출.

### 비타협 원칙 — 서버측 가드 (§7, 심사 시연 대상)

1. 보관함 개수 필드는 **capacity 의미로만** (`xl_count` = 보유 칸수). `available_now` 류
   실시간 필드 금지.
2. 혼잡은 과거 관측만 (`peak`, 과거형 문구). 미래 예측 필드·문장 생성 금지.
3. 수치는 시드 원본 그대로 전달 — 반올림·환산 금지. 지명은 `name`(I18n)+`orig` 병기.
4. 요금·칸수·마감 포함 응답에 `sources` 비면 **boundary로 대체** (응답 거부 가드).
5. 모든 실패 응답에 `next_actions[]` 필수 — 스키마 검증으로 강제. 막다른 응답 금지.

### 공통 작성 규칙

- I/O는 전부 `async def` + `await`. 동기 블로킹은 `asyncio.to_thread`로 감싼다.
- 시간은 항상 **timezone-aware UTC** (`datetime.now(UTC)`). `utcnow()` 금지.
- 시크릿은 `BaseSettings`로 주입. `os.getenv` 직접 호출·하드코딩 금지. 로그에 시크릿 금지.
- 예외는 `AppError` 계층으로 raise, HTTP 매핑은 핸들러 한곳. 빈 `except` 금지.
- 로깅은 구조화 (`extra`로 `service`·`action`). `print` 금지.
- 모든 함수 시그니처에 타입 힌트. 신문법 (`str | None`, `list[T]`).

---

## 스킬 하네스

프로세스는 superpowers, 구현 스타일은 ponytail — frontend와 동일 원칙.

| 상황 | 스킬 |
| --- | --- |
| 새 기능·엔드포인트·노드 설계 | `superpowers:brainstorming` → `superpowers:writing-plans` |
| 모든 코드 작성·수정 | `ponytail:ponytail` 상시 — 사다리 먼저 |
| 버그·테스트 실패 | `superpowers:systematic-debugging` |
| 완료 선언 전 | `superpowers:verification-before-completion` — `uv run ruff check . && uv run mypy app && uv run pytest` 출력 확인 후에만 |
| PR 본문 | `write-pr` (로컬 스킬) |

스킬 워크플로와 이 문서·rules가 충돌하면 **문서가 우선**한다.

---

## 도구

- **패키지·실행**: `uv`. 명령은 `uv run <cmd>` — 서버 `uv run uvicorn app.main:app --reload`,
  린트 `uv run ruff check .`, 타입 `uv run mypy app`, 테스트 `uv run pytest`.
- **린트·포맷**: `ruff` 단일 도구. **타입**: `mypy` strict. 설정은 `pyproject.toml` 한곳.
- **테스트**: `pytest` + `pytest-asyncio`. 함수명 `test_{대상}_{시나리오}_{기대}`.
- **품질 검사**: 자동 게이트 없음 — 커밋·완료 선언 전에
  `uv run ruff check . && uv run mypy app && uv run pytest`를 직접 실행해 통과를 확인한다.
- **스키마 동기화**: `app/models/*.py` 변경 시 PostToolUse hook이
  `.claude/logs/db-schema-changelog.md`에 기록하고 `.claude/rules/db-schema.sql` 동기화를 지시한다.

> 작업 전 항상 위 규칙 문서를 먼저 확인한다. 특히 **새 용어·필드명은 용어 사전에 있는지 먼저 찾는다.**
