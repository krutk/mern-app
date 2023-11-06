const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  image: String,
  class: String,
  rollNumber: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Student', studentSchema);
