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
 * Date: April 11, 2025 (Updated: 4/30/25)
 * ----------------------------------------------
 */

import React, { useEffect, useState, useRef } from 'react';
import ShakeHandler from '../components/ShakeHandler';
import WorkoutForm from '../components/WorkoutForm'; 
import { saveWorkout, logout } from '../utils/api';

const Timer = ({ username, onLogout }) => {
    // State variables
    const [workout, setWorkout] = useState(null);             // Holds the workout data
    const [currentIndex, setCurrentIndex] = useState(0);      // Tracks current exercise index
    const [isWorking, setIsWorking] = useState(true);         // Work vs rest phase
    const [timeLeft, setTimeLeft] = useState(0);              // Countdown in seconds
    const [isRunning, setIsRunning] = useState(false);        // Timer running?
    const [hasStarted, setHasStarted] = useState(false);      // Workout started?

    const timerRef = useRef(null);

    const currentExercise = workout?.[currentIndex];
    const nextExercise = workout?.[currentIndex + 1];

    // Start countdown logic when timer is active
    useEffect(() => {
        if (!isRunning || !workout || currentIndex >= workout.length) return;

        // Immediately decrement once so the timer updates without waiting 1s
        setTimeLeft(prev => prev - 1);

        // Then kick off the regular 1s interval
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isRunning, currentIndex, isWorking, workout]);

    // Handle transition from work → rest → next exercise
    useEffect(() => {
        if (timeLeft > 0 || !isRunning || !workout) return;

        // Stop current interval before switching
        clearInterval(timerRef.current);

        if (isWorking) {
            // Work → Rest
            setIsWorking(false);
            setTimeLeft(currentExercise.rest);
        } else {
            // Rest → Next exercise or finish
            const nextIdx = currentIndex + 1;
            if (nextIdx < workout.length) {
                setCurrentIndex(nextIdx);
                setIsWorking(true);
                setTimeLeft(workout[nextIdx].work);
            } else {
                setIsRunning(false);
                alert('Workout Complete!');
                return;  // no new interval
            }
        }

        // Immediately fire the next tick for the new phase
        setTimeLeft(prev => prev - 1);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);
    }, [timeLeft]);

    // Called when the user submits the workout form
    const handleWorkoutSubmit = async (exercises) => {
        const newWorkout = {
            name: `Workout - ${new Date().toLocaleString()}`,
            exercises: exercises,
        };

        try {
            await saveWorkout(newWorkout);
            console.log('✅ Workout saved successfully');
        } catch (error) {
            console.error('❌ Failed to save workout:', error);
        }

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
        setIsRunning(prev => !prev);
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
        setTimeLeft(0);
    };

    // Logout the user via our api.js helper, then notify parent
    const handleLogout = async () => {
        try {
            const ok = await logout();
            if (ok) {
                onLogout();
            } else {
                console.error('Logout failed');
            }
        } catch (err) {
            console.error('Logout error:', err);
        }
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

            {!workout ? (
                <WorkoutForm onSubmit={handleWorkoutSubmit} />
            ) : !hasStarted ? (
                <>
                    <h2>Ready to go!</h2>
                    <button onClick={handleStart} style={{ fontSize: '1.5rem' }}>
                        ▶️ Start Workout
                    </button>
                </>
            ) : currentIndex < workout.length ? (
                <>
                    <h2>{isWorking ? '🏋️ Work' : '😌 Rest'}</h2>
                    <h3>{currentExercise.name}</h3>

                    <div style={{ fontSize: '4rem', margin: '1rem 0', color: isWorking ? '#28a745' : '#ffc107' }}>
                        {timeLeft}s
                    </div>

                    {nextExercise && <p>🔜 Next: {nextExercise.name}</p>}

                    <button onClick={handlePauseResume} style={{ margin: '0.5rem' }}>
                        {isRunning ? '⏸ Pause' : '▶️ Resume'}
                    </button>
                    <button onClick={handleReset} style={{ margin: '0.5rem' }}>
                        🔁 Reset
                    </button>
                </>
            ) : (
                <h2>🎉 Done! Great job!</h2>
            )}

            {/* Hidden component that listens for shake gestures */}
            <ShakeHandler onShake={handleShake} />
        </div>
    );
};

export default Timer;
