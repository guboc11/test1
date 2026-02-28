// 자동 생성 파일 — election-data/aggregate.mjs 로 재생성
// DO NOT EDIT MANUALLY

export interface ElectionParty {
  name: string;
  color: string;
  nationalRate: number;
}

export interface ElectionDataset {
  id: string;
  name: string;
  type: 'presidential' | 'assembly-pr' | 'assembly-district';
  year: number;
  parties: ElectionParty[];
  regionRates: Record<string, number[]>;
  earlyNationalRates: number[];
  mainNationalRates: number[];
  earlyRegionRates: Record<string, number[]>;
  mainRegionRates: Record<string, number[]>;
  earlyTotal: number;
  mainTotal: number;
  earlyRegionTotals: Record<string, number>;
  mainRegionTotals: Record<string, number>;
  electorateTotal: number;
}

export const ELECTION_DATASETS: ElectionDataset[] = [
  {
    "id": "presidential-16",
    "name": "16대 대선 (2002)",
    "type": "presidential",
    "year": 2002,
    "parties": [
      {
        "name": "새천년민주당",
        "color": "#004EA2",
        "nationalRate": 48.9
      },
      {
        "name": "한나라당",
        "color": "#C9151E",
        "nationalRate": 46.6
      },
      {
        "name": "민주노동당",
        "color": "#F37021",
        "nationalRate": 3.9
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 0.6
      }
    ],
    "regionRates": {
      "seoul": [
        51.3,
        45,
        3.3,
        0.4,
        0
      ],
      "busan": [
        29.9,
        66.7,
        3.1,
        0.3,
        0
      ],
      "daegu": [
        18.6,
        77.8,
        3.3,
        0.3,
        0
      ],
      "incheon": [
        49.8,
        44.6,
        5,
        0.6,
        0
      ],
      "gwangju": [
        95.1,
        3.6,
        1,
        0.3,
        0
      ],
      "daejeon": [
        55.2,
        39.8,
        4.4,
        0.6,
        0
      ],
      "ulsan": [
        35.3,
        52.9,
        11.4,
        0.4,
        0
      ],
      "gyeonggi": [
        50.6,
        44.2,
        4.4,
        0.8,
        0
      ],
      "gangwon": [
        41.5,
        52.5,
        5.1,
        0.9,
        0
      ],
      "north-chungcheong": [
        50.4,
        42.9,
        5.8,
        0.9,
        0
      ],
      "south-chungcheong": [
        52.2,
        41.2,
        5.4,
        1.2,
        0
      ],
      "north-jeolla": [
        91.6,
        6.2,
        1.4,
        0.8,
        0
      ],
      "south-jeolla": [
        93.4,
        4.6,
        1.1,
        0.9,
        0
      ],
      "north-gyeongsang": [
        21.7,
        73.5,
        4.3,
        0.5,
        0
      ],
      "south-gyeongsang": [
        27.1,
        67.5,
        5,
        0.4,
        0
      ],
      "jeju": [
        56,
        39.9,
        3.3,
        0.8,
        0
      ]
    },
    "earlyNationalRates": [
      0,
      0,
      0,
      0,
      0
    ],
    "mainNationalRates": [
      48.9,
      46.6,
      3.9,
      0.6,
      0
    ],
    "earlyRegionRates": {},
    "mainRegionRates": {
      "seoul": [
        51.3,
        45,
        3.3,
        0.4,
        0
      ],
      "busan": [
        29.9,
        66.7,
        3.1,
        0.3,
        0
      ],
      "daegu": [
        18.6,
        77.8,
        3.3,
        0.3,
        0
      ],
      "incheon": [
        49.8,
        44.6,
        5,
        0.6,
        0
      ],
      "gwangju": [
        95.1,
        3.6,
        1,
        0.3,
        0
      ],
      "daejeon": [
        55.2,
        39.8,
        4.4,
        0.6,
        0
      ],
      "ulsan": [
        35.3,
        52.9,
        11.4,
        0.4,
        0
      ],
      "gyeonggi": [
        50.6,
        44.2,
        4.4,
        0.8,
        0
      ],
      "gangwon": [
        41.5,
        52.5,
        5.1,
        0.9,
        0
      ],
      "north-chungcheong": [
        50.4,
        42.9,
        5.8,
        0.9,
        0
      ],
      "south-chungcheong": [
        52.2,
        41.2,
        5.4,
        1.2,
        0
      ],
      "north-jeolla": [
        91.6,
        6.2,
        1.4,
        0.8,
        0
      ],
      "south-jeolla": [
        93.4,
        4.6,
        1.1,
        0.9,
        0
      ],
      "north-gyeongsang": [
        21.7,
        73.5,
        4.3,
        0.5,
        0
      ],
      "south-gyeongsang": [
        27.1,
        67.5,
        5,
        0.4,
        0
      ],
      "jeju": [
        56,
        39.9,
        3.3,
        0.8,
        0
      ]
    },
    "earlyTotal": 0,
    "mainTotal": 24561916,
    "earlyRegionTotals": {},
    "mainRegionTotals": {
      "seoul": 5443990,
      "busan": 1969093,
      "daegu": 1288909,
      "incheon": 1227816,
      "gwangju": 751416,
      "daejeon": 669846,
      "ulsan": 506322,
      "gyeonggi": 4798006,
      "gangwon": 762937,
      "north-chungcheong": 725162,
      "south-chungcheong": 909818,
      "north-jeolla": 1054800,
      "south-jeolla": 1146320,
      "north-gyeongsang": 1437938,
      "south-gyeongsang": 1604744,
      "jeju": 264799
    },
    "electorateTotal": 34991529
  },
  {
    "id": "presidential-17",
    "name": "17대 대선 (2007)",
    "type": "presidential",
    "year": 2007,
    "parties": [
      {
        "name": "한나라당",
        "color": "#C9151E",
        "nationalRate": 48.7
      },
      {
        "name": "대통합민주신당",
        "color": "#004EA2",
        "nationalRate": 26.1
      },
      {
        "name": "무소속",
        "color": "#94a3b8",
        "nationalRate": 15.1
      },
      {
        "name": "창조한국당",
        "color": "#94a3b8",
        "nationalRate": 5.8
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 4.3
      }
    ],
    "regionRates": {
      "seoul": [
        53.2,
        24.5,
        11.8,
        7.1,
        3.4
      ],
      "busan": [
        57.8,
        13.5,
        19.7,
        5.4,
        3.6
      ],
      "daegu": [
        69.3,
        6,
        18.1,
        4,
        2.6
      ],
      "incheon": [
        49.2,
        23.8,
        15.2,
        7,
        4.8
      ],
      "gwangju": [
        8.5,
        79.8,
        3.4,
        4.8,
        3.5
      ],
      "daejeon": [
        36.2,
        23.6,
        28.9,
        7.1,
        4.2
      ],
      "ulsan": [
        54.1,
        13.6,
        17.5,
        5.5,
        9.3
      ],
      "gyeonggi": [
        51.8,
        23.6,
        13.4,
        7.1,
        4.1
      ],
      "gangwon": [
        51.9,
        18.9,
        17.6,
        5.9,
        5.7
      ],
      "north-chungcheong": [
        41.6,
        23.8,
        23.4,
        5.7,
        5.5
      ],
      "south-chungcheong": [
        34.3,
        21.1,
        33.2,
        4.7,
        6.7
      ],
      "north-jeolla": [
        9.1,
        81.6,
        3.6,
        2.8,
        2.9
      ],
      "south-jeolla": [
        9.2,
        78.7,
        3.6,
        3.2,
        5.3
      ],
      "north-gyeongsang": [
        72.6,
        6.8,
        13.7,
        3.3,
        3.6
      ],
      "south-gyeongsang": [
        55,
        12.4,
        21.5,
        4.8,
        6.3
      ],
      "jeju": [
        38.7,
        32.7,
        15,
        7.8,
        5.8
      ]
    },
    "earlyNationalRates": [
      0,
      0,
      0,
      0,
      0
    ],
    "mainNationalRates": [
      48.7,
      26.1,
      15.1,
      5.8,
      4.3
    ],
    "earlyRegionRates": {},
    "mainRegionRates": {
      "seoul": [
        53.2,
        24.5,
        11.8,
        7.1,
        3.4
      ],
      "busan": [
        57.8,
        13.5,
        19.7,
        5.4,
        3.6
      ],
      "daegu": [
        69.3,
        6,
        18.1,
        4,
        2.6
      ],
      "incheon": [
        49.2,
        23.8,
        15.2,
        7,
        4.8
      ],
      "gwangju": [
        8.5,
        79.8,
        3.4,
        4.8,
        3.5
      ],
      "daejeon": [
        36.2,
        23.6,
        28.9,
        7.1,
        4.2
      ],
      "ulsan": [
        54.1,
        13.6,
        17.5,
        5.5,
        9.3
      ],
      "gyeonggi": [
        51.8,
        23.6,
        13.4,
        7.1,
        4.1
      ],
      "gangwon": [
        51.9,
        18.9,
        17.6,
        5.9,
        5.7
      ],
      "north-chungcheong": [
        41.6,
        23.8,
        23.4,
        5.7,
        5.5
      ],
      "south-chungcheong": [
        34.3,
        21.1,
        33.2,
        4.7,
        6.7
      ],
      "north-jeolla": [
        9.1,
        81.6,
        3.6,
        2.8,
        2.9
      ],
      "south-jeolla": [
        9.2,
        78.7,
        3.6,
        3.2,
        5.3
      ],
      "north-gyeongsang": [
        72.6,
        6.8,
        13.7,
        3.3,
        3.6
      ],
      "south-gyeongsang": [
        55,
        12.4,
        21.5,
        4.8,
        6.3
      ],
      "jeju": [
        38.7,
        32.7,
        15,
        7.8,
        5.8
      ]
    },
    "earlyTotal": 0,
    "mainTotal": 23612880,
    "earlyRegionTotals": {},
    "mainRegionTotals": {
      "seoul": 5051369,
      "busan": 1759252,
      "daegu": 1263678,
      "incheon": 1205357,
      "gwangju": 661552,
      "daejeon": 677948,
      "ulsan": 518586,
      "gyeonggi": 5017407,
      "gangwon": 723503,
      "north-chungcheong": 696096,
      "south-chungcheong": 915505,
      "north-jeolla": 952452,
      "south-jeolla": 962851,
      "north-gyeongsang": 1424472,
      "south-gyeongsang": 1533330,
      "jeju": 249522
    },
    "electorateTotal": 37653518
  },
  {
    "id": "presidential-18",
    "name": "18대 대선 (2012)",
    "type": "presidential",
    "year": 2012,
    "parties": [
      {
        "name": "새누리당",
        "color": "#C9151E",
        "nationalRate": 51.6
      },
      {
        "name": "민주통합당",
        "color": "#004EA2",
        "nationalRate": 48
      }
    ],
    "regionRates": {
      "seoul": [
        48.4,
        51.6,
        0,
        0,
        0
      ],
      "busan": [
        60,
        40,
        0,
        0,
        0
      ],
      "daegu": [
        80.4,
        19.6,
        0,
        0,
        0
      ],
      "incheon": [
        51.8,
        48.2,
        0,
        0,
        0
      ],
      "gwangju": [
        7.8,
        92.2,
        0,
        0,
        0
      ],
      "daejeon": [
        50.1,
        49.9,
        0,
        0,
        0
      ],
      "ulsan": [
        60,
        40,
        0,
        0,
        0
      ],
      "sejong": [
        52.2,
        47.8,
        0,
        0,
        0
      ],
      "gyeonggi": [
        50.6,
        49.4,
        0,
        0,
        0
      ],
      "gangwon": [
        62.3,
        37.7,
        0,
        0,
        0
      ],
      "north-chungcheong": [
        56.5,
        43.5,
        0,
        0,
        0
      ],
      "south-chungcheong": [
        57,
        43,
        0,
        0,
        0
      ],
      "north-jeolla": [
        13.3,
        86.7,
        0,
        0,
        0
      ],
      "south-jeolla": [
        10.1,
        89.9,
        0,
        0,
        0
      ],
      "north-gyeongsang": [
        81.3,
        18.7,
        0,
        0,
        0
      ],
      "south-gyeongsang": [
        63.5,
        36.5,
        0,
        0,
        0
      ],
      "jeju": [
        50.8,
        49.2,
        0,
        0,
        0
      ]
    },
    "earlyNationalRates": [
      0,
      0,
      0,
      0,
      0
    ],
    "mainNationalRates": [
      51.8,
      48.2,
      0,
      0,
      0
    ],
    "earlyRegionRates": {},
    "mainRegionRates": {
      "seoul": [
        48.4,
        51.6,
        0,
        0,
        0
      ],
      "busan": [
        60,
        40,
        0,
        0,
        0
      ],
      "daegu": [
        80.4,
        19.6,
        0,
        0,
        0
      ],
      "incheon": [
        51.8,
        48.2,
        0,
        0,
        0
      ],
      "gwangju": [
        7.8,
        92.2,
        0,
        0,
        0
      ],
      "daejeon": [
        50.1,
        49.9,
        0,
        0,
        0
      ],
      "ulsan": [
        60,
        40,
        0,
        0,
        0
      ],
      "sejong": [
        52.2,
        47.8,
        0,
        0,
        0
      ],
      "gyeonggi": [
        50.6,
        49.4,
        0,
        0,
        0
      ],
      "gangwon": [
        62.3,
        37.7,
        0,
        0,
        0
      ],
      "north-chungcheong": [
        56.5,
        43.5,
        0,
        0,
        0
      ],
      "south-chungcheong": [
        57,
        43,
        0,
        0,
        0
      ],
      "north-jeolla": [
        13.3,
        86.7,
        0,
        0,
        0
      ],
      "south-jeolla": [
        10.1,
        89.9,
        0,
        0,
        0
      ],
      "north-gyeongsang": [
        81.3,
        18.7,
        0,
        0,
        0
      ],
      "south-gyeongsang": [
        63.5,
        36.5,
        0,
        0,
        0
      ],
      "jeju": [
        50.8,
        49.2,
        0,
        0,
        0
      ]
    },
    "earlyTotal": 0,
    "mainTotal": 30465760,
    "earlyRegionTotals": {},
    "mainRegionTotals": {
      "seoul": 6252211,
      "busan": 2206670,
      "daegu": 1576823,
      "incheon": 1646813,
      "gwangju": 893311,
      "daejeon": 898886,
      "ulsan": 689428,
      "sejong": 64374,
      "gyeonggi": 6970999,
      "gangwon": 903746,
      "north-chungcheong": 917349,
      "south-chungcheong": 1156558,
      "north-jeolla": 1130637,
      "south-jeolla": 1154643,
      "north-gyeongsang": 1691823,
      "south-gyeongsang": 1984070,
      "jeju": 327419
    },
    "electorateTotal": 40507842
  },
  {
    "id": "presidential-19",
    "name": "19대 대선 (2017)",
    "type": "presidential",
    "year": 2017,
    "parties": [
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 41.1
      },
      {
        "name": "자유한국당",
        "color": "#C9151E",
        "nationalRate": 24
      },
      {
        "name": "국민의당",
        "color": "#EA5504",
        "nationalRate": 21.4
      },
      {
        "name": "바른정당",
        "color": "#94a3b8",
        "nationalRate": 6.8
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 6.7
      }
    ],
    "regionRates": {
      "seoul": [
        42.3,
        20.8,
        22.7,
        7.3,
        6.9
      ],
      "busan": [
        38.7,
        32,
        16.8,
        7.2,
        5.3
      ],
      "daegu": [
        21.7,
        45.4,
        15,
        12.6,
        5.3
      ],
      "incheon": [
        41.2,
        20.9,
        23.7,
        6.5,
        7.7
      ],
      "gwangju": [
        61.1,
        1.6,
        30.1,
        2.2,
        5
      ],
      "daejeon": [
        43,
        20.3,
        23.2,
        6.3,
        7.2
      ],
      "ulsan": [
        38.2,
        27.5,
        17.3,
        8.1,
        8.9
      ],
      "sejong": [
        51.2,
        15.2,
        21,
        6,
        6.6
      ],
      "gyeonggi": [
        42.1,
        20.8,
        22.9,
        6.8,
        7.4
      ],
      "gangwon": [
        34.1,
        30,
        21.8,
        6.9,
        7.2
      ],
      "north-chungcheong": [
        38.6,
        26.3,
        21.8,
        5.9,
        7.4
      ],
      "south-chungcheong": [
        38.6,
        24.8,
        23.5,
        5.6,
        7.5
      ],
      "north-jeolla": [
        64.8,
        3.3,
        23.8,
        2.6,
        5.5
      ],
      "south-jeolla": [
        59.8,
        2.5,
        30.7,
        2.1,
        4.9
      ],
      "north-gyeongsang": [
        21.7,
        48.6,
        14.9,
        8.8,
        6
      ],
      "south-gyeongsang": [
        36.8,
        37.2,
        13.4,
        6.7,
        5.9
      ],
      "jeju": [
        45.5,
        18.3,
        20.9,
        6.1,
        9.2
      ]
    },
    "earlyNationalRates": [
      46.3,
      19.4,
      19.7,
      7.1,
      7.5
    ],
    "mainNationalRates": [
      38.4,
      26.4,
      22.3,
      6.6,
      6.3
    ],
    "earlyRegionRates": {
      "seoul": [
        47,
        17.3,
        20.6,
        7.4,
        7.7
      ],
      "busan": [
        45.2,
        25.6,
        15.3,
        7.7,
        6.2
      ],
      "daegu": [
        27.4,
        37.7,
        14.8,
        13.7,
        6.4
      ],
      "incheon": [
        45.6,
        17.9,
        21.5,
        6.7,
        8.3
      ],
      "gwangju": [
        62.5,
        1.5,
        27.9,
        2.6,
        5.5
      ],
      "daejeon": [
        48.3,
        16.2,
        20.7,
        6.8,
        8
      ],
      "ulsan": [
        43.6,
        21.9,
        15.9,
        8.6,
        10
      ],
      "sejong": [
        55,
        12.3,
        18.7,
        6.7,
        7.3
      ],
      "gyeonggi": [
        46.5,
        17.5,
        20.8,
        7.1,
        8.1
      ],
      "gangwon": [
        41.5,
        22.3,
        19.4,
        8,
        8.8
      ],
      "north-chungcheong": [
        44.2,
        21.2,
        19.6,
        6.6,
        8.4
      ],
      "south-chungcheong": [
        44.9,
        19.3,
        20.7,
        6.4,
        8.7
      ],
      "north-jeolla": [
        66.4,
        3,
        21.4,
        3,
        6.2
      ],
      "south-jeolla": [
        61.8,
        2.2,
        27.8,
        2.6,
        5.6
      ],
      "north-gyeongsang": [
        26.9,
        41,
        14.9,
        10,
        7.2
      ],
      "south-gyeongsang": [
        42,
        30.9,
        12.7,
        7.5,
        6.9
      ],
      "jeju": [
        51.2,
        13.6,
        17.7,
        7,
        10.5
      ]
    },
    "mainRegionRates": {
      "seoul": [
        40,
        22.5,
        23.8,
        7.2,
        6.5
      ],
      "busan": [
        35.8,
        34.8,
        17.5,
        7,
        4.9
      ],
      "daegu": [
        19.4,
        48.5,
        15.1,
        12.2,
        4.8
      ],
      "incheon": [
        39.1,
        22.3,
        24.7,
        6.5,
        7.4
      ],
      "gwangju": [
        60.2,
        1.6,
        31.6,
        1.9,
        4.7
      ],
      "daejeon": [
        40,
        22.5,
        24.6,
        6.1,
        6.8
      ],
      "ulsan": [
        35.3,
        30.3,
        18.1,
        7.9,
        8.4
      ],
      "sejong": [
        48.1,
        17.5,
        22.7,
        5.6,
        6.1
      ],
      "gyeonggi": [
        40,
        22.3,
        23.9,
        6.7,
        7.1
      ],
      "gangwon": [
        30.4,
        33.9,
        23,
        6.3,
        6.4
      ],
      "north-chungcheong": [
        35.8,
        28.9,
        22.9,
        5.5,
        6.9
      ],
      "south-chungcheong": [
        35.5,
        27.6,
        25,
        5.1,
        6.8
      ],
      "north-jeolla": [
        63.8,
        3.6,
        25.3,
        2.3,
        5
      ],
      "south-jeolla": [
        58.4,
        2.6,
        32.9,
        1.7,
        4.4
      ],
      "north-gyeongsang": [
        18.7,
        52.9,
        15,
        8.1,
        5.3
      ],
      "south-gyeongsang": [
        33.9,
        40.6,
        13.8,
        6.3,
        5.4
      ],
      "jeju": [
        42.9,
        20.4,
        22.4,
        5.7,
        8.6
      ]
    },
    "earlyTotal": 11019932,
    "mainTotal": 21652243,
    "earlyRegionTotals": {
      "seoul": 2178770,
      "busan": 680973,
      "daegu": 452786,
      "incheon": 584392,
      "gwangju": 391689,
      "daejeon": 334351,
      "ulsan": 249642,
      "sejong": 65088,
      "gyeonggi": 2546874,
      "gangwon": 324248,
      "north-chungcheong": 329860,
      "south-chungcheong": 411685,
      "north-jeolla": 480653,
      "south-jeolla": 532763,
      "north-gyeongsang": 608823,
      "south-gyeongsang": 731769,
      "jeju": 115566
    },
    "mainRegionTotals": {
      "seoul": 4390147,
      "busan": 1571736,
      "daegu": 1121590,
      "incheon": 1228571,
      "gwangju": 563143,
      "daejeon": 607950,
      "ulsan": 491720,
      "sejong": 87149,
      "gyeonggi": 5340771,
      "gangwon": 626388,
      "north-chungcheong": 640699,
      "south-chungcheong": 822261,
      "north-jeolla": 720350,
      "south-jeolla": 699649,
      "north-gyeongsang": 1092403,
      "south-gyeongsang": 1390870,
      "jeju": 256846
    },
    "electorateTotal": 42479710
  },
  {
    "id": "presidential-20",
    "name": "20대 대선 (2022)",
    "type": "presidential",
    "year": 2022,
    "parties": [
      {
        "name": "국민의힘",
        "color": "#C9151E",
        "nationalRate": 48.6
      },
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 47.8
      },
      {
        "name": "정의당",
        "color": "#FFED00",
        "nationalRate": 2.4
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 1.2
      }
    ],
    "regionRates": {
      "seoul": [
        50.6,
        45.7,
        2.8,
        0.9,
        0
      ],
      "busan": [
        58.2,
        38.2,
        2.2,
        1.4,
        0
      ],
      "daegu": [
        75.2,
        21.6,
        1.9,
        1.3,
        0
      ],
      "incheon": [
        47.1,
        48.9,
        2.8,
        1.2,
        0
      ],
      "gwangju": [
        12.8,
        84.8,
        1.5,
        0.9,
        0
      ],
      "daejeon": [
        49.6,
        46.4,
        2.7,
        1.3,
        0
      ],
      "ulsan": [
        54.4,
        40.8,
        2.9,
        1.9,
        0
      ],
      "sejong": [
        44.2,
        51.9,
        2.9,
        1,
        0
      ],
      "gyeonggi": [
        45.6,
        50.9,
        2.4,
        1.1,
        0
      ],
      "gangwon": [
        54.2,
        41.7,
        2.5,
        1.6,
        0
      ],
      "north-chungcheong": [
        50.7,
        45.1,
        2.6,
        1.6,
        0
      ],
      "south-chungcheong": [
        51.1,
        45,
        2.4,
        1.5,
        0
      ],
      "north-jeolla": [
        14.4,
        83,
        1.6,
        1,
        0
      ],
      "south-jeolla": [
        11.4,
        86.1,
        1.3,
        1.2,
        0
      ],
      "north-gyeongsang": [
        72.7,
        23.8,
        1.9,
        1.6,
        0
      ],
      "south-gyeongsang": [
        58.2,
        37.4,
        2.5,
        1.9,
        0
      ],
      "jeju": [
        42.6,
        52.6,
        3.4,
        1.4,
        0
      ]
    },
    "earlyNationalRates": [
      44.5,
      52.3,
      2.2,
      1,
      0
    ],
    "mainNationalRates": [
      52.3,
      43.7,
      2.6,
      1.4,
      0
    ],
    "earlyRegionRates": {
      "seoul": [
        45.4,
        51.3,
        2.6,
        0.7,
        0
      ],
      "busan": [
        54.5,
        42.4,
        2,
        1.1,
        0
      ],
      "daegu": [
        73.1,
        24,
        1.9,
        1,
        0
      ],
      "incheon": [
        44.3,
        52.2,
        2.5,
        1,
        0
      ],
      "gwangju": [
        11.8,
        86.1,
        1.3,
        0.8,
        0
      ],
      "daejeon": [
        45.5,
        50.9,
        2.6,
        1,
        0
      ],
      "ulsan": [
        51.5,
        44.3,
        2.7,
        1.5,
        0
      ],
      "sejong": [
        41.1,
        55.5,
        2.6,
        0.8,
        0
      ],
      "gyeonggi": [
        42.5,
        54.5,
        2.1,
        0.9,
        0
      ],
      "gangwon": [
        51.4,
        44.9,
        2.4,
        1.3,
        0
      ],
      "north-chungcheong": [
        48.7,
        47.6,
        2.4,
        1.3,
        0
      ],
      "south-chungcheong": [
        48.3,
        48.1,
        2.3,
        1.3,
        0
      ],
      "north-jeolla": [
        13.2,
        84.5,
        1.4,
        0.9,
        0
      ],
      "south-jeolla": [
        10.7,
        87.1,
        1.2,
        1,
        0
      ],
      "north-gyeongsang": [
        71.7,
        25.2,
        1.8,
        1.3,
        0
      ],
      "south-gyeongsang": [
        55.9,
        40.3,
        2.3,
        1.5,
        0
      ],
      "jeju": [
        40.8,
        55,
        3.1,
        1.1,
        0
      ]
    },
    "mainRegionRates": {
      "seoul": [
        55.3,
        40.6,
        3,
        1.1,
        0
      ],
      "busan": [
        61.4,
        34.6,
        2.3,
        1.7,
        0
      ],
      "daegu": [
        76.7,
        19.8,
        2,
        1.5,
        0
      ],
      "incheon": [
        49.2,
        46.2,
        3.1,
        1.5,
        0
      ],
      "gwangju": [
        14.2,
        82.9,
        1.8,
        1.1,
        0
      ],
      "daejeon": [
        53.3,
        42.4,
        2.8,
        1.5,
        0
      ],
      "ulsan": [
        56.8,
        37.9,
        3.1,
        2.2,
        0
      ],
      "sejong": [
        47.9,
        47.6,
        3.3,
        1.2,
        0
      ],
      "gyeonggi": [
        48.1,
        48.1,
        2.6,
        1.2,
        0
      ],
      "gangwon": [
        57,
        38.5,
        2.6,
        1.9,
        0
      ],
      "north-chungcheong": [
        52.6,
        42.8,
        2.8,
        1.8,
        0
      ],
      "south-chungcheong": [
        53.5,
        42.2,
        2.5,
        1.8,
        0
      ],
      "north-jeolla": [
        16.3,
        80.7,
        1.8,
        1.2,
        0
      ],
      "south-jeolla": [
        12.8,
        84.4,
        1.4,
        1.4,
        0
      ],
      "north-gyeongsang": [
        73.9,
        22.3,
        2,
        1.8,
        0
      ],
      "south-gyeongsang": [
        60.4,
        34.8,
        2.6,
        2.2,
        0
      ],
      "jeju": [
        44.4,
        50.5,
        3.6,
        1.5,
        0
      ]
    },
    "earlyTotal": 16217960,
    "mainTotal": 17542351,
    "earlyRegionTotals": {
      "seoul": 3087567,
      "busan": 994175,
      "daegu": 689526,
      "incheon": 853505,
      "gwangju": 580647,
      "daejeon": 447735,
      "ulsan": 330149,
      "sejong": 126632,
      "gyeonggi": 3825707,
      "gangwon": 508853,
      "north-chungcheong": 489777,
      "south-chungcheong": 618538,
      "north-jeolla": 741032,
      "south-jeolla": 808114,
      "north-gyeongsang": 925456,
      "south-gyeongsang": 1001402,
      "jeju": 189145
    },
    "mainRegionTotals": {
      "seoul": 3351572,
      "busan": 1186003,
      "daegu": 907280,
      "incheon": 1013549,
      "gwangju": 397954,
      "daejeon": 488666,
      "ulsan": 398241,
      "sejong": 103259,
      "gyeonggi": 4865669,
      "gangwon": 496987,
      "north-chungcheong": 520432,
      "south-chungcheong": 693575,
      "north-jeolla": 484387,
      "south-jeolla": 463502,
      "north-gyeongsang": 832240,
      "south-gyeongsang": 1122942,
      "jeju": 216093
    },
    "electorateTotal": 44197692
  },
  {
    "id": "presidential-21",
    "name": "21대 대선 (2025)",
    "type": "presidential",
    "year": 2025,
    "parties": [
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 49.4
      },
      {
        "name": "국민의힘",
        "color": "#C9151E",
        "nationalRate": 41.2
      },
      {
        "name": "개혁신당",
        "color": "#FF7210",
        "nationalRate": 8.3
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 1.1
      }
    ],
    "regionRates": {
      "seoul": [
        47.1,
        41.6,
        9.9,
        1.4,
        0
      ],
      "busan": [
        40.1,
        51.4,
        7.6,
        0.9,
        0
      ],
      "daegu": [
        23.2,
        67.6,
        8.3,
        0.9,
        0
      ],
      "incheon": [
        51.8,
        38.4,
        8.7,
        1.1,
        0
      ],
      "gwangju": [
        84.8,
        8,
        6.2,
        1,
        0
      ],
      "daejeon": [
        48.5,
        40.6,
        9.8,
        1.1,
        0
      ],
      "ulsan": [
        42.5,
        47.6,
        8.5,
        1.4,
        0
      ],
      "sejong": [
        55.6,
        33.2,
        9.9,
        1.3,
        0
      ],
      "gyeonggi": [
        52.2,
        38,
        8.8,
        1,
        0
      ],
      "gangwon": [
        44,
        47.3,
        7.7,
        1,
        0
      ],
      "north-chungcheong": [
        47.5,
        43.2,
        8.2,
        1.1,
        0
      ],
      "south-chungcheong": [
        47.7,
        43.3,
        8,
        1,
        0
      ],
      "north-jeolla": [
        82.6,
        10.9,
        5.5,
        1,
        0
      ],
      "south-jeolla": [
        85.9,
        8.5,
        4.7,
        0.9,
        0
      ],
      "north-gyeongsang": [
        25.5,
        66.9,
        6.7,
        0.9,
        0
      ],
      "south-gyeongsang": [
        39.4,
        52,
        7.5,
        1.1,
        0
      ],
      "jeju": [
        54.8,
        34.8,
        8.8,
        1.6,
        0
      ]
    },
    "earlyNationalRates": [
      63.7,
      26.4,
      8.8,
      1.1,
      0
    ],
    "mainNationalRates": [
      38.3,
      52.6,
      8,
      1.1,
      0
    ],
    "earlyRegionRates": {
      "seoul": [
        62.8,
        25.5,
        10.3,
        1.4,
        0
      ],
      "busan": [
        55.7,
        35,
        8.4,
        0.9,
        0
      ],
      "daegu": [
        36.2,
        52.2,
        10.6,
        1,
        0
      ],
      "incheon": [
        64.5,
        25.3,
        9.1,
        1.1,
        0
      ],
      "gwangju": [
        88.6,
        4.9,
        5.7,
        0.8,
        0
      ],
      "daejeon": [
        62.3,
        25.8,
        10.8,
        1.1,
        0
      ],
      "ulsan": [
        56.8,
        32.3,
        9.5,
        1.4,
        0
      ],
      "sejong": [
        66.6,
        21.7,
        10.5,
        1.2,
        0
      ],
      "gyeonggi": [
        65.4,
        24.3,
        9.3,
        1,
        0
      ],
      "gangwon": [
        56.1,
        33.9,
        8.9,
        1.1,
        0
      ],
      "north-chungcheong": [
        58.9,
        31.1,
        8.9,
        1.1,
        0
      ],
      "south-chungcheong": [
        60.1,
        30,
        8.9,
        1,
        0
      ],
      "north-jeolla": [
        87.2,
        6.9,
        5.1,
        0.8,
        0
      ],
      "south-jeolla": [
        89.1,
        5.6,
        4.5,
        0.8,
        0
      ],
      "north-gyeongsang": [
        36,
        54.5,
        8.5,
        1,
        0
      ],
      "south-gyeongsang": [
        51.6,
        38.7,
        8.6,
        1.1,
        0
      ],
      "jeju": [
        65,
        24.2,
        9.3,
        1.5,
        0
      ]
    },
    "mainRegionRates": {
      "seoul": [
        35.3,
        53.6,
        9.7,
        1.4,
        0
      ],
      "busan": [
        30.3,
        61.8,
        7,
        0.9,
        0
      ],
      "daegu": [
        17.1,
        74.9,
        7.2,
        0.8,
        0
      ],
      "incheon": [
        42.3,
        48,
        8.5,
        1.2,
        0
      ],
      "gwangju": [
        78.6,
        13.2,
        7,
        1.2,
        0
      ],
      "daejeon": [
        38,
        51.8,
        9,
        1.2,
        0
      ],
      "ulsan": [
        33.1,
        57.7,
        7.9,
        1.3,
        0
      ],
      "sejong": [
        44.9,
        44.5,
        9.3,
        1.3,
        0
      ],
      "gyeonggi": [
        42.9,
        47.6,
        8.5,
        1,
        0
      ],
      "gangwon": [
        33.1,
        59.2,
        6.7,
        1,
        0
      ],
      "north-chungcheong": [
        38.6,
        52.6,
        7.7,
        1.1,
        0
      ],
      "south-chungcheong": [
        38.4,
        53.2,
        7.3,
        1.1,
        0
      ],
      "north-jeolla": [
        74.6,
        18.1,
        6.1,
        1.2,
        0
      ],
      "south-jeolla": [
        79.2,
        14.6,
        5.1,
        1.1,
        0
      ],
      "north-gyeongsang": [
        18.6,
        75.1,
        5.5,
        0.8,
        0
      ],
      "south-gyeongsang": [
        31.2,
        61,
        6.7,
        1.1,
        0
      ],
      "jeju": [
        45.7,
        44.2,
        8.4,
        1.7,
        0
      ]
    },
    "earlyTotal": 15309291,
    "mainTotal": 19671325,
    "earlyRegionTotals": {
      "seoul": 2820525,
      "busan": 863857,
      "daegu": 521152,
      "incheon": 852667,
      "gwangju": 619372,
      "daejeon": 417190,
      "ulsan": 296789,
      "sejong": 125452,
      "gyeonggi": 3826014,
      "gangwon": 481926,
      "north-chungcheong": 461163,
      "south-chungcheong": 590816,
      "north-jeolla": 796029,
      "south-jeolla": 875701,
      "north-gyeongsang": 691443,
      "south-gyeongsang": 872513,
      "jeju": 196682
    },
    "mainRegionTotals": {
      "seoul": 3768583,
      "busan": 1366355,
      "daegu": 1111160,
      "incheon": 1168160,
      "gwangju": 377052,
      "daejeon": 552418,
      "ulsan": 445586,
      "sejong": 127333,
      "gyeonggi": 5408619,
      "gangwon": 539858,
      "north-chungcheong": 596273,
      "south-chungcheong": 796112,
      "north-jeolla": 441980,
      "south-jeolla": 419142,
      "north-gyeongsang": 1042600,
      "south-gyeongsang": 1289129,
      "jeju": 220965
    },
    "electorateTotal": 44391871
  },
  {
    "id": "assembly-pr-19",
    "name": "19대 총선 비례 (2012)",
    "type": "assembly-pr",
    "year": 2012,
    "parties": [
      {
        "name": "새누리당",
        "color": "#C9151E",
        "nationalRate": 42.8
      },
      {
        "name": "민주통합당",
        "color": "#004EA2",
        "nationalRate": 36.5
      },
      {
        "name": "통합진보당",
        "color": "#EF4723",
        "nationalRate": 10.3
      },
      {
        "name": "자유선진당",
        "color": "#94a3b8",
        "nationalRate": 3.2
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 7.2
      }
    ],
    "regionRates": {
      "seoul": [
        42.2,
        38.2,
        10.6,
        2.1,
        6.9
      ],
      "busan": [
        51.3,
        31.8,
        8.4,
        1.9,
        6.6
      ],
      "daegu": [
        66.5,
        16.4,
        7,
        2,
        8.1
      ],
      "incheon": [
        42.9,
        37.7,
        9.7,
        2.6,
        7.1
      ],
      "gwangju": [
        5.6,
        68.9,
        18.6,
        1,
        5.9
      ],
      "daejeon": [
        34.3,
        33.7,
        9,
        17.9,
        5.1
      ],
      "ulsan": [
        49.5,
        25.2,
        16.3,
        1.6,
        7.4
      ],
      "sejong": [
        27.8,
        38.7,
        5.4,
        22.6,
        5.5
      ],
      "gyeonggi": [
        42.4,
        37.7,
        11,
        2.2,
        6.7
      ],
      "gangwon": [
        51.3,
        33.5,
        6.6,
        1.8,
        6.8
      ],
      "north-chungcheong": [
        43.9,
        36,
        7.7,
        5.3,
        7.1
      ],
      "south-chungcheong": [
        36.6,
        30.4,
        6.8,
        20.4,
        5.8
      ],
      "north-jeolla": [
        9.6,
        65.6,
        14.2,
        1.4,
        9.2
      ],
      "south-jeolla": [
        6.2,
        69.6,
        14.8,
        1.2,
        8.2
      ],
      "north-gyeongsang": [
        69.1,
        13.4,
        6.2,
        1.4,
        9.9
      ],
      "south-gyeongsang": [
        53.8,
        25.6,
        10.5,
        1.6,
        8.5
      ],
      "jeju": [
        38.5,
        39.5,
        12.4,
        2,
        7.6
      ]
    },
    "earlyNationalRates": [
      0,
      0,
      0,
      0,
      0
    ],
    "mainNationalRates": [
      42.8,
      36.5,
      10.3,
      3.2,
      7.2
    ],
    "earlyRegionRates": {},
    "mainRegionRates": {
      "seoul": [
        42.2,
        38.2,
        10.6,
        2.1,
        6.9
      ],
      "busan": [
        51.3,
        31.8,
        8.4,
        1.9,
        6.6
      ],
      "daegu": [
        66.5,
        16.4,
        7,
        2,
        8.1
      ],
      "incheon": [
        42.9,
        37.7,
        9.7,
        2.6,
        7.1
      ],
      "gwangju": [
        5.6,
        68.9,
        18.6,
        1,
        5.9
      ],
      "daejeon": [
        34.3,
        33.7,
        9,
        17.9,
        5.1
      ],
      "ulsan": [
        49.5,
        25.2,
        16.3,
        1.6,
        7.4
      ],
      "sejong": [
        27.8,
        38.7,
        5.4,
        22.6,
        5.5
      ],
      "gyeonggi": [
        42.4,
        37.7,
        11,
        2.2,
        6.7
      ],
      "gangwon": [
        51.3,
        33.5,
        6.6,
        1.8,
        6.8
      ],
      "north-chungcheong": [
        43.9,
        36,
        7.7,
        5.3,
        7.1
      ],
      "south-chungcheong": [
        36.6,
        30.4,
        6.8,
        20.4,
        5.8
      ],
      "north-jeolla": [
        9.6,
        65.6,
        14.2,
        1.4,
        9.2
      ],
      "south-jeolla": [
        6.2,
        69.6,
        14.8,
        1.2,
        8.2
      ],
      "north-gyeongsang": [
        69.1,
        13.4,
        6.2,
        1.4,
        9.9
      ],
      "south-gyeongsang": [
        53.8,
        25.6,
        10.5,
        1.6,
        8.5
      ],
      "jeju": [
        38.5,
        39.5,
        12.4,
        2,
        7.6
      ]
    },
    "earlyTotal": 0,
    "mainTotal": 21332061,
    "earlyRegionTotals": {},
    "mainRegionTotals": {
      "seoul": 4588858,
      "busan": 1553100,
      "daegu": 1016972,
      "incheon": 1113048,
      "gwangju": 574524,
      "daejeon": 626254,
      "ulsan": 477407,
      "sejong": 45535,
      "gyeonggi": 4777483,
      "gangwon": 662429,
      "north-chungcheong": 648546,
      "south-chungcheong": 804830,
      "north-jeolla": 766076,
      "south-jeolla": 828643,
      "north-gyeongsang": 1177378,
      "south-gyeongsang": 1435863,
      "jeju": 235115
    },
    "electorateTotal": 40205055
  },
  {
    "id": "assembly-pr-20",
    "name": "20대 총선 비례 (2016)",
    "type": "assembly-pr",
    "year": 2016,
    "parties": [
      {
        "name": "새누리당",
        "color": "#C9151E",
        "nationalRate": 33.5
      },
      {
        "name": "국민의당",
        "color": "#EA5504",
        "nationalRate": 26.7
      },
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 25.5
      },
      {
        "name": "정의당",
        "color": "#FFED00",
        "nationalRate": 7.2
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 7
      }
    ],
    "regionRates": {
      "seoul": [
        30.9,
        28.8,
        25.9,
        8.5,
        5.9
      ],
      "busan": [
        41.3,
        20.3,
        26.6,
        6,
        5.8
      ],
      "daegu": [
        53.1,
        17.4,
        16.3,
        6.1,
        7.1
      ],
      "incheon": [
        33.4,
        26.9,
        25.4,
        7.5,
        6.8
      ],
      "gwangju": [
        2.9,
        53.3,
        28.6,
        7.3,
        7.9
      ],
      "daejeon": [
        31,
        27.1,
        28.2,
        7.6,
        6.1
      ],
      "ulsan": [
        36.7,
        21.1,
        22.8,
        8.7,
        10.7
      ],
      "sejong": [
        28.6,
        26.6,
        28.5,
        8.9,
        7.4
      ],
      "gyeonggi": [
        32.3,
        27,
        26.8,
        7.8,
        6.1
      ],
      "gangwon": [
        43.5,
        19.3,
        23.9,
        5.7,
        7.6
      ],
      "north-chungcheong": [
        38.7,
        21.4,
        27.6,
        5.6,
        6.7
      ],
      "south-chungcheong": [
        36.9,
        22.5,
        27.1,
        5.6,
        7.9
      ],
      "north-jeolla": [
        7.6,
        42.8,
        32.3,
        8.1,
        9.2
      ],
      "south-jeolla": [
        5.7,
        47.7,
        30.2,
        5.8,
        10.6
      ],
      "north-gyeongsang": [
        58.1,
        14.8,
        12.9,
        5.2,
        9
      ],
      "south-gyeongsang": [
        44,
        17.4,
        24.4,
        6.5,
        7.7
      ],
      "jeju": [
        35,
        22.4,
        29.6,
        7,
        6
      ]
    },
    "earlyNationalRates": [
      30.3,
      26.8,
      28.1,
      8.1,
      6.7
    ],
    "mainNationalRates": [
      34.4,
      26.7,
      24.9,
      7,
      7
    ],
    "earlyRegionRates": {
      "seoul": [
        29.7,
        27.9,
        27.2,
        9.4,
        5.8
      ],
      "busan": [
        36.3,
        20.5,
        30.3,
        7.4,
        5.5
      ],
      "daegu": [
        46.8,
        18.6,
        20.1,
        7.6,
        6.9
      ],
      "incheon": [
        32.4,
        25.9,
        26.9,
        8.4,
        6.4
      ],
      "gwangju": [
        3.3,
        51.9,
        29.2,
        7.7,
        7.9
      ],
      "daejeon": [
        28.9,
        26.2,
        31.1,
        8.4,
        5.4
      ],
      "ulsan": [
        32.5,
        20.1,
        26.4,
        10.3,
        10.7
      ],
      "sejong": [
        26.6,
        25.8,
        31.6,
        9.6,
        6.4
      ],
      "gyeonggi": [
        31.2,
        26,
        28.6,
        8.4,
        5.8
      ],
      "gangwon": [
        36.6,
        20,
        29.4,
        7.2,
        6.8
      ],
      "north-chungcheong": [
        35.4,
        20.8,
        31,
        6.6,
        6.2
      ],
      "south-chungcheong": [
        32.7,
        22.5,
        31.1,
        6.7,
        7
      ],
      "north-jeolla": [
        7.7,
        42.1,
        33.7,
        8.6,
        7.9
      ],
      "south-jeolla": [
        5.6,
        45.8,
        33,
        6.4,
        9.2
      ],
      "north-gyeongsang": [
        53.4,
        15.6,
        16.6,
        6.1,
        8.3
      ],
      "south-gyeongsang": [
        39.8,
        17.7,
        27.8,
        7.3,
        7.4
      ],
      "jeju": [
        28.2,
        22.4,
        34.8,
        8.8,
        5.8
      ]
    },
    "mainRegionRates": {
      "seoul": [
        31.1,
        29.1,
        25.6,
        8.3,
        5.9
      ],
      "busan": [
        42.4,
        20.3,
        25.8,
        5.7,
        5.8
      ],
      "daegu": [
        54.5,
        17.2,
        15.4,
        5.7,
        7.2
      ],
      "incheon": [
        33.7,
        27.1,
        25.1,
        7.3,
        6.8
      ],
      "gwangju": [
        2.6,
        53.9,
        28.4,
        7.2,
        7.9
      ],
      "daejeon": [
        31.6,
        27.4,
        27.4,
        7.3,
        6.3
      ],
      "ulsan": [
        37.8,
        21.3,
        21.8,
        8.3,
        10.8
      ],
      "sejong": [
        29.4,
        26.9,
        27.3,
        8.6,
        7.8
      ],
      "gyeonggi": [
        32.6,
        27.2,
        26.4,
        7.6,
        6.2
      ],
      "gangwon": [
        45.4,
        19.1,
        22.3,
        5.3,
        7.9
      ],
      "north-chungcheong": [
        39.5,
        21.6,
        26.6,
        5.4,
        6.9
      ],
      "south-chungcheong": [
        38.2,
        22.5,
        25.9,
        5.3,
        8.1
      ],
      "north-jeolla": [
        7.5,
        43.1,
        31.7,
        8,
        9.7
      ],
      "south-jeolla": [
        5.6,
        48.6,
        29,
        5.6,
        11.2
      ],
      "north-gyeongsang": [
        59.7,
        14.5,
        11.7,
        4.9,
        9.2
      ],
      "south-gyeongsang": [
        45.1,
        17.4,
        23.4,
        6.3,
        7.8
      ],
      "jeju": [
        36.6,
        22.4,
        28.4,
        6.6,
        6
      ]
    },
    "earlyTotal": 5025594,
    "mainTotal": 18735383,
    "earlyRegionTotals": {
      "seoul": 964526,
      "busan": 283961,
      "daegu": 200962,
      "incheon": 252222,
      "gwangju": 179788,
      "daejeon": 154475,
      "ulsan": 109694,
      "sejong": 27909,
      "gyeonggi": 1101639,
      "gangwon": 166301,
      "north-chungcheong": 161271,
      "south-chungcheong": 199238,
      "north-jeolla": 257088,
      "south-jeolla": 286884,
      "north-gyeongsang": 304231,
      "south-gyeongsang": 322796,
      "jeju": 52609
    },
    "mainRegionTotals": {
      "seoul": 3974435,
      "busan": 1303078,
      "daegu": 876530,
      "incheon": 1036159,
      "gwangju": 521837,
      "daejeon": 541986,
      "ulsan": 428184,
      "sejong": 75998,
      "gyeonggi": 4538876,
      "gangwon": 541056,
      "north-chungcheong": 549718,
      "south-chungcheong": 699796,
      "north-jeolla": 668184,
      "south-jeolla": 674248,
      "north-gyeongsang": 907086,
      "south-gyeongsang": 1173420,
      "jeju": 224792
    },
    "electorateTotal": 42100398
  },
  {
    "id": "assembly-pr-21",
    "name": "21대 총선 비례 (2020)",
    "type": "assembly-pr",
    "year": 2020,
    "parties": [
      {
        "name": "국민의힘",
        "color": "#C9151E",
        "nationalRate": 33.8
      },
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 33.4
      },
      {
        "name": "정의당",
        "color": "#FFED00",
        "nationalRate": 9.7
      },
      {
        "name": "국민의당",
        "color": "#EA5504",
        "nationalRate": 6.8
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 16.3
      }
    ],
    "regionRates": {
      "seoul": [
        33.1,
        33.2,
        9.7,
        8.3,
        15.7
      ],
      "busan": [
        43.7,
        28.4,
        7.4,
        6.2,
        14.3
      ],
      "daegu": [
        54.8,
        16.2,
        6.4,
        8.7,
        13.9
      ],
      "incheon": [
        31.3,
        34.6,
        11.8,
        6.7,
        15.6
      ],
      "gwangju": [
        3.2,
        61,
        9.8,
        4.9,
        21.1
      ],
      "daejeon": [
        32.3,
        33.7,
        9.8,
        7.9,
        16.3
      ],
      "ulsan": [
        39.5,
        26.8,
        10.3,
        6.2,
        17.2
      ],
      "sejong": [
        25.6,
        36.5,
        12.3,
        9.2,
        16.4
      ],
      "gyeonggi": [
        31.4,
        34.7,
        10.4,
        7.3,
        16.2
      ],
      "gangwon": [
        39.2,
        28.9,
        9.7,
        5.8,
        16.4
      ],
      "north-chungcheong": [
        36.2,
        30.9,
        10.4,
        6.2,
        16.3
      ],
      "south-chungcheong": [
        35.4,
        31.2,
        9.7,
        6.4,
        17.3
      ],
      "north-jeolla": [
        5.8,
        56,
        12,
        4.1,
        22.1
      ],
      "south-jeolla": [
        4.2,
        60.3,
        9.6,
        3.9,
        22
      ],
      "north-gyeongsang": [
        56.8,
        16.1,
        6.5,
        5.6,
        15
      ],
      "south-gyeongsang": [
        44.6,
        25.6,
        9.4,
        5.4,
        15
      ],
      "jeju": [
        28.2,
        35.6,
        12.9,
        5.9,
        17.4
      ]
    },
    "earlyNationalRates": [
      29.5,
      38,
      9.8,
      6,
      16.7
    ],
    "mainNationalRates": [
      36.7,
      30.2,
      9.6,
      7.4,
      16.1
    ],
    "earlyRegionRates": {
      "seoul": [
        28.3,
        38.7,
        9.9,
        7.1,
        16
      ],
      "busan": [
        38.7,
        33.4,
        7.6,
        5.6,
        14.7
      ],
      "daegu": [
        50.9,
        20.2,
        7,
        8.1,
        13.8
      ],
      "incheon": [
        28.7,
        38.5,
        11.6,
        5.8,
        15.4
      ],
      "gwangju": [
        2.8,
        61.7,
        9.5,
        4.4,
        21.6
      ],
      "daejeon": [
        28.8,
        38,
        10.1,
        7.1,
        16
      ],
      "ulsan": [
        34.5,
        31.4,
        11,
        5.7,
        17.4
      ],
      "sejong": [
        22.5,
        40.3,
        12.2,
        8.2,
        16.8
      ],
      "gyeonggi": [
        27.6,
        39.2,
        10.4,
        6.3,
        16.5
      ],
      "gangwon": [
        34.6,
        33,
        10.6,
        5.7,
        16.1
      ],
      "north-chungcheong": [
        33.5,
        34.2,
        10.4,
        5.6,
        16.3
      ],
      "south-chungcheong": [
        32.3,
        35.1,
        9.8,
        5.9,
        16.9
      ],
      "north-jeolla": [
        5.3,
        56.8,
        11.9,
        3.8,
        22.2
      ],
      "south-jeolla": [
        3.7,
        60.6,
        9.6,
        3.6,
        22.5
      ],
      "north-gyeongsang": [
        54.2,
        18.8,
        7,
        5.4,
        14.6
      ],
      "south-gyeongsang": [
        41.1,
        29.1,
        9.6,
        5,
        15.2
      ],
      "jeju": [
        25.2,
        38.5,
        13.1,
        5.6,
        17.6
      ]
    },
    "mainRegionRates": {
      "seoul": [
        36.4,
        29.5,
        9.6,
        9,
        15.5
      ],
      "busan": [
        46.8,
        25.4,
        7.2,
        6.6,
        14
      ],
      "daegu": [
        56.9,
        14.1,
        6,
        9,
        14
      ],
      "incheon": [
        33,
        32,
        12,
        7.3,
        15.7
      ],
      "gwangju": [
        3.6,
        60.2,
        10.2,
        5.3,
        20.7
      ],
      "daejeon": [
        34.8,
        30.6,
        9.6,
        8.5,
        16.5
      ],
      "ulsan": [
        42.8,
        23.9,
        9.8,
        6.5,
        17
      ],
      "sejong": [
        28.3,
        33.1,
        12.4,
        10.1,
        16.1
      ],
      "gyeonggi": [
        33.5,
        32.1,
        10.5,
        7.9,
        16
      ],
      "gangwon": [
        42.7,
        25.6,
        9.1,
        5.9,
        16.7
      ],
      "north-chungcheong": [
        38.4,
        28.4,
        10.3,
        6.5,
        16.4
      ],
      "south-chungcheong": [
        37.5,
        28.6,
        9.6,
        6.8,
        17.5
      ],
      "north-jeolla": [
        6.3,
        55.2,
        12.1,
        4.4,
        22
      ],
      "south-jeolla": [
        4.6,
        60,
        9.6,
        4.2,
        21.6
      ],
      "north-gyeongsang": [
        58.7,
        14.1,
        6.2,
        5.7,
        15.3
      ],
      "south-gyeongsang": [
        47,
        23.2,
        9.2,
        5.7,
        14.9
      ],
      "jeju": [
        30.3,
        33.7,
        12.7,
        6.1,
        17.2
      ]
    },
    "earlyTotal": 11297586,
    "mainTotal": 16602278,
    "earlyRegionTotals": {
      "seoul": 2239355,
      "busan": 724483,
      "daegu": 470006,
      "incheon": 594341,
      "gwangju": 378071,
      "daejeon": 320084,
      "ulsan": 239164,
      "sejong": 82905,
      "gyeonggi": 2550396,
      "gangwon": 363953,
      "north-chungcheong": 345246,
      "south-chungcheong": 428746,
      "north-jeolla": 514366,
      "south-jeolla": 544608,
      "north-gyeongsang": 624597,
      "south-gyeongsang": 745338,
      "jeju": 131927
    },
    "mainRegionTotals": {
      "seoul": 3322976,
      "busan": 1187500,
      "daegu": 863682,
      "incheon": 916538,
      "gwangju": 394136,
      "daejeon": 454355,
      "ulsan": 389757,
      "sejong": 91629,
      "gyeonggi": 4356306,
      "gangwon": 466396,
      "north-chungcheong": 477862,
      "south-chungcheong": 622513,
      "north-jeolla": 474444,
      "south-jeolla": 484645,
      "north-gyeongsang": 818142,
      "south-gyeongsang": 1079487,
      "jeju": 201910
    },
    "electorateTotal": 43994247
  },
  {
    "id": "assembly-pr-22",
    "name": "22대 총선 비례 (2024)",
    "type": "assembly-pr",
    "year": 2024,
    "parties": [
      {
        "name": "국민의힘",
        "color": "#C9151E",
        "nationalRate": 36.7
      },
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 26.7
      },
      {
        "name": "조국혁신당",
        "color": "#00A0D2",
        "nationalRate": 24.3
      },
      {
        "name": "개혁신당",
        "color": "#FF7210",
        "nationalRate": 3.6
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 8.8
      }
    ],
    "regionRates": {
      "seoul": [
        37,
        26.2,
        22.9,
        4.4,
        9.5
      ],
      "busan": [
        45.9,
        20.8,
        22.5,
        3.2,
        7.6
      ],
      "daegu": [
        60.2,
        13.7,
        11.8,
        4.7,
        9.6
      ],
      "incheon": [
        34.9,
        30,
        22.7,
        3.3,
        9.1
      ],
      "gwangju": [
        5.7,
        36.3,
        47.7,
        2.3,
        8
      ],
      "daejeon": [
        35.5,
        27.7,
        24,
        3.8,
        9
      ],
      "ulsan": [
        41.8,
        24.2,
        22.2,
        3.2,
        8.6
      ],
      "sejong": [
        29.9,
        25.1,
        30.9,
        4.7,
        9.4
      ],
      "gyeonggi": [
        33.9,
        29.1,
        24.3,
        4.1,
        8.6
      ],
      "gangwon": [
        43.5,
        24.9,
        20.1,
        3.1,
        8.4
      ],
      "north-chungcheong": [
        39,
        27.5,
        21.9,
        3.1,
        8.5
      ],
      "south-chungcheong": [
        39,
        28.3,
        21.1,
        2.9,
        8.7
      ],
      "north-jeolla": [
        8.5,
        37.6,
        45.5,
        2,
        6.4
      ],
      "south-jeolla": [
        6.6,
        39.9,
        44,
        2,
        7.5
      ],
      "north-gyeongsang": [
        60.3,
        14.7,
        11.7,
        3.2,
        10.1
      ],
      "south-gyeongsang": [
        46.2,
        21.5,
        20.5,
        3,
        8.8
      ],
      "jeju": [
        31.4,
        28.3,
        27.9,
        3,
        9.4
      ]
    },
    "earlyNationalRates": [
      32.3,
      28.4,
      28.6,
      3.4,
      7.3
    ],
    "mainNationalRates": [
      40.5,
      25.2,
      20.4,
      3.8,
      10.1
    ],
    "earlyRegionRates": {
      "seoul": [
        32,
        28.5,
        27.4,
        4.2,
        7.9
      ],
      "busan": [
        41,
        22.1,
        27.6,
        3.1,
        6.2
      ],
      "daegu": [
        56.7,
        15.1,
        15.1,
        4.9,
        8.2
      ],
      "incheon": [
        31.9,
        31.2,
        26.3,
        3.1,
        7.5
      ],
      "gwangju": [
        5,
        36.3,
        49.2,
        2.2,
        7.3
      ],
      "daejeon": [
        31.2,
        29.4,
        28.6,
        3.7,
        7.1
      ],
      "ulsan": [
        37.5,
        25.7,
        26.5,
        3.1,
        7.2
      ],
      "sejong": [
        26.4,
        25.8,
        35.3,
        4.5,
        8
      ],
      "gyeonggi": [
        30.3,
        30.5,
        28.5,
        3.8,
        6.9
      ],
      "gangwon": [
        39.4,
        26.3,
        24,
        3.2,
        7.1
      ],
      "north-chungcheong": [
        36,
        28.5,
        25.4,
        3,
        7.1
      ],
      "south-chungcheong": [
        35.7,
        29.5,
        24.7,
        2.9,
        7.2
      ],
      "north-jeolla": [
        7.3,
        37.9,
        47.3,
        1.9,
        5.6
      ],
      "south-jeolla": [
        5.8,
        40.1,
        45.2,
        1.9,
        7
      ],
      "north-gyeongsang": [
        57.9,
        15.8,
        14.1,
        3.4,
        8.8
      ],
      "south-gyeongsang": [
        42.5,
        22.6,
        24.4,
        3,
        7.5
      ],
      "jeju": [
        27.8,
        28.7,
        32.5,
        3,
        8
      ]
    },
    "mainRegionRates": {
      "seoul": [
        41.4,
        24.2,
        18.8,
        4.6,
        11
      ],
      "busan": [
        49.9,
        19.8,
        18.4,
        3.3,
        8.6
      ],
      "daegu": [
        62.5,
        12.7,
        9.6,
        4.6,
        10.6
      ],
      "incheon": [
        37.5,
        29,
        19.6,
        3.4,
        10.5
      ],
      "gwangju": [
        6.7,
        36.3,
        45.8,
        2.4,
        8.8
      ],
      "daejeon": [
        39.2,
        26.3,
        20.1,
        3.9,
        10.5
      ],
      "ulsan": [
        45.5,
        23,
        18.6,
        3.2,
        9.7
      ],
      "sejong": [
        33.8,
        24.3,
        26.1,
        4.9,
        10.9
      ],
      "gyeonggi": [
        37,
        27.9,
        20.9,
        4.3,
        9.9
      ],
      "gangwon": [
        47.6,
        23.5,
        16.2,
        3,
        9.7
      ],
      "north-chungcheong": [
        41.7,
        26.6,
        18.8,
        3.2,
        9.7
      ],
      "south-chungcheong": [
        41.9,
        27.3,
        17.9,
        2.9,
        10
      ],
      "north-jeolla": [
        9.9,
        37.3,
        43.2,
        2.1,
        7.5
      ],
      "south-jeolla": [
        7.8,
        39.5,
        42.2,
        2.1,
        8.4
      ],
      "north-gyeongsang": [
        62.4,
        13.7,
        9.5,
        3.1,
        11.3
      ],
      "south-gyeongsang": [
        49.2,
        20.7,
        17.2,
        3,
        9.9
      ],
      "jeju": [
        34.6,
        27.9,
        23.9,
        3,
        10.6
      ]
    },
    "earlyTotal": 13345570,
    "mainTotal": 14998949,
    "earlyRegionTotals": {
      "seoul": 2617016,
      "busan": 818298,
      "daegu": 503984,
      "incheon": 746882,
      "gwangju": 446713,
      "daejeon": 362115,
      "ulsan": 271551,
      "sejong": 108193,
      "gyeonggi": 3310920,
      "gangwon": 418169,
      "north-chungcheong": 403254,
      "south-chungcheong": 527593,
      "north-jeolla": 565540,
      "south-jeolla": 620125,
      "north-gyeongsang": 651895,
      "south-gyeongsang": 816642,
      "jeju": 156680
    },
    "mainRegionTotals": {
      "seoul": 2893274,
      "busan": 1033190,
      "daegu": 748021,
      "incheon": 860402,
      "gwangju": 350574,
      "daejeon": 424137,
      "ulsan": 325939,
      "sejong": 96816,
      "gyeonggi": 4095074,
      "gangwon": 427304,
      "north-chungcheong": 446865,
      "south-chungcheong": 595147,
      "north-jeolla": 419088,
      "south-jeolla": 414795,
      "north-gyeongsang": 720382,
      "south-gyeongsang": 966055,
      "jeju": 181886
    },
    "electorateTotal": 44280011
  },
  {
    "id": "assembly-district-19",
    "name": "19대 총선 지역구 (2012)",
    "type": "assembly-district",
    "year": 2012,
    "parties": [
      {
        "name": "새누리당",
        "color": "#C9151E",
        "nationalRate": 43.3
      },
      {
        "name": "민주통합당",
        "color": "#004EA2",
        "nationalRate": 37.9
      },
      {
        "name": "무소속",
        "color": "#94a3b8",
        "nationalRate": 9.4
      },
      {
        "name": "통합진보당",
        "color": "#EF4723",
        "nationalRate": 6
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 3.5
      }
    ],
    "regionRates": {
      "seoul": [
        44.4,
        45.4,
        4.6,
        3.4,
        2.2
      ],
      "busan": [
        49.8,
        34.6,
        9.7,
        4.7,
        1.2
      ],
      "daegu": [
        60.4,
        16.6,
        16.5,
        4.5,
        2
      ],
      "incheon": [
        47.2,
        44.7,
        2.7,
        3,
        2.4
      ],
      "gwangju": [
        5.2,
        49.4,
        22.9,
        21.5,
        1
      ],
      "daejeon": [
        35.2,
        36.8,
        0.8,
        4,
        23.2
      ],
      "ulsan": [
        54.4,
        13.5,
        4.7,
        26,
        1.4
      ],
      "sejong": [
        13.9,
        47.9,
        4.4,
        0,
        33.8
      ],
      "gyeonggi": [
        46.1,
        43.6,
        4.8,
        4.3,
        1.2
      ],
      "gangwon": [
        52.8,
        37.2,
        8.1,
        1,
        0.9
      ],
      "north-chungcheong": [
        50.2,
        38,
        4.1,
        3.8,
        3.9
      ],
      "south-chungcheong": [
        36.5,
        32.7,
        0.8,
        2.1,
        27.9
      ],
      "north-jeolla": [
        7.6,
        51.8,
        28.6,
        10.8,
        1.2
      ],
      "south-jeolla": [
        3.5,
        56.7,
        22,
        17.5,
        0.3
      ],
      "north-gyeongsang": [
        60.4,
        8.7,
        23.2,
        5.6,
        2.1
      ],
      "south-gyeongsang": [
        51.5,
        18.4,
        16.7,
        10.5,
        2.9
      ],
      "jeju": [
        25.7,
        48.9,
        17,
        0,
        8.4
      ]
    },
    "earlyNationalRates": [
      0,
      0,
      0,
      0,
      0
    ],
    "mainNationalRates": [
      43.2,
      37.9,
      9.4,
      6,
      3.5
    ],
    "earlyRegionRates": {},
    "mainRegionRates": {
      "seoul": [
        44.4,
        45.4,
        4.6,
        3.4,
        2.2
      ],
      "busan": [
        49.8,
        34.6,
        9.7,
        4.7,
        1.2
      ],
      "daegu": [
        60.4,
        16.6,
        16.5,
        4.5,
        2
      ],
      "incheon": [
        47.2,
        44.7,
        2.7,
        3,
        2.4
      ],
      "gwangju": [
        5.2,
        49.4,
        22.9,
        21.5,
        1
      ],
      "daejeon": [
        35.2,
        36.8,
        0.8,
        4,
        23.2
      ],
      "ulsan": [
        54.4,
        13.5,
        4.7,
        26,
        1.4
      ],
      "sejong": [
        13.9,
        47.9,
        4.4,
        0,
        33.8
      ],
      "gyeonggi": [
        46.1,
        43.6,
        4.8,
        4.3,
        1.2
      ],
      "gangwon": [
        52.8,
        37.2,
        8.1,
        1,
        0.9
      ],
      "north-chungcheong": [
        50.2,
        38,
        4.1,
        3.8,
        3.9
      ],
      "south-chungcheong": [
        36.5,
        32.7,
        0.8,
        2.1,
        27.9
      ],
      "north-jeolla": [
        7.6,
        51.8,
        28.6,
        10.8,
        1.2
      ],
      "south-jeolla": [
        3.5,
        56.7,
        22,
        17.5,
        0.3
      ],
      "north-gyeongsang": [
        60.4,
        8.7,
        23.2,
        5.6,
        2.1
      ],
      "south-gyeongsang": [
        51.5,
        18.4,
        16.7,
        10.5,
        2.9
      ],
      "jeju": [
        25.7,
        48.9,
        17,
        0,
        8.4
      ]
    },
    "earlyTotal": 0,
    "mainTotal": 21545996,
    "earlyRegionTotals": {},
    "mainRegionTotals": {
      "seoul": 4613311,
      "busan": 1570374,
      "daegu": 1023074,
      "incheon": 1124831,
      "gwangju": 575591,
      "daejeon": 631544,
      "ulsan": 482603,
      "sejong": 46349,
      "gyeonggi": 4815234,
      "gangwon": 675519,
      "north-chungcheong": 659111,
      "south-chungcheong": 822128,
      "north-jeolla": 778126,
      "south-jeolla": 847512,
      "north-gyeongsang": 1198301,
      "south-gyeongsang": 1446596,
      "jeju": 235792
    },
    "electorateTotal": 40181623
  },
  {
    "id": "assembly-district-20",
    "name": "20대 총선 지역구 (2016)",
    "type": "assembly-district",
    "year": 2016,
    "parties": [
      {
        "name": "새누리당",
        "color": "#C9151E",
        "nationalRate": 38.3
      },
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 37
      },
      {
        "name": "국민의당",
        "color": "#EA5504",
        "nationalRate": 14.9
      },
      {
        "name": "무소속",
        "color": "#94a3b8",
        "nationalRate": 7
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 2.8
      }
    ],
    "regionRates": {
      "seoul": [
        36.7,
        43,
        16,
        2.7,
        1.6
      ],
      "busan": [
        47.9,
        38.4,
        5,
        7.2,
        1.5
      ],
      "daegu": [
        47.9,
        18.8,
        0.7,
        28.3,
        4.3
      ],
      "incheon": [
        35.2,
        34.9,
        18.6,
        7.3,
        4
      ],
      "gwangju": [
        2.3,
        34.1,
        56.3,
        2.6,
        4.7
      ],
      "daejeon": [
        38.4,
        43.6,
        15.1,
        0.9,
        2
      ],
      "ulsan": [
        38.5,
        16.5,
        4.8,
        35.6,
        4.6
      ],
      "sejong": [
        36,
        10.6,
        8.3,
        43.7,
        1.4
      ],
      "gyeonggi": [
        39.2,
        42.7,
        14.2,
        1.1,
        2.8
      ],
      "gangwon": [
        47.7,
        35.3,
        2,
        13.2,
        1.8
      ],
      "north-chungcheong": [
        48,
        41.9,
        7.7,
        1.4,
        1
      ],
      "south-chungcheong": [
        41.4,
        42.1,
        10.3,
        5.7,
        0.5
      ],
      "north-jeolla": [
        9.7,
        38.8,
        42.2,
        7.2,
        2.1
      ],
      "south-jeolla": [
        11.6,
        38.1,
        43.8,
        3,
        3.5
      ],
      "north-gyeongsang": [
        60.9,
        8.2,
        1,
        23,
        6.9
      ],
      "south-gyeongsang": [
        48.5,
        31.5,
        4.1,
        11.1,
        4.8
      ],
      "jeju": [
        41.4,
        48.6,
        9.7,
        0,
        0.3
      ]
    },
    "earlyNationalRates": [
      35.1,
      39,
      15.6,
      7.4,
      2.9
    ],
    "mainNationalRates": [
      39.1,
      36.5,
      14.7,
      6.9,
      2.8
    ],
    "earlyRegionRates": {
      "seoul": [
        35.4,
        44.5,
        15.8,
        2.6,
        1.7
      ],
      "busan": [
        43,
        43.1,
        5,
        7.1,
        1.8
      ],
      "daegu": [
        41.7,
        23.1,
        0.8,
        29.7,
        4.7
      ],
      "incheon": [
        33.4,
        35.8,
        18.2,
        8.2,
        4.4
      ],
      "gwangju": [
        2.5,
        34.2,
        55.4,
        2.9,
        5
      ],
      "daejeon": [
        35.2,
        47.3,
        14.4,
        0.9,
        2.2
      ],
      "ulsan": [
        35.4,
        18.3,
        5.1,
        36.1,
        5.1
      ],
      "sejong": [
        33.8,
        12,
        8.3,
        44.8,
        1.1
      ],
      "gyeonggi": [
        37.8,
        44.7,
        13.5,
        1.2,
        2.8
      ],
      "gangwon": [
        41.6,
        40.8,
        2.1,
        13.6,
        1.9
      ],
      "north-chungcheong": [
        45,
        45.7,
        7.1,
        1.3,
        0.9
      ],
      "south-chungcheong": [
        37.5,
        46.5,
        9.7,
        5.8,
        0.5
      ],
      "north-jeolla": [
        9.5,
        39.3,
        41.9,
        7.2,
        2.1
      ],
      "south-jeolla": [
        11.3,
        40.7,
        42.1,
        2.6,
        3.3
      ],
      "north-gyeongsang": [
        57.8,
        10.3,
        1.1,
        23.9,
        6.9
      ],
      "south-gyeongsang": [
        45.3,
        32.9,
        4.8,
        12.3,
        4.7
      ],
      "jeju": [
        35,
        55.3,
        9.4,
        0,
        0.3
      ]
    },
    "mainRegionRates": {
      "seoul": [
        37,
        42.7,
        16,
        2.7,
        1.6
      ],
      "busan": [
        48.9,
        37.4,
        5.1,
        7.2,
        1.4
      ],
      "daegu": [
        49.2,
        17.8,
        0.7,
        28,
        4.3
      ],
      "incheon": [
        35.7,
        34.6,
        18.7,
        7.1,
        3.9
      ],
      "gwangju": [
        2,
        34.1,
        56.7,
        2.5,
        4.7
      ],
      "daejeon": [
        39.3,
        42.6,
        15.2,
        0.9,
        2
      ],
      "ulsan": [
        39.3,
        16,
        4.8,
        35.4,
        4.5
      ],
      "sejong": [
        36.9,
        10.1,
        8.3,
        43.3,
        1.4
      ],
      "gyeonggi": [
        39.6,
        42.2,
        14.3,
        1.1,
        2.8
      ],
      "gangwon": [
        49.5,
        33.6,
        2,
        13.1,
        1.8
      ],
      "north-chungcheong": [
        49,
        40.8,
        7.8,
        1.4,
        1
      ],
      "south-chungcheong": [
        42.6,
        40.8,
        10.4,
        5.7,
        0.5
      ],
      "north-jeolla": [
        9.8,
        38.6,
        42.3,
        7.2,
        2.1
      ],
      "south-jeolla": [
        11.8,
        37,
        44.5,
        3.1,
        3.6
      ],
      "north-gyeongsang": [
        61.9,
        7.5,
        1,
        22.7,
        6.9
      ],
      "south-gyeongsang": [
        49.4,
        31.1,
        3.9,
        10.8,
        4.8
      ],
      "jeju": [
        42.9,
        47,
        9.8,
        0,
        0.3
      ]
    },
    "earlyTotal": 5041483,
    "mainTotal": 18960937,
    "earlyRegionTotals": {
      "seoul": 962216,
      "busan": 286024,
      "daegu": 201426,
      "incheon": 254138,
      "gwangju": 180719,
      "daejeon": 155206,
      "ulsan": 110813,
      "sejong": 28066,
      "gyeonggi": 1107079,
      "gangwon": 167933,
      "north-chungcheong": 163041,
      "south-chungcheong": 201655,
      "north-jeolla": 260205,
      "south-jeolla": 291715,
      "north-gyeongsang": 306557,
      "south-gyeongsang": 311800,
      "jeju": 52890
    },
    "mainRegionTotals": {
      "seoul": 3994193,
      "busan": 1324622,
      "daegu": 885523,
      "incheon": 1052457,
      "gwangju": 526859,
      "daejeon": 548478,
      "ulsan": 436477,
      "sejong": 77568,
      "gyeonggi": 4593119,
      "gangwon": 556338,
      "north-chungcheong": 562944,
      "south-chungcheong": 719570,
      "north-jeolla": 683981,
      "south-jeolla": 691619,
      "north-gyeongsang": 925751,
      "south-gyeongsang": 1152282,
      "jeju": 229156
    },
    "electorateTotal": 41893936
  },
  {
    "id": "assembly-district-21",
    "name": "21대 총선 지역구 (2020)",
    "type": "assembly-district",
    "year": 2020,
    "parties": [
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 49.9
      },
      {
        "name": "미래통합당",
        "color": "#C9151E",
        "nationalRate": 42.4
      },
      {
        "name": "우리공화당",
        "color": "#94a3b8",
        "nationalRate": 2.9
      },
      {
        "name": "민중당",
        "color": "#94a3b8",
        "nationalRate": 2.2
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 2.6
      }
    ],
    "regionRates": {
      "seoul": [
        53.6,
        41.9,
        1.8,
        1.2,
        1.5
      ],
      "busan": [
        44,
        52.9,
        1.3,
        0.9,
        0.9
      ],
      "daegu": [
        28.8,
        60.2,
        2.9,
        3.7,
        4.4
      ],
      "incheon": [
        52.9,
        39,
        4.1,
        0.6,
        3.4
      ],
      "gwangju": [
        75.9,
        10.8,
        3.9,
        1.8,
        7.6
      ],
      "daejeon": [
        53.7,
        43.5,
        1.7,
        1,
        0.1
      ],
      "ulsan": [
        39.2,
        49.7,
        5.7,
        4.5,
        0.9
      ],
      "sejong": [
        57,
        35.9,
        3.8,
        0.7,
        2.6
      ],
      "gyeonggi": [
        54,
        41.1,
        3,
        1.4,
        0.5
      ],
      "gangwon": [
        45.3,
        42.8,
        1.4,
        2.3,
        8.2
      ],
      "north-chungcheong": [
        48.7,
        48.5,
        1.5,
        1.2,
        0.1
      ],
      "south-chungcheong": [
        49.9,
        45.3,
        1.7,
        1.1,
        2
      ],
      "north-jeolla": [
        64.7,
        12.3,
        10.1,
        8.5,
        4.4
      ],
      "south-jeolla": [
        66.7,
        10.6,
        7.9,
        5.6,
        9.2
      ],
      "north-gyeongsang": [
        25.4,
        61.3,
        1.4,
        6.4,
        5.5
      ],
      "south-gyeongsang": [
        37.6,
        53.3,
        1.5,
        3.3,
        4.3
      ],
      "jeju": [
        52.9,
        40.2,
        4,
        0.4,
        2.5
      ]
    },
    "earlyNationalRates": [
      56.4,
      36,
      2.8,
      2.2,
      2.6
    ],
    "mainNationalRates": [
      45.7,
      46.7,
      2.9,
      2.2,
      2.5
    ],
    "earlyRegionRates": {
      "seoul": [
        61.3,
        34.6,
        1.7,
        1.1,
        1.3
      ],
      "busan": [
        51.1,
        46.1,
        1.2,
        0.8,
        0.8
      ],
      "daegu": [
        35.2,
        54.5,
        2.7,
        3.6,
        4
      ],
      "incheon": [
        58.9,
        33.9,
        3.6,
        0.5,
        3.1
      ],
      "gwangju": [
        76.9,
        10,
        3.6,
        1.6,
        7.9
      ],
      "daejeon": [
        60.4,
        37.1,
        1.5,
        0.9,
        0.1
      ],
      "ulsan": [
        45.9,
        42.6,
        6,
        4.6,
        0.9
      ],
      "sejong": [
        63,
        30.5,
        3.4,
        0.6,
        2.5
      ],
      "gyeonggi": [
        60.7,
        34.8,
        2.8,
        1.2,
        0.5
      ],
      "gangwon": [
        52.2,
        36.8,
        1.3,
        2.1,
        7.6
      ],
      "north-chungcheong": [
        53.9,
        43.6,
        1.3,
        1.1,
        0.1
      ],
      "south-chungcheong": [
        55.7,
        40.3,
        1.5,
        0.9,
        1.6
      ],
      "north-jeolla": [
        66.7,
        10.8,
        10.6,
        8.2,
        3.7
      ],
      "south-jeolla": [
        68.7,
        10.3,
        7.7,
        4.8,
        8.5
      ],
      "north-gyeongsang": [
        28.9,
        57.4,
        1.3,
        6.9,
        5.5
      ],
      "south-gyeongsang": [
        42.8,
        48,
        1.3,
        3.1,
        4.8
      ],
      "jeju": [
        58.9,
        34.7,
        3.8,
        0.3,
        2.3
      ]
    },
    "mainRegionRates": {
      "seoul": [
        48.2,
        46.9,
        2,
        1.3,
        1.6
      ],
      "busan": [
        39.6,
        57.1,
        1.4,
        0.9,
        1
      ],
      "daegu": [
        25.5,
        63.2,
        3,
        3.7,
        4.6
      ],
      "incheon": [
        49.1,
        42.3,
        4.4,
        0.6,
        3.6
      ],
      "gwangju": [
        74.9,
        11.6,
        4.1,
        2,
        7.4
      ],
      "daejeon": [
        49.2,
        47.9,
        1.7,
        1.1,
        0.1
      ],
      "ulsan": [
        35,
        54.1,
        5.5,
        4.4,
        1
      ],
      "sejong": [
        51.7,
        40.7,
        4.1,
        0.8,
        2.7
      ],
      "gyeonggi": [
        50.1,
        44.8,
        3.1,
        1.5,
        0.5
      ],
      "gangwon": [
        40,
        47.4,
        1.5,
        2.5,
        8.6
      ],
      "north-chungcheong": [
        44.9,
        52,
        1.7,
        1.3,
        0.1
      ],
      "south-chungcheong": [
        45.8,
        48.7,
        1.9,
        1.3,
        2.3
      ],
      "north-jeolla": [
        62.7,
        13.9,
        9.5,
        8.7,
        5.2
      ],
      "south-jeolla": [
        64.4,
        11,
        8.1,
        6.4,
        10.1
      ],
      "north-gyeongsang": [
        22.6,
        64.2,
        1.5,
        6.1,
        5.6
      ],
      "south-gyeongsang": [
        34.1,
        57,
        1.6,
        3.3,
        4
      ],
      "jeju": [
        49,
        43.8,
        4.1,
        0.5,
        2.6
      ]
    },
    "earlyTotal": 11596973,
    "mainTotal": 17144435,
    "earlyRegionTotals": {
      "seoul": 2287455,
      "busan": 746393,
      "daegu": 481704,
      "incheon": 611652,
      "gwangju": 383675,
      "daejeon": 329238,
      "ulsan": 244716,
      "sejong": 84388,
      "gyeonggi": 2614652,
      "gangwon": 375611,
      "north-chungcheong": 356821,
      "south-chungcheong": 444869,
      "north-jeolla": 528266,
      "south-jeolla": 559385,
      "north-gyeongsang": 644361,
      "south-gyeongsang": 768722,
      "jeju": 135065
    },
    "mainRegionTotals": {
      "seoul": 3408601,
      "busan": 1231563,
      "daegu": 887084,
      "incheon": 951222,
      "gwangju": 400718,
      "daejeon": 471533,
      "ulsan": 401657,
      "sejong": 94071,
      "gyeonggi": 4499431,
      "gangwon": 486884,
      "north-chungcheong": 497654,
      "south-chungcheong": 651527,
      "north-jeolla": 489212,
      "south-jeolla": 499382,
      "north-gyeongsang": 846418,
      "south-gyeongsang": 1118448,
      "jeju": 209030
    },
    "electorateTotal": 43961157
  },
  {
    "id": "assembly-district-22",
    "name": "22대 총선 지역구 (2024)",
    "type": "assembly-district",
    "year": 2024,
    "parties": [
      {
        "name": "더불어민주당",
        "color": "#004EA2",
        "nationalRate": 50.5
      },
      {
        "name": "국민의힘",
        "color": "#C9151E",
        "nationalRate": 45.1
      },
      {
        "name": "무소속",
        "color": "#94a3b8",
        "nationalRate": 1.4
      },
      {
        "name": "진보당",
        "color": "#94a3b8",
        "nationalRate": 1
      },
      {
        "name": "기타",
        "color": "#94a3b8",
        "nationalRate": 2
      }
    ],
    "regionRates": {
      "seoul": [
        52.2,
        46.3,
        0.1,
        0.1,
        1.3
      ],
      "busan": [
        42,
        53.9,
        0.7,
        3,
        0.4
      ],
      "daegu": [
        19.3,
        70.2,
        4.1,
        2.6,
        3.8
      ],
      "incheon": [
        53.5,
        44.9,
        0.3,
        0,
        1.3
      ],
      "gwangju": [
        76.4,
        7.9,
        2.3,
        6.3,
        7.1
      ],
      "daejeon": [
        54.2,
        42.8,
        0.6,
        0,
        2.4
      ],
      "ulsan": [
        36.2,
        51.4,
        0.4,
        10.3,
        1.7
      ],
      "sejong": [
        24.4,
        40.7,
        0.6,
        0,
        34.3
      ],
      "gyeonggi": [
        54.7,
        42.8,
        0.2,
        0,
        2.3
      ],
      "gangwon": [
        45.5,
        53.1,
        0.6,
        0,
        0.8
      ],
      "north-chungcheong": [
        50.3,
        47.9,
        0.6,
        0,
        1.2
      ],
      "south-chungcheong": [
        51.6,
        47.1,
        0.7,
        0,
        0.6
      ],
      "north-jeolla": [
        81.6,
        12.9,
        0.9,
        1.9,
        2.7
      ],
      "south-jeolla": [
        73.2,
        9.8,
        9.9,
        6,
        1.1
      ],
      "north-gyeongsang": [
        21.6,
        67.2,
        9.2,
        0.8,
        1.2
      ],
      "south-gyeongsang": [
        42.3,
        55.4,
        1.4,
        0,
        0.9
      ],
      "jeju": [
        60.9,
        37.9,
        0,
        0,
        1.2
      ]
    },
    "earlyNationalRates": [
      56.5,
      39,
      1.5,
      1.1,
      1.9
    ],
    "mainNationalRates": [
      45.2,
      50.4,
      1.4,
      0.9,
      2.1
    ],
    "earlyRegionRates": {
      "seoul": [
        59.3,
        39.3,
        0.1,
        0.1,
        1.2
      ],
      "busan": [
        48.3,
        47.4,
        0.6,
        3.3,
        0.4
      ],
      "daegu": [
        22.9,
        65.6,
        4.3,
        3.1,
        4.1
      ],
      "incheon": [
        58.7,
        39.8,
        0.3,
        0,
        1.2
      ],
      "gwangju": [
        78.3,
        6.8,
        2.2,
        6.1,
        6.6
      ],
      "daejeon": [
        60.8,
        36.5,
        0.5,
        0,
        2.2
      ],
      "ulsan": [
        41.2,
        45.5,
        0.4,
        11.3,
        1.6
      ],
      "sejong": [
        25.7,
        35.7,
        0.5,
        0,
        38.1
      ],
      "gyeonggi": [
        60.7,
        37.1,
        0.2,
        0,
        2
      ],
      "gangwon": [
        51.1,
        47.6,
        0.5,
        0,
        0.8
      ],
      "north-chungcheong": [
        55,
        43.3,
        0.6,
        0,
        1.1
      ],
      "south-chungcheong": [
        56.5,
        42.4,
        0.6,
        0,
        0.5
      ],
      "north-jeolla": [
        84,
        11,
        0.8,
        1.7,
        2.5
      ],
      "south-jeolla": [
        74.9,
        8.6,
        9.9,
        5.5,
        1.1
      ],
      "north-gyeongsang": [
        24.6,
        64.5,
        8.8,
        0.9,
        1.2
      ],
      "south-gyeongsang": [
        47.3,
        50.6,
        1.4,
        0,
        0.7
      ],
      "jeju": [
        65.9,
        33,
        0,
        0,
        1.1
      ]
    },
    "mainRegionRates": {
      "seoul": [
        45.8,
        52.6,
        0.2,
        0.1,
        1.3
      ],
      "busan": [
        37.1,
        58.9,
        0.8,
        2.7,
        0.5
      ],
      "daegu": [
        17,
        73.2,
        4,
        2.2,
        3.6
      ],
      "incheon": [
        49,
        49.3,
        0.3,
        0,
        1.4
      ],
      "gwangju": [
        74.3,
        9.2,
        2.3,
        6.6,
        7.6
      ],
      "daejeon": [
        48.6,
        48.1,
        0.7,
        0,
        2.6
      ],
      "ulsan": [
        32.2,
        56.2,
        0.4,
        9.4,
        1.8
      ],
      "sejong": [
        23,
        46.1,
        0.7,
        0,
        30.2
      ],
      "gyeonggi": [
        49.8,
        47.4,
        0.3,
        0,
        2.5
      ],
      "gangwon": [
        40.2,
        58.4,
        0.6,
        0,
        0.8
      ],
      "north-chungcheong": [
        46.1,
        52,
        0.6,
        0,
        1.3
      ],
      "south-chungcheong": [
        47.2,
        51.3,
        0.7,
        0,
        0.8
      ],
      "north-jeolla": [
        78.6,
        15.4,
        0.9,
        2.1,
        3
      ],
      "south-jeolla": [
        70.7,
        11.5,
        10,
        6.8,
        1
      ],
      "north-gyeongsang": [
        19,
        69.6,
        9.5,
        0.7,
        1.2
      ],
      "south-gyeongsang": [
        38.2,
        59.5,
        1.3,
        0,
        1
      ],
      "jeju": [
        56.8,
        42,
        0,
        0,
        1.2
      ]
    },
    "earlyTotal": 13689334,
    "mainTotal": 15544795,
    "earlyRegionTotals": {
      "seoul": 2684001,
      "busan": 844979,
      "daegu": 516425,
      "incheon": 769053,
      "gwangju": 450752,
      "daejeon": 370405,
      "ulsan": 278187,
      "sejong": 106593,
      "gyeonggi": 3392227,
      "gangwon": 430520,
      "north-chungcheong": 416168,
      "south-chungcheong": 546531,
      "north-jeolla": 573714,
      "south-jeolla": 633533,
      "north-gyeongsang": 672762,
      "south-gyeongsang": 843899,
      "jeju": 159585
    },
    "mainRegionTotals": {
      "seoul": 2991719,
      "busan": 1076969,
      "daegu": 771705,
      "incheon": 895907,
      "gwangju": 355966,
      "daejeon": 438799,
      "ulsan": 337489,
      "sejong": 96925,
      "gyeonggi": 4243102,
      "gangwon": 446317,
      "north-chungcheong": 467041,
      "south-chungcheong": 624254,
      "north-jeolla": 428701,
      "south-jeolla": 425457,
      "north-gyeongsang": 749445,
      "south-gyeongsang": 1007772,
      "jeju": 187227
    },
    "electorateTotal": 44245552
  }
];
