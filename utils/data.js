// utils/data.js
const users = [
    {
      username: 'user1',
      email: 'user1@example.com',
    },
    {
      username: 'user2',
      email: 'user2@example.com',
    },
    // ... more user objects
  ];
  
  const thoughts = [
    {
      thoughtText: 'Thought 1',
      username: 'user1',
    },
    {
      thoughtText: 'Thought 2',
      username: 'user2',
    },
    // ... more thought objects
  ];
  
  const reactions = [
    {
      reactionBody: 'Reaction 1',
      username: 'user1',
    },
    {
      reactionBody: 'Reaction 2',
      username: 'user2',
    },
    // ... more reaction objects
  ];
  
  module.exports = { users, thoughts, reactions };
  