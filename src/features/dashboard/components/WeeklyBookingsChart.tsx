import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { WeeklyBookingData } from '../types';

interface WeeklyBookingsChartProps {
  data: WeeklyBookingData[];
}

export const WeeklyBookingsChart: React.FC<WeeklyBookingsChartProps> = ({ data }) => {
  return (
    <div className="mt-8 bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 border border-gray-200 dark:border-dark-border">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Weekly Bookings (Last 7 Days)</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="day" 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              className="text-gray-600 dark:text-gray-400"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#1f2937', fontWeight: 'bold' }}
            />
            <Legend 
              wrapperStyle={{ 
                paddingTop: '20px',
                color: '#4b5563'
              }}
            />
            <Bar 
              dataKey="scheduled" 
              fill="#2196F3" 
              name="Scheduled" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="completed" 
              fill="#4CAF50" 
              name="Completed" 
              radius={[8, 8, 0, 0]}
            />
            <Bar 
              dataKey="cancelled" 
              fill="#f87171" 
              name="Cancelled" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        Tracking booking trends over the past week
      </div>
    </div>
  );
};
