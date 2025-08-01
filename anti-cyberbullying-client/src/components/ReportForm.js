// src/components/ReportForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './ReportForm.css';

const ReportForm = ({ onReportSubmitted }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(false);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://anti-cyberbullying-network.onrender.com/api/reports',
        { title, type, description, anonymous },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage(response.data.message || 'Report submitted successfully!');
      setError(false);

      setTitle('');
      setType('');
      setDescription('');
      setAnonymous(true);

      if (onReportSubmitted) {
        onReportSubmitted();
      }
    } catch (error) {
      setError(true);
      setMessage(
        error.response?.data?.message ||
          'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="report-form-container dark-theme">
      <h2 className="report-title">Submit Anonymous Report</h2>
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="report-input"
            placeholder="Enter title"
          />
        </div>

        <div className="form-group">
          <label>Type:</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="report-input"
            placeholder="e.g., Harassment, Threat, etc."
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="report-textarea"
            placeholder="Describe the incident in detail..."
            rows={6}
          />
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Submit Anonymously
          </label>
        </div>

        <button type="submit" className="submit-btn">Submit Report</button>
      </form>

      {message && (
        <p className={error ? 'message error' : 'message success'}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ReportForm;
