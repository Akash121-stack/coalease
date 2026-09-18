import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Database,
  Search,
  Filter,
  Layers,
  UploadCloud,
  LayoutGrid,
  Table as TableIcon,
  Compass,
  HardHat,
  TrendingUp,
  History as HistoryIcon,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react';
import DocumentCard from '../components/DocumentCard';
import DocumentTable from '../components/DocumentTable';
import EmptyState from '../components/EmptyState';
import { getDocuments } from '../utils/storage';
import { searchDocuments } from '../utils/search';

export default function Repository() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState(getDocuments());
  const [activeTab, setActiveTab] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [mineFilter, setMineFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    setDocuments(getDocuments());
  }, []);

  // Filter documents by tab, search term, mine, status, and sort
  const filteredDocs = searchDocuments(documents, {
    keyword: searchTerm,
    category: activeTab,
    mine: mineFilter,
    status: statusFilter,
    sortBy,
  });

  const tabCounts = {
    All: documents.length,
    Geological: documents.filter((d) => d.category === 'Geological').length,
    Mining: documents.filter((d) => d.category === 'Mining').length,
    Production: documents.filter((d) => d.category === 'Production').length,
    Historical: documents.filter((d) => d.category === 'Historical').length,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 className="page-header-title">Central Data Repository</h1>
            <span className="badge badge-gold font-mono">
              {documents.length} TOTAL RECORDS
            </span>
          </div>
          <p className="page-header-desc">
            Primary digital archive of certified borehole cores, production yields, mine maps, and historical logs.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to="/upload" className="btn btn-primary btn-sm">
            <UploadCloud size={14} />
            <span>Upload Document</span>
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="tabs-header">
        {[
          { id: 'All', label: 'All Documents', icon: Database },
          { id: 'Geological', label: 'Geological Reports', icon: Compass },
          { id: 'Mining', label: 'Mining Operations', icon: HardHat },
          { id: 'Production', label: 'Production Logs', icon: TrendingUp },
          { id: 'Historical', label: 'Historical Archives', icon: HistoryIcon },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              <span className="tab-count-badge">{tabCounts[tab.id] || 0}</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Toolbar Controls */}
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
        {/* Search inside repository */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px', maxWidth: '380px' }}>
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
            placeholder="Quick search within category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dropdown Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <select
            className="form-select"
            style={{ padding: '6px 12px', fontSize: '12.5px', height: '36px', width: 'auto' }}
            value={mineFilter}
            onChange={(e) => setMineFilter(e.target.value)}
          >
            <option value="All">All Mines</option>
            <option value="Barkakana Block">Barkakana Block</option>
            <option value="North Karanpura">North Karanpura</option>
            <option value="Singrauli Block">Singrauli Block</option>
            <option value="Central West Mine">Central West Mine</option>
            <option value="Eastern Coalfields">Eastern Coalfields</option>
            <option value="Northern Coalfields">Northern Coalfields</option>
            <option value="Central Coalfields">Central Coalfields</option>
          </select>

          <select
            className="form-select"
            style={{ padding: '6px 12px', fontSize: '12.5px', height: '36px', width: 'auto' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified Only</option>
            <option value="Pending">Pending Review</option>
          </select>

          <select
            className="form-select"
            style={{ padding: '6px 12px', fontSize: '12.5px', height: '36px', width: 'auto' }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date-desc">Newest Date</option>
            <option value="date-asc">Oldest Date</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="pages-desc">Most Pages</option>
          </select>

          {/* View Mode Toggle */}
          <div
            style={{
              display: 'flex',
              backgroundColor: '#f1f5f9',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 10px',
                border: 'none',
                backgroundColor: viewMode === 'grid' ? '#ffffff' : 'transparent',
                color: viewMode === 'grid' ? '#b58a3a' : '#64748b',
                cursor: 'pointer',
              }}
              title="Card Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 10px',
                border: 'none',
                backgroundColor: viewMode === 'table' ? '#ffffff' : 'transparent',
                color: viewMode === 'table' ? '#b58a3a' : '#64748b',
                cursor: 'pointer',
              }}
              title="Table Register View"
            >
              <TableIcon size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Document Items Display */}
      {filteredDocs.length === 0 ? (
        <EmptyState
          title="No Repository Documents Found"
          description={`No documents match the category "${activeTab}" and applied filters.`}
          onReset={() => {
            setActiveTab('All');
            setSearchTerm('');
            setMineFilter('All');
            setStatusFilter('All');
          }}
          actionLabel="Reset Repository Filters"
        />
      ) : viewMode === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredDocs.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <DocumentTable documents={filteredDocs} />
      )}
    </div>
  );
}
