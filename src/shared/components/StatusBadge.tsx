import React from 'react';

type StatusVariant = 'success' | 'info' | 'warning' | 'danger' | 'neutral';

interface StatusBadgeProps {
  status: string;
  variant?: StatusVariant;
  className?: string;
}

const variantStyles: Record<StatusVariant, string> = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  neutral: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
};

// Auto-detect variant based on status string
const getAutoVariant = (status: string): StatusVariant => {
  const lowerStatus = status.toLowerCase();
  
  // Success states
  if (['active', 'completed', 'success', 'approved'].includes(lowerStatus)) {
    return 'success';
  }
  
  // Info states
  if (['scheduled', 'pending', 'processing', 'in-progress'].includes(lowerStatus)) {
    return 'info';
  }
  
  // Warning states
  if (['warning', 'on-hold', 'paused'].includes(lowerStatus)) {
    return 'warning';
  }
  
  // Danger states
  if (['cancelled', 'failed', 'rejected', 'inactive', 'error'].includes(lowerStatus)) {
    return 'danger';
  }
  
  // Default
  return 'neutral';
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  variant,
  className = '' 
}) => {
  const autoVariant = variant || getAutoVariant(status);
  const colorClass = variantStyles[autoVariant];
  
  // Capitalize first letter
  const displayText = status.charAt(0).toUpperCase() + status.slice(1);
  
  return (
    <span 
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorClass} ${className}`}
    >
      {displayText}
    </span>
  );
};
