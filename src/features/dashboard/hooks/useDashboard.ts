import { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';
import type { DashboardStats } from '../types';

export const useDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTutors: 0,
    activeTutors: 0,
    inactiveTutors: 0,
    totalBookings: 0,
    scheduledBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Subscribe to real-time updates
    const unsubscribe = dashboardService.subscribeToStats((newStats) => {
      setStats(newStats);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    stats,
    loading,
    error,
  };
};
