const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const VisitSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  ip: {
    type: String
  },
  userAgent: {
    type: String
  },
  referrer: {
    type: String
  }
});

module.exports = mongoose.model('Visit', VisitSchema);