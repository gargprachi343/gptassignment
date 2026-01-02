const crypto = require('crypto');

/**
 * Simple JWT-like token generator using crypto and base64
 * Structure: header.payload.signature
 */
class TokenManager {
  constructor(secret) {
    this.secret = secret;
  }

  // Base64 URL safe encoding
  base64UrlEncode(str) {
    return Buffer.from(str)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Base64 URL safe decoding
  base64UrlDecode(str) {
    str += new Array(5 - str.length % 4).join('=');
    return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();
  }

  // Create HMAC signature
  sign(data) {
    return crypto
      .createHmac('sha256', this.secret)
      .update(data)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  // Generate token
  generateToken(payload, expiresIn = '7d') {
    const header = {
      alg: 'HS256',
      typ: 'JWT'
    };

    // Parse expiry
    const expiryMs = this.parseExpiry(expiresIn);
    const now = Math.floor(Date.now() / 1000);

    const tokenPayload = {
      ...payload,
      iat: now,
      exp: now + Math.floor(expiryMs / 1000)
    };

    const headerEncoded = this.base64UrlEncode(JSON.stringify(header));
    const payloadEncoded = this.base64UrlEncode(JSON.stringify(tokenPayload));
    const signature = this.sign(`${headerEncoded}.${payloadEncoded}`);

    return `${headerEncoded}.${payloadEncoded}.${signature}`;
  }

  // Verify and decode token
  verifyToken(token) {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid token format');
      }

      const [headerEncoded, payloadEncoded, signatureProvided] = parts;
      const signature = this.sign(`${headerEncoded}.${payloadEncoded}`);

      if (signature !== signatureProvided) {
        throw new Error('Invalid token signature');
      }

      const payload = JSON.parse(this.base64UrlDecode(payloadEncoded));
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < now) {
        throw new Error('Token has expired');
      }

      return payload;
    } catch (error) {
      throw error;
    }
  }

  // Parse expiry string to milliseconds
  parseExpiry(expiresIn) {
    const match = expiresIn.match(/^(\d+)([dhm])$/);
    if (!match) {
      return 7 * 24 * 60 * 60 * 1000; // Default 7 days
    }

    const [, amount, unit] = match;
    const multipliers = {
      'd': 24 * 60 * 60 * 1000, // days
      'h': 60 * 60 * 1000,      // hours
      'm': 60 * 1000            // minutes
    };

    return parseInt(amount) * multipliers[unit];
  }
}

// Initialize token manager
const tokenManager = new TokenManager(process.env.JWT_SECRET || 'your_secret_key');

/**
 * Middleware to verify JWT token
 */
const protectRoute = (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided. Please login first.'
      });
    }

    // Verify token
    const decoded = tokenManager.verifyToken(token);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();

  } catch (error) {
    if (error.message.includes('expired')) {
      return res.status(401).json({
        success: false,
        message: 'Token has expired. Please login again.'
      });
    }

    if (error.message.includes('signature') || error.message.includes('format')) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. Please login again.'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

/**
 * Middleware to check admin role
 */
const requireAdmin = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin privileges required.'
    });
  }
  next();
};

/**
 * Generate token
 */
const generateToken = (userId, userRole) => {
  return tokenManager.generateToken(
    {
      id: userId,
      role: userRole
    },
    process.env.JWT_EXPIRE || '7d'
  );
};

/**
 * Decode token (for inspection)
 */
const decodeToken = (token) => {
  try {
    return tokenManager.verifyToken(token);
  } catch (error) {
    return null;
  }
};

module.exports = {
  protectRoute,
  requireAdmin,
  generateToken,
  decodeToken,
  tokenManager
};
