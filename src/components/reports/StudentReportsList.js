import React, { useState } from 'react';
import { useReports } from '../../context/ReportsContext';

const StudentReportsList = () => {
  const { reports } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReport, setShowReport] = useState(false);

  // Filter only submitted reports
  const submittedReports = reports.filter(report => report.status === 'Submitted');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#67595E', marginBottom: '8px' }}>Student Reports</h1>
        <p style={{ color: '#A49393' }}>Review submitted student internship reports</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#E8B4B8' }}>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Report Type</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Submission Date</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Company</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedReports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px' }}>{report.studentName}</td>
                <td style={{ padding: '16px' }}>{report.type}</td>
                <td style={{ padding: '16px' }}>{formatDate(report.submissionDate)}</td>
                <td style={{ padding: '16px' }}>{report.companyName}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setShowReport(true);
                      }}
                      style={{
                        padding: '8px 16px',
                        background: '#E8B4B8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      View Report
                    </button>
                    <button
                      onClick={() => {/* Handle approve */}}
                      style={{
                        padding: '8px 16px',
                        background: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {/* Handle reject */}}
                      style={{
                        padding: '8px 16px',
                        background: '#F44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report View Modal */}
      {showReport && selectedReport && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 8,
            width: '90%',
            maxWidth: 1000,
            maxHeight: '90vh',
            overflow: 'auto',
            padding: '24px',
            position: 'relative'
          }}>
            <button
              onClick={() => {
                setShowReport(false);
                setSelectedReport(null);
              }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
            <h2 style={{ color: '#67595E', marginBottom: '16px' }}>{selectedReport.title}</h2>
            <div style={{ marginBottom: '16px' }}>
              <p><strong>Student:</strong> {selectedReport.studentName}</p>
              <p><strong>Company:</strong> {selectedReport.companyName}</p>
              <p><strong>Submission Date:</strong> {formatDate(selectedReport.submissionDate)}</p>
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{selectedReport.content}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentReportsList; 