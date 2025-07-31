// routes/reports.js
const express = require('express');
const Report = require('../models/Report');

const router = express.Router();

// POST /api/reports
router.post('/', async (req, res) => {
  const { title, description, anonymous } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required' });
  }

  try {
    const report = new Report({ title, description, anonymous });
    await report.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit report', error: err.message });
  }
});

// GET /api/reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reports', error: err.message });
  }
});

module.exports = router;
