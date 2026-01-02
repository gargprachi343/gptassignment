const express = require('express');
const router = express.Router();
const User = require('../models/User');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../middleware/auth');
const { authenticate, isAdmin, ownsResource } = require('../middleware/authMiddleware');
const mockDB = require('../mockDB');

// Helper to determine if MongoDB is available
async function isMongoAvailable() {
  try {
    const mongoose = require('mongoose');
    return mongoose.connection.readyState === 1;
  } catch {
    return false;
  }
}

// Helper to find user (uses MongoDB if available, mock DB otherwise)
async function findUserByEmail(email) {
  const mongoAvailable = await isMongoAvailable();
  
  if (mongoAvailable) {
    return await User.findByEmail(email).select('+password');
  } else {
    return mockDB.findUserByEmail(email);
  }
}

/**
 * POST /api/auth/register
 * Register a new user with validation
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // Input validation
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: name, email, password, passwordConfirm'
      });
    }

    // Name validation
    if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 50 characters'
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email address is already in use'
      });
    }

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      role: 'user'
    });

    // Save user (password will be hashed by pre-save middleware)
    await newUser.save();

    // Return success response without password
    const userResponse = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      createdAt: newUser.createdAt
    };

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: userResponse
    });

  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email address is already in use'
      });
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    // General error
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during registration. Please try again.'
    });
  }
});

/**
 * POST /api/auth/login
 * Login user with email and password, returns JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('[LOGIN] Received request:', { email, password: password ? '***' : 'missing' });

    // Input validation
    if (!email || !password) {
      console.log('[LOGIN] Validation failed: missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Email validation
    if (!validator.isEmail(email)) {
      console.log('[LOGIN] Email validation failed:', email);
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Find user by email
    console.log('[LOGIN] Finding user:', email);
    const user = await findUserByEmail(email);
    console.log('[LOGIN] User found:', user ? `${user.name} (${user.role})` : 'NOT FOUND');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email or password is incorrect'
      });
    }

    // Check if account is active
    if (!user.isActive) {
      console.log('[LOGIN] Account inactive');
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    // Compare passwords using bcrypt (or direct comparison for mock DB)
    let isPasswordValid = false;

if (user.password.startsWith('$2')) {
  // bcrypt hash (MongoDB)
  isPasswordValid = await bcrypt.compare(password, user.password);
} else {
  // plain text (mock DB)
  isPasswordValid = password === user.password;
}


    if (!isPasswordValid) {
      console.log('[LOGIN] Password invalid');
      return res.status(401).json({
        success: false,
        message: 'Email or password is incorrect'
      });
    }

    console.log('[LOGIN] Password valid, generating token');
    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Return success response with token and user info
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    };

    // Set token in httpOnly cookie (optional, for frontend compatibility)
    res.cookie('authToken', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax'
    });

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token: token,
      expiresIn: process.env.JWT_EXPIRE || '7d',
      user: userResponse
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred during login. Please try again.'
    });
  }
});

/**
 * GET /api/auth/user/:id
 * Get user by ID (protected route with JWT)
 */
router.get('/user/:id', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .populate('favorites', 'title date location category')
      .populate('history', 'title date');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      user: user
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving user information'
    });
  }
});

/**
 * PUT /api/auth/user/:id
 * Update user profile (protected route with JWT)
 */
router.put('/user/:id', authenticate, ownsResource, async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validation
    if (name && (name.trim().length < 2 || name.trim().length > 50)) {
      return res.status(400).json({
        success: false,
        message: 'Name must be between 2 and 50 characters'
      });
    }

    if (email && !validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Check if new email is already in use
    if (email) {
      const existingUser = await User.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: req.params.id }
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: 'Email address is already in use'
        });
      }
    }

    // Update user
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase();

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user: user
    });

  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Email address is already in use'
      });
    }

    console.error('Update user error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while updating user information'
    });
  }
});

/**
 * POST /api/auth/change-password/:id
 * Change user password (protected route with JWT)
 */
router.post('/change-password/:id', authenticate, ownsResource, async (req, res) => {
  try {
    const { currentPassword, newPassword, newPasswordConfirm } = req.body;

    // Input validation
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: currentPassword, newPassword, newPasswordConfirm'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    if (newPassword !== newPasswordConfirm) {
      return res.status(400).json({
        success: false,
        message: 'New passwords do not match'
      });
    }

    // Find user with password field
    const user = await User.findById(req.params.id).select('+password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });

  } catch (error) {
    console.error('Change password error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while changing password'
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user (clears token cookie)
 */
router.post('/logout', (req, res) => {
  res.clearCookie('authToken');
  return res.status(200).json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * GET /api/auth/verify-token
 * Verify JWT token and return user info
 */
router.get('/verify-token', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Token is valid',
      user: user
    });

  } catch (error) {
    console.error('Verify token error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while verifying token'
    });
  }
});

module.exports = router;
