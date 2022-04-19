const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VotingStatusSchema = new Schema({
  isOpen: Boolean,
  dateChanged: Date,
  dateOpened: Date,
  dateClosed: Date
});

module.exports = mongoose.model('votingStatus', VotingStatusSchema);
