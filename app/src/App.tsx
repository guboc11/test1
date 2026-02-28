import { useRef, useState } from 'react';
import type { SimulationParams, SimulationResult, RegionResult } from './types';
import { partyDisplayName } from './types';
import { runSimulation, REGION_DATA } from './simulation';
import ParameterPanel from './components/ParameterPanel';
import VoteResult from './components/VoteResult';
import KoreaMap from './components/KoreaMap';
import StatsSummary from './components/StatsSummary';
import type { ElectionDataset } from './data/electionData';
import './App.css';

const DEFAULT_PARAMS: SimulationParams = {
  totalPopulation: 10_000,
  partyRates: [20, 20, 20, 20, 20],
  voterTurnout: 70,
  earlyVoteRatio: 30,
  switchRate: 3,
  regionPartyRates: {},
  partyLabels: ['A', 'B', 'C', 'D', 'E'],
  partyColors: ['#3b82f6', '#ef4444', '#22c55e', '#f97316', '#a855f7'],
  partyCount: 5,
};

function buildRealResult(election: ElectionDataset): SimulationResult {
  const hasEarly = election.earlyTotal > 0;

  const regions: RegionResult[] = REGION_DATA.map((r) => {
    const earlyRates = hasEarly
      ? (election.earlyRegionRates[r.id] ?? election.earlyNationalRates).map((v) => v / 100)
      : (election.mainRegionRates[r.id]  ?? election.mainNationalRates).map((v) => v / 100);
    const mainRates = (election.mainRegionRates[r.id] ?? election.mainNationalRates).map((v) => v / 100);
    return {
      id:             r.id,
      nameKr:         r.nameKr,
      earlyVoteRates: earlyRates,
      mainVoteRates:  mainRates,
      earlyVoteCount: election.earlyRegionTotals[r.id] ?? 0,
      mainVoteCount:  election.mainRegionTotals[r.id]  ?? 0,
    };
  });

  return {
    earlyVoteRates: hasEarly
      ? election.earlyNationalRates.map((v) => v / 100)
      : election.mainNationalRates.map((v) => v / 100),
    mainVoteRates:  election.mainNationalRates.map((v) => v / 100),
    earlyVoteTotal: election.earlyTotal,
    mainVoteTotal:  election.mainTotal,
    regions,
  };
}

function InfoDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  return (
    <dialog
      ref={dialogRef}
      className="info-dialog"
      onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
    >
      <div className="info-dialog-inner">
        <div className="info-dialog-header">
          <h2>기능 설명</h2>
          <button className="dialog-close-btn" onClick={() => dialogRef.current?.close()}>✕</button>
        </div>

        <section className="info-section">
          <h3>대수의 법칙이란?</h3>
          <p>
            독립적인 시행을 충분히 많이 반복하면, 표본 평균이 모집단의 실제 확률에 수렴합니다.
            사전 투표와 본 투표는 같은 유권자 모집단에서 표본을 뽑는 행위이므로,
            표본이 클수록 두 결과가 비슷해집니다.
          </p>
        </section>

        <section className="info-section">
          <h3>4겹 확률 구조</h3>
          <div className="info-layers">
            <div className="info-layer">
              <span className="layer-num">1</span>
              <div>
                <strong>투표 참여</strong>
                <p>각 개인이 독립적으로 <em>투표 참여 확률</em>로 투표 여부를 결정합니다.<br />
                실제 투표자 수 ~ <code>B(N, p)</code></p>
              </div>
            </div>
            <div className="info-layer">
              <span className="layer-num">2</span>
              <div>
                <strong>사전 / 본 투표 선택</strong>
                <p>투표자 각자가 독립적으로 <em>사전 투표 확률</em>로 사전 투표 여부를 결정합니다.<br />
                사전 투표자 수 ~ <code>B(V, q)</code></p>
              </div>
            </div>
            <div className="info-layer">
              <span className="layer-num">3</span>
              <div>
                <strong>정당 선택 (정당 지지율 = 개인 수준 확률)</strong>
                <p><em>정당 지지율</em>은 임의의 유권자 1명이 해당 정당을 선택할 확률입니다.<br />
                각 정당별 득표 수 ~ <code>B(n, p<sub>i</sub>)</code>, 합산 후 정규화</p>
              </div>
            </div>
            <div className="info-layer">
              <span className="layer-num">4</span>
              <div>
                <strong>변심</strong>
                <p>사전·본 투표 구분 없이, 투표 당일 <em>변심할 확률</em> s로 지지 정당 대신 무작위 정당을 선택합니다.<br />
                실제 투표 확률 = <code>(1−s)·p<sub>i</sub> + s·(1/5)</code></p>
              </div>
            </div>
          </div>
          <p className="info-note">
            표본 크기 n이 클수록 네 층 모두 실제 확률에 수렴합니다.
            인구를 줄이면 모든 층이 크게 요동치고, 늘리면 모두 수렴하는 것을 확인할 수 있습니다.
          </p>
        </section>

        <section className="info-section">
          <h3>변심율 공식</h3>
          <p>
            사전·본 투표 모두, 투표 당일 확률 <em>s</em>로 원래 지지 정당 대신 다른 정당을 선택합니다.<br />
            변심율 <em>s</em>를 적용한 실제 투표 확률:
          </p>
          <div className="info-formula">
            P<sub>투표</sub>(i) = (1 − s) × p<sub>i</sub> + s × 1/5
          </div>
          <p className="info-note">
            s = 0이면 지지율 그대로 반영. s가 클수록 모든 정당이 20%로 회귀합니다.<br />
            사전·본 투표 모두 동일한 확률 구조이므로, 두 결과의 차이는 순전히 표본 크기 차이에서 비롯됩니다.
          </p>
        </section>

        <section className="info-section">
          <h3>사용 라이브러리</h3>
          <ul className="info-libs">
            <li><strong>React 19 + TypeScript</strong> — UI 프레임워크</li>
            <li><strong>Vite</strong> — 빌드 도구</li>
            <li><strong>@svg-maps/south-korea</strong> — 대한민국 17개 시도 SVG 경로 데이터 <em>(CC BY 4.0)</em></li>
            <li><strong>pnpm</strong> — 패키지 매니저</li>
          </ul>
        </section>
      </div>
    </dialog>
  );
}

