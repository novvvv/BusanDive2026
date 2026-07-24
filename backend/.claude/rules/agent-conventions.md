# 에이전트 컨벤션 (LangGraph)

> 핵심 요약: 그래프는 상태 기계 — State·Node·Edge 명시, 노드는 부분 dict 반환,
> 라우팅은 `edges.py` + `Literal`, 프롬프트는 `prompts.py`, LLM 생성은 `shared/llm.py` 한곳,
> 구조화 출력은 `with_structured_output`, 그래프는 lifespan에서 1회 컴파일,
> 비타협 가드(§7)는 프롬프트가 아니라 **그래프 구조**로 강제한다.

백엔드 컨벤션 위에 얹는 특화 규칙이다. 예시는 반나절 chat 파이프라인
(의도분류 → 리트리브 → 경계판정 → 답변생성 → 출처부착 → 카드결합)으로 쓴다.

---

## 1. 패키지 구조

```text
app/agents/
  shared/
    llm.py                # 모델 팩토리 한곳 (모델명·온도·재시도 정책)
  chat/
    state.py              # ChatState — 그래프의 유일한 상태 정의
    nodes.py              # 노드 함수들 (async def {동사})
    edges.py              # 라우팅 함수들 (Literal 반환)
    prompts.py            # UPPER_SNAKE_PROMPT 상수
    schemas.py            # 구조화 출력 Pydantic 스키마 (IntentResult 등)
    graph.py              # build_chat_graph() — 패키지 유일 진입점
```

- 패키지 밖에는 `build_{name}_graph` 하나만 노출 (`__init__.py`에서 re-export).
- 그래프 호출은 Service를 통한다 — Router가 그래프를 직접 부르지 않는다.
- 그래프가 둘 이상 생기면 `chat/`처럼 그래프별 패키지로 — 노드를 그래프 간 공유하지 않는다
  (공유하고 싶어지면 그건 Service 로직이다).

## 2. State

- 상태는 `state.py`에 하나로 정의. `TypedDict` 기본 (LangGraph 네이티브·오버헤드 없음),
  런타임 검증이 정말 필요할 때만 Pydantic.

  ```python
  class ChatState(TypedDict, total=False):
      # 입력 (그래프 시작 시 주입 — 노드가 덮어쓰지 않는다)
      lang: str
      text: str
      context: dict

      # 파이프라인 산출물 (각 노드가 자기 키만 갱신)
      intent: str                      # classify_intent
      chunks: list[RagChunk]           # retrieve
      evidence_score: float            # retrieve
      answer: dict                     # generate_answer — {ko,ja,en}
      sources: list[dict]              # attach_sources
      cards: list[dict]                # combine_cards
      next_actions: list[str]          # 실패 분기 포함 항상 채움 (§7-⑤)
  ```

- 누적 키(`messages` 등)에는 reducer를 단다: `Annotated[list, add_messages]` 또는
  `Annotated[list[X], operator.add]`. **reducer 없는 키는 마지막 쓰기 승리** — 두 노드가 같은
  키를 쓰면 병렬 실행 시 결과가 비결정적이 된다. 키 소유 노드를 하나로 유지.
- 상태에 거대 객체(전체 시드·커넥션·세션)를 넣지 않는다 — 체크포인터 직렬화 대상이다.
  id·필요 조각만 담고, 무거운 자원은 노드가 DI로 받는다.
- 입력 키와 산출 키를 주석으로 구분해 둔다 — "누가 이 키를 쓰는가"가 상태 정의에서 보여야 한다.

## 3. Node

- `async def {동사}(state: ChatState) -> dict` — **갱신할 키만 담은 부분 dict** 반환.

  ```python
  # ✕ 전체 상태 덮어쓰기 — 다른 노드 산출물 유실
  async def classify_intent(state: ChatState) -> ChatState:
      state["intent"] = result.intent
      return state

  # ○ 갱신 키만 (다른 키는 LangGraph가 병합)
  async def classify_intent(state: ChatState) -> dict:
      result = await structured(INTENT_PROMPT, state["text"], IntentResult)
      return {"intent": result.intent}
  ```

