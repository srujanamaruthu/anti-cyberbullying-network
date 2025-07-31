// src/pages/DashboardPage.js
import React, { useEffect, useState } from 'react';
import ReportForm from '../components/ReportForm';
import ReportList from '../components/ReportList';
import './DashboardPage.css';

const DashboardPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/reports', {
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
      // Optional: redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="dashboard-container">
      <ReportForm onReportSubmitted={fetchReports} />
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <ReportList reports={reports} />
      )}
    </div>
  );
};

export default DashboardPage;
