import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Building,
  HardHat,
  FileCode,
  ArrowUpRight,
  Eye,
  Download,
} from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function DocumentCard({ document }) {
  const {
    id,
    title,
    category,
    mine,
    year,
    status,
    pages,
    size,
    date,
    summary,
    pdfUrl,
  } = document;

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 6px 12px -2px rgba(0,0,0,0.08)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
      }}
    >
      <div>
        {/* Card Header: ID, Category & Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              className="badge badge-dark font-mono"
              style={{ fontSize: '11px', color: '#b58a3a' }}
            >
              {id}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {category}
            </span>
          </div>
          <StatusBadge status={status} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--color-text-main)',
            lineHeight: 1.35,
            marginBottom: '8px',
          }}
        >
          <Link
            to={`/documents/${id}`}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#b58a3a')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = 'var(--color-text-main)')
            }
          >
            {title}
          </Link>
        </h3>

        {/* Summary */}
        <p
          style={{
            fontSize: '12.5px',
            color: '#475569',
            lineHeight: 1.45,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {summary}
        </p>

        {/* Metadata Chips */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            padding: '10px',
            backgroundColor: '#f8fafc',
            borderRadius: '6px',
            fontSize: '11.5px',
            marginBottom: '14px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
            <Building size={12} />
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{mine}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
            <Calendar size={12} />
            <span style={{ color: '#1e293b', fontWeight: 500 }}>Year {year}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
            <FileText size={12} />
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{pages} Pages</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748b' }}>
            <FileCode size={12} />
            <span style={{ color: '#1e293b', fontWeight: 500 }}>{size}</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid #f1f5f9',
        }}
      >
        <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
          Updated {date}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            title="Download PDF"
            style={{ padding: '4px 8px' }}
          >
            <Download size={13} />
          </a>

          <Link to={`/documents/${id}`} className="btn btn-primary btn-sm">
            <Eye size={13} />
            <span>Open PDF</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
