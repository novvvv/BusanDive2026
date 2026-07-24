-- =============================================================================
-- 반나절 Half Day — 물리 DB 스키마 (DDL 단일 출처)
-- DB: PostgreSQL 16 가정 (미정 — 확정 시 이 줄 갱신)
--
-- 규칙:
--   * app/models/*.py 는 이 파일과 일치해야 한다. 모델 변경 시 hook이 changelog에
--     기록하고 이 파일 동기화를 지시한다.
--   * 저장 지침은 모델 코드가 아니라 이 파일이다.
--   * 개수 컬럼은 보유 칸수(용량)다 — available_now 류 실시간 컬럼 금지 (§7-①).
--   * i18n 표시 문자열은 {ko,ja,en} JSONB, 원문 병기는 별도 orig 컬럼.
-- =============================================================================

CREATE TABLE stations (
    id          TEXT PRIMARY KEY,              -- 'nampo', 'busan', ...
    name        JSONB NOT NULL,                -- {ko,ja,en}
    orig        TEXT NOT NULL,                 -- 원문 병기 (§7-③)
    line        SMALLINT NOT NULL,             -- 호선
    exits       JSONB,                         -- {ko,ja,en} 출입구 설명
    lat         DOUBLE PRECISION,
    lng         DOUBLE PRECISION
);

CREATE TABLE lockers (
    id          TEXT PRIMARY KEY,              -- 'lk-nampo'
    station_id  TEXT NOT NULL REFERENCES stations(id),
    -- 크기별 보유 칸수 = capacity. 실시간 잔여 아님 (§7-①)
    count_s     SMALLINT NOT NULL DEFAULT 0,
    count_m     SMALLINT NOT NULL DEFAULT 0,
    count_l     SMALLINT NOT NULL DEFAULT 0,
    count_xl    SMALLINT NOT NULL DEFAULT 0,
    -- 요금(원, 3시간 기준) — 시드 원본 그대로, 환산·재계산 금지 (§7-③)
    fee_s       INTEGER NOT NULL,
    fee_m       INTEGER NOT NULL,
    fee_l       INTEGER NOT NULL,
    fee_xl      INTEGER NOT NULL,
    fee_per     JSONB NOT NULL,                -- {ko:'3시간', ja:'3時間', en:'3 hrs'}
    floor       TEXT,                          -- 'B1'
    exits       JSONB,                         -- {ko,ja,en} 출입구 방향
    as_of       TEXT NOT NULL                  -- 데이터 기준 시점 (원본 표기, 예: '2026')
);
CREATE INDEX idx_lockers_station ON lockers (station_id);
CREATE INDEX idx_lockers_xl ON lockers (count_xl DESC);   -- 특대 많은 순 정렬

-- 혼잡 과거 관측 (§7-②: 과거형 전용 — 예측 컬럼 금지)
CREATE TABLE congestions (
    station_id  TEXT PRIMARY KEY REFERENCES stations(id),
    grade       SMALLINT CHECK (grade BETWEEN 1 AND 4),   -- NULL = 표본 부족 → 응답에서 필드 생략
    peak        JSONB,                         -- {ko,ja,en} 피크 설명 ('주말 14~17시')
    grid        JSONB,                         -- 요일7 × 시간대4 등급 배열
    sample      JSONB,                         -- {ko,ja,en} 표본 설명 ('2025년 승하차 데이터')
    as_of       TEXT NOT NULL
);

CREATE TABLE pois (
    id          TEXT PRIMARY KEY,              -- 'gamcheon'
    name        JSONB NOT NULL,                -- {ko,ja,en}
    orig        TEXT NOT NULL,
    station_id  TEXT NOT NULL REFERENCES stations(id),
    walk_min    SMALLINT NOT NULL,             -- 직선거리 기준 추정
    tags        JSONB,                         -- {ko:[],ja:[],en:[]}
    image_url   TEXT,                          -- 부산시 API MAIN_IMG — NULL 허용(무이미지 변형)
    lat         DOUBLE PRECISION,
    lng         DOUBLE PRECISION
);
CREATE INDEX idx_pois_station ON pois (station_id);

-- 짐캐리 픽업 제휴 숙소 (343개)
CREATE TABLE pickup_partners (
    id          TEXT PRIMARY KEY,
    name        JSONB NOT NULL,                -- {ko,ja,en}
    area        JSONB,                         -- {ko,ja,en} 지역 설명
    lat         DOUBLE PRECISION,
    lng         DOUBLE PRECISION
);

-- 픽업 운영 정책 (단일 행 — 수거 슬롯·마감)
CREATE TABLE pickup_policies (
    id           SMALLINT PRIMARY KEY DEFAULT 1,
    collect_from TEXT NOT NULL,                -- '15:00' (원본 표기 유지)
    collect_to   TEXT NOT NULL,                -- '17:00'
    cutoff       TEXT NOT NULL,                -- '13:00'
    as_of        TEXT NOT NULL
);

-- RAG 지식 코퍼스 청크
CREATE TABLE rag_chunks (
    id          BIGSERIAL PRIMARY KEY,
    source_name JSONB NOT NULL,                -- {ko,ja,en} 문서명
    as_of       TEXT NOT NULL,                 -- 문서 기준 시점 — 출처 표시에 필수 (§7-④)
    url_or_ref  TEXT,
    content     TEXT NOT NULL,                 -- 문단 원문
    embedding   JSONB                          -- 데모: JSONB. pgvector 도입 시 vector(N)로 교체 + 이 줄 갱신
);
CREATE INDEX idx_rag_chunks_source ON rag_chunks ((source_name->>'ko'));
