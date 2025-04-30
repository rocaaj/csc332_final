/**
 * api.js
 * ----------------------------------------------
 * Utility module for making API requests to the backend server.
 * Includes routes for:
 *  - Saving a workout (POST)
 *  - Fetching all saved workouts (GET)
 *  - Deleting a specific workout (DELETE)
 * 
 * Author: Dario Santiago Lopez
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca 
 * Date: April 11, 2025 
 * ----------------------------------------------
 */

// Save a new workout to the database
// Accepts a workout object with a name and exercises array
export const saveWorkout = async (workout) => {
    const res = await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Send cookies/session info
      body: JSON.stringify(workout),
    });
    return res.json(); // Returns the saved workout or error
  };
  
  // Fetch all saved workouts for the current user
  export const getWorkouts = async () => {
    const res = await fetch('/api/workouts', {
      method: 'GET',
      credentials: 'include', // Include session cookie
    });
    return res.json(); // Returns array of workout objects
  };
  
  // Delete a workout by ID
  export const deleteWorkout = async (id) => {
    const res = await fetch(`/api/workouts/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return res.json(); // Returns success or error
  };
  
