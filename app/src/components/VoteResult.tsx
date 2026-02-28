import { PARTY_COLORS, PARTY_LABELS } from '../types';

interface Props {
  title: string;
  voteRates: number[];  // [A,B,C,D,E] 합계 1
  total: number;
}

export default function VoteResult({ title, voteRates, total }: Props) {
  return (
    <div className="vote-card">
      <h3>{title}</h3>
      <p className="vote-total">총 {total.toLocaleString()}명</p>

      <div className="bar-container">
        {voteRates.map((rate, i) => (
          <div
            key={PARTY_LABELS[i]}
            className="bar-segment"
            style={{ width: `${rate * 100}%`, background: PARTY_COLORS[i] }}
            title={`${PARTY_LABELS[i]}당 ${(rate * 100).toFixed(2)}%`}
          />
        ))}
      </div>

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
