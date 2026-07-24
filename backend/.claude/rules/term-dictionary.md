# 용어 사전 (term dictionary)

> 도메인 용어·식별자·Enum 코드의 **단일 출처**. 새 용어·필드·코드는 여기 먼저 등록하고 쓴다.
> 물리 스키마는 [db-schema.sql](db-schema.sql)이 단일 출처 — 이 문서와 어긋나면 둘 다 고친다.
> FE와 공유하는 필드명은 FE `frontend/src/lib/types.ts`와 동일해야 한다 (snake_case 그대로).

## 표기 규칙

- 필드·컬럼 `snake_case`. Enum성 코드는 저장은 영문 코드, 표시는 I18n.
- 실패·판정 코드는 `UPPER_SNAKE` (`NO_HOTEL`).
- I18n 문자열은 `{ko, ja, en}` 3종 동봉 필드 (`name`, `answer`…). 원문 병기는 별도 `orig`.
- 기준 시점은 `as_of` (원본 표기 문자열 유지, 예: `"2025.06"`).
- 날짜·시각 컬럼은 `*_at` (timezone-aware UTC).

## 핵심 엔티티

| 한글 | 코드 | 설명·주의 |
|---|---|---|
| 역 | `station` | `name`(I18n) + `orig`(원문). 고유명사 병기 대상 |
| 물품 보관함 | `locker` | 역별 위드락커 현황. **counts = 보유 칸수(용량)** |
| 보유 칸수 | `counts.{s,m,l,xl}` / `xl_count` | **실시간 잔여 아님** — `available_now` 류 필드 금지 (§7-①) |
| 요금 | `fee.{s,m,l,xl}` + `fee.per` | 소 2,000 / 중 3,000 / 대 4,000 / 특대 6,000원 · 3시간 기준 — **변경·환산 금지** |
| 상세 위치 | `detail_loc.{floor, exits}` | 층 + 출입구 구조화 |
| 혼잡 | `congestion.{grade, peak, grid}` | grade `1~4 \| null`. null이면 필드 생략(빈 값 채우기 금지). 문구는 항상 과거형 (§7-②) |
| 관광지 | `poi` | 부산시 API. `image` 없을 수 있음 |
| 픽업 | `pickup` | 짐캐리. 제휴 343 숙소, 수거 15:00~17:00, 당일 마감 13:00 |
| 근거 문서 | `source.{name, as_of, quote}` | RAG 출처. 수치성 답변에 필수 (§7-④) |
| 다음 행동 | `next_actions[]` | 모든 실패 응답 필수 필드 (§7-⑤) |

## intent (7종 고정 — `/api/chat`)

`poi` · `locker` · `cong` · `rag_fee` · `pickup` · `boundary` · `zero`

새 intent는 여기 등록 + FE 칩 라우팅과 합의 후 추가.

## 판정 코드 (엣지 케이스)

| 코드 | 판정 | 응답 규칙 |
|---|---|---|
| `NO_HOTEL` | hotel 미입력 | 보관함 우선 + `next: "enter_hotel"` |
| `UNREGISTERED` | 제휴 343 밖 | `pickup.available=false` + 사유 + 보관함 대안 |
| `PICKUP_CUTOFF` | now > 13:00 | `pickup.state="next_day"` |
| `NO_XL` | 특대 0칸 | `alt` = 인접역 대안 |
| `NO_CONG_DATA` | congestion null | 혼잡 필드 생략 |
| `OUT_OF_BOUNDARY` | RAG 근거 부족 | `intent:"boundary"` + 공식 채널 |
| `ZERO_RESULT` | 조회 0건 | `intent:"zero"` + 대체 지역 |

## 지식 코퍼스 (RAG)

| 문서 | as_of | 용도 |
|---|---|---|
| 위드락커 이용안내 | 2025.06 | 요금·이용 규칙 |
| 부산교통공사 코인로커 안내 | 2025.03 | 위치·요금 |
| 짐캐리 픽업 안내 | 2026 | 제휴·수거·마감 |
| 관광지/혼잡 관측 데이터 | 관측일 | POI·혼잡 과거 패턴 |

## 빠른 참조

- 시드 데이터 원천: 레포 루트 `data/` (부산교통공사 CSV, zimcarry JSON) + FE `content.ts` 수치.
- FE 뷰모델 대응: `frontend/src/lib/types.ts` — 필드명 계약이므로 임의 변경 금지.
