"use client";

import { useEffect, useRef, useState } from "react";
import AppHeader from "@/components/common/AppHeader";
import BottomSheet from "@/components/common/BottomSheet";
import { DocIcon, ChevronRightIcon, FlaskIcon, SendIcon, SunLogo } from "@/components/common/Icons";
import { useUi } from "@/components/common/UiProvider";
import LockerCard from "@/components/cards/LockerCard";
import PickupCard from "@/components/cards/PickupCard";
import PoiCarousel from "@/components/cards/PoiCard";
import StayForm from "@/components/cards/StayForm";
import { AltCard, BoundaryCard, NetErrCard, PickFailCard, ZeroCard } from "@/components/cards/notices";
import {
  ALT_LOCKER,
  BOUNDARY_CHANNELS,
  FEE_XL,
  HOTEL,
  LOCKERS,
  PICKUP_OK,
  POIS,
  RAG_FEE,
  STATIONS,
  type Locker,
} from "@/lib/content";
import { useLang } from "@/lib/i18n";
import {
  recommendSubwayLockers,
  type RecommendedSubwayLocker,
} from "@/lib/subwayLockers";
import { findSubwayCongestion } from "@/lib/subwayCongestion";
import type { ChipVM, LockerVM, Msg, PickupVM } from "@/lib/types";

// 혼잡 4등급 색 (congestion 토큰) — 항상 텍스트 라벨과 병행 (§7)
const CDOT = ["#1E9E6A", "#C99A2E", "#E1712B", "#C93F35"];
const CBG = ["#E3F3EC", "#FBF0D2", "#FBE4D3", "#F8DAD5"];

type Intent = "poi" | "locker" | "cong" | "rag" | "unknown";
type EdgeKind =
  | "NO_HOTEL"
  | "UNREGISTERED"
  | "DEADLINE_PASSED"
  | "NO_LOCKER"
  | "NO_CONG"
  | "BOUNDARY"
  | "ZERO"
  | "NETERR"
  | "UNKNOWN";

