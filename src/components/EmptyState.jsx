import React from 'react';
import { SearchX, Database, Inbox, RotateCcw } from 'lucide-react';

export default function EmptyState({
  title = 'No Records Found',
  description = 'No matching documents or records were found for the selected query or filters.',
  icon: Icon = SearchX,
  onReset,
  actionLabel = 'Reset Filters',
}) {
  return (
    <div
      className="card"
      style={{
        padding: '48px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        border: '1px dashed #cbd5e1',
      }}
    >
      <div
        style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          backgroundColor: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#64748b',
          marginBottom: '16px',
        }}
      >
        <Icon size={26} />
      </div>

      <h3
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#1e293b',
          marginBottom: '6px',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: '13px',
          color: '#64748b',
          maxWidth: '440px',
          lineHeight: 1.5,
          marginBottom: onReset ? '18px' : 0,
        }}
      >
        {description}
      </p>

      {onReset && (
        <button onClick={onReset} className="btn btn-secondary btn-sm">
          <RotateCcw size={13} />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
}
