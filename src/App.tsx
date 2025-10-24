import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './shared/stores/userContext';
import { ThemeProvider } from './shared/stores/themeContext';
import { AppRoutes } from './core/routes';
import { useFirebaseSync } from './shared/hooks/useFirebaseSync';
import { NetworkStatus } from './shared/components/NetworkStatus';

function App() {
  // Initialize Firebase real-time sync (once on app mount)
  useFirebaseSync();

  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <NetworkStatus />
          <AppRoutes />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
