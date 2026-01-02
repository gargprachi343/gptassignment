const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: String,
  senderName: String,
  senderRole: String,
  content: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Message', messageSchema);
