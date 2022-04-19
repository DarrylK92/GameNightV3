const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReasonSchema = new Schema({
  key: String,
  text: String
});

module.exports = mongoose.model('reason', ReasonSchema);
