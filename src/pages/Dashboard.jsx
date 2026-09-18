import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  CheckCircle2,
  Clock,
  TrendingUp,
  Database,
  Layers,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  UploadCloud,
  FileCheck,
  Compass,
  HardHat,
  Users,
  Activity as ActivityIcon,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import DocumentCard from '../components/DocumentCard';
import {
  getCurrentUser,
  getDocuments,
  getActivities,
  getMines,
} from '../utils/storage';
import { PRODUCTION_TREND_DATA } from '../data/mockData';

export default function Dashboard() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [documents, setDocuments] = useState(getDocuments());
  const [activities, setActivities] = useState(getActivities());
  const [mines, setMines] = useState(getMines());

  useEffect(() => {
    setCurrentUser(getCurrentUser());
    setDocuments(getDocuments());
    setActivities(getActivities());
    setMines(getMines());
  }, []);

  const totalDocs = documents.length;
  const verifiedDocs = documents.filter((d) => d.status === 'Verified').length;
  const pendingDocs = documents.filter((d) => d.status === 'Pending').length;
  const productionDocs = documents.filter((d) => d.category === 'Production').length;
  const geologicalDocs = documents.filter((d) => d.category === 'Geological').length;
  const miningDocs = documents.filter((d) => d.category === 'Mining').length;
  const historicalDocs = documents.filter((d) => d.category === 'Historical').length;

  // Role-adaptive Stats
  const renderRoleStats = () => {
    const role = currentUser ? currentUser.role : 'Management';

    if (role === 'Geologist') {
      return (
        <div className="stats-grid">
          <StatCard
            title="Geological Records"
            value={geologicalDocs}
            trend="+12% this quarter"
            trendType="up"
            icon={Compass}
            accentColor="#b58a3a"
            badgeText="Geologist Focus"
          />
          <StatCard
            title="Active Boreholes Logged"
            value="318 Logs"
            subtitle="Across 4 Blocks"
            trend="+18 new cores"
            trendType="up"
            icon={Layers}
            accentColor="#2563eb"
          />
          <StatCard
            title="Verified Geological Datasets"
            value={`${verifiedDocs} of ${totalDocs}`}
            trend="100% UNFC Compliant"
            trendType="neutral"
            icon={CheckCircle2}
            accentColor="#16a34a"
          />
          <StatCard
            title="Pending Stratum Review"
            value={pendingDocs}
            subtitle="Awaiting sign-off"
            trendType="neutral"
            icon={Clock}
            accentColor="#d97706"
          />
        </div>
      );
    }

    if (role === 'Mining Engineer') {
      return (
        <div className="stats-grid">
          <StatCard
            title="Total Mine Records"
            value={miningDocs + geologicalDocs}
            trend="+8% this quarter"
            trendType="up"
            icon={HardHat}
            accentColor="#b58a3a"
            badgeText="Engineering Focus"
          />
          <StatCard
            title="Active Opencast Mines"
            value="4 Mines"
            subtitle="Central & Eastern Corridors"
            trend="100% Operational"
            trendType="neutral"
            icon={MapPin}
            accentColor="#2563eb"
          />
          <StatCard
            title="Gross Extraction Run Rate"
            value="74.0 MT"
            trend="+7.2% YoY growth"
            trendType="up"
            icon={TrendingUp}
            accentColor="#16a34a"
          />
          <StatCard
            title="Operations Pending Sign-Off"
            value={pendingDocs}
            subtitle="Verification required"
            trendType="neutral"
            icon={Clock}
            accentColor="#d97706"
          />
        </div>
      );
    }

    if (role === 'Field Worker') {
      return (
        <div className="stats-grid">
          <StatCard
            title="My Field Submissions"
            value="3 Uploads"
            trend="All indexed"
            trendType="up"
            icon={Users}
            accentColor="#b58a3a"
            badgeText="Field Worker"
          />
          <StatCard
            title="Verified Field Records"
            value={`${verifiedDocs} Records`}
            subtitle="Core & pit logs"
            trend="+5 verified"
            trendType="up"
            icon={CheckCircle2}
            accentColor="#16a34a"
          />
          <StatCard
            title="Active Drilling Sites"
            value="4 Blocks"
            subtitle="Barkakana & Karanpura"
            trend="Normal operations"
            trendType="neutral"
            icon={MapPin}
            accentColor="#2563eb"
          />
          <StatCard
            title="Pending Pit Verification"
            value={pendingDocs}
            subtitle="In verification queue"
            trendType="neutral"
            icon={Clock}
            accentColor="#d97706"
          />
        </div>
      );
    }

    // Default: Management
    return (
      <div className="stats-grid">
        <StatCard
          title="Total Repository Records"
          value={totalDocs}
          trend="+15% vs last year"
          trendType="up"
          icon={Database}
          accentColor="#b58a3a"
          badgeText="Executive Overview"
        />
        <StatCard
          title="Verified Mining Datasets"
          value={verifiedDocs}
          subtitle={`${Math.round((verifiedDocs / totalDocs) * 100)}% verification rate`}
          trend="Certified"
          trendType="up"
          icon={ShieldCheck}
          accentColor="#16a34a"
        />
        <StatCard
          title="Annual Coal Production Target"
          value="74.0 MT"
          subtitle="Dispatch: 71.0 MT (96%)"
          trend="+7.2% YoY"
          trendType="up"
          icon={TrendingUp}
          accentColor="#2563eb"
        />
        <StatCard
          title="Pending Approval & Verification"
          value={pendingDocs}
          subtitle="Awaiting Executive Sign-off"
          trendType="neutral"
          icon={Clock}
          accentColor="#d97706"
        />
      </div>
    );
  };

  const handleActivityClick = (act) => {
    if (act.documentId) {
      navigate(`/documents/${act.documentId}`);
    } else {
      navigate('/history');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">Enterprise Dashboard</h1>
            <span className="badge badge-dark font-mono">DAMODAR CORRIDOR</span>
          </div>
          <p className="page-header-desc">
            Centralized intelligence monitoring for geological surveys, coal production, and statutory mine records.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/upload" className="btn btn-secondary btn-sm">
            <UploadCloud size={14} />
            <span>Upload New Data</span>
          </Link>

          <Link to="/search" className="btn btn-primary btn-sm">
            <Database size={14} />
            <span>Search All Records</span>
          </Link>
        </div>
      </div>

      {/* Role-Adaptive Statistics Cards */}
      {renderRoleStats()}

      {/* Main Charts & Analytics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Production Trend 2020-2025 */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <TrendingUp size={16} className="card-title-icon" />
                <span>Coal Production vs Dispatch Trajectory (2020 - 2025)</span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                Unit: Million Tonnes (MT) — Baseline Historical & Current Projections
              </p>
            </div>
            <span className="badge badge-gold font-mono">2020 → 2025 (+54%)</span>
          </div>

          <div style={{ width: '100%', height: '280px', marginTop: '10px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PRODUCTION_TREND_DATA}>
                <defs>
                  <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#b58a3a" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#b58a3a" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorDisp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} fontFamily="monospace" />
                <YAxis
                  stroke="#64748b"
                  fontSize={12}
                  fontFamily="monospace"
                  domain={[35, 85]}
                  unit=" MT"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12161d',
                    borderColor: '#334155',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                  formatter={(value, name) => [`${value} MT`, name === 'production' ? 'Gross Production' : 'Rake Dispatch']}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => (value === 'production' ? 'Coal Production (MT)' : 'Coal Dispatch (MT)')}
                />
                <Area
                  type="monotone"
                  dataKey="production"
                  stroke="#b58a3a"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorProd)"
                />
                <Area
                  type="monotone"
                  dataKey="dispatch"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorDisp)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Document Categories & Data Quality Distribution */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Categories Breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Layers size={16} className="card-title-icon" />
                <span>Document Categories Breakdown</span>
              </div>
              <Link
                to="/repository"
                style={{ fontSize: '12px', color: '#b58a3a', textDecoration: 'none', fontWeight: 600 }}
              >
                Browse All →
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                    Geological
                  </span>
                  <span className="badge badge-gold font-mono">{geologicalDocs} Docs</span>
                </div>
                <div
                  style={{
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    marginTop: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(geologicalDocs / totalDocs) * 100}%`,
                      backgroundColor: '#b58a3a',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                    Mining
                  </span>
                  <span className="badge badge-info font-mono">{miningDocs} Docs</span>
                </div>
                <div
                  style={{
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    marginTop: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(miningDocs / totalDocs) * 100}%`,
                      backgroundColor: '#2563eb',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                    Production
                  </span>
                  <span className="badge badge-verified font-mono">{productionDocs} Docs</span>
                </div>
                <div
                  style={{
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    marginTop: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(productionDocs / totalDocs) * 100}%`,
                      backgroundColor: '#16a34a',
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  padding: '12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                    Historical
                  </span>
                  <span className="badge badge-dark font-mono">{historicalDocs} Docs</span>
                </div>
                <div
                  style={{
                    height: '6px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    marginTop: '8px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${(historicalDocs / totalDocs) * 100}%`,
                      backgroundColor: '#475569',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Quality Health */}
          <div className="card">
            <div className="card-header" style={{ marginBottom: '10px' }}>
              <div className="card-title">
                <FileCheck size={16} className="card-title-icon" />
                <span>Repository Data Quality & Verification Status</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  backgroundColor: '#dcfce7',
                  border: '1px solid #86efac',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#166534', fontWeight: 700 }}>
                  VERIFIED
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: '18px', fontWeight: 800, color: '#14532d' }}
                >
                  {verifiedDocs} Records
                </div>
                <div style={{ fontSize: '10.5px', color: '#15803d' }}>
                  {Math.round((verifiedDocs / totalDocs) * 100)}% of total catalog
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fcd34d',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#854d0e', fontWeight: 700 }}>
                  PENDING REVIEW
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: '18px', fontWeight: 800, color: '#78350f' }}
                >
                  {pendingDocs} Records
                </div>
                <div style={{ fontSize: '10.5px', color: '#b45309' }}>
                  Awaiting sign-off
                </div>
              </div>

              <div
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                }}
              >
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>
                  NEEDS REVIEW
                </div>
                <div
                  className="font-mono"
                  style={{ fontSize: '18px', fontWeight: 800, color: '#334155' }}
                >
                  0 Records
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                  Clean index
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Grid: Recent Activity (Clickable) & Recently Updated Documents */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px',
        }}
      >
        {/* A. Recent Activity (CLICKABLE TO OPEN DOCUMENT) */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <ActivityIcon size={16} className="card-title-icon" />
              <span>Recent Operational Activity</span>
            </div>
            <Link
              to="/history"
              style={{ fontSize: '12px', color: '#b58a3a', textDecoration: 'none', fontWeight: 600 }}
            >
              Full Audit Log →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activities.slice(0, 5).map((act) => (
              <div
                key={act.id}
                onClick={() => handleActivityClick(act)}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#faf6ed';
                  e.currentTarget.style.borderColor = '#b58a3a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#eef2f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#b58a3a',
                      marginTop: '2px',
                    }}
                  >
                    <FileText size={14} />
                  </div>

                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b' }}>
                      {act.title}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11.5px',
                        color: '#64748b',
                        marginTop: '2px',
                      }}
                    >
                      <span className="font-mono">{act.user}</span>
                      <span>•</span>
                      <span className="font-mono" style={{ color: '#b58a3a' }}>
                        {act.documentId || 'System'}
                      </span>
                      <span>•</span>
                      <span>{act.time}</span>
                    </div>
                  </div>
                </div>

                <ChevronRight size={16} color="#94a3b8" />
              </div>
            ))}
          </div>
        </div>

        {/* E. Recently Updated Documents (CLICKABLE TO OPEN PDF) */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Database size={16} className="card-title-icon" />
              <span>Recently Updated Documents</span>
            </div>
            <Link
              to="/repository"
              style={{ fontSize: '12px', color: '#b58a3a', textDecoration: 'none', fontWeight: 600 }}
            >
              Repository View →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {documents.slice(0, 4).map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/documents/${doc.id}`)}
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#faf6ed';
                  e.currentTarget.style.borderColor = '#b58a3a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                    <span className="font-mono" style={{ fontSize: '11.5px', color: '#b58a3a', fontWeight: 700 }}>
                      {doc.id}
                    </span>
                    <span className="badge badge-dark" style={{ fontSize: '10px' }}>
                      {doc.category}
                    </span>
                    <StatusBadge status={doc.status} />
                  </div>

                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#1e293b',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {doc.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>
                    {doc.mine} • {doc.pages} Pages • Updated {doc.date}
                  </div>
                </div>

                <div className="btn btn-primary btn-sm" style={{ padding: '4px 8px', fontSize: '11px' }}>
                  Open PDF
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
