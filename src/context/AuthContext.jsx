import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEYS, ROLES } from '../utils/constants';
import authService from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [sessionId, setSessionId] = useLocalStorage(STORAGE_KEYS.SESSION_ID, null);
  const [role, setRole] = useLocalStorage(STORAGE_KEYS.ROLE, null);
  const [loading, setLoading] = useState(true);

  // Verify session on mount
  useEffect(() => {
    const verifySession = async () => {
      if (sessionId && role) {
        try {
          const user = await authService.getCurrentUser(sessionId);
          if (!user || !user.role) {
            // Session invalid, clear storage
            setSessionId(null);
            setRole(null);
          }
        } catch (error) {
          // Session invalid, clear storage
          setSessionId(null);
          setRole(null);
        }
      }
      setLoading(false);
    };

    verifySession();
  }, [sessionId, role, setSessionId, setRole]);

  const login = async (email, password, selectedRole) => {
    try {
      // Use actual credentials provided by user
      const response = await authService.login(email, password);
      
      if (!response.success) {
        return { success: false, error: response.message };
      }

      // Store token and session info
      const token = response.token;
      const user = response.user;
      
      setSessionId(token);
      setRole(user.role);

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      if (sessionId) {
        await authService.logout(sessionId);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear all auth-related state
      setSessionId(null);
      setRole(null);
    }
  };

  const isAdmin = role === ROLES.ADMIN;
  const isUser = role === ROLES.USER || role === ROLES.ADMIN;
  const isAuthenticated = !!role;

  const value = {
    role,
    sessionId,
    loading,
    login,
    logout,
    isAdmin,
    isUser,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

