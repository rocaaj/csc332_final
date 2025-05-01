/**
 * WorkoutForm.jsx
 * ----------------------------------------------
 * Component for entering custom workout routines.
 * Allows users to:
 *  - Input exercise name, work time, rest time, and sets
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
  // Form state for inputs
  const [exerciseName, setExerciseName] = useState('');
  const [workDuration, setWorkDuration] = useState('');
  const [restDuration, setRestDuration] = useState('');
  const [sets, setSets] = useState('');
  const [exercises, setExercises] = useState([]);

  // Add new exercise to workout plan
  const handleAddExercise = () => {
    if (!exerciseName || !workDuration || !restDuration || !sets) return;

    const newExercise = {
      name: exerciseName,
      work: parseInt(workDuration),
      rest: parseInt(restDuration),
      sets: parseInt(sets),
    };

    setExercises([...exercises, newExercise]);

    // Reset form inputs
    setExerciseName('');
    setWorkDuration('');
    setRestDuration('');
    setSets('');
  };

  // Clear the current exercise list
  const handleClear = () => {
    setExercises([]);
  };

  // Send exercise list to parent component
  const handleSubmit = () => {
    if (exercises.length === 0) return;
    onSubmit(exercises);
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', margin: '1rem' }}>
      <h2>Create Your Workout</h2>

      {/* Input: Exercise Name */}
      <input
        type="text"
        placeholder="Exercise name"
        value={exerciseName}
        onChange={(e) => setExerciseName(e.target.value)}
        style={{ margin: '0.5rem' }}
      />

      {/* Input: Work Duration */}
      <input
        type="number"
        placeholder="Work (sec)"
        value={workDuration}
        onChange={(e) => setWorkDuration(e.target.value)}
        style={{ margin: '0.5rem' }}
      />

      {/* Input: Rest Duration */}
      <input
        type="number"
        placeholder="Rest (sec)"
        value={restDuration}
        onChange={(e) => setRestDuration(e.target.value)}
        style={{ margin: '0.5rem' }}
      />

      {/* Input: Sets */}
      <input
        type="number"
        placeholder="Sets"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
        style={{ margin: '0.5rem' }}
      />

      {/* Buttons: Add & Clear */}
      <div style={{ margin: '0.5rem' }}>
        <button onClick={handleAddExercise} style={{ marginRight: '0.5rem' }}>
          ➕ Add Exercise
        </button>
        <button onClick={handleClear}>🧹 Clear All</button>
      </div>

      {/* Preview list of exercises */}
      <h3>Preview:</h3>
      <ul>
        {exercises.map((ex, index) => (
          <li key={index}>
            {ex.name} — Work: {ex.work}s / Rest: {ex.rest}s / Sets: {ex.sets}
          </li>
        ))}
      </ul>

      {/* Submit button */}
      <button onClick={handleSubmit} disabled={exercises.length === 0}>
        ✅ Start Workout
      </button>
    </div>
  );
};

export default WorkoutForm;
