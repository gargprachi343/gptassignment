import React from 'react';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import useSettings from '../../hooks/useSettings';
import Button from '../common/Button';
import Icon from '../common/Icon';

const SettingsView = () => {
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const { settings, toggleSetting, resetSettings } = useSettings();

  const handlePasswordChange = () => {
    alert('Password change feature would be implemented with backend integration.');
  };

  const handlePrivacyPolicy = () => {
    alert('Privacy Policy:\n\nYour privacy is important to us. We collect and use your data only for providing event management services.');
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset all settings to default?')) {
      resetSettings();
      alert('Settings have been reset to default.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary-red to-secondary-orange rounded-xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Icon name="settings" className="w-8 h-8" />
          Settings
        </h2>
        <p className="text-white text-opacity-90">Manage your preferences and account</p>
      </div>
      
      <div className="max-w-2xl space-y-4">
        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="info" className="w-5 h-5" />
            Notifications
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive email updates about events</p>
              </div>
              <ToggleSwitch 
                checked={settings.emailNotifications}
                onChange={() => toggleSetting('emailNotifications')}
                aria-label="Toggle email notifications"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get instant alerts on your device</p>
              </div>
              <ToggleSwitch 
                checked={settings.pushNotifications}
                onChange={() => toggleSetting('pushNotifications')}
                aria-label="Toggle push notifications"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Sound Enabled</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Play notification sounds</p>
              </div>
              <ToggleSwitch 
                checked={settings.soundEnabled}
                onChange={() => toggleSetting('soundEnabled')}
                aria-label="Toggle sound notifications"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Auto-mark as Read</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Automatically mark notifications as read</p>
              </div>
              <ToggleSwitch 
                checked={settings.autoMarkAsRead}
                onChange={() => toggleSetting('autoMarkAsRead')}
                aria-label="Toggle auto-mark as read"
              />
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="dashboard" className="w-5 h-5" />
            Display
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Use dark theme for the app</p>
              </div>
              <ToggleSwitch 
                checked={isDarkMode}
                onChange={toggleTheme}
                aria-label="Toggle dark mode"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Compact View</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display events in compact layout</p>
              </div>
              <ToggleSwitch 
                checked={settings.compactView}
                onChange={() => toggleSetting('compactView')}
                aria-label="Toggle compact view"
              />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Show Event Details</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display full event information</p>
              </div>
              <ToggleSwitch 
                checked={settings.showEventDetails}
                onChange={() => toggleSetting('showEventDetails')}
                aria-label="Toggle event details"
              />
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Icon name="user" className="w-5 h-5" />
            Account
          </h3>
          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full hover:bg-primary-red-light hover:text-primary-red hover:border-primary-red transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={handlePasswordChange}
              aria-label="Change password"
            >
              Change Password
            </Button>
            <Button 
              variant="outline" 
              className="w-full hover:bg-secondary-orange-light hover:text-secondary-orange-dark hover:border-secondary-orange transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={handlePrivacyPolicy}
              aria-label="View privacy policy"
            >
              Privacy Policy
            </Button>
            <Button
              variant="outline"
              className="w-full hover:bg-gray-100 transition-colors dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
              onClick={handleResetSettings}
              aria-label="Reset all settings to default"
            >
              Reset Settings
            </Button>
            <Button 
              className="w-full text-white bg-gradient-to-r from-primary-red to-secondary-orange border-none hover:shadow-lg transform hover:scale-105 transition-all"
              onClick={async () => {
                await logout();
                window.location.reload();
              }}
              aria-label="Logout from application"
            >
              <Icon name="close" className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Toggle Switch Component
const ToggleSwitch = ({ checked, onChange, disabled = false, ...props }) => (
  <button
    onClick={onChange}
    disabled={disabled}
    className={`relative w-12 h-6 rounded-full transition-colors ${
      checked 
        ? 'bg-gradient-to-r from-primary-red to-secondary-orange' 
        : 'bg-gray-300 dark:bg-gray-600'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    role="switch"
    aria-checked={checked}
    {...props}
  >
    <div 
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
        checked ? 'translate-x-6' : ''
      }`} 
    />
  </button>
);

export default SettingsView;
