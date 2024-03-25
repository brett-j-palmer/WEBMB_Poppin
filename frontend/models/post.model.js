const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    file: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 10
    },
    tag: {
      type: String,
      required: true
    }
  }, {
    timestamps: true,
  });
  
  const Post = mongoose.model('Post', postSchema);
  
  module.exports = Post;

