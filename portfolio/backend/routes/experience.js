const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const experience = await Experience.find().sort({ startDate: -1 });
    res.json({ success: true, data: experience });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const exp = await Experience.create(req.body);
    res.status(201).json({ success: true, data: exp });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const exp = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exp) return res.status(404).json({ error: 'Experience not found' });
    res.json({ success: true, data: exp });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
