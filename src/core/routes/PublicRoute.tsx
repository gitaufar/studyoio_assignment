import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../shared/stores/userContext';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useUserContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light dark:bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};
