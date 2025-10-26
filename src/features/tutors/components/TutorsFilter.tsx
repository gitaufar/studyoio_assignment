import React from 'react';
import { SelectField } from '../../../shared/components';

interface TutorsFilterProps {
  searchQuery: string;
  statusFilter: 'all' | 'active' | 'inactive';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: 'all' | 'active' | 'inactive') => void;
  resultCount: number;
}

export const TutorsFilter: React.FC<TutorsFilterProps> = ({
  searchQuery,
  statusFilter,
  onSearchChange,
  onStatusChange,
  resultCount,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Top Toolbar: Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-dark text-gray-900 dark:text-white"
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter by Status */}
        <div className="w-full sm:w-48">
          <SelectField
            value={statusFilter}
            onChange={(value) => onStatusChange(value as 'all' | 'active' | 'inactive')}
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' }
            ]}
          />
        </div>
      </div>

      {/* Result Count */}
      {resultCount > 0 && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {resultCount} {resultCount === 1 ? 'tutor' : 'tutors'}
        </div>
      )}
    </div>
  );
};
