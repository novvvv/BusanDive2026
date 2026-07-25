/**
 * 자동 생성 파일 — 직접 수정하지 않는다.
 * 원천: 부산교통공사 시간대별 승하차인원 (2026.01~06)
 * 등급: 전체 역사 승하차량 사분위수 기반 상대 등급. 실시간·열차 혼잡률 아님.
 */

export interface SubwayCongestion {
  lockerId: string;
  stationNumber: string;
  station: string;
  line: number;
  grade: 1 | 2 | 3 | 4;
  peak: { ko: string; ja: string; en: string };
  sample: { ko: string; ja: string; en: string };
  grid: number[][];
  hours: number[];
  peakAverage: number;
  asOf: string;
  sourceUrl: string;
}

export const SUBWAY_CONGESTION: SubwayCongestion[] = [
  {
    "lockerId": "subway-locker-01",
    "stationNumber": "95",
    "station": "다대포해수욕장",
    "line": 1,
    "grade": 1,
    "peak": {
      "ko": "주말 15~16시",
      "ja": "週末 15〜16時",
      "en": "weekends 15–16"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 891.9,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-02",
    "stationNumber": "96",
    "station": "다대포항",
    "line": 1,
    "grade": 1,
    "peak": {
      "ko": "평일 17~18시",
      "ja": "平日 17〜18時",
      "en": "weekdays 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        2,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 675.3,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-03",
    "stationNumber": "102",
    "station": "하단",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        3,
        4,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3861.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-04",
    "stationNumber": "105",
    "station": "괴정",
    "line": 1,
    "grade": 2,
    "peak": {
      "ko": "평일 17~18시",
      "ja": "平日 17〜18時",
      "en": "weekdays 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        3,
        3,
        3
      ],
      [
        2,
        3,
        3,
        3
      ],
      [
        2,
        3,
        3,
        3
      ],
      [
        2,
        3,
        3,
        3
      ],
      [
        2,
        3,
        3,
        3
      ],
      [
        2,
        3,
        3,
        2
      ],
      [
        1,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1705.9,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-05",
    "stationNumber": "109",
    "station": "토성",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        2,
        3,
        3
      ],
      [
        2,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2349.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-06",
    "stationNumber": "110",
    "station": "자갈치",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "주말 15~16시",
      "ja": "週末 15〜16時",
      "en": "weekends 15–16"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        2,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3755.7,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-07",
    "stationNumber": "111",
    "station": "남포",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "주말 15~16시",
      "ja": "週末 15〜16時",
      "en": "weekends 15–16"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3701.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-08",
    "stationNumber": "112",
    "station": "중앙",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        2,
        2,
        4
      ],
      [
        3,
        2,
        2,
        4
      ],
      [
        3,
        2,
        2,
        4
      ],
      [
        3,
        2,
        2,
        4
      ],
      [
        3,
        2,
        2,
        4
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 4450.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-09",
    "stationNumber": "113",
    "station": "부산",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 4788.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-10",
    "stationNumber": "114",
    "station": "초량",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        1,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        1,
        2,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2405.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-11",
    "stationNumber": "115",
    "station": "부산진",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        3,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2162.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-12",
    "stationNumber": "117",
    "station": "범일",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        3
      ],
      [
        2,
        3,
        3,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2793.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-13",
    "stationNumber": "118",
    "station": "범내골",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        2,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        2,
        3,
        2,
        2
      ],
      [
        1,
        2,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3407.9,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-14",
    "stationNumber": "119",
    "station": "서면",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 7816.1,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-15",
    "stationNumber": "120",
    "station": "부전",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 13~14시",
      "ja": "平日 13〜14時",
      "en": "weekdays 13–14"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        3
      ],
      [
        3,
        4,
        4,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3168.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-16",
    "stationNumber": "121",
    "station": "양정",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        4,
        3,
        3,
        4
      ],
      [
        4,
        3,
        3,
        4
      ],
      [
        4,
        3,
        3,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        2,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3328.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-17",
    "stationNumber": "122",
    "station": "시청",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        4,
        3,
        3,
        4
      ],
      [
        4,
        3,
        3,
        4
      ],
      [
        4,
        3,
        3,
        4
      ],
      [
        4,
        3,
        4,
        4
      ],
      [
        3,
        4,
        3,
        3
      ],
      [
        2,
        3,
        3,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 4666.3,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-18",
    "stationNumber": "123",
    "station": "연산",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 4130.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-19",
    "stationNumber": "125",
    "station": "동래",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3695.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-20",
    "stationNumber": "126",
    "station": "명륜",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        2,
        2,
        3,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2351.7,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-21",
    "stationNumber": "127",
    "station": "온천장",
    "line": 1,
    "grade": 4,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3449.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-22",
    "stationNumber": "128",
    "station": "부산대",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        3,
        4,
        3
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3263.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-23",
    "stationNumber": "129",
    "station": "장전",
    "line": 1,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        2,
        2,
        3,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2256.1,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-24",
    "stationNumber": "134",
    "station": "노포",
    "line": 1,
    "grade": 2,
    "peak": {
      "ko": "주말 11~12시",
      "ja": "週末 11〜12時",
      "en": "weekends 11–12"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        4,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2059.9,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-25",
    "stationNumber": "201",
    "station": "장산",
    "line": 2,
    "grade": 3,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2997.3,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-26",
    "stationNumber": "202",
    "station": "중동",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        3,
        3,
        2
      ],
      [
        1,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1561.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-27",
    "stationNumber": "203",
    "station": "해운대",
    "line": 2,
    "grade": 3,
    "peak": {
      "ko": "주말 16~17시",
      "ja": "週末 16〜17時",
      "en": "weekends 16–17"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3141.9,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-28",
    "stationNumber": "204",
    "station": "동백",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1446.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-29",
    "stationNumber": "205",
    "station": "벡스코",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        2,
        4,
        3,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2056.3,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-30",
    "stationNumber": "206",
    "station": "센텀시티",
    "line": 2,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 4813.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-31",
    "stationNumber": "208",
    "station": "수영",
    "line": 2,
    "grade": 4,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        3,
        3
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3431.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-32",
    "stationNumber": "209",
    "station": "광안",
    "line": 2,
    "grade": 3,
    "peak": {
      "ko": "주말 17~18시",
      "ja": "週末 17〜18時",
      "en": "weekends 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        2,
        3,
        4,
        4
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2263.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-33",
    "stationNumber": "210",
    "station": "금련산",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        3,
        3,
        3
      ],
      [
        1,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1668.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-34",
    "stationNumber": "211",
    "station": "남천",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        3,
        3,
        2,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        3,
        3,
        2
      ],
      [
        1,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1734.3,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-35",
    "stationNumber": "212",
    "station": "경성대부경대",
    "line": 2,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        3,
        4,
        3
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3677.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-36",
    "stationNumber": "213",
    "station": "대연",
    "line": 2,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        2,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2173.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-37",
    "stationNumber": "214",
    "station": "못골",
    "line": 2,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        2,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        2,
        1,
        2,
        2
      ],
      [
        2,
        1,
        2,
        3
      ],
      [
        1,
        2,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1354.7,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-38",
    "stationNumber": "217",
    "station": "국제금융센터",
    "line": 2,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        3
      ],
      [
        1,
        1,
        1,
        4
      ],
      [
        1,
        1,
        1,
        4
      ],
      [
        2,
        1,
        1,
        3
      ],
      [
        1,
        1,
        1,
        3
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2461.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-39",
    "stationNumber": "218",
    "station": "전포",
    "line": 2,
    "grade": 3,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        3,
        4
      ],
      [
        2,
        2,
        3,
        4
      ],
      [
        2,
        2,
        3,
        4
      ],
      [
        2,
        2,
        3,
        4
      ],
      [
        2,
        3,
        3,
        4
      ],
      [
        2,
        3,
        4,
        4
      ],
      [
        1,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2570.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-40",
    "stationNumber": "219",
    "station": "서면",
    "line": 2,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 4989.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-41",
    "stationNumber": "222",
    "station": "동의대",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        3,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        1,
        2,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1481.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-42",
    "stationNumber": "223",
    "station": "개금",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        2,
        3,
        3
      ],
      [
        3,
        2,
        3,
        3
      ],
      [
        3,
        2,
        3,
        3
      ],
      [
        3,
        2,
        3,
        3
      ],
      [
        3,
        2,
        3,
        3
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1928.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-43",
    "stationNumber": "224",
    "station": "냉정",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        2
      ],
      [
        3,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1396.6,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-44",
    "stationNumber": "225",
    "station": "주례",
    "line": 2,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        1,
        1,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1508.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-45",
    "stationNumber": "227",
    "station": "사상",
    "line": 2,
    "grade": 4,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 4507.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-46",
    "stationNumber": "230",
    "station": "모라",
    "line": 2,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        2,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        2,
        1,
        2
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1113.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-47",
    "stationNumber": "233",
    "station": "덕천",
    "line": 2,
    "grade": 1,
    "peak": {
      "ko": "평일 17~18시",
      "ja": "平日 17〜18時",
      "en": "weekdays 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        3,
        2,
        2
      ],
      [
        1,
        2,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1080.6,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-48",
    "stationNumber": "235",
    "station": "화명",
    "line": 2,
    "grade": 3,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        2,
        3,
        3,
        3
      ],
      [
        2,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2278.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-49",
    "stationNumber": "242",
    "station": "남양산",
    "line": 2,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 621.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-50",
    "stationNumber": "243",
    "station": "양산",
    "line": 2,
    "grade": 1,
    "peak": {
      "ko": "평일 17~18시",
      "ja": "平日 17〜18時",
      "en": "weekdays 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        1,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1050.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-51",
    "stationNumber": "208",
    "station": "수영",
    "line": 3,
    "grade": 4,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        3,
        4,
        4
      ],
      [
        4,
        4,
        4,
        4
      ],
      [
        3,
        4,
        3,
        3
      ],
      [
        2,
        3,
        3,
        3
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 3431.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-52",
    "stationNumber": "302",
    "station": "망미",
    "line": 3,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        2,
        1,
        1,
        2
      ],
      [
        2,
        1,
        1,
        2
      ],
      [
        1,
        1,
        2,
        2
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1095.5,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-53",
    "stationNumber": "303",
    "station": "배산",
    "line": 3,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        2,
        2
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 946.7,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-54",
    "stationNumber": "305",
    "station": "연산",
    "line": 3,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        3
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        3,
        3,
        3,
        4
      ],
      [
        2,
        3,
        3,
        2
      ],
      [
        1,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2053.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-55",
    "stationNumber": "306",
    "station": "거제",
    "line": 3,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        1,
        1,
        2,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1698.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-56",
    "stationNumber": "307",
    "station": "종합운동장",
    "line": 3,
    "grade": 2,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        3,
        3
      ],
      [
        2,
        3,
        3,
        2
      ],
      [
        1,
        2,
        2,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1793.2,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-57",
    "stationNumber": "308",
    "station": "사직",
    "line": 3,
    "grade": 2,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        4
      ],
      [
        2,
        2,
        2,
        4
      ],
      [
        2,
        2,
        2,
        4
      ],
      [
        2,
        3,
        3,
        2
      ],
      [
        1,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1973.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-58",
    "stationNumber": "309",
    "station": "미남",
    "line": 3,
    "grade": 3,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        2,
        3,
        4
      ],
      [
        3,
        2,
        3,
        4
      ],
      [
        3,
        2,
        3,
        4
      ],
      [
        3,
        2,
        3,
        4
      ],
      [
        3,
        2,
        3,
        4
      ],
      [
        2,
        3,
        3,
        2
      ],
      [
        2,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2531.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-59",
    "stationNumber": "310",
    "station": "만덕",
    "line": 3,
    "grade": 2,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1412.3,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-60",
    "stationNumber": "311",
    "station": "남산정",
    "line": 3,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        1,
        1,
        2
      ],
      [
        2,
        1,
        1,
        2
      ],
      [
        2,
        1,
        1,
        2
      ],
      [
        2,
        1,
        2,
        2
      ],
      [
        2,
        1,
        2,
        2
      ],
      [
        1,
        2,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1119.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-61",
    "stationNumber": "312",
    "station": "숙등",
    "line": 3,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 1055.6,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-62",
    "stationNumber": "313",
    "station": "덕천",
    "line": 3,
    "grade": 3,
    "peak": {
      "ko": "평일 17~18시",
      "ja": "平日 17〜18時",
      "en": "weekdays 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        3,
        3,
        4,
        3
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        3,
        4,
        4
      ],
      [
        3,
        4,
        4,
        4
      ],
      [
        3,
        4,
        4,
        3
      ],
      [
        2,
        3,
        3,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2139.1,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-63",
    "stationNumber": "314",
    "station": "구포",
    "line": 3,
    "grade": 1,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 677.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-64",
    "stationNumber": "315",
    "station": "강서구청",
    "line": 3,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        2
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 874.4,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-65",
    "stationNumber": "317",
    "station": "대저",
    "line": 3,
    "grade": 2,
    "peak": {
      "ko": "평일 18~19시",
      "ja": "平日 18〜19時",
      "en": "weekdays 18–19"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        4
      ],
      [
        2,
        2,
        2,
        3
      ],
      [
        2,
        2,
        2,
        4
      ],
      [
        2,
        2,
        2,
        2
      ],
      [
        2,
        2,
        2,
        2
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 2015.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-66",
    "stationNumber": "402",
    "station": "동래",
    "line": 4,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 449.3,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-67",
    "stationNumber": "403",
    "station": "수안",
    "line": 4,
    "grade": 1,
    "peak": {
      "ko": "평일 13~14시",
      "ja": "平日 13〜14時",
      "en": "weekdays 13–14"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        1
      ],
      [
        1,
        2,
        2,
        2
      ],
      [
        1,
        2,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 793.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-68",
    "stationNumber": "405",
    "station": "충렬사",
    "line": 4,
    "grade": 1,
    "peak": {
      "ko": "평일 17~18시",
      "ja": "平日 17〜18時",
      "en": "weekdays 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 657.9,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-69",
    "stationNumber": "411",
    "station": "영산대",
    "line": 4,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 554.0,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-70",
    "stationNumber": "412",
    "station": "윗반송",
    "line": 4,
    "grade": 1,
    "peak": {
      "ko": "평일 08~09시",
      "ja": "平日 08〜09時",
      "en": "weekdays 08–09"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 441.1,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  },
  {
    "lockerId": "subway-locker-71",
    "stationNumber": "414",
    "station": "안평",
    "line": 4,
    "grade": 1,
    "peak": {
      "ko": "평일 17~18시",
      "ja": "平日 17〜18時",
      "en": "weekdays 17–18"
    },
    "sample": {
      "ko": "2025 승하차 데이터 기반",
      "ja": "2025 乗降データ基準",
      "en": "Based on 2025 ridership data"
    },
    "grid": [
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ],
      [
        1,
        1,
        1,
        1
      ]
    ],
    "hours": [
      9,
      12,
      15,
      18
    ],
    "peakAverage": 360.8,
    "asOf": "2026.01~06",
    "sourceUrl": "https://www.data.go.kr/data/3057229/fileData.do"
  }
];

export function findSubwayCongestion(lockerId: string): SubwayCongestion | null {
  return SUBWAY_CONGESTION.find((item) => item.lockerId === lockerId) ?? null;
}
