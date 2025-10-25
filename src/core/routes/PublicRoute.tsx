import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../../shared/stores/userContext';
import { SkeletonFullPage } from '../../shared/components';

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, loading } = useUserContext();

  if (loading) {
    return <SkeletonFullPage />;
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};
