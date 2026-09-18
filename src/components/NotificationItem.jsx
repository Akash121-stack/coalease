import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  ArrowRight,
  Check,
} from 'lucide-react';

export default function NotificationItem({
  notification,
  onMarkRead,
  onSelect,
}) {
  const navigate = useNavigate();
  const { id, title, category, read, timestamp, link, severity } = notification;

  const handleClick = () => {
    if (!read && onMarkRead) {
      onMarkRead(id);
    }
    if (onSelect) {
      onSelect(notification);
    } else if (link) {
      navigate(link);
    }
  };

  const getIcon = () => {
    if (severity === 'success') return <CheckCircle2 size={16} color="#16a34a" />;
    if (severity === 'warning') return <AlertTriangle size={16} color="#d97706" />;
    return <Info size={16} color="#2563eb" />;
  };

  return (
    <div
      onClick={handleClick}
      style={{
        padding: '14px 18px',
        borderBottom: '1px solid #f1f5f9',
        backgroundColor: read ? '#ffffff' : '#faf8f4',
        borderLeft: read ? '3px solid transparent' : '3px solid #b58a3a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = read ? '#ffffff' : '#faf8f4')
      }
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1 }}>
        <div style={{ marginTop: '2px' }}>{getIcon()}</div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#475569',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {category}
            </span>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>•</span>
            <span
              className="font-mono"
              style={{ fontSize: '11px', color: '#94a3b8' }}
            >
              {timestamp}
            </span>
          </div>

          <p
            style={{
              fontSize: '13.5px',
              fontWeight: read ? 500 : 600,
              color: '#1e293b',
              lineHeight: 1.4,
            }}
          >
            {title}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {!read && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onMarkRead) onMarkRead(id);
            }}
            className="btn btn-secondary btn-sm"
            style={{ padding: '3px 8px', fontSize: '11px' }}
            title="Mark as read"
          >
            <Check size={12} />
            <span>Mark Read</span>
          </button>
        )}

        <ArrowRight size={15} color="#94a3b8" />
      </div>
    </div>
  );
}
