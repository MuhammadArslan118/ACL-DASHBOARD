
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import UsersPage from './pages/Users';
import SettingsPage from './pages/Settings';
import LoginPage from './pages/Login';
import { Loader2 } from 'lucide-react';

const MainApp: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activePage, setActivePage] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      {activePage === 'dashboard' && <Dashboard />}
      {activePage === 'users' && <UsersPage />}
      {activePage === 'settings' && <SettingsPage />}
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
