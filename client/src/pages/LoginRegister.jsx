/**
 * LoginRegister.jsx
 * ----------------------------------------------
 * Page for user registration and login.
 * Uses api.js helpers for auth requests.
 *
 * Author: Dario Santiago Lopez and ChatGPT
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca
 * Date: April 11, 2025 (Updated: 4/30/25)
 * ----------------------------------------------
 */

import React, { useState } from 'react';
import { login, register } from '../utils/api';  // ← import our API helpers

const LoginRegister = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [error, setError] = useState('');

  // Unified handler for login or register
  const handleAuth = async () => {
    setError(''); // clear previous errors

    // Call the appropriate helper
    const data = isRegisterMode
      ? await register(username, password)
      : await login(username, password);

    if (data.success) {
      // Notify parent of successful login
      onLoginSuccess(data.username);
    } else {
      // Show returned error message
      setError(data.error || 'Authentication failed.');
    }
  };

  return (
    <div style={{
      padding: '2rem',
      textAlign: 'center',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#fff',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h2>{isRegisterMode ? 'Register' : 'Login'}</h2>

      {/* Username input */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ margin: '0.5rem', padding: '0.5rem', width: '100%' }}
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ margin: '0.5rem', padding: '0.5rem', width: '100%' }}
      />

      {/* Display errors */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Submit button */}
      <button onClick={handleAuth} style={{ width: '100%', marginTop: '1rem' }}>
        {isRegisterMode ? 'Create Account' : 'Log In'}
      </button>

      {/* Toggle link */}
      <p style={{ marginTop: '1rem' }}>
        {isRegisterMode ? 'Already have an account?' : 'New user?'}{' '}
        <button
          onClick={() => {
            setIsRegisterMode(!isRegisterMode);
            setError('');
          }}
          style={{ border: 'none', background: 'none', color: '#007bff', cursor: 'pointer' }}
        >
          {isRegisterMode ? 'Login' : 'Register'}
        </button>
      </p>
    </div>
  );
};

export default LoginRegister;
