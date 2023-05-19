import * as mongoose from 'mongoose';

export const StuSchema = new mongoose.Schema({
  stuNo: String,
  name: String,
  score1: Boolean,
  score2: Boolean,
  score3: Boolean,
  score: Number,
  team: String,
});

// module.exports = mongoose.model('StuRecord', StuSchema, 'StuRecord');
