import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

// eslint-disable-next-line no-unused-vars
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const eventsService = {
  async getEvents(sessionId, filters = {}) {
    // TODO: Uncomment when backend is ready
    // const params = new URLSearchParams();
    // if (filters.category && filters.category !== 'all') {
    //   params.append('category', filters.category);
    // }
    // if (filters.timeFilter && filters.timeFilter !== 'all') {
    //   params.append('timeFilter', filters.timeFilter);
    // }
    // const response = await api.get(`${API_ENDPOINTS.EVENTS.LIST}?${params.toString()}`, {
    //   headers: getAuthHeaders(),
    // });
    // return response.data;
    
    // Mock implementation for now (will return empty array until backend is ready)
    // When backend is ready, uncomment the API call above and remove this mock
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock data for development
        const mockEvents = [
          {
            id: 1,
            title: 'React Workshop: Building Modern UIs',
            date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            location: 'Tech Hub, Room 101',
            category: 'Workshop',
          },
          {
            id: 2,
            title: 'Keynote: The Future of Web Development',
            date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            location: 'Main Auditorium',
            category: 'Talk',
          },
          {
            id: 3,
            title: 'Community Outreach Campaign',
            date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            location: 'Community Center',
            category: 'Campaign',
          },
          {
            id: 4,
            title: 'Past Event: Introduction to Node.js',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            location: 'Online',
            category: 'Workshop',
          },
          {
            id: 5,
            title: 'Past Event: Database Design Best Practices',
            date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            location: 'Conference Room B',
            category: 'Talk',
          },
        ];
        
        // Apply filters (mocked client-side filtering)
        let filtered = [...mockEvents];
        if (filters.category && filters.category !== 'all') {
          filtered = filtered.filter(e => e.category === filters.category);
        }
        if (filters.timeFilter === 'upcoming') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          filtered = filtered.filter(e => {
            const eventDate = new Date(e.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
          });
        } else if (filters.timeFilter === 'past') {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          filtered = filtered.filter(e => {
            const eventDate = new Date(e.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate < today;
          });
        }
        
        resolve(filtered);
      }, 300);
    });
  },

  /**
   * Create a new event
   * @param {string} sessionId - Session ID
   * @param {Object} eventData - Event data (title, date, location, category)
   * @returns {Promise<Object>} Created event
   */
  async createEvent(sessionId, eventData) {
    // TODO: Uncomment when backend is ready
    // const response = await api.post(API_ENDPOINTS.EVENTS.CREATE, eventData, {
    //   headers: getAuthHeaders(),
    // });
    // return response.data;
    
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          ...eventData,
        });
      }, 300);
    });
  },

  /**
   * Delete an event
   * @param {string} sessionId - Session ID
   * @param {number|string} eventId - Event ID to delete
   * @returns {Promise<Object>} Delete response
   */
  async deleteEvent(sessionId, eventId) {
    // TODO: Uncomment when backend is ready
    // const response = await api.delete(`${API_ENDPOINTS.EVENTS.DELETE}/${eventId}`, {
    //   headers: getAuthHeaders(),
    // });
    // return response.data;
    
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Event deleted successfully' });
      }, 300);
    });
  },
};

