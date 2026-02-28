import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_FILE  = join(__dirname, '../app/src/data/electionData.ts');

// ─── 지역 ID 매핑 ────────────────────────────────────────────────────────────
const REGION_MAP = {
  '서울특별시': 'seoul',    '서울': 'seoul',
  '부산광역시': 'busan',    '부산': 'busan',
  '대구광역시': 'daegu',    '대구': 'daegu',
  '인천광역시': 'incheon',  '인천': 'incheon',
  '광주광역시': 'gwangju',  '광주': 'gwangju',
  '대전광역시': 'daejeon',  '대전': 'daejeon',
  '울산광역시': 'ulsan',    '울산': 'ulsan',
  '세종특별자치시': 'sejong',
  '경기도': 'gyeonggi',     '경기': 'gyeonggi',
  '강원도': 'gangwon',      '강원': 'gangwon',
  '강원특별자치도': 'gangwon',
  '충청북도': 'north-chungcheong', '충북': 'north-chungcheong',
  '충청남도': 'south-chungcheong', '충남': 'south-chungcheong',
  '전라북도': 'north-jeolla',      '전북': 'north-jeolla',
  '전북특별자치도': 'north-jeolla',
  '전라남도': 'south-jeolla',      '전남': 'south-jeolla',
  '경상북도': 'north-gyeongsang',  '경북': 'north-gyeongsang',
  '경상남도': 'south-gyeongsang',  '경남': 'south-gyeongsang',
  '제주특별자치도': 'jeju',         '제주': 'jeju',
};

// ─── 위성정당 통합 ────────────────────────────────────────────────────────────
const SATELLITE_MAP = {
  '더불어시민당':   '더불어민주당',
  '미래한국당':     '국민의힘',
  '더불어민주연합': '더불어민주당',
  '국민의미래':     '국민의힘',
};

// ─── 정당 색상 ────────────────────────────────────────────────────────────────
const PARTY_COLORS = {
  '더불어민주당': '#004EA2',
  '국민의힘':     '#C9151E',
  '조국혁신당':   '#00A0D2',
  '개혁신당':     '#FF7210',
  '정의당':       '#FFED00',
  '녹색정의당':   '#00B451',
  '국민의당':     '#EA5504',
  '바른미래당':   '#0067C0',
  '새누리당':     '#C9151E',
  '자유한국당':   '#C9151E',
  '미래통합당':   '#C9151E',
  '민주통합당':   '#004EA2',
  '민주당':       '#004EA2',
  '새정치민주연합':'#004EA2',
  '한나라당':     '#C9151E',
  '열린우리당':   '#FFCC00',
  '민주노동당':   '#F37021',
  '진보신당':     '#F37021',
  '통합진보당':   '#EF4723',
  '새천년민주당': '#004EA2',
  '대통합민주신당': '#004EA2',
  '기타':         '#94a3b8',
};
const DEFAULT_COLOR = '#94a3b8';

// ─── 스킵 라벨 ────────────────────────────────────────────────────────────────
const SKIP_LABELS = new Set([
  '선거인수', '투표수', '무효투표수', '기권자수', '무효 투표수', '기권수',
  '계', '소계', '합계',
]);

