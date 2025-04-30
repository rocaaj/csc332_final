/**
 * Timer.jsx
 * ----------------------------------------------
 * Component for managing and displaying a workout timer.
 * Includes:
 *  - Exercise/rest countdown logic
 *  - Start/Pause/Reset controls
 *  - Shake-to-skip using device motion
 *  - Logout functionality for authenticated users
 * 
 * Author: Dario Santiago Lopez and ChatGPT
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca
 * Date: April 11, 2025
 * ----------------------------------------------
 */

import React, { useEffect, useState, useRef } from 'react';
import ShakeHandler from '../components/ShakeHandler';
import WorkoutForm from '../components/WorkoutForm'; 
import { saveWorkout } from '../utils/api';

// Main workout timer component
const Timer = ({ username, onLogout }) => {
    // State variables
    const [workout, setWorkout] = useState(null);             // Holds the workout data from user input
    const [currentIndex, setCurrentIndex] = useState(0);      // Tracks which exercise is currently active
    const [isWorking, setIsWorking] = useState(true);         // Whether we're in work or rest phase
    const [timeLeft, setTimeLeft] = useState(0);              // Countdown timer in seconds
    const [isRunning, setIsRunning] = useState(false);        // Is the timer running?
    const [hasStarted, setHasStarted] = useState(false);      // Has the workout officially started?
  
    const timerRef = useRef(null); // Used to store the setInterval reference so we can clear it
  
    const currentExercise = workout?.[currentIndex];         // Current exercise object
    const nextExercise = workout?.[currentIndex + 1];        // Next exercise object (for preview)
  
    // Start countdown logic when timer is active
    useEffect(() => {
      if (!isRunning || !workout || currentIndex >= workout.length) return;
  
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(timerRef.current); // clean up
    }, [isRunning, currentIndex, isWorking, workout]);
  
    // Handle transition from work → rest → next exercise
    useEffect(() => {
      if (timeLeft > 0 || !isRunning || !workout) return;
  
      clearInterval(timerRef.current);
  
      if (isWorking) {
        // End of work → go to rest
        setIsWorking(false);
        setTimeLeft(currentExercise.rest);
      } else {
        // End of rest → go to next exercise or finish
        const nextIdx = currentIndex + 1;
        if (nextIdx < workout.length) {
          setCurrentIndex(nextIdx);
          setIsWorking(true);
          setTimeLeft(workout[nextIdx].work);
        } else {
          setIsRunning(false);
          alert('Workout Complete!');
        }
      }
    }, [timeLeft]);
  
    // Called when the user submits the workout form
const handleWorkoutSubmit = async (exercises) => {
    // Build a workout object to send to the backend
    const newWorkout = {
      name: `Workout - ${new Date().toLocaleString()}`, // give it a unique name
      exercises: exercises, // array of exercises from WorkoutForm
    };
  
    try {
      await saveWorkout(newWorkout); // Save workout to MongoDB via backend
      console.log('✅ Workout saved successfully');
    } catch (error) {
      console.error('❌ Failed to save workout:', error);
    }
  
    // Then set workout state and begin prep for countdown
    setWorkout(exercises);
    setCurrentIndex(0);
    setIsWorking(true);
    setTimeLeft(exercises[0].work);
    setHasStarted(false);
  };
  
    // Start the workout
    const handleStart = () => {
      setHasStarted(true);
      setIsRunning(true);
    };
  
    // Toggle pause and resume
    const handlePauseResume = () => {
      setIsRunning((prev) => !prev);
    };
  
    // Reset workout to the beginning
    const handleReset = () => {
      clearInterval(timerRef.current);
      if (workout?.length) {
        setCurrentIndex(0);
        setIsWorking(true);
        setTimeLeft(workout[0].work);
      }
      setIsRunning(false);
      setHasStarted(false);
    };
  
    // Skip current phase using shake gesture
    const handleShake = () => {
      if (!isRunning) return;
      console.log('Shake detected — skipping!');
      clearInterval(timerRef.current);
      setTimeLeft(0); // Triggers transition immediately
    };
  
    // Logout the user and clear session
    const handleLogout = async () => {
      await fetch('/api/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      onLogout(); // Call parent's logout handler (clears username in Home.jsx)
    };
  
    return (
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'monospace',
        backgroundColor: '#fff',
        borderRadius: '12px',
        margin: '1rem auto',
        maxWidth: '500px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.08)'
      }}>
        {/* Top bar with username and logout button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <span style={{ fontWeight: 'bold' }}>👋 Welcome, {username}</span>
          <button onClick={handleLogout}>🚪 Logout</button>
        </div>
  
        <h1>Workout Timer</h1>
  
        {/* If no workout is loaded yet, show the form */}
        {!workout ? (
          <WorkoutForm onSubmit={handleWorkoutSubmit} />
        ) : !hasStarted ? (
          // If workout is loaded but not started
          <>
            <h2>Ready to go!</h2>
            <button onClick={handleStart} style={{ fontSize: '1.5rem' }}>
              ▶️ Start Workout
            </button>
          </>
        ) : currentIndex < workout.length ? (
          // While the workout is in progress
          <>
            <h2>{isWorking ? '🏋️ Work' : '😌 Rest'}</h2>
            <h3>{currentExercise.name}</h3>
  
            <div style={{ fontSize: '4rem', margin: '1rem 0', color: isWorking ? '#28a745' : '#ffc107' }}>
              {timeLeft}s
            </div>
  
            {nextExercise && (
              <p>🔜 Next: {nextExercise.name}</p>
            )}
  
            <button onClick={handlePauseResume} style={{ margin: '0.5rem' }}>
              {isRunning ? '⏸ Pause' : '▶️ Resume'}
            </button>
            <button onClick={handleReset} style={{ margin: '0.5rem' }}>
              🔁 Reset
            </button>
          </>
        ) : (
          // When workout is finished
          <h2>🎉 Done! Great job!</h2>
        )}
  
        {/* Hidden component that listens for shake gestures */}
        <ShakeHandler onShake={handleShake} />
      </div>
    );
  };
  
  export default Timer;
