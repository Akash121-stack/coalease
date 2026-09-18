import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Search from './pages/Search';
import Repository from './pages/Repository';
import DocumentViewer from './pages/DocumentViewer';
import Upload from './pages/Upload';
import Verification from './pages/Verification';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import History from './pages/History';
import MineExplorer from './pages/MineExplorer';
import KnowledgeTrends from './pages/KnowledgeTrends';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { initializeStorage } from './utils/storage';

export default function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected App Routes wrapped by Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="search" element={<Search />} />
        <Route path="repository" element={<Repository />} />
        <Route path="documents/:id" element={<DocumentViewer />} />
        <Route path="upload" element={<Upload />} />
        <Route path="verification" element={<Verification />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="history" element={<History />} />
        <Route path="mines" element={<MineExplorer />} />
        <Route path="trends" element={<KnowledgeTrends />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
