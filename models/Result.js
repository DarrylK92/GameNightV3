const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  winnerGameId: { type: Schema.Types.ObjectId, ref: 'game' },
  reasonId: { type: Schema.Types.ObjectId, ref: 'reason' },
  dateResult: Date
});
