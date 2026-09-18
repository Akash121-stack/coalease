import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckSquare,
  CheckCircle2,
  AlertCircle,
  Clock,
  Eye,
  FileText,
  ShieldCheck,
  User,
  Building,
  RotateCcw,
  Check,
  X,
  Layers,
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';
import { getDocuments, updateDocument, getCurrentUser } from '../utils/storage';

export default function Verification() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [documents, setDocuments] = useState(getDocuments());
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [reviewNote, setReviewNote] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState('verify'); // 'verify' or 'reject'

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  const pendingDocs = documents.filter((d) => d.status === 'Pending');
  const verifiedDocs = documents.filter((d) => d.status === 'Verified');

  const handleOpenActionModal = (doc, type) => {
    setSelectedDoc(doc);
    setActionType(type);
    setReviewNote(
      type === 'verify'
        ? 'Core recovery, chemical assay parameters, and stratigraphic log verified against DGMS standards.'
        : 'Discrepancy identified in reported stripping ratio and seam thickness correlation.'
    );
    setShowModal(true);
  };

  const handleConfirmAction = () => {
    if (!selectedDoc) return;

    const newStatus = actionType === 'verify' ? 'Verified' : 'Needs Review';
    updateDocument(selectedDoc.id, {
      status: newStatus,
      verificationNote: reviewNote,
      verifiedBy: currentUser ? currentUser.name : 'Chief Mining Officer',
      verifiedDate: new Date().toISOString().split('T')[0],
    });

    setDocuments(getDocuments());
    setShowModal(false);
    setSelectedDoc(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">Data Verification Center</h1>
            <span className="badge badge-gold font-mono">
              {pendingDocs.length} PENDING AUDITS
            </span>
          </div>
          <p className="page-header-desc">
            Statutory quality assurance queue for reviewing, certifying, or rejecting uploaded mining and borehole records.
          </p>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-accent-bar" style={{ backgroundColor: '#d97706' }} />
          <div className="stat-card-top">
            <span className="stat-card-label">Pending Verification</span>
            <Clock size={16} color="#d97706" />
          </div>
          <div className="stat-card-value">{pendingDocs.length}</div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Requires technical audit</span>
        </div>

        <div className="stat-card">
          <div className="stat-accent-bar" style={{ backgroundColor: '#16a34a' }} />
          <div className="stat-card-top">
            <span className="stat-card-label">Certified Records</span>
            <CheckCircle2 size={16} color="#16a34a" />
          </div>
          <div className="stat-card-value">{verifiedDocs.length}</div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Digitally sealed & verified</span>
        </div>

        <div className="stat-card">
          <div className="stat-accent-bar" style={{ backgroundColor: '#2563eb' }} />
          <div className="stat-card-top">
            <span className="stat-card-label">Compliance Ratio</span>
            <ShieldCheck size={16} color="#2563eb" />
          </div>
          <div className="stat-card-value">
            {Math.round((verifiedDocs.length / documents.length) * 100)}%
          </div>
          <span style={{ fontSize: '11px', color: '#64748b' }}>UNFC & DGMS alignment</span>
        </div>
      </div>

      {/* Pending Documents Verification Queue */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Clock size={16} className="card-title-icon" />
            <span>Documents Awaiting Verification ({pendingDocs.length})</span>
          </div>
        </div>

        {pendingDocs.length === 0 ? (
          <div style={{ padding: '32px 16px', textAlign: 'center' }}>
            <CheckCircle2 size={36} color="#16a34a" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
              All Uploaded Documents Verified!
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '4px' }}>
              There are no pending submissions awaiting review in the queue.
            </p>
          </div>
        ) : (
          <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Doc ID</th>
                  <th>Title & Description</th>
                  <th>Uploader & Unit</th>
                  <th>Category</th>
                  <th>Mine</th>
                  <th>Submitted</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingDocs.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <span className="font-mono" style={{ color: '#b58a3a', fontWeight: 700 }}>
                        {doc.id}
                      </span>
                    </td>

                    <td>
                      <div style={{ maxWidth: '280px' }}>
                        <Link
                          to={`/documents/${doc.id}`}
                          style={{
                            fontWeight: 600,
                            color: '#1e293b',
                            textDecoration: 'none',
                            display: 'block',
                          }}
                        >
                          {doc.title}
                        </Link>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>
                          {doc.pages} Pages • {doc.size}
                        </span>
                      </div>
                    </td>

                    <td>
                      <div style={{ fontSize: '12px', fontWeight: 500, color: '#334155' }}>
                        {doc.uploadedBy || 'Field Engineer'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>
                        {doc.department}
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-dark">{doc.category}</span>
                    </td>

                    <td>
                      <span style={{ fontWeight: 500 }}>{doc.mine}</span>
                    </td>

                    <td>
                      <span className="font-mono" style={{ fontSize: '11.5px', color: '#64748b' }}>
                        {doc.date}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                        <Link
                          to={`/documents/${doc.id}`}
                          className="btn btn-secondary btn-sm"
                          title="Inspect Document"
                          style={{ padding: '4px 8px' }}
                        >
                          <Eye size={13} />
                          <span>Inspect</span>
                        </Link>

                        <button
                          onClick={() => handleOpenActionModal(doc, 'reject')}
                          className="btn btn-secondary btn-sm"
                          style={{ color: '#991b1b', padding: '4px 8px' }}
                          title="Reject / Flag for Revision"
                        >
                          <X size={13} />
                          <span>Reject</span>
                        </button>

                        <button
                          onClick={() => handleOpenActionModal(doc, 'verify')}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '4px 10px' }}
                          title="Certify & Verify Document"
                        >
                          <Check size={13} />
                          <span>Verify</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Verified Document Archive Section */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldCheck size={16} className="card-title-icon" />
            <span>Recently Certified & Verified Records ({verifiedDocs.length})</span>
          </div>
        </div>

        <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Doc ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Mine</th>
                <th>Pages</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {verifiedDocs.slice(0, 5).map((doc) => (
                <tr key={doc.id}>
                  <td>
                    <span className="font-mono" style={{ color: '#b58a3a', fontWeight: 700 }}>
                      {doc.id}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/documents/${doc.id}`}
                      style={{ fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
                    >
                      {doc.title}
                    </Link>
                  </td>
                  <td>
                    <span className="badge badge-gold">{doc.category}</span>
                  </td>
                  <td>{doc.mine}</td>
                  <td className="font-mono">{doc.pages} p.</td>
                  <td>
                    <StatusBadge status="Verified" />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/documents/${doc.id}`} className="btn btn-secondary btn-sm">
                      <Eye size={12} />
                      <span>Open PDF</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verification / Rejection Modal */}
      {showModal && selectedDoc && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {actionType === 'verify' ? (
                  <CheckCircle2 size={18} color="#16a34a" />
                ) : (
                  <AlertCircle size={18} color="#dc2626" />
                )}
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
                  {actionType === 'verify'
                    ? 'Certify & Approve Document'
                    : 'Flag Document for Revision'}
                </h3>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="logout-icon-btn"
                aria-label="Close Modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="modal-body">
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className="font-mono" style={{ fontSize: '12px', color: '#b58a3a', fontWeight: 700 }}>
                    {selectedDoc.id}
                  </span>
                  <span className="badge badge-dark">{selectedDoc.category}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>
                  {selectedDoc.title}
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                  {selectedDoc.mine} • Uploaded by {selectedDoc.uploadedBy}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {actionType === 'verify' ? 'Verification Audit Note' : 'Rejection Reason / Required Changes'}
                </label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                />
              </div>

              <div style={{ fontSize: '11.5px', color: '#64748b' }}>
                Signing Officer: <strong>{currentUser ? currentUser.name : 'Chief Mining Officer'}</strong> ({currentUser ? currentUser.role : 'Management'})
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`btn btn-sm ${actionType === 'verify' ? 'btn-primary' : 'btn-danger'}`}
              >
                {actionType === 'verify' ? 'Confirm Verification & Publish' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
