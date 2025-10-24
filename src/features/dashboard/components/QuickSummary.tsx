import React from 'react';
import type { DashboardStats } from '../types';

interface QuickSummaryProps {
  stats: DashboardStats;
}

export const QuickSummary: React.FC<QuickSummaryProps> = ({ stats }) => {
  return (
    <div className="mt-6 bg-linear-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-6 border border-primary/20 dark:border-primary/30">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Quick Summary</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            You have <span className="font-semibold text-primary">{stats.activeTutors}</span> active tutors and{' '}
            <span className="font-semibold text-secondary">{stats.scheduledBookings}</span> scheduled sessions
          </p>
        </div>
        <div className="flex space-x-2">
          <a
            href="/tutors"
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-sm"
          >
            Manage Tutors
          </a>
          <a
            href="/bookings"
            className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
          >
            View Bookings
          </a>
        </div>
      </div>
    </div>
  );
};
