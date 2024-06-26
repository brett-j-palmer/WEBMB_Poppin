const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
    Post.find()
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const { username, file, caption, rating, tag } = req.body;

    const newPost = new Post({ username, file, caption, rating, tag });

    newPost.save()
      .then((post) => res.json({ postId: post._id }))
      .catch(err => res.status(400).json('Error 1: ' + err));
});
router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => res.json('Post deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;