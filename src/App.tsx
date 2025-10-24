import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './shared/stores/userContext';
import { ThemeProvider } from './shared/stores/themeContext';
import { AppRoutes } from './core/routes';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
