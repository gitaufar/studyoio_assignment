import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from '../../features/auth/pages/Login';
import { Register } from '../../features/auth/pages/Register';
import { TutorsPage } from '../../features/tutors/pages/TutorsPage';
import { BookingsPage } from '../../features/bookings/pages/BookingsPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { DashboardLayout } from '../layouts';
import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { RootRedirect } from './RootRedirect';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes - redirect to /dashboard if already logged in */}
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <DashboardPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tutors" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <TutorsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/bookings" 
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <BookingsPage />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Root Route - redirect based on auth status */}
      <Route path="/" element={<RootRedirect />} />
    </Routes>
  );
};
