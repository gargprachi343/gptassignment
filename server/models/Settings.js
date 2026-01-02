const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  emailNotifications: { type: Boolean, default: true },
  pushNotifications: { type: Boolean, default: false },
  soundEnabled: { type: Boolean, default: true },
  compactView: { type: Boolean, default: false },
  showEventDetails: { type: Boolean, default: true },
  autoMarkAsRead: { type: Boolean, default: false },
  theme: { type: String, default: 'light' },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Settings', settingsSchema);
