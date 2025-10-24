import React from 'react';
import { useNetworkStatus } from '../../../shared/hooks/useNetworkStatus';

export const DashboardHeader: React.FC = () => {
  const { isOnline } = useNetworkStatus();

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      
      {/* Online/Offline Status Badge */}
      <div 
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
          ${isOnline 
            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
            : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
          }
        `}
        title={isOnline 
          ? 'Connected to Firebase - Data syncing in real-time' 
          : 'Offline mode - Showing cached data from local storage'
        }
      >
        {isOnline ? (
          <>
            {/* Online Icon */}
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Real-time updates
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Offline Icon */}
            <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Using cached data
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
