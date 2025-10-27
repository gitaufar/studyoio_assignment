import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './shared/stores/userContext';
import { ThemeProvider } from './shared/stores/themeContext';
import { AppRoutes } from './core/routes';
import { useFirebaseSync } from './shared/hooks/useFirebaseSync';
import { NetworkStatus } from './shared/components/NetworkStatus';

// Component that uses Firebase sync inside UserProvider
function AppContent() {
  useFirebaseSync();
  
  return (
    <Router>
      <NetworkStatus />
      <AppRoutes />
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
