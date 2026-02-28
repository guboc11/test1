import { useState } from 'react';
import { PARTY_COLORS, PARTY_LABELS } from '../types';

interface Props {
  title: string;
  voteRates: number[];  // [A,B,C,D,E] 합계 1
  total: number;
}

const TOOLTIP_W = 190;
const TOOLTIP_H = 160;

export default function VoteResult({ title, voteRates, total }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const sorted = PARTY_LABELS
    .map((label, i) => ({
      label,
      color: PARTY_COLORS[i],
      rate:  voteRates[i],
      count: Math.round(total * voteRates[i]),
    }))
    .sort((a, b) => b.rate - a.rate);

  function tooltipStyle(x: number, y: number): React.CSSProperties {
    const flipX = x + 16 + TOOLTIP_W > window.innerWidth;
    const flipY = y + 16 + TOOLTIP_H > window.innerHeight;
    return {
      position: 'fixed',
      left: flipX ? x - 12 - TOOLTIP_W : x + 16,
      top:  flipY ? y - 12 - TOOLTIP_H : y + 16,
      pointerEvents: 'none',
      zIndex: 1000,
    };
  }

  return (
    <div className="vote-card">
      <h3>{title}</h3>
      <p className="vote-total">총 {total.toLocaleString()}명</p>

      <div
        className="bar-container"
        onMouseEnter={(e) => setPos({ x: e.clientX, y: e.clientY })}
        onMouseMove={(e)  => setPos({ x: e.clientX, y: e.clientY })}
        onMouseLeave={() => setPos(null)}
        style={{ cursor: 'default' }}
      >
        {voteRates.map((rate, i) => (
          <div
            key={PARTY_LABELS[i]}
            className="bar-segment"
            style={{ width: `${rate * 100}%`, background: PARTY_COLORS[i] }}
          />
        ))}
      </div>

      {pos && (
        <div className="map-tooltip" style={tooltipStyle(pos.x, pos.y)}>
          <div className="map-tooltip-title">{title}</div>
          <div className="map-tooltip-total">총 {total.toLocaleString()}표</div>
          {sorted.map((p) => (
            <div key={p.label} className="map-tooltip-row">
              <span className="map-tooltip-dot" style={{ background: p.color }} />
              <span className="map-tooltip-party">{p.label}당</span>
              <span className="map-tooltip-pct">{(p.rate * 100).toFixed(1)}%</span>
              <span className="map-tooltip-count">{p.count.toLocaleString()}표</span>
            </div>
          ))}
        </div>
      )}

      <div className="bar-legend">
        {voteRates.map((rate, i) => (
          <div key={PARTY_LABELS[i]} className="legend-item">
            <span className="legend-dot" style={{ background: PARTY_COLORS[i] }} />
            <span style={{ color: PARTY_COLORS[i], fontWeight: 600 }}>
              {PARTY_LABELS[i]}당
            </span>
            <span className="legend-pct">{(rate * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
