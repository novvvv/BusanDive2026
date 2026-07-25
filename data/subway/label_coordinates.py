# ================== ✨ label_coordinates ✨ ================== #



from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
SOURCE_PATH = ROOT / "data/subway/subway_busan.txt"
CACHE_PATH = ROOT / "data/subway/osm_station_coordinates.json"
FRONTEND_PATH = ROOT / "frontend/src/lib/subwayLockers.ts"
OVERPASS_URL = "https://overpass-api.de/api/interpreter"
USER_AGENT = "BusanDive2026/0.1 (station coordinate labeling)"
SOURCE_LABEL = "OpenStreetMap contributors (Overpass API)"
RETRIEVED_AT = "2026-07-25"

BUSAN_QUERY = """
[out:json][timeout:120];
area["name"="부산광역시"]["boundary"="administrative"]->.busan;
(
  node["railway"="station"](area.busan);
  way["railway"="station"](area.busan);
  node["railway"="halt"](area.busan);
  node["public_transport"="station"]["subway"="yes"](area.busan);
);
out center tags;
"""

YANGSAN_QUERY = """
[out:json][timeout:60];
(
  node["railway"="station"]["name"~"^(남양산|양산)$"](35.20,128.90,35.40,129.15);
  way["railway"="station"]["name"~"^(남양산|양산)$"](35.20,128.90,35.40,129.15);
);
out center tags;
"""

LINE_REFS: dict[tuple[str, int], str] = {
    ("부산", 1): "113",
    ("부전", 1): "120",
    ("서면", 1): "119",
    ("서면", 2): "219",
    ("연산", 1): "123",
    ("연산", 3): "305",
    ("동래", 1): "125",
    ("동래", 4): "402",
    ("사상", 2): "227",
    ("화명", 2): "235",
    ("거제", 3): "306",
    ("구포", 3): "314",
    ("대저", 3): "317",
}

NAME_ALIASES = {
    "국제금융센터": "국제금융센터부산은행",
}


def fetch_overpass(query: str) -> list[dict[str, Any]]:
    data = urllib.parse.urlencode({"data": query}).encode()
    request = urllib.request.Request(
        OVERPASS_URL,
        data=data,
        headers={"User-Agent": USER_AGENT},
    )
    with urllib.request.urlopen(request, timeout=180) as response:
        return json.loads(response.read().decode())["elements"]


def normalize(value: str | None) -> str:
    if not value:
        return ""
    value = re.sub(r"\([^)]*\)", "", value)
    return re.sub(r"[\s역·.]", "", value)


def station_candidates(elements: list[dict[str, Any]]) -> list[dict[str, Any]]:
    candidates = []
    for element in elements:
        tags = element.get("tags", {})
        center = element.get("center", element)
        if center.get("lat") is None or center.get("lon") is None:
            continue
        candidates.append(
            {
                "name": tags.get("name"),
                "ref": tags.get("ref", ""),
                "operator": tags.get("operator", ""),
                "lat": float(center["lat"]),
                "lng": float(center["lon"]),
            }
        )
    return candidates


def choose_station(
    name: str,
    line: int,
    candidates: list[dict[str, Any]],
) -> dict[str, Any] | None:
    target = NAME_ALIASES.get(name, normalize(name))
    matches = [item for item in candidates if normalize(item["name"]) == target]
    expected_ref = LINE_REFS.get((name, line))
    if expected_ref:
        ref_match = [
            item
            for item in matches
            if expected_ref in re.split(r"[;\s]+", item["ref"])
        ]
        if ref_match:
            return ref_match[0]
    operator_match = [item for item in matches if item["operator"] == "부산교통공사"]
    return (operator_match or matches or [None])[0]


def station_id(sequence: int) -> str:
    return f"subway-locker-{sequence:02d}"


