import React from 'react';
import type { DashboardStats } from '../types';

interface QuickSummaryProps {
  stats: DashboardStats;
}

export const QuickSummary: React.FC<QuickSummaryProps> = ({ stats }) => {
  return (
    <div className="mt-4 md:mt-6 bg-linear-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-xl p-4 sm:p-5 md:p-6 border border-primary/20 dark:border-primary/30">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Quick Summary</h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            You have <span className="font-semibold text-primary">{stats.activeTutors}</span> active tutors and{' '}
            <span className="font-semibold text-secondary">{stats.scheduledBookings}</span> scheduled sessions
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/tutors"
            className="bg-primary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="hidden xs:inline">Manage Tutors</span>
            <span className="xs:hidden">Tutors</span>
          </a>
          <a
            href="/bookings"
            className="bg-secondary text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-xs sm:text-sm whitespace-nowrap"
          >
            <span className="hidden xs:inline">View Bookings</span>
            <span className="xs:hidden">Bookings</span>
          </a>
        </div>
      </div>
    </div>
  );
};
