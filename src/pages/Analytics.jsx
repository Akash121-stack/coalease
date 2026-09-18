import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Layers,
  MapPin,
  Calendar,
  PieChart as PieIcon,
  ShieldCheck,
  FileText,
  Filter,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  PRODUCTION_TREND_DATA,
  MONTHLY_PRODUCTION_DATA,
  MINE_PRODUCTION_SHARE,
  DOCUMENT_GROWTH_DATA,
} from '../data/mockData';

export default function Analytics() {
  const [selectedMine, setSelectedMine] = useState('All');
  const [timeframe, setTimeframe] = useState('5Y');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Page Header & Filter Bar */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">Mining Analytics & Strategic Trends</h1>
            <span className="badge badge-gold font-mono">DAMODAR CORRIDOR</span>
          </div>
          <p className="page-header-desc">
            Granular extraction performance, rail dispatch metrics, overburden stripping ratios, and repository growth.
          </p>
        </div>

        {/* Global Chart Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            className="form-select"
            style={{ width: 'auto', padding: '6px 12px', fontSize: '12.5px' }}
            value={selectedMine}
            onChange={(e) => setSelectedMine(e.target.value)}
          >
            <option value="All">All Operations Combined</option>
            <option value="North Karanpura">North Karanpura (28.6 MT)</option>
            <option value="Singrauli Block">Singrauli Block (22.8 MT)</option>
            <option value="Barkakana Block">Barkakana Block (12.4 MT)</option>
            <option value="Central West Mine">Central West Mine (5.8 MT)</option>
          </select>

          <div
            style={{
              display: 'flex',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            {['1Y', '3Y', '5Y'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                style={{
                  padding: '6px 12px',
                  border: 'none',
                  backgroundColor: timeframe === t ? '#b58a3a' : '#ffffff',
                  color: timeframe === t ? '#ffffff' : '#64748b',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Row 1: Production vs Dispatch 5-Year Trend & Monthly Seasonality */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '20px',
        }}
      >
        {/* 5-Year Production vs Dispatch */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <TrendingUp size={16} className="card-title-icon" />
                <span>Gross Coal Production vs Rake Dispatch (2020 - 2025)</span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Unit: Million Tonnes (MT) — Baseline CAGR: 9.1%
              </p>
            </div>
            <span className="badge badge-gold font-mono">2025: 74 MT TARGET</span>
          </div>

          <div style={{ width: '100%', height: '270px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PRODUCTION_TREND_DATA} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={12} fontFamily="monospace" unit=" MT" domain={[0, 85]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12161d',
                    borderColor: '#334155',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                  formatter={(val) => `${val} MT`}
                />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="production" name="Coal Production" fill="#b58a3a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dispatch" name="Coal Dispatch" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Production Seasonality */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Calendar size={16} className="card-title-icon" />
                <span>Monthly Production Breakdown (FY 2024-25)</span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Seasonal dip during monsoon (Jul-Aug) compensated by Q4 surge (Jan-Mar)
              </p>
            </div>
          </div>

          <div style={{ width: '100%', height: '270px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_PRODUCTION_DATA}>
                <defs>
                  <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={12} fontFamily="monospace" unit=" MT" domain={[3, 9]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12161d',
                    borderColor: '#334155',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                  formatter={(val) => `${val} MT`}
                />
                <Legend verticalAlign="top" height={36} />
                <Area
                  type="monotone"
                  dataKey="production"
                  name="Monthly Production"
                  stroke="#16a34a"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorMonth)"
                />
                <Area
                  type="monotone"
                  dataKey="dispatch"
                  name="Monthly Dispatch"
                  stroke="#2563eb"
                  strokeWidth={2}
                  fillOpacity={0}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Mine-Wise Tonnage Share & Overburden Stripping Ratio */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))',
          gap: '20px',
        }}
      >
        {/* Mine-Wise Production Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <MapPin size={16} className="card-title-icon" />
              <span>Mine-Wise Production Contribution (74.0 MT Total)</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ width: '220px', height: '220px', margin: '0 auto' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MINE_PRODUCTION_SHARE}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {MINE_PRODUCTION_SHARE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#12161d',
                      borderColor: '#334155',
                      borderRadius: '6px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontFamily: 'monospace',
                    }}
                    formatter={(val) => `${val} MT`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {MINE_PRODUCTION_SHARE.map((mine) => (
                <div
                  key={mine.name}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    backgroundColor: '#f8fafc',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '2px',
                        backgroundColor: mine.color,
                        display: 'inline-block',
                      }}
                    />
                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{mine.name}</span>
                  </div>
                  <span className="font-mono" style={{ fontWeight: 700, color: '#334155' }}>
                    {mine.value} MT ({mine.share})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Overburden Removal vs Coal Ratio */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <Layers size={16} className="card-title-icon" />
                <span>Overburden (OB) Removal vs Stripping Ratio</span>
              </div>
              <p style={{ fontSize: '11.5px', color: '#64748b' }}>
                Composite OB moved (M.Cu.m) vs Coal mined
              </p>
            </div>
            <span className="badge badge-verified font-mono">Ratio: 2.63 m³/T</span>
          </div>

          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={PRODUCTION_TREND_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="year" stroke="#64748b" fontSize={12} fontFamily="monospace" />
                <YAxis stroke="#64748b" fontSize={12} fontFamily="monospace" unit=" M.Cu.m" domain={[100, 220]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#12161d',
                    borderColor: '#334155',
                    borderRadius: '6px',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontFamily: 'monospace',
                  }}
                  formatter={(val) => `${val} M.Cu.m`}
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="overburden"
                  name="Overburden Handled (M.Cu.m)"
                  stroke="#b58a3a"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#b58a3a' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Repository Document Growth Trends */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <FileText size={16} className="card-title-icon" />
            <span>Digital Repository Knowledge Ingestion Trajectory (2020 - 2025)</span>
          </div>
          <span className="badge badge-gold font-mono">262 TOTAL DIGITAL ASSETS</span>
        </div>

        <div style={{ width: '100%', height: '250px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={DOCUMENT_GROWTH_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="year" stroke="#64748b" fontSize={12} fontFamily="monospace" />
              <YAxis stroke="#64748b" fontSize={12} fontFamily="monospace" domain={[0, 95]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#12161d',
                  borderColor: '#334155',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                }}
              />
              <Legend verticalAlign="top" height={36} />
              <Area type="monotone" dataKey="geological" name="Geological Logs" stroke="#b58a3a" fill="#b58a3a" fillOpacity={0.25} />
              <Area type="monotone" dataKey="mining" name="Mining Reports" stroke="#2563eb" fill="#2563eb" fillOpacity={0.25} />
              <Area type="monotone" dataKey="production" name="Production Datasets" stroke="#16a34a" fill="#16a34a" fillOpacity={0.25} />
              <Area type="monotone" dataKey="historical" name="Historical Archives" stroke="#64748b" fill="#64748b" fillOpacity={0.25} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
