/**
 * 자동 생성 파일 — 직접 수정하지 않는다.
 * 원천: data/subway/subway_busan.txt
 * 좌표: OpenStreetMap contributors (Overpass API), 조회일 2026-07-25
 */

export interface SubwayLockerLocation {
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
}

export interface RecommendedSubwayLocker extends SubwayLockerLocation {
  distanceM: number | null;
}

export const SUBWAY_LOCKER_LOCATIONS: SubwayLockerLocation[] = [
  {
    "id": "subway-locker-01",
    "name": "다대포해수욕장",
    "line": 1,
    "loc": "(B1) 대합실 고객센터 근처",
    "s": 3,
    "m": 8,
    "l": 0,
    "xl": 7,
    "lat": 35.0481953,
    "lng": 128.9660188
  },
  {
    "id": "subway-locker-02",
    "name": "다대포항",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 1번 엘리베이터 옆",
    "s": 6,
    "m": 4,
    "l": 0,
    "xl": 2,
    "lat": 35.0577578,
    "lng": 128.9713277
  },
  {
    "id": "subway-locker-03",
    "name": "하단",
    "line": 1,
    "loc": "(B1) 1번 엘리베이터 옆, 3번출입구 방향",
    "s": 10,
    "m": 10,
    "l": 1,
    "xl": 7,
    "lat": 35.1062348,
    "lng": 128.9667606
  },
  {
    "id": "subway-locker-04",
    "name": "괴정",
    "line": 1,
    "loc": "(B1) 3번출입구 방향",
    "s": 4,
    "m": 4,
    "l": 1,
    "xl": 2,
    "lat": 35.0999307,
    "lng": 128.992862
  },
  {
    "id": "subway-locker-05",
    "name": "토성",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 3번출입구 방향",
    "s": 6,
    "m": 6,
    "l": 0,
    "xl": 7,
    "lat": 35.1007637,
    "lng": 129.0198441
  },
  {
    "id": "subway-locker-06",
    "name": "자갈치",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 3번출입구 방향",
    "s": 11,
    "m": 28,
    "l": 2,
    "xl": 45,
    "lat": 35.0973457,
    "lng": 129.0267678
  },
  {
    "id": "subway-locker-07",
    "name": "남포",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 2, 5번출입구 방향",
    "s": 12,
    "m": 32,
    "l": 0,
    "xl": 56,
    "lat": 35.0979243,
    "lng": 129.0349473
  },
  {
    "id": "subway-locker-08",
    "name": "중앙",
    "line": 1,
    "loc": "(B1) 14번출입구 방향",
    "s": 6,
    "m": 6,
    "l": 0,
    "xl": 9,
    "lat": 35.1038431,
    "lng": 129.0363271
  },
  {
    "id": "subway-locker-09",
    "name": "부산",
    "line": 1,
    "loc": "(B1) 3번, 4번, 6번 출입구 방향",
    "s": 10,
    "m": 40,
    "l": 7,
    "xl": 78,
    "lat": 35.1157262,
    "lng": 129.0399028
  },
  {
    "id": "subway-locker-10",
    "name": "초량",
    "line": 1,
    "loc": "(B1) 8번출입구 방향",
    "s": 6,
    "m": 2,
    "l": 0,
    "xl": 7,
    "lat": 35.1212017,
    "lng": 129.0429702
  },
  {
    "id": "subway-locker-11",
    "name": "부산진",
    "line": 1,
    "loc": "(B1) 2번 엘리베이터 옆, 6번출입구 방향",
    "s": 6,
    "m": 2,
    "l": 0,
    "xl": 3,
    "lat": 35.1290282,
    "lng": 129.0492214
  },
  {
    "id": "subway-locker-12",
    "name": "범일",
    "line": 1,
    "loc": "(B1) 대합실 고객센터 근처, 3번출입구 방향",
    "s": 4,
    "m": 9,
    "l": 0,
    "xl": 8,
    "lat": 35.140947,
    "lng": 129.059365
  },
  {
    "id": "subway-locker-13",
    "name": "범내골",
    "line": 1,
    "loc": "(B1) 대합실 고객센터 근처, 8번출입구 방향",
    "s": 3,
    "m": 4,
    "l": 0,
    "xl": 9,
    "lat": 35.1474005,
    "lng": 129.0592024
  },
  {
    "id": "subway-locker-14",
    "name": "서면",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 2호선 환승계단, 13번 출구 인근",
    "s": 22,
    "m": 48,
    "l": 13,
    "xl": 62,
    "lat": 35.1577739,
    "lng": 129.0592588
  },
  {
    "id": "subway-locker-15",
    "name": "부전",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 만남의 장소 인근",
    "s": 6,
    "m": 8,
    "l": 0,
    "xl": 10,
    "lat": 35.1626001,
    "lng": 129.0629411
  },
  {
    "id": "subway-locker-16",
    "name": "양정",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 화장실 옆",
    "s": 7,
    "m": 4,
    "l": 1,
    "xl": 3,
    "lat": 35.1731584,
    "lng": 129.0713
  },
  {
    "id": "subway-locker-17",
    "name": "시청",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, 1번 엘리베이터 옆",
    "s": 6,
    "m": 4,
    "l": 0,
    "xl": 4,
    "lat": 35.1797508,
    "lng": 129.076521
  },
  {
    "id": "subway-locker-18",
    "name": "연산",
    "line": 1,
    "loc": "(B1) 표내는 곳 인근, (B1) 12번출입구 방향",
    "s": 6,
    "m": 10,
    "l": 0,
    "xl": 7,
    "lat": 35.1861551,
    "lng": 129.0815093
  },
  {
    "id": "subway-locker-19",
    "name": "동래",
    "line": 1,
    "loc": "(1F)  1번 출입구 방향",
    "s": 6,
    "m": 12,
    "l": 0,
    "xl": 6,
    "lat": 35.2056761,
    "lng": 129.0784845
  },
  {
    "id": "subway-locker-20",
    "name": "명륜",
    "line": 1,
    "loc": "(1F)  2번 출입구 방향",
    "s": 3,
    "m": 4,
    "l": 0,
    "xl": 3,
    "lat": 35.2126465,
    "lng": 129.0797207
  },
  {
    "id": "subway-locker-21",
    "name": "온천장",
    "line": 1,
    "loc": "(1F)  3번 출입구 방향",
    "s": 3,
    "m": 6,
    "l": 0,
    "xl": 6,
    "lat": 35.2202436,
    "lng": 129.0864268
  },
  {
    "id": "subway-locker-22",
    "name": "부산대",
    "line": 1,
    "loc": "(1F)  4번 출입구 방향",
    "s": 12,
    "m": 22,
    "l": 0,
    "xl": 11,
    "lat": 35.2296377,
    "lng": 129.0893608
  },
  {
    "id": "subway-locker-23",
    "name": "장전",
    "line": 1,
    "loc": "(1F)  4번 출입구 방향",
    "s": 7,
    "m": 4,
    "l": 0,
    "xl": 3,
    "lat": 35.2382122,
    "lng": 129.0880983
  },
  {
    "id": "subway-locker-24",
    "name": "노포",
    "line": 1,
    "loc": "(1F)  대합실 고객센터 근처",
    "s": 10,
    "m": 6,
    "l": 0,
    "xl": 3,
    "lat": 35.2839721,
    "lng": 129.0951147
  },
  {
    "id": "subway-locker-25",
    "name": "장산",
    "line": 2,
    "loc": "(B1) 표 내는 곳 앞쪽",
    "s": 20,
    "m": 0,
    "l": 8,
    "xl": 4,
    "lat": 35.1694748,
    "lng": 129.175858
  },
  {
    "id": "subway-locker-26",
    "name": "중동",
    "line": 2,
    "loc": "(B1) 화장실 근처",
    "s": 15,
    "m": 0,
    "l": 6,
    "xl": 3,
    "lat": 35.1666759,
    "lng": 129.1678074
  },
  {
    "id": "subway-locker-27",
    "name": "해운대",
    "line": 2,
    "loc": "(B1) 7번 출입구 방향",
    "s": 85,
    "m": 0,
    "l": 40,
    "xl": 29,
    "lat": 35.1637531,
    "lng": 129.1587469
  },
  {
    "id": "subway-locker-28",
    "name": "동백",
    "line": 2,
    "loc": "(B1) 1번 출입구 방향",
    "s": 16,
    "m": 0,
    "l": 4,
    "xl": 4,
    "lat": 35.161277,
    "lng": 129.1480904
  },
  {
    "id": "subway-locker-29",
    "name": "벡스코",
    "line": 2,
    "loc": "(B1) 5번 출입구 방향",
    "s": 18,
    "m": 0,
    "l": 12,
    "xl": 2,
    "lat": 35.1688889,
    "lng": 129.1387511
  },
  {
    "id": "subway-locker-30",
    "name": "센텀시티",
    "line": 2,
    "loc": "(B1) GS편의점 근처",
    "s": 70,
    "m": 0,
    "l": 28,
    "xl": 14,
    "lat": 35.1685922,
    "lng": 129.1312167
  },
  {
    "id": "subway-locker-31",
    "name": "수영",
    "line": 2,
    "loc": "(B1) 11번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.1654141,
    "lng": 129.114705
  },
  {
    "id": "subway-locker-32",
    "name": "광안",
    "line": 2,
    "loc": "(B1) 5번 출입구 방향",
    "s": 50,
    "m": 0,
    "l": 20,
    "xl": 10,
    "lat": 35.157916,
    "lng": 129.11317
  },
  {
    "id": "subway-locker-33",
    "name": "금련산",
    "line": 2,
    "loc": "(B2) 1번 출입구 방향",
    "s": 30,
    "m": 0,
    "l": 18,
    "xl": 4,
    "lat": 35.149756,
    "lng": 129.11097
  },
  {
    "id": "subway-locker-34",
    "name": "남천",
    "line": 2,
    "loc": "(B1) 2번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.1421344,
    "lng": 129.1078416
  },
  {
    "id": "subway-locker-35",
    "name": "경성대부경대",
    "line": 2,
    "loc": "(B1) 고객센터 맞은편",
    "s": 20,
    "m": 0,
    "l": 8,
    "xl": 4,
    "lat": 35.137558,
    "lng": 129.100531
  },
  {
    "id": "subway-locker-36",
    "name": "대연",
    "line": 2,
    "loc": "(B1) 1번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.135148,
    "lng": 129.092172
  },
  {
    "id": "subway-locker-37",
    "name": "못골",
    "line": 2,
    "loc": "(B1) 1번 출입구 방향",
    "s": 2,
    "m": 0,
    "l": 2,
    "xl": 6,
    "lat": 35.134758,
    "lng": 129.084783
  },
  {
    "id": "subway-locker-38",
    "name": "국제금융센터",
    "line": 2,
    "loc": "(B1) 1번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.1457278,
    "lng": 129.0667134
  },
  {
    "id": "subway-locker-39",
    "name": "전포",
    "line": 2,
    "loc": "(B1) 현금지급기 옆",
    "s": 32,
    "m": 0,
    "l": 26,
    "xl": 14,
    "lat": 35.1528193,
    "lng": 129.0653641
  },
  {
    "id": "subway-locker-40",
    "name": "서면",
    "line": 2,
    "loc": "(B1) 서면롯데백화점 출입구 방향",
    "s": 58,
    "m": 0,
    "l": 22,
    "xl": 30,
    "lat": 35.1577739,
    "lng": 129.0592588
  },
  {
    "id": "subway-locker-41",
    "name": "동의대",
    "line": 2,
    "loc": "(B1) 1번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.1539803,
    "lng": 129.0321386
  },
  {
    "id": "subway-locker-42",
    "name": "개금",
    "line": 2,
    "loc": "(B1) 1,3번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.1532536,
    "lng": 129.0204602
  },
  {
    "id": "subway-locker-43",
    "name": "냉정",
    "line": 2,
    "loc": "(B1) 1번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.1512851,
    "lng": 129.0124257
  },
  {
    "id": "subway-locker-44",
    "name": "주례",
    "line": 2,
    "loc": "(B1) 1,3번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.150504,
    "lng": 129.00315
  },
  {
    "id": "subway-locker-45",
    "name": "사상",
    "line": 2,
    "loc": "(B1) 5번 출입구 방향",
    "s": 36,
    "m": 0,
    "l": 12,
    "xl": 8,
    "lat": 35.1624697,
    "lng": 128.9845867
  },
  {
    "id": "subway-locker-46",
    "name": "모라",
    "line": 2,
    "loc": "(B1) 1번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.1892988,
    "lng": 128.9884422
  },
  {
    "id": "subway-locker-47",
    "name": "덕천",
    "line": 2,
    "loc": "(B1) GS편의점 맞은편",
    "s": 8,
    "m": 0,
    "l": 2,
    "xl": 2,
    "lat": 35.2100369,
    "lng": 129.005332
  },
  {
    "id": "subway-locker-48",
    "name": "화명",
    "line": 2,
    "loc": "(B1) 3번 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 2,
    "xl": 1,
    "lat": 35.2352534,
    "lng": 129.0138007
  },
  {
    "id": "subway-locker-49",
    "name": "남양산",
    "line": 2,
    "loc": "(2F)  3번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.325404,
    "lng": 129.0193639
  },
  {
    "id": "subway-locker-50",
    "name": "양산",
    "line": 2,
    "loc": "(2F)  고객센터 근처",
    "s": 10,
    "m": 0,
    "l": 4,
    "xl": 2,
    "lat": 35.3387432,
    "lng": 129.026402
  },
  {
    "id": "subway-locker-51",
    "name": "수영",
    "line": 3,
    "loc": "(B1) 8번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 6,
    "xl": 4,
    "lat": 35.1654141,
    "lng": 129.114705
  },
  {
    "id": "subway-locker-52",
    "name": "망미",
    "line": 3,
    "loc": "(B1) 고객센터 맞은편",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 2,
    "lat": 35.1717526,
    "lng": 129.1075228
  },
  {
    "id": "subway-locker-53",
    "name": "배산",
    "line": 3,
    "loc": "(B1) 3번 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 6,
    "xl": 2,
    "lat": 35.173473,
    "lng": 129.095751
  },
  {
    "id": "subway-locker-54",
    "name": "연산",
    "line": 3,
    "loc": "(B1) 3번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 6,
    "xl": 4,
    "lat": 35.1858545,
    "lng": 129.0817729
  },
  {
    "id": "subway-locker-55",
    "name": "거제",
    "line": 3,
    "loc": "(B1) 고객센터 근처",
    "s": 5,
    "m": 0,
    "l": 6,
    "xl": 2,
    "lat": 35.1888685,
    "lng": 129.0739899
  },
  {
    "id": "subway-locker-56",
    "name": "종합운동장",
    "line": 3,
    "loc": "(B1) 4번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 6,
    "xl": 4,
    "lat": 35.1908882,
    "lng": 129.0675707
  },
  {
    "id": "subway-locker-57",
    "name": "사직",
    "line": 3,
    "loc": "(B1) 1번 출입구 방향",
    "s": 20,
    "m": 0,
    "l": 12,
    "xl": 6,
    "lat": 35.1990904,
    "lng": 129.0650666
  },
  {
    "id": "subway-locker-58",
    "name": "미남",
    "line": 3,
    "loc": "(B1) 고객센터 맞은편",
    "s": 10,
    "m": 0,
    "l": 3,
    "xl": 2,
    "lat": 35.206533,
    "lng": 129.0687474
  },
  {
    "id": "subway-locker-59",
    "name": "만덕",
    "line": 3,
    "loc": "(B1) 화장실 근처",
    "s": 5,
    "m": 0,
    "l": 6,
    "xl": 2,
    "lat": 35.2129876,
    "lng": 129.0364611
  },
  {
    "id": "subway-locker-60",
    "name": "남산정",
    "line": 3,
    "loc": "(B1) 고객센터 맞은편",
    "s": 10,
    "m": 0,
    "l": 6,
    "xl": 0,
    "lat": 35.2133254,
    "lng": 129.023926
  },
  {
    "id": "subway-locker-61",
    "name": "숙등",
    "line": 3,
    "loc": "(B1) 고객센터 맞은편",
    "s": 10,
    "m": 0,
    "l": 6,
    "xl": 0,
    "lat": 35.2119767,
    "lng": 129.0127544
  },
  {
    "id": "subway-locker-62",
    "name": "덕천",
    "line": 3,
    "loc": "(B1) 8번 출입구 방향",
    "s": 30,
    "m": 0,
    "l": 6,
    "xl": 4,
    "lat": 35.2100369,
    "lng": 129.005332
  },
  {
    "id": "subway-locker-63",
    "name": "구포",
    "line": 3,
    "loc": "(B2) 1번 출입구 방향",
    "s": 10,
    "m": 0,
    "l": 3,
    "xl": 2,
    "lat": 35.2066938,
    "lng": 128.996352
  },
  {
    "id": "subway-locker-64",
    "name": "강서구청",
    "line": 3,
    "loc": "(B2) 에스컬레이터 방향",
    "s": 10,
    "m": 0,
    "l": 3,
    "xl": 4,
    "lat": 35.2112257,
    "lng": 128.9819529
  },
  {
    "id": "subway-locker-65",
    "name": "대저",
    "line": 3,
    "loc": "(B1) E/L 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 0,
    "lat": 35.2133357,
    "lng": 128.9610874
  },
  {
    "id": "subway-locker-66",
    "name": "동래",
    "line": 4,
    "loc": "(B1) 6번 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 0,
    "lat": 35.2046511,
    "lng": 129.0773598
  },
  {
    "id": "subway-locker-67",
    "name": "수안",
    "line": 4,
    "loc": "(B1) 고객센터 근처",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 0,
    "lat": 35.201804,
    "lng": 129.0839158
  },
  {
    "id": "subway-locker-68",
    "name": "충렬사",
    "line": 4,
    "loc": "(B1) 1번 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 0,
    "lat": 35.1997162,
    "lng": 129.0976523
  },
  {
    "id": "subway-locker-69",
    "name": "영산대",
    "line": 4,
    "loc": "(B2) 2번 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 0,
    "lat": 35.2256219,
    "lng": 129.1461159
  },
  {
    "id": "subway-locker-70",
    "name": "윗반송",
    "line": 4,
    "loc": "(1F)  2번 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 0,
    "lat": 35.2324696,
    "lng": 129.1538725
  },
  {
    "id": "subway-locker-71",
    "name": "안평",
    "line": 4,
    "loc": "(1F)  2번 출입구 방향",
    "s": 5,
    "m": 0,
    "l": 3,
    "xl": 0,
    "lat": 35.2374174,
    "lng": 129.1717248
  }
];

