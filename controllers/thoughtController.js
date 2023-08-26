// controllers/thoughtController.js
const { Thought, User, Reaction } = require('../models');

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      // .populate('reactions')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thought.findById(req.params.thoughtId)
      .populate('reactions')
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        // Push the created thought's _id to the associated user's thoughts array
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought created and associated with user' }))
      .catch((err) => res.status(400).json(err));
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((thought) => res.json(thought))
      .catch((err) => res.status(400).json(err));
  },

  deleteThought(req, res) {
    Thought.findByIdAndDelete(req.params.thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        // Remove the thought's reactions if desired
        return Reaction.deleteMany({ thoughtId: thought._id });
      })
      .then(() => res.json({ message: 'Thought and associated reactions deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    // Reaction.create(req.body)
    //   .then((reaction) => {
    //     // Push the created reaction's _id to the associated thought's reactions array
    //     return Thought.findOneAndUpdate(
    //       { _id: req.params.thoughtId },
    //       { $push: { reactions: reaction._id } },
    //       { new: true }
    //     );
    //   })
    Thought.findOneAndUpdate({_id: req.params.thoughtId},{$addToSet: {reactions : req.body}}, {new: true})
      .then(() => res.json({ message: 'Reaction created and associated with thought' }))
      .catch((err) => res.status(400).json(err));
  },

  async deleteReaction(req, res) {
    try {
        // finds thought by id and removes reaction
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this ID!' });
      }

      res.json({ message: 'Reaction successfully deleted!', thought });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
