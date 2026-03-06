import { useState, useEffect } from 'react';

// --- Fetch and parse tokens.css directly (reliable across all environments) ---
function parseCSSText(text) {
  const vars = {};
  const regex = /--([\w\u00C0-\u024F]+)\s*:\s*([^;}\n]+)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    vars[`--${m[1]}`] = m[2].trim();
  }
  return vars;
}

function humanize(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(\D)(\d)/g, '$1 $2')
    .trim();
}

// --- Group Definitions ---
const PRIMITIVE_GROUPS = [
  { label: 'Base', prefix: '--dsColorsBase' },
  { label: 'Brand', prefix: '--dsColorsBrand' },
  { label: 'Error', prefix: '--dsColorsError' },
  { label: 'Warning', prefix: '--dsColorsWarning' },
  { label: 'Success', prefix: '--dsColorsSuccess' },
  { label: 'Gray (Light Mode)', prefix: '--dsColorsGrayLightMode' },
  { label: 'Gray (Dark Mode Alpha)', prefix: '--dsColorsGrayDarkModeAlpha' },
  { label: 'Gray (Dark Mode)', prefix: '--dsColorsGrayDarkMode' },
  { label: 'Gray Blue', prefix: '--dsColorsGrayBlue' },
  { label: 'Gray Cool', prefix: '--dsColorsGrayCool' },
  { label: 'Gray Modern', prefix: '--dsColorsGrayModern' },
  { label: 'Gray Neutral', prefix: '--dsColorsGrayNeutral' },
  { label: 'Gray Iron', prefix: '--dsColorsGrayIron' },
  { label: 'Gray True', prefix: '--dsColorsGrayTrue' },
  { label: 'Gray Warm', prefix: '--dsColorsGrayWarm' },
  { label: 'Green Light', prefix: '--dsColorsGreenLight' },
  { label: 'Green', prefix: '--dsColorsGreen' },
  { label: 'Moss', prefix: '--dsColorsMoss' },
  { label: 'Teal', prefix: '--dsColorsTeal' },
  { label: 'Cyan', prefix: '--dsColorsCyan' },
  { label: 'Blue Light', prefix: '--dsColorsBlueLight' },
  { label: 'Blue Dark', prefix: '--dsColorsBlueDark' },
  { label: 'Blue', prefix: '--dsColorsBlue' },
  { label: 'Indigo', prefix: '--dsColorsIndigo' },
  { label: 'Violet', prefix: '--dsColorsViolet' },
  { label: 'Purple', prefix: '--dsColorsPurple' },
  { label: 'Fuchsia', prefix: '--dsColorsFuchsia' },
  { label: 'Pink', prefix: '--dsColorsPink' },
  { label: 'Rose', prefix: '--dsColorsRos' },
  { label: 'Orange Dark', prefix: '--dsColorsOrangeDark' },
  { label: 'Orange', prefix: '--dsColorsOrange' },
  { label: 'Yellow', prefix: '--dsColorsYellow' },
];

const SEMANTIC_GROUPS = [
  { label: 'Text', prefix: '--dsColorsText' },
  { label: 'Background', prefix: '--dsColorsBackground' },
  { label: 'Border', prefix: '--dsColorsBorder' },
  { label: 'Foreground', prefix: '--dsColorsForeground' },
  { label: 'Effects', prefix: '--dsColorsEffects' },
];

const COMPONENT_GROUPS = [
  { label: 'Utility Brand', prefix: '--dsComponentColorsUtilityBrand' },
  { label: 'Utility Gray', prefix: '--dsComponentColorsUtilityGray' },
  { label: 'Utility Error', prefix: '--dsComponentColorsUtilityError' },
  { label: 'Utility Warning', prefix: '--dsComponentColorsUtilityWarning' },
  { label: 'Utility Success', prefix: '--dsComponentColorsUtilitySuccess' },
  { label: 'Utility Blue Light', prefix: '--dsComponentColorsUtilityBlueLight' },
  { label: 'Utility Blue Dark', prefix: '--dsComponentColorsUtilityBlueDark' },
  { label: 'Utility Blue', prefix: '--dsComponentColorsUtilityBlue' },
  { label: 'Utility Indigo', prefix: '--dsComponentColorsUtilityIndigo' },
  { label: 'Utility Fuchsia', prefix: '--dsComponentColorsUtilityFuchsia' },
  { label: 'Utility Pink', prefix: '--dsComponentColorsUtilityPink' },
  { label: 'Utility Purple', prefix: '--dsComponentColorsUtilityPurple' },
  { label: 'Utility Orange Dark', prefix: '--dsComponentColorsUtilityOrangeDark' },
  { label: 'Utility Orange', prefix: '--dsComponentColorsUtilityOrange' },
  { label: 'Utility Gray Blue', prefix: '--dsComponentColorsUtilityGrayBlue' },
  { label: 'Utility Green', prefix: '--dsComponentColorsUtilityGreen' },
  { label: 'Utility Yellow', prefix: '--dsComponentColorsUtilityYellow' },
  { label: 'Components', prefix: '--dsComponentColorsComponents' },
  { label: 'Alpha', prefix: '--dsComponentColorsAlpha' },
];

// --- Classification (longest prefix first to avoid ambiguity) ---
function classifyVars(allVars, groups) {
  const sorted = [...groups].sort((a, b) => b.prefix.length - a.prefix.length);
  const used = new Set();
  const classified = new Map();

  for (const group of sorted) {
    const items = [];
    for (const [name, value] of Object.entries(allVars)) {
      if (!used.has(name) && name.startsWith(group.prefix)) {
        let step = name.substring(group.prefix.length);
        const labelKey = group.label.replace(/\s/g, '');
        if (step.startsWith(labelKey)) {
          step = step.substring(labelKey.length);
        }
        items.push({ name, value, step });
        used.add(name);
      }
    }
    classified.set(group.label, items);
  }

  return groups
    .map((g) => ({ label: g.label, colors: classified.get(g.label) || [] }))
    .filter((g) => g.colors.length > 0);
}

