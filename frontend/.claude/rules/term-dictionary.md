# 용어 사전 (term dictionary)

> 도메인 용어·식별자의 단일 출처. 새 용어가 생기면 여기에 먼저 추가하고 코드에 쓴다.
> 데이터 스키마의 단일 출처는 `src/lib/content.ts` (디자인 핸드오프 부록 A·B 미러).

## 표기 규칙

- 코드 식별자는 영문 camelCase/snake_case(스키마 필드는 핸드오프 그대로), UI 표시는 한글/일문/영문 `L10n`.
- 상태·등급 값은 enum 대신 union (`grade: 1 | 2 | 3 | 4`). 실패 사유는 대문자 코드 (`NO_HOTEL`).
- 날짜·기준 시점은 `as_of` (문자열 `"2025.06"` 형식 유지).

## 도메인 용어

| 한글 | 영문/코드 | 설명·주의 |
| ---- | -------- | --------- |
| 역 | station, `StationId` (`nampo`/`busan`/`jagalchi`) | 역명은 원문 병기 대상 고유명사 |
| 물품 보관함 | locker, `Locker` | 부산 지하철 위드락커. `SUBWAY_LOCKERS`가 목록 |
| 특대(형) | XL, `xl` / `xl_count` | 캐리어 기준 — UI에서 항상 강조 셀 |
| 보유 칸수 | held count, `held` 문구 | **실시간 잔여 아님** — 표시 지점마다 문구 필수 (§7-①) |
| 혼잡(도) | congestion, `grade: 1~4` | 1 여유 / 2 보통 / 3 혼잡 / 4 심함. 문구는 항상 과거형 (§7-②). `null`이면 영역 자체 미렌더 |
| 픽업 | pickup, `check_pickup` | 짐캐리 숙소 수거. 보관함과 **동급 병렬** 제시 (위계 금지) |
| 픽업 불가 사유 | `NO_HOTEL` / `UNREGISTERED` / `DEADLINE_PASSED` | 각각 대응 UI 존재 (§6) |
| 숙소 | stay/hotel | `zimcarry_hotels.json` 등록 숙소 342개. 목록 포함은 등록 여부이며 실시간 접수 가능을 뜻하지 않음. 미등록이면 UNREGISTERED |
| 관광지 | POI, `recommend_poi` / `Poi` | 부산시 API. 이미지 없을 수 있음 → 무이미지 변형 필수 |
| 경계 응답 | boundary, `BoundaryCard` | 근거 문서 없을 때 "답하지 않음" — 에러 아님, 경고색 남용 금지 |
| 근거·출처 | source, `sources[]` / `SourceChip` | 요금·마감 포함 답변엔 출처 칩 필수 (§7-④) |
| 기준 시점 | `as_of` | 근거 표시와 항상 동반 |
| 짐캐리 | GimCarry, `zimcarry` / `ZC` | 픽업·무인 보관함 운영사. 예약은 외부 딥링크 |
| 위드락커 | WithLocker | 지하철 보관함 운영사 |
| 반나절 | Half Day / はんにち | 서비스명. 로고 병기 3종 고정 |

## 도구(스키마) ↔ UI 대응

| 도구 | 반환 | 렌더 컴포넌트 |
| ---- | ---- | ------------- |
| `recommend_poi` | `poi_list[]` | `PoiCarousel` |
| `search_locker` | `lockers[]` | `LockerCard` |
| `check_pickup` | `available/deadline/slot_time` | `PickupCard` / `PickFailCard` |
| `get_congestion` | `grade, sample_days` | `CongVM`(카드 병기) / `LockerSheet` 히트맵 |
| RAG | `answer, sources[], as_of` | 텍스트 + 출처 칩 → `SourceSheet` / `BoundaryCard` |
