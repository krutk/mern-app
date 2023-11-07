const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// Get all students with populated subjects and teachers
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().populate({
      path: 'subjectsStuding',
      populate: {
        path: 'teacherTeaching',
        model: 'Teacher'
      }
    });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a student
router.post("/", async (req, res) => {
  const rollNumberExists = await Student.exists({ rollNumber: req.body.rollNumber });

  if (rollNumberExists) {
    return res.status(400).json({ message: "Roll number already exists" });
  }

  try {
    const newStudent = await Student.create({
      name: req.body.name,
      age: req.body.age,
      image: req.body.image,
      class: req.body.class,
      rollNumber: req.body.rollNumber,
      subjectsStuding: req.body.subjectsStuding,
    });

    // const populateStudent = await Student.findById(newStudent._id).populate('subjectsStuding')
    const populateStudent = await Student.findById(newStudent._id)
  .populate({
    path: 'subjectsStuding',
    populate: {
      path: 'teacherTeaching',
      model: 'Teacher'
    }
  });
    res.status(201).json(populateStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


module.exports = router;
