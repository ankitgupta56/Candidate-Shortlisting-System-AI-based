const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  skills: {
    type: [String],
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  bio: {
    type: String,
    default: ''
  },
  projects: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', CandidateSchema);
