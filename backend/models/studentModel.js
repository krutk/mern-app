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
  class: Number,
  rollNumber: {
    type: String,
    required: true,
    unique: true
  },
  subjectsStuding: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    }
  ]
});

module.exports = mongoose.model('Student', studentSchema);
