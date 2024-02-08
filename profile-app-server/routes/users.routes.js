const router = require('express').Router();
const User = require('../models/User.model');
const isAuthenticated = require('../middlewares/isAuthenticated');

// Update user's image
router.put('/users', isAuthenticated, async (req, res, next) => {
  try {
    const { image } = req.body;

    const user = await User.findByIdAndUpdate(
      req.body.id,
      { image },
      { new: true }
    );

    // Send back the updated user object
    res.json(user);
  } catch (error) {
    next(error);
  }
});

// Fetch information about all users
router.get('/users', isAuthenticated, async (req, res, next) => {
  try {
    const users = await User.find().select('username campus course image');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// Handle file upload
router.post('/upload', isAuthenticated, async (req, res, next) => {
  try {
    // Handle file upload logic here
    // This could involve saving the file to disk or cloud storage
    // Once the file is uploaded, return the URL of the uploaded image
    res.json({ imageUrl: 'URL_OF_UPLOADED_IMAGE' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
