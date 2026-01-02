/**
 * Authentication Service
 * Handles login, logout, token storage, and API requests
 */

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/api';
console.log('AuthService initialized with API_BASE_URL:', API_BASE_URL);

class AuthService {
  constructor() {
    this.token = this.getToken();
    this.user = this.getUser();
  }

  /**
   * Store token in localStorage
   */
  setToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
      this.token = token;
    }
  }

  /**
   * Get token from localStorage
   */
  getToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Store user data in localStorage
   */
  setUser(user) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
    }
  }

  /**
   * Get user data from localStorage
   */
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Get Authorization header with token
   */
  getAuthHeader() {
    const token = this.getToken();
    if (!token) {
      return {};
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Register new user
   */
  async register(name, email, password, passwordConfirm) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirm
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return {
        success: true,
        user: data.user,
        message: data.message
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || 'Registration failed'
      };
    }
  }

  /**
   * Login user with email and password
   */
  async login(email, password) {
    try {
      const url = `${API_BASE_URL}/auth/login`;
      console.log('Sending login request to:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();
      console.log('Login response status:', response.status);
      console.log('Login response data:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store token and user data
      this.setToken(data.token);
      this.setUser(data.user);

      return {
        success: true,
        user: data.user,
        token: data.token,
        expiresIn: data.expiresIn,
        message: data.message
      };

    } catch (error) {
      console.error('Login error caught:', error);
      return {
        success: false,
        message: error.message || 'Login failed'
      };
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeader()
      });

      const data = await response.json();

      // Clear stored data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.token = null;
      this.user = null;

      return {
        success: true,
        message: data.message || 'Logout successful'
      };

    } catch (error) {
      // Clear data even if request fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.token = null;
      this.user = null;

      return {
        success: true,
        message: 'Logged out'
      };
    }
  }

  /**
   * Verify token validity
   */
  async verifyToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify-token`, {
        method: 'GET',
        headers: this.getAuthHeader()
      });

      const data = await response.json();

      if (!response.ok) {
        // Token is invalid or expired
        this.logout();
        throw new Error(data.message || 'Token invalid');
      }

      return {
        success: true,
        user: data.user,
        message: 'Token is valid'
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || 'Token verification failed'
      };
    }
  }

  /**
   * Make authenticated API request
   */
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeader(),
          ...options.headers
        }
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle 401 unauthorized (token expired)
        if (response.status === 401) {
          this.logout();
          throw new Error('Session expired. Please login again.');
        }
        throw new Error(data.message || 'Request failed');
      }

      return {
        success: true,
        data: data
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || 'Request failed'
      };
    }
  }
}

// Export singleton instance
export default new AuthService();

