// 데모 영상용 자동 시연 스크립트 — OpenScreen으로 이 브라우저 창을 녹화한다.
// 실행: node record-demo.mjs  (사전에 frontend 서버 http://localhost:3100 필요)
// 흐름: KO — 온보딩 → 채팅 픽업 추천 → 보관함 상세 시트 → 보관소 탭 역 검색 → 픽업 탭 4세그먼트
//       → 언어 전환(English) → EN 동일 흐름 반복
import { chromium } from "playwright";

const BASE = process.env.BASE_URL ?? "http://localhost:3100";
const SPEED = Number(process.env.SPEED ?? 1); // 0.2 = 검증용 빠른 실행
const TYPE_DELAY = Math.max(5, 90 * SPEED); // 타이핑 속도 (ms/키)

const browser = await chromium.launch({
  headless: false,
  args: ["--window-size=430,960", "--window-position=200,60"],
});
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  // RECORD=1이면 OpenScreen 없이도 demo/videos/에 webm 자동 저장
  ...(process.env.RECORD
    ? { recordVideo: { dir: "videos", size: { width: 390, height: 844 } } }
    : {}),
});
const page = await context.newPage();
const pause = (ms) => page.waitForTimeout(ms * SPEED);

// 언어별 UI 문자열 (셀렉터용)
const KO = {
  onboardPick: "한국어",
  entryChip: "숙소 픽업",
  stayPh: "예) 서면 스테이 호텔",
  spotPh: "예) 감천문화마을",
  submit: "입력",
  detail: "상세 보기",
  tabLockers: "보관소",
  tabPickup: "픽업",
  tabChat: "채팅",
  lockerSearchPh: "역명 검색 (남포·부산·자갈치…)",
  lockerQuery: "남포",
  segStays: "등록 숙소",
  segZcLockers: "무인 보관함",
  staySearchPh: "숙소명·지역 검색",
  stayQuery: "해운대",
  stay: "홍단",
  spot: "벡스코",
  pickupDivider: "짐캐리 픽업 숙소",
};
const EN = {
  entryChip: "Pickup at stay",
  stayPh: "e.g. Seomyeon Stay Hotel",
  spotPh: "e.g. Gamcheon Village",
  submit: "Submit",
  detail: "View details",
  tabLockers: "Lockers",
  tabPickup: "Pickup",
  tabChat: "Chat",
  lockerSearchPh: "Search station",
  lockerQuery: "Nampo",
  segStays: "Stays",
  segZcLockers: "Lockers",
  staySearchPh: "Search stay / area",
  stayQuery: "Haeundae",
  stay: "Hongdan",
  spot: "Bexco",
  pickupDivider: "GimCarry pickup stay",
};

async function chatFlow(L) {
  // 1) 진입 칩 → 숙소/여행지 폼 → 픽업+보관함 추천
  await page.getByRole("button", { name: L.entryChip }).first().click();
  await pause(1200);
  await page.getByPlaceholder(L.stayPh).click();
  await page.getByPlaceholder(L.stayPh).pressSequentially(L.stay, { delay: TYPE_DELAY });
  await pause(400);
  await page.getByPlaceholder(L.spotPh).click();
  await page.getByPlaceholder(L.spotPh).pressSequentially(L.spot, { delay: TYPE_DELAY });
  await pause(500);
  await page.getByRole("button", { name: L.submit, exact: true }).click();

  // 응답 대기(로딩 900ms) — 픽업 카드까지 떠야 정상 매칭 (숙소·여행지 인식 검증)
  await page.getByText(L.pickupDivider).first().waitFor();
  await page.getByText(L.detail).first().waitFor();
  await pause(1800);
  for (let i = 0; i < 4; i++) {
    await page.mouse.wheel(0, 300);
    await pause(900);
  }
  await pause(800);

  // 2) 보관함 상세 시트 (혼잡 히트맵)
  await page.getByRole("button").filter({ hasText: L.detail }).first().click();
  await pause(2000);
  await page.mouse.wheel(0, 350);
  await pause(1800);
  // 시트 밖(상단 스크림) 탭으로 닫기 — Esc는 터치 컨텍스트에서 불안정
  await page.mouse.click(195, 80);
  await pause(1000);
}

async function lockersTabFlow(L) {
  await page.getByRole("link", { name: L.tabLockers }).click();
  await pause(1800);
  await page.mouse.wheel(0, 400);
  await pause(1200);
  await page.mouse.wheel(0, -400);
  await pause(600);
  // 역 검색
  const search = page.getByPlaceholder(L.lockerSearchPh);
  await search.click();
  await search.pressSequentially(L.lockerQuery, { delay: TYPE_DELAY + 40 });
  await pause(2200);
  await search.fill("");
  await pause(600);
}

async function pickupTabFlow(L) {
  await page.getByRole("link", { name: L.tabPickup }).click();
  await pause(2200); // 이용 방법 (기본)
  await page.mouse.wheel(0, 250);
  await pause(1200);

  await page.getByRole("button", { name: L.segStays, exact: true }).click();
  await pause(1200);
  const search = page.getByPlaceholder(L.staySearchPh);
  await search.click();
  await search.pressSequentially(L.stayQuery, { delay: TYPE_DELAY + 40 });
  await pause(2000);

  await page.getByRole("button", { name: L.segZcLockers, exact: true }).click();
  await pause(2200);
  await page.mouse.wheel(0, 250);
  await pause(1200);

  await page.getByRole("button", { name: "FAQ", exact: true }).click();
  await pause(1200);
  // 첫 FAQ 펼치기
  const firstFaq = page.locator("div.overflow-hidden > button").first();
  await firstFaq.click();
  await pause(2200);
}

// ── 시작: 온보딩부터 (저장 언어 제거) ──
await page.goto(BASE);
await page.evaluate(() => localStorage.clear());
await page.reload();
await pause(1500);

if (!process.env.RECORD) {
  console.log("▶ 녹화 준비 완료. 5초 안에 OpenScreen 녹화를 시작하세요…");
  await pause(5000);
}

// ── 한국어 ──
await page.getByRole("button", { name: KO.onboardPick, exact: true }).click();
await pause(1800); // 인사말
await chatFlow(KO);
await lockersTabFlow(KO);
await pickupTabFlow(KO);

// ── 언어 전환 → English ──
await page.getByRole("link", { name: KO.tabChat }).click();
await pause(1200);
await page.getByRole("button", { name: "언어 전환" }).click();
await pause(1000);
await page.getByRole("button", { name: "English" }).click();
await pause(2000); // EN으로 리부트된 인사말

// ── English ──
await chatFlow(EN);
await lockersTabFlow(EN);
await pickupTabFlow(EN);

await pause(3000);
console.log("■ 시연 종료. OpenScreen 녹화를 정지하세요.");
await browser.close();
