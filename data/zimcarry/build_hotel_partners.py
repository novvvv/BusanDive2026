#!/usr/bin/env python3
"""짐캐리 등록 숙소 JSON을 프론트엔드 조회 모듈로 변환한다."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
SOURCE = ROOT / "data/zimcarry/zimcarry_hotels.json"
OUTPUT = ROOT / "frontend/src/lib/zimcarryHotels.ts"


def main() -> None:
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    hotels = [
        {
            "name": hotel["name"],
            "address": hotel["address"],
            "zipCode": hotel["zip_code"],
            "lat": float(hotel["latitude"]),
            "lng": float(hotel["longitude"]),
        }
        for hotel in source["hotels"]
    ]
    payload = json.dumps(hotels, ensure_ascii=False, indent=2)
    output = f"""/**
 * 자동 생성 파일 — 직접 수정하지 않는다.
 * 원천: data/zimcarry/zimcarry_hotels.json
 */

export interface ZimcarryHotel {{
  name: string;
  address: string;
  zipCode: string;
  lat: number;
  lng: number;
}}

export const ZIMCARRY_HOTELS: ZimcarryHotel[] = {payload};

function normalizeHotelName(value: string): string {{
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[^0-9a-z가-힣]/g, "");
}}

export function findZimcarryHotel(value: string): ZimcarryHotel | null {{
  const query = normalizeHotelName(value);
  if (query.length < 2) return null;

  const exact = ZIMCARRY_HOTELS.find(
    (hotel) => normalizeHotelName(hotel.name) === query,
  );
  if (exact) return exact;

  const candidates = ZIMCARRY_HOTELS
    .map((hotel) => ({{ hotel, name: normalizeHotelName(hotel.name) }}))
    .filter((candidate) => candidate.name.includes(query));

  return candidates.length === 1 ? candidates[0].hotel : null;
}}
"""
    OUTPUT.write_text(output, encoding="utf-8")
    print(f"[완료] {len(hotels)}개 숙소 → {OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
