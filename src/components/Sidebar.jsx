import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Database,
  MapPin,
  BarChart3,
  FileSpreadsheet,
  TrendingUp,
  UploadCloud,
  CheckSquare,
  History,
  Bell,
  User,
  LogOut,
  Layers,
  Sparkles,
  Shield,
} from 'lucide-react';
import { getCurrentUser, clearCurrentUser, getNotifications, getDocuments } from '../utils/storage';

export default function Sidebar({ mobileOpen = false, onCloseMobile }) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const notifications = getNotifications();
  const unreadCount = notifications.filter((n) => !n.read).length;
  const pendingDocs = getDocuments().filter((d) => d.status === 'Pending').length;

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/login');
  };

  const handleLinkClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <aside className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-logo-icon">CI</div>
        <div className="sidebar-brand-text">
          <h1>Coal Intelligence</h1>
          <p>Digital Mine Knowledge</p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {/* Main Section */}
        <div>
          <div className="nav-section-title">Core Knowledge</div>
          <div className="nav-links-group">
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </NavLink>

            <NavLink
              to="/search"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <Search size={17} />
              <span>Search Repository</span>
            </NavLink>

            <NavLink
              to="/repository"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <Database size={17} />
              <span>Data Repository</span>
            </NavLink>

            <NavLink
              to="/mines"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <MapPin size={17} />
              <span>Mine Explorer</span>
            </NavLink>

            <NavLink
              to="/analytics"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <BarChart3 size={17} />
              <span>Analytics & Trends</span>
            </NavLink>

            <NavLink
              to="/reports"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <FileSpreadsheet size={17} />
              <span>Report Builder</span>
            </NavLink>

            <NavLink
              to="/trends"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <TrendingUp size={17} />
              <span>Knowledge Topics</span>
            </NavLink>
          </div>
        </div>

        {/* Data Management Section */}
        <div>
          <div className="nav-section-title">Data Pipeline</div>
          <div className="nav-links-group">
            <NavLink
              to="/upload"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <UploadCloud size={17} />
              <span>Upload Document</span>
            </NavLink>

            <NavLink
              to="/verification"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <CheckSquare size={17} />
              <span>Verification</span>
              {pendingDocs > 0 && <span className="nav-badge">{pendingDocs}</span>}
            </NavLink>

            <NavLink
              to="/history"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <History size={17} />
              <span>Audit History</span>
            </NavLink>
          </div>
        </div>

        {/* System & Settings */}
        <div>
          <div className="nav-section-title">System & Security</div>
          <div className="nav-links-group">
            <NavLink
              to="/notifications"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <Bell size={17} />
              <span>Notifications</span>
              {unreadCount > 0 && <span className="nav-badge">{unreadCount}</span>}
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={handleLinkClick}
            >
              <User size={17} />
              <span>User Profile & Role</span>
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Footer Profile & Logout */}
      <div className="sidebar-footer">
        <div className="user-profile-widget">
          <div className="user-avatar-badge">
            {currentUser ? currentUser.avatar || 'CI' : 'CI'}
          </div>
          <div className="user-profile-info">
            <div className="user-profile-name">
              {currentUser ? currentUser.name : 'Demo User'}
            </div>
            <div className="user-profile-role">
              {currentUser ? currentUser.role : 'Guest'}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="logout-icon-btn"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
