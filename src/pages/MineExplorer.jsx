import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building,
  TrendingUp,
  Layers,
  Database,
  Compass,
  HardHat,
  FileText,
  ShieldCheck,
  Eye,
  ExternalLink,
  Search,
} from 'lucide-react';
import { getMines, getDocuments } from '../utils/storage';

export default function MineExplorer() {
  const navigate = useNavigate();
  const mines = getMines();
  const documents = getDocuments();
  const [selectedMineId, setSelectedMineId] = useState(mines[0].id);

  const currentMine = mines.find((m) => m.id === selectedMineId) || mines[0];
  const mineDocs = documents.filter(
    (d) => d.mine.toLowerCase() === currentMine.name.toLowerCase()
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">Mine Explorer & Spatial Blocks</h1>
            <span className="badge badge-gold font-mono">
              {mines.length} ACTIVE BLOCKS
            </span>
          </div>
          <p className="page-header-desc">
            Explore operational mine pits, borehole drill logs, stripping ratios, and associated geological datasets.
          </p>
        </div>
      </div>

      {/* Mine Selector Tabs / Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '14px',
        }}
      >
        {mines.map((mine) => {
          const isSelected = mine.id === selectedMineId;
          return (
            <div
              key={mine.id}
              onClick={() => setSelectedMineId(mine.id)}
              className="card"
              style={{
                cursor: 'pointer',
                border: `2px solid ${isSelected ? '#b58a3a' : '#dfe3ea'}`,
                backgroundColor: isSelected ? '#fcf8f0' : '#ffffff',
                boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-card)',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '8px',
                }}
              >
                <span
                  className="badge badge-dark font-mono"
                  style={{ fontSize: '11px', color: '#b58a3a' }}
                >
                  {mine.id}
                </span>
                <span className="badge badge-verified" style={{ fontSize: '10px' }}>
                  {mine.status}
                </span>
              </div>

              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
                {mine.name}
              </h3>

              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                {mine.location}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '11.5px',
                }}
              >
                <span className="font-mono" style={{ fontWeight: 700, color: '#1e293b' }}>
                  {mine.annualProduction} / yr
                </span>
                <span style={{ color: '#b58a3a', fontWeight: 600 }}>
                  {mine.boreholes} Boreholes
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Mine Detailed Overview */}
      <div
        className="card"
        style={{
          padding: '24px',
          backgroundColor: '#ffffff',
          border: '1px solid #cbd5e1',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            borderBottom: '1px solid #f1f5f9',
            paddingBottom: '18px',
            marginBottom: '20px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span className="badge badge-gold font-mono">{currentMine.id}</span>
              <span className="badge badge-dark">{currentMine.block}</span>
            </div>

            <h2
              style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#12161d',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {currentMine.name}
            </h2>
            <p style={{ fontSize: '13px', color: '#475569', marginTop: '4px', maxWidth: '640px' }}>
              {currentMine.description}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link
              to={`/search?mine=${encodeURIComponent(currentMine.name)}`}
              className="btn btn-secondary btn-sm"
            >
              <Search size={13} />
              <span>Search {currentMine.name} Records</span>
            </Link>
          </div>
        </div>

        {/* Operational Indicators Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '24px',
          }}
        >
          <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Annual Extraction Run Rate
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '2px' }}>
              {currentMine.annualProduction}
            </div>
            <span style={{ fontSize: '11px', color: '#16a34a' }}>Target: {currentMine.annualTarget}</span>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Proved Reserves (UNFC 111)
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '2px' }}>
              {currentMine.reserves}
            </div>
            <span style={{ fontSize: '11px', color: '#b58a3a' }}>Barakar Sequence</span>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Stripping Ratio (OB:Coal)
            </span>
            <div className="font-mono" style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '2px' }}>
              {currentMine.strippingRatio}
            </div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Economic Opencast</span>
          </div>

          <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
              Average Coal Quality
            </span>
            <div className="font-mono" style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginTop: '4px' }}>
              {currentMine.avgGrade}
            </div>
            <span style={{ fontSize: '11px', color: '#64748b' }}>Low Sulphur</span>
          </div>
        </div>

        {/* Heavy Equipment & Management Overview */}
        <div style={{ marginBottom: '24px', padding: '14px 16px', backgroundColor: '#faf8f4', border: '1px solid #ebd8b7', borderRadius: '6px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#8c6826', textTransform: 'uppercase', marginBottom: '4px' }}>
            Operational Heavy Earth Moving Machinery (HEMM) Deployment:
          </div>
          <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: 500 }}>
            {currentMine.equipment}
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
            Supervising Mine Manager: <strong>{currentMine.manager}</strong> (DGMS First Class Certified)
          </div>
        </div>

        {/* Recent Boreholes Log Table */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>
              Recent Drill Core & Borehole Registry ({currentMine.recentBoreholes.length} Logged)
            </h3>
            <span className="font-mono" style={{ fontSize: '11px', color: '#64748b' }}>
              Continuous Diamond Wireline
            </span>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Borehole ID</th>
                  <th>Drilled Depth</th>
                  <th>Coal Seams Intersected</th>
                  <th>Drill Date</th>
                  <th style={{ textAlign: 'right' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentMine.recentBoreholes.map((bh) => (
                  <tr key={bh.id}>
                    <td>
                      <span className="font-mono" style={{ color: '#b58a3a', fontWeight: 700 }}>
                        {bh.id}
                      </span>
                    </td>
                    <td className="font-mono">{bh.depth}</td>
                    <td>{bh.seams}</td>
                    <td className="font-mono">{bh.date}</td>
                    <td style={{ textAlign: 'right' }}>
                      <span className="badge badge-verified">{bh.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Associated Repository Documents */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>
              Associated Digital Repository Documents ({mineDocs.length})
            </h3>
          </div>

          {mineDocs.length === 0 ? (
            <p style={{ fontSize: '12.5px', color: '#64748b' }}>
              No documents linked directly to this block yet.
            </p>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
              }}
            >
              {mineDocs.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => navigate(`/documents/${doc.id}`)}
                  style={{
                    padding: '12px 14px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#b58a3a';
                    e.currentTarget.style.backgroundColor = '#fcf8f0';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.backgroundColor = '#f8fafc';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                      <span className="font-mono" style={{ fontSize: '11.5px', color: '#b58a3a', fontWeight: 700 }}>
                        {doc.id}
                      </span>
                      <span className="badge badge-dark" style={{ fontSize: '9.5px' }}>
                        {doc.category}
                      </span>
                    </div>
                    <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e293b' }}>
                      {doc.title}
                    </div>
                  </div>

                  <Eye size={15} color="#b58a3a" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
