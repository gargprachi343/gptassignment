import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import useNotifications from '../../hooks/useNotifications';
import NotificationPanel from './NotificationPanel';

const TopBar = ({ onSearch }) => {
  const { role } = useAuth();
  const { isDarkMode } = useTheme();
  const { unreadNotificationsCount, unreadMessagesCount } = useNotifications();
  const userName = role === 'admin' ? 'Admin' : 'User';
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);
  const [messagePanelOpen, setMessagePanelOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleNotificationClick = () => {
    setNotificationPanelOpen(!notificationPanelOpen);
    setMessagePanelOpen(false);
  };

  const handleMessageClick = () => {
    setMessagePanelOpen(!messagePanelOpen);
    setNotificationPanelOpen(false);
  };

  return (
    <>
    <div className={`rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6 ${
      isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
    }`}>
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex-1 min-w-0">
          <h2 className={`text-xl sm:text-2xl font-bold truncate ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>Hey, {userName}</h2>
          <p className={`text-xs sm:text-sm ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>Welcome back!</p>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4 ml-2">
          <button 
            onClick={handleNotificationClick}
            className={`relative p-1.5 sm:p-2 rounded-full transition-colors ${
              notificationPanelOpen 
                ? 'bg-primary-red-light text-primary-red' 
                : isDarkMode
                ? 'text-gray-400 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label={`Notifications ${unreadNotificationsCount > 0 ? `(${unreadNotificationsCount} unread)` : ''}`}
            title={unreadNotificationsCount > 0 ? `${unreadNotificationsCount} unread notification(s)` : 'No new notifications'}
            aria-pressed={notificationPanelOpen}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-primary-red rounded-full text-white text-xs flex items-center justify-center" aria-label={`${unreadNotificationsCount} new notifications`}>
                {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
              </span>
            )}
          </button>
          <button 
            onClick={handleMessageClick}
            className={`relative p-1.5 sm:p-2 rounded-full transition-colors hidden sm:block ${
              messagePanelOpen 
                ? 'bg-primary-red-light text-primary-red' 
                : isDarkMode
                ? 'text-gray-400 hover:bg-gray-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            aria-label={`Messages ${unreadMessagesCount > 0 ? `(${unreadMessagesCount} unread)` : ''}`}
            title={unreadMessagesCount > 0 ? `${unreadMessagesCount} unread message(s)` : 'No new messages'}
            aria-pressed={messagePanelOpen}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {unreadMessagesCount > 0 && (
              <span className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-primary-red rounded-full text-white text-xs flex items-center justify-center" aria-label={`${unreadMessagesCount} new messages`}>
                {unreadMessagesCount > 9 ? '9+' : unreadMessagesCount}
              </span>
            )}
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-primary-red to-secondary-orange flex items-center justify-center text-white font-semibold cursor-pointer hover:opacity-90 transition-opacity text-sm sm:text-base" title={`Logged in as ${userName}`}>
            {userName.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mt-3 sm:mt-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search events..."
            className={`w-full px-3 sm:px-4 py-2 pl-9 sm:pl-10 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-orange focus:border-transparent ${
              isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                : 'border-gray-300 bg-white text-gray-900'
            }`}
            aria-label="Search events"
          />
          <button
            type="submit"
            className={`absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 transition-colors ${
              isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'
            }`}
            aria-label="Search"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
    
    <NotificationPanel 
      isOpen={notificationPanelOpen} 
      onClose={() => setNotificationPanelOpen(false)}
      defaultTab="notifications"
    />

    <NotificationPanel 
      isOpen={messagePanelOpen} 
      onClose={() => setMessagePanelOpen(false)}
      defaultTab="messages"
    />
  </>
  );
};

export default TopBar;

