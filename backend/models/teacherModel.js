const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  image: String,
  sex: {
    type: String,
    required: true
  },
  subjectsTaught: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject'
    }
  ]
});

module.exports = mongoose.model('Teacher', teacherSchema);
