// authRoutes.js
// This file defines the authentication routes for the application.
// It includes routes for user registration, login, and logout.
// It uses Express.js for routing and Passport.js for authentication.
// It also includes error handling for user registration and login.
// It uses bcrypt for password hashing and validation.
// It exports the router to be used in the main application file.


const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// @route   POST /api/auth/login
// @desc    Log in user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: info.message });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ message: 'Logged in successfully', user: { username: user.username } });
    });
  })(req, res, next);
});

// @route   GET /api/auth/logout
// @desc    Log out user
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
