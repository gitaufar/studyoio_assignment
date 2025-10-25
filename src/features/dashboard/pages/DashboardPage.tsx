import React from 'react';
import { useDashboard } from '../hooks/useDashboard';
import {
  DashboardHeader,
  StatsCards,
  BookingStatusBreakdown,
  TutorsBySubjectChart,
  WeeklyBookingsChart,
  QuickSummary,
} from '../components';
import { SkeletonDashboard } from '../../../shared/components';

export const DashboardPage: React.FC = () => {
  const { stats, weeklyData, tutorSubjectData, loading, error } = useDashboard();

  if (loading) {
    return <SkeletonDashboard />;
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
      <DashboardHeader />
      
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BookingStatusBreakdown stats={stats} />
        <TutorsBySubjectChart data={tutorSubjectData} />
      </div>

      <WeeklyBookingsChart data={weeklyData} />

      <QuickSummary stats={stats} />
    </div>
  );
};
