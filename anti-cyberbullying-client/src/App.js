// src/App.js
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [message, setMessage] = useState('');

  // Check localStorage on load
  useEffect(() => {
    const storedUser = localStorage.getItem('userEmail');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, []);

  const handleLogin = (email, token) => {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('token', token);
    setUser(email);
    setToken(token);
    setMessage('');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    setMessage('You have been logged out.');
  };

  return (
    <Router>
      <div className="container">
        <header className="header">
          <h1>🛡️ Anti-Cyberbullying Student Network</h1>
        </header>

        {user && (
          <div className="user-info">
            <p>Welcome, <strong>{user}</strong>!</p>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {message && <div className="message">{message}</div>}

        <Routes>
          <Route path="/" element={<Navigate to={user ? "/dashboard" : "/register"} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={token ? <DashboardPage /> : <Navigate to="/login" />}
          />
        </Routes>

        {!user && (
          <div className="switch-buttons">
            <SwitchButtons />
          </div>
        )}
      </div>
    </Router>
  );
}

function SwitchButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {path === '/login' ? (
        <p>
          Don’t have an account?{' '}
          <button onClick={() => navigate('/register')}>Register</button>
        </p>
      ) : path === '/register' ? (
        <p>
          Already registered?{' '}
          <button onClick={() => navigate('/login')}>Login</button>
        </p>
      ) : null}
    </>
  );
}

export default App;