// --- Checkerboard for transparent colors ---
const checkerboard = [
  'linear-gradient(45deg, #ddd 25%, transparent 25%)',
  'linear-gradient(-45deg, #ddd 25%, transparent 25%)',
  'linear-gradient(45deg, transparent 75%, #ddd 75%)',
  'linear-gradient(-45deg, transparent 75%, #ddd 75%)',
].join(',');

// --- Color Swatch (grid item for primitive colors) ---
function ColorSwatch({ name, value, step }) {
  const [copied, setCopied] = useState(false);
  const hasAlpha = value.includes('rgba');

  const copy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div onClick={copy} title={`${name}\nClick to copy`} style={{ cursor: 'pointer' }}>
      <div
        style={{
          position: 'relative',
          height: 56,
          borderRadius: '8px 8px 0 0',
          border: '1px solid rgba(0,0,0,0.06)',
          borderBottom: 'none',
          overflow: 'hidden',
          ...(hasAlpha
            ? { backgroundImage: checkerboard, backgroundSize: '8px 8px', backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0' }
            : {}),
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: value,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {copied && (
            <span style={{ background: 'rgba(0,0,0,0.75)', color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 10 }}>
              Copied!
            </span>
          )}
        </div>
      </div>
      <div
        style={{
          padding: '4px 6px',
          borderRadius: '0 0 8px 8px',
          border: '1px solid rgba(0,0,0,0.06)',
          borderTop: 'none',
          background: '#fff',
        }}
      >
        <div style={{ fontWeight: 600, color: '#333', fontSize: 11 }}>{step || 'default'}</div>
        <div style={{ color: '#888', fontFamily: 'monospace', fontSize: 9, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {value}
        </div>
      </div>
    </div>
  );
}

// --- Semantic Row (list item for semantic/component colors) ---
function SemanticRow({ name, value, step }) {
  const [copied, setCopied] = useState(false);
  const hasAlpha = value.includes('rgba');

  const copy = () => {
    navigator.clipboard?.writeText(name);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div
      onClick={copy}
      title="Click to copy variable name"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '8px 12px',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        fontSize: 13,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          border: '1px solid rgba(0,0,0,0.08)',
          flexShrink: 0,
          position: 'relative',
          overflow: 'hidden',
          ...(hasAlpha
            ? { backgroundImage: checkerboard, backgroundSize: '6px 6px', backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0' }
            : {}),
        }}
      >
        <div style={{ position: 'absolute', inset: 0, backgroundColor: value }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 500, color: '#333' }}>{humanize(step)}</div>
        <div style={{ fontFamily: 'monospace', fontSize: 11, color: '#999', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {name}
        </div>
      </div>
      <div style={{ fontFamily: 'monospace', fontSize: 12, color: '#666', flexShrink: 0 }}>
        {copied ? '✓ Copied' : value}
      </div>
    </div>
  );
}

// --- Group Renderers ---
function PrimitiveGroup({ label, colors }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h4 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#111' }}>{label}</h4>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 6 }}>
        {colors.map((c) => <ColorSwatch key={c.name} {...c} />)}
      </div>
    </div>
  );
}

function SemanticGroup({ label, colors }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h4 style={{ margin: '0 0 8px', fontSize: 15, fontWeight: 600, color: '#111' }}>{label}</h4>
      <div style={{ border: '1px solid #eee', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
        {colors.map((c) => <SemanticRow key={c.name} {...c} />)}
      </div>
    </div>
  );
}

// --- Shared token cache (fetched once, reused across all instances) ---
let tokenCache = null;
let tokenPromise = null;

function fetchTokens() {
  if (tokenCache) return Promise.resolve(tokenCache);
  if (tokenPromise) return tokenPromise;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  tokenPromise = fetch(`${basePath}/tokens.css`)
    .then((r) => r.text())
    .then((text) => {
      tokenCache = parseCSSText(text);
      return tokenCache;
    });
  return tokenPromise;
}

// --- Main Export ---
export function ColorPalette({ type = 'primitive' }) {
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTokens().then((allVars) => {
      const defs = type === 'primitive' ? PRIMITIVE_GROUPS : type === 'semantic' ? SEMANTIC_GROUPS : COMPONENT_GROUPS;
      setGroups(classifyVars(allVars, defs));
    });
  }, [type]);

  if (groups.length === 0) {
    return <div style={{ padding: 20, color: '#999', textAlign: 'center' }}>Loading colors...</div>;
  }

  const filtered = search
    ? groups
        .map((g) => ({
          ...g,
          colors: g.colors.filter(
            (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.value.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((g) => g.colors.length > 0)
    : groups;

  const GroupComponent = type === 'primitive' ? PrimitiveGroup : SemanticGroup;

  return (
    <div>
      <input
        type="text"
        placeholder="Search tokens... (e.g. brand, #7f56d9)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          marginBottom: 24,
          border: '1px solid #ddd',
          borderRadius: 8,
          fontSize: 14,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
      {filtered.length === 0 && <div style={{ padding: 20, color: '#999', textAlign: 'center' }}>No matching tokens found.</div>}
      {filtered.map((g) => (
        <GroupComponent key={g.label} label={g.label} colors={g.colors} />
      ))}
    </div>
  );
}
