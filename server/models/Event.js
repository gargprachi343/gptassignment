const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  capacity: Number,
  registrations: Number,
  category: String,
  status: { type: String, default: 'upcoming' },
  createdBy: String, // userId or admin
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);
