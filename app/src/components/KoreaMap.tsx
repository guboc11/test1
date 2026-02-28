import SouthKorea from '@svg-maps/south-korea';
import { PARTY_COLORS, PARTY_LABELS } from '../types';
import type { SimulationResult } from '../types';

interface SvgLocation {
  id: string;
  name: string;
  path: string;
}

interface Props {
  result: SimulationResult;
  view: 'early' | 'main';
  title: string;
  showLegend?: boolean;
}

/** 1위 정당의 색으로 채우되, 득표율이 높을수록 진하게 */
function getRegionColor(rates: number[]): string {
  const winnerIndex = rates.indexOf(Math.max(...rates));
  const winRate = rates[winnerIndex];
  // 최소 불투명도 0.3, 최대 1.0 (50%이상 득표 시)
  const opacity = 0.3 + Math.min(winRate * 2, 1) * 0.7;
  const hex = PARTY_COLORS[winnerIndex];
  // hex → rgb
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity.toFixed(2)})`;
}

export default function KoreaMap({ result, view, title, showLegend = false }: Props) {
  const regionMap = new Map(result.regions.map((r) => [r.id, r]));

  return (
    <div className="map-wrapper">
      <h3 className="map-title">{title}</h3>
      <svg
        viewBox={SouthKorea.viewBox}
        className="korea-svg"
        aria-label="대한민국 지도"
      >
        {(SouthKorea.locations as SvgLocation[]).map((loc) => {
          const region = regionMap.get(loc.id);
          const rates = region
            ? view === 'early' ? region.earlyVoteRates : region.mainVoteRates
            : Array(5).fill(0.2);
          const count = region
            ? view === 'early' ? region.earlyVoteCount : region.mainVoteCount
            : 0;
          const winnerIdx = rates.indexOf(Math.max(...rates));

          return (
            <g key={loc.id}>
              <path
                d={loc.path}
                fill={getRegionColor(rates)}
                stroke="#fff"
                strokeWidth="1.5"
              />
              <title>
                {region?.nameKr ?? loc.name} — {PARTY_LABELS[winnerIdx]}당 1위{' '}
                {(rates[winnerIdx] * 100).toFixed(1)}% ({count.toLocaleString()}명)
              </title>
            </g>
          );
        })}
      </svg>

      {showLegend && (
        <div className="map-legend">
          {PARTY_LABELS.map((label, i) => (
            <div key={label} className="map-legend-item">
              <span className="map-legend-dot" style={{ background: PARTY_COLORS[i] }} />
              {label}당
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
