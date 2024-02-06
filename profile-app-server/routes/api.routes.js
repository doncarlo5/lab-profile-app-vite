const router = require('express').Router();
const User = require('../models/User.model');

router.put('/users', isAuthenticated, async (req, res, next) => {
  try {
    const { image } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { image },
      { new: true }
    );
  } catch (error) {
    next(error);
  }
});

router.get('/users', isAuthenticated, async (req, res, next) => {
  try {
    const users = await User.find().select('username campus course image');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post('/upload', isAuthenticated, async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
});

module.exports = router;
