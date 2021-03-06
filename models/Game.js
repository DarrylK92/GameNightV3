const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: String,
  isEnabled: Boolean,
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('game', GameSchema);
