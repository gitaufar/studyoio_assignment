import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave';
}

/**
 * Skeleton loading component
 * Shows animated placeholder while content is loading
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  const animationClasses = animation === 'pulse' ? 'animate-pulse' : 'animate-shimmer';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const defaultSizes = {
    text: { width: '100%', height: '1rem' },
    circular: { width: '2.5rem', height: '2.5rem' },
    rectangular: { width: '100%', height: '8rem' },
  };

  const styles: React.CSSProperties = {
    width: width || defaultSizes[variant].width,
    height: height || defaultSizes[variant].height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses} ${className}`}
      style={styles}
    />
  );
};

/**
 * Skeleton for stat cards
 */
export const SkeletonStatCard: React.FC = () => (
  <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <Skeleton width="60%" height="1rem" className="mb-3" />
        <Skeleton width="40%" height="2rem" className="mb-2" />
        <Skeleton width="50%" height="0.875rem" />
      </div>
      <Skeleton variant="circular" width="3rem" height="3rem" />
    </div>
  </div>
);

/**
 * Skeleton for table rows
 */
export const SkeletonTableRow: React.FC<{ columns?: number }> = ({ columns = 5 }) => (
  <tr className="border-b border-gray-200 dark:border-dark-border">
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <Skeleton width="80%" height="1rem" />
      </td>
    ))}
    <td className="px-6 py-4">
      <div className="flex items-center space-x-2">
        <Skeleton variant="circular" width="2rem" height="2rem" />
        <Skeleton variant="circular" width="2rem" height="2rem" />
      </div>
    </td>
  </tr>
);

/**
 * Skeleton for table
 */
export const SkeletonTable: React.FC<{ rows?: number; columns?: number }> = ({ 
  rows = 5, 
  columns = 5 
}) => (
  <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {Array.from({ length: columns + 1 }).map((_, index) => (
              <th key={index} className="px-6 py-3 text-left">
                <Skeleton width="60%" height="1rem" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, index) => (
            <SkeletonTableRow key={index} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

/**
 * Skeleton for chart
 */
export const SkeletonChart: React.FC<{ height?: string }> = ({ height = '20rem' }) => (
  <div className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-border">
    <Skeleton width="40%" height="1.5rem" className="mb-6" />
    <Skeleton variant="rectangular" width="100%" height={height} />
  </div>
);

/**
 * Skeleton for dashboard
 */
export const SkeletonDashboard: React.FC = () => (
  <div className="space-y-6">
    {/* Header */}
    <div className="flex justify-between items-center">
      <Skeleton width="12rem" height="2.5rem" />
      <Skeleton width="10rem" height="2rem" />
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SkeletonStatCard />
      <SkeletonStatCard />
      <SkeletonStatCard />
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <SkeletonChart />
      <SkeletonChart />
    </div>
  </div>
);


export const SkeletonFullPage: React.FC = () => (
  <div className="flex justify-center items-center min-h-screen bg-light dark:bg-dark">
    <div className="text-center space-y-4">
      <Skeleton variant="circular" width="4rem" height="4rem" className="mx-auto" />
      <Skeleton width="10rem" height="1.5rem" className="mx-auto" />
      <Skeleton width="8rem" height="1rem" className="mx-auto" />
    </div>
  </div>
);
