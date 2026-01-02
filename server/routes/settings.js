const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// GET user settings
router.get('/:userId', async (req, res) => {
  try {
    let settings = await Settings.findOne({ userId: req.params.userId });
    if (!settings) {
      settings = new Settings({ userId: req.params.userId });
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update settings
router.put('/:userId', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      { userId: req.params.userId },
      { ...req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