- 한 노드 한 책임 — "분류하고 검색하고 답변까지"를 한 노드에 넣지 않는다. 노드가 커지면
  그래프의 관측·재시도 단위가 뭉개진다.
- 노드 이름 = 함수 이름 = 그래프 노드 키. 셋을 일치시킨다 (`graph.add_node(classify_intent)`).
- 부작용(DB 조회·외부 API)은 Client/Repository를 통해서 — 노드가 직접 `httpx` 금지.
  노드에 자원이 필요하면 클로저/partial로 주입하고 그래프 빌더가 와이어링한다:

  ```python
  def build_chat_graph(retriever: RagRetriever, llm: BaseChatModel) -> CompiledGraph:
      async def retrieve(state: ChatState) -> dict:
          chunks = await retriever.search(state["text"], k=5)
          return {"chunks": chunks, "evidence_score": score(chunks)}
      ...
  ```

- **예상 가능한 실패는 상태로, 버그는 예외로**: 근거 부족·0건은 상태 키(`intent="boundary"`)로
  흘려 다음 노드가 분기하게 하고, 프로그래밍 오류는 그대로 raise 해서 그래프를 실패시킨다.
  실패를 삼켜서 빈 답변으로 이어지게 하는 것이 최악이다.
- 노드는 멱등하게 — 같은 상태 입력이면 같은 갱신. 재시도·체크포인트 재개의 전제다.

## 4. Edge·라우팅

- 조건 분기는 `edges.py`의 라우팅 함수로, 반환 타입 `Literal[...]` — 분기 전부가 시그니처에
  보이고, 그래프 정의와 어긋나면 타입체커가 잡는다:

  ```python
  def route_after_retrieve(state: ChatState) -> Literal["generate_answer", "reject_boundary"]:
      if state["evidence_score"] < settings.evidence_threshold:
          return "reject_boundary"          # §7-④: 근거 부족 → 생성 자체를 안 한다
      return "generate_answer"
  ```

- 라우팅 함수는 **순수 함수** — 상태만 읽고 판단. LLM 호출·I/O 금지 (판단에 LLM이 필요하면
  그건 노드가 산출한 상태 키를 읽는 것으로 바꾼다).
- 종료는 `END`로 명시. 암묵 제어 흐름(노드 안에서 다음 노드 결정) 금지 — 흐름은
  `graph.py` 한 파일에서 다 읽혀야 한다.

## 5. 프롬프트·LLM

- 프롬프트는 `prompts.py`에 `UPPER_SNAKE_PROMPT` 상수. 노드 안 인라인 문자열 금지.
  변수 주입은 `.format()` 지점이 한 곳이 되게 상수 옆에 헬퍼를 둔다.
- 시스템 프롬프트에 비타협 원칙 내장 (04_ai_설계 §4): 근거 청크 안에서만 답변, 수치 원본 유지,
  혼잡 과거형, 보유 칸수≠잔여, 근거 없으면 거절. **단, 프롬프트는 보조 수단이다 — 실제 강제는
  그래프 구조(경계 노드)와 후처리 가드에서 한다.** 프롬프트만 믿는 가드는 가드가 아니다.
- 모델 인스턴스는 `shared/llm.py` 팩토리에서만:

  ```python
  @lru_cache
  def get_llm(*, temperature: float = 0.0) -> BaseChatModel:
      return init_chat_model(settings.llm_model, temperature=temperature, max_retries=2)
  ```

  모델명·온도 하드코딩 산재 금지. 분류·판정은 `temperature=0` (데모 재현성 — 4턴 시나리오가
  결정적으로 재현돼야 한다).
