const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacherModel.js');

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a teacher
router.post('/', async (req, res) => {
  const { name, age, image, sex, subjectsTaught } = req.body;

  try {
    const newTeacher = await Teacher.create({
      name,
      age,
      image,
      sex,
      subjectsTaught
    });

    const populatedTeacher = await Teacher.findById(newTeacher._id).populate('subjectsTaught');
    
    res.status(201).json(populatedTeacher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;
