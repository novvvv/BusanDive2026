# 백엔드 컨벤션 (Python · FastAPI)

> 핵심 요약: 레이어 `Router → Service → Repository → DB` + 외부는 비동기 Client,
> snake_case + 레이어 접미사, I/O 전부 async(이벤트 루프에서 블로킹 금지),
> 세션은 요청 단위 DI + 커밋은 Service, 예외는 `AppError` 계층 + 핸들러 한곳,
> 응답은 `ApiResponse[T]` 봉투, 시간은 UTC aware, 설정은 `BaseSettings`, `print` 금지.

예시는 이 프로젝트 도메인(`Locker`)으로 쓴다.

---

## 1. 디렉토리·레이어

```text
app/
  main.py                 # 앱 팩토리, lifespan(그래프 컴파일·시드 로드), 예외 핸들러 등록
  core/
    config.py             # Settings(BaseSettings) — 환경변수 단일 진입
    errors.py             # AppError 계층 + 핸들러
    logging.py            # 구조화 로깅 설정
    db.py                 # engine, async_sessionmaker, get_session 의존성
  routers/locker_router.py
  services/locker_service.py
  repositories/locker_repository.py
  clients/                # 외부 API·LLM 등 비동기 클라이언트
  models/locker.py        # SQLAlchemy Model — db-schema.sql과 일치
  schemas/locker.py       # Pydantic Schema (요청/응답)
  schemas/response.py     # ApiResponse[T]
  agents/                 # LangGraph — agent-conventions.md
tests/
```

### 책임

- **Router**: 얇게. 의존성 주입 + Service 호출 + 상태코드 지정만. 비즈니스 로직·쿼리 금지.
  라우터에 `if`가 두 개 이상 나오면 Service로 내릴 신호다.
- **Service**: 비즈니스 로직·판정·오케스트레이션. **트랜잭션 경계 = Service** (커밋은 여기서 한 번).
- **Repository**: DB 접근 전담, **Model만 반환**. 판정·가공 금지. Repository가 Schema를 import
  하면 경계 위반.
- **Client**: 외부 API·LLM 호출 전담. 타임아웃·재시도 정책을 Client 안에 캡슐화.
  Service가 `httpx`·SDK를 직접 부르지 않는다 — 테스트에서 Client 하나만 갈아끼우면 되게.
- Model은 Schema를 모른다. 변환은 Schema 쪽 classmethod로 한 방향만:

  ```python
  class LockerResponse(BaseModel):
      model_config = ConfigDict(from_attributes=True)

      @classmethod
      def from_model(cls, m: Locker) -> "LockerResponse":
          return cls.model_validate(m)
  ```

### 의존성 주입 (FastAPI Depends)

- 와이어링은 DI로만 — 전역 싱글턴 인스턴스를 모듈 레벨에서 만들어 import 하지 않는다
  (테스트 오버라이드 불가능해진다).

  ```python
  # routers/locker_router.py
  @router.get("/lockers")
  async def search_lockers(
      q: str | None = None,
      service: LockerService = Depends(get_locker_service),
  ) -> ApiResponse[list[LockerResponse]]:
      lockers = await service.search(q=q)
      return ApiResponse(data=[LockerResponse.from_model(m) for m in lockers])
  ```

- 의존성 팩토리는 `deps.py` 또는 각 모듈 하단에 `get_xxx_service` 형태로.
- **함정**: `Depends()` 기본값이 있는 함수를 일반 함수처럼 직접 호출하지 않는다.

## 2. 네이밍

- 필드·변수·컬럼·함수 `snake_case`, 클래스 `PascalCase`, 상수 `UPPER_SNAKE_CASE`.
- 약어는 클래스명에서 첫 글자만 대문자(`HttpClient`, `RagService`, `LlmCallLog`), 필드는 전부
  소문자(`as_of`, `poi_id`).
- 동사 규약 (반환 형태 고정 — 호출부가 시그니처만 보고 None 처리 여부를 알게):
  - `get_*` — 1건, 없으면 `NotFoundError` raise
  - `find_*` — 1건 또는 `None`
  - `search_*` — 리스트 (빈 리스트 허용, None 반환 금지)
  - `check_*` / `validate_*` — 판정 (bool 또는 판정 결과 객체)
- 파일명 = 주 클래스 snake_case (`locker_service.py` → `LockerService`).
- private 헬퍼는 `_` 접두사. 모듈 공개 API는 파일 상단에서 위→아래로 읽히게 배치.

## 3. 비동기 — 이벤트 루프를 막지 않는다

