const { tokenManager } = require('./auth');

/**
 * Authenticate middleware - Verify JWT token and attach user to request
 */
const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.'
      });
    }

    const token = authHeader.slice(7);
    const decoded = tokenManager.verifyToken(token);

    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (error) {
    const message = error.message.includes('expired') 
      ? 'Token has expired. Please login again.'
      : 'Invalid token. Please login again.';
    
    return res.status(401).json({
      success: false,
      message: message
    });
  }
};

/**
 * Middleware to verify admin role
 * Must be used after authenticate middleware
 */
const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

/**
 * Middleware to verify user ownership
 * Ensures user can only modify their own data
 */
const ownsResource = (req, res, next) => {
  const userId = req.params.id || req.params.userId;

  if (!req.user || req.user.id !== userId) {
    // Allow admins to modify any user's data
    if (req.user?.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only modify your own data.'
      });
    }
  }
  next();
};

/**
 * optionalAuth middleware - Allow requests with or without token
 * If token is present and valid, attach user. Otherwise continue unauthenticated.
 */
const optionalAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const decoded = tokenManager.verifyToken(token);

      req.user = {
        id: decoded.id,
        role: decoded.role
      };
    }
    next();

  } catch (error) {
    // Continue without user info if token is invalid
    next();
  }
};

module.exports = {
  authenticate,
  isAdmin,
  ownsResource,
  optionalAuth
};
