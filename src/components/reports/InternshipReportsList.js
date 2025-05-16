import React, { useState } from 'react';
import { useReports } from '../../context/ReportsContext';
import InternshipReport from '../internships/InternshipReport';
import { useNavigate } from 'react-router-dom';

const InternshipReportsList = () => {
  const { reports, deleteReport, submitReport } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleDelete = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      deleteReport(reportId);
    }
  };

  const handleSubmit = (report) => {
    if (window.confirm('Are you sure you want to submit this report? Once submitted, it cannot be edited.')) {
      submitReport(report.id);
    }
  };

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return '#4CAF50';
      case 'Pending Review':
        return '#FFA000';
      case 'Rejected':
        return '#F44336';
      case 'Draft':
        return '#67595E';
      default:
        return '#67595E';
    }
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#67595E', marginBottom: '8px' }}>My Reports</h1>
        <p style={{ color: '#A49393' }}>View and manage your internship reports</p>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#E8B4B8' }}>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Report Title</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px' }}>{report.title}</td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setShowReport(true);
                        setIsEditing(false);
                      }}
                      style={{
                        padding: '8px 16px',
                        background: '#fff',
                        color: '#E8B4B8',
                        border: '1px solid #E8B4B8',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      View
                    </button>
                    {report.status !== 'Submitted' && (
                      <>
                        <button
                          onClick={() => {
                            setSelectedReport(report);
                            setShowReport(true);
                            setIsEditing(true);
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
                          Edit
                        </button>
                        <button
                          onClick={() => handleSubmit(report)}
                          style={{
                            padding: '8px 16px',
                            background: '#4CAF50',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Submit
                        </button>
                        <button
                          onClick={() => handleDelete(report.id)}
                          style={{
                            padding: '8px 16px',
                            background: '#F44336',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Modal */}
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
            position: 'relative'
          }}>
            <button
              onClick={() => {
                setShowReport(false);
                setSelectedReport(null);
                setIsEditing(false);
              }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                zIndex: 1
              }}
            >
              ×
            </button>
            <InternshipReport
              internship={{ id: selectedReport.internshipId }}
              initialReport={selectedReport}
              isEditing={isEditing}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipReportsList; 