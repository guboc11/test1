import { useEffect, useRef, useState } from 'react';
import SouthKorea from '@svg-maps/south-korea';
import { PARTY_COLORS, PARTY_LABELS } from '../types';
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

interface Props {
  result: SimulationResult;
  view: 'early' | 'main';
  title: string;
  showLegend?: boolean;
}

const COMPETITIVE_THRESHOLD = 0.03;

function analyzeRegion(rates: number[]) {
  const sorted = rates
    .map((rate, index) => ({ rate, index }))
    .sort((a, b) => b.rate - a.rate);
  const first  = sorted[0];
  const second = sorted[1];
  return { first, second, isCompetitive: first.rate - second.rate < COMPETITIVE_THRESHOLD };
}

function getSolidColor(rates: number[]): string {
  const { first } = analyzeRegion(rates);
  const opacity = 0.3 + Math.min(first.rate * 2, 1) * 0.7;
  const hex = PARTY_COLORS[first.index];
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
  regionMap: Map<string, { earlyVoteRates: number[]; mainVoteRates: number[] }>,
  view: 'early' | 'main',
): Map<string, { c1: string; c2: string }> {
  const patterns = new Map<string, { c1: string; c2: string }>();
  locations.forEach((loc) => {
    const region = regionMap.get(loc.id);
    const rates  = region ? (view === 'early' ? region.earlyVoteRates : region.mainVoteRates) : null;
    if (!rates) return;
    const { first, second, isCompetitive } = analyzeRegion(rates);
    if (!isCompetitive) return;
    const id = patternId(first.index, second.index);
    if (!patterns.has(id)) {
      patterns.set(id, { c1: PARTY_COLORS[first.index], c2: PARTY_COLORS[second.index] });
    }
  });
  return patterns;
}

// "경합중" 레이블을 보여주기에 충분한 최소 너비
const MIN_LABEL_WIDTH = 28;

export default function KoreaMap({ result, view, title, showLegend = false }: Props) {
  const regionMap = new Map(result.regions.map((r) => [r.id, r]));
  const locations = SouthKorea.locations as SvgLocation[];
  const patterns  = collectPatterns(
    locations,
    regionMap as Map<string, { earlyVoteRates: number[]; mainVoteRates: number[] }>,
    view,
  );

  const svgRef = useRef<SVGSVGElement>(null);
  const [centers, setCenters] = useState<Map<string, Center>>(new Map());

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

  return (
    <div className="map-wrapper">
      <h3 className="map-title">{title}</h3>
      <svg
        ref={svgRef}
        viewBox={SouthKorea.viewBox}
        className="korea-svg"
        aria-label="대한민국 지도"
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
            : Array(5).fill(0.2) as number[];
          const count  = region
            ? (view === 'early' ? region.earlyVoteCount : region.mainVoteCount)
            : 0;

          const { first, second, isCompetitive } = analyzeRegion(rates);
          const fill = isCompetitive
            ? `url(#${patternId(first.index, second.index)})`
            : getSolidColor(rates);

          const tooltip = isCompetitive
            ? `${region?.nameKr ?? loc.name} — 경합 (${PARTY_LABELS[first.index]}당 ${(first.rate * 100).toFixed(1)}% vs ${PARTY_LABELS[second.index]}당 ${(second.rate * 100).toFixed(1)}%) (${count.toLocaleString()}명)`
            : `${region?.nameKr ?? loc.name} — ${PARTY_LABELS[first.index]}당 1위 ${(first.rate * 100).toFixed(1)}% (${count.toLocaleString()}명)`;

          return (
            <g key={loc.id}>
              <path
                data-region-id={loc.id}
                d={loc.path}
                fill={fill}
                stroke="#fff"
                strokeWidth="1.5"
              />
              <title>{tooltip}</title>
            </g>
          );
        })}

        {/* 경합중 레이블 */}
        {locations.map((loc) => {
          const region = regionMap.get(loc.id);
          const rates  = region
            ? (view === 'early' ? region.earlyVoteRates : region.mainVoteRates)
            : Array(5).fill(0.2) as number[];

          const { isCompetitive } = analyzeRegion(rates);
          const center = centers.get(loc.id);
          if (!isCompetitive || !center || center.w < MIN_LABEL_WIDTH) return null;

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
