const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const defaultBio = "This is a default bio.";
  const liked_posts = [];
  const created_posts = [];
  const followed_users = [];

  const newUser = new User({ username, password, bio: defaultBio, liked_posts, created_posts, followed_users });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  const userId = req.params.id;
  const { liked_posts, followed_users } = req.body;

  User.findByIdAndUpdate(userId, { liked_posts, followed_users }, { new: true })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User updated successfully', user });
    })
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

router.route('/username/:username').get((req, res) => {
  const username = req.params.username;

  User.findOne({ username })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    })
    .catch(err => res.status(400).json({ message: 'Error: ' + err }));
});

router.route('/login').post(async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
