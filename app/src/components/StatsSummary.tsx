import { useRef } from 'react';
import { partyDisplayName, pValue, fmtPValue, chiSquarePValue } from '../types';
import type { SimulationResult } from '../types';

interface Props {
  result: SimulationResult;
  partyLabels: string[];
  partyColors: string[];
  partyCount: number;
  resultType: 'simulation' | 'real';
}

function fmtPct(v: number, decimals = 2) {
  return `${(v * 100).toFixed(decimals)}%`;
}

function zClass(z: number) {
  const a = Math.abs(z);
  return a < 1.96 ? 'good' : a < 2.58 ? 'warn' : 'bad';
}

function pClass(p: number) {
  return p >= 0.05 ? 'good' : 'bad';
}

export default function StatsSummary({ result, partyLabels, partyColors, partyCount, resultType }: Props) {
  const { earlyVoteRates, mainVoteRates, earlyVoteTotal, mainVoteTotal } = result;
  const dialogRef = useRef<HTMLDialogElement>(null);

  const activeEarly = earlyVoteRates.slice(0, partyCount);
  const activeMain  = mainVoteRates.slice(0, partyCount);
  const n_e = Math.max(earlyVoteTotal, 1);
  const n_m = Math.max(mainVoteTotal,  1);
  const N   = n_e + n_m;

  // ── 수렴 지표 ──
  const maxDiff        = Math.max(...activeEarly.map((e, i) => Math.abs(e - activeMain[i])));
  const totalVar       = 0.5 * activeEarly.reduce((s, e, i) => s + Math.abs(e - activeMain[i]), 0);
  const earlyWinnerIdx = activeEarly.indexOf(Math.max(...activeEarly));
  const mainWinnerIdx  = activeMain.indexOf(Math.max(...activeMain));
  const winnerMatch    = earlyWinnerIdx === mainWinnerIdx;

  // ── 정당별 z-test + χ² 기여 ──
  const partyStats = activeEarly.map((r_e, i) => {
    const r_m      = activeMain[i];
    const p_pooled = (r_e * n_e + r_m * n_m) / N;
    const seDiff   = Math.sqrt(p_pooled * (1 - p_pooled) * (1 / n_e + 1 / n_m));
    const z        = seDiff > 0 ? (r_e - r_m) / seDiff : 0;
    const p        = pValue(Math.abs(z));
    const colSum   = r_e * n_e + r_m * n_m;
    const chi2i    = colSum === 0 || earlyVoteTotal === 0 ? 0 : (() => {
      const exp_e = n_e * colSum / N;
      const exp_m = n_m * colSum / N;
      return (r_e * n_e - exp_e) ** 2 / exp_e + (r_m * n_m - exp_m) ** 2 / exp_m;
    })();
    return { label: partyLabels[i], color: partyColors[i], r_e, r_m, z, p, chi2i };
  });

  // ── 카이제곱 검정 (전체 분포) ──
  const df = partyCount - 1;
  const chi2 = earlyVoteTotal === 0 ? 0 : activeEarly.reduce((s, r_e, i) => {
    const r_m   = activeMain[i];
    const colSum = r_e * n_e + r_m * n_m;
    if (colSum === 0) return s;
    const exp_e = n_e * colSum / N;
    const exp_m = n_m * colSum / N;
    const obs_e = r_e * n_e;
    const obs_m = r_m * n_m;
    return s + (obs_e - exp_e) ** 2 / exp_e + (obs_m - exp_m) ** 2 / exp_m;
  }, 0);
  const chi2p = df > 0 ? chiSquarePValue(chi2, df) : 1;

  return (
    <>
      <div className="stats-summary">
        {/* 수렴 카드 */}
        <div className="stats-card">
          <div className="stats-card-title">
            {resultType === 'real' ? '실제 결과 비교' : '수렴'}
          </div>
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
                ? `○  ${partyDisplayName(partyLabels[earlyWinnerIdx])}`
                : `✗  사전 ${partyDisplayName(partyLabels[earlyWinnerIdx])} → 본 ${partyDisplayName(partyLabels[mainWinnerIdx])}`}
            </span>
          </div>
        </div>

        {/* 통계적 유의성 카드 */}
        <div className="stats-card">
          <div className="stats-card-title-row">
            <span className="stats-card-title">
              {resultType === 'real' ? '통계적 유의성' : '통계적 유의성'}
            </span>
            <button className="party-stats-btn" onClick={() => dialogRef.current?.showModal()}>
              정당별 보기
            </button>
          </div>
          <div className="stats-row">
            <span className="stats-label">χ² 값</span>
            <span className={`stats-value ${pClass(chi2p)}`}>{chi2.toFixed(2)}</span>
          </div>
          <div className="stats-row">
            <span className="stats-label">자유도 (df)</span>
            <span className="stats-value">{df}</span>
          </div>
          <div className="stats-row">
            <span className="stats-label">p 값</span>
            <span className={`stats-value ${pClass(chi2p)}`}>{fmtPValue(chi2p)}</span>
          </div>
        </div>
      </div>

      {/* 정당별 통계 모달 */}
      <dialog
        ref={dialogRef}
        className="party-stats-dialog"
        onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
      >
        <div className="party-stats-dialog-inner">
          <div className="party-stats-dialog-header">
            <h2>정당별 통계적 유의성</h2>
            <button className="dialog-close-btn" onClick={() => dialogRef.current?.close()}>✕</button>
          </div>
          <table className="party-stats-table">
            <thead>
              <tr>
                <th>정당</th>
                <th>사전 득표율</th>
                <th>본 득표율</th>
                <th>χ² 기여</th>
                <th>z 값</th>
                <th>p 값</th>
              </tr>
            </thead>
            <tbody>
              {partyStats.map((s) => (
                <tr key={s.label}>
                  <td>
                    <span className="party-stats-dot" style={{ background: s.color }} />
                    {partyDisplayName(s.label)}
                  </td>
                  <td>{fmtPct(s.r_e, 1)}</td>
                  <td>{fmtPct(s.r_m, 1)}</td>
                  <td className={pClass(s.p)}>{s.chi2i.toFixed(2)}</td>
                  <td className={zClass(s.z)}>{s.z.toFixed(2)}</td>
                  <td className={pClass(s.p)}>{fmtPValue(s.p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="party-stats-note">
            z 값: |z| &lt; 1.96 = 정상, 1.96–2.58 = 주의, ≥ 2.58 = 비정상<br />
            p 값: ≥ 5% = 정상, &lt; 5% = 유의한 차이
          </p>
        </div>
      </dialog>
    </>
  );
}
