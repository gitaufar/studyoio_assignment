import React from "react";

interface StatCardProps {
  title: string;
  value: number;
  subtitle: React.ReactNode;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor,
  iconColor,
}) => {
  return (
    <div className="flex flex-col bg-white dark:bg-dark-card rounded-xl shadow-sm p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-dark-border">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm font-medium">
              {title}
            </h3>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1.5 sm:mt-2">
              {value}
            </p>
          </div>
          <div className={`${iconBgColor} p-2 sm:p-2.5 md:p-3 rounded-full shrink-0`}>
            <div className={`${iconColor} w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8`}>{icon}</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-xs sm:text-sm">{subtitle}</div>
    </div>
  );
};
