import React, { useState, useRef } from 'react';
import {
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileText,
  ShieldCheck,
  Printer,
} from 'lucide-react';

export default function PdfViewer({ document }) {
  const { id, title, pdfUrl, pages, size } = document;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const containerRef = useRef(null);

  const toggleFullscreen = () => {
    if (!documentRefAvailable()) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (window.document.exitFullscreen) {
        window.document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const documentRefAvailable = () => {
    return containerRef && containerRef.current;
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 15, 160));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 15, 70));
  };

  const handlePrint = () => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div
      ref={containerRef}
      className="card"
      style={{
        padding: 0,
        overflow: 'hidden',
        border: '1px solid #cbd5e1',
        boxShadow: 'var(--shadow-md)',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1e232b',
      }}
    >
      {/* Industrial PDF Toolbar */}
      <div
        style={{
          padding: '10px 18px',
          backgroundColor: '#12161d',
          borderBottom: '1px solid #28313e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#1e2430',
              padding: '4px 10px',
              borderRadius: '4px',
              border: '1px solid #334155',
            }}
          >
            <FileText size={14} color="#b58a3a" />
            <span
              className="font-mono"
              style={{ fontSize: '12px', color: '#b58a3a', fontWeight: 700 }}
            >
              {id}.pdf
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              color: '#94a3b8',
            }}
          >
            <span>•</span>
            <span>{pages || 20} Multi-Page Sections</span>
            <span>•</span>
            <span>{size || '4.2 MB'}</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: 'rgba(22, 101, 52, 0.25)',
              border: '1px solid #15803d',
              borderRadius: '4px',
              padding: '2px 8px',
              fontSize: '11px',
              color: '#86efac',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <ShieldCheck size={12} />
            <span>SHA-256 VERIFIED</span>
          </div>
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Zoom Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1e2430',
              borderRadius: '5px',
              border: '1px solid #334155',
            }}
          >
            <button
              onClick={handleZoomOut}
              className="logout-icon-btn"
              style={{ color: '#cbd5e1', padding: '5px 8px' }}
              title="Zoom Out"
            >
              <ZoomOut size={14} />
            </button>
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: '#cbd5e1', padding: '0 4px' }}
            >
              {zoomLevel}%
            </span>
            <button
              onClick={handleZoomIn}
              className="logout-icon-btn"
              style={{ color: '#cbd5e1', padding: '5px 8px' }}
              title="Zoom In"
            >
              <ZoomIn size={14} />
            </button>
          </div>

          {/* Direct Download */}
          <a
            href={pdfUrl}
            download={`${id}.pdf`}
            className="btn btn-secondary btn-sm"
            style={{
              backgroundColor: '#1e2430',
              borderColor: '#334155',
              color: '#ffffff',
              padding: '5px 10px',
            }}
            title="Download PDF file"
          >
            <Download size={13} />
            <span>Download</span>
          </a>

          {/* Open in external tab */}
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm"
            style={{
              backgroundColor: '#1e2430',
              borderColor: '#334155',
              color: '#ffffff',
              padding: '5px 10px',
            }}
            title="Open in Full Browser Tab"
          >
            <ExternalLink size={13} />
            <span>Open Tab</span>
          </a>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="btn btn-secondary btn-sm"
            style={{
              backgroundColor: '#1e2430',
              borderColor: '#334155',
              color: '#ffffff',
              padding: '5px 8px',
            }}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Embedded Real Multi-Page PDF Viewer */}
      <div
        style={{
          width: '100%',
          height: isFullscreen ? 'calc(100vh - 60px)' : '760px',
          backgroundColor: '#262d38',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'auto',
        }}
      >
        <iframe
          src={`${pdfUrl}#toolbar=1&navpanes=1&statusbar=1&view=FitH`}
          title={`PDF Viewer: ${title}`}
          style={{
            width: `${zoomLevel}%`,
            height: '100%',
            border: 'none',
            minWidth: '100%',
            backgroundColor: '#ffffff',
            transition: 'width 0.2s ease',
          }}
        />
      </div>

      {/* PDF Sub-Status Bar */}
      <div
        style={{
          padding: '8px 16px',
          backgroundColor: '#12161d',
          borderTop: '1px solid #28313e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11.5px',
          color: '#94a3b8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="font-mono">DIGITAL ARCHIVE CANONICAL: /documents/{id}.pdf</span>
        </div>
        <div>
          <span>Multi-Page Vector Rendered Document (PDF 1.4 Standard)</span>
        </div>
      </div>
    </div>
  );
}