/** 채팅 메인 (§4.2) — 대화가 골격. 카드 5종이 스트림에 인라인으로 섞인다. */
export default function ChatScreen() {
  const { lang, T, tr } = useLang();
  const { openLockerSheet, openSourceSheet, openMap, toast } = useUi();

  const [stream, setStream] = useState<Msg[]>([]);
  const [typing, setTyping] = useState("");
  const [chips, setChipsState] = useState<ChipVM[]>([]);
  const [draft, setDraft] = useState("");
  const [edgeOpen, setEdgeOpen] = useState(false);

  const uidRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const bootedRef = useRef(false);
  const lastRecommendedLockerRef = useRef<RecommendedSubwayLocker | null>(null);

  // 스트림에 저장된 칩/카드 콜백이 언어 전환 후에도 최신 구현을 보게 하는 디스패처
  const api = useRef<{
    act: (i: Intent, o?: { mode?: string; stay?: string; spot?: string }) => void;
    startStay: (m: "pickup" | "spot") => void;
    reset: () => void;
    openMap: () => void;
    toast: () => void;
  }>({ act: () => {}, startStay: () => {}, reset: () => {}, openMap: () => {}, toast: () => {} });

  const uid = (p: string) => `${p}_${++uidRef.current}`;
  const push = (item: Omit<Msg, "id"> & { kind: Msg["kind"] }) =>
    setStream((s) => [...s, { ...item, id: uid(item.kind) } as Msg]);

  const setChips = (list: Omit<ChipVM, "variant">[], withReset = true) => {
    const norm: ChipVM[] = list.map((c) => ({ ...c, variant: "default" }));
    if (withReset && norm.length) {
      norm.push({
        label: { ko: "↻ 다시 하기", ja: "↻ やり直す", en: "↻ Start over" }[lang],
        variant: "reset",
        onClick: () => api.current.reset(),
      });
    }
    setChipsState(norm);
  };

  const think = (msg: string, cb: () => void, ms = 900) => {
    setTyping(msg);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setTyping("");
      cb();
    }, ms);
  };

  const userSay = (text: string) => push({ kind: "user", text } as Msg);

  // ── 응답 엔진 ────────────────────────────────
  const lockerView = (lk: Locker): LockerVM => {
    const st = STATIONS[lk.station];
    const cong = lk.congestion
      ? {
          grade: lk.congestion.grade,
          label: T.cong[lk.congestion.grade - 1],
          color: CDOT[lk.congestion.grade - 1],
          bg: CBG[lk.congestion.grade - 1],
          // §7-② 혼잡은 항상 과거형
          text: {
            ko: `${tr(st.name)}은 ${tr(lk.congestion.peak)}에 혼잡했어요. ${T.congAdvice}`,
            ja: `${tr(st.name)}は${tr(lk.congestion.peak)}が混雑していました。${T.congAdvice}`,
            en: `${tr(st.name)} was busy on ${tr(lk.congestion.peak)}. ${T.congAdvice}`,
          }[lang],
          sample: tr(lk.congestion.sample),
        }
      : null;
    return {
      id: lk.id,
      station: tr(st.name),
      stationOrig: lang === "ko" ? "" : `· ${st.orig}`,
      xlLabel: `${T.xl} ${lk.xl_count}${T.slots}`,
      held: T.held,
      fee: `${lk.fee.amount} / ${tr(lk.fee.per)}`,
      loc: `${lk.detail_loc.floor} · ${tr(lk.detail_loc.exits)}`,
      dist: T.distFromPoi(lk.distance_m),
      cong,
      onDetail: () => openLockerSheet(lk.id),
    };
  };

  const subwayLockerView = (
    locker: RecommendedSubwayLocker,
    basisStation: string | null,
  ): LockerVM => {
    const congestionSource = findSubwayCongestion(locker.id);
    const cong = congestionSource
      ? {
          grade: congestionSource.grade,
          label: T.cong[congestionSource.grade - 1],
          color: CDOT[congestionSource.grade - 1],
          bg: CBG[congestionSource.grade - 1],
          text: {
            ko: `${locker.name}역은 ${tr(congestionSource.peak)}에 승하차가 가장 많았어요. 이 시간대를 피하면 더 여유로웠어요.`,
            ja: `${locker.name}駅は${tr(congestionSource.peak)}の乗降が最も多くなりました。この時間帯を避けると比較的空いていました。`,
            en: `${locker.name} Station had the most entries and exits on ${tr(congestionSource.peak)}. Other times were relatively quieter.`,
          }[lang],
          sample: tr(congestionSource.sample),
        }
      : null;
    return {
      id: locker.id,
      station: {
        ko: `${locker.name}역 · ${locker.line}호선`,
        ja: `${locker.name}駅 · ${locker.line}号線`,
        en: `${locker.name} · Line ${locker.line}`,
      }[lang],
      stationOrig: "",
      xlLabel: `${T.xl} ${locker.xl}${T.slots}`,
      held: T.held,
      fee: `${FEE_XL.amount} / ${tr(FEE_XL.per)}`,
      loc: locker.loc,
      dist:
        locker.distanceM === null
          ? { ko: "거리 확인 필요", ja: "距離確認が必要", en: "Distance unavailable" }[lang]
          : {
              ko: `${basisStation}역 기준 ${locker.distanceM}m`,
              ja: `${basisStation}駅から ${locker.distanceM}m`,
              en: `${locker.distanceM}m from ${basisStation} Station`,
            }[lang],
      cong,
      onDetail: () => openLockerSheet(locker.id),
    };
  };

  const pickupView = (hotel?: string): PickupVM => ({
    hotel: hotel || tr(HOTEL),
    slot: PICKUP_OK.slot_time,
    deadline: PICKUP_OK.deadline,
    onReserve: () => api.current.toast(),
  });

  const respondPoi = () => {
    const intro = {
      ko: "남포동 쪽은 어떠세요? 모두 짐 맡길 수 있는 역 근처예요.",
      ja: "南浦洞エリアはいかがですか。どこも荷物を預けられる駅の近くですよ。",
      en: "How about the Nampo-dong area? Every spot is near a station where you can store bags.",
    };
    push({ kind: "text", text: tr(intro) } as Msg);
    push({
      kind: "poi",
      pois: POIS.map((p) => {
        const st = STATIONS[p.station];
        return {
          id: p.id,
          hasImage: p.image,
          name: tr(p.name),
          orig: lang === "ko" ? "" : p.orig,
          station: tr(st.name),
          walk: T.walkMin(p.walk_min),
          xlLabel: `${T.xl} ${p.xl_locker_count}`,
          tags: tr(p.tags),
          onGo: () => {
            userSay(`${tr(p.name)} — ${T.pickTogo}`);
            api.current.act("locker", {});
          },
        };
      }),
    } as Msg);
    setChips([
      { label: T.choices[1], onClick: () => api.current.act("locker") },
      {
        label: { ko: "혼잡 시간 피하고 싶어", ja: "混雑を避けたい", en: "Avoid the crowds" }[lang],
        onClick: () => api.current.act("cong"),
      },
      { label: T.choices[2], onClick: () => api.current.act("rag") },
    ]);
  };

  const respondLocker = (opts?: { mode?: string; stay?: string; spot?: string }) => {
    const spotOnly = opts?.mode === "spot";
    const spot = opts?.spot || POIS[0].orig;
    const recommendation = recommendSubwayLockers(spot);
    lastRecommendedLockerRef.current = recommendation.lockers[0] ?? null;
    const recommendedLockers = recommendation.lockers.map((locker) =>
      subwayLockerView(locker, recommendation.basisStation),
    );
    const afterChips = [
      {
        label: { ko: "혼잡 자세히", ja: "混雑を詳しく", en: "Crowd details" }[lang],
        onClick: () => api.current.act("cong"),
      },
      { label: T.choices[2], onClick: () => api.current.act("rag") },
      { label: T.mapTitle, onClick: () => api.current.openMap() },
    ];
    if (spotOnly) {
      const intro = recommendation.isResolved
        ? {
            ko: `${spot}에 매핑된 ${recommendation.basisStation}역 기준 가까운 물품 보관소예요.`,
            ja: `${spot}に対応する${recommendation.basisStation}駅を基準に近いロッカーです。`,
            en: `These lockers are nearest to ${recommendation.basisStation} Station, mapped from ${spot}.`,
          }
        : {
            ko: `${spot} 위치를 정확히 찾지 못해 특대형 보유 칸수가 많은 순으로 보여드려요.`,
            ja: `${spot}の位置を特定できなかったため、特大ロッカーの保有数順に表示します。`,
            en: `I couldn't resolve ${spot}, so these are sorted by XL locker capacity.`,
          };
      push({ kind: "text", text: tr(intro) } as Msg);
      push({ kind: "locker", pickup: null, lockers: recommendedLockers } as Msg);
      setChips(afterChips);
      return;
    }
    const intro = recommendation.isResolved
      ? {
          ko: `${spot}에 매핑된 ${recommendation.basisStation}역 기준으로 픽업과 가까운 보관함을 함께 찾았어요.`,
          ja: `${spot}に対応する${recommendation.basisStation}駅を基準に、集荷と近いロッカーを探しました。`,
          en: `I found pickup and lockers near ${recommendation.basisStation} Station, mapped from ${spot}.`,
        }
      : {
          ko: `${spot} 위치를 정확히 찾지 못해 픽업과 특대형 보유 칸수가 많은 보관함을 함께 보여드려요.`,
          ja: `${spot}の位置を特定できなかったため、集荷と特大ロッカーの多い場所を表示します。`,
          en: `I couldn't resolve ${spot}, so I'm showing pickup and stations with the most XL lockers.`,
        };
    push({ kind: "text", text: tr(intro) } as Msg);
    // 픽업·보관함은 나란히 동급 — 위계 없음 (§5.2)
    push({
      kind: "locker",
      pickup: pickupView(opts?.stay),
      lockers: recommendedLockers,
    } as Msg);
    setChips(afterChips);
  };

  const respondCong = () => {
    const recommended = lastRecommendedLockerRef.current;
    const historical = recommended
      ? findSubwayCongestion(recommended.id)
      : null;
    if (recommended && historical) {
      const text = {
        ko: `${recommended.name}역은 ${tr(historical.peak)}에 승하차가 가장 많았어요. ${T.congAdvice}`,
        ja: `${recommended.name}駅は${tr(historical.peak)}の乗降が最も多くなりました。${T.congAdvice}`,
        en: `${recommended.name} Station had the most entries and exits on ${tr(historical.peak)}. ${T.congAdvice}`,
      };
      push({
        kind: "text",
        text: tr(text),
        attach: {
          type: "congOpen",
          label: T.detail,
          onClick: () => openLockerSheet(recommended.id),
        },
      } as Msg);
      setChips([
        { label: T.choices[1], onClick: () => api.current.act("locker") },
        { label: T.choices[2], onClick: () => api.current.act("rag") },
      ]);
      return;
    }
    const lk = LOCKERS[0];
    const st = STATIONS[lk.station];
    const text = {
      ko: `${tr(st.name)}은 ${tr(lk.congestion!.peak)}에 혼잡했어요. ${T.congAdvice}`,
      ja: `${tr(st.name)}は${tr(lk.congestion!.peak)}が混雑していました。${T.congAdvice}`,
      en: `${tr(st.name)} was busy on ${tr(lk.congestion!.peak)}. ${T.congAdvice}`,
    };
    push({
      kind: "text",
      text: tr(text),
      attach: { type: "congOpen", label: T.detail, onClick: () => openLockerSheet(lk.id) },
    } as Msg);
    setChips([
      { label: T.choices[1], onClick: () => api.current.act("locker") },
      { label: T.choices[2], onClick: () => api.current.act("rag") },
    ]);
  };

  const respondRag = () => {
    // 요금 답변엔 출처 칩 필수 (§7-④)
    push({
      kind: "text",
      text: tr(RAG_FEE.answer),
      attach: {
        type: "source",
        label: `${tr(RAG_FEE.sources[0].name)} · ${RAG_FEE.as_of} ${T.asOf}`,
        onClick: () => openSourceSheet(),
      },
    } as Msg);
    setChips([
      { label: T.choices[0], onClick: () => api.current.act("poi") },
      { label: T.choices[1], onClick: () => api.current.act("locker") },
    ]);
  };

  const respondUnknown = () => {
    push({
      kind: "choices",
      q: T.choicesQ,
      choices: [
        { label: T.choices[0], onClick: () => api.current.act("poi") },
        { label: T.choices[1], onClick: () => api.current.act("locker") },
        { label: T.choices[2], onClick: () => api.current.act("rag") },
      ],
    } as Msg);
    setChipsState([]);
  };

  const act = (intent: Intent, opts?: { mode?: string; stay?: string; spot?: string }) => {
    switch (intent) {
      case "poi":
        return think(T.loadingPoi, respondPoi);
      case "locker":
        return think(T.loadingLocker, () => respondLocker(opts));
      case "cong":
        return think(T.loadingCong, respondCong);
      case "rag":
        return think(T.loadingRag, respondRag);
      case "unknown":
        return respondUnknown();
    }
  };

  const route = (text: string) => {
    const s = text.toLowerCase();
    const has = (...a: string[]) => a.some((k) => text.includes(k) || s.includes(k));
    if (has("荷物", "預け", "ロッカー", "보관", "짐", "locker", "storage", "luggage")) return act("locker");
    if (has("混雑", "혼잡", "crowd", "busy")) return act("cong");
    if (has("料金", "使い方", "요금", "이용", "how", "fee", "price")) return act("rag");
    if (has("どこ", "行", "관광", "갈", "어디", "where", "go", "spot")) return act("poi");
    return act("unknown");
  };

  const sendDraft = () => {
    const v = draft.trim();
    if (!v) return;
    setDraft("");
    userSay(v);
    route(v);
  };

  // ── 진입 분기: 칩 → 숙소/여행지 폼 → 제출 시 응답 ──
  const startStay = (mode: "pickup" | "spot") => {
    push({ kind: "stayform", mode, done: false } as Msg);
    setChipsState([]);
  };

  const submitStay = (msgId: string, mode: "pickup" | "spot", stay: string, spot: string) => {
    setStream((s) =>
      s.map((m) =>
        m.id === msgId && m.kind === "stayform"
          ? { ...m, done: true, stayVal: stay, spotVal: spot }
          : m
      )
    );
    const say =
      mode === "pickup"
        ? {
            ko: `${stay}에 묵어요. 마지막날은 ${spot}에 갈 거예요.`,
            ja: `${stay}に泊まっています。最終日は${spot}に行きます。`,
            en: `I'm staying at ${stay}. On my last day I'll visit ${spot}.`,
          }[lang]
        : {
            ko: `마지막날 ${spot} 근처 보관함이 필요해요.`,
            ja: `最終日、${spot}近くのロッカーが必要です。`,
            en: `I need lockers near ${spot} on my last day.`,
          }[lang];
    userSay(say);
    think(T.loadingLocker, () => respondLocker({ mode, stay, spot }));
  };

  const boot = () => {
    const greet = {
      ko: "안녕하세요. 마지막 반나절, 짐 걱정 없이 즐기실 수 있게 도와드릴게요. 질의하고 싶은 질문을 선택해주세요.",
      ja: "こんにちは。最後の半日、荷物を気にせず楽しめるようお手伝いします。お聞きになりたい質問を選んでください。",
      en: "Hi! I'll help you enjoy your last half day without worrying about your bags. Please choose a question to get started.",
    };
    push({ kind: "text", text: tr(greet) } as Msg);
    setChips(
      [
        {
          label: { ko: "숙소 픽업", ja: "宿で集荷", en: "Pickup at stay" }[lang],
          onClick: () => api.current.startStay("pickup"),
        },
        {
          label: { ko: "여행지 근처 보관함", ja: "旅先近くのロッカー", en: "Lockers near spot" }[lang],
          onClick: () => api.current.startStay("spot"),
        },
      ],
      false
    );
  };

  const reset = () => {
    clearTimeout(timerRef.current);
    setStream([]);
    setTyping("");
    setChipsState([]);
    setEdgeOpen(false);
    setTimeout(boot, 0);
  };

  // ── 엣지 케이스 데모 (§6) — 심사 시연용 ──
  const edge = (kind: EdgeKind) => {
    setEdgeOpen(false);
    const pick = <V,>(o: Record<string, V>) => o[lang];
    switch (kind) {
      case "NO_HOTEL":
        userSay(pick({ ko: "짐 맡길 곳 있어?", ja: "荷物どこに預ける？", en: "Where can I store my bags?" }));
        think(T.loadingLocker, () => {
          push({
            kind: "text",
            text: pick({
              ko: "숙소를 알려주시면 픽업 가능 여부도 봐드릴게요. 우선 동선의 보관함부터 볼까요?",
              ja: "宿を教えていただければ集荷の可否も確認します。まずは動線上のロッカーを見ますか？",
              en: "Tell me your hotel and I'll check pickup too. For now, shall we look at lockers on your route?",
            }),
          } as Msg);
          push({ kind: "locker", pickup: null, lockers: LOCKERS.map(lockerView) } as Msg);
          setChips([
            {
              label: pick({ ko: "숙소 입력", ja: "宿を入力", en: "Enter hotel" }),
              onClick: () => api.current.startStay("pickup"),
            },
            { label: T.mapTitle, onClick: () => api.current.openMap() },
          ]);
        });
        break;
      case "UNREGISTERED":
        userSay(pick({ ko: "해운대 게스트하우스에 묵어", ja: "海雲台のゲストハウスに泊まってる", en: "I'm staying at a Haeundae guesthouse" }));
        think(T.loadingLocker, () => {
          push({
            kind: "pickfail",
            title: pick({ ko: "이 숙소는 픽업이 어려워요", ja: "この宿は集荷が難しいです", en: "Pickup isn't available for this stay" }),
            body: pick({
              ko: "픽업 제휴 숙소(343개) 밖이에요. 대신 동선에 보관함이 있어요.",
              ja: "集荷提携の宿（343軒）以外です。代わりに動線上にロッカーがあります。",
              en: "It's outside the 343 partner stays. But there are lockers on your route.",
            }),
          } as Msg);
          push({ kind: "locker", pickup: null, lockers: LOCKERS.map(lockerView) } as Msg);
          setChips([
            { label: T.mapTitle, onClick: () => api.current.openMap() },
            { label: T.choices[2], onClick: () => api.current.act("rag") },
          ]);
        });
        break;
      case "DEADLINE_PASSED":
        userSay(pick({ ko: "지금 픽업 돼?", ja: "今から集荷できる？", en: "Can I get pickup now?" }));
        think(T.loadingLocker, () => {
          push({
            kind: "pickfail",
            title: pick({ ko: "오늘 수거 마감(13:00)이 지났어요", ja: "本日の集荷締切（13:00）を過ぎました", en: "Today's pickup cutoff (13:00) has passed" }),
            body: pick({
              ko: "익일 픽업으로 예약하거나, 오늘은 동선의 보관함을 이용하실 수 있어요.",
              ja: "翌日集荷で予約するか、本日は動線上のロッカーをご利用いただけます。",
              en: "Book next-day pickup, or use a locker on your route today.",
            }),
          } as Msg);
          push({ kind: "locker", pickup: null, lockers: LOCKERS.map(lockerView) } as Msg);
          setChips([
            {
              label: pick({ ko: "익일 픽업 예약", ja: "翌日集荷を予約", en: "Book next-day" }),
              onClick: () => api.current.toast(),
            },
            { label: T.mapTitle, onClick: () => api.current.openMap() },
          ]);
        });
        break;
      case "NO_LOCKER":
        userSay(pick({ ko: "센텀시티역 근처 특대 보관함 있어?", ja: "センタムシティ駅の特大ロッカーある？", en: "Any XL lockers near Centum City?" }));
        think(T.loadingLocker, () => {
          push({
            kind: "text",
            text: pick({
              ko: "이 역엔 특대형이 없었어요. 한 정거장 거리 대안을 찾았어요.",
              ja: "この駅には特大がありませんでした。一駅先の代わりを見つけました。",
              en: "No XL here. I found an alternative one stop away.",
            }),
          } as Msg);
          push({ kind: "alt", altTitle: T.altTitle, locker: lockerView(ALT_LOCKER) } as Msg);
          setChips([
            { label: T.mapTitle, onClick: () => api.current.openMap() },
            { label: T.choices[0], onClick: () => api.current.act("poi") },
          ]);
        });
        break;
      case "NO_CONG":
        userSay(pick({ ko: "중앙역은 언제 붐벼?", ja: "中央駅はいつ混む？", en: "When is Jungang busy?" }));
        think(T.loadingCong, () => {
          // 표본 부족 → 혼잡 영역 자체 생략, 빈 badge로 채우지 않음 (§6)
          push({
            kind: "text",
            text: pick({
              ko: "중앙역은 혼잡 데이터 표본이 부족해 혼잡도는 안내하지 않을게요. 대신 보관함 정보는 정확히 알려드려요.",
              ja: "中央駅は混雑データの標本が不足しているため、混雑度はご案内しません。ロッカー情報は正確にお伝えします。",
              en: "Jungang has too little crowd data, so I won't show congestion. But locker info is exact.",
            }),
          } as Msg);
          setChips([
            { label: T.choices[1], onClick: () => api.current.act("locker") },
            { label: T.choices[2], onClick: () => api.current.act("rag") },
          ]);
        });
        break;
      case "BOUNDARY":
        userSay(pick({ ko: "보관함에 반려동물 맡겨도 돼?", ja: "ロッカーにペットを預けられる？", en: "Can I leave a pet in a locker?" }));
        think(T.loadingRag, () => {
          push({
            kind: "boundary",
            body: pick({
              ko: "이 내용은 문서에서 확인되지 않아 답하지 않을게요. 정확한 확인은 아래 공식 채널을 이용해 주세요.",
              ja: "この内容は文書で確認できないため、お答えしません。正確な確認は下記の公式チャネルをご利用ください。",
              en: "I couldn't verify this in the documents, so I won't answer. Please check the official channels below.",
            }),
            channels: BOUNDARY_CHANNELS.map((c) => ({ label: tr(c), onClick: () => api.current.toast() })),
          } as Msg);
          setChips([
            { label: T.choices[2], onClick: () => api.current.act("rag") },
            { label: T.choices[1], onClick: () => api.current.act("locker") },
          ]);
        });
        break;
      case "ZERO":
        userSay(pick({ ko: "기장 쪽 보관함 알려줘", ja: "機張のロッカー教えて", en: "Show lockers near Gijang" }));
        think(T.loadingLocker, () => {
          push({
            kind: "zero",
            body: pick({
              ko: "이 지역엔 결과가 없었어요. 다른 지역을 볼까요?",
              ja: "この地域には結果がありませんでした。他の地域を見ますか？",
              en: "No results in this area. Try another area?",
            }),
            chips: [
              { label: pick({ ko: "남포동", ja: "南浦洞", en: "Nampo" }), onClick: () => api.current.act("locker") },
              { label: pick({ ko: "부산역", ja: "釜山駅", en: "Busan Stn." }), onClick: () => api.current.act("locker") },
            ],
          } as Msg);
          setChipsState([]);
        });
        break;
      case "NETERR":
        userSay(pick({ ko: "보관함 다시 찾아줘", ja: "ロッカーをもう一度探して", en: "Search lockers again" }));
        think(
          T.loadingLocker,
          () => {
            push({ kind: "neterr", body: T.netErr, onRetry: () => api.current.act("locker") } as Msg);
            setChipsState([]);
          },
          700
        );
        break;
      case "UNKNOWN":
        userSay(pick({ ko: "음… 잘 모르겠어", ja: "うーん、よくわからない", en: "Hmm, not sure" }));
        respondUnknown();
        break;
    }
  };

  // 콜백이 항상 최신 구현을 보도록 매 렌더 갱신
  api.current.act = act;
  api.current.startStay = startStay;
  api.current.reset = reset;
  api.current.openMap = openMap;
  api.current.toast = toast;

  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) requestAnimationFrame(() => (el.scrollTop = el.scrollHeight));
  }, [stream, typing]);

  const edgeLabels = {
    ko: ["숙소 미입력", "미등록 숙소", "수거 마감 경과", "인근 특대 없음", "혼잡 정보 없음", "근거 없음(경계)", "결과 0건", "네트워크 오류", "의도 불명확"],
    ja: ["宿未入力", "未登録の宿", "集荷締切超過", "近くに特大なし", "混雑情報なし", "根拠なし(境界)", "結果0件", "ネットワーク障害", "意図が不明確"],
    en: ["No hotel", "Unregistered stay", "Cutoff passed", "No XL nearby", "No crowd data", "No evidence", "Zero results", "Network error", "Unclear intent"],
  }[lang];
  const edgeKeys: EdgeKind[] = ["NO_HOTEL", "UNREGISTERED", "DEADLINE_PASSED", "NO_LOCKER", "NO_CONG", "BOUNDARY", "ZERO", "NETERR", "UNKNOWN"];

  const orLabel = { ko: "지하철 물품 보관소", ja: "地下鉄ロッカー", en: "Metro lockers" }[lang];

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <AppHeader
        extra={
          <button
            onClick={() => setEdgeOpen(true)}
            aria-label="엣지 케이스 데모"
            className="flex h-11 w-11 items-center justify-center rounded-xs text-gray active:scale-[0.94]"
          >
            <FlaskIcon />
          </button>
        }
      />

      {/* 메시지 스트림 */}
      <div
        ref={scrollRef}
        className="hd-scroll flex flex-1 flex-col gap-3.5 overflow-y-auto overflow-x-hidden px-4 pb-2 pt-[18px]"
      >
        {stream.map((m) => (
          <div key={m.id} className="animate-fade-up">
            {m.kind === "user" && (
              <div className="flex justify-end">
                <div className="max-w-[80%] whitespace-pre-wrap break-words rounded-md rounded-tr-md bg-primary px-3.5 py-[11px] text-[14.5px] font-medium leading-normal text-white">
                  {m.text}
                </div>
              </div>
            )}

            {m.kind === "text" && (
              <AiRow>
                <div className="flex max-w-[82%] flex-col gap-2">
                  <div className="whitespace-pre-wrap break-words rounded-md rounded-tl-md border border-line bg-card px-3.5 py-3 text-[14.5px] leading-relaxed text-ink shadow-card">
                    {m.text}
                  </div>
                  {m.attach?.type === "source" && (
                    <button
                      onClick={m.attach.onClick}
                      className="flex items-center gap-1.5 self-start rounded-xs border border-[#F2DFB8] bg-heritage-bg px-3 py-2 text-[12.5px] font-semibold text-[#8A6516] active:scale-[0.97]"
                    >
                      <DocIcon />
                      {m.attach.label}
                    </button>
                  )}
                  {m.attach?.type === "congOpen" && (
                    <button
                      onClick={m.attach.onClick}
                      className="flex items-center gap-1.5 self-start rounded-xs border border-line-strong bg-card px-3 py-2 text-[12.5px] font-semibold text-sub active:scale-[0.97]"
                    >
                      {m.attach.label}
                      <ChevronRightIcon size={14} />
                    </button>
                  )}
                </div>
              </AiRow>
            )}

            {m.kind === "poi" && <PoiCarousel pois={m.pois} />}

            {m.kind === "locker" && (
              /* 아바타 정렬 인덴트는 360px+에서만 — 320px대에선 카드 폭 확보 우선 */
              <div className="flex flex-col gap-[11px] min-[360px]:ml-[38px]">
                {m.pickup && (
                  <>
                    <PickupCard p={m.pickup} />
                    <div className="flex items-center gap-2 text-gray">
                      <div className="h-px flex-1 bg-line" />
                      <span className="text-caption font-semibold">{orLabel}</span>
                      <div className="h-px flex-1 bg-line" />
                    </div>
                  </>
                )}
                {m.lockers.map((lk) => (
                  <LockerCard key={lk.id} lk={lk} />
                ))}
              </div>
            )}

            {m.kind === "choices" && (
              <AiRow>
                <div className="flex max-w-[82%] flex-col gap-2.5">
                  <div className="rounded-md rounded-tl-md border border-line bg-card px-3.5 py-3 text-[14px] leading-normal text-ink shadow-card">
                    {m.q}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {m.choices.map((c) => (
                      <button
                        key={c.label}
                        onClick={c.onClick}
                        className="min-h-11 rounded-sm border border-primary-line bg-primary-bg px-4 text-[13.5px] font-bold text-primary-dark active:scale-[0.97]"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>
              </AiRow>
            )}

            {m.kind === "pickfail" && <PickFailCard title={m.title} body={m.body} />}

            {m.kind === "stayform" && (
              <AiRow>
                <StayForm
                  mode={m.mode}
                  done={m.done}
                  stayVal={m.stayVal}
                  spotVal={m.spotVal}
                  onSubmit={(stay, spot) => submitStay(m.id, m.mode, stay, spot)}
                />
              </AiRow>
            )}

            {m.kind === "alt" && <AltCard altTitle={m.altTitle} locker={m.locker} />}
            {m.kind === "boundary" && <BoundaryCard body={m.body} channels={m.channels} />}
            {m.kind === "zero" && <ZeroCard body={m.body} chips={m.chips} />}
            {m.kind === "neterr" && <NetErrCard body={m.body} onRetry={m.onRetry} />}
          </div>
        ))}

        {/* 도구별 상태 문구 — 무엇을 조회 중인지 보여준다 (§6 로딩) */}
        {typing && (
          <div className="flex animate-fade-up items-start gap-2">
            <Avatar />
            <div className="flex items-center gap-2 rounded-md rounded-tl-md border border-line bg-card px-3.5 py-[11px] shadow-card">
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-gray" />
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-gray [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-gray [animation-delay:0.4s]" />
              </span>
              <span className="text-[12.5px] text-sub">{typing}</span>
            </div>
          </div>
        )}
        <div className="h-0.5 flex-none" />
      </div>

      {/* 추천 질문 칩 — 빈 입력창만 있는 챗 UI 금지 (§4.2) */}
      <div className="flex-none bg-canvas">
        {chips.length > 0 && !typing && (
          <div className="hd-scroll flex gap-2 overflow-x-auto px-4 pb-2.5 pt-2">
            {chips.map((c) => (
              <button
                key={c.label}
                onClick={c.onClick}
                /* ponytail: 시각 크기 우선으로 40px — 44px 터치 타깃 규칙 예외, 문제 되면 min-h-11 복귀 */
                className={`flex min-h-10 flex-none items-center gap-[5px] whitespace-nowrap rounded-full border px-3 text-[12.5px] font-semibold active:scale-[0.96] ${
                  c.variant === "reset"
                    ? "border-line-strong bg-transparent text-gray"
                    : "border-primary-line bg-card text-primary-dark"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
        {/* 입력바 — 하단 고정, safe-area 대응 (§4.2) */}
        {/* 입력+전송 일체형 캡슐 — 전송 버튼이 캡슐 내부 우측 */}
        <div className="px-3.5 pb-3 pt-1.5">
          <div className="flex items-center gap-1.5 rounded-[24px] border border-line-strong bg-card py-0.5 pl-4 pr-0.5 shadow-[0_2px_10px_rgba(42,35,32,0.07)]">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendDraft();
                }
              }}
              placeholder={T.inputPlaceholder}
              /* 16px 미만이면 iOS가 포커스 시 강제 줌 — 입력만 16px 고정 */
              className="min-h-10 w-full min-w-0 flex-1 bg-transparent text-[16px] text-ink outline-none"
            />
            {/* 입력 있을 때만 활성 — 배경 없이 종이비행기 아이콘만 주황으로 피드백 */}
            <button
              onClick={sendDraft}
              aria-label="전송"
              className={`flex h-10 w-10 flex-none items-center justify-center rounded-full active:scale-[0.92] ${
                draft.trim() ? "text-primary" : "text-gray"
              }`}
            >
              <SendIcon size={17} />
            </button>
          </div>
        </div>
      </div>

      {/* 엣지 케이스 데모 시트 (심사 시연용) */}
      {edgeOpen && (
        <BottomSheet onClose={() => setEdgeOpen(false)} z="z-langsheet">
          <div className="text-[16px] font-bold text-ink">{T.edgeTitle}</div>
          <div className="mb-3.5 mt-1 text-[12px] text-gray">{T.edgeHint}</div>
          <div className="grid grid-cols-2 gap-2">
            {edgeKeys.map((k, i) => (
              <button
                key={k}
                onClick={() => edge(k)}
                className="min-h-[46px] rounded-xs border border-line-strong bg-canvas px-3 text-left text-label font-semibold text-ink active:scale-[0.97] active:border-primary"
              >
                {edgeLabels[i]}
              </button>
            ))}
          </div>
        </BottomSheet>
      )}
    </div>
  );
}

function Avatar() {
  return (
    <div className="flex h-[30px] w-[30px] flex-none items-center justify-center rounded-xxs bg-primary">
      <SunLogo size={18} />
    </div>
  );
}

function AiRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <Avatar />
      {children}
    </div>
  );
}
