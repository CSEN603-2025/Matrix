import React, { useState } from 'react';
import { useReports } from '../../context/ReportsContext';
import InternshipReport from '../internships/InternshipReport';

const InternshipReportsList = () => {
  const { reports, deleteReport } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDelete = (reportId) => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      deleteReport(reportId);
    }
  };

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>My Internship Reports</h2>

      {/* Search Bar */}
      <div style={{ 
        background: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 24,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          placeholder="Search reports by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Reports List */}
      <div style={{ display: 'grid', gap: 20 }}>
        {filteredReports.length > 0 ? (
          filteredReports.map(report => (
            <div
              key={report.id}
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 20,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'flex-start',
                marginBottom: 16 
              }}>
                <div>
                  <h3 style={{ margin: 0, color: '#2196F3' }}>{report.title}</h3>
                  <p style={{ 
                    margin: '8px 0', 
                    color: '#666',
                    fontSize: '0.9em'
                  }}>
                    Last modified: {formatDate(report.lastModified)}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setShowReport(true);
                      setIsEditing(false);
                    }}
                    style={{
                      background: '#2196F3',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: 20,
                      cursor: 'pointer'
                    }}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReport(report);
                      setShowReport(true);
                      setIsEditing(true);
                    }}
                    style={{
                      background: '#E8B4B8',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: 20,
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    style={{
                      background: '#f44336',
                      color: '#fff',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: 20,
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ color: '#666' }}>
                <p style={{ 
                  margin: '0 0 8px 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.5
                }}>
                  {report.introduction}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: 40,
            textAlign: 'center',
            color: '#666'
          }}>
            {searchQuery ? 'No reports found matching your search' : 'No reports have been created yet'}
          </div>
        )}
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