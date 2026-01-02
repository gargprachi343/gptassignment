const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: String,
  title: String,
  message: String,
  type: { type: String, enum: ['event', 'warning', 'info'], default: 'info' },
  audience: { type: String, enum: ['admin', 'user'], default: 'user' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);
