import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReportList.css'; // Optional, if you want to add extra styling

const ReportList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reports');
        setReports(response.data);
      } catch (err) {
        console.error('Failed to fetch reports:', err);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container">
      <h1>Submitted Reports</h1>
      {reports.length === 0 ? (
        <p className="no-reports">No reports yet.</p>
      ) : (
        <div className="report-list">
          {reports.map((report) => (
            <div className="report-card" key={report._id}>
              <h2>{report.title}</h2>
              <p>{report.description}</p>
              <p><strong>Type:</strong> {report.type}</p>
              <p><strong>Anonymous:</strong> {report.anonymous ? 'Yes' : 'No'}</p>
              <p className="timestamp">{new Date(report.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReportList;
