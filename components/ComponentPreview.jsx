import { useState } from 'react';

const previewBox = {
  padding: '32px 24px',
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderRadius: '12px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '12px',
};

const darkPreviewBox = {
  ...previewBox,
  background: '#1a1a2e',
};

const labelStyle = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#374151',
  marginBottom: '8px',
};

export function ComponentPreview({ children, dark = false, label, direction = 'row' }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      {label && <div style={labelStyle}>{label}</div>}
      <div style={{
        ...(dark ? darkPreviewBox : previewBox),
        flexDirection: direction,
        alignItems: direction === 'column' ? 'flex-start' : 'center',
      }}>
        {children}
      </div>
    </div>
  );
}

export function PropsTable({ data }) {
  return (
    <div style={{ overflowX: 'auto', marginBottom: '32px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb', textAlign: 'left' }}>
            <th style={{ padding: '10px 12px', fontWeight: 600, color: '#111827' }}>Prop</th>
            <th style={{ padding: '10px 12px', fontWeight: 600, color: '#111827' }}>Type</th>
            <th style={{ padding: '10px 12px', fontWeight: 600, color: '#111827' }}>Default</th>
            <th style={{ padding: '10px 12px', fontWeight: 600, color: '#111827' }}>Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 12px' }}>
                <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '13px', color: '#7c3aed' }}>{row.name}</code>
              </td>
              <td style={{ padding: '10px 12px', color: '#6b7280', fontFamily: 'monospace', fontSize: '13px' }}>{row.type}</td>
              <td style={{ padding: '10px 12px' }}>
                <code style={{ background: '#f3f4f6', padding: '2px 6px', borderRadius: '4px', fontSize: '13px' }}>{row.default}</code>
              </td>
              <td style={{ padding: '10px 12px', color: '#4b5563' }}>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StateLabel({ children }) {
  return (
    <span style={{
      fontSize: '11px',
      color: '#9ca3af',
      textAlign: 'center',
      display: 'block',
      marginTop: '6px',
    }}>
      {children}
    </span>
  );
}
