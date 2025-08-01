// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('https://anti-cyberbullying-network.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error('Login error response:', data); // Debugging
        throw new Error(data.message || 'An error occurred during login. Please try again.');
      }

      // Store token and email
      localStorage.setItem('token', data.token);
      localStorage.setItem('userEmail', email);

      // Call login handler
      onLogin(email, data.token);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      console.error('Login exception:', err); // Optional: Log to console
      setError(err.message || 'An unknown error occurred.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate">
        <h1 className="auth-logo">🛡️</h1>
        <h2 className="auth-title">Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-wrapper">
            <input
              type={showPwd ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="toggle-btn"
            >
              {showPwd ? 'Hide' : 'Show'}
            </button>
          </div>

          <button type="submit" className="submit-btn">Login</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
