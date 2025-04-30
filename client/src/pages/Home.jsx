/**
 * Home.jsx
 * ----------------------------------------------
 * This is the root/main view that determines what to show:
 * - If a user is logged in → show Timer app
 * - If not → show Login/Register form
 * 
 * Author: Dario Santiago Lopez and ChatGPT 
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca 
 * Date: April 11, 2025 
 * ----------------------------------------------
 */

import React, { useState } from 'react';
import LoginRegister from './LoginRegister'; // Component for login/register
import Timer from './Timer';                 // Main workout timer app
import Dashboard from './Dashboard';         // Saved workouts list

const Home = () => {
  // Tracks logged-in username (null = not logged in)
  const [username, setUsername] = useState(null);

  // Tracks current view: 'timer' or 'dashboard'
  const [view, setView] = useState('timer');

  // If not logged in, show login/register form
  if (!username) {
    return <LoginRegister onLoginSuccess={setUsername} />;
  }

  return (
    <div>
      {/* Navigation Buttons */}
      <div style={{ textAlign: 'center', margin: '1rem' }}>
        {/* Switch to Timer View */}
        <button onClick={() => setView('timer')} style={{ marginRight: '1rem' }}>
          ⏱ Timer
        </button>

        {/* Switch to Dashboard View */}
        <button onClick={() => setView('dashboard')}>
          📋 Dashboard
        </button>
      </div>

      {/* Conditional rendering based on selected view */}
      {view === 'timer' ? (
        // Show workout timer page
        <Timer username={username} onLogout={() => setUsername(null)} />
      ) : (
        // Show saved workouts dashboard
        <Dashboard />
      )}
    </div>
  );
};

export default Home;