// ─── 선거 목록 ────────────────────────────────────────────────────────────────
const ELECTIONS = [
  { file: '제16대 대통령선거 개표결과.csv',           id: 'presidential-16',      name: '16대 대선 (2002)', type: 'presidential',      year: 2002, encoding: 'utf-8', colType: 'candidate' },
  { file: '제17대 대통령선거 개표결과.csv',           id: 'presidential-17',      name: '17대 대선 (2007)', type: 'presidential',      year: 2007, encoding: 'utf-8', colType: 'candidate' },
  { file: '제18대 대통령선거 개표결과.csv',           id: 'presidential-18',      name: '18대 대선 (2012)', type: 'presidential',      year: 2012, encoding: 'utf-8', colType: 'candidate' },
  { file: '제19대 대통령선거 개표결과.csv',           id: 'presidential-19',      name: '19대 대선 (2017)', type: 'presidential',      year: 2017, encoding: 'utf-8', colType: 'candidate' },
  { file: '제20대 대통령선거 개표결과.csv',           id: 'presidential-20',      name: '20대 대선 (2022)', type: 'presidential',      year: 2022, encoding: 'utf-8', colType: 'candidate' },
  { file: '제21대 대통령선거 개표결과.csv',           id: 'presidential-21',      name: '21대 대선 (2025)', type: 'presidential',      year: 2025, encoding: 'utf-8', colType: 'candidate' },
  { file: '제19대 비례대표국회의원선거 개표결과.csv', id: 'assembly-pr-19',        name: '19대 총선 비례 (2012)', type: 'assembly-pr', year: 2012, encoding: 'euc-kr', colType: 'party' },
  { file: '제20대 비례대표국회의원선거 개표결과.csv', id: 'assembly-pr-20',        name: '20대 총선 비례 (2016)', type: 'assembly-pr', year: 2016, encoding: 'euc-kr', colType: 'party' },
  { file: '제21대 비례대표국회의원선거 개표결과.csv', id: 'assembly-pr-21',        name: '21대 총선 비례 (2020)', type: 'assembly-pr', year: 2020, encoding: 'euc-kr', colType: 'party' },
  { file: '제22대 비례대표국회의원선거 개표결과.csv', id: 'assembly-pr-22',        name: '22대 총선 비례 (2024)', type: 'assembly-pr', year: 2024, encoding: 'euc-kr', colType: 'party' },
  { file: '제19대 국회의원선거 개표결과.csv',         id: 'assembly-district-19', name: '19대 총선 지역구 (2012)', type: 'assembly-district', year: 2012, encoding: 'euc-kr', colType: 'candidate' },
  { file: '제20대 국회의원선거 개표결과.csv',         id: 'assembly-district-20', name: '20대 총선 지역구 (2016)', type: 'assembly-district', year: 2016, encoding: 'euc-kr', colType: 'candidate' },
  { file: '제21대 국회의원선거 개표결과.csv',         id: 'assembly-district-21', name: '21대 총선 지역구 (2020)', type: 'assembly-district', year: 2020, encoding: 'euc-kr', colType: 'candidate' },
  { file: '제22대 국회의원선거 개표결과.csv',         id: 'assembly-district-22', name: '22대 총선 지역구 (2024)', type: 'assembly-district', year: 2024, encoding: 'euc-kr', colType: 'candidate' },
];

// ─── CSV 파싱 ─────────────────────────────────────────────────────────────────
function parseCSV(buf, encoding) {
  let text;
  if (encoding === 'euc-kr') {
    text = new TextDecoder('euc-kr').decode(buf);
  } else {
    text = buf.toString('utf-8').replace(/^\uFEFF/, '');
  }

  const lines = text.split('\n');
  const rows  = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const cells = [];
    let cur = '', inQ = false;
    for (let i = 0; i < trimmed.length; i++) {
      const ch = trimmed[i];
      if (ch === '"') { inQ = !inQ; }
      else if (ch === ',' && !inQ) { cells.push(cur.trim()); cur = ''; }
      else { cur += ch; }
    }
    cells.push(cur.trim());
    rows.push(cells);
  }
  return rows;
}

// ─── 정당명 추출 ──────────────────────────────────────────────────────────────
function extractParty(raw, colType) {
  const s = raw.trim();
  if (colType === 'party') return SATELLITE_MAP[s] ?? s;
  const parts = s.split(/\s+/);
  const party = parts.length > 1 ? parts.slice(0, -1).join(' ') : s;
  return SATELLITE_MAP[party] ?? party;
}

// ─── 선거인수 추출 ────────────────────────────────────────────────────────────
// 선거인수 행은 관내사전투표·관외사전투표·거소·재외 등 모두 겹치지 않는 그룹이므로
// 전체 합산 = 실제 선거인수
function extractElectorate(rows) {
  let headerIdx = 0;
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    if (rows[i].some(c => c.includes('시도') || c.includes('정당') || c.includes('후보'))) {
      headerIdx = i;
      break;
    }
  }
  const header = rows[headerIdx];
  let partyCol = header.findIndex(h => h.includes('정당') || h.includes('후보'));
  let votesCol = header.findIndex(h => h.includes('득표수') || h.includes('득표'));
  if (partyCol < 0) partyCol = 4;
  if (votesCol < 0) votesCol = partyCol + 1;

  let total = 0;
  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length < votesCol + 1) continue;
    if (r[partyCol]?.trim() !== '선거인수') continue;
    const votes = parseInt(r[votesCol]?.replace(/,/g, '').trim() ?? '', 10);
    if (!isNaN(votes) && votes > 0) total += votes;
  }
  return total;
}

