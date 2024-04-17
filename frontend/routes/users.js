const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/add').post(async (req, res) => {
  const { username, password } = req.body;
  const defaultBio = "This is a default bio.";
  const liked_posts = [];
  const created_posts = [];

  try {
    const existingUser = await User.findOne({ username: username.trim() });
    if (existingUser) {
      return res.status(409).json({ message: 'Username is already taken' }); 
    }

    const newUser = new User({ username, password, bio: defaultBio, liked_posts, created_posts });
    await newUser.save();
    res.json({ message: 'User added!' }); 
  } catch (err) {
    res.status(400).json({ message: 'Error: ' + err }); 
  }
});


router.route('/:id').put((req, res) => {
  const userId = req.params.id;
  const newData = req.body;

  User.findByIdAndUpdate(userId, newData, { new: true })
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

router.patch('/updateBio/:username', async (req, res) => {
  const { username } = req.params;
  const { bio } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({ username: username }, { bio: bio }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'Bio updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user bio', error });
  }
});

module.exports = router;
