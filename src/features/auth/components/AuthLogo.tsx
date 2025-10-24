import React from 'react';

interface AuthLogoProps {
  title: string;
  subtitle: string;
  iconColor?: 'primary' | 'secondary';
}

export const AuthLogo: React.FC<AuthLogoProps> = ({ 
  title, 
  subtitle, 
  iconColor = 'primary' 
}) => {
  const bgColor = iconColor === 'primary' ? 'bg-primary' : 'bg-secondary';
  
  return (
    <div className="text-center mb-8">
      <div className={`inline-flex items-center justify-center w-16 h-16 ${bgColor} rounded-full mb-4`}>
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{subtitle}</p>
    </div>
  );
};
