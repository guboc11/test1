import { PARTY_LABELS } from '../types';
import type { SimulationResult } from '../types';

interface Props {
  result: SimulationResult;
}

function fmtPct(v: number, decimals = 2) {
  return `${(v * 100).toFixed(decimals)}%`;
}

export default function StatsSummary({ result }: Props) {
  const { earlyVoteRates, mainVoteRates, earlyVoteTotal, mainVoteTotal } = result;

  // A. 수렴
  const maxDiff   = Math.max(...earlyVoteRates.map((e, i) => Math.abs(e - mainVoteRates[i])));
  const totalVar  = 0.5 * earlyVoteRates.reduce((s, e, i) => s + Math.abs(e - mainVoteRates[i]), 0);
  const earlyWinnerIdx = earlyVoteRates.indexOf(Math.max(...earlyVoteRates));
  const mainWinnerIdx  = mainVoteRates.indexOf(Math.max(...mainVoteRates));
  const winnerMatch    = earlyWinnerIdx === mainWinnerIdx;

  // B. 정밀도 (사전 투표 1위 정당 기준)
  const p        = earlyVoteRates[earlyWinnerIdx];
  const seEarly  = Math.sqrt((p * (1 - p)) / Math.max(earlyVoteTotal, 1));
  const seMain   = Math.sqrt((p * (1 - p)) / Math.max(mainVoteTotal,  1));
  const ci95Early = 1.96 * seEarly;

  return (
    <div className="stats-summary">
      <div className="stats-card">
        <div className="stats-card-title">수렴</div>
        <div className="stats-row">
          <span className="stats-label">최대 차이</span>
          <span className="stats-value">{fmtPct(maxDiff)}p</span>
        </div>
        <div className="stats-row">
          <span className="stats-label">총 변동 거리</span>
          <span className="stats-value">{fmtPct(totalVar)}</span>
        </div>
        <div className="stats-row">
          <span className="stats-label">1위 정당 일치</span>
          <span className={`stats-value ${winnerMatch ? 'good' : 'bad'}`}>
            {winnerMatch
              ? `○  ${PARTY_LABELS[earlyWinnerIdx]}당`
              : `✗  사전 ${PARTY_LABELS[earlyWinnerIdx]}당 → 본 ${PARTY_LABELS[mainWinnerIdx]}당`}
          </span>
        </div>
      </div>

      <div className="stats-card">
        <div className="stats-card-title">정밀도 ({PARTY_LABELS[earlyWinnerIdx]}당 기준)</div>
        <div className="stats-row">
          <span className="stats-label">표준오차 (사전)</span>
          <span className="stats-value">±{fmtPct(seEarly)}</span>
        </div>
        <div className="stats-row">
          <span className="stats-label">표준오차 (본)</span>
          <span className="stats-value">±{fmtPct(seMain)}</span>
        </div>
        <div className="stats-row">
          <span className="stats-label">95% CI (사전)</span>
          <span className="stats-value">±{fmtPct(ci95Early)}</span>
        </div>
      </div>
    </div>
  );
}