- 분류·추출은 `with_structured_output(Schema)`로 Pydantic 강제:

  ```python
  class IntentResult(BaseModel):
      intent: Literal["poi", "locker", "cong", "rag_fee", "pickup", "boundary", "zero"]

  result = await get_llm().with_structured_output(IntentResult).ainvoke(messages)
  ```

  응답 문자열 직접 파싱(`json.loads`·정규식) 금지 — 스키마 불일치는 재시도로 흡수된다.
- LLM 호출은 전부 `ainvoke`/`astream` — 동기 `invoke`는 이벤트 루프를 막는다.

## 6. 그래프 수명주기·스트리밍

- `build_chat_graph()`는 순수 함수 — 자원 받아 컴파일된 그래프 반환. **lifespan에서 1번
  컴파일**해 `app.state`에 보관, 요청마다 재컴파일 금지:

  ```python
  @asynccontextmanager
  async def lifespan(app: FastAPI):
      app.state.chat_graph = build_chat_graph(retriever=..., llm=get_llm())
      yield
  ```

- `/api/chat` 스트리밍(SSE)은 `graph.astream(...)`의 노드 단위 이벤트를 흘린다 — FE 타이핑
  인디케이터("보관함을 찾고 있어요…")가 노드 진행과 대응한다. 노드명 → 상태 문구 매핑은
  Service에 두고, 그래프는 UI 문구를 모른다.
- 체크포인터는 데모 기준 인메모리(`MemorySaver`). 영속이 필요해지면 이 절 갱신 + 결정 기록.
- `thread_id`는 세션(대화) 단위 — 요청마다 새로 만들지 않는다 (대화 이력 유지).

## 7. 관측·평가

- LangSmith는 환경변수(`LANGSMITH_*`)로만 켠다 — 코드에 추적 분기 없음.
- LLM 호출 실패·재시도는 구조화 로그 (`extra={"service": "agent", "action": "llm_call", "node": ...}`).
- 회귀 테스트: RAG_FEE 등 핵심 답변은 시드·temperature 0 고정으로 결정적 재현.
  답변 숫자 == 근거 숫자 검증 (04_ai_설계 §6). 그래프 테스트는 노드 단위(부분 dict 검증)를
  우선하고, 전체 그래프는 대표 시나리오 4턴만 통합 테스트.

## 8. 반나절 파이프라인 계약

- intent는 7종 고정: `poi | locker | cong | rag_fee | pickup | boundary | zero`
  (용어 사전 참조). 새 intent는 용어 사전 등록 + FE 칩 라우팅 합의 후 추가.
- 경계 판정은 답변 생성 **앞** — 근거 부족이면 생성 노드에 도달하지 않는다 (§7-④를 구조로 강제).
- 요금·칸수·마감 포함 답변에 `sources`가 비면 boundary로 라우팅 — 후처리 가드 노드에서 검사.
- boundary·zero 응답에도 `next_actions` 필수 (§7-⑤) — 상태 정의상 실패 분기 노드가 반드시 채운다.
- 다국어: answer는 `{ko, ja, en}` 3종 동시 생성. 수치·고유명사는 언어 간 동일 (회귀 테스트 대상).

## 9. 안티패턴 요약 (리뷰에서 바로 반려)

| 패턴 | 대신 |
| --- | --- |
| 노드가 전체 State 반환 | 갱신 키만 부분 dict |
| 노드 안에서 다음 노드 결정 | `edges.py` 라우팅 + `Literal` |
| 라우팅 함수에서 LLM/I/O 호출 | 노드가 산출한 상태 키로 판단 |
| 프롬프트 인라인 문자열 | `prompts.py` 상수 |
| LLM 응답 `json.loads` 파싱 | `with_structured_output(Schema)` |
| 요청마다 그래프 컴파일 | lifespan 1회 + `app.state` |
| 상태에 세션·전체 시드 탑재 | id·조각만, 자원은 클로저 주입 |
| 근거 부족을 프롬프트로만 방어 | 경계 노드 + 후처리 가드 (그래프 구조) |
| 예상 실패를 예외로, 버그를 상태로 | 실패=상태 분기, 버그=raise |
