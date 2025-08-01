// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import ReportForm from '../components/ReportForm';
import ReportList from '../components/ReportList';
import './DashboardPage.css';

const DashboardPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('https://anti-cyberbullying-network.onrender.com/api/reports', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Unauthorized or failed request');
      }

      const data = await res.json();
      setReports(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reports:', err);
      setError('Failed to load reports. Please login again.');
      localStorage.removeItem('token');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Anonymous Reporting Dashboard</h1>
      <ReportForm onReportSubmitted={fetchReports} />
      {loading ? (
        <p className="loading">Loading reports...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <ReportList reports={reports} />
      )}
    </div>
  );
};

export default DashboardPage;
