// Event categories
export const CATEGORIES = ['Workshop', 'Talk', 'Campaign'];

// Time filters
export const TIME_FILTERS = {
  ALL: 'all',
  UPCOMING: 'upcoming',
  PAST: 'past',
};

// User roles
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// Local storage keys
export const STORAGE_KEYS = {
  SESSION_ID: 'sessionId',
  ROLE: 'role',
};

// API endpoints (will be used when backend is ready)
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  EVENTS: {
    LIST: '/events',
    CREATE: '/events',
    DELETE: '/events',
  },
};

