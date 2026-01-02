const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');
const { authenticate, isAdmin, ownsResource, optionalAuth } = require('../middleware/authMiddleware');

/**
 * EXAMPLE 1: Protected Route - Get current user profile
 * Requires: Valid JWT token
 * Returns: User data (authenticated user only)
 */
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
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
      message: 'User profile retrieved',
      data: {
        user: user,
        token_info: {
          userId: req.user.id,
          role: req.user.role,
          issuedAt: new Date(req.user.iat * 1000),
          expiresAt: new Date(req.user.exp * 1000)
        }
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving user profile'
    });
  }
});

/**
 * EXAMPLE 2: Protected Admin Route - Get all users
 * Requires: Valid JWT token with admin role
 * Returns: List of all users (admin only)
 */
router.get('/admin/users', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .limit(50);

    return res.status(200).json({
      success: true,
      message: 'Users list retrieved',
      count: users.length,
      data: {
        users: users,
        requestedBy: {
          userId: req.user.id,
          role: req.user.role
        }
      }
    });

  } catch (error) {
    console.error('Get users error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving users'
    });
  }
});

/**
 * EXAMPLE 3: Protected Admin Route - Delete user
 * Requires: Valid JWT token with admin role
 * Returns: Confirmation message
 */
router.delete('/admin/users/:id', authenticate, isAdmin, async (req, res) => {
  try {
    // Prevent self-deletion
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {
        deletedUser: user.name,
        deletedEmail: user.email,
        deletedBy: {
          userId: req.user.id,
          role: req.user.role
        }
      }
    });

  } catch (error) {
    console.error('Delete user error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error deleting user'
    });
  }
});

/**
 * EXAMPLE 4: Protected Route with Ownership Check
 * Requires: Valid JWT token, must own the resource (or be admin)
 * Returns: Personal dashboard data
 */
router.get('/dashboard/:userId', authenticate, ownsResource, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select('-password')
      .populate('favorites', 'title category date')
      .populate('history', 'title date');

    const favoriteCount = user.favorites?.length || 0;
    const historyCount = user.history?.length || 0;

    return res.status(200).json({
      success: true,
      message: 'Dashboard data retrieved',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        statistics: {
          favoritesCount: favoriteCount,
          historyCount: historyCount,
          accountCreated: user.createdAt,
          accountUpdated: user.updatedAt
        },
        favorites: user.favorites?.slice(0, 5),
        recentHistory: user.history?.slice(0, 5),
        accessedBy: {
          userId: req.user.id,
          timestamp: new Date()
        }
      }
    });

  } catch (error) {
    console.error('Get dashboard error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard'
    });
  }
});

/**
 * EXAMPLE 5: Protected Admin Route - Create event
 * Requires: Valid JWT token with admin role
 * Returns: Created event data
 */
router.post('/admin/events', authenticate, isAdmin, async (req, res) => {
  try {
    const { title, description, date, time, location, capacity, category } = req.body;

    // Validation
    if (!title || !date || !category) {
      return res.status(400).json({
        success: false,
        message: 'Title, date, and category are required'
      });
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      capacity: capacity || 50,
      category,
      status: 'upcoming',
      createdBy: req.user.id
    });

    await newEvent.save();

    return res.status(201).json({
      success: true,
      message: 'Event created successfully',
      data: {
        event: newEvent,
        createdBy: {
          userId: req.user.id,
          role: req.user.role
        }
      }
    });

  } catch (error) {
    console.error('Create event error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error creating event'
    });
  }
});

/**
 * EXAMPLE 6: Optional Auth Route - Get public events (with user preferences)
 * Requires: Optional JWT token
 * Returns: Events with user-specific data if authenticated
 */
router.get('/events/explore', optionalAuth, async (req, res) => {
  try {
    const events = await Event.find({ status: 'upcoming' })
      .select('title category date location capacity registrations')
      .limit(10);

    let userFavorites = [];
    if (req.user) {
      const user = await User.findById(req.user.id).select('favorites');
      userFavorites = user?.favorites?.map(fav => fav.toString()) || [];
    }

    const eventsWithUserData = events.map(event => ({
      ...event.toObject(),
      isFavorite: userFavorites.includes(event._id.toString()),
      availableSeats: event.capacity - event.registrations
    }));

    return res.status(200).json({
      success: true,
      message: 'Events retrieved',
      count: eventsWithUserData.length,
      data: {
        events: eventsWithUserData,
        isAuthenticated: !!req.user,
        authenticatedUser: req.user ? {
          userId: req.user.id,
          role: req.user.role
        } : null
      }
    });

  } catch (error) {
    console.error('Get events error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving events'
    });
  }
});

/**
 * EXAMPLE 7: Protected Route - Add event to favorites
 * Requires: Valid JWT token
 * Returns: Updated user favorites
 */
router.post('/favorites/:eventId', authenticate, async (req, res) => {
  try {
    const { eventId } = req.params;

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found'
      });
    }

    // Add to favorites
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $addToSet: { favorites: eventId } },
      { new: true }
    ).select('-password');

    const isFavorite = user.favorites.includes(eventId);

    return res.status(200).json({
      success: true,
      message: isFavorite ? 'Event added to favorites' : 'Event already in favorites',
      data: {
        eventId: eventId,
        eventTitle: event.title,
        totalFavorites: user.favorites.length,
        userId: req.user.id
      }
    });

  } catch (error) {
    console.error('Add favorite error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error adding to favorites'
    });
  }
});

/**
 * EXAMPLE 8: Protected Route - Get user statistics
 * Requires: Valid JWT token
 * Returns: User activity statistics
 */
router.get('/statistics', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const userStats = {
      profile: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountAge: Math.floor((Date.now() - user.createdAt) / (1000 * 60 * 60 * 24)) + ' days'
      },
      activities: {
        favorites: user.favorites?.length || 0,
        history: user.history?.length || 0,
        registeredEvents: user.history?.length || 0
      },
      security: {
        lastLogin: 'N/A',
        loginCount: 'N/A',
        lastPasswordChange: 'N/A'
      },
      accountStatus: {
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    };

    return res.status(200).json({
      success: true,
      message: 'User statistics retrieved',
      data: userStats
    });

  } catch (error) {
    console.error('Get statistics error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error retrieving statistics'
    });
  }
});

/**
 * EXAMPLE 9: Protected Route - Remove from favorites
 * Requires: Valid JWT token, must own the resource
 */
router.delete('/favorites/:eventId', authenticate, async (req, res) => {
  try {
    const { eventId } = req.params;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $pull: { favorites: eventId } },
      { new: true }
    ).select('-password');

    return res.status(200).json({
      success: true,
      message: 'Event removed from favorites',
      data: {
        eventId: eventId,
        totalFavorites: user.favorites.length,
        userId: req.user.id
      }
    });

  } catch (error) {
    console.error('Remove favorite error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error removing from favorites'
    });
  }
});

module.exports = router;
