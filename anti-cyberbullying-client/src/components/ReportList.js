import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReportList.css'; // Optional, include styles if you have

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token'); // optional, based on your backend
        const response = await axios.get('https://anti-cyberbullying-backend.onrender.com/api/reports', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReports(response.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
        setError('Failed to load reports. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container">
      <h1 className="heading">Submitted Reports</h1>

      {loading ? (
        <p className="loading">Loading reports...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : reports.length === 0 ? (
        <p className="no-reports">No reports yet.</p>
      ) : (
        <div className="report-list">
          {reports.map((report) => (
            <div className="report-card" key={report._id}>
              <h2>{report.title}</h2>
              <p><strong>Description:</strong> {report.description}</p>
              <p><strong>Type:</strong> {report.type}</p>
              <p><strong>Anonymous:</strong> {report.anonymous ? 'Yes' : 'No'}</p>
              <p className="timestamp">
                <strong>Submitted on:</strong> {new Date(report.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;
