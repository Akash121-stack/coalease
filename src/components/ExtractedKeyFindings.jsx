import React from 'react';
import { Database, CheckCircle, Info, Sparkles, Layers, FileCheck } from 'lucide-react';

export default function ExtractedKeyFindings({ findings, category }) {
  if (!findings || Object.keys(findings).length === 0) {
    return (
      <div className="card" style={{ marginTop: '20px' }}>
        <div className="card-header">
          <div className="card-title">
            <Database size={16} className="card-title-icon" />
            <span>Extracted Geological / Operational Information</span>
          </div>
        </div>
        <p style={{ fontSize: '13px', color: '#64748b' }}>
          Document indexing in progress. Technical findings will appear after OCR extraction.
        </p>
      </div>
    );
  }

  // Format camelCase keys to readable labels
  const formatKey = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase())
      .replace(/Cbm/g, 'CBM')
      .replace(/Unfc/g, 'UNFC')
      .replace(/Gcv/g, 'GCV')
      .replace(/Hemm/g, 'HEMM')
      .replace(/Mgr/g, 'MGR')
      .replace(/Ob/g, 'Overburden')
      .replace(/Ltifr/g, 'LTIFR');
  };

  return (
    <div className="card" style={{ marginTop: '20px' }}>
      <div className="card-header">
        <div className="card-title">
          <Layers size={16} className="card-title-icon" />
          <span>Extracted Technical Information & Key Parameters</span>
        </div>
        <span
          className="badge badge-gold"
          style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <FileCheck size={12} />
          Verified Extraction
        </span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '12px',
        }}
      >
        {Object.entries(findings).map(([key, value]) => (
          <div
            key={key}
            style={{
              padding: '12px 14px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '4px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
              }}
            >
              {formatKey(key)}
            </span>
            <span
              className="font-mono"
              style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#1e293b',
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
