// User.js
// This file defines the User model for the application.
// It uses Mongoose to define the schema and model for user data.
// The User model includes fields for username and password hash.
// It also includes validation for required fields and unique usernames.


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