export default function App() {
  const [params, setParams] = useState<SimulationParams>(DEFAULT_PARAMS);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [resultType, setResultType] = useState<'simulation' | 'real'>('simulation');
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleRun() {
    setResult(runSimulation(params));
    setResultType('simulation');
  }

  function handleShowReal(election: ElectionDataset) {
    setResult(buildRealResult(election));
    setResultType('real');
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="title-row">
          <h1>대수의 법칙 — 선거 시뮬레이션</h1>
          <button className="info-btn" onClick={() => dialogRef.current?.showModal()}>
            기능 설명
          </button>
        </div>
        <p className="subtitle">
          표본이 충분히 크면 사전 투표와 본 투표 모두 실제 지지율에 수렴합니다.
        </p>
      </header>

      <InfoDialog dialogRef={dialogRef} />

      <ParameterPanel params={params} onChange={setParams} onRun={handleRun} onShowReal={handleShowReal} result={result} resultType={resultType} />

      {result && (
        <>
          <StatsSummary result={result} partyLabels={params.partyLabels} partyColors={params.partyColors} partyCount={params.partyCount} resultType={resultType} />

          {(() => {
            const hideEarly = resultType === 'real' && result.earlyVoteTotal === 0;
            return (
              <>
                <section className="results-section">
                  <div style={hideEarly ? { opacity: 0.35, pointerEvents: 'none', filter: 'grayscale(1)' } : undefined}>
                    <VoteResult
                      title={resultType === 'real' ? '사전 투표 (실제)' : '사전 투표'}
                      voteRates={result.earlyVoteRates} total={result.earlyVoteTotal}
                      partyLabels={params.partyLabels} partyColors={params.partyColors} partyCount={params.partyCount}
                    />
                  </div>
                  <VoteResult
                    title={resultType === 'real' ? '본 투표 (실제)' : '본 투표'}
                    voteRates={result.mainVoteRates}  total={result.mainVoteTotal}
                    partyLabels={params.partyLabels} partyColors={params.partyColors} partyCount={params.partyCount}
                  />
                </section>

                <section className="map-section">
                  <h2 className="map-section-title">지역별 결과</h2>
                  <div className="map-dual">
                    <div style={hideEarly ? { opacity: 0.35, pointerEvents: 'none', filter: 'grayscale(1)' } : undefined}>
                      <KoreaMap result={result} view="early" title={resultType === 'real' ? '사전 투표 (실제)' : '사전 투표'} partyLabels={params.partyLabels} partyColors={params.partyColors} partyCount={params.partyCount} />
                    </div>
                    <KoreaMap result={result} view="main"  title={resultType === 'real' ? '본 투표 (실제)' : '본 투표'}   partyLabels={params.partyLabels} partyColors={params.partyColors} partyCount={params.partyCount} />
                  </div>
                  <div className="map-legend">
                    {params.partyLabels.slice(0, params.partyCount).map((label, i) => (
                      <div key={label} className="map-legend-item">
                        <span className="map-legend-dot" style={{ background: params.partyColors[i] }} />
                        {partyDisplayName(label)}
                      </div>
                    ))}
                  </div>
                </section>
              </>
            );
          })()}
        </>
      )}
    </div>
  );
}
