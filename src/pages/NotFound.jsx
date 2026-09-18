import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Database, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      <div className="card" style={{ maxWidth: '480px', padding: '40px 32px' }}>
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#b58a3a',
            marginBottom: '16px',
          }}
        >
          <FileQuestion size={32} />
        </div>

        <h1
          style={{
            fontSize: '24px',
            fontWeight: 800,
            color: '#1e293b',
            fontFamily: 'var(--font-heading)',
            marginBottom: '8px',
          }}
        >
          404 — Record Not Found
        </h1>

        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5, marginBottom: '24px' }}>
          The requested system route or repository archive document does not exist in the Coal Intelligence registry.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Link to="/dashboard" className="btn btn-primary">
            <Home size={14} />
            <span>Go to Dashboard</span>
          </Link>

          <Link to="/repository" className="btn btn-secondary">
            <Database size={14} />
            <span>Browse Repository</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
