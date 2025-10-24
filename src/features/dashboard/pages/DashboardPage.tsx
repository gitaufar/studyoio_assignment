import React from 'react';
import { useDashboard } from '../hooks/useDashboard';

export const DashboardPage: React.FC = () => {
  const { stats, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
        <p className="font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Real-time updates</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Tutors */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 border dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Tutors</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalTutors}</p>
              <div className="mt-2 flex items-center space-x-3 text-sm">
                <span className="text-green-600 dark:text-green-400">
                  ✓ {stats.activeTutors} active
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  • {stats.inactiveTutors} inactive
                </span>
              </div>
            </div>
            <div className="bg-primary/10 p-3 rounded-full">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 border dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Bookings</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.totalBookings}</p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                All time bookings
              </div>
            </div>
            <div className="bg-secondary/10 p-3 rounded-full">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scheduled Sessions */}
        <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 border dark:border-dark-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Scheduled Sessions</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{stats.scheduledBookings}</p>
              <div className="mt-2 text-sm text-blue-600 dark:text-blue-400">
                Upcoming sessions
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Status Breakdown */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-md p-6 border dark:border-dark-border">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Booking Status Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.scheduledBookings}</p>
            </div>
            <div className="text-blue-600 dark:text-blue-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completedBookings}</p>
            </div>
            <div className="text-green-600 dark:text-green-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cancelled</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.cancelledBookings}</p>
            </div>
            <div className="text-red-600 dark:text-red-400">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Summary */}
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
    </div>
  );
};
