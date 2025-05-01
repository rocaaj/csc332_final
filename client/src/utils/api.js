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

// Public URL of your deployed backend API (update if needed)
const API_BASE = 'https://workout-docker-env.us-east-1.elasticbeanstalk.com';

// Save a new workout to the database
// Accepts a workout object with a name and exercises array
export const saveWorkout = async (workout) => {
  const res = await fetch(`${API_BASE}/api/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(workout),
  });
  return res.json();
};

// Fetch all saved workouts for the current user
export const getWorkouts = async () => {
  const res = await fetch(`${API_BASE}/api/workouts`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
};

// Delete a workout by ID
export const deleteWorkout = async (id) => {
  const res = await fetch(`${API_BASE}/api/workouts/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  return res.json();
};

// Check if the user is already logged in (session exists)
export const checkSession = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/session`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.username || null;
  } catch (err) {
    console.error('Session check failed:', err);
    return null;
  }
};

// Log out the user
export const logout = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    return res.ok;
  } catch (err) {
    console.error('Logout failed:', err);
    return false;
  }
};
