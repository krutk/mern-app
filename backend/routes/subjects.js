const express = require('express');
const router = express.Router();
const Subject = require('../models/subjectModel');

// Get all subjects
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a subject
router.post('/', async (req, res) => {
  const subject = new Subject({
    name: req.body.name,
    class: req.body.class,
    languages: req.body.languages
  });
  try {
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
