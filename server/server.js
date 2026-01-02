const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
let mongoConnected = false;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:5001', 'http://localhost:5002'],
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection (with fallback for offline mode)
mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME || 'event_management',
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  mongoConnected = true;
  console.log('✅ Connected to MongoDB');
}).catch(err => {
  mongoConnected = false;
  console.warn('⚠️  MongoDB unavailable. Running in offline/mock mode.');
  console.warn('   Error:', err.message);
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/protected', require('./routes/protected'));
app.use('/api/events', require('./routes/events'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/messages', require('./routes/messages'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Event Management API Server',
    version: '1.0.0',
    endpoints: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/logout',
      '/api/auth/verify-token',
      '/api/auth/user/:id',
      '/api/auth/change-password/:id',
      '/api/protected/me (protected)',
      '/api/protected/admin/users (admin)',
      '/api/protected/admin/events (admin)',
      '/api/protected/dashboard/:userId (protected)',
      '/api/protected/events/explore',
      '/api/protected/favorites/:eventId (protected)',
      '/api/protected/statistics (protected)',
      '/api/events',
      '/api/notifications',
      '/api/messages',
      '/api/settings',
      '/api/favorites',
      '/api/users',
      '/api/health'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Database: ${process.env.DB_NAME || 'event_management'}`);
  console.log(`📚 API Base: http://localhost:${PORT}/api`);
});
