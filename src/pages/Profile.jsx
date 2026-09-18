import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Building,
  ShieldCheck,
  MapPin,
  Calendar,
  Phone,
  Save,
  RotateCcw,
  CheckCircle2,
  HardHat,
  Compass,
  Briefcase,
  Users,
} from 'lucide-react';
import {
  getCurrentUser,
  updateCurrentUser,
  resetDemoData,
} from '../utils/storage';

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    location: '',
    phone: '',
  });

  const [saved, setSaved] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'Management',
        department: user.department || 'Operations',
        location: user.location || 'Kolkata HQ',
        phone: user.phone || '+91 98000 00000',
      });
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const updated = updateCurrentUser(formData);
    setCurrentUser(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleRoleSwitch = (newRole) => {
    let dept = 'Executive Operations & Strategic Planning';
    if (newRole === 'Geologist') dept = 'Geological Services & Core Exploration';
    if (newRole === 'Mining Engineer') dept = 'Mine Planning & Heavy Extraction';
    if (newRole === 'Field Worker') dept = 'Borehole Drilling & Pit Survey';

    const updated = updateCurrentUser({
      role: newRole,
      department: dept,
    });
    setCurrentUser(updated);
    setFormData((prev) => ({ ...prev, role: newRole, department: dept }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data back to default factory state?')) {
      resetDemoData();
      setResetMessage(true);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', maxWidth: '860px', margin: '0 auto' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-header-title">User Profile & Platform Settings</h1>
          <p className="page-header-desc">
            Manage your credentials, role privileges, regional headquarters, and demo data state.
          </p>
        </div>
      </div>

      {saved && (
        <div
          className="card"
          style={{
            backgroundColor: '#dcfce7',
            border: '1px solid #86efac',
            color: '#14532d',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
          }}
        >
          <CheckCircle2 size={16} />
          <span>Profile and workspace preferences saved to localStorage.</span>
        </div>
      )}

      {/* Main Profile Info Card */}
      <div className="card" style={{ padding: '24px' }}>
        {/* User Top Card Banner */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            borderBottom: '1px solid #f1f5f9',
            paddingBottom: '20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '10px',
              backgroundColor: '#12161d',
              border: '2px solid #b58a3a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#b58a3a',
              fontSize: '22px',
              fontWeight: 800,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {currentUser ? currentUser.avatar || 'CI' : 'CI'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1e293b' }}>
                {currentUser?.name}
              </h2>
              <span className="badge badge-gold font-mono">{currentUser?.role}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#64748b' }}>
              {currentUser?.department} • {currentUser?.location}
            </div>
            <div
              className="font-mono"
              style={{ fontSize: '11.5px', color: '#94a3b8', marginTop: '2px' }}
            >
              Account Active Since: {currentUser?.joinedDate || '2023-01-10'}
            </div>
          </div>
        </div>

        {/* Role Quick Switcher (Demo Feature) */}
        <div style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span
            style={{
              fontSize: '11.5px',
              fontWeight: 700,
              color: '#475569',
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
              display: 'block',
              marginBottom: '10px',
            }}
          >
            Switch Active Role Privilege (Live Simulation):
          </span>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '8px' }}>
            {[
              { role: 'Management', icon: Briefcase },
              { role: 'Geologist', icon: Compass },
              { role: 'Mining Engineer', icon: HardHat },
              { role: 'Field Worker', icon: Users },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = currentUser?.role === item.role;
              return (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleSwitch(item.role)}
                  className={`btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ justifyContent: 'flex-start', padding: '8px 12px' }}
                >
                  <Icon size={14} />
                  <span>{item.role}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '14px',
            }}
          >
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email (Read Only)</label>
              <input
                type="email"
                disabled
                className="form-input"
                style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                value={formData.email}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Department / Operations Unit</label>
              <input
                type="text"
                className="form-input"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Operating Location / Regional Center</label>
              <input
                type="text"
                className="form-input"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Contact</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label className="form-label">Active Role</label>
              <input
                type="text"
                disabled
                className="form-input"
                style={{ backgroundColor: '#f1f5f9', cursor: 'not-allowed' }}
                value={formData.role}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '10px',
              paddingTop: '16px',
              borderTop: '1px solid #f1f5f9',
            }}
          >
            <button type="submit" className="btn btn-primary">
              <Save size={14} />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </form>
      </div>

      {/* Demo Maintenance & Reset State Card */}
      <div className="card" style={{ padding: '20px', border: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>
              Factory Demo Data Reset
            </h3>
            <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
              Restore original synthetic boreholes, production reports, and initial notifications into localStorage.
            </p>
          </div>

          <button onClick={handleResetData} className="btn btn-secondary btn-sm" style={{ color: '#b91c1c' }}>
            <RotateCcw size={13} />
            <span>Reset Demo Seed Data</span>
          </button>
        </div>
      </div>
    </div>
  );
}
