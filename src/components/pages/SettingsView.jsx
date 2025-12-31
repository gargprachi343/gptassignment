import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';

const SettingsView = () => {
  const { logout } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    darkMode: false,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          ⚙️ Settings
        </h2>
        <p className="text-white text-opacity-90">Manage your preferences and account</p>
      </div>
      
      <div className="max-w-2xl space-y-4">
        {/* Notification Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm card-hover">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            🔔 Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-600">Receive email updates about events</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-gradient-to-r from-primary-red to-secondary-orange' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.emailNotifications ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Push Notifications</p>
                <p className="text-sm text-gray-600">Get instant alerts on your device</p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.pushNotifications ? 'bg-gradient-to-r from-primary-red to-secondary-orange' : 'bg-gray-300'
                }`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.pushNotifications ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm card-hover">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            🎨 Display
          </h3>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-900">Dark Mode</p>
              <p className="text-sm text-gray-600">Use dark theme for the app</p>
            </div>
            <button
              onClick={() => handleToggle('darkMode')}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.darkMode ? 'bg-gradient-to-r from-primary-red to-secondary-orange' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                settings.darkMode ? 'translate-x-6' : ''
              }`} />
            </button>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm card-hover">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            👤 Account
          </h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full hover:bg-primary-red-light hover:text-primary-red hover:border-primary-red transition-colors">
              Change Password
            </Button>
            <Button variant="outline" className="w-full hover:bg-secondary-orange-light hover:text-secondary-orange-dark hover:border-secondary-orange transition-colors">
              Privacy Policy
            </Button>
            <Button 
              variant="outline" 
              className="w-full text-white bg-gradient-to-r from-primary-red to-secondary-orange border-none hover:shadow-lg transform hover:scale-105 transition-all"
              onClick={async () => {
                await logout();
                window.location.reload();
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
