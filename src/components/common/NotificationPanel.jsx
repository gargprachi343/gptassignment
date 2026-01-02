import React, { useState, useEffect } from 'react';
import useNotifications from '../../hooks/useNotifications';
import Icon from './Icon';

const NotificationPanel = ({ isOpen, onClose, defaultTab = 'notifications' }) => {
  const {
    notifications,
    messages,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    markMessageAsRead,
    markAllMessagesAsRead,
    deleteNotification,
    deleteMessage,
  } = useNotifications();

  const [activeTab, setActiveTab] = useState(defaultTab);

  // Update activeTab when defaultTab changes
  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return timestamp.toLocaleDateString();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'event':
        return 'events';
      case 'warning':
        return 'info';
      case 'info':
      default:
        return 'info';
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <div
        className={`
          fixed right-0 top-0 h-screen w-full sm:w-96 bg-white shadow-lg z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-label="Notifications and messages"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {activeTab === 'notifications' ? 'Notifications' : 'Messages'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close panel"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200" role="tablist">
          <button
            onClick={() => setActiveTab('notifications')}
            className={`
              flex-1 px-4 py-3 font-medium text-center transition-colors relative
              ${activeTab === 'notifications'
                ? 'text-primary-red border-b-2 border-primary-red'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
            role="tab"
            aria-selected={activeTab === 'notifications'}
            aria-label="Notifications tab"
          >
            Notifications
            {unreadNotificationsCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-red text-white text-xs font-semibold rounded-full">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`
              flex-1 px-4 py-3 font-medium text-center transition-colors relative
              ${activeTab === 'messages'
                ? 'text-primary-red border-b-2 border-primary-red'
                : 'text-gray-600 hover:text-gray-900'
              }
            `}
            role="tab"
            aria-selected={activeTab === 'messages'}
            aria-label="Messages tab"
          >
            Messages
            {messages.filter(m => !m.read).length > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-primary-red text-white text-xs font-semibold rounded-full">
                {messages.filter(m => !m.read).length}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {activeTab === 'notifications' && (
            <div className="p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notifications</p>
                </div>
              ) : (
                <>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-sm text-primary-red font-medium hover:text-primary-red-dark transition-colors"
                      aria-label="Mark all notifications as read"
                    >
                      Mark all as read
                    </button>
                  )}
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`
                        p-3 rounded-lg border transition-colors
                        ${notif.read
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-blue-50 border-blue-200'
                        }
                      `}
                      role="article"
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          name={getNotificationIcon(notif.type)}
                          className={`
                            w-5 h-5 flex-shrink-0 mt-0.5
                            ${notif.type === 'warning'
                              ? 'text-orange-500'
                              : notif.type === 'event'
                              ? 'text-primary-red'
                              : 'text-gray-500'
                            }
                          `}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {notif.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {notif.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatTime(notif.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!notif.read && (
                            <button
                              onClick={() => markNotificationAsRead(notif.id)}
                              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                              aria-label={`Mark ${notif.title} as read`}
                            >
                              <div className="w-2 h-2 bg-primary-red rounded-full" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notif.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            aria-label={`Delete ${notif.title}`}
                          >
                            <Icon name="delete" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No messages</p>
                </div>
              ) : (
                <>
                  {messages.filter(m => !m.read).length > 0 && (
                    <button
                      onClick={markAllMessagesAsRead}
                      className="text-sm text-primary-red font-medium hover:text-primary-red-dark transition-colors"
                      aria-label="Mark all messages as read"
                    >
                      Mark all as read
                    </button>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`
                        p-3 rounded-lg border transition-colors
                        ${msg.read
                          ? 'bg-gray-50 border-gray-200'
                          : 'bg-green-50 border-green-200'
                        }
                      `}
                      role="article"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-red to-secondary-orange flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {msg.senderName.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900 text-sm">
                              {msg.senderName}
                            </h3>
                            <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-700 rounded">
                              {msg.senderRole}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {msg.content}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!msg.read && (
                            <button
                              onClick={() => markMessageAsRead(msg.id)}
                              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                              aria-label={`Mark message from ${msg.senderName} as read`}
                            >
                              <div className="w-2 h-2 bg-primary-red rounded-full" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            aria-label={`Delete message from ${msg.senderName}`}
                          >
                            <Icon name="delete" className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {activeTab === 'notifications' && (
            <p className="text-xs text-gray-600">
              {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            </p>
          )}
          {activeTab === 'messages' && (
            <p className="text-xs text-gray-600">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
