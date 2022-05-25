const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: 'game' },
  user: { type: Schema.Types.ObjectId, ref: 'user' }
});

module.exports = mongoose.model('vote', VoteSchema);
