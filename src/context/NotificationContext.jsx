import React, { createContext, useState, useCallback, useEffect } from 'react';
import mongoService from '../services/mongoService';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // Admin-specific notifications with fallback defaults
  const adminNotifications = [
    {
      id: 1,
      title: 'Event Submitted for Review',
      message: 'Prachi Garg has submitted a new Workshop Event that is pending your approval.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      type: 'event',
      audience: 'admin',
    },
    {
      id: 2,
      title: 'Low Attendance Alert',
      message: 'Tech Talk event has only 2 registrations. Please take action to increase attendance.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
      type: 'warning',
      audience: 'admin',
    },
    {
      id: 3,
      title: 'User Report Submitted',
      message: 'Devesh Kumar has submitted an issue report for the Web Design event.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      type: 'info',
      audience: 'admin',
    },
  ];

  // User-specific notifications with fallback defaults
  const userNotifications = [
    {
      id: 101,
      title: 'Event Registration Confirmed',
      message: 'You have successfully registered for the Web Design Workshop. A confirmation email has been sent to you.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      type: 'event',
      audience: 'user',
    },
    {
      id: 102,
      title: 'Event Reminder',
      message: 'JavaScript Workshop starts in 2 hours! Please prepare your materials and join on time.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      read: false,
      type: 'warning',
      audience: 'user',
    },
    {
      id: 103,
      title: 'New Event Available',
      message: 'React Advanced workshop has been added based on your interests. Register now.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      read: true,
      type: 'info',
      audience: 'user',
    },
  ];

  // Get role from localStorage to avoid hook issue
  const role = typeof window !== 'undefined' 
    ? localStorage.getItem('role') 
    : 'user';

  const [notifications, setNotifications] = useState(
    role === 'admin' ? adminNotifications : userNotifications
  );

  const [messages, setMessages] = useState([
    {
      id: 1,
      senderName: role === 'admin' ? 'Prachi Garg (System)' : 'Prachi Garg (Admin)',
      senderRole: role === 'admin' ? 'system' : 'admin',
      content: role === 'admin' 
        ? 'Please review and approve the pending events in the dashboard.' 
        : 'The Web Design Workshop has been rescheduled for next Friday. Please confirm your attendance.',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: 2,
      senderName: role === 'admin' ? 'Devesh Kumar (User)' : 'Event Team (Admin)',
      senderRole: role === 'admin' ? 'user' : 'admin',
      content: role === 'admin'
        ? 'Can I increase the capacity for the Workshop event?'
        : 'Thank you for registering! You will receive event details via email. Contact us for any questions.',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false,
    },
  ]);

  // Update notifications when role changes
  useEffect(() => {
    if (role === 'admin') {
      setNotifications([
        {
          id: 1,
          title: 'Event Submitted for Review',
          message: 'A new workshop event is pending your approval.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          type: 'event',
          audience: 'admin',
        },
        {
          id: 2,
          title: 'Low Attendance Alert',
          message: 'The Tech Talk event has only 2 registrations.',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          read: false,
          type: 'warning',
          audience: 'admin',
        },
        {
          id: 3,
          title: 'User Report Submitted',
          message: 'John Doe submitted an issue report for the Web Design event.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          read: true,
          type: 'info',
          audience: 'admin',
        },
      ]);
    } else {
      setNotifications([
        {
          id: 101,
          title: 'Event Registration Confirmed',
          message: 'You have successfully registered for the Web Design Workshop.',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          read: false,
          type: 'event',
          audience: 'user',
        },
        {
          id: 102,
          title: 'Event Reminder',
          message: 'The JavaScript Workshop starts in 2 hours!',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          read: false,
          type: 'warning',
          audience: 'user',
        },
        {
          id: 103,
          title: 'New Event Available',
          message: 'A new React Advanced workshop has been added to your interests.',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          read: true,
          type: 'info',
          audience: 'user',
        },
      ]);
    }
  }, [role]);

  // Fetch notifications and messages from MongoDB
  useEffect(() => {
    const fetchNotificationsFromDB = async () => {
      try {
        const data = await mongoService.getNotifications(role);
        if (data && data.length > 0) {
          setNotifications(data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications from MongoDB:', error);
        // Keep local state on error
      }
    };

    const fetchMessagesFromDB = async () => {
      try {
        const data = await mongoService.getMessages(role);
        if (data && data.length > 0) {
          setMessages(data);
        }
      } catch (error) {
        console.error('Failed to fetch messages from MongoDB:', error);
        // Keep local state on error
      }
    };

    fetchNotificationsFromDB();
    fetchMessagesFromDB();
  }, [role]);

  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  const unreadMessagesCount = messages.filter(m => !m.read).length;

  const markNotificationAsRead = useCallback((notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    // Sync with MongoDB
    mongoService.markNotificationAsRead(notificationId).catch(error =>
      console.error('Failed to mark notification as read in MongoDB:', error)
    );
  }, []);

  const markAllNotificationsAsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  const markMessageAsRead = useCallback((messageId) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, read: true } : msg
      )
    );
    // Sync with MongoDB
    mongoService.markMessageAsRead(messageId).catch(error =>
      console.error('Failed to mark message as read in MongoDB:', error)
    );
  }, []);

  const markAllMessagesAsRead = useCallback(() => {
    setMessages(prev => prev.map(msg => ({ ...msg, read: true })));
  }, []);

  const deleteNotification = useCallback((notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    // Sync with MongoDB
    mongoService.deleteNotification(notificationId).catch(error =>
      console.error('Failed to delete notification from MongoDB:', error)
    );
  }, []);

  const deleteMessage = useCallback((messageId) => {
    setMessages(prev => prev.filter(msg => msg.id !== messageId));
    // Sync with MongoDB
    mongoService.deleteMessage(messageId).catch(error =>
      console.error('Failed to delete message from MongoDB:', error)
    );
  }, []);

  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      type: 'info',
      ...notification,
    };
    setNotifications(prev => [newNotification, ...prev]);
    // Sync with MongoDB
    mongoService.createNotification(newNotification).catch(error =>
      console.error('Failed to create notification in MongoDB:', error)
    );
  }, []);

  const addMessage = useCallback((message) => {
    const newMessage = {
      id: Date.now(),
      timestamp: new Date(),
      read: false,
      ...message,
    };
    setMessages(prev => [newMessage, ...prev]);
    // Sync with MongoDB
    mongoService.sendMessage(newMessage).catch(error =>
      console.error('Failed to send message to MongoDB:', error)
    );
  }, []);

  const value = {
    notifications,
    messages,
    unreadNotificationsCount,
    unreadMessagesCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    markMessageAsRead,
    markAllMessagesAsRead,
    deleteNotification,
    deleteMessage,
    addNotification,
    addMessage,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
