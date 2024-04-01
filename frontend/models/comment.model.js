const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: false
    },
    user: {
        type: String,
        required: false
    },
    commentText: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
