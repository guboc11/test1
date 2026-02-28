export const PARTY_LABELS = ['A', 'B', 'C', 'D', 'E'] as const;
export const PARTY_COLORS = ['#3b82f6', '#ef4444', '#22c55e', '#f97316', '#a855f7'] as const;
export const NUM_PARTIES = 5;

/** A–E 단일 문자이면 '당' 접미, 실제 정당명이면 그대로 반환 */
export function partyDisplayName(label: string): string {
  return /^[A-E]$/.test(label) ? `${label}당` : label;
}

export interface SimulationParams {
  totalPopulation: number;
  partyRates: number[];       // 5개, 합계 100 (inactive 슬롯은 0)
  voterTurnout: number;       // 0–100
  earlyVoteRatio: number;     // 0–100 (사전 투표 비율)
  switchRate: number;         // 0–100 (변심율)
  regionPartyRates: Record<string, number[]>; // regionId → 5개 배열, 합계 100
  partyLabels: string[];      // 5개 (inactive 슬롯은 기본 라벨 'D','E' 등)
  partyColors: string[];      // 5개 hex color
  partyCount: number;         // 1–5, 활성 정당 수
}

export interface RegionResult {
  id: string;
  nameKr: string;
  earlyVoteRates: number[];  // [A,B,C,D,E] 합계 1
  mainVoteRates: number[];
  earlyVoteCount: number;
  mainVoteCount: number;
}

export interface SimulationResult {
  earlyVoteRates: number[];
  mainVoteRates: number[];
  earlyVoteTotal: number;
  mainVoteTotal: number;
  regions: RegionResult[];
}

/** 표준정규분포 누적함수 근사 (Abramowitz & Stegun) */
function erfc(x: number): number {
  const t    = 1 / (1 + 0.3275911 * x);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  return poly * Math.exp(-x * x);
}

/** z-값 → 양측 p-값 (우연히 이만큼 튈 확률) */
export function pValue(z: number): number {
  return erfc(Math.abs(z) / Math.sqrt(2));
}

/** 카이제곱 분포 상위 꼬리 p-값 (Wilson-Hilferty 근사) */
export function chiSquarePValue(chi2: number, df: number): number {
  if (df <= 0 || chi2 <= 0) return 1;
  const h     = 1 - 2 / (9 * df);
  const sigma = Math.sqrt(2 / (9 * df));
  const z     = ((chi2 / df) ** (1 / 3) - h) / sigma;
  if (z <= 0) return 1;
  return erfc(z / Math.sqrt(2)) / 2;
}

/** p-값 → 퍼센트 문자열 */
export function fmtPValue(p: number): string {
  const pct = p * 100;
  if (pct < 0.001)  return '<0.001%';
  if (pct < 0.1)    return `${pct.toFixed(3)}%`;
  if (pct < 1)      return `${pct.toFixed(2)}%`;
  return `${pct.toFixed(1)}%`;
}

/**
 * 슬라이더 조작 시 잠금되지 않은 나머지 정당 비율을 비례 재조정하여 합계 100 유지
 * locked[i] === true 인 정당은 값을 고정
 */
export function adjustPartyRates(
  rates: number[],
  changedIndex: number,
  newValue: number,
  locked: boolean[],
): number[] {
  // 잠긴 정당(변경 대상 제외)의 합
  const lockedSum = rates.reduce((s, r, i) => (locked[i] && i !== changedIndex ? s + r : s), 0);
  // 변경값이 잠긴 정당 합을 넘지 않도록 클램프
  const clamped = Math.max(0, Math.min(100 - lockedSum, newValue));
  const remaining = 100 - clamped - lockedSum;

  // 자유 정당 (변경 대상도, 잠금도 아닌 정당)
  const freeIndices = rates.map((_, i) => i).filter((i) => i !== changedIndex && !locked[i]);
  const freeTotal = freeIndices.reduce((s, i) => s + rates[i], 0);

  return rates.map((r, i) => {
    if (i === changedIndex) return clamped;
    if (locked[i]) return r;
    if (freeTotal === 0) return remaining / freeIndices.length;
    return Math.max(0, (r / freeTotal) * remaining);
  });
}
