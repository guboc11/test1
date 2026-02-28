import { useState } from 'react';
import { partyDisplayName } from '../types';

interface Props {
  title: string;
  voteRates: number[];  // 5개, 합계 1
  total: number;
  partyLabels: string[];
  partyColors: string[];
  partyCount: number;
}

const TOOLTIP_W = 190;
const TOOLTIP_H = 160;

export default function VoteResult({ title, voteRates, total, partyLabels, partyColors, partyCount }: Props) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  const activeRates = voteRates.slice(0, partyCount);
  const sorted = activeRates
    .map((rate, i) => ({
      label: partyLabels[i],
      color: partyColors[i],
      rate,
      count: Math.round(total * rate),
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
        {activeRates.map((rate, i) => (
          <div
            key={partyLabels[i]}
            className="bar-segment"
            style={{ width: `${rate * 100}%`, background: partyColors[i] }}
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
              <span className="map-tooltip-party">{partyDisplayName(p.label)}</span>
              <span className="map-tooltip-pct">{(p.rate * 100).toFixed(1)}%</span>
              <span className="map-tooltip-count">{p.count.toLocaleString()}표</span>
            </div>
          ))}
        </div>
      )}

      <div className="bar-legend">
        {activeRates.map((rate, i) => (
          <div key={partyLabels[i]} className="legend-item">
            <span className="legend-dot" style={{ background: partyColors[i] }} />
            <span style={{ color: partyColors[i], fontWeight: 600 }}>
              {partyDisplayName(partyLabels[i])}
            </span>
            <span className="legend-pct">{(rate * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
