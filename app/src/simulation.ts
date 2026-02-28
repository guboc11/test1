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
 * 정당 득표 시뮬레이션
 * 정당 지지율 = 유권자 1명이 해당 정당을 선택할 확률 (개인 수준 확률)
 * 각 정당별로 simulateCount를 적용 → 투표 참여·사전투표 확률과 동일한 방식
 * 정당 A 득표 수 ~ B(n, p_A), 정당 B 득표 수 ~ B(n, p_B), ...
 * 합산 후 정규화하여 득표율 반환
 */
function simulatePartyVotes(n: number, probs: number[]): number[] {
  if (n <= 0) return Array(probs.length).fill(0);
  const counts = probs.map((p) => simulateCount(n, p));
  const total  = counts.reduce((s, v) => s + v, 0);
  return total === 0 ? probs : counts.map((v) => v / total);
}

/**
 * 변심율 적용: switchRate% 확률로 무작위 정당으로 이탈
 * mainProbs[i] = (1 - s) * earlyProbs[i] + s * (1/partyCount)
 * inactive 슬롯(i >= partyCount)은 0으로 고정
 */
function applySwitch(probs: number[], switchRate: number, partyCount: number): number[] {
  const s = switchRate / 100;
  return probs.map((p, i) => {
    if (i >= partyCount) return 0;
    return (1 - s) * p + s * (1 / partyCount);
  });
}

// 출처: 행정안전부 주민등록인구 (2026년 1월 기준)
export const REGION_DATA = [
  { id: 'seoul',              nameKr: '서울', weight: 18.2 },
  { id: 'gyeonggi',          nameKr: '경기', weight: 26.9 },
  { id: 'incheon',           nameKr: '인천', weight: 6.0  },
  { id: 'busan',             nameKr: '부산', weight: 6.3  },
  { id: 'daegu',             nameKr: '대구', weight: 4.6  },
  { id: 'daejeon',           nameKr: '대전', weight: 2.8  },
  { id: 'gwangju',           nameKr: '광주', weight: 2.7  },
  { id: 'ulsan',             nameKr: '울산', weight: 2.1  },
  { id: 'sejong',            nameKr: '세종', weight: 0.8  },
  { id: 'gangwon',           nameKr: '강원', weight: 2.9  },
  { id: 'north-chungcheong', nameKr: '충북', weight: 3.1  },
  { id: 'south-chungcheong', nameKr: '충남', weight: 4.2  },
  { id: 'north-jeolla',      nameKr: '전북', weight: 3.4  },
  { id: 'south-jeolla',      nameKr: '전남', weight: 3.5  },
  { id: 'north-gyeongsang',  nameKr: '경북', weight: 4.9  },
  { id: 'south-gyeongsang',  nameKr: '경남', weight: 6.3  },
  { id: 'jeju',              nameKr: '제주', weight: 1.3  },
];


function computeWeightedRates(regions: RegionResult[], view: 'early' | 'main'): number[] {
  const totalCount = regions.reduce(
    (s, r) => s + (view === 'early' ? r.earlyVoteCount : r.mainVoteCount), 0,
  );
  if (totalCount === 0) return Array(NUM_PARTIES).fill(0);
  return Array(NUM_PARTIES).fill(0).map((_, p) =>
    regions.reduce((s, r) => {
      const count = view === 'early' ? r.earlyVoteCount : r.mainVoteCount;
      const rate  = view === 'early' ? r.earlyVoteRates[p] : r.mainVoteRates[p];
      return s + count * rate;
    }, 0) / totalCount,
  );
}

export function runSimulation(params: SimulationParams): SimulationResult {
  const { totalPopulation, partyRates, voterTurnout, earlyVoteRatio, switchRate, partyCount } = params;

  const trueProbs   = partyRates.map((r) => r / 100);
  // 변심율: 사전·본 투표 구분 없이 투표 당일 s 확률로 다른 정당 선택
  const votingProbs = applySwitch(trueProbs, switchRate, partyCount);

  // 각 개인이 독립적으로 투표 여부를 결정 → 실제 투표자 수가 매번 달라짐
  const totalVoters = simulateCount(totalPopulation, voterTurnout / 100);
  // 투표자 각자가 독립적으로 사전/본 투표 여부를 결정
  const earlyTotal  = simulateCount(totalVoters, earlyVoteRatio / 100);
  const mainTotal   = totalVoters - earlyTotal;

  const regions: RegionResult[] = REGION_DATA.map((r) => {
    const w = r.weight / 100;
    // 지역별 커스텀 지지율이 있으면 사용, 없으면 전국 지지율 사용
    const customRates = params.regionPartyRates[r.id];
    const regionProbs = customRates
      ? applySwitch(customRates.map((v) => v / 100), switchRate, partyCount)
      : votingProbs;
    const earlyCount = simulateCount(earlyTotal, w);
    const mainCount  = simulateCount(mainTotal,  w);
    return {
      id:             r.id,
      nameKr:         r.nameKr,
      earlyVoteRates: simulatePartyVotes(earlyCount, regionProbs),
      mainVoteRates:  simulatePartyVotes(mainCount,  regionProbs),
      earlyVoteCount: earlyCount,
      mainVoteCount:  mainCount,
    };
  });

  // 전체 결과 = 지역별 결과의 가중합
  const earlyVoteRates = computeWeightedRates(regions, 'early');
  const mainVoteRates  = computeWeightedRates(regions, 'main');

  return {
    earlyVoteRates,
    mainVoteRates,
    earlyVoteTotal: earlyTotal,
    mainVoteTotal:  mainTotal,
    regions,
  };
}