// ─── 집계 ─────────────────────────────────────────────────────────────────────
function aggregate(rows, colType) {
  let headerIdx = 0;
  for (let i = 0; i < Math.min(5, rows.length); i++) {
    if (rows[i].some(c => c.includes('시도') || c.includes('정당') || c.includes('후보'))) {
      headerIdx = i;
      break;
    }
  }

  const header     = rows[headerIdx];
  let regionCol    = header.findIndex(h => h.includes('시도'));
  let eomyeondongCol = header.findIndex(h => h.includes('읍면동'));  // 관외사전투표 판별
  let voteguCol    = header.findIndex(h => h.includes('투표구'));    // 관내사전투표 판별
  let partyCol     = header.findIndex(h => h.includes('정당') || h.includes('후보'));
  let votesCol     = header.findIndex(h => h.includes('득표수') || h.includes('득표'));
  if (regionCol  < 0) regionCol  = 0;
  if (partyCol   < 0) partyCol   = 4;
  if (votesCol   < 0) votesCol   = partyCol + 1;

  // party → { total, earlyTotal, mainTotal, byRegion: Map<id, {total, earlyTotal, mainTotal}> }
  const map = new Map();

  for (let i = headerIdx + 1; i < rows.length; i++) {
    const r = rows[i];
    if (r.length < votesCol + 1) continue;

    const rawParty  = r[partyCol]?.trim() ?? '';
    const votesStr  = r[votesCol]?.replace(/,/g, '').trim() ?? '';
    const votes     = parseInt(votesStr, 10);

    if (!rawParty || SKIP_LABELS.has(rawParty) || isNaN(votes) || votes < 0) continue;

    const party    = extractParty(rawParty, colType);
    const rawRegion = r[regionCol]?.trim() ?? '';
    const regionId  = REGION_MAP[rawRegion] ?? null;

    // 사전투표 판별
    const col2val = eomyeondongCol >= 0 ? (r[eomyeondongCol]?.trim() ?? '') : '';
    const col3val = voteguCol      >= 0 ? (r[voteguCol]?.trim()      ?? '') : '';
    const isEarly = col2val === '관외사전투표' || col3val === '관내사전투표';

    if (!map.has(party)) map.set(party, { total: 0, earlyTotal: 0, mainTotal: 0, byRegion: new Map() });
    const entry = map.get(party);
    entry.total += votes;
    if (isEarly) entry.earlyTotal += votes; else entry.mainTotal += votes;

    if (regionId) {
      if (!entry.byRegion.has(regionId)) entry.byRegion.set(regionId, { total: 0, earlyTotal: 0, mainTotal: 0 });
      const re = entry.byRegion.get(regionId);
      re.total += votes;
      if (isEarly) re.earlyTotal += votes; else re.mainTotal += votes;
    }
  }

  return map;
}

// ─── 정당 선택 (상위 4개 + 기타) ─────────────────────────────────────────────
function selectParties(map) {
  const nationalTotal = [...map.values()].reduce((s, e) => s + e.total, 0);
  if (nationalTotal === 0) return null;

  const sorted = [...map.entries()]
    .map(([name, e]) => ({ name, ...e, rate: e.total / nationalTotal * 100 }))
    .sort((a, b) => b.total - a.total);

  const top4 = sorted.filter(p => p.rate >= 1).slice(0, 4);
  if (top4.length === 0) return null;

  const top4Names   = new Set(top4.map(p => p.name));
  const otherEntries = sorted.filter(p => !top4Names.has(p.name));
  const otherTotal  = otherEntries.reduce((s, p) => s + p.total, 0);
  const otherEarly  = otherEntries.reduce((s, p) => s + p.earlyTotal, 0);
  const otherMain   = otherEntries.reduce((s, p) => s + p.mainTotal, 0);
  const otherRate   = otherTotal / nationalTotal * 100;

  const otherByRegion = new Map();
  for (const p of otherEntries) {
    for (const [rid, v] of p.byRegion) {
      if (!otherByRegion.has(rid)) otherByRegion.set(rid, { total: 0, earlyTotal: 0, mainTotal: 0 });
      const e = otherByRegion.get(rid);
      e.total      += v.total;
      e.earlyTotal += v.earlyTotal;
      e.mainTotal  += v.mainTotal;
    }
  }

  const parties = top4.map(p => ({
    name:        p.name,
    color:       PARTY_COLORS[p.name] ?? DEFAULT_COLOR,
    nationalRate: parseFloat((p.rate).toFixed(1)),
    total:       p.total,
    earlyTotal:  p.earlyTotal,
    mainTotal:   p.mainTotal,
    byRegion:    p.byRegion,
  }));

  if (otherRate >= 0.5) {
    parties.push({
      name:        '기타',
      color:       DEFAULT_COLOR,
      nationalRate: parseFloat(otherRate.toFixed(1)),
      total:       otherTotal,
      earlyTotal:  otherEarly,
      mainTotal:   otherMain,
      byRegion:    otherByRegion,
    });
  }

  return { parties, nationalTotal };
}

// ─── 비율 계산 헬퍼 ───────────────────────────────────────────────────────────
function calcRates(values) {
  const sum = values.reduce((s, v) => s + v, 0);
  if (sum === 0) return values.map(() => 0);
  const rates = values.map(v => parseFloat((v / sum * 100).toFixed(1)));
  const diff  = parseFloat((100 - rates.reduce((s, v) => s + v, 0)).toFixed(1));
  rates[0]    = parseFloat((rates[0] + diff).toFixed(1));
  return rates;
}

