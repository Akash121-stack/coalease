import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { getCurrentUser } from '../utils/storage';

export default function Layout() {
  const currentUser = getCurrentUser();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Authentication Protection: If not logged in, redirect to /login
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="app-container">
      <Sidebar mobileOpen={mobileOpen} onCloseMobile={() => setMobileOpen(false)} />

      <div className="main-content-wrapper">
        <Topbar onToggleMobile={() => setMobileOpen(!mobileOpen)} />
        <main className="page-body animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
