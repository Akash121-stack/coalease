import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  Database,
  Hash,
  Activity,
  Flame,
} from 'lucide-react';
import { KNOWLEDGE_TOPICS } from '../data/mockData';

export default function KnowledgeTrends() {
  const navigate = useNavigate();

  const handleTopicClick = (topicName) => {
    navigate(`/search?q=${encodeURIComponent(topicName)}`);
  };

  const maxCount = Math.max(...KNOWLEDGE_TOPICS.map((t) => t.count));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">Knowledge Trends & Topic Clusters</h1>
            <span className="badge badge-gold font-mono">12 CORE CLUSTERS</span>
          </div>
          <p className="page-header-desc">
            Explore high-frequency geological entities, coal extraction terminology, and frequently queried repository tags.
          </p>
        </div>
      </div>

      {/* Info Callout */}
      <div
        style={{
          padding: '14px 18px',
          backgroundColor: '#ffffff',
          border: '1px solid #dfe3ea',
          borderLeft: '4px solid #b58a3a',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={18} color="#b58a3a" />
          <span style={{ fontSize: '13px', color: '#334155' }}>
            Click any topic tag or distribution bar below to instantly launch a filtered repository search.
          </span>
        </div>

        <span className="badge badge-dark font-mono">LIVE CORPUS INDEX</span>
      </div>

      {/* High-Frequency Topic Bars */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <TrendingUp size={16} className="card-title-icon" />
            <span>Frequent Topic Frequency Distribution & Search Volume</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {KNOWLEDGE_TOPICS.map((item, idx) => {
            const pct = Math.round((item.count / maxCount) * 100);
            return (
              <div
                key={item.topic}
                onClick={() => handleTopicClick(item.topic)}
                style={{
                  padding: '12px 16px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#fcf8f0';
                  e.currentTarget.style.borderColor = '#b58a3a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f8fafc';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        fontFamily: 'var(--font-mono)',
                        width: '20px',
                      }}
                    >
                      #{idx + 1}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
                      {item.topic}
                    </span>
                    <span className="badge badge-dark" style={{ fontSize: '10px' }}>
                      {item.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: 600,
                        color: '#16a34a',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {item.trend}
                    </span>
                    <span
                      className="font-mono"
                      style={{ fontSize: '14px', fontWeight: 800, color: '#b58a3a' }}
                    >
                      {item.count.toLocaleString()} Records
                    </span>
                    <ArrowRight size={14} color="#94a3b8" />
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  {item.desc}
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    height: '5px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '3px',
                    overflow: 'hidden',
                    marginTop: '4px',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${pct}%`,
                      backgroundColor: '#b58a3a',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
