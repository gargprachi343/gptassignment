const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET favorites
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    res.json(user?.favorites || []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST add favorite
router.post('/:userId', async (req, res) => {
  try {
    const { eventId } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $push: { favorites: eventId } },
      { new: true, upsert: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE remove favorite
router.delete('/:userId/:eventId', async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { userId: req.params.userId },
      { $pull: { favorites: req.params.eventId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
