import { useState } from 'react';
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
  color?: string;
  locked?: boolean;
  scale?: 'linear' | 'log';
  ticks?: Tick[];
  onLockToggle?: () => void;
  onChange: (v: number) => void;
}

function Slider({ label, value, min, max, step = 1, unit = '%', color, locked, scale = 'linear', ticks, onLockToggle, onChange }: SliderProps) {
  const isLog = scale === 'log';

  const toSlider   = (v: number) => isLog ? Math.log10(Math.max(v, 1)) : v;
  const fromSlider = (v: string) => isLog ? Math.round(Math.pow(10, Number(v))) : Number(v);

  const sMin   = toSlider(min);
  const sMax   = toSlider(max);
  const sValue = toSlider(value);
  const sStep  = isLog ? 0.001 : step;

  return (
    <div className="slider-row">
      <div className="slider-label">
        <div className="slider-label-left">
          <span style={color ? { color, fontWeight: 600 } : undefined}>{label}</span>
        </div>
        <div className="slider-label-right">
          <strong>{value.toLocaleString()}{unit}</strong>
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

const POPULATION_MAX = 51_000_000;
const POPULATION_TICKS: Tick[] = [
  { value: 100_000,    label: '10만'   },
  { value: 1_000_000,  label: '100만'  },
  { value: 10_000_000, label: '1000만' },
];

export default function ParameterPanel({ params, onChange, onRun }: Props) {
  const [locked, setLocked] = useState<boolean[]>(Array(5).fill(false));

  const set = (key: keyof Omit<SimulationParams, 'partyRates'>) => (v: number) =>
    onChange({ ...params, [key]: v });

  const setPartyRate = (index: number) => (v: number) =>
    onChange({ ...params, partyRates: adjustPartyRates(params.partyRates, index, v, locked) });

  const toggleLock = (index: number) => () =>
    setLocked((prev) => prev.map((v, i) => (i === index ? !v : v)));

  const totalCheck = Math.round(params.partyRates.reduce((s, v) => s + v, 0));

  return (
    <div className="panel">
      <h2>파라미터 설정</h2>

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
            value={Math.round(params.partyRates[i])}
            min={0}
            max={100}
            color={PARTY_COLORS[i]}
            locked={locked[i]}
            onLockToggle={toggleLock(i)}
            onChange={setPartyRate(i)}
          />
        ))}
      </div>

      <div className="section-label" style={{ marginTop: '1.2rem' }}>투표 설정</div>
      <div className="param-grid">
        <Slider label="투표 참여 확률"   value={params.voterTurnout}    min={1} max={100} onChange={set('voterTurnout')} />
        <Slider label="사전 투표 확률"  value={params.earlyVoteRatio}  min={1} max={99}  onChange={set('earlyVoteRatio')} />
        <Slider label="변심할 확률"     value={params.switchRate}      min={0} max={50}  onChange={set('switchRate')} />
        <Slider
          label="전체 인구"
          value={params.totalPopulation}
          min={10_000}
          max={POPULATION_MAX}
          unit="명"
          scale="log"
          ticks={POPULATION_TICKS}
          onChange={set('totalPopulation')}
        />
      </div>

      <button className="run-btn" onClick={onRun}>
        시뮬레이션 실행
      </button>
    </div>
  );
}
