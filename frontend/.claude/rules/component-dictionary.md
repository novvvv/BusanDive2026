# 컴포넌트 사전 (component dictionary)

> 실사용 컴포넌트·훅·컨텍스트의 단일 출처. **컴포넌트를 추가·이동·삭제하면 이 표를 함께 갱신한다.**
> `.claude/hooks/component_changelog.py`가 구조 변화를 감지해 `.claude/logs/component-changelog.md`에
> 기록하고 갱신을 환기해 준다.

## 공용 (components/common)

| 컴포넌트 | 경로 | 용도 | 사용 상황 |
| -------- | ---- | ---- | --------- |
| AppHeader | common/AppHeader.tsx | 공용 헤더 (로고 또는 타이틀 + 언어·지도 버튼) | 탭 3화면 모두. `title` 없으면 로고 모드 |
| TabBar | common/TabBar.tsx | 하단 3탭 내비 (채팅/보관소/픽업) | (tabs) 레이아웃 전용 |
| BottomSheet | common/BottomSheet.tsx | 스크림+하단 시트 셸 | 모든 시트의 컨테이너. 88% 높이 캡 + 내부 스크롤 내장 |
| UiProvider / useUi | common/UiProvider.tsx | 오버레이 전역 상태 (지도·시트·토스트) | 시트 열기: `openLockerSheet(id)` 등 |
| Icons | common/Icons.tsx | 공용 SVG 아이콘 (프로토타입 지오메트리) | 새 아이콘도 여기에 추가 |

## 카드 (components/cards) — 채팅 인라인 5종+상태

| 컴포넌트 | 경로 | 용도 | 사용 상황 |
| -------- | ---- | ---- | --------- |
| PoiCarousel | cards/PoiCard.tsx | 관광지 추천 가로 캐러셀 | `kind:'poi'` 메시지. 이미지 유무 분기 |
| LockerCard | cards/LockerCard.tsx | 보관함 카드 (칸수·요금·혼잡 병기) | `kind:'locker'`, AltCard 내부 |
| PickupCard | cards/PickupCard.tsx | 짐캐리 픽업 카드 (수거 슬롯·마감·딥링크) | `kind:'locker'`의 pickup 필드 |
| StayForm | cards/StayForm.tsx | 숙소/여행지 입력 폼 (제출 후 요약으로 접힘) | `kind:'stayform'`. mode: pickup/spot |
| PickFailCard | cards/notices.tsx | 픽업 불가 안내 (대안 톤) | UNREGISTERED, DEADLINE_PASSED |
| AltCard | cards/notices.tsx | 한 정거장 대안 역 재제안 | 인근 특대 없음 |
| BoundaryCard | cards/notices.tsx | 경계 응답 + 공식 채널 버튼 | RAG 근거 없음 |
| ZeroCard | cards/notices.tsx | 결과 0건 + 다른 지역 칩 | 재탐색 실패 |
| NetErrCard | cards/notices.tsx | 인라인 네트워크 오류 + 재시도 | 요청 실패 (전체 화면 오류 금지) |

## 시트·오버레이 (components/sheets)

| 컴포넌트 | 경로 | 용도 | 사용 상황 |
| -------- | ---- | ---- | --------- |
| LockerSheet | sheets/LockerSheet.tsx | 보관소 상세 (크기별 칸수·위치·혼잡 히트맵) | 보관함 카드/지도 마커 탭 |
| SourceSheet | sheets/SourceSheet.tsx | 근거 문서 (RAG 출처 인용 + as_of) | 출처 칩 탭 |
| LangSheet | sheets/LangSheet.tsx | 언어 선택 시트 | 헤더 언어 버튼 |
| MapOverlay | sheets/MapOverlay.tsx | 지도 뷰 (placeholder + 절대좌표 마커) | 헤더 지도 버튼. SDK 삽입 지점 주석 참조 |

## 화면·엔진

| 컴포넌트 | 경로 | 용도 | 사용 상황 |
| -------- | ---- | ---- | --------- |
| ChatScreen | chat/ChatScreen.tsx | 채팅 엔진+렌더 (의도 라우팅·엣지 9종·칩·입력바) | /chat 전체. 스트림 콜백은 `api.current` 경유 |
| Onboarding | app/page.tsx | 언어 선택 1스크린 | 저장 언어 있으면 /chat 리다이렉트 |
| LockersPage | app/(tabs)/lockers/page.tsx | 보관소 현황 (검색·필터·사이즈 팝오버) | 하단 탭 |
| PickupPage | app/(tabs)/pickup/page.tsx | 픽업 (세그먼트 4종: 이용법/숙소/보관함/FAQ) | 하단 탭 |

## 훅·컨텍스트

| 이름 | 경로 | 반환 |
| ---- | ---- | ---- |
| useLang | lib/i18n.tsx | `{ lang, ready, stored, setLang, T, tr, langShort }` |
| useUi | common/UiProvider.tsx | `{ openLangSheet, openMap, closeMap, openLockerSheet, openSourceSheet, toast }` |

## 계층도

```
RootLayout (LangProvider, max-w-webview)
├── Onboarding (/)
└── TabsLayout (UiProvider → 오버레이 4종 + Toast, TabBar)
    ├── ChatScreen (/chat) → 카드 9종, EdgeSheet
    ├── LockersPage (/lockers)
    └── PickupPage (/pickup)
```
