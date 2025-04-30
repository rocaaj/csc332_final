/**
 * WorkoutForm.jsx
 * ----------------------------------------------
 * Component for entering custom workout routines.
 * Allows users to:
 *  - Input exercise name, work time, and rest time
 *  - Add multiple exercises to a list
 *  - Preview the list before submitting
 *  - Submit to parent component (e.g. Timer.jsx)
 * 
 * Author: Dario Santiago Lopez and ChatGPT
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca
 * Date: April 11, 2025
 * ----------------------------------------------
 */

import React, { useState } from 'react';

const WorkoutForm = ({ onSubmit }) => {
  // Form state
  const [exerciseName, setExerciseName] = useState('');
  const [workDuration, setWorkDuration] = useState('');
  const [restDuration, setRestDuration] = useState('');
  const [exercises, setExercises] = useState([]);

  // Add new exercise to the list
  const handleAddExercise = () => {
    if (!exerciseName || !workDuration || !restDuration) return;

    const newExercise = {
      name: exerciseName,
      work: parseInt(workDuration),
      rest: parseInt(restDuration),
    };

    setExercises([...exercises, newExercise]);
    setExerciseName('');
    setWorkDuration('');
    setRestDuration('');
  };

  // Clear all exercises from list
  const handleClear = () => {
    setExercises([]);
  };

  // Submit workout list to parent component
  const handleSubmit = () => {
    if (exercises.length === 0) return;
    onSubmit(exercises);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', margin: '1rem' }}>
      <h2>Create Your Workout</h2>

      {/* Inputs for exercise name, work time, and rest time */}
      <input
        type="text"
        placeholder="Exercise name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
        style={{ margin: '0.5rem' }}
      />

      <input
        type="number"
        placeholder="Work (sec)"
        value={workDuration}
        onChange={(e) => setWorkDuration(e.target.value)}
        style={{ margin: '0.5rem' }}
      />

      <input
        type="number"
        placeholder="Rest (sec)"
        value={restDuration}
        onChange={(e) => setRestDuration(e.target.value)}
        style={{ margin: '0.5rem' }}
      />

      {/* Add & clear buttons */}
      <div style={{ margin: '0.5rem' }}>
        <button onClick={handleAddExercise} style={{ marginRight: '0.5rem' }}>
          ➕ Add Exercise
        </button>
        <button onClick={handleClear}>🧹 Clear All</button>
      </div>

      {/* Preview added exercises */}
      <h3>Preview:</h3>
      <ul>
        {exercises.map((ex, index) => (
          <li key={index}>
            {ex.name} — Work: {ex.work}s / Rest: {ex.rest}s
          </li>
        ))}
      </ul>

      {/* Submit workout button */}
      <button onClick={handleSubmit} disabled={exercises.length === 0}>
        ✅ Start Workout
      </button>
    </div>
  );
};

export default WorkoutForm;
