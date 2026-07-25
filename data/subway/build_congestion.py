# ================== ✨ build_congestion.py ✨ ================== #
# - feature : 2025-2026 혼잡도 데이터 기반으로 해당 역의 혼잡도 데이터를 계산 및 출력 

from __future__ import annotations

import csv
import json
import re
from collections import defaultdict
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[2]
RIDERSHIP_PATH = ROOT / "data/subway/ridership_busan_2026_h1.csv"
LOCKER_PATH = ROOT / "data/subway/subway_busan.txt"
OUTPUT_JSON = ROOT / "data/subway/congestion_busan_2026_h1.json"
OUTPUT_TS = ROOT / "frontend/src/lib/subwayCongestion.ts"
SOURCE_URL = "https://www.data.go.kr/data/3057229/fileData.do"
AS_OF = "2026.01~06"

HOUR_COLUMNS = {
    hour: f"{hour:02d}시-{hour + 1:02d}시"
    for hour in range(1, 24)
}
HOUR_COLUMNS[24] = "24시-01시"
GRID_HOURS = [9, 12, 15, 18]
DAYS = ["월", "화", "수", "목", "금", "토", "일"]
WEEKEND = {"토", "일"}
NAME_ALIASES = {
    "부산": "부산역",
    "국제금융센터": "국제금융센터부산은행",
}


def normalize(value: str) -> str:
    value = re.sub(r"\([^)]*\)", "", value)
    return re.sub(r"[\s역·.()-]", "", value).lower()


def percentile(values: list[float], ratio: float) -> float:
    ordered = sorted(values)
    return ordered[round((len(ordered) - 1) * ratio)]


def grade(value: float, thresholds: tuple[float, float, float]) -> int:
    if value <= thresholds[0]:
        return 1
    if value <= thresholds[1]:
        return 2
    if value <= thresholds[2]:
        return 3
    return 4


def station_code(
    name: str,
    line: int,
    codes_by_name: dict[str, set[str]],
) -> str | None:
    source_name = NAME_ALIASES.get(name, name)
    candidates = sorted(codes_by_name.get(normalize(source_name), set()))
    if not candidates:
        return None
    same_line = [code for code in candidates if code.startswith(str(line))]
    return (same_line or candidates)[0]


def load_daily() -> tuple[
    dict[tuple[str, str, str, int], int],
    dict[str, set[str]],
]:
    daily: dict[tuple[str, str, str, int], int] = defaultdict(int)
    codes_by_name: dict[str, set[str]] = defaultdict(set)
    with RIDERSHIP_PATH.open(encoding="cp949", newline="") as file:
        reader = csv.DictReader(file)
        for row_number, row in enumerate(reader, start=1):
            code = row["역번호"].strip()
            codes_by_name[normalize(row["역명"])].add(code)
            for hour, column in HOUR_COLUMNS.items():
                daily[(code, row["년월일"], row["요일"], hour)] += int(
                    row[column] or 0
                )
            if row_number % 5_000 == 0:
                print(f"│ 원천 집계 {row_number:>6,}/40,544행")
    return daily, codes_by_name


def averages(
    daily: dict[tuple[str, str, str, int], int],
) -> tuple[
    dict[tuple[str, str, int], float],
    dict[tuple[str, str, int], float],
]:
    day_sum: dict[tuple[str, str, int], int] = defaultdict(int)
    day_count: dict[tuple[str, str, int], int] = defaultdict(int)
    type_sum: dict[tuple[str, str, int], int] = defaultdict(int)
    type_count: dict[tuple[str, str, int], int] = defaultdict(int)
    for (code, _, day, hour), count in daily.items():
        day_key = (code, day, hour)
        day_sum[day_key] += count
        day_count[day_key] += 1
        day_type = "주말" if day in WEEKEND else "평일"
        type_key = (code, day_type, hour)
        type_sum[type_key] += count
        type_count[type_key] += 1
    day_average = {
        key: total / day_count[key]
        for key, total in day_sum.items()
    }
    type_average = {
        key: total / type_count[key]
        for key, total in type_sum.items()
    }
    return day_average, type_average


def localized_peak(day_type: str, hour: int) -> dict[str, str]:
    next_hour = (hour + 1) % 24
    return {
        "ko": f"{day_type} {hour:02d}~{next_hour:02d}시",
        "ja": f"{'週末' if day_type == '주말' else '平日'} {hour:02d}〜{next_hour:02d}時",
        "en": f"{'weekends' if day_type == '주말' else 'weekdays'} {hour:02d}–{next_hour:02d}",
    }


