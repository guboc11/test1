import { useEffect, useRef, useState } from 'react';
import { PARTY_COLORS, PARTY_LABELS, adjustPartyRates, partyDisplayName } from '../types';
import type { SimulationParams } from '../types';
import { REGION_DATA } from '../simulation';
import { ELECTION_DATASETS } from '../data/electionData';
import type { ElectionDataset } from '../data/electionData';

interface Props {
  params: SimulationParams;
  onChange: (p: SimulationParams) => void;
  onRun: () => void;
  onShowReal: (election: ElectionDataset) => void;
}

interface Tick {
  value: number;
  label: string;
}

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  decimals?: number;
  note?: string;
  color?: string;
  locked?: boolean;
  editable?: boolean;
  scale?: 'linear' | 'log';
  ticks?: Tick[];
  noThumb?: boolean;
  onLockToggle?: () => void;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step = 1, unit = '%', decimals, note, color, locked, editable, scale = 'linear', ticks, noThumb, onLockToggle, onChange }: SliderProps) {
  const isLog = scale === 'log';
  const [draft, setDraft] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toSlider   = (v: number) => isLog ? Math.log10(Math.max(v, 1e-10)) : v;
  const fromSlider = (v: string) => {
    if (!isLog) return Number(v);
    const raw = Math.pow(10, Number(v));
    return decimals !== undefined ? parseFloat(raw.toFixed(decimals)) : Math.round(raw);
  };

  const sMin   = toSlider(min);
  const sMax   = toSlider(max);
  const sValue = toSlider(value);
  const sStep  = isLog ? 0.001 : step;

  const displayValue = decimals !== undefined
    ? value.toFixed(decimals)
    : value.toLocaleString();

  function commitDraft() {
    if (draft === null) return;
    const parsed = parseFloat(draft);
    if (!isNaN(parsed)) {
      const clamped = Math.min(Math.max(parsed, min), max);
      const result = decimals !== undefined
        ? parseFloat(clamped.toFixed(decimals))
        : Math.round(clamped);
      onChange(result);
    }
    setDraft(null);
  }

  return (
    <div className="slider-row">
      <div className="slider-label">
        <div className="slider-label-left">
          <span style={color ? { color, fontWeight: 600 } : undefined}>{label}</span>
        </div>
        <div className="slider-label-right">
          {editable ? (
            <>
              <input
                ref={inputRef}
                className="slider-value-input"
                type="number"
                min={min}
                max={max}
                step={decimals !== undefined ? Math.pow(10, -decimals) : 1}
                value={draft ?? displayValue}
                disabled={locked}
                onChange={(e) => setDraft(e.target.value)}
                onBlur={commitDraft}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') { commitDraft(); inputRef.current?.blur(); }
                  if (e.key === 'Escape') { setDraft(null); inputRef.current?.blur(); }
                }}
              />
              <span className="slider-value-unit">{unit}</span>
            </>
          ) : (
            <strong>{displayValue}{unit}</strong>
          )}
          {note && <span className="slider-note">{note}</span>}
          {onLockToggle && (
            <label className="lock-checkbox">
              <input
                type="checkbox"
                checked={locked ?? false}
                onChange={onLockToggle}
              />
              고정
            </label>
          )}
        </div>
      </div>
      <input
        type="range"
        min={sMin}
        max={sMax}
        step={sStep}
        value={sValue}
        disabled={locked || noThumb}
        className={noThumb ? 'no-thumb' : undefined}
        style={{
          '--fill-pct': `${((sValue - sMin) / (sMax - sMin)) * 100}%`,
          ...(color ? { '--party-color': color } : {}),
        } as React.CSSProperties}
        onChange={(e) => onChange(fromSlider(e.target.value))}
      />
      {ticks && ticks.length > 0 && (
        <div className="slider-ticks">
          {ticks.map((tick) => {
            const pct = ((toSlider(tick.value) - sMin) / (sMax - sMin)) * 100;
            return (
              <span
                key={tick.value}
                className="slider-tick-label"
                style={{ left: `${pct}%` }}
              >
                {tick.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

function randomizeRegionRates(globalRates: number[], partyCount: number): number[] {
  const STRENGTH = 0.9;
  const active = globalRates.slice(0, partyCount);
  const base  = active.map((r) => Math.log(Math.max(r, 0.5)));
  const noisy = base.map((v) => v + (Math.random() * 2 - 1) * STRENGTH);
  const exp   = noisy.map((v) => Math.exp(v));
  const sum   = exp.reduce((s, v) => s + v, 0);
  const raw   = exp.map((v) => Math.round((v / sum * 100) * 10) / 10);
  const diff  = parseFloat((100 - raw.reduce((s, v) => s + v, 0)).toFixed(1));
  raw[0]      = parseFloat((raw[0] + diff).toFixed(1));
  return [...raw, ...Array(5 - partyCount).fill(0)];
}

/** 선거 데이터를 SimulationParams에 적용 */
function buildElectionParams(election: ElectionDataset, base: SimulationParams): SimulationParams {
  const n = election.parties.length;
  // nationalRate 합산 보정
  const rawRates = election.parties.map((p) => p.nationalRate);
  const sum      = rawRates.reduce((s, v) => s + v, 0);
  const rates    = rawRates.map((r) => parseFloat((r / sum * 100).toFixed(1)));
  const diff     = parseFloat((100 - rates.reduce((s, v) => s + v, 0)).toFixed(1));
  rates[0]       = parseFloat((rates[0] + diff).toFixed(1));

  const partyRates  = [...rates, ...Array(5 - n).fill(0)];
  const partyLabels = [...election.parties.map((p) => p.name), ...Array.from(PARTY_LABELS).slice(n)];
  const partyColors = [...election.parties.map((p) => p.color), ...Array.from(PARTY_COLORS).slice(n)];

  // 지역별 비율은 이미 n개 원소. 5개로 패딩
  const regionPartyRates: Record<string, number[]> = {};
  for (const [rid, rr] of Object.entries(election.regionRates)) {
    regionPartyRates[rid] = [...rr, ...Array(5 - rr.length).fill(0)];
  }

  // 실제 투표 통계 적용
  const voterTotal      = election.earlyTotal + election.mainTotal;
  const voterTurnout    = election.electorateTotal > 0
    ? Math.min(100, Math.max(1, Math.round(voterTotal / election.electorateTotal * 100)))
    : base.voterTurnout;
  const earlyVoteRatio  = election.earlyTotal > 0
    ? Math.min(99, Math.max(1, Math.round(election.earlyTotal / voterTotal * 100)))
    : 0;
  const totalPopulation = Math.min(election.electorateTotal || voterTotal, POPULATION_VOTER_MAX);

  return { ...base, partyRates, partyLabels, partyColors, partyCount: n, regionPartyRates, voterTurnout, earlyVoteRatio, totalPopulation, switchRate: 0 };
}

const POPULATION_MAX       = 51_000_000;
const POPULATION_VOTER_MAX = 44_251_919;
const POPULATION_TICKS: Tick[] = [
  { value: 100_000,    label: '10만'   },
  { value: 1_000_000,  label: '100만'  },
  { value: 10_000_000, label: '1000만' },
  { value: 44_251_919, label: '4425만' },
];

type ElectionType = 'presidential' | 'assembly-pr' | 'assembly-district';
const ELECTION_TYPE_LABELS: Record<ElectionType, string> = {
  'presidential':      '대선',
  'assembly-pr':       '총선 비례',
  'assembly-district': '총선 지역구',
};

function ElectionModal({
  dialogRef,
  onApply,
}: {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  onApply: (election: ElectionDataset) => void;
}) {
  const [activeType, setActiveType] = useState<ElectionType>('presidential');
  const types: ElectionType[] = ['presidential', 'assembly-pr', 'assembly-district'];
  const filtered = ELECTION_DATASETS.filter((e) => e.type === activeType)
    .sort((a, b) => b.year - a.year);

  return (
    <dialog
      ref={dialogRef}
      className="election-dialog"
      onClick={(e) => { if (e.target === e.currentTarget) dialogRef.current?.close(); }}
    >
      <div className="election-dialog-inner">
        <div className="election-dialog-header">
          <h2>선거 데이터 선택</h2>
          <button className="dialog-close-btn" onClick={() => dialogRef.current?.close()}>✕</button>
        </div>

        <div className="election-type-tabs">
          {types.map((t) => (
            <button
              key={t}
              className={`election-type-tab${activeType === t ? ' active' : ''}`}
              onClick={() => setActiveType(t)}
            >
              {ELECTION_TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        <div className="election-list">
          {filtered.map((election) => (
            <button
              key={election.id}
              className="election-item"
              onClick={() => { onApply(election); dialogRef.current?.close(); }}
            >
              <div className="election-item-name">{election.name}</div>
              <div className="election-item-parties">
                {election.parties.map((p) => (
                  <span key={p.name} className="election-item-party">
                    <span className="election-item-dot" style={{ background: p.color }} />
                    {p.name} {p.nationalRate}%
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}

export default function ParameterPanel({ params, onChange, onRun, onShowReal }: Props) {
  const [locked, setLocked] = useState<boolean[]>(Array(5).fill(false));
  const [appliedElection, setAppliedElection] = useState<ElectionDataset | null>(null);
  const [showFloating, setShowFloating] = useState(false);
  const [showAdv, setShowAdv] = useState(false);
  const [activeRegionId, setActiveRegionId] = useState(REGION_DATA[0].id);
  const [lockedRegion, setLockedRegion] = useState<Record<string, boolean[]>>(
    Object.fromEntries(REGION_DATA.map((r) => [r.id, Array(5).fill(false)])),
  );
  const runBtnRef         = useRef<HTMLButtonElement>(null);
  const settingsDialogRef = useRef<HTMLDialogElement>(null);
  const electionDialogRef = useRef<HTMLDialogElement>(null);
  const releaseDialogRef  = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = runBtnRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowFloating(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const set = (key: keyof Omit<SimulationParams, 'partyRates' | 'partyLabels' | 'partyColors' | 'partyCount' | 'regionPartyRates'>) => (v: number) =>
    onChange({ ...params, [key]: v });

  // inactive 슬롯(i >= partyCount)은 잠금 처리
  const effectiveLocked = (i: number) => locked[i] || i >= params.partyCount;

  const setPartyRate = (index: number) => (v: number) => {
    const newRates    = adjustPartyRates(params.partyRates, index, v, locked.map((l, i) => l || i >= params.partyCount));
    const deltas      = newRates.map((r, i) => r - params.partyRates[i]);

    // 지역별 커스텀 비율도 같은 델타만큼 이동 후 클램핑·정규화
    const newRegionPartyRates: Record<string, number[]> = {};
    for (const [rid, regionRates] of Object.entries(params.regionPartyRates)) {
      const lk      = (lockedRegion[rid] ?? Array(5).fill(false)).map((l: boolean, i: number) => l || i >= params.partyCount);
      const shifted = regionRates.map((r, i) => (lk[i] ? r : Math.max(0, r + deltas[i])));
      // 합계가 100이 되도록 자유 슬롯 비례 정규화
      const lockedSum = shifted.reduce((s, r, i) => (lk[i] ? s + r : s), 0);
      const freeSum   = shifted.reduce((s, r, i) => (lk[i] ? s : s + r), 0);
      const target    = Math.max(0, 100 - lockedSum);
      const normalized = shifted.map((r, i) =>
        lk[i] ? r : (freeSum > 0 ? parseFloat(((r / freeSum) * target).toFixed(1)) : target / shifted.filter((_, j) => !lk[j]).length),
      );
      // 반올림 오차 보정
      const diff = parseFloat((100 - normalized.reduce((s, v) => s + v, 0)).toFixed(1));
      const firstFree = normalized.findIndex((_, i) => !lk[i]);
      if (firstFree >= 0) normalized[firstFree] = parseFloat((normalized[firstFree] + diff).toFixed(1));
      newRegionPartyRates[rid] = normalized;
    }

    onChange({ ...params, partyRates: newRates, regionPartyRates: newRegionPartyRates });
  };

  const toggleLock = (index: number) => () => {
    if (appliedElection) { releaseDialogRef.current?.showModal(); return; }
    setLocked((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const totalCheck = Math.round(params.partyRates.reduce((s, v) => s + v, 0));

  const setRegionRate = (regionId: string, index: number, v: number) => {
    const current = params.regionPartyRates[regionId] ?? params.partyRates;
    const lk      = (lockedRegion[regionId] ?? Array(5).fill(false)).map((l: boolean, i: number) => l || i >= params.partyCount);
    onChange({
      ...params,
      regionPartyRates: {
        ...params.regionPartyRates,
        [regionId]: adjustPartyRates(current, index, v, lk),
      },
    });
  };

  const toggleRegionLock = (regionId: string, index: number) => {
    if (appliedElection) { releaseDialogRef.current?.showModal(); return; }
    setLockedRegion((prev) => ({
      ...prev,
      [regionId]: (prev[regionId] ?? Array(5).fill(false)).map((v: boolean, i: number) => (i === index ? !v : v)),
    }));
  };

  const resetRegion = (regionId: string) => {
    const { [regionId]: _, ...rest } = params.regionPartyRates;
    onChange({ ...params, regionPartyRates: rest });
    setLockedRegion((prev) => ({ ...prev, [regionId]: Array(5).fill(false) }));
  };

  const resetAllRegions = () => {
    onChange({ ...params, regionPartyRates: {} });
    setLockedRegion(Object.fromEntries(REGION_DATA.map((r) => [r.id, Array(5).fill(false)])));
  };

  const randomizeAllRegions = () => {
    onChange({
      ...params,
      regionPartyRates: Object.fromEntries(
        REGION_DATA.map((r) => [r.id, randomizeRegionRates(params.partyRates, params.partyCount)]),
      ),
    });
  };

  const handleRandomize = () => {
    // 정당 지지율: 로그-정규 노이즈로 합계 100% 유지
    const raw  = Array(5).fill(0).map(() => Math.exp(Math.random() * 2.5 - 1.25));
    const sum  = raw.reduce((s, v) => s + v, 0);
    const rates = raw.map((v) => parseFloat((v / sum * 100).toFixed(1)));
    const diff  = parseFloat((100 - rates.reduce((s, v) => s + v, 0)).toFixed(1));
    rates[0]    = parseFloat((rates[0] + diff).toFixed(1));

    // 투표 설정
    const voterTurnout   = Math.round(40 + Math.random() * 45);        // 40–85%
    const earlyVoteRatio = Math.round(10 + Math.random() * 40);        // 10–50%
    const switchRate     = parseFloat((Math.random() * 5).toFixed(1)); // 0–5%

    // 전체 인구: 로그-균등 분포
    const logMin        = Math.log10(10_000);
    const logMax        = Math.log10(POPULATION_VOTER_MAX);
    const totalPopulation = Math.round(Math.pow(10, logMin + Math.random() * (logMax - logMin)));

    // 지역별 지지율
    const regionPartyRates = Object.fromEntries(
      REGION_DATA.map((r) => [r.id, randomizeRegionRates(rates, 5)]),
    );

    setLocked(Array(5).fill(false));
    setLockedRegion(Object.fromEntries(REGION_DATA.map((r) => [r.id, Array(5).fill(false)])));
    onChange({ ...params, partyRates: rates, voterTurnout, earlyVoteRatio, switchRate, totalPopulation, regionPartyRates });
  };

  const handleApplyElection = (election: ElectionDataset) => {
    const n = election.parties.length;
    setLocked(Array(5).fill(false).map((_, i) => i < n));
    setLockedRegion(Object.fromEntries(REGION_DATA.map((r) => [r.id, Array(5).fill(false).map((_, i) => i < n)])));
    setAppliedElection(election);
    onChange(buildElectionParams(election, params));
    onShowReal(election);
  };

  // "기본값으로" 버튼: A~E 완전 초기화
  const handleResetToDefaults = () => {
    setLocked(Array(5).fill(false));
    setLockedRegion(Object.fromEntries(REGION_DATA.map((r) => [r.id, Array(5).fill(false)])));
    setAppliedElection(null);
    onChange({
      ...params,
      partyLabels: ['A', 'B', 'C', 'D', 'E'],
      partyColors: Array.from(PARTY_COLORS),
      partyCount: 5,
      partyRates: [20, 20, 20, 20, 20],
      regionPartyRates: {},
    });
  };

  // "해제하고 수정" 버튼: 이름·색깔만 A~E 초기화, 지지율·투표 수치는 그대로 유지
  const handleReleaseElection = () => {
    setLocked(Array(5).fill(false));
    setLockedRegion(Object.fromEntries(REGION_DATA.map((r) => [r.id, Array(5).fill(false)])));
    setAppliedElection(null);
    onChange({
      ...params,
      partyLabels: ['A', 'B', 'C', 'D', 'E'],
      partyColors: Array.from(PARTY_COLORS),
      partyCount: 5,
    });
  };


  const partySliders = (
    <div className="party-grid">
      {Array.from({ length: params.partyCount }).map((_, i) => (
        <Slider
          key={i}
          label={partyDisplayName(params.partyLabels[i])}
          value={parseFloat(params.partyRates[i].toFixed(1))}
          min={0}
          max={100}
          step={0.1}
          decimals={1}
          editable
          color={params.partyColors[i]}
          locked={effectiveLocked(i)}
          noThumb={!!appliedElection}
          onLockToggle={toggleLock(i)}
          onChange={setPartyRate(i)}
        />
      ))}
    </div>
  );

  const formContent = (
    <>
      <div className="section-label">
        정당 지지율
        <span className={`total-badge ${totalCheck === 100 ? 'ok' : 'err'}`}>
          합계 {totalCheck}%
        </span>
        {!appliedElection && (
          <>
            <button className="randomize-inline-btn" onClick={handleRandomize}>
              🎲 랜덤 설정
            </button>
            <button className="reset-election-inline-btn" onClick={handleResetToDefaults}>
              기본값으로
            </button>
          </>
        )}
      </div>
      {partySliders}

      <div className="section-label" style={{ marginTop: '1.2rem' }}>투표 설정</div>
      <div className="param-grid">
        <Slider label={appliedElection ? '투표율'           : '투표 참여 확률'} value={params.voterTurnout}   min={1} max={100} locked={!!appliedElection} noThumb={!!appliedElection} onChange={set('voterTurnout')} />
        <Slider label={appliedElection ? '실제 사전 투표율' : '사전 투표 확률'} value={params.earlyVoteRatio} min={1} max={99}  locked={!!appliedElection} noThumb={!!appliedElection} onChange={set('earlyVoteRatio')} />
        <Slider label="변심할 확률" value={params.switchRate} min={0} max={10} locked={!!appliedElection} noThumb={!!appliedElection} onChange={set('switchRate')} />
        <Slider
          label={appliedElection ? '투표자 수' : '전체 인구'}
          value={params.totalPopulation}
          min={10_000}
          max={POPULATION_MAX}
          unit="명"
          scale="log"
          ticks={POPULATION_TICKS}
          locked={!!appliedElection}
          noThumb={!!appliedElection}
          onChange={(v) => set('totalPopulation')(Math.min(v, POPULATION_VOTER_MAX))}
        />
      </div>

      <button className="adv-btn" onClick={() => setShowAdv((v) => !v)}>
        지역별 정당 지지율 {showAdv ? '▲' : '▼'}
      </button>
    </>
  );

  const advContent = showAdv && (
    <div className="adv-inline">
      <p className="adv-desc">따로 설정하지 않은 지역은 전체 정당 지지율을 따릅니다.</p>
      {!appliedElection && (
        <div className="adv-action-row">
          <button className="adv-action-btn" onClick={randomizeAllRegions}>
            🎲 랜덤 설정
          </button>
        </div>
      )}

      <div className="region-tabs">
        {REGION_DATA.map((r) => {
          const isCustomized = !!params.regionPartyRates[r.id];
          const rates        = params.regionPartyRates[r.id] ?? params.partyRates;
          const topIdx       = rates.slice(0, params.partyCount).indexOf(Math.max(...rates.slice(0, params.partyCount)));
          const dotColor     = params.partyColors[topIdx] ?? '#94a3b8';
          return (
            <button
              key={r.id}
              className={`region-tab${activeRegionId === r.id ? ' active' : ''}${isCustomized ? ' customized' : ''}`}
              onClick={() => setActiveRegionId(r.id)}
            >
              {r.nameKr}
              <span className="region-tab-dot" style={{ background: dotColor }} />
            </button>
          );
        })}
      </div>

      {(() => {
        const region       = REGION_DATA.find((r) => r.id === activeRegionId)!;
        const isCustomized = !!params.regionPartyRates[activeRegionId];
        const rates        = params.regionPartyRates[activeRegionId] ?? params.partyRates;
        const lk           = lockedRegion[activeRegionId] ?? Array(5).fill(false);
        const total        = Math.round(rates.slice(0, params.partyCount).reduce((s, v) => s + v, 0));
        return (
          <div className="adv-region-content">
            <div className="section-label">
              {region.nameKr} 정당 지지율
              <span className={`total-badge ${total === 100 ? 'ok' : 'err'}`}>
                합계 {total}%
              </span>
              {!isCustomized && (
                <span className="region-using-global">전국 지지율 적용 중</span>
              )}
            </div>
            <div className="party-grid">
              {Array.from({ length: params.partyCount }).map((_, i) => (
                <Slider
                  key={i}
                  label={partyDisplayName(params.partyLabels[i])}
                  value={parseFloat(rates[i].toFixed(1))}
                  min={0}
                  max={100}
                  step={0.1}
                  decimals={1}
                  editable
                  color={params.partyColors[i]}
                  locked={lk[i] || i >= params.partyCount}
                  noThumb={!!appliedElection}
                  onLockToggle={() => toggleRegionLock(activeRegionId, i)}
                  onChange={(v) => setRegionRate(activeRegionId, i, v)}
                />
              ))}
            </div>
            {isCustomized && !appliedElection && (
              <button className="reset-region-btn" onClick={() => resetRegion(activeRegionId)}>
                이 지역 초기화
              </button>
            )}
          </div>
        );
      })()}

      {!appliedElection && (
        <div className="adv-footer">
          <button className="adv-reset-all-btn" onClick={resetAllRegions}>
            전체 초기화
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="panel">
        <div className="panel-title-row">
          <h2>파라미터 설정</h2>
        </div>
        {formContent}
        {advContent}
        <div className="run-btn-row">
          {appliedElection ? (
            <>
              <button className="sim-mode-btn" onClick={() => { handleReleaseElection(); onRun(); }}>
                시뮬레이션 모드 전환
              </button>
              <button ref={runBtnRef} className="real-result-btn" onClick={() => electionDialogRef.current?.showModal()}>
                {appliedElection.name}
              </button>
            </>
          ) : (
            <>
              <button ref={runBtnRef} className="run-btn" onClick={onRun}>
                시뮬레이션 실행
              </button>
              <button className="election-data-btn" onClick={() => electionDialogRef.current?.showModal()}>
                실제 선거 데이터 적용하기
              </button>
            </>
          )}
        </div>
      </div>

      {showFloating && (
        <div className="floating-btns">
          {appliedElection ? (
            <>
              <button className="sim-mode-btn run-btn-floating" onClick={() => { handleReleaseElection(); onRun(); }}>
                시뮬레이션 모드 전환
              </button>
              <button className="real-result-btn run-btn-floating" onClick={() => electionDialogRef.current?.showModal()}>
                {appliedElection.name}
              </button>
            </>
          ) : (
            <>
              <button className="float-settings-btn" onClick={() => settingsDialogRef.current?.showModal()}>
                ⚙ 설정
              </button>
              <button className="run-btn run-btn-floating" onClick={onRun}>
                시뮬레이션 실행
              </button>
            </>
          )}
        </div>
      )}

      <dialog
        ref={settingsDialogRef}
        className="settings-dialog"
        onClick={(e) => { if (e.target === e.currentTarget) settingsDialogRef.current?.close(); }}
      >
        <div className="settings-dialog-inner">
          <div className="settings-dialog-header">
            <h2>파라미터 설정</h2>
            <button className="dialog-close-btn" onClick={() => settingsDialogRef.current?.close()}>✕</button>
          </div>
          {formContent}
          {advContent}
          <div className="run-btn-row" style={{ marginTop: '1.5rem' }}>
            {appliedElection ? (
              <>
                <button className="sim-mode-btn" onClick={() => { handleReleaseElection(); onRun(); settingsDialogRef.current?.close(); }}>
                  시뮬레이션 모드 전환
                </button>
                <button
                  className="real-result-btn"
                  onClick={() => { settingsDialogRef.current?.close(); electionDialogRef.current?.showModal(); }}
                >
                  {appliedElection.name}
                </button>
              </>
            ) : (
              <>
                <button className="run-btn" onClick={() => { onRun(); settingsDialogRef.current?.close(); }}>
                  시뮬레이션 실행
                </button>
                <button className="election-data-btn" onClick={() => electionDialogRef.current?.showModal()}>
                  실제 선거 데이터 적용하기
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>

      <ElectionModal dialogRef={electionDialogRef} onApply={handleApplyElection} />

      <dialog
        ref={releaseDialogRef}
        className="release-dialog"
        onClick={(e) => { if (e.target === e.currentTarget) releaseDialogRef.current?.close(); }}
      >
        <div className="release-dialog-inner">
          <p className="release-dialog-title">실제 선거 데이터가 적용되어 있습니다</p>
          <p className="release-dialog-body">
            수정을 계속하면 실제 데이터 적용이 해제되고<br />
            A~E당 기본 모드로 초기화됩니다.
          </p>
          <div className="release-dialog-btns">
            <button className="release-cancel-btn" onClick={() => releaseDialogRef.current?.close()}>
              취소
            </button>
            <button
              className="release-ok-btn"
              onClick={() => { handleReleaseElection(); releaseDialogRef.current?.close(); }}
            >
              해제하고 수정
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
