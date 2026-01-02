const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// GET all events - PUBLIC
router.get('/', async (req, res) => {
  try {
    const { category, status } = req.query;
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (status) filter.status = status;
    
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create event - ADMIN ONLY
router.post('/', authenticate, isAdmin, async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update event - ADMIN ONLY
router.put('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE event - ADMIN ONLY
router.delete('/:id', authenticate, isAdmin, async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
