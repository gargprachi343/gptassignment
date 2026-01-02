import React, { createContext, useState, useCallback, useEffect } from 'react';
import mongoService from '../services/mongoService';
import useAuth from '../hooks/useAuth';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const { sessionId } = useAuth();
  const [settings, setSettings] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('appSettings');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      emailNotifications: true,
      pushNotifications: false,
      soundEnabled: true,
      compactView: false,
      showEventDetails: true,
      autoMarkAsRead: false,
      theme: 'light',
    };
  });

  // Fetch settings from MongoDB on mount
  useEffect(() => {
    if (sessionId) {
      const fetchSettingsFromDB = async () => {
        try {
          const dbSettings = await mongoService.getUserSettings(sessionId);
          if (dbSettings) {
            setSettings(dbSettings);
            localStorage.setItem('appSettings', JSON.stringify(dbSettings));
          }
        } catch (error) {
          console.error('Failed to fetch settings from MongoDB:', error);
          // Continue with localStorage settings on error
        }
      };
      fetchSettingsFromDB();
    }
  }, [sessionId]);

  // Save settings to localStorage and MongoDB whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appSettings', JSON.stringify(settings));
    }
    
    // Sync with MongoDB
    if (sessionId) {
      mongoService.updateUserSettings(sessionId, settings).catch(error =>
        console.error('Failed to update settings in MongoDB:', error)
      );
    }
  }, [settings, sessionId]);

  const toggleSetting = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const updateSetting = useCallback((key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const resetSettings = useCallback(() => {
    const defaultSettings = {
      emailNotifications: true,
      pushNotifications: false,
      soundEnabled: true,
      compactView: false,
      showEventDetails: true,
      autoMarkAsRead: false,
      theme: 'light',
    };
    setSettings(defaultSettings);
    if (typeof window !== 'undefined') {
      localStorage.setItem('appSettings', JSON.stringify(defaultSettings));
    }
  }, []);

  const value = {
    settings,
    toggleSetting,
    updateSetting,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};
