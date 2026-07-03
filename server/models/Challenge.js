const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  targetSteps: {
    type: Number,
    required: true,
    min: 1,
  },

  startDate: {
    type: Date,
  },

  endDate: {
    type: Date,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Challenge', challengeSchema);
