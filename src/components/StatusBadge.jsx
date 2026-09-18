import React from 'react';
import { CheckCircle2, Clock, AlertCircle, ShieldCheck, FileQuestion } from 'lucide-react';

export default function StatusBadge({ status, className = '' }) {
  const normStatus = (status || 'Pending').toLowerCase();

  if (normStatus === 'verified' || normStatus === 'approved') {
    return (
      <span className={`badge badge-verified ${className}`}>
        <CheckCircle2 size={12} strokeWidth={2.5} />
        Verified
      </span>
    );
  }

  if (normStatus === 'pending' || normStatus === 'awaiting review' || normStatus === 'in review') {
    return (
      <span className={`badge badge-pending ${className}`}>
        <Clock size={12} strokeWidth={2.5} />
        Pending Review
      </span>
    );
  }

  if (normStatus === 'rejected' || normStatus === 'needs review' || normStatus === 'flagged') {
    return (
      <span className={`badge badge-rejected ${className}`}>
        <AlertCircle size={12} strokeWidth={2.5} />
        Needs Review
      </span>
    );
  }

  if (normStatus === 'archived' || normStatus === 'historical') {
    return (
      <span className={`badge badge-dark ${className}`}>
        <ShieldCheck size={12} strokeWidth={2.5} />
        Archived
      </span>
    );
  }

  return (
    <span className={`badge badge-info ${className}`}>
      <FileQuestion size={12} strokeWidth={2.5} />
      {status}
    </span>
  );
}
