
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthState, User, Role, Permission } from '../types';
import { hasPermission as checkPermission } from '../services/rbacService';

interface AuthContextType extends AuthState {
  login: (email: string) => Promise<void>;
  logout: () => void;
  can: (permission: Permission) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user');
    if (savedUser) {
      setState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real app, this would be a real user from DB
    import('../constants').then(({ MOCK_USERS }) => {
        const user = MOCK_USERS.find(u => u.email === email);
        if (user) {
          localStorage.setItem('auth_user', JSON.stringify(user));
          setState({ user, isAuthenticated: true, isLoading: false });
        } else {
          setState(prev => ({ ...prev, isLoading: false }));
          alert('User not found. Try one of the mock emails in the login page footer.');
        }
    });
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const can = useCallback((permission: Permission) => {
    if (!state.user) return false;
    return checkPermission(state.user.role, permission);
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, can }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