- I/O 함수는 전부 `async def` + `await`. **`async def` 안에서 동기 블로킹 호출이 가장 흔한
  성능 사고다** — 루프 전체가 멈춰 동시 요청이 전부 대기한다.

  ```python
  # ✕ 루프 블로킹 — requests, time.sleep, 무거운 pandas/파일 I/O
  async def fetch_poi_image(url: str) -> bytes:
      return requests.get(url).content

  # ○ 비동기 클라이언트
  async def fetch_poi_image(self, url: str) -> bytes:
      resp = await self._client.get(url)          # httpx.AsyncClient
      return resp.content

  # ○ 피할 수 없는 동기 작업은 스레드로
  chunks = await asyncio.to_thread(split_corpus, raw_text)
  ```

- `httpx.AsyncClient`는 요청마다 만들지 않는다 — lifespan에서 1개 생성, Client 클래스가 보관,
  종료 시 `aclose()`.
- 독립 호출 병렬화는 `asyncio.gather` — 단 **같은 DB 세션을 여러 태스크가 공유 금지**
  (세션당 한 흐름). 병렬이 필요하면 세션 밖에서 gather 하고 결과만 세션 작업에 쓴다.
- `fastapi.BackgroundTasks`는 "응답 후 가벼운 한 번"까지만. 재시도·영속이 필요한 작업이
  생기면 그때 큐 도입을 검토한다.

## 4. Pydantic v2 (Schema)

- 요청은 `XxxRequest`, 응답은 `XxxResponse` — 하나의 Schema를 양방향으로 재사용하지 않는다
  (요청엔 서버 생성 필드가 없고, 응답엔 검증 제약이 없다).
- v2 문법 고정: `model_config = ConfigDict(...)`, `model_validate`, `field_validator`.
  v1 잔재(`class Config`, `.dict()`, `.parse_obj()`) 금지.
- ORM → Schema는 `ConfigDict(from_attributes=True)` + `model_validate(model)`.
- 필드 검증은 Schema 안에서 끝낸다 — Service에 형식 검증 `if`를 흩뿌리지 않는다:

  ```python
  class ChatRequest(BaseModel):
      lang: Literal["ko", "ja", "en"]
      text: str = Field(min_length=1, max_length=500)
      context: ChatContext | None = None
  ```

- I18n 문자열 필드는 공용 타입 하나로: `class I18n(BaseModel): ko: str; ja: str; en: str`.
- 가변 기본값 금지 — `Field(default_factory=list)`.

## 5. SQLAlchemy 2.0 (async)

- 세션은 요청 단위 DI. 전역 세션·모듈 레벨 세션 금지:

  ```python
  # core/db.py
  engine = create_async_engine(settings.database_url)
  SessionLocal = async_sessionmaker(engine, expire_on_commit=False)

  async def get_session() -> AsyncIterator[AsyncSession]:
      async with SessionLocal() as session:
          yield session
  ```

  `expire_on_commit=False` — 커밋 후 속성 접근이 lazy load를 다시 타지 않게 (async에서 필수).
- 쿼리는 2.0 스타일 `select()` 만. 레거시 `session.query()` 금지.
- **N+1 방지**: 관계를 응답에 실을 거면 로딩 전략을 쿼리에 명시:

  ```python
  stmt = (
      select(Locker)
      .options(selectinload(Locker.station))
      .where(Locker.count_xl > 0)
      .order_by(Locker.count_xl.desc())
  )
  ```

- 커밋은 Service에서 요청당 한 번. Repository는 `flush`까지만 (id 필요 시).
- 모델 변경 시 `.claude/rules/db-schema.sql`과 일치 확인 — hook이 changelog로 환기한다.

## 6. 응답·예외

- 모든 JSON 응답은 `ApiResponse[T]` 봉투 (`response_model_exclude_none=True`).
  파일 다운로드·204는 예외.
- 예외 계층과 매핑은 한곳:

  ```python
  # core/errors.py
  class AppError(Exception):
      code: str = "APP_ERROR"
      status: int = 500

      def __init__(self, message: str, *, next_actions: list[str] | None = None):
          self.message = message
          self.next_actions = next_actions or []   # §7-⑤ dead-end 금지

  class NotFoundError(AppError):
      code, status = "NOT_FOUND", 404

  class BoundaryError(AppError):                    # RAG 근거 부족
      code, status = "OUT_OF_BOUNDARY", 200         # 정상 흐름 — 에러 아님

  # main.py — 매핑은 핸들러 한곳
  @app.exception_handler(AppError)
  async def handle_app_error(request: Request, exc: AppError) -> JSONResponse:
      return JSONResponse(status_code=exc.status, content=error_body(exc))
  ```

- **라우터/서비스에서 `HTTPException` 직접 raise 금지** — 도메인 예외를 던진다. HTTP는
  핸들러의 관심사다.
