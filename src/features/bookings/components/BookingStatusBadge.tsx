import React from 'react';

interface BookingStatusBadgeProps {
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const BookingStatusBadge: React.FC<BookingStatusBadgeProps> = ({ status }) => {
  const statusColors: Record<string, string> = {
    scheduled: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status] || ''}`}>
      {status}
    </span>
  );
};
