const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

async function isAuthenticated(req, res, next) {
  try {
    const authorizationHeaders = req.headers.authorization;

    if (!authorizationHeaders) {
      return res
        .status(400)
        .json({ message: 'Authorization header is required' });
    }

    const token = authorizationHeaders.replace('Bearer ', '');

    const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
      algorithms: ['HS256'],
    });

    console.log(payload);

    const user = await User.findById(payload.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = isAuthenticated;
