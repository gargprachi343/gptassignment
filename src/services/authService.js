/**
 * Authentication Service
 * Handles login, logout, token storage, and API requests
 * Now using mock data (backend removed)
 */

import mockDataService from './mockData';

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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Validate inputs
      if (!name || !email || !password || !passwordConfirm) {
        return {
          success: false,
          message: 'All fields are required'
        };
      }

      // Check password match
      if (password !== passwordConfirm) {
        return {
          success: false,
          message: 'Passwords do not match'
        };
      }

      // Check if email already exists
      const existingUser = mockDataService.findUserByEmail(email);
      if (existingUser) {
        return {
          success: false,
          message: 'Email address is already in use'
        };
      }

      // Create new user
      const newUser = mockDataService.createUser({
        name: name.trim(),
        email: email.toLowerCase(),
        password: password,
        role: 'user'
      });

      return {
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        },
        message: 'Registration successful'
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Find user by email
      const user = mockDataService.findUserByEmail(email);
      
      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Check password (in mock, we compare directly - in real app would use bcrypt)
      if (user.password !== password) {
        return {
          success: false,
          message: 'Invalid email or password'
        };
      }

      // Generate token
      const token = mockDataService.generateToken(user.id);

      // Prepare user response (without password)
      const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      };

      // Store token and user data
      this.setToken(token);
      this.setUser(userResponse);

      return {
        success: true,
        user: userResponse,
        token: token,
        expiresIn: 3600,
        message: 'Login successful'
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Clear stored data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      this.token = null;
      this.user = null;

      return {
        success: true,
        message: 'Logged out successfully'
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      const token = this.getToken();
      if (!token) {
        return {
          success: false,
          message: 'No token found'
        };
      }

      // In mock mode, token verification is simple
      // In real app, would verify JWT on backend
      const user = this.getUser();
      if (!user) {
        return {
          success: false,
          message: 'Token invalid'
        };
      }

      return {
        success: true,
        user: user,
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
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // This is a mock implementation
      // In real app, would make actual HTTP requests
      return {
        success: true,
        data: {}
      };

    } catch (error) {
      return {
        success: false,
        message: error.message || 'Request failed'
      };
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(token) {
    return this.getUser();
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;

