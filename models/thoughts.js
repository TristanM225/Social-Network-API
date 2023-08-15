// models/thoughts.js
const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp), // Format timestamp (add this function)
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction', // Reference to the 'Reaction' model
    },
  ],
});

// Create a virtual property 'reactionCount' to get the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Function to format timestamp (add this function)
function formatDate(timestamp) {
  return new Date(timestamp).toISOString();
}

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