def build() -> list[dict[str, Any]]:
    print("┌─ 부산 역사 혼잡 상대등급 생성 ───────────────────")
    daily, codes_by_name = load_daily()
    print(f"│ 일·역·시간 집계: {len(daily):,}개")
    day_average, type_average = averages(daily)
    lockers = json.loads(LOCKER_PATH.read_text(encoding="utf-8"))["data"]

    matched: list[tuple[dict[str, Any], str]] = []
    failures = []
    for locker in lockers:
        code = station_code(locker["역명"], locker["호선"], codes_by_name)
        if code:
            matched.append((locker, code))
        else:
            failures.append(f'{locker["역명"]}({locker["호선"]}호선)')
    if failures:
        raise RuntimeError(f"승하차 원천과 매칭 실패: {', '.join(failures)}")

    peaks = []
    for _, code in matched:
        values = [
            value
            for (candidate, _, _), value in type_average.items()
            if candidate == code
        ]
        peaks.append(max(values))
    peak_thresholds = (
        percentile(peaks, 0.25),
        percentile(peaks, 0.50),
        percentile(peaks, 0.75),
    )

    grid_values = [
        value
        for (code, _, hour), value in day_average.items()
        if code in {matched_code for _, matched_code in matched}
        and hour in GRID_HOURS
    ]
    grid_thresholds = (
        percentile(grid_values, 0.25),
        percentile(grid_values, 0.50),
        percentile(grid_values, 0.75),
    )

    output = []
    for index, (locker, code) in enumerate(matched, start=1):
        peak_key, peak_value = max(
            (
                (key, value)
                for key, value in type_average.items()
                if key[0] == code
            ),
            key=lambda item: item[1],
        )
        _, day_type, peak_hour = peak_key
        grid = [
            [
                grade(day_average.get((code, day, hour), 0), grid_thresholds)
                for hour in GRID_HOURS
            ]
            for day in DAYS
        ]
        item = {
            "lockerId": f'subway-locker-{locker["연번"]:02d}',
            "stationNumber": code,
            "station": locker["역명"],
            "line": locker["호선"],
            "grade": grade(peak_value, peak_thresholds),
            "peak": localized_peak(day_type, peak_hour),
            "sample": {
                "ko": f"{AS_OF} 시간대별 승하차 기반 · 역간 상대 등급",
                "ja": f"{AS_OF} 時間帯別乗降データ · 駅間相対等級",
                "en": f"{AS_OF} hourly entries/exits · relative station grade",
            },
            "grid": grid,
            "hours": GRID_HOURS,
            "peakAverage": round(peak_value, 1),
            "asOf": AS_OF,
            "sourceUrl": SOURCE_URL,
        }
        output.append(item)
        filled = round(index / len(matched) * 20)
        bar = "█" * filled + "░" * (20 - filled)
        print(
            f'│ [{bar}] {index:02d}/{len(matched)} '
            f'{locker["역명"]:<10} {locker["호선"]}호선 '
            f'등급 {item["grade"]} · {item["peak"]["ko"]}'
        )
    return output


def write_outputs(items: list[dict[str, Any]]) -> None:
    payload = {
        "metadata": {
            "source": "부산교통공사 시간대별 승하차인원",
            "sourceUrl": SOURCE_URL,
            "period": AS_OF,
            "method": "승하차 합산 일평균, 전체 역사 사분위수 기반 상대 4등급",
            "realtime": False,
        },
        "data": items,
    }
    OUTPUT_JSON.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    data = json.dumps(items, ensure_ascii=False, indent=2)
    OUTPUT_TS.write_text(
        f'''/**
 * 자동 생성 파일 — 직접 수정하지 않는다.
 * 원천: 부산교통공사 시간대별 승하차인원 ({AS_OF})
 * 등급: 전체 역사 승하차량 사분위수 기반 상대 등급. 실시간·열차 혼잡률 아님.
 */

export interface SubwayCongestion {{
  lockerId: string;
  stationNumber: string;
  station: string;
  line: number;
  grade: 1 | 2 | 3 | 4;
  peak: {{ ko: string; ja: string; en: string }};
  sample: {{ ko: string; ja: string; en: string }};
  grid: number[][];
  hours: number[];
  peakAverage: number;
  asOf: string;
  sourceUrl: string;
}}

export const SUBWAY_CONGESTION: SubwayCongestion[] = {data};

export function findSubwayCongestion(lockerId: string): SubwayCongestion | null {{
  return SUBWAY_CONGESTION.find((item) => item.lockerId === lockerId) ?? null;
}}
''',
        encoding="utf-8",
    )
    print(f"│ 파생 JSON: {OUTPUT_JSON}")
    print(f"│ FE 생성:   {OUTPUT_TS}")
    print(f"└─ 완료: {len(items)}/{len(items)}개 보관함 역사")


if __name__ == "__main__":
    write_outputs(build())
