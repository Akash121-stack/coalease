import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Sparkles,
  Bell,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ExternalLink,
  Layers,
} from 'lucide-react';
import { getCurrentUser, getNotifications, markNotificationRead } from '../utils/storage';

export default function Topbar({ onToggleMobile }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const notifications = getNotifications();
  const unreadNotifs = notifications.filter((n) => !n.read);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const handleAskAI = () => {
    const AI_URL = import.meta.env.VITE_AI_URL || 'http://localhost:3001';
    window.location.href = AI_URL;
  };

  const handleNotificationClick = (notif) => {
    markNotificationRead(notif.id);
    setShowNotifMenu(false);
    if (notif.link) navigate(notif.link);
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          onClick={onToggleMobile}
          className="logout-icon-btn"
          style={{ display: 'none' }}
          id="mobile-menu-trigger"
          aria-label="Toggle Menu"
        >
          <Menu size={20} />
        </button>

        <button
          onClick={() => navigate('/search')}
          className="topbar-search-btn"
          title="Open manual document search"
        >
          <Search size={14} />
          <span>Search records, boreholes, reports, mines...</span>
          <kbd
            style={{
              padding: '1px 5px',
              backgroundColor: '#e2e8f0',
              borderRadius: '4px',
              fontSize: '10px',
              fontFamily: 'monospace',
            }}
          >
            /
          </kbd>
        </button>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '11.5px',
            color: '#64748b',
            paddingLeft: '10px',
            borderLeft: '1px solid #e2e8f0',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              display: 'inline-block',
            }}
          />
          <span className="font-mono">NODE-DAMODAR-01: ONLINE</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Role Tag */}
        {currentUser && (
          <span
            className="badge badge-gold"
            style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <ShieldCheck size={12} />
            {currentUser.role}
          </span>
        )}

        {/* ASK AI EXTERNAL BUTTON */}
        <button
          onClick={handleAskAI}
          className="btn-ai-external"
          title="Launch External AI Chatbot (Separate App)"
        >
          <Sparkles size={14} />
          <span>Ask AI Assistant</span>
          <ExternalLink size={11} style={{ opacity: 0.7 }} />
        </button>

        {/* Notification Bell with Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="logout-icon-btn"
            style={{
              position: 'relative',
              backgroundColor: showNotifMenu ? '#f1f5f9' : 'transparent',
            }}
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unreadNotifs.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#ef4444',
                }}
              />
            )}
          </button>

          {showNotifMenu && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                width: '320px',
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                zIndex: 60,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#f8fafc',
                }}
              >
                <span style={{ fontSize: '13px', fontWeight: 700 }}>
                  Notifications ({unreadNotifs.length} new)
                </span>
                <Link
                  to="/notifications"
                  onClick={() => setShowNotifMenu(false)}
                  style={{
                    fontSize: '11.5px',
                    color: '#b58a3a',
                    fontWeight: 600,
                    textDecoration: 'none',
                  }}
                >
                  View All
                </Link>
              </div>

              <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
                {notifications.slice(0, 4).map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => handleNotificationClick(notif)}
                    style={{
                      padding: '10px 14px',
                      borderBottom: '1px solid #f8fafc',
                      cursor: 'pointer',
                      backgroundColor: notif.read ? '#ffffff' : '#faf8f4',
                      transition: 'background-color 0.15s',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = '#f1f5f9')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = notif.read
                        ? '#ffffff'
                        : '#faf8f4')
                    }
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                      }}
                    >
                      <div
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          marginTop: '6px',
                          backgroundColor: notif.read ? 'transparent' : '#b58a3a',
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            fontSize: '12px',
                            color: '#1e293b',
                            lineHeight: 1.4,
                          }}
                        >
                          {notif.title}
                        </p>
                        <span
                          style={{
                            fontSize: '10.5px',
                            color: '#94a3b8',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {notif.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Quick Link */}
        <Link
          to="/profile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <div className="user-avatar-badge" style={{ width: '30px', height: '30px' }}>
            {currentUser ? currentUser.avatar || 'CI' : 'CI'}
          </div>
        </Link>
      </div>
    </header>
  );
}
