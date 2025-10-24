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
    <div className="flex flex-col bg-white dark:bg-dark-card rounded-xl shadow-md p-6 border dark:border-dark-border">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
              {title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
              {value}
            </p>
          </div>
          <div className={`${iconBgColor} p-3 rounded-full`}>
            <div className={iconColor}>{icon}</div>
          </div>
        </div>
      </div>
      <div className="mt-2 text-sm">{subtitle}</div>
    </div>
  );
};
