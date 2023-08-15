// models/reactions.js
const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp), // Format timestamp
  },
});

// Function to format timestamp
function formatDate(timestamp) {
  return new Date(timestamp).toISOString();
}

module.exports = reactionSchema;
