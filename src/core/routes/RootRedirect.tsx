import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../shared/stores/userContext';

export const RootRedirect: React.FC = () => {
  const { user, loading } = useUserContext();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-light dark:bg-dark">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect based on auth status
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
