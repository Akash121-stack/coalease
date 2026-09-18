import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ExternalLink,
  Sparkles,
  Building,
  Calendar,
  FileText,
  User,
  Shield,
  FileCode,
  Tag,
  Share2,
  Check,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import PdfViewer from '../components/PdfViewer';
import ExtractedKeyFindings from '../components/ExtractedKeyFindings';
import EmptyState from '../components/EmptyState';
import { getDocumentById, updateDocument, getCurrentUser } from '../utils/storage';

export default function DocumentViewer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const doc = getDocumentById(id);
    setDocument(doc);
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading document record...</div>;
  }

  if (!document) {
    return (
      <EmptyState
        title="Document Record Not Found"
        description={`The requested document ID "${id}" could not be located in the repository catalog.`}
        onReset={() => navigate('/repository')}
        actionLabel="Back to Central Repository"
      />
    );
  }

  const handleAskAI = () => {
    const AI_URL = import.meta.env.VITE_AI_URL || 'http://localhost:3001';
    window.location.href = AI_URL;
  };

  const handleToggleVerification = () => {
    const newStatus = document.status === 'Verified' ? 'Pending' : 'Verified';
    const updated = updateDocument(document.id, { status: newStatus });
    if (updated) {
      setDocument({ ...updated });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Navigation Breadcrumb & Back Action */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <button
          onClick={() => navigate('/repository')}
          className="btn btn-secondary btn-sm"
        >
          <ArrowLeft size={14} />
          <span>Back to Repository</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={handleCopyLink}
            className="btn btn-secondary btn-sm"
            title="Copy Record URL"
          >
            {copied ? <Check size={13} color="#16a34a" /> : <Share2 size={13} />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          {/* ASK AI EXTERNAL REDIRECT BUTTON */}
          <button onClick={handleAskAI} className="btn-ai-external">
            <Sparkles size={14} />
            <span>Ask AI About This Doc</span>
            <ExternalLink size={12} style={{ opacity: 0.8 }} />
          </button>

          {/* Toggle Verification Action Button */}
          <button
            onClick={handleToggleVerification}
            className={`btn btn-sm ${
              document.status === 'Verified'
                ? 'btn-secondary'
                : 'btn-primary'
            }`}
          >
            <CheckCircle2 size={14} />
            <span>
              {document.status === 'Verified'
                ? 'Mark as Pending'
                : 'Verify & Sign Document'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Document Header Card */}
      <div className="card" style={{ padding: '24px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            marginBottom: '16px',
          }}
        >
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span
                className="badge badge-dark font-mono"
                style={{ fontSize: '13px', color: '#b58a3a', padding: '4px 10px' }}
              >
                {document.id}
              </span>
              <span className="badge badge-gold" style={{ textTransform: 'uppercase' }}>
                {document.category}
              </span>
              <StatusBadge status={document.status} />
            </div>

            <h1
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--color-text-main)',
                lineHeight: 1.3,
                marginBottom: '8px',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {document.title}
            </h1>

            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: 1.5 }}>
              {document.summary}
            </p>
          </div>

          <a
            href={document.pdfUrl}
            download={`${document.id}.pdf`}
            className="btn btn-primary"
          >
            <Download size={15} />
            <span>Download Official PDF</span>
          </a>
        </div>

        {/* Metadata Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
          }}
        >
          <div>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
              Mine / Block
            </span>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
              {document.mine}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
              Department
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
              {document.department}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
              Report Year
            </span>
            <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
              {document.year}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
              Uploaded By
            </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
              {document.uploadedBy || 'Lead Geologist'}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
              Pages & File Size
            </span>
            <span className="font-mono" style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
              {document.pages} Pages • {document.size}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, display: 'block', textTransform: 'uppercase' }}>
              Archive Date
            </span>
            <span className="font-mono" style={{ fontSize: '13px', color: '#64748b' }}>
              {document.date}
            </span>
          </div>
        </div>

        {/* Keywords Tags */}
        {document.keywords && document.keywords.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              flexWrap: 'wrap',
              marginTop: '14px',
            }}
          >
            <Tag size={13} color="#94a3b8" />
            <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: 600 }}>Keywords:</span>
            {document.keywords.map((kw) => (
              <span
                key={kw}
                className="badge badge-dark font-mono"
                style={{ fontSize: '10.5px', backgroundColor: '#eef2f6', color: '#475569', border: '1px solid #cbd5e1' }}
              >
                #{kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* REAL MULTI-PAGE PDF VIEWER EMBED */}
      <div>
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
            Live Multi-Page Document Inspection ({document.pages} Pages)
          </span>
          <span style={{ fontSize: '11.5px', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
            Vector PDF 1.4 Native
          </span>
        </div>

        <PdfViewer document={document} />
      </div>

      {/* Extracted Key Findings Section */}
      <ExtractedKeyFindings
        findings={document.extractedFindings}
        category={document.category}
      />
    </div>
  );
}
