"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, getUser, setUser, clearTokens } from '@/lib/auth';
import { authApi } from '@/services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [token, setTokenState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize auth state from localStorage
    const storedToken = getToken();
    const storedUser = getUser();

    if (storedToken && storedUser) {
      setTokenState(storedToken);
      setUserState(storedUser);
    }

    setLoading(false);
  }, []);

  const login = (user, token) => {
    setUserState(user);
    setTokenState(token);
    setUser(user);
  };

  const logout = () => {
    setUserState(null);
    setTokenState(null);
    clearTokens();
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
