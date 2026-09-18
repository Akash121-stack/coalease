import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  History as HistoryIcon,
  Search,
  Filter,
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { getActivities } from '../utils/storage';

export default function History() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState(getActivities());
  const [actionFilter, setActionFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setActivities(getActivities());
  }, []);

  const filteredActivities = activities.filter((act) => {
    if (actionFilter !== 'All' && act.type.toLowerCase() !== actionFilter.toLowerCase()) {
      return false;
    }
    if (roleFilter !== 'All' && (act.role || '').toLowerCase() !== roleFilter.toLowerCase()) {
      return false;
    }
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      const matchTitle = act.title.toLowerCase().includes(q);
      const matchUser = (act.user || '').toLowerCase().includes(q);
      const matchDoc = (act.documentId || '').toLowerCase().includes(q);
      if (!matchTitle && !matchUser && !matchDoc) return false;
    }
    return true;
  });

  const getActionBadge = (type) => {
    switch (type) {
      case 'upload':
        return <span className="badge badge-info">UPLOAD</span>;
      case 'verify':
        return <span className="badge badge-verified">VERIFIED</span>;
      case 'reject':
        return <span className="badge badge-rejected">REJECTED</span>;
      case 'report':
        return <span className="badge badge-gold">REPORT</span>;
      case 'update':
        return <span className="badge badge-dark">UPDATE</span>;
      default:
        return <span className="badge badge-dark">SYSTEM</span>;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">System Audit & Data History</h1>
            <span className="badge badge-gold font-mono">
              {activities.length} LOGGED EVENTS
            </span>
          </div>
          <p className="page-header-desc">
            Immutable chronological audit trail of all document uploads, quality certifications, and repository modifications.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '360px' }}>
          <Search
            size={15}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '36px', height: '36px', fontSize: '13px' }}
            placeholder="Filter by user, action, doc ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            className="form-select"
            style={{ padding: '6px 12px', fontSize: '12.5px', height: '36px', width: 'auto' }}
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="All">All Action Types</option>
            <option value="upload">Uploads</option>
            <option value="verify">Verifications</option>
            <option value="update">Updates</option>
            <option value="report">Report Generations</option>
          </select>

          <select
            className="form-select"
            style={{ padding: '6px 12px', fontSize: '12.5px', height: '36px', width: 'auto' }}
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All Roles</option>
            <option value="Management">Management</option>
            <option value="Geologist">Geologists</option>
            <option value="Mining Engineer">Mining Engineers</option>
            <option value="Field Worker">Field Workers</option>
          </select>
        </div>
      </div>

      {/* Chronological Audit Table */}
      <div className="card">
        <div className="table-container" style={{ border: 'none', boxShadow: 'none' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ width: '130px' }}>Action Type</th>
                <th>Event Description</th>
                <th>Actor / User</th>
                <th>Role</th>
                <th>Target Record</th>
                <th>Time & Date</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.map((act) => (
                <tr key={act.id}>
                  <td>{getActionBadge(act.type)}</td>

                  <td>
                    <div style={{ fontWeight: 600, color: '#1e293b' }}>
                      {act.title}
                    </div>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <User size={13} color="#64748b" />
                      <span style={{ fontWeight: 500, color: '#334155' }}>
                        {act.user}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                      {act.role || 'Operator'}
                    </span>
                  </td>

                  <td>
                    {act.documentId ? (
                      <Link
                        to={`/documents/${act.documentId}`}
                        className="font-mono"
                        style={{ color: '#b58a3a', fontWeight: 700, textDecoration: 'none' }}
                      >
                        {act.documentId}
                      </Link>
                    ) : (
                      <span className="font-mono" style={{ color: '#94a3b8', fontSize: '11px' }}>
                        SYSTEM-LOG
                      </span>
                    )}
                  </td>

                  <td>
                    <span className="font-mono" style={{ fontSize: '11.5px', color: '#64748b' }}>
                      {act.time}
                    </span>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    {act.documentId && (
                      <Link
                        to={`/documents/${act.documentId}`}
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '3px 8px', fontSize: '11px' }}
                      >
                        <span>Open</span>
                        <ArrowRight size={11} />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
