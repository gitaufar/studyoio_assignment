import React from 'react';
import type { DashboardStats } from '../types';

interface BookingStatusBreakdownProps {
  stats: DashboardStats;
}

export const BookingStatusBreakdown: React.FC<BookingStatusBreakdownProps> = ({ stats }) => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-dark-border">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
        <span className="hidden sm:inline">Booking Status Breakdown</span>
        <span className="sm:hidden">Booking Status</span>
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        <div className="flex items-center justify-between p-3 sm:p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Scheduled</p>
            <p className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.scheduledBookings}</p>
          </div>
          <div className="text-blue-600 dark:text-blue-400">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Completed</p>
            <p className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">{stats.completedBookings}</p>
          </div>
          <div className="text-green-600 dark:text-green-400">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <div>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
            <p className="text-xl sm:text-2xl font-bold text-red-600 dark:text-red-400">{stats.cancelledBookings}</p>
          </div>
          <div className="text-red-600 dark:text-red-400">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
