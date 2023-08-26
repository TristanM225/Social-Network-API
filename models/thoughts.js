// // models/thoughts.js
// const mongoose = require('mongoose');
// const reactionSchema = require('./reactions');

// const thoughtSchema = new mongoose.Schema({
//   thoughtText: {
//     type: String,
//     required: true,
//     minlength: 1,
//     maxlength: 280,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     get: (timestamp) => formatDate(timestamp), // Format timestamp (add this function)
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   reactions: [reactionSchema],
  
// },{toJSON: {getters: true}},);


// // Create a virtual property 'reactionCount' to get the number of reactions
// thoughtSchema.virtual('reactionCount').get(function () {
//   return this.reactions.length;
// });

// // Function to format timestamp (add this function)
// function formatDate(timestamp) {
//   console.log(timestamp);
//   const date = new Date(timestamp);
//   console.log(date);

//   const options = {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//     hour: 'numeric',
//     minute: '2-digit',
//     hour12: true,
//   };

//   return date.toLocaleDateString('en-US', options);
// }

// const Thought = mongoose.model('Thought', thoughtSchema);

// module.exports = Thought;

const mongoose = require('mongoose');
const reactionSchema = require('./reactions');
const formatDate = require('../utils/dateUtils'); // Import the formatDate function
const { reactions } = require('../utils/data');

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
    get: (timestamp) => formatDate(timestamp), // Use the imported formatDate function
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
  
}, { toJSON: { getters: true } });

// Create a virtual property 'reactionCount' to get the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;