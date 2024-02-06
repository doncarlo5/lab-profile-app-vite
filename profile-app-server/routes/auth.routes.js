const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/User.model');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, campus, course } = req.body;

    if (!username || !password || !campus || !course) {
      res.status(400).json({ message: 'Please input all the fields' });
      return;
    }

    const userAlreadyExists = await User.findOne({ username });

    if (userAlreadyExists) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      campus,
      course,
    });
    res.status(201).json(newUser, { message: 'User created' });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: 'Please input all the fields' });
      return;
    }

    const existingUser = await User.findOne({ username }).select(
      'username password'
    );

    if (!existingUser) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.TOKEN_SECRET, {
      algorithm: 'HS256',
      expiresIn: '7d',
    });

    res.json({ authToken: token });
  } catch (error) {
    next(error);
  }
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  res.json(req.user);
});

module.exports = router;
