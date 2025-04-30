// workoutRoutes.js
// This file defines the routes for managing workouts.
// It includes routes for getting all workouts, creating a new workout, and deleting a workout.
// It uses Express.js for routing and Mongoose for database operations.
// It also includes middleware for authentication to ensure that only logged-in users can access the routes.
// It exports the router to be used in the main application file.


const express = require('express');
const Workout = require('../models/Workout');
const ensureAuth = require('../middleware/ensureAuth');

const router = express.Router();

// @route   GET /api/workouts
// @desc    Get all workouts for logged-in user
router.get('/', ensureAuth, async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get workouts' });
  }
});

// @route   POST /api/workouts
// @desc    Create a new workout
router.post('/', ensureAuth, async (req, res) => {
  try {
    const { name, exercises } = req.body;
    const newWorkout = new Workout({
      userId: req.user._id,
      name,
      exercises
    });

    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create workout' });
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete a workout
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.json({ message: 'Workout deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete workout' });
  }
});

module.exports = router;
