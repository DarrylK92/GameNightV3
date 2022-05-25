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
    type: Date
  },
  closeDate: {
    type: Date
  },
  description: {
    type: String,
    required: true
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
    type: Number
  },
  amountVoted: {
    type: Number
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
