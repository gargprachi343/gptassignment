const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// GET notifications - PUBLIC (but filtered by role)
router.get('/', async (req, res) => {
  try {
    const { role } = req.query;
    const notifications = await Notification.find({ audience: role }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create notification - ADMIN ONLY
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT mark as read - AUTHENTICATED
router.put('/:id/read', authenticate, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE notification - AUTHENTICATED
router.delete('/:id', authenticate, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