- 빈 `except:`·`except Exception: pass` 금지. 잡으면 로그 남기고 다시 던지거나 의미 있는
  대체 동작. 외부 Client 실패는 Client 안에서 도메인 예외로 번역해 올린다.
- 실패 응답에도 `next_actions[]` 필수 — 스키마 레벨 필드 (§7-⑤).

## 7. 설정·시크릿

- `core/config.py`의 `Settings(BaseSettings)`가 환경변수 단일 진입:

  ```python
  class Settings(BaseSettings):
      model_config = SettingsConfigDict(env_file=".env", extra="ignore")

      database_url: str = "sqlite+aiosqlite:///./dev.db"
      anthropic_api_key: str = ""

  @lru_cache
  def get_settings() -> Settings:
      return Settings()
  ```

- `os.getenv` 직접 호출·하드코딩 금지. 새 환경변수는 Settings 필드 추가가 유일한 방법.
- 시크릿은 로그·예외 메시지·`repr`에 노출 금지. 필요하면 `SecretStr`.

## 8. 로깅

- 구조화 로깅 — 메시지는 고정 문구, 가변 값은 `extra`로:

  ```python
  logger.info("locker searched", extra={"service": "locker", "action": "search", "count": len(rows)})
  ```

- `print` 금지. f-string으로 값 박은 메시지보다 extra 분리 — 로그 수집기에서 필드 검색 가능해야 한다.
- 레벨: 정상 흐름 `info`, 재시도 가능 이상 `warning`, 실패 `error`(+`exc_info=True`).
- 요청 상관관계는 미들웨어에서 request_id 주입.

## 9. 시간·데이터

- 항상 timezone-aware UTC: `datetime.now(UTC)`. `datetime.utcnow()` 금지 (naive — 비교·저장 사고).
- 픽업 마감 판정처럼 **로컬 시각(KST)이 기준인 로직**은 비교 직전에 명시 변환:
  `now_kst = datetime.now(UTC).astimezone(ZoneInfo("Asia/Seoul"))` — naive로 비교하지 않는다.
- 기준 시점 필드는 `as_of` (원본 표기 문자열 `"2025.06"` 유지).
- 수치(요금·칸수)는 시드 원본 그대로 — 반올림·환산·재계산 금지 (§7-③).
- I18n 문자열은 `{ko, ja, en}` 3종 동봉 — FE는 번역하지 않는다.

## 10. 테스트

- `pytest` + `pytest-asyncio` (`asyncio_mode = "auto"`). 함수명 `test_{대상}_{시나리오}_{기대}`.
- API 테스트는 `httpx.AsyncClient` + `ASGITransport` — 실제 서버 없이 앱을 직접 친다:

  ```python
  async def test_search_lockers_no_xl_returns_alt(client: AsyncClient):
      resp = await client.get("/api/lockers", params={"q": "센텀시티"})
      body = resp.json()["data"]
      assert body["alt"] is not None          # NO_XL → 대안 역 (§7-⑤)
  ```

- 외부 의존(LLM·DB)은 `app.dependency_overrides`로 교체 — monkeypatch 남발보다 DI 오버라이드.
- 판정 로직(픽업 마감·경계·대안 역)은 `@pytest.mark.parametrize` 케이스 테이블로 —
  심사 시연 로직이라 회귀 방지가 최우선.
- RAG 수치 답변은 회귀 테스트 고정: 답변 숫자 == 근거 숫자.
- 테스트가 실제 시각에 의존하면 안 된다 — `PICKUP_CUTOFF` 판정은 now를 주입 가능하게 설계.

## 11. 안티패턴 요약 (리뷰에서 바로 반려)

| 패턴 | 대신 |
| --- | --- |
| `async def` 안 `requests`/`time.sleep`/무거운 동기 I/O | `httpx.AsyncClient` / `asyncio.to_thread` |
| Service에서 `httpx`·SDK 직접 호출 | Client 클래스 경유 |
| 라우터에서 `HTTPException` raise | `AppError` 계층 + 핸들러 |
| `session.query()` (1.x) | 2.0 `select()` |
| 관계 lazy 접근으로 N+1 | `selectinload`/`joinedload` 명시 |
| `datetime.utcnow()` / naive 비교 | `datetime.now(UTC)` + 명시 변환 |
| `os.getenv` 산재 | `Settings(BaseSettings)` |
| `print`, f-string 로그 | 구조화 `logger` + `extra` |
| 요청/응답 Schema 겸용 | `XxxRequest` / `XxxResponse` 분리 |
| 모듈 레벨 전역 서비스 인스턴스 | `Depends` 팩토리 |
