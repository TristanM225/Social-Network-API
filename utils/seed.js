// utils/seed.js
const mongoose = require('mongoose');
const { User, Thought, Reaction } = require('../models');
const { users, thoughts, reactions } = require('./data');



mongoose.connect('mongodb://localhost/social-network-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedDatabase() {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);

    for (const thought of thoughts) {
      thought.userId = createdUsers.find(
        (user) => user.username === thought.username
      )._id;
    }

    const createdThoughts = await Thought.insertMany(thoughts);

    for (const reaction of reactions) {
      const thought = createdThoughts.find(
        (thought) => thought.username === reaction.username
      );
      const reactionData = {
        reactionBody: reaction.reactionBody,
        username: reaction.username,
        createdAt: new Date(), // This should be the actual timestamp
      };
      thought.reactions.push(reactionData);
      await thought.save();
    }
    await Thought.updateMany({}, { $push: { reactions: reactions } });

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
