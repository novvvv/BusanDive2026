# 데모 영상 녹화 핸드오프

데모 스크립트 위치: **`demo/record-demo.mjs`** (Playwright 자동 시연 + 녹화)

다른 컴퓨터에서 기능 브랜치를 합쳐 데모 영상을 다시 뽑기 위한 전체 절차.
브랜치 `docs/record-video`(PR #13)에 스크립트와 외국어 입력 매칭 확장이 들어 있다.

## 시연 시나리오

KO → 언어 전환 → EN 동일 반복, 총 약 45초~90초(`SPEED`에 따라).

1. 온보딩 언어 선택 → 채팅 인사말
2. "숙소 픽업" 칩 → 숙소/여행지 폼 입력 → 픽업 카드 + 보관함 추천 카드 스크롤
   - KO 입력: 숙소 `홍단` / 여행지 `벡스코`
   - EN 입력: `Hongdan` / `Bexco` (영문 매칭은 `findZimcarryHotel` ja/en 확장 + `bexco` 별칭 필요)
3. 보관함 카드 탭 → 상세 시트(혼잡 히트맵) → 시트 외부(상단 스크림) 탭으로 닫기
4. 보관소 탭 → 목록 스크롤 → 역 검색 (KO `남포` / EN `Nampo`)
5. 픽업 탭 → 이용 방법 → 등록 숙소 검색 (KO `해운대` / EN `Haeundae`) → 무인 보관함 → FAQ 펼치기
6. 헤더 언어 버튼 → English → 2~5 반복

## 사전 요구

- macOS + Homebrew, Node ≥ 20, pnpm 9
- (선택) OpenScreen — 수동 녹화·줌 편집용: `brew install --cask siddharthvaddem/openscreen/openscreen`
  - 첫 실행 시 시스템 설정 → 개인정보 보호 및 보안 → 화면 기록 권한 허용 후 재시작
  - Playwright 자동 녹화(`RECORD=1`)만 쓰면 불필요
- (선택) ffmpeg — webm → mp4 변환용: `brew install ffmpeg`

## 절차

### 1. 코드 합치기

```bash
git clone git@github.com:novvvv/BusanDive2026.git && cd BusanDive2026
git checkout docs/record-video                 # 데모 스크립트 포함 브랜치
git merge origin/<업그레이드-기능-브랜치>        # 팀원 기능 머지 (main에 있으면 origin/main)
```

### 2. 프론트 빌드·서버 (터미널 1 — 켜둔 채 유지)

```bash
cd frontend
pnpm install
NEXT_DIST_DIR=.next-record pnpm build
NEXT_DIST_DIR=.next-record pnpm start --port 3100
```

`NEXT_DIST_DIR` 분리는 dev 서버 `.next` 캐시 오염 방지용. 스크립트 기본 접속 주소는
`http://localhost:3100` (다르면 `BASE_URL` 환경변수로 지정).

### 3. 데모 스크립트 준비 (터미널 2)

```bash
cd demo
pnpm install
pnpm exec playwright install chromium
```

### 4. 녹화 — 두 방식 중 택 1

```bash
# A. 자동 저장 (OpenScreen 불필요) — demo/videos/*.webm 생성
RECORD=1 SPEED=0.5 node record-demo.mjs

# mp4 변환
ffmpeg -i videos/page@*.webm -c:v libx264 -crf 20 -pix_fmt yuv420p \
  -movflags +faststart videos/demo.mp4

# B. OpenScreen 수동 녹화 — 줌·커서 강조·배경 편집이 필요할 때
node record-demo.mjs   # "5초 안에 녹화 시작" 메시지에 맞춰 Chromium 창 녹화 시작
```

## 환경변수

| 변수 | 기본값 | 용도 |
| ---- | ------ | ---- |
| `RECORD` | (없음) | `1`이면 Playwright가 `demo/videos/`에 webm 자동 저장 + 시작 5초 대기 생략 |
| `SPEED` | `1` | 전체 템포 배율. `0.5` ≈ 45초, `0.75` ≈ 67초, `1` ≈ 90초. 리허설은 `0.15` |
| `BASE_URL` | `http://localhost:3100` | 프론트 서버 주소 |

## 주의사항

- **UI 문구가 바뀌면 스크립트도 수정** — 셀렉터가 화면 문구 기반이다.
  `record-demo.mjs` 상단 `KO`/`EN` 상수(칩 라벨·placeholder·탭 이름·"상세 보기" 등)를
  바뀐 문구에 맞춘다. 실행이 멈추면 십중팔구 문구 불일치.
- 리허설: `SPEED=0.15 node record-demo.mjs` — 셀렉터 오류를 20초 안에 잡는다.
- Playwright 자동 녹화에는 마우스 커서가 보이지 않는다. 탭·클릭은 UI 반응으로 표현됨.
  커서·줌 강조가 필요하면 B안(OpenScreen)으로.
- 스크립트는 시작 시 `localStorage`를 비워 항상 온보딩부터 시작한다.
- 입력값 의존 데이터: 숙소 `홍단`/`Hongdan`은 짐캐리 등록 숙소 "부산 송정 호텔 홍단",
  여행지 `벡스코`/`Bexco`는 역 별칭 매핑 기준. 데이터가 바뀌면 스크립트 입력값도 확인.
- `demo/videos/`, `demo/node_modules/`, `frontend/.next-record/`는 gitignore — 영상은 커밋되지 않는다.
