import mockDataService from './mockData';

export const mongoService = {
  // Events
  async getEvents(filters = {}) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const events = mockDataService.getEvents(filters);
          resolve(events);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async createEvent(eventData) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const event = mockDataService.createEvent(eventData);
          resolve(event);
        }, 300);
      });
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(eventId, eventData) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const event = mockDataService.updateEvent(String(eventId), eventData);
          resolve(event);
        }, 300);
      });
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(eventId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          mockDataService.deleteEvent(String(eventId));
          resolve({ message: 'Event deleted successfully' });
        }, 300);
      });
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Notifications
  async getNotifications(userId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const notifications = mockDataService.getNotificationsByUserId(String(userId));
          resolve(notifications);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  },

  async markNotificationAsRead(notificationId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const notification = mockDataService.markNotificationAsRead(String(notificationId));
          resolve(notification);
        }, 300);
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async deleteNotification(notificationId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          mockDataService.deleteNotification(String(notificationId));
          resolve({ message: 'Notification deleted' });
        }, 300);
      });
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  async createNotification(notificationData) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const notification = mockDataService.createNotification(notificationData);
          resolve(notification);
        }, 300);
      });
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  // Messages
  async getMessages(userId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const messages = mockDataService.getMessagesByUserId(String(userId));
          resolve(messages);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  async markMessageAsRead(messageId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const message = mockDataService.markMessageAsRead(String(messageId));
          resolve(message);
        }, 300);
      });
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  async deleteMessage(messageId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          mockDataService.deleteMessage(String(messageId));
          resolve({ message: 'Message deleted' });
        }, 300);
      });
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  async sendMessage(messageData) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const message = mockDataService.createMessage(messageData);
          resolve(message);
        }, 300);
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Settings
  async getUserSettings(userId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const settings = mockDataService.getUserSettings(String(userId));
          resolve(settings);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  async updateUserSettings(userId, settings) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const updatedSettings = mockDataService.updateUserSettings(String(userId), settings);
          resolve(updatedSettings);
        }, 300);
      });
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  // Favorites
  async getFavorites(userId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const favorites = mockDataService.getFavoritesByUserId(String(userId));
          resolve(favorites || []);
        }, 300);
      });
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  async addFavorite(userId, eventId, eventTitle) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const favorite = mockDataService.addFavorite(String(userId), String(eventId), eventTitle);
          resolve(favorite);
        }, 300);
      });
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  async removeFavorite(userId, eventId) {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          mockDataService.removeFavorite(String(userId), String(eventId));
          resolve({ message: 'Favorite removed' });
        }, 300);
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },
};

export default mongoService;
