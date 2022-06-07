const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  autoCloseDate: {
    type: Date,
    default: null
  },
  closeDate: {
    type: Date,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: true
  },
  games: [
    {
      game: {
        type: Schema.Types.ObjectId,
        ref: 'game'
      }
    }
  ],
  votes: [
    {
      vote: {
        type: Schema.Types.ObjectId,
        ref: 'vote'
      }
    }
  ],
  amountOfVotes: {
    type: Number,
    default: 0
  },
  amountVoted: {
    type: Number,
    default: 0
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'game'
  },
  winReason: {
    type: Schema.Types.ObjectId,
    ref: 'reason'
  }
});

module.exports = mongoose.model('event', EventSchema);
