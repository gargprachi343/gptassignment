import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { EventProvider } from '../context/EventContext';
import { NotificationProvider } from '../context/NotificationContext';
import { ThemeProvider } from '../context/ThemeContext';
import { SettingsProvider } from '../context/SettingsContext';
import Dashboard from '../pages/Dashboard';
import LoginPortal from '../components/auth/LoginPortal';
import useAuth from '../hooks/useAuth';
import Loader from '../components/common/Loader';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SettingsProvider>
          <NotificationProvider>
            <EventProvider>
              <AppContent />
            </EventProvider>
          </NotificationProvider>
        </SettingsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-gray">
      {!isAuthenticated ? <LoginPortal /> : <Dashboard />}
    </div>
  );
};

export default App;

