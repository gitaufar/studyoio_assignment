import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../shared/stores/userContext';
import { SkeletonFullPage } from '../../shared/components';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUserContext();

  if (loading) {
    return <SkeletonFullPage />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
