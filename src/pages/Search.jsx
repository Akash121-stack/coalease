import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search as SearchIcon,
  Sparkles,
  ExternalLink,
  SlidersHorizontal,
  LayoutGrid,
  Table as TableIcon,
  Database,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import SearchFilters from '../components/SearchFilters';
import DocumentCard from '../components/DocumentCard';
import DocumentTable from '../components/DocumentTable';
import EmptyState from '../components/EmptyState';
import { getDocuments } from '../utils/storage';
import { searchDocuments } from '../utils/search';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [allDocuments, setAllDocuments] = useState(getDocuments());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'ai'

  // Initialize filters from URL search params if present
  const [filters, setFilters] = useState({
    keyword: searchParams.get('q') || searchParams.get('topic') || '',
    category: searchParams.get('category') || 'All',
    mine: searchParams.get('mine') || 'All',
    year: searchParams.get('year') || 'All',
    department: 'All',
    status: 'All',
    docType: 'All',
    sortBy: 'date-desc',
  });

  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setAllDocuments(getDocuments());
  }, []);

  // Synchronize search params changes
  useEffect(() => {
    const q = searchParams.get('q') || searchParams.get('topic') || '';
    const cat = searchParams.get('category') || 'All';
    const mine = searchParams.get('mine') || 'All';

    setFilters((prev) => ({
      ...prev,
      keyword: q,
      category: cat,
      mine: mine,
    }));
  }, [searchParams]);

  // Execute filtering
  useEffect(() => {
    const results = searchDocuments(allDocuments, filters);
    setFilteredResults(results);
  }, [filters, allDocuments]);

  const handleResetFilters = () => {
    const reset = {
      keyword: '',
      category: 'All',
      mine: 'All',
      year: 'All',
      department: 'All',
      status: 'All',
      docType: 'All',
      sortBy: 'date-desc',
    };
    setFilters(reset);
    setSearchParams({});
  };

  const handleExternalAI = () => {
    const AI_URL = import.meta.env.VITE_AI_URL || 'http://localhost:3001';
    window.location.href = AI_URL;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: '10px' }}>
        <div>
          <h1 className="page-header-title">Search & Knowledge Discovery</h1>
          <p className="page-header-desc">
            Perform precision filtered queries across technical logs, geological strata, and mine reports.
          </p>
        </div>
      </div>

      {/* SEARCH MODE SELECTION: MANUAL SEARCH vs ASK AI (EXTERNAL) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '10px',
        }}
      >
        {/* MANUAL SEARCH CARD */}
        <div
          onClick={() => setActiveTab('manual')}
          style={{
            padding: '18px 20px',
            backgroundColor: '#ffffff',
            border: `2px solid ${activeTab === 'manual' ? '#b58a3a' : '#cbd5e1'}`,
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: activeTab === 'manual' ? 'var(--shadow-md)' : 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.15s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'manual' ? '#b58a3a' : '#f1f5f9',
                color: activeTab === 'manual' ? '#ffffff' : '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <SearchIcon size={20} />
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>
                MANUAL REPOSITORY SEARCH
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Directly filter by Mine, Stratigraphic Layer, Year, Category & Status
              </div>
            </div>
          </div>

          <span
            className={`badge ${activeTab === 'manual' ? 'badge-gold' : 'badge-dark'}`}
          >
            {activeTab === 'manual' ? 'Active Mode' : 'Select'}
          </span>
        </div>

        {/* ASK AI CARD (REDIRECTS TO EXTERNAL AI APP) */}
        <div
          onClick={handleExternalAI}
          style={{
            padding: '18px 20px',
            backgroundColor: '#161a22',
            border: '2px solid #334155',
            borderRadius: '8px',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'all 0.15s ease',
            color: '#ffffff',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#b58a3a';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#334155';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #b58a3a 0%, #8c6826 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={20} />
            </div>
            <div>
              <div
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>ASK AI ASSISTANT</span>
                <ExternalLink size={13} color="#b58a3a" />
              </div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                Launch dedicated AI conversational intelligence assistant (External)
              </div>
            </div>
          </div>

          <span
            className="badge badge-gold font-mono"
            style={{ backgroundColor: '#1e2430', color: '#b58a3a' }}
          >
            Launch Assistant ↗
          </span>
        </div>
      </div>

      {/* Search Filter Panel */}
      <SearchFilters
        filters={filters}
        onChange={setFilters}
        onReset={handleResetFilters}
        onSearch={() => {}}
        totalResults={filteredResults.length}
      />

      {/* Results View Toolbar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>
            Showing {filteredResults.length} of {allDocuments.length} Documents
          </span>

          {filters.keyword && (
            <span className="badge badge-dark">
              Query: "{filters.keyword}"
            </span>
          )}

          {filters.category !== 'All' && (
            <span className="badge badge-gold">
              Category: {filters.category}
            </span>
          )}

          {filters.mine !== 'All' && (
            <span className="badge badge-info">
              Mine: {filters.mine}
            </span>
          )}
        </div>

        {/* View Switcher & Sorting */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>Sort By:</span>
            <select
              className="form-select"
              style={{ padding: '4px 10px', fontSize: '12px', width: 'auto' }}
              value={filters.sortBy || 'date-desc'}
              onChange={(e) =>
                setFilters({ ...filters, sortBy: e.target.value })
              }
            >
              <option value="date-desc">Newest Date First</option>
              <option value="date-asc">Oldest Date First</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="pages-desc">Page Count (High-Low)</option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px 10px',
                border: 'none',
                backgroundColor: viewMode === 'grid' ? '#f1f5f9' : '#ffffff',
                color: viewMode === 'grid' ? '#b58a3a' : '#64748b',
                cursor: 'pointer',
              }}
              title="Grid View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '6px 10px',
                border: 'none',
                backgroundColor: viewMode === 'table' ? '#f1f5f9' : '#ffffff',
                color: viewMode === 'table' ? '#b58a3a' : '#64748b',
                cursor: 'pointer',
              }}
              title="Table View"
            >
              <TableIcon size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Content */}
      {filteredResults.length === 0 ? (
        <EmptyState
          title="No Documents Match Your Filters"
          description={`We couldn't find any documents matching the keyword "${filters.keyword || ''}" with the selected category and mine criteria.`}
          onReset={handleResetFilters}
          actionLabel="Clear All Search Filters"
        />
      ) : viewMode === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredResults.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <DocumentTable documents={filteredResults} />
      )}
    </div>
  );
}