const PLACE_STATION_ALIASES: Record<string, string> = {
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
};

function normalizePlace(value: string): string {
  return value.toLowerCase().replace(/[\s·.-]/g, "");
}

function distanceMeters(
  from: { lat: number; lng: number },
  to: { lat: number; lng: number },
): number {
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
}

function resolveStation(place: string): SubwayLockerLocation | null {
  const normalized = normalizePlace(place);
  const alias = Object.entries(PLACE_STATION_ALIASES).find(([key]) =>
    normalized.includes(normalizePlace(key)),
  )?.[1];
  const stationName = alias
    ? alias
    : [...SUBWAY_LOCKER_LOCATIONS]
        .sort((a, b) => b.name.length - a.name.length)
        .find((station) => {
          const name = normalizePlace(station.name);
          return normalized === name || normalized.includes(`${name}역`);
        })?.name;
  return (
    SUBWAY_LOCKER_LOCATIONS.find((station) => station.name === stationName) ?? null
  );
}

export function recommendSubwayLockers(
  place: string,
  limit = 3,
): {
  isResolved: boolean;
  basisStation: string | null;
  lockers: RecommendedSubwayLocker[];
} {
  const target = resolveStation(place);
  const available = SUBWAY_LOCKER_LOCATIONS.filter((locker) => locker.xl > 0);
  if (!target) {
    return {
      isResolved: false,
      basisStation: null,
      lockers: available
        .sort((a, b) => b.xl - a.xl)
        .slice(0, limit)
        .map((locker) => ({ ...locker, distanceM: null })),
    };
  }
  return {
    isResolved: true,
    basisStation: target.name,
    lockers: available
      .map((locker) => ({
        ...locker,
        distanceM: distanceMeters(target, locker),
      }))
      .sort((a, b) => (a.distanceM ?? Infinity) - (b.distanceM ?? Infinity))
      .slice(0, limit),
  };
}
