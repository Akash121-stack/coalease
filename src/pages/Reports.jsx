import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  Download,
  FileCheck,
  CheckCircle2,
  Building,
  Calendar,
  Layers,
  Sparkles,
  Share2,
  Copy,
  Check,
} from 'lucide-react';
import { getDocuments, getCurrentUser } from '../utils/storage';

export default function Reports() {
  const currentUser = getCurrentUser();
  const documents = getDocuments();

  const [reportType, setReportType] = useState('Production Summary');
  const [selectedMine, setSelectedMine] = useState('North Karanpura');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [classification, setClassification] = useState('OFFICIAL / RESTRICTED');
  const [copied, setCopied] = useState(false);

  // Generate dynamic preview content based on parameters
  const getReportContent = () => {
    if (reportType === 'Geological Overview') {
      return {
        title: `GEOLOGICAL STRATIGRAPHY & RESERVE SYNTHESIS — ${selectedMine.toUpperCase()} (${selectedYear})`,
        subtitle: `Damodar Basin Regional Exploration & Borehole Lithology Assessment`,
        executiveSummary: `This technical geological report provides consolidated stratigraphic interpretations, coal seam correlations, and UNFC reserve valuations for ${selectedMine} during FY ${selectedYear}. Borehole assays indicate high structural stability with average cumulative coal thickness of 28.5 meters in the Barakar formation.`,
        kpis: [
          { label: 'Proved Reserves (UNFC 111)', value: '1,420.0 MT', status: 'High Confidence' },
          { label: 'Identified Seam Groups', value: '4 Major Horizons', status: 'Seams V, VII, VIII, IX' },
          { label: 'Mean Gross Caloric Value', value: '5,420 kcal/kg', status: 'Grade G-4 / G-5' },
          { label: 'Average Ash Content', value: '21.4%', status: 'Low Volatile Bituminous' },
        ],
        tableHeaders: ['Borehole ID', 'Drilled Depth (m)', 'Net Seam Thk (m)', 'Ash %', 'Stratum Status'],
        tableRows: [
          ['BK-142', '342.50 m', '14.85 m', '19.4%', 'Verified Core'],
          ['NK-280', '450.00 m', '28.40 m', '22.1%', 'Logged & Assayed'],
          ['BH-088', '380.00 m', '22.70 m', '24.5%', 'Pending Verification'],
          ['CW-044', '210.00 m', '17.50 m', '20.8%', 'Bench Approved'],
        ],
        observations: [
          'Sandstone roof beds demonstrate Unconfined Compressive Strength (UCS) of 48.5 MPa, suitable for safe highwall stability.',
          'Zero basic intrusive dykes (Jhama) detected in the active expansion corridor.',
          'Low pyritic sulphur content (< 0.5%) eliminates potential acid mine drainage risks.',
        ],
        recommendations: [
          'Advance Box-Cut #2 towards the southern sub-basin following Seam IX dip axis.',
          'Deploy continuous inclinometers along Fault Block F-02 boundary zone.',
        ],
      };
    }

    if (reportType === 'Mine Performance') {
      return {
        title: `MINE OPERATIONAL PERFORMANCE AUDIT — ${selectedMine.toUpperCase()} (${selectedYear})`,
        subtitle: `Heavy Machinery Availability, Haul Cycles & Slope Safety Index`,
        executiveSummary: `Comprehensive operational review for ${selectedMine} evaluating Heavy Earth Moving Machinery (HEMM) utilization, dragline stripping efficiency, and pit bench safety metrics under DGMS compliance regulations for ${selectedYear}.`,
        kpis: [
          { label: 'HEMM Fleet Availability', value: '86.4%', status: 'Target: 80%' },
          { label: 'Dumper Cycle Time', value: '16.4 mins', status: '2.8 km Haul' },
          { label: 'Overburden Stripping Ratio', value: '2.45 m³/T', status: 'Economically Feasible' },
          { label: 'Lost Time Injury Frequency', value: '0.00', status: 'Zero Fatalities' },
        ],
        tableHeaders: ['Fleet Unit', 'Equipment Type', 'Capacity', 'Availability %', 'Utilization %'],
        tableRows: [
          ['Shovel Fleet #1', 'P&H 2800XPB Electric', '33 m³ Bucket', '88.2%', '74.5%'],
          ['Dumper Fleet #A', 'CAT 793D Rigid Rear', '240 Tonne', '84.5%', '71.0%'],
          ['Dragline D-02', 'HMC W2000 Walking', '24 m³ Boom 96m', '91.0%', '82.4%'],
          ['Continuous Silo', 'Rapid Train Loading Silo', '3,000 TPH', '96.5%', '88.0%'],
        ],
        observations: [
          'Highwall slope radar recorded steady displacement velocities under 0.4 mm/day throughout active blasting cycles.',
          'Blasting powder factor maintained at 1.47 Cu.m/kg with optimum fragmentation (K50 = 0.28m).',
        ],
        recommendations: [
          'Complete secondary haul road surfacing with compacted slag to lower truck rolling resistance.',
          'Implement automated telemetry fuel sensors across contractor auxiliary fleets.',
        ],
      };
    }

    // Default: Production Summary
    return {
      title: `CONSOLIDATED COAL PRODUCTION & LOGISTICS REPORT — ${selectedYear}`,
      subtitle: `Annual Extraction, Rake Allotment & Thermal Power Plant Dispatches`,
      executiveSummary: `Executive summary synthesizing production and dispatch achievements across Eastern and Central command pits for FY ${selectedYear}. Gross annual production reached 69.42 MT against target 68.0 MT (102.1% achievement), with 71.05 MT evacuated via Indian Railways and MGR conveyor systems.`,
      kpis: [
        { label: 'Gross Annual Production', value: '69.42 MT', status: '102.1% Target Achieved' },
        { label: 'Total Coal Dispatch', value: '71.05 MT', status: '82% via Rail Freight' },
        { label: 'Overburden Removed', value: '182.40 M.Cu.m', status: 'Stripping: 2.63 m³/T' },
        { label: 'Ending Pithead Stock', value: '3.22 MT', status: 'Healthy Drawdown' },
      ],
      tableHeaders: ['Mining Sector', 'Annual Target (MT)', 'Actual Extraction (MT)', 'Dispatch (MT)', 'Achievement %'],
      tableRows: [
        ['North Karanpura Complex', '28.00 MT', '28.60 MT', '29.10 MT', '102.1%'],
        ['Singrauli Mega Pit', '22.50 MT', '22.80 MT', '23.40 MT', '101.3%'],
        ['Barkakana Block IV', '12.00 MT', '12.40 MT', '12.65 MT', '103.3%'],
        ['Central West Opencast', '6.00 MT', '5.80 MT', '5.90 MT', '96.7%'],
      ],
      observations: [
        'Railway siding average loading turnaround improved from 4.2 hours to 2.8 hours per 58-wagon rake.',
        'Zero demurrage penalties incurred across major super thermal power station sidings.',
      ],
      recommendations: [
        'Expand Rajmahal Phase II pit extraction to meet approved FY 2025-26 target of 74.0 MT.',
        'Commission the 14 km overland belt conveyor at Sonepur Bazari.',
      ],
    };
  };

  const report = getReportContent();

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvRows = [];
    csvRows.push([`"${report.title}"`]);
    csvRows.push([`"${report.subtitle}"`]);
    csvRows.push([]);
    csvRows.push([`"Executive Summary:"`, `"${report.executiveSummary}"`]);
    csvRows.push([]);
    csvRows.push([`"Key Parameters:"`]);
    report.kpis.forEach((kpi) => {
      csvRows.push([`"${kpi.label}"`, `"${kpi.value}"`, `"${kpi.status}"`]);
    });
    csvRows.push([]);
    csvRows.push(report.tableHeaders.map((h) => `"${h}"`));
    report.tableRows.forEach((row) => {
      csvRows.push(row.map((c) => `"${c}"`));
    });

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CoalIntel-Report-${selectedYear}-${Date.now()}.csv`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Page Header (No Print) */}
      <div className="page-header no-print">
        <div>
          <h1 className="page-header-title">Enterprise Report Builder</h1>
          <p className="page-header-desc">
            Generate printable and exportable statutory engineering summaries, geological evaluations, and production audits.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={handleExportCSV} className="btn btn-secondary btn-sm">
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button onClick={handlePrint} className="btn btn-primary btn-sm">
            <Printer size={14} />
            <span>Print Official Report</span>
          </button>
        </div>
      </div>

      {/* Parameter Controls Panel (No Print) */}
      <div
        className="card no-print"
        style={{
          padding: '16px 20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
          gap: '14px',
        }}
      >
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Report Template Type
          </label>
          <select
            className="form-select"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="Production Summary">Production & Dispatch Summary</option>
            <option value="Geological Overview">Geological & Stratigraphy Overview</option>
            <option value="Mine Performance">Mine Operational Performance</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Mine / Block Focus
          </label>
          <select
            className="form-select"
            value={selectedMine}
            onChange={(e) => setSelectedMine(e.target.value)}
          >
            <option value="North Karanpura">North Karanpura</option>
            <option value="Barkakana Block">Barkakana Block</option>
            <option value="Singrauli Block">Singrauli Block</option>
            <option value="Central West Mine">Central West Mine</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Fiscal Year
          </label>
          <select
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2025">FY 2024-25</option>
            <option value="2024">FY 2023-24</option>
            <option value="2023">FY 2022-23</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Classification Stamp
          </label>
          <select
            className="form-select"
            value={classification}
            onChange={(e) => setClassification(e.target.value)}
          >
            <option value="OFFICIAL / RESTRICTED">OFFICIAL / RESTRICTED</option>
            <option value="CONFIDENTIAL">CONFIDENTIAL</option>
            <option value="PUBLIC GAZETTE">PUBLIC GAZETTE</option>
          </select>
        </div>
      </div>

      {/* Generated Report Printable Document Card */}
      <div
        className="card printable-report"
        style={{
          backgroundColor: '#ffffff',
          border: '1px solid #cbd5e1',
          padding: '36px 40px',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Report Top Industrial Header */}
        <div
          style={{
            borderBottom: '2px solid #1e2430',
            paddingBottom: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 800,
                  color: '#b58a3a',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.8px',
                }}
              >
                COAL INTELLIGENCE DIGITAL KNOWLEDGE PLATFORM
              </span>
              <span>•</span>
              <span className="font-mono" style={{ fontSize: '11px', color: '#64748b' }}>
                REF: CI-REP-{selectedYear}-{selectedMine.substring(0, 3).toUpperCase()}
              </span>
            </div>
            <h2
              style={{
                fontSize: '20px',
                fontWeight: 800,
                color: '#12161d',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {report.title}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>
              {report.subtitle}
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span
              className="badge badge-dark font-mono"
              style={{ fontSize: '10.5px', color: '#b58a3a', padding: '4px 8px' }}
            >
              {classification}
            </span>
            <div
              className="font-mono"
              style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}
            >
              Generated: {new Date().toISOString().split('T')[0]}
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1e293b',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '4px', height: '14px', backgroundColor: '#b58a3a', display: 'inline-block' }} />
            1.0 Executive Summary
          </h3>
          <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6 }}>
            {report.executiveSummary}
          </p>
        </div>

        {/* Section 2: Key Operational Metrics */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1e293b',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '4px', height: '14px', backgroundColor: '#b58a3a', display: 'inline-block' }} />
            2.0 Certified Key Performance Metrics
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {report.kpis.map((kpi) => (
              <div
                key={kpi.label}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>
                  {kpi.label}
                </div>
                <div className="font-mono" style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b', marginTop: '2px' }}>
                  {kpi.value}
                </div>
                <div style={{ fontSize: '11px', color: '#b58a3a', fontWeight: 500, marginTop: '2px' }}>
                  {kpi.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Data Table */}
        <div style={{ marginBottom: '24px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1e293b',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '4px', height: '14px', backgroundColor: '#b58a3a', display: 'inline-block' }} />
            3.0 Granular Operational Data Breakdown
          </h3>

          <div className="table-container" style={{ border: '1px solid #cbd5e1' }}>
            <table className="data-table">
              <thead>
                <tr>
                  {report.tableHeaders.map((hdr) => (
                    <th key={hdr}>{hdr}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {report.tableRows.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={cIdx === 0 ? 'font-mono' : ''} style={{ fontWeight: cIdx === 0 ? 600 : 400 }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Observations & Recommendations */}
        <div style={{ marginBottom: '32px' }}>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: 700,
              color: '#1e293b',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ width: '4px', height: '14px', backgroundColor: '#b58a3a', display: 'inline-block' }} />
            4.0 Strategic Observations & Engineering Directives
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Key Observations:
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.5 }}>
                {report.observations.map((obs, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{obs}</li>
                ))}
              </ul>
            </div>

            <div style={{ padding: '14px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', marginBottom: '8px' }}>
                Engineering Directives:
              </div>
              <ul style={{ paddingLeft: '18px', fontSize: '12.5px', color: '#334155', lineHeight: 1.5 }}>
                {report.recommendations.map((rec, i) => (
                  <li key={i} style={{ marginBottom: '4px' }}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Certified Sign-Off Block */}
        <div
          style={{
            borderTop: '1px solid #cbd5e1',
            paddingTop: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: '#64748b',
          }}
        >
          <div>
            <div style={{ fontWeight: 700, color: '#1e293b' }}>
              {currentUser ? currentUser.name : 'Dr. Rajeshwar Sharma'}
            </div>
            <div>{currentUser ? currentUser.role : 'Management'} — {currentUser ? currentUser.department : 'Operations'}</div>
            <div className="font-mono" style={{ color: '#b58a3a', marginTop: '2px' }}>
              DIGITALLY SEALED: SHA256-CERT-OK
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, color: '#1e293b' }}>Coal Intelligence Repository Registry</div>
            <div>Damodar Mining Information Center</div>
            <div className="font-mono">STATUS: AUDIT-COMPLIANT</div>
          </div>
        </div>
      </div>
    </div>
  );
}
