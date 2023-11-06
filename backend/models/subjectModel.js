const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  languages: [String]
});

module.exports = mongoose.model('Subject', subjectSchema);
