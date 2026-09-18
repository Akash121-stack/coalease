import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  trend,
  trendType = 'up', // 'up', 'down', 'neutral'
  icon: Icon,
  accentColor = '#B58A3A',
  badgeText,
}) {
  return (
    <div className="stat-card">
      <div className="stat-accent-bar" style={{ backgroundColor: accentColor }} />
      <div className="stat-card-top">
        <span className="stat-card-label">{title}</span>
        {Icon && (
          <div className="stat-card-icon" style={{ color: accentColor }}>
            <Icon size={16} />
          </div>
        )}
      </div>

      <div className="stat-card-value">{value}</div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        {trend && (
          <div
            className="stat-card-trend"
            style={{
              color:
                trendType === 'up'
                  ? '#15803d'
                  : trendType === 'down'
                  ? '#b91c1c'
                  : '#64748b',
              fontWeight: 600,
            }}
          >
            {trendType === 'up' && <ArrowUpRight size={13} />}
            {trendType === 'down' && <ArrowDownRight size={13} />}
            {trendType === 'neutral' && <Minus size={13} />}
            <span>{trend}</span>
          </div>
        )}

        {subtitle && (
          <span style={{ fontSize: '11px', color: '#64748b' }}>{subtitle}</span>
        )}

        {badgeText && (
          <span className="badge badge-gold" style={{ fontSize: '10px' }}>
            {badgeText}
          </span>
        )}
      </div>
    </div>
  );
}
