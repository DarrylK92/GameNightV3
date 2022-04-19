const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: String,
  isEnabled: Boolean
});

module.exports = mongoose.model('game', GameSchema);
