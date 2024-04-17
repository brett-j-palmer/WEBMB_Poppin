const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  liked_posts:{
    type: Array,
    required: true
  },
  created_posts:{
    type: Array,
    required: true
  },
  followed_users:{
    type: Array,
    required: true
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