function padTo5(arr) {
  return [...arr, ...Array(5 - arr.length).fill(0)];
}

// ─── 지역별 비율 계산 ─────────────────────────────────────────────────────────
function calcRegionRates(parties, allRegionIds, key) {
  const regionRates = {};
  for (const rid of allRegionIds) {
    const values = parties.map(p => (p.byRegion.get(rid)?.[key] ?? 0));
    const sum    = values.reduce((s, v) => s + v, 0);
    if (sum === 0) continue;
    regionRates[rid] = padTo5(calcRates(values));
  }
  return regionRates;
}

// ─── 메인 ─────────────────────────────────────────────────────────────────────
const allRegionIds = Object.values(REGION_MAP).filter((v, i, a) => a.indexOf(v) === i);
const datasets     = [];

for (const elec of ELECTIONS) {
  const filePath = join(__dirname, elec.file);
  let buf;
  try {
    buf = readFileSync(filePath);
  } catch {
    console.warn(`파일 없음: ${elec.file}`);
    continue;
  }

  const rows            = parseCSV(buf, elec.encoding);
  const map             = aggregate(rows, elec.colType);
  const electorateTotal = extractElectorate(rows);
  const result          = selectParties(map);
  if (!result) { console.warn(`집계 실패: ${elec.file}`); continue; }

  const { parties } = result;
  const n = parties.length;

  // 전국 비율
  const overallRates = padTo5(calcRates(parties.map(p => p.total)));
  const earlyNational = padTo5(calcRates(parties.map(p => p.earlyTotal)));
  const mainNational  = padTo5(calcRates(parties.map(p => p.mainTotal)));

  const earlyTotalCount = parties.reduce((s, p) => s + p.earlyTotal, 0);
  const mainTotalCount  = parties.reduce((s, p) => s + p.mainTotal, 0);

  const regionRates      = calcRegionRates(parties, allRegionIds, 'total');
  const earlyRegionRates = calcRegionRates(parties, allRegionIds, 'earlyTotal');
  const mainRegionRates  = calcRegionRates(parties, allRegionIds, 'mainTotal');

  // 지역별 실제 득표수 (툴팁용)
  const earlyRegionTotals = {};
  const mainRegionTotals  = {};
  for (const rid of allRegionIds) {
    const et = parties.reduce((s, p) => s + (p.byRegion.get(rid)?.earlyTotal ?? 0), 0);
    const mt = parties.reduce((s, p) => s + (p.byRegion.get(rid)?.mainTotal  ?? 0), 0);
    if (et > 0) earlyRegionTotals[rid] = et;
    if (mt > 0) mainRegionTotals[rid]  = mt;
  }

  datasets.push({
    id:    elec.id,
    name:  elec.name,
    type:  elec.type,
    year:  elec.year,
    parties: parties.map(p => ({ name: p.name, color: p.color, nationalRate: p.nationalRate })),
    regionRates,
    earlyNationalRates: earlyNational,
    mainNationalRates:  mainNational,
    earlyRegionRates,
    mainRegionRates,
    earlyTotal: earlyTotalCount,
    mainTotal:  mainTotalCount,
    earlyRegionTotals,
    mainRegionTotals,
    electorateTotal,
  });

  const earlyPct = earlyTotalCount > 0 ? ` | 사전: ${parties.slice(0,n).map((p,i) => `${p.name}(${earlyNational[i]}%)`).join(', ')}` : ' | 사전투표 없음';
  console.log(`✓ ${elec.name}${earlyPct}`);
}

// ─── TypeScript 파일 출력 ─────────────────────────────────────────────────────
const ts = `// 자동 생성 파일 — election-data/aggregate.mjs 로 재생성
// DO NOT EDIT MANUALLY

export interface ElectionParty {
  name: string;
  color: string;
  nationalRate: number;
}

export interface ElectionDataset {
  id: string;
  name: string;
  type: 'presidential' | 'assembly-pr' | 'assembly-district';
  year: number;
  parties: ElectionParty[];
  regionRates: Record<string, number[]>;
  earlyNationalRates: number[];
  mainNationalRates: number[];
  earlyRegionRates: Record<string, number[]>;
  mainRegionRates: Record<string, number[]>;
  earlyTotal: number;
  mainTotal: number;
  earlyRegionTotals: Record<string, number>;
  mainRegionTotals: Record<string, number>;
  electorateTotal: number;
}

export const ELECTION_DATASETS: ElectionDataset[] = ${JSON.stringify(datasets, null, 2)};
`;

writeFileSync(OUT_FILE, ts, 'utf-8');
console.log(`\n생성 완료: ${OUT_FILE}`);
