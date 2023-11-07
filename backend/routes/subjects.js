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
  try {
    const newSubject = await Subject.create({
      name: req.body.name,
      class: req.body.class,
      languages: req.body.languages,
      teacherTeaching: req.body.teacherTeaching
    });
    const populatedSubject = await Subject.findById(newSubject._id).populate('teacherTeaching');
    res.status(201).json(populatedSubject);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
