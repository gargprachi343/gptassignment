import mockDataService from './mockData';

export const eventsService = {
  async getEvents(sessionId, filters = {}) {
    // Use mock data service
    return new Promise((resolve) => {
      setTimeout(() => {
        const events = mockDataService.getEvents(filters);
        resolve(events);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        const event = mockDataService.createEvent(eventData);
        resolve(event);
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
    return new Promise((resolve) => {
      setTimeout(() => {
        mockDataService.deleteEvent(String(eventId));
        resolve({ message: 'Event deleted successfully' });
      }, 300);
    });
  },
};

