const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a student
router.post("/", async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    image: req.body.image,
    class: req.body.class,
    rollNumber: req.body.rollNumber,
    // Add more fields as needed
  });
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
