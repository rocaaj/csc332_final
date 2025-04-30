// server.js
// This is the main entry point of the application.
// It sets up the Express server, connects to the MongoDB database, and defines the API routes.
// It also handles CORS and JSON parsing for incoming requests.

// Load environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// Import DB connection and route handlers
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({ origin: 'http://localhost:3000', credentials: true })); // Adjust origin for frontend
app.use(helmet()); // Set secure headers
app.use(morgan('dev')); // Log requests

// Session setup (required for Passport)
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: false,
  })
);

// Passport.js setup
require('./middleware/passportConfig')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Workout Timer API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
