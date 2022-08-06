const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: String,
  isEnabled: Boolean,
  initialIsEnabled: {
    type: Boolean,
    default: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

module.exports = mongoose.model('game', GameSchema);
