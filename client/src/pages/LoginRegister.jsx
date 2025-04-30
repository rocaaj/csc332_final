/**
 * LoginRegister.jsx
 * ----------------------------------------------
 * Page for user registration and login.
 * Connects to backend auth routes via fetch.
 * 
 * Author: Dario Santiago Lopez and ChatGPT 
 * Course: CSC 332 - Mobile & Pervasive Computing
 * Partner: Anthony Roca 
 * Date: April 11, 2025 
 * ----------------------------------------------
 */

import React, { useState } from 'react';

// LoginRegister component for user authentication
const LoginRegister = ({ onLoginSuccess }) => {
    // State for input fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    // Toggle between register and login mode
    const [isRegisterMode, setIsRegisterMode] = useState(false);
  
    // Error message display
    const [error, setError] = useState('');
  
    // Function to send login/register request to backend
    const handleAuth = async () => {
      const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
  
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // allow cookies/session to work
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        onLoginSuccess(username); // tell parent we logged in
      } else {
        setError(data.message || 'Something went wrong.');
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
          onChange={(e) => setUsername(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '100%' }}
        />
  
        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '0.5rem', padding: '0.5rem', width: '100%' }}
        />
  
        {/* Display error if login/register fails */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
  
        {/* Submit button */}
        <button onClick={handleAuth} style={{ width: '100%', marginTop: '1rem' }}>
          {isRegisterMode ? 'Create Account' : 'Log In'}
        </button>
  
        {/* Toggle between register and login */}
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
