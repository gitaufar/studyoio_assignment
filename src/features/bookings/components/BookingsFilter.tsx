import React from 'react';

interface BookingsFilterProps {
  statusFilter: 'all' | 'scheduled' | 'completed' | 'cancelled';
  onFilterChange: (filter: 'all' | 'scheduled' | 'completed' | 'cancelled') => void;
  resultCount: number;
}

export const BookingsFilter: React.FC<BookingsFilterProps> = ({ 
  statusFilter, 
  onFilterChange, 
  resultCount 
}) => {
  return (
    <div className="mb-6 flex items-center space-x-4">
      <label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Filter by Status:
      </label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => onFilterChange(e.target.value as typeof statusFilter)}
        className="px-4 py-2 border border-gray-300 dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white dark:bg-dark text-gray-900 dark:text-white"
      >
        <option value="all">All</option>
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {resultCount} booking(s) found
      </span>
    </div>
  );
};
