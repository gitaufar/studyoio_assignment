import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './shared/stores/userContext';
import { ThemeProvider } from './shared/stores/themeContext';
import { Login } from './features/auth/pages/Login';
import { Register } from './features/auth/pages/Register';
import { DashboardPage } from './features/dashboard';
import { TutorsPage } from './features/tutors/pages/TutorsPage';
import { BookingsPage } from './features/bookings/pages/BookingsPage';
import { Sidebar } from './shared/components/Sidebar';
import { AppBar } from './shared/components/AppBar';

// Layout untuk halaman yang memerlukan auth
const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen bg-light dark:bg-dark">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
            <Route path="/tutors" element={<DashboardLayout><TutorsPage /></DashboardLayout>} />
            <Route path="/bookings" element={<DashboardLayout><BookingsPage /></DashboardLayout>} />
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;

