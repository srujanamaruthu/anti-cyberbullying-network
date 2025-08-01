// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setMessage("");

    try {
      const res = await fetch("https://anti-cyberbullying-network.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("Registration successful! Redirecting...");
      setError(false);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.message || "An error occurred. Please try again.");
      setError(true);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card animate">
        <h1 className="auth-logo">🛡️</h1>
        <h2 className="auth-title">Register</h2>

        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              type={showPwd ? "text" : "password"}
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
              {showPwd ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" className="submit-btn">Register</button>

          {message && (
            <p className={error ? "auth-message error" : "auth-message success"}>
              {message}
            </p>
          )}
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
