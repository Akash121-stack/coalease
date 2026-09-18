import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Building,
  Calendar,
  Layers,
  ArrowRight,
  FileCheck,
  Cpu,
  Clock,
  Check,
  Sparkles,
} from 'lucide-react';
import { addDocument, getCurrentUser } from '../utils/storage';

export default function Upload() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Geological',
    mine: 'Barkakana Block',
    year: '2025',
    department: currentUser ? currentUser.department : 'Geological Exploration Cell',
    description: '',
    docType: 'PDF',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0); // 0: Idle, 1: Submitted, 2: Indexed, 3: Verified, 4: Available
  const [uploadedDocId, setUploadedDocId] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (file) => {
    if (!file) return;
    setSelectedFile(file);

    // Auto-fill title if empty
    if (!formData.title) {
      const cleanName = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setFormData((prev) => ({
        ...prev,
        title: cleanName.charAt(0).toUpperCase() + cleanName.slice(1),
      }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return;

    setIsUploading(true);
    setUploadStep(1); // Submitted

    const fileSizeStr = selectedFile
      ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`
      : '3.6 MB';

    // Step 1: Submitted -> Step 2: Indexed (1s)
    setTimeout(() => {
      setUploadStep(2); // Indexed & Vector Extracted

      // Step 2 -> Step 3: Verified (2.2s)
      setTimeout(() => {
        setUploadStep(3); // Quality Validated

        // Step 3 -> Step 4: Available & Persisted (3.2s)
        setTimeout(() => {
          const newDoc = addDocument({
            id: `DOC-${formData.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`,
            title: formData.title,
            category: formData.category,
            mine: formData.mine,
            year: formData.year,
            department: formData.department,
            summary: formData.description || 'Newly submitted technical mine operational documentation.',
            size: fileSizeStr,
            pages: Math.floor(Math.random() * 10) + 16,
            pdfUrl: '/documents/GEO-BK-142.pdf', // Link to real multi-page PDF engine
            status: 'Verified',
            extractedFindings: {
              uploadValidation: 'Checksum & Metadata Verified',
              indexNode: 'Damodar Central Index Node',
              ocrConfidence: '99.4%',
              status: 'Indexed & Published to Central Repository',
            },
          });

          setUploadedDocId(newDoc.id);
          setUploadStep(4); // Fully Available
          setIsUploading(false);
        }, 1000);
      }, 1200);
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header-title">Upload & Ingest Mining Data</h1>
          <p className="page-header-desc">
            Submit borehole core logs, annual production datasets, and engineering reports to the central knowledge repository.
          </p>
        </div>
      </div>

      {/* PIPELINE SIMULATION PROGRESS BAR (If submitted) */}
      {uploadStep > 0 && (
        <div
          className="card animate-fade-in"
          style={{
            backgroundColor: '#ffffff',
            border: '2px solid #b58a3a',
            padding: '24px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={18} color="#b58a3a" />
              <span style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase' }}>
                Ingestion & Indexing Pipeline
              </span>
            </div>

            <span className="badge badge-gold font-mono">
              {uploadStep === 1 && '1/4: Submitting Stream...'}
              {uploadStep === 2 && '2/4: Extracting Strata & OCR...'}
              {uploadStep === 3 && '3/4: Geological Verification...'}
              {uploadStep === 4 && '4/4: Indexed & Available in Repository'}
            </span>
          </div>

          {/* 4 Steps Indicator */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              marginTop: '12px',
            }}
          >
            {/* Step 1 */}
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: uploadStep >= 1 ? '#fbf6ec' : '#f8fafc',
                border: `1px solid ${uploadStep >= 1 ? '#b58a3a' : '#e2e8f0'}`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: uploadStep >= 1 ? '#b58a3a' : '#cbd5e1',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                {uploadStep > 1 ? <Check size={14} /> : '1'}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>
                Submitted
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b' }}>File payload sent</div>
            </div>

            {/* Step 2 */}
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: uploadStep >= 2 ? '#fbf6ec' : '#f8fafc',
                border: `1px solid ${uploadStep >= 2 ? '#b58a3a' : '#e2e8f0'}`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: uploadStep >= 2 ? '#b58a3a' : '#cbd5e1',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                {uploadStep > 2 ? <Check size={14} /> : '2'}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>
                Indexed
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b' }}>Metadata & OCR</div>
            </div>

            {/* Step 3 */}
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: uploadStep >= 3 ? '#fbf6ec' : '#f8fafc',
                border: `1px solid ${uploadStep >= 3 ? '#b58a3a' : '#e2e8f0'}`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: uploadStep >= 3 ? '#b58a3a' : '#cbd5e1',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                {uploadStep > 3 ? <Check size={14} /> : '3'}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>
                Verified
              </div>
              <div style={{ fontSize: '10.5px', color: '#64748b' }}>QA Checked</div>
            </div>

            {/* Step 4 */}
            <div
              style={{
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: uploadStep >= 4 ? '#dcfce7' : '#f8fafc',
                border: `1px solid ${uploadStep >= 4 ? '#86efac' : '#e2e8f0'}`,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: uploadStep >= 4 ? '#16a34a' : '#cbd5e1',
                  color: '#ffffff',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 700,
                  marginBottom: '6px',
                }}
              >
                {uploadStep === 4 ? <Check size={14} /> : '4'}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: uploadStep >= 4 ? '#14532d' : '#1e293b' }}>
                Available
              </div>
              <div style={{ fontSize: '10.5px', color: uploadStep >= 4 ? '#15803d' : '#64748b' }}>
                Live in Repository
              </div>
            </div>
          </div>

          {/* Success action button */}
          {uploadStep === 4 && uploadedDocId && (
            <div
              style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ fontSize: '13px', color: '#15803d', fontWeight: 600 }}>
                ✓ Document record {uploadedDocId} successfully stored in local database!
              </div>

              <button
                onClick={() => navigate(`/documents/${uploadedDocId}`)}
                className="btn btn-primary"
              >
                <span>Inspect New Document in Viewer</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Upload Form Card */}
      <div className="card" style={{ padding: '24px' }}>
        <form onSubmit={handleSubmit}>
          {/* File Drag and Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragActive ? '#b58a3a' : '#cbd5e1'}`,
              backgroundColor: dragActive ? '#fbf6ec' : '#f8fafc',
              borderRadius: '8px',
              padding: '32px 20px',
              textAlign: 'center',
              cursor: 'pointer',
              marginBottom: '20px',
              transition: 'all 0.15s ease',
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.csv,.xlsx,.doc,.docx"
              style={{ display: 'none' }}
              onChange={(e) => handleFileChange(e.target.files[0])}
            />

            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#eef2f6',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#b58a3a',
                marginBottom: '12px',
              }}
            >
              <UploadCloud size={24} />
            </div>

            {selectedFile ? (
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                  {selectedFile.name}
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}
                >
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type || 'application/pdf'}
                </div>
                <span
                  className="badge badge-verified"
                  style={{ marginTop: '8px', display: 'inline-flex' }}
                >
                  File Ready For Ingestion
                </span>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                  Click to select file or drag & drop here
                </div>
                <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                  Supports PDF reports, borehole logs, CSV datasets, and technical documentation
                </div>
              </div>
            )}
          </div>

          {/* Form Metadata Fields */}
          <div className="form-group">
            <label className="form-label">Document Title *</label>
            <input
              type="text"
              required
              className="form-input"
              placeholder="e.g., Deep Core Drilling & Seam Stratigraphy Report — BK-145"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '14px',
              marginBottom: '16px',
            }}
          >
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Geological">Geological</option>
                <option value="Mining">Mining</option>
                <option value="Production">Production</option>
                <option value="Historical">Historical</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Mine / Block</label>
              <select
                className="form-select"
                value={formData.mine}
                onChange={(e) => setFormData({ ...formData, mine: e.target.value })}
              >
                <option value="Barkakana Block">Barkakana Block</option>
                <option value="North Karanpura">North Karanpura</option>
                <option value="Singrauli Block">Singrauli Block</option>
                <option value="Central West Mine">Central West Mine</option>
                <option value="Eastern Coalfields">Eastern Coalfields</option>
                <option value="Northern Coalfields">Northern Coalfields</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Reporting Year</label>
              <select
                className="form-select"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              >
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Department / Originating Unit</label>
            <input
              type="text"
              className="form-input"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description & Key Stratigraphic Observations</label>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="Provide summary notes on lithology, seam intersections, equipment used, or production targets..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
              paddingTop: '16px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setSelectedFile(null);
                setFormData({
                  title: '',
                  category: 'Geological',
                  mine: 'Barkakana Block',
                  year: '2025',
                  department: currentUser ? currentUser.department : 'Geological Exploration Cell',
                  description: '',
                  docType: 'PDF',
                });
              }}
              className="btn btn-secondary"
            >
              Clear Form
            </button>

            <button
              type="submit"
              disabled={isUploading || !formData.title}
              className="btn btn-primary"
            >
              <UploadCloud size={15} />
              <span>{isUploading ? 'Executing Pipeline...' : 'Submit Document to Repository'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
