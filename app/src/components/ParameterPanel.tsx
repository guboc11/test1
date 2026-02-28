import { useEffect, useRef, useState } from 'react';
import { PARTY_COLORS, PARTY_LABELS, adjustPartyRates } from '../types';
import type { SimulationParams } from '../types';

interface Props {
  params: SimulationParams;
  onChange: (p: SimulationParams) => void;
  onRun: () => void;
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
  onLockToggle?: () => void;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step = 1, unit = '%', decimals, note, color, locked, editable, scale = 'linear', ticks, onLockToggle, onChange }: SliderProps) {
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
        disabled={locked}
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

const POPULATION_MAX     = 51_000_000;
const POPULATION_VOTER_MAX = 44_251_919; // 2024년 제22대 국회의원선거 선거인수
const POPULATION_TICKS: Tick[] = [
  { value: 100_000,    label: '10만'   },
  { value: 1_000_000,  label: '100만'  },
  { value: 10_000_000, label: '1000만' },
  { value: 44_251_919, label: '4425만' },
];

export default function ParameterPanel({ params, onChange, onRun }: Props) {
  const [locked, setLocked] = useState<boolean[]>(Array(5).fill(false));
  const [showFloating, setShowFloating] = useState(false);
  const runBtnRef       = useRef<HTMLButtonElement>(null);
  const settingsDialogRef = useRef<HTMLDialogElement>(null);

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

  const set = (key: keyof Omit<SimulationParams, 'partyRates'>) => (v: number) =>
    onChange({ ...params, [key]: v });

  const setPartyRate = (index: number) => (v: number) =>
    onChange({ ...params, partyRates: adjustPartyRates(params.partyRates, index, v, locked) });

  const toggleLock = (index: number) => () =>
    setLocked((prev) => prev.map((v, i) => (i === index ? !v : v)));

  const totalCheck = Math.round(params.partyRates.reduce((s, v) => s + v, 0));

  const formContent = (
    <>
      <div className="section-label">
        정당 지지율
        <span className={`total-badge ${totalCheck === 100 ? 'ok' : 'err'}`}>
          합계 {totalCheck}%
        </span>
      </div>
      <div className="party-grid">
        {PARTY_LABELS.map((label, i) => (
          <Slider
            key={label}
            label={`${label}당`}
            value={parseFloat(params.partyRates[i].toFixed(1))}
            min={0}
            max={100}
            step={0.1}
            decimals={1}
            editable
            color={PARTY_COLORS[i]}
            locked={locked[i]}
            onLockToggle={toggleLock(i)}
            onChange={setPartyRate(i)}
          />
        ))}
      </div>

      <div className="section-label" style={{ marginTop: '1.2rem' }}>투표 설정</div>
      <div className="param-grid">
        <Slider label="투표 참여 확률"  value={params.voterTurnout}   min={1} max={100} onChange={set('voterTurnout')} />
        <Slider label="사전 투표 확률" value={params.earlyVoteRatio} min={1} max={99}  onChange={set('earlyVoteRatio')} />
        <Slider label="변심할 확률"    value={params.switchRate}     min={0} max={10}  onChange={set('switchRate')} />
        <Slider
          label="전체 인구"
          value={params.totalPopulation}
          min={10_000}
          max={POPULATION_MAX}
          unit="명"
          scale="log"
          ticks={POPULATION_TICKS}
          onChange={(v) => set('totalPopulation')(Math.min(v, POPULATION_VOTER_MAX))}
        />
      </div>
    </>
  );

  return (
    <>
      <div className="panel">
        <h2>파라미터 설정</h2>
        {formContent}
        <button ref={runBtnRef} className="run-btn" onClick={onRun}>
          시뮬레이션 실행
        </button>
      </div>

      {showFloating && (
        <div className="floating-btns">
          <button
            className="float-settings-btn"
            onClick={() => settingsDialogRef.current?.showModal()}
          >
            ⚙ 설정
          </button>
          <button className="run-btn run-btn-floating" onClick={onRun}>
            시뮬레이션 실행
          </button>
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
          <button
            className="run-btn"
            style={{ marginTop: '1.5rem' }}
            onClick={() => { onRun(); settingsDialogRef.current?.close(); }}
          >
            시뮬레이션 실행
          </button>
        </div>
      </dialog>
    </>
  );
}
