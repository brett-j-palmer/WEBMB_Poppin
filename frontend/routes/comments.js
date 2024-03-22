const router = require('express').Router();
let Post = require('../models/post.model');
let Comment = require('../models/comment.model');

router.route('/:postId/comments/add').post((req, res) => {
    const { text } = req.body;
    const postId = req.params.postId;


    const newComment = new Comment({ text });

    newComment.save()
        .then(comment => {
           
            Post.findById(postId)
                .then(post => {
                    post.comments.push(comment._id);
                   
                    post.save()
                        .then(() => res.json('Comment added to post!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