def generate_frontend(rows: list[dict[str, Any]]) -> None:
    payload = [
        {
            "id": station_id(row["연번"]),
            "name": row["역명"],
            "line": row["호선"],
            "loc": row["상세위치"],
            "s": row["소형(개수)"],
            "m": row["중형(개수)"],
            "l": row["대형(개수)"],
            "xl": row["특대형(개수)"],
            "lat": row["위도"],
            "lng": row["경도"],
        }
        for row in rows
    ]
    serialized = json.dumps(payload, ensure_ascii=False, indent=2)
    content = f'''/**
 * 자동 생성 파일 — 직접 수정하지 않는다.
 * 원천: data/subway/subway_busan.txt
 * 좌표: {SOURCE_LABEL}, 조회일 {RETRIEVED_AT}
 */

export interface SubwayLockerLocation {{
  id: string;
  name: string;
  line: number;
  loc: string;
  s: number;
  m: number;
  l: number;
  xl: number;
  lat: number;
  lng: number;
}}

export interface RecommendedSubwayLocker extends SubwayLockerLocation {{
  distanceM: number | null;
}}

export interface Coordinates {{
  lat: number;
  lng: number;
}}

export const SUBWAY_LOCKER_LOCATIONS: SubwayLockerLocation[] = {serialized};

const PLACE_STATION_ALIASES: Record<string, string> = {{
  감천문화마을: "남포",
  biff광장: "남포",
  국제시장: "남포",
  용두산공원: "남포",
  광안리: "광안",
  해운대해수욕장: "해운대",
  해운대: "해운대",
  벡스코: "벡스코",
  센텀시티: "센텀시티",
  서면: "서면",
  부산역: "부산",
}};

function normalizePlace(value: string): string {{
  return value.toLowerCase().replace(/[\\s·.-]/g, "");
}}

function distanceMeters(from: Coordinates, to: Coordinates): number {{
  const radius = 6_371_000;
  const latitudeDelta = ((to.lat - from.lat) * Math.PI) / 180;
  const longitudeDelta = ((to.lng - from.lng) * Math.PI) / 180;
  const fromLatitude = (from.lat * Math.PI) / 180;
  const toLatitude = (to.lat * Math.PI) / 180;
  const value =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(fromLatitude) *
      Math.cos(toLatitude) *
      Math.sin(longitudeDelta / 2) ** 2;
  return Math.round(radius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value)));
}}

function resolveStation(place: string): SubwayLockerLocation | null {{
  const normalized = normalizePlace(place);
  const alias = Object.entries(PLACE_STATION_ALIASES).find(([key]) =>
    normalized.includes(normalizePlace(key)),
  )?.[1];
  const stationName = alias
    ? alias
    : [...SUBWAY_LOCKER_LOCATIONS]
        .sort((a, b) => b.name.length - a.name.length)
        .find((station) => {{
          const name = normalizePlace(station.name);
          return normalized === name || normalized.includes(`${{name}}역`);
        }})?.name;
  return (
    SUBWAY_LOCKER_LOCATIONS.find((station) => station.name === stationName) ?? null
  );
}}

export function recommendSubwayLockers(
  place: string,
  limit = 3,
): {{
  isResolved: boolean;
  basisStation: string | null;
  lockers: RecommendedSubwayLocker[];
}} {{
  const target = resolveStation(place);
  const available = SUBWAY_LOCKER_LOCATIONS.filter((locker) => locker.xl > 0);
  if (!target) {{
    return {{
      isResolved: false,
      basisStation: null,
      lockers: available
        .sort((a, b) => b.xl - a.xl)
        .slice(0, limit)
        .map((locker) => ({{ ...locker, distanceM: null }})),
    }};
  }}
  return {{
    isResolved: true,
    basisStation: target.name,
    lockers: recommendSubwayLockersNear(target, limit),
  }};
}}

export function recommendSubwayLockersNear(
  coordinates: Coordinates,
  limit = 3,
): RecommendedSubwayLocker[] {{
  return SUBWAY_LOCKER_LOCATIONS
    .filter((locker) => locker.xl > 0)
    .map((locker) => ({{
      ...locker,
      distanceM: distanceMeters(coordinates, locker),
    }}))
    .sort((a, b) => (a.distanceM ?? Infinity) - (b.distanceM ?? Infinity))
    .slice(0, limit);
}}
'''
    FRONTEND_PATH.write_text(content, encoding="utf-8")


def main() -> None:
    source = json.loads(SOURCE_PATH.read_text(encoding="utf-8"))
    rows = source["data"]
    print("┌─ 부산 보관함 좌표 라벨링 ─────────────────────────")
    print(f"│ 대상 {len(rows)}개 · 출처 {SOURCE_LABEL}")
    try:
        elements = fetch_overpass(BUSAN_QUERY) + fetch_overpass(YANGSAN_QUERY)
        print(f"│ 지도 원천 수신: {len(elements)}개 후보")
        candidates = station_candidates(elements)
        CACHE_PATH.write_text(
            json.dumps(
                {
                    "source": SOURCE_LABEL,
                    "retrievedAt": RETRIEVED_AT,
                    "stations": candidates,
                },
                ensure_ascii=False,
                indent=2,
            )
            + "\n",
            encoding="utf-8",
        )
    except Exception as error:
        print(f"│ ERROR 지도 조회 실패: {error}")
        cached = json.loads(CACHE_PATH.read_text(encoding="utf-8"))
        candidates = cached["stations"]
        print(f"│ FALLBACK OSM 캐시 사용: {len(candidates)}개 후보")
    failures = []
    for index, row in enumerate(rows, start=1):
        match = choose_station(row["역명"], row["호선"], candidates)
        if match:
            row["위도"] = match["lat"]
            row["경도"] = match["lng"]
            row["좌표출처"] = SOURCE_LABEL
            status = "OK"
        elif row.get("위도") is not None and row.get("경도") is not None:
            status = "CACHE"
        else:
            failures.append(f'{row["역명"]}({row["호선"]}호선)')
            status = "ERROR"
        filled = round(index / len(rows) * 20)
        bar = "█" * filled + "░" * (20 - filled)
        coordinates = (
            f'{row["위도"]:.7f}, {row["경도"]:.7f}'
            if row.get("위도") is not None
            else "좌표 없음"
        )
        print(
            f"│ [{bar}] {index:02d}/{len(rows)} {status:5} "
            f'{row["역명"]:<10} {coordinates}'
        )
    if failures:
        raise RuntimeError(f"좌표 미확보: {', '.join(failures)}")
    source["coordinateMetadata"] = {
        "source": SOURCE_LABEL,
        "license": "ODbL",
        "retrievedAt": RETRIEVED_AT,
        "method": "역명·호선·역번호(ref) 매칭",
    }
    SOURCE_PATH.write_text(
        json.dumps(source, ensure_ascii=False, indent=4) + "\n",
        encoding="utf-8",
    )
    generate_frontend(rows)
    print(f"│ JSON 저장: {SOURCE_PATH}")
    print(f"│ FE 생성:   {FRONTEND_PATH}")
    print("└─ 완료: 71/71 좌표 라벨링")


if __name__ == "__main__":
    main()
