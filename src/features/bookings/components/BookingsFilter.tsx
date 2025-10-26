import React from 'react';
import { SelectField } from '../../../shared/components';

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
      <div className="w-48">
        <SelectField
          id="statusFilter"
          value={statusFilter}
          onChange={(value) => onFilterChange(value as typeof statusFilter)}
          options={[
            { value: 'all', label: 'All' },
            { value: 'scheduled', label: 'Scheduled' },
            { value: 'completed', label: 'Completed' },
            { value: 'cancelled', label: 'Cancelled' }
          ]}
        />
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {resultCount} booking(s) found
      </span>
    </div>
  );
};
