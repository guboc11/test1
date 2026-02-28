import type { SimulationParams, SimulationResult, RegionResult } from './types';
import { NUM_PARTIES } from './types';

function randn(): number {
  const u1 = Math.random();
  const u2 = Math.random();
  return Math.sqrt(-2 * Math.log(u1 || 1e-10)) * Math.cos(2 * Math.PI * u2);
}

/**
 * 이항 분포 정규 근사로 실제 인원 수 시뮬레이션
 * n명이 각자 독립적으로 확률 p로 행동 → 실제 인원 ~ N(n*p, n*p*(1-p))
 * 대수의 법칙: n이 클수록 n*p에 수렴, 작을수록 크게 흔들림
 */
function simulateCount(n: number, p: number): number {
  if (n <= 0 || p <= 0) return 0;
  if (p >= 1) return n;
  const mean = n * p;
  const std  = Math.sqrt(n * p * (1 - p));
  return Math.max(0, Math.round(mean + randn() * std));
}

/**
 * 다항 분포 정규 근사 (대수의 법칙 핵심)
 * 각 정당을 독립 정규분포로 근사 후 정규화
 * 표준편차 = sqrt(p*(1-p)/n) → n이 클수록 실제 p에 수렴
 */
function simulateMultinomial(n: number, probs: number[]): number[] {
  if (n <= 0) return probs;

  const raw = probs.map((p) => {
    const std = Math.sqrt((p * (1 - p)) / n);
    return Math.max(0, p + randn() * std);
  });

  const total = raw.reduce((s, v) => s + v, 0);
  if (total === 0) return probs;
  return raw.map((v) => v / total);
}

/**
 * 변심율 적용: switchRate% 확률로 무작위 정당으로 이탈
 * mainProbs[i] = (1 - s) * earlyProbs[i] + s * (1/N)
 */
function applySwitch(probs: number[], switchRate: number): number[] {
  const s = switchRate / 100;
  return probs.map((p) => (1 - s) * p + s * (1 / NUM_PARTIES));
}

const REGION_DATA = [
  { id: 'seoul',              nameKr: '서울', weight: 18.3 },
  { id: 'gyeonggi',          nameKr: '경기', weight: 26.1 },
  { id: 'incheon',           nameKr: '인천', weight: 5.7  },
  { id: 'busan',             nameKr: '부산', weight: 6.6  },
  { id: 'daegu',             nameKr: '대구', weight: 4.6  },
  { id: 'daejeon',           nameKr: '대전', weight: 3.0  },
  { id: 'gwangju',           nameKr: '광주', weight: 2.9  },
  { id: 'ulsan',             nameKr: '울산', weight: 2.2  },
  { id: 'sejong',            nameKr: '세종', weight: 0.7  },
  { id: 'gangwon',           nameKr: '강원', weight: 3.0  },
  { id: 'north-chungcheong', nameKr: '충북', weight: 3.1  },
  { id: 'south-chungcheong', nameKr: '충남', weight: 4.1  },
  { id: 'north-jeolla',      nameKr: '전북', weight: 3.5  },
  { id: 'south-jeolla',      nameKr: '전남', weight: 3.5  },
  { id: 'north-gyeongsang',  nameKr: '경북', weight: 5.1  },
  { id: 'south-gyeongsang',  nameKr: '경남', weight: 6.4  },
  { id: 'jeju',              nameKr: '제주', weight: 1.2  },
];

export function runSimulation(params: SimulationParams): SimulationResult {
  const { totalPopulation, partyRates, voterTurnout, earlyVoteRatio, switchRate } = params;

  const earlyProbs = partyRates.map((r) => r / 100);
  const mainProbs  = applySwitch(earlyProbs, switchRate);

  // 각 개인이 독립적으로 투표 여부를 결정 → 실제 투표자 수가 매번 달라짐
  const totalVoters = simulateCount(totalPopulation, voterTurnout / 100);
  // 투표자 각자가 독립적으로 사전/본 투표 여부를 결정
  const earlyTotal  = simulateCount(totalVoters, earlyVoteRatio / 100);
  const mainTotal   = totalVoters - earlyTotal;

  const regions: RegionResult[] = REGION_DATA.map((r) => {
    const w = r.weight / 100;
    // 지역 유권자도 확률적으로 배분
    const earlyCount = simulateCount(earlyTotal, w);
    const mainCount  = simulateCount(mainTotal,  w);
    return {
      id:             r.id,
      nameKr:         r.nameKr,
      earlyVoteRates: simulateMultinomial(earlyCount, earlyProbs),
      mainVoteRates:  simulateMultinomial(mainCount,  mainProbs),
      earlyVoteCount: earlyCount,
      mainVoteCount:  mainCount,
    };
  });

  return {
    earlyVoteRates: simulateMultinomial(earlyTotal, earlyProbs),
    mainVoteRates:  simulateMultinomial(mainTotal,  mainProbs),
    earlyVoteTotal: earlyTotal,
    mainVoteTotal:  mainTotal,
    regions,
  };
}
