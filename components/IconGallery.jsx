import { useState, useEffect } from 'react';

export function IconGallery() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedName, setCopiedName] = useState(null);

  useEffect(() => {
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
    fetch(`${basePath}/icons-data.json`)
      .then((r) => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>Loading icons...</div>;
  }

  const categories = Object.keys(data);
  const allIcons = categories.flatMap((cat) => data[cat].map((icon) => ({ ...icon, category: cat })));

  const filtered = allIcons.filter((icon) => {
    const matchesSearch = !search || icon.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'all' || icon.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const copy = (name) => {
    navigator.clipboard?.writeText(name);
    setCopiedName(name);
    setTimeout(() => setCopiedName(null), 1500);
  };

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search icons... (e.g. arrow, check, user)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          marginBottom: 16,
          border: '1px solid #ddd',
          borderRadius: 8,
          fontSize: 14,
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />

      {/* Category tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 24 }}>
        <button
          onClick={() => setActiveCategory('all')}
          style={{
            padding: '6px 12px',
            borderRadius: 6,
            border: '1px solid #ddd',
            background: activeCategory === 'all' ? '#111' : '#fff',
            color: activeCategory === 'all' ? '#fff' : '#666',
            fontSize: 12,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          All ({allIcons.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 12px',
              borderRadius: 6,
              border: '1px solid #ddd',
              background: activeCategory === cat ? '#111' : '#fff',
              color: activeCategory === cat ? '#fff' : '#666',
              fontSize: 12,
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            {cat} ({data[cat].length})
          </button>
        ))}
      </div>

      {/* Results count */}
      <div style={{ marginBottom: 16, fontSize: 13, color: '#999' }}>
        {filtered.length} icons
      </div>

      {/* Icon grid */}
      {filtered.length === 0 ? (
        <div style={{ padding: 40, textAlign: 'center', color: '#999' }}>No icons found.</div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
            gap: 8,
          }}
        >
          {filtered.map((icon) => (
            <div
              key={icon.name}
              onClick={() => copy(icon.name)}
              title={`${icon.name}\n${icon.category}\nClick to copy name`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                padding: '16px 8px 10px',
                borderRadius: 8,
                border: '1px solid #eee',
                background: '#fff',
                cursor: 'pointer',
                transition: 'all 0.15s',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#bbb';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#eee';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {copiedName === icon.name && (
                <div
                  style={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    background: '#111',
                    color: '#fff',
                    fontSize: 9,
                    padding: '2px 6px',
                    borderRadius: 4,
                  }}
                >
                  Copied!
                </div>
              )}
              <img
                src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}${icon.file}`}
                alt={icon.name}
                width={24}
                height={24}
                style={{ display: 'block' }}
              />
              <span
                style={{
                  fontSize: 10,
                  color: '#666',
                  textAlign: 'center',
                  lineHeight: 1.3,
                  wordBreak: 'break-all',
                  maxWidth: '100%',
                }}
              >
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
