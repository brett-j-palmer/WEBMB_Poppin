const router = require('express').Router();
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');

router.route('/add').post((req, res) => {
  const { postId, commentText, user } = req.body;

  if (!postId || !commentText) {
    return res.status(400).json('Post ID and comment text are required.');
  }

  const newComment = new Comment({ postId, commentText, user});
  newComment.save()
    // .then(comment => {
    //   Post.findById(postId)
    //     .then(post => {
    //       if (!post) {
    //         return res.status(404).json('Post not found.');
    //       }
    //       post.comments.push(comment._id);
    //       post.save()
    //         .then(() => res.json('Comment added to post!'))
    //         .catch(err => res.status(400).json('Error: ' + err));
    //     })
    //     .catch(err => res.status(400).json('Error: ' + err));
    // })
    .catch(err => res.status(400).json('Error com: ' + err));
});

router.route('/byPostId/:postId').get((req, res) => {
    const postId = req.params.postId;
  
    Comment.find({ postId })
      .then(comments => res.json(comments))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;