const Report = require('../models/Report');

const createReport = async (req, res) => {
  try {
    const { title, description, anonymous } = req.body;

    const newReport = new Report({
      title,
      description,
      anonymous
    });

    await newReport.save();

    res.status(201).json({ message: 'Report submitted successfully!' });
  } catch (err) {
    console.error('Error submitting report:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createReport };
