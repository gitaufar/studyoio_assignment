import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { TutorBySubjectData } from '../types';

interface TutorsBySubjectChartProps {
  data: TutorBySubjectData[];
}

export const TutorsBySubjectChart: React.FC<TutorsBySubjectChartProps> = ({ data }) => {
  const totalTutors = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-4 sm:p-5 md:p-6 border border-gray-200 dark:border-dark-border">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">Tutors by Subject</h2>
      {data.length > 0 ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data as unknown as any[]}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => {
                  const percentage = ((entry.count / totalTutors) * 100).toFixed(0);
                  return `${entry.subject} (${entry.count}) ${percentage}%`;
                }}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-gray-400 dark:text-gray-500">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-sm">No active tutors yet</p>
          </div>
        </div>
      )}
    </div>
  );
};
