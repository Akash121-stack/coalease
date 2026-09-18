import React from 'react';
import { Search, RotateCcw, Filter, SlidersHorizontal } from 'lucide-react';

export default function SearchFilters({
  filters,
  onChange,
  onReset,
  onSearch,
  totalResults,
}) {
  const handleChange = (field, value) => {
    onChange({ ...filters, [field]: value });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (onSearch) onSearch();
    }
  };

  return (
    <div
      className="card"
      style={{
        marginBottom: '20px',
        backgroundColor: '#ffffff',
        border: '1px solid #dfe3ea',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          paddingBottom: '12px',
          borderBottom: '1px solid #f1f5f9',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SlidersHorizontal size={16} color="#b58a3a" />
          <span
            style={{
              fontSize: '13px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            Manual Search & Archive Filters
          </span>
        </div>

        {totalResults !== undefined && (
          <span
            className="badge badge-gold font-mono"
            style={{ fontSize: '11px' }}
          >
            {totalResults} Match{totalResults === 1 ? '' : 'es'} Found
          </span>
        )}
      </div>

      {/* Primary Keyword Search Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          />
          <input
            type="text"
            className="form-input"
            style={{
              paddingLeft: '42px',
              paddingRight: '12px',
              height: '44px',
              fontSize: '14px',
              border: '1px solid #cbd5e1',
            }}
            placeholder="Search by Keyword, Seam Name, Document ID (e.g., GEO-BK-142), Title, Minerals..."
            value={filters.keyword || ''}
            onChange={(e) => handleChange('keyword', e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* Grid of Secondary Filters */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {/* Category */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Category
          </label>
          <select
            className="form-select"
            value={filters.category || 'All'}
            onChange={(e) => handleChange('category', e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="Geological">Geological</option>
            <option value="Mining">Mining</option>
            <option value="Production">Production</option>
            <option value="Historical">Historical</option>
          </select>
        </div>

        {/* Mine */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Mine / Block
          </label>
          <select
            className="form-select"
            value={filters.mine || 'All'}
            onChange={(e) => handleChange('mine', e.target.value)}
          >
            <option value="All">All Mines & Blocks</option>
            <option value="Barkakana Block">Barkakana Block</option>
            <option value="North Karanpura">North Karanpura</option>
            <option value="Singrauli Block">Singrauli Block</option>
            <option value="Central West Mine">Central West Mine</option>
            <option value="Eastern Coalfields">Eastern Coalfields</option>
            <option value="Northern Coalfields">Northern Coalfields</option>
            <option value="Central Coalfields">Central Coalfields</option>
          </select>
        </div>

        {/* Year */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Year
          </label>
          <select
            className="form-select"
            value={filters.year || 'All'}
            onChange={(e) => handleChange('year', e.target.value)}
          >
            <option value="All">All Years</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2019">2019</option>
          </select>
        </div>

        {/* Department */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Department
          </label>
          <select
            className="form-select"
            value={filters.department || 'All'}
            onChange={(e) => handleChange('department', e.target.value)}
          >
            <option value="All">All Departments</option>
            <option value="Geological Services">Geological Services</option>
            <option value="Production Management">Production Management</option>
            <option value="Mine Operations">Mine Operations</option>
            <option value="Exploration Cell">Exploration Cell</option>
            <option value="Mining Engineering">Mining Engineering</option>
            <option value="Corporate Archives">Corporate Archives</option>
          </select>
        </div>

        {/* Status */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Verification Status
          </label>
          <select
            className="form-select"
            value={filters.status || 'All'}
            onChange={(e) => handleChange('status', e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Verified">Verified</option>
            <option value="Pending">Pending Review</option>
            <option value="Needs Review">Needs Review</option>
          </select>
        </div>

        {/* Document Type */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" style={{ fontSize: '11px' }}>
            Document Type
          </label>
          <select
            className="form-select"
            value={filters.docType || 'All'}
            onChange={(e) => handleChange('docType', e.target.value)}
          >
            <option value="All">All Formats</option>
            <option value="PDF">PDF Reports</option>
          </select>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '10px',
          paddingTop: '12px',
          borderTop: '1px solid #f1f5f9',
        }}
      >
        <button
          onClick={onReset}
          className="btn btn-secondary btn-sm"
          type="button"
        >
          <RotateCcw size={13} />
          <span>Reset Filters</span>
        </button>

        <button
          onClick={onSearch}
          className="btn btn-primary btn-sm"
          type="button"
        >
          <Search size={13} />
          <span>Apply Search</span>
        </button>
      </div>
    </div>
  );
}
