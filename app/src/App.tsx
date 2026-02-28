import { useState } from 'react';
import type { SimulationParams, SimulationResult } from './types';
import { PARTY_COLORS, PARTY_LABELS } from './types';
import { runSimulation } from './simulation';
import ParameterPanel from './components/ParameterPanel';
import VoteResult from './components/VoteResult';
import KoreaMap from './components/KoreaMap';
import './App.css';

const DEFAULT_PARAMS: SimulationParams = {
  totalPopulation: 51_000_000,
  partyRates: [30, 25, 20, 15, 10],
  voterTurnout: 70,
  earlyVoteRatio: 30,
  switchRate: 3,
};

export default function App() {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [result, setResult] = useState<SimulationResult | null>(null);
  function handleRun() {
    setResult(runSimulation(params));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>대수의 법칙 — 선거 시뮬레이션</h1>
        <p className="subtitle">
          표본이 충분히 크면 사전 투표와 본 투표 모두 실제 지지율에 수렴합니다.
        </p>
      </header>

      <ParameterPanel params={params} onChange={setParams} onRun={handleRun} />

      {result && (
        <>
          <section className="results-section">
            <VoteResult title="사전 투표" voteRates={result.earlyVoteRates} total={result.earlyVoteTotal} />
            <VoteResult title="본 투표"   voteRates={result.mainVoteRates}  total={result.mainVoteTotal}  />
          </section>

          <section className="map-section">
            <h2 className="map-section-title">지역별 결과</h2>
            <div className="map-dual">
              <KoreaMap result={result} view="early" title="사전 투표" />
              <KoreaMap result={result} view="main"  title="본 투표" />
            </div>
            <div className="map-legend">
              {PARTY_LABELS.map((label, i) => (
                <div key={label} className="map-legend-item">
                  <span className="map-legend-dot" style={{ background: PARTY_COLORS[i] }} />
                  {label}당
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
