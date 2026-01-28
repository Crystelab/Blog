const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PictureSchema = new Schema({
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
  image: {
        data: {
        type: Buffer,
        required: true
        },
        contentType: {
        type: String,
        required: true,
        default: 'image/jpeg'
        }
    }
});

module.exports = mongoose.model('Picture', PictureSchema);