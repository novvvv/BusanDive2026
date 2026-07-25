"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BackIcon, BoxIcon, LockerIcon } from "@/components/common/Icons";
import { LOCKERS, STATIONS, ZC } from "@/lib/content";
import { useLang } from "@/lib/i18n";

// ── 카카오맵 JS SDK (전역 window.kakao) 최소 타입 ──
type KakaoLatLng = unknown;
interface KakaoLatLngBounds {
  extend(point: KakaoLatLng): void;
}
interface KakaoMap {
  setBounds(bounds: KakaoLatLngBounds): void;
  panTo(position: KakaoLatLng): void;
}
interface KakaoMapsNs {
  load(onReady: () => void): void;
  LatLng: new (lat: number, lng: number) => KakaoLatLng;
  LatLngBounds: new () => KakaoLatLngBounds;
  Map: new (el: HTMLElement, options: { center: KakaoLatLng; level: number }) => KakaoMap;
  CustomOverlay: new (options: {
    map: KakaoMap;
    position: KakaoLatLng;
    content: HTMLElement;
    xAnchor?: number;
    yAnchor?: number;
  }) => unknown;
}
declare global {
  interface Window {
    kakao?: { maps?: KakaoMapsNs };
  }
}

const KAKAO_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

// SDK 스크립트는 앱 수명 동안 1회만 삽입 (autoload=false → kakao.maps.load로 초기화)
let sdkPromise: Promise<KakaoMapsNs> | null = null;
function loadKakaoSdk(appKey: string): Promise<KakaoMapsNs> {
  if (window.kakao?.maps) return Promise.resolve(window.kakao.maps);
  if (!sdkPromise) {
    sdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false`;
      script.onload = () => {
        const maps = window.kakao?.maps;
        if (maps) resolve(maps);
        else reject(new Error("kakao sdk missing after load"));
      };
      script.onerror = () => {
        sdkPromise = null; // 다음 열기에서 재시도
        reject(new Error("kakao sdk load failed"));
      };
      document.head.appendChild(script);
    });
  }
  return sdkPromise;
}

// 짐캐리 보관함 데모 좌표 (placeholder 폴백 기준 %)
const ZC_POS = [
  { x: 82, y: 28 },
  { x: 26, y: 64 },
  { x: 40, y: 73 },
];

/**
 * 지도 뷰 — 카카오맵 SDK + CustomOverlay(portal) 마커 (§4.3).
 * 키 없음·SDK 로드 실패 시 placeholder 배경 + 절대좌표 마커로 폴백 (막다른 화면 금지).
 */
export default function MapOverlay({
  onClose,
  onLockerTap,
}: {
  onClose: () => void;
  onLockerTap: (lockerId: string) => void;
}) {
  const { lang, T, tr } = useLang();
  const mapRef = useRef<HTMLDivElement>(null);
  // 마커 id → CustomOverlay content 엘리먼트 (준비되면 portal로 렌더)
  const [markerEls, setMarkerEls] = useState<Record<string, HTMLElement> | null>(null);
  const [sdkFailed, setSdkFailed] = useState(!KAKAO_KEY);

  useEffect(() => {
    if (!KAKAO_KEY) return;
    let cancelled = false;
    loadKakaoSdk(KAKAO_KEY)
      .then((maps) =>
        maps.load(() => {
          const el = mapRef.current;
          if (cancelled || !el) return;
          el.replaceChildren(); // StrictMode 이중 실행 대비 멱등화
          const map = new maps.Map(el, {
            center: new maps.LatLng(35.0985, 129.025),
            level: 5,
          });
          const bounds = new maps.LatLngBounds();
          const els: Record<string, HTMLElement> = {};
          const points = [
            ...LOCKERS.map((lk) => ({ id: lk.id, lat: lk.lat ?? 0, lng: lk.lng ?? 0, fit: true })),
            // 짐캐리(해운대 포함)는 마커만 — 남포 데모 존 밖이라 bounds 미포함
            ...ZC.lockers.map((z) => ({ id: z.place, lat: z.lat, lng: z.lng, fit: false })),
          ];
          for (const pt of points) {
            const content = document.createElement("div");
            els[pt.id] = content;
            const position = new maps.LatLng(pt.lat, pt.lng);
            new maps.CustomOverlay({ map, position, content, xAnchor: 0.5, yAnchor: 1 });
            if (pt.fit) bounds.extend(position);
          }
          map.setBounds(bounds);
          setMarkerEls(els);

          // 현재 위치 — 허용 시 이동 + 위치 점, 거부·실패 시 보관소 bounds 유지
          navigator.geolocation?.getCurrentPosition(
            (pos) => {
              if (cancelled) return;
              const here = new maps.LatLng(pos.coords.latitude, pos.coords.longitude);
              const dot = document.createElement("div");
              dot.className =
                "h-3.5 w-3.5 rounded-full border-[3px] border-white bg-primary shadow-raised";
              new maps.CustomOverlay({
                map,
                position: here,
                content: dot,
                xAnchor: 0.5,
                yAnchor: 0.5,
              });
              map.panTo(here);
            },
            () => undefined,
            { timeout: 5000, maximumAge: 60000 }
          );
        })
      )
      .catch(() => {
        if (!cancelled) setSdkFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const legend = {
    locker: { ko: "지하철 보관소", ja: "地下鉄ロッカー", en: "Metro" }[lang],
    zc: { ko: "짐캐리 보관함", ja: "ジムキャリー", en: "GimCarry" }[lang],
  };

  const lockerMarker =(lk: (typeof LOCKERS)[number]) => (
    <button
      onClick={() => onLockerTap(lk.id)}
      className="flex flex-col items-center gap-[3px] active:scale-[0.94]"
    >
      <div className="flex items-center gap-1.5 rounded-lg bg-ink px-2 py-1 text-white shadow-raised">
        <LockerIcon size={13} stroke="#fff" />
        <span className="whitespace-nowrap text-caption font-bold">
          {tr(STATIONS[lk.station].name)}
        </span>
      </div>
      <div className="h-0 w-0 border-x-[6px] border-t-8 border-x-transparent border-t-ink" />
    </button>
  );

  const zcMarker = (z: (typeof ZC.lockers)[number]) => (
    <div className="flex flex-col items-center gap-[3px]">
      {/* 노란 배경엔 흰 글자 대비 부족 — ink 텍스트 */}
      <div className="flex items-center gap-1.5 rounded-lg bg-heritage px-2 py-1 text-ink shadow-raised">
        <BoxIcon size={12} />
        <span className="whitespace-nowrap text-caption font-bold">{z.place}</span>
      </div>
      <div className="h-0 w-0 border-x-[6px] border-t-8 border-x-transparent border-t-heritage" />
    </div>
  );

  return (
    <div className="absolute inset-0 z-overlay flex animate-fade-up flex-col bg-canvas">
      <div className="flex h-14 flex-none items-center gap-3 bg-canvas px-3">
        <button
          onClick={onClose}
          aria-label={T.back}
          className="flex h-11 w-11 items-center justify-center rounded-xs text-ink active:scale-[0.92]"
        >
          <BackIcon />
        </button>
        <span className="text-body-lg font-bold text-ink">{T.mapTitle}</span>
      </div>

      {/* 지도 카드 — 풀블리드 대신 여백 + 라운드 (§FE설계) */}
      <div className="min-h-0 flex-1 px-3.5 pb-[calc(14px+env(safe-area-inset-bottom))] pt-1">
        <div
          className="map-canvas relative h-full overflow-hidden rounded-lg border border-line shadow-card"
          style={{
            background:
              "repeating-linear-gradient(0deg,#EFEAE1 0 1px,transparent 1px 48px)," +
              "repeating-linear-gradient(90deg,#EFEAE1 0 1px,transparent 1px 48px),#F4EFE7",
          }}
        >
          {/* 카카오맵 캔버스 — SDK 준비 전엔 placeholder 배경이 비침 */}
          {/* z-0 — 내부 타일·오버레이 z-index를 지도 안에 가둬 범례가 항상 위 */}
          {!sdkFailed && <div ref={mapRef} className="absolute inset-0 z-0" />}

          {/* CustomOverlay 마커 — SDK 준비 후 portal 렌더 (언어 전환도 자동 반영) */}
          {markerEls &&
            LOCKERS.map(
              (lk) => markerEls[lk.id] && createPortal(lockerMarker(lk), markerEls[lk.id], lk.id)
            )}
          {markerEls &&
            ZC.lockers.map(
              (z) => markerEls[z.place] && createPortal(zcMarker(z), markerEls[z.place], z.place)
            )}

          {/* 폴백 — 절대좌표 마커 데모 (SDK 실패·키 없음) */}
          {sdkFailed && (
            <>
              {LOCKERS.map((lk) => (
                <div
                  key={lk.id}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: `${(lk.x ?? 0) * 100}%`, top: `${(lk.y ?? 0) * 100}%` }}
                >
                  {lockerMarker(lk)}
                </div>
              ))}
              {ZC.lockers.map((z, i) => (
                <div
                  key={z.place}
                  className="absolute -translate-x-1/2 -translate-y-full"
                  style={{ left: `${ZC_POS[i].x}%`, top: `${ZC_POS[i].y}%` }}
                >
                  {zcMarker(z)}
                </div>
              ))}
            </>
          )}

          {/* 핀 범례 — 지도 카드 안 상단 플로팅, 흰색 배경 */}
          {/* 320px대·긴 언어(ja)에서 한 줄 초과 시 줄바꿈 */}
          <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100%-24px)] flex-wrap gap-x-3 gap-y-1 rounded-xxs border border-line bg-white px-3 py-2 text-caption font-semibold text-sub">
            <span className="flex items-center gap-1">
              <span className="h-[13px] w-[13px] rounded border-2 border-line bg-ink" />
              {legend.locker}
            </span>
            <span className="flex items-center gap-1">
              <span className="h-[13px] w-[13px] rounded border-2 border-line bg-heritage" />
              {legend.zc}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
