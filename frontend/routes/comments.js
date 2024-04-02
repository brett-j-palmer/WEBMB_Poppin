const router = require('express').Router();
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

router.route('/add').post((req, res) => {
  const { postId, commentText, user } = req.body;
  if (!postId || !commentText) {
    return res.status(400).json('Post ID and comment text are required.');
  }
  const newComment = new Comment({ postId, commentText, user });
  newComment.save()
    .then(() => res.json('Comment added successfully'))
    .catch(err => res.status(400).json('Error com: ' + err));
});


router.route('/byPostId/:postId').get((req, res) => {
  const postId = req.params.postId;
  Comment.find({ postId })
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/:id').delete(async (req, res) => {
  try {
    const commentId = req.params.id;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;