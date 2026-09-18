import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Eye, Download, ArrowUpDown } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function DocumentTable({ documents, onSort, currentSort }) {
  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th style={{ width: '130px' }}>Document ID</th>
            <th>Title & Description</th>
            <th>Category</th>
            <th>Mine / Block</th>
            <th>Year</th>
            <th>Status</th>
            <th>Pages</th>
            <th>Updated</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>
                <Link
                  to={`/documents/${doc.id}`}
                  className="font-mono"
                  style={{
                    color: '#b58a3a',
                    fontWeight: 700,
                    textDecoration: 'none',
                    fontSize: '12px',
                  }}
                >
                  {doc.id}
                </Link>
              </td>

              <td>
                <div style={{ maxWidth: '320px' }}>
                  <Link
                    to={`/documents/${doc.id}`}
                    style={{
                      fontWeight: 600,
                      color: 'var(--color-text-main)',
                      textDecoration: 'none',
                      display: 'block',
                      marginBottom: '2px',
                    }}
                  >
                    {doc.title}
                  </Link>
                  <p
                    style={{
                      fontSize: '11.5px',
                      color: '#64748b',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {doc.summary}
                  </p>
                </div>
              </td>

              <td>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    padding: '2px 8px',
                    backgroundColor: '#f1f5f9',
                    borderRadius: '4px',
                    color: '#475569',
                    textTransform: 'uppercase',
                  }}
                >
                  {doc.category}
                </span>
              </td>

              <td>
                <span style={{ fontWeight: 500, color: '#334155' }}>{doc.mine}</span>
              </td>

              <td>
                <span className="font-mono" style={{ fontSize: '12px' }}>
                  {doc.year}
                </span>
              </td>

              <td>
                <StatusBadge status={doc.status} />
              </td>

              <td>
                <span className="font-mono" style={{ fontSize: '11.5px' }}>
                  {doc.pages} p.
                </span>
              </td>

              <td>
                <span
                  className="font-mono"
                  style={{ fontSize: '11px', color: '#94a3b8' }}
                >
                  {doc.date}
                </span>
              </td>

              <td style={{ textAlign: 'right' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    gap: '6px',
                  }}
                >
                  <a
                    href={doc.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    title="Download Direct PDF"
                    style={{ padding: '4px 6px' }}
                  >
                    <Download size={13} />
                  </a>

                  <Link
                    to={`/documents/${doc.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                  >
                    <Eye size={12} />
                    <span>View</span>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
