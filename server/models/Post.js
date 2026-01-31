const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
  slug: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date
  },
  updated: {
    type: Date
  },
  visible: {
    type: Boolean,
    default: true 
  }
});

module.exports = mongoose.model('Post', PostSchema);