/**
 * Home.jsx
 * ----------------------------------------------
 * This is the root/main view that determines what to show:
 * - If a user is logged in → show Timer app or Dashboard
 * - If not → show Login/Register form
 * - Checks session persistence on initial load
 * 
 * Author: Dario Santiago Lopez and ChatGPT 
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca 
 * Date: April 11, 2025 
 * ----------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import LoginRegister from './LoginRegister';
import Timer from './Timer';
import Dashboard from './Dashboard';
import { checkSession, logout } from '../utils/api';

const Home = () => {
  // Tracks logged-in username (null = not logged in)
  const [username, setUsername] = useState(null);

  // Tracks current view: 'timer' or 'dashboard'
  const [view, setView] = useState('timer');

  // Check session on first load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await checkSession();
        if (user && user.username) {
          setUsername(user.username);
        }
      } catch (err) {
        console.log('No active session');
      }
    };
    checkAuth();
  }, []);

  // Handle logout and force re-login
  const handleLogout = async () => {
    await logout();
    setUsername(null); // Triggers login screen
  };

  // If not logged in, show login/register
  if (!username) {
    return <LoginRegister onLoginSuccess={setUsername} />;
  }

  return (
    <div>
      {/* Navigation buttons */}
      <div style={{ textAlign: 'center', margin: '1rem' }}>
        {/* Switch to Timer View */}
        <button onClick={() => setView('timer')} style={{ marginRight: '1rem' }}>
          ⏱ Timer
        </button>
        <button onClick={() => setView('dashboard')} style={{ marginRight: '1rem' }}>
          📋 Dashboard
        </button>
        <button onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Render view */}
      {view === 'timer' ? (
        <Timer username={username} onLogout={handleLogout} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Home;
