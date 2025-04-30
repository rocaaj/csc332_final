/**
 * Dashboard.jsx
 * ----------------------------------------------
 * Displays previously saved workouts from MongoDB.
 * Users can view and delete their workout templates.
 * 
 * Author: Dario Santiago Lopez
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca
 * Date: April 11, 2025
 * ----------------------------------------------
 */

import React, { useEffect, useState } from 'react';
import { getWorkouts, deleteWorkout } from '../utils/api';

const Dashboard = () => {
  const [workouts, setWorkouts] = useState([]);

  // Fetch workouts on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getWorkouts();
        setWorkouts(data);
      } catch (err) {
        console.error('Failed to fetch workouts:', err);
      }
    };

    fetchData();
  }, []);

  // Handle deleting a workout
  const handleDelete = async (id) => {
    try {
      await deleteWorkout(id);
      setWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (err) {
      console.error('Failed to delete workout:', err);
    }
  };

  return (
    <div style={{
      padding: '2rem',
      maxWidth: '600px',
      margin: 'auto',
      fontFamily: 'monospace'
    }}>
      <h2>📋 Saved Workouts</h2>

      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        workouts.map((workout) => (
          <div key={workout._id} style={{
            border: '1px solid #ccc',
            margin: '1rem 0',
            padding: '1rem',
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}>
            <h3>{workout.name}</h3>
            <ul>
              {workout.exercises.map((ex, i) => (
                <li key={i}>
                  {ex.name} — Work: {ex.work}s / Rest: {ex.rest}s
                </li>
              ))}
            </ul>
            <button onClick={() => handleDelete(workout._id)} style={{ marginTop: '0.5rem' }}>
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
