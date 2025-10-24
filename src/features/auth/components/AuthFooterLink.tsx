import React from 'react';
import { Link } from 'react-router-dom';

interface AuthFooterLinkProps {
  text: string;
  linkText: string;
  linkTo: string;
  linkColor?: 'primary' | 'secondary';
}

export const AuthFooterLink: React.FC<AuthFooterLinkProps> = ({
  text,
  linkText,
  linkTo,
  linkColor = 'primary',
}) => {
  const color = linkColor === 'primary' 
    ? 'text-primary hover:text-green-700' 
    : 'text-secondary hover:text-blue-700';
  
  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {text}{' '}
        <Link to={linkTo} className={`${color} font-semibold transition-colors`}>
          {linkText}
        </Link>
      </p>
    </div>
  );
};
