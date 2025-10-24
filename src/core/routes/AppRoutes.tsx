import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../../features/auth/pages/Login';
import { Register } from '../../features/auth/pages/Register';
import { TutorsPage } from '../../features/tutors/pages/TutorsPage';
import { BookingsPage } from '../../features/bookings/pages/BookingsPage';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage';
import { DashboardLayout } from '../layouts';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
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
      
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
