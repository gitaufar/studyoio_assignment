import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../shared/stores/userContext';
import { SkeletonFullPage } from '../../shared/components';

export const RootRedirect: React.FC = () => {
  const { user, loading } = useUserContext();

  // Show skeleton while checking auth
  if (loading) {
    return <SkeletonFullPage />;
  }

  // Redirect based on auth status
  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};
