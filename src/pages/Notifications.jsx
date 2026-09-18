import React, { useState, useEffect } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import NotificationItem from '../components/NotificationItem';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from '../utils/storage';

export default function Notifications() {
  const [notifications, setNotifications] = useState(getNotifications());
  const [filterTab, setFilterTab] = useState('all'); // 'all' or 'unread'

  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  const handleMarkRead = (id) => {
    const updated = markNotificationRead(id);
    setNotifications([...updated]);
  };

  const handleMarkAllRead = () => {
    const updated = markAllNotificationsRead();
    setNotifications([...updated]);
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filterTab === 'unread') return !n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">Notification Center</h1>
            {unreadCount > 0 && (
              <span className="badge badge-gold font-mono">{unreadCount} UNREAD</span>
            )}
          </div>
          <p className="page-header-desc">
            System activity alerts, verification status notifications, and corporate production updates.
          </p>
        </div>

        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="btn btn-secondary btn-sm">
            <Check size={14} />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="tabs-header">
        <button
          onClick={() => setFilterTab('all')}
          className={`tab-btn ${filterTab === 'all' ? 'active' : ''}`}
        >
          <span>All Notifications</span>
          <span className="tab-count-badge">{notifications.length}</span>
        </button>

        <button
          onClick={() => setFilterTab('unread')}
          className={`tab-btn ${filterTab === 'unread' ? 'active' : ''}`}
        >
          <span>Unread Alerts</span>
          <span className="tab-count-badge">{unreadCount}</span>
        </button>
      </div>

      {/* Notifications List Card */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {filteredNotifs.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <Bell size={32} color="#94a3b8" style={{ marginBottom: '8px' }} />
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
              No Notifications to Display
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
              You are all caught up with recent repository activities.
            </p>
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkRead={handleMarkRead}
            />
          ))
        )}
      </div>
    </div>
  );
}
