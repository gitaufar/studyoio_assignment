import React from 'react';
import type { DashboardStats } from '../types';
import { StatCard } from './StatCard';

interface StatsCardsProps {
  stats: DashboardStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Total Tutors */}
      <StatCard
        title="Total Tutors"
        value={stats.totalTutors}
        subtitle={
          <div className="flex items-center space-x-3">
            <span className="text-green-600 dark:text-green-400">
              ✓ {stats.activeTutors} active
            </span>
            <span className="text-gray-500 dark:text-gray-400">
              • {stats.inactiveTutors} inactive
            </span>
          </div>
        }
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
        iconBgColor="bg-primary/10"
        iconColor="text-primary"
      />

      {/* Total Bookings */}
      <StatCard
        title="Total Bookings"
        value={stats.totalBookings}
        subtitle={
          <span className="text-gray-500 dark:text-gray-400">
            All time bookings
          </span>
        }
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        }
        iconBgColor="bg-secondary/10"
        iconColor="text-secondary"
      />

      {/* Scheduled Sessions */}
      <StatCard
        title="Scheduled Sessions"
        value={stats.scheduledBookings}
        subtitle={
          <span className="text-blue-600 dark:text-blue-400">
            Upcoming sessions
          </span>
        }
        icon={
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        iconBgColor="bg-blue-50 dark:bg-blue-900/20"
        iconColor="text-blue-600 dark:text-blue-400"
      />
    </div>
  );
};
