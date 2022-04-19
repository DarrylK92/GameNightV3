const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  voteDate: Date,
  gameId: { type: Schema.Types.ObjectId, ref: 'game' },
  userId: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('vote', VoteSchema);
