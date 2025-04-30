// Workout.js
// This file defines the Workout model for the application.
// It uses Mongoose to define the schema and model for workout data.
// The Workout model includes fields for user ID, workout name, exercises, and creation date.
// It also includes validation for required fields and default values.


const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    default: 'My Workout'
  },
  exercises: [
    {
      name: {
        type: String,
        required: true
      },
      workDuration: {
        type: Number, // in seconds
        required: true
      },
      restDuration: {
        type: Number, // in seconds
        required: true
      },
      sets: {
        type: Number,
        default: 1
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Workout', WorkoutSchema);
