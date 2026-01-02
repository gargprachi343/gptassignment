import axios from 'axios';

// MongoDB API client
const mongoAPI = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
mongoAPI.interceptors.request.use((config) => {
  const sessionId = localStorage.getItem('sessionId');
  if (sessionId) {
    config.headers.Authorization = `Bearer ${sessionId}`;
  }
  return config;
});

export const mongoService = {
  // Events
  async getEvents(filters = {}) {
    try {
      const response = await mongoAPI.get('/events', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  },

  async createEvent(eventData) {
    try {
      const response = await mongoAPI.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  async updateEvent(eventId, eventData) {
    try {
      const response = await mongoAPI.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },

  async deleteEvent(eventId) {
    try {
      const response = await mongoAPI.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting event:', error);
      throw error;
    }
  },

  // Notifications
  async getNotifications(role) {
    try {
      const response = await mongoAPI.get('/notifications', { params: { role } });
      return response.data;
    } catch (error) {
      console.error('Error fetching notifications:', error);
      return [];
    }
  },

  async markNotificationAsRead(notificationId) {
    try {
      const response = await mongoAPI.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  },

  async deleteNotification(notificationId) {
    try {
      const response = await mongoAPI.delete(`/notifications/${notificationId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notification:', error);
      throw error;
    }
  },

  async createNotification(notificationData) {
    try {
      const response = await mongoAPI.post('/notifications', notificationData);
      return response.data;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  },

  // Messages
  async getMessages(role) {
    try {
      const response = await mongoAPI.get('/messages', { params: { role } });
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  },

  async markMessageAsRead(messageId) {
    try {
      const response = await mongoAPI.put(`/messages/${messageId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  },

  async deleteMessage(messageId) {
    try {
      const response = await mongoAPI.delete(`/messages/${messageId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting message:', error);
      throw error;
    }
  },

  async sendMessage(messageData) {
    try {
      const response = await mongoAPI.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Settings
  async getUserSettings(userId) {
    try {
      const response = await mongoAPI.get(`/settings/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      return null;
    }
  },

  async updateUserSettings(userId, settings) {
    try {
      const response = await mongoAPI.put(`/settings/${userId}`, settings);
      return response.data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  },

  // Favorites
  async getFavorites(userId) {
    try {
      const response = await mongoAPI.get(`/favorites/${userId}`);
      return response.data || [];
    } catch (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }
  },

  async addFavorite(userId, eventId) {
    try {
      const response = await mongoAPI.post(`/favorites/${userId}`, { eventId });
      return response.data;
    } catch (error) {
      console.error('Error adding favorite:', error);
      throw error;
    }
  },

  async removeFavorite(userId, eventId) {
    try {
      const response = await mongoAPI.delete(`/favorites/${userId}/${eventId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing favorite:', error);
      throw error;
    }
  },
};

export default mongoService;
