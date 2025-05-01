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

// Public URL of your deployed backend API
const API_BASE = 'https://workout-docker-env.us-east-1.elasticbeanstalk.com';

// — AUTH —

// Log in a user
// Sends { username, password } and expects a session cookie
export const login = async (username, password) => {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',      // <— send + receive the session cookie
    body: JSON.stringify({ username, password }),
  });
  return res.json();            // { success: true, username } or { error: ... }
};

// Check if the user is already logged in (session exists)
export const checkSession = async () => {
  const res = await fetch(`${API_BASE}/api/auth/session`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) return null;
  const { username } = await res.json();
  return username;
};

// Log out the user
// Uses GET because your Express route is GET /api/auth/logout
export const logout = async () => {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: 'GET',               // <— switch from POST to GET
    credentials: 'include',
  });
  return res.ok;
};

// — WORKOUTS —

// Save a new workout
export const saveWorkout = async (workout) => {
  const res = await fetch(`${API_BASE}/api/workouts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(workout),
  });
  return res.json();
};

// Fetch all saved workouts
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
