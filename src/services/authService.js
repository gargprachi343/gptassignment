import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  /**
   * Login with selected role
   * @param {string} role - User role ('user' or 'admin')
   * @returns {Promise<Object>} Response with sessionId and role
   */
  async login(role) {
    // TODO: Uncomment when backend is ready
    // const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { role });
    // return response.data;
    
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          role,
        });
      }, 300);
    });
  },

  /**
   * Get current user from session
   * @param {string} sessionId - Session ID
   * @returns {Promise<Object>} User object with role
   */
  async getCurrentUser(sessionId) {
    // TODO: Uncomment when backend is ready
    // const response = await api.get(API_ENDPOINTS.AUTH.ME, {
    //   headers: {
    //     'X-Session-Id': sessionId,
    //   },
    // });
    // return response.data;
    
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        const role = localStorage.getItem('role');
        resolve({ role });
      }, 100);
    });
  },

  /**
   * Logout current session
   * @param {string} sessionId - Session ID
   * @returns {Promise<Object>} Logout response
   */
  async logout(sessionId) {
    // TODO: Uncomment when backend is ready
    // const response = await api.post(
    //   API_ENDPOINTS.AUTH.LOGOUT,
    //   {},
    //   {
    //     headers: {
    //       'X-Session-Id': sessionId,
    //     },
    //   }
    // );
    // return response.data;
    
    // Mock implementation for now
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ message: 'Logged out successfully' });
      }, 100);
    });
  },
};

