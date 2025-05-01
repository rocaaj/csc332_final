/**
 * api.js
 * ----------------------------------------------
 * Utility module for making API requests to the backend server.
 * All requests are prefixed with the API_BASE URL.
 *
 * Author: Dario Santiago Lopez
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca
 * Date: April 11, 2025
 * ----------------------------------------------
 */

// The public URL of your deployed backend API
// Change this to match your Elastic Beanstalk CNAME:
const API_BASE = 'https://workout-docker-env.us-east-1.elasticbeanstalk.com';

// Save a new workout to the database
// Accepts a workout object with a name and exercises array
export const saveWorkout = async (workout) => {
  const res = await fetch(`${API_BASE}/api/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Send cookies/session info
    body: JSON.stringify(workout),
  });
  return res.json(); // Returns the saved workout or error
};

// Fetch all saved workouts for the current user
export const getWorkouts = async () => {
  const res = await fetch(`${API_BASE}/api/workouts`, {
    method: 'GET',
    credentials: 'include', // Include session cookie
  });
  return res.json(); // Returns array of workout objects
};

// Delete a workout by ID
export const deleteWorkout = async (id) => {
  const res = await fetch(`${API_BASE}/api/workouts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json(); // Returns success or error
};
