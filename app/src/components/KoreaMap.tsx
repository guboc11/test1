import { useEffect, useRef, useState } from 'react';
import SouthKorea from '@svg-maps/south-korea';
import { partyDisplayName } from '../types';
import type { SimulationResult } from '../types';

interface SvgLocation {
  id: string;
  name: string;
  path: string;
}

interface Center {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface HoverInfo {
  x: number;
  y: number;
  nameKr: string;
  rates: number[];
  count: number;
}

interface Props {
  result: SimulationResult;
  view: 'early' | 'main';
  title: string;
  partyLabels: string[];
  partyColors: string[];
  partyCount: number;
  showLegend?: boolean;
}

const COMPETITIVE_THRESHOLD = 0.01;
const TOOLTIP_W = 190;
const TOOLTIP_H = 160;

function analyzeRegion(rates: number[]) {
  const sorted = rates
    .map((rate, index) => ({ rate, index }))
    .sort((a, b) => b.rate - a.rate);
  const first  = sorted[0];
  const second = sorted[1];
  return { first, second, isCompetitive: first.rate - second.rate < COMPETITIVE_THRESHOLD };
}

function getSolidColor(rates: number[], partyColors: string[]): string {
  const { first } = analyzeRegion(rates);
  const opacity = 0.3 + Math.min(first.rate * 2, 1) * 0.7;
  const hex = partyColors[first.index];
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${opacity.toFixed(2)})`;
}

function patternId(i1: number, i2: number) {
  return `stripe-${i1}-${i2}`;
}

function collectPatterns(
  locations: SvgLocation[],
  regionMap: Map<string, { earlyVoteRates: number[]; mainVoteRates: number[]; earlyVoteCount: number; mainVoteCount: number }>,
  view: 'early' | 'main',
  partyColors: string[],
): Map<string, { c1: string; c2: string }> {
  const patterns = new Map<string, { c1: string; c2: string }>();
  locations.forEach((loc) => {
    const region = regionMap.get(loc.id);
    const rates  = region ? (view === 'early' ? region.earlyVoteRates : region.mainVoteRates) : null;
    const count  = region ? (view === 'early' ? region.earlyVoteCount : region.mainVoteCount) : 0;
    if (!rates || count === 0) return;
    const { first, second, isCompetitive } = analyzeRegion(rates);
    if (!isCompetitive) return;
    const id = patternId(first.index, second.index);
    if (!patterns.has(id)) {
      patterns.set(id, { c1: partyColors[first.index], c2: partyColors[second.index] });
    }
  });
  return patterns;
}

// "경합중" 레이블을 보여주기에 충분한 최소 너비
const MIN_LABEL_WIDTH = 28;

export default function KoreaMap({ result, view, title, partyLabels, partyColors, partyCount, showLegend = false }: Props) {
  const regionMap = new Map(result.regions.map((r) => [r.id, r]));
  const locations = SouthKorea.locations as SvgLocation[];
  const patterns  = collectPatterns(locations, regionMap, view, partyColors);

  const svgRef = useRef<SVGSVGElement>(null);
  const [centers, setCenters] = useState<Map<string, Center>>(new Map());
  const [hover, setHover] = useState<HoverInfo | null>(null);

  // 마운트 후 각 지역 경로의 바운딩 박스 중심을 계산
  useEffect(() => {
    if (!svgRef.current) return;
    const map = new Map<string, Center>();
    svgRef.current.querySelectorAll<SVGPathElement>('[data-region-id]').forEach((el) => {
      const id   = el.getAttribute('data-region-id')!;
      const bbox = el.getBBox();
      map.set(id, {
        x: bbox.x + bbox.width  / 2,
        y: bbox.y + bbox.height / 2,
        w: bbox.width,
        h: bbox.height,
      });
    });
    setCenters(map);
  }, []); // 경로 위치는 고정이므로 마운트 시 1회만 계산

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

  const sortedParties = hover
    ? partyLabels
        .slice(0, partyCount)
        .map((label, i) => ({
          label,
          color: partyColors[i],
          rate:  hover.rates[i],
          count: Math.round(hover.count * hover.rates[i]),
        }))
        .sort((a, b) => b.rate - a.rate)
    : [];

  return (
    <div className="map-wrapper">
      <h3 className="map-title">{title}</h3>
      <svg
        ref={svgRef}
        viewBox={SouthKorea.viewBox}
        className="korea-svg"
        aria-label="대한민국 지도"
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          {Array.from(patterns.entries()).map(([id, { c1, c2 }]) => (
            <pattern
              key={id}
              id={id}
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <rect x="0"  width="14" height="28" fill={c1} />
              <rect x="14" width="14" height="28" fill={c2} />
            </pattern>
          ))}
        </defs>

        {/* 지역 경로 */}
        {locations.map((loc) => {
          const region = regionMap.get(loc.id);
          const rates  = region
            ? (view === 'early' ? region.earlyVoteRates : region.mainVoteRates)
            : Array(5).fill(1 / partyCount) as number[];
          const count  = region
            ? (view === 'early' ? region.earlyVoteCount : region.mainVoteCount)
            : 0;
          const nameKr = region?.nameKr ?? loc.name;

          const { first, second, isCompetitive } = analyzeRegion(rates);
          const fill = count === 0
            ? '#e5e7eb'
            : isCompetitive
              ? `url(#${patternId(first.index, second.index)})`
              : getSolidColor(rates, partyColors);

          return (
            <g key={loc.id}>
              <path
                data-region-id={loc.id}
                d={loc.path}
                fill={fill}
                stroke="#fff"
                strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
                onMouseEnter={(e) => setHover({ x: e.clientX, y: e.clientY, nameKr: isCompetitive ? `${nameKr} (경합중)` : nameKr, rates, count })}
                onMouseMove={(e)  => setHover((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : prev)}
              />
            </g>
          );
        })}

        {/* 경합중 레이블 */}
        {locations.map((loc) => {
          const region = regionMap.get(loc.id);
          const rates  = region
            ? (view === 'early' ? region.earlyVoteRates : region.mainVoteRates)
            : Array(5).fill(1 / partyCount) as number[];

          const count2 = region ? (view === 'early' ? region.earlyVoteCount : region.mainVoteCount) : 0;
          const { isCompetitive } = analyzeRegion(rates);
          const center = centers.get(loc.id);
          if (!isCompetitive || count2 === 0 || !center || center.w < MIN_LABEL_WIDTH) return null;

          const LW = 27, LH = 12, LR = 3;
          return (
            <g key={`label-${loc.id}`} pointerEvents="none">
              <rect
                x={center.x - LW / 2}
                y={center.y - LH / 2}
                width={LW}
                height={LH}
                rx={LR}
                fill="white"
                fillOpacity={0.88}
              />
              <text
                x={center.x}
                y={center.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="8"
                fontWeight="700"
                fill="#374151"
              >
                경합중
              </text>
            </g>
          );
        })}
      </svg>

      {/* 플로팅 툴팁 */}
      {hover && (
        <div className="map-tooltip" style={tooltipStyle(hover.x, hover.y)}>
          <div className="map-tooltip-title">{hover.nameKr}</div>
          <div className="map-tooltip-total">총 {hover.count.toLocaleString()}표</div>
          {sortedParties.map((p) => (
            <div key={p.label} className="map-tooltip-row">
              <span className="map-tooltip-dot" style={{ background: p.color }} />
              <span className="map-tooltip-party">{partyDisplayName(p.label)}</span>
              <span className="map-tooltip-pct">{(p.rate * 100).toFixed(1)}%</span>
              <span className="map-tooltip-count">{p.count.toLocaleString()}표</span>
            </div>
          ))}
        </div>
      )}

      {showLegend && (
        <div className="map-legend">
          {partyLabels.slice(0, partyCount).map((label, i) => (
            <div key={label} className="map-legend-item">
              <span className="map-legend-dot" style={{ background: partyColors[i] }} />
              {partyDisplayName(label)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
