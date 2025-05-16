import React, { useState, useEffect } from 'react';
import { useReports } from '../../context/ReportsContext';

const InternshipReport = ({ internship, initialReport = null, isEditing: initialIsEditing = false }) => {
  const { addReport, updateReport, deleteReport, getReportByInternshipId } = useReports();
  const [isEditing, setIsEditing] = useState(initialIsEditing);
  const [report, setReport] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    body: ''
  });

  useEffect(() => {
    if (initialReport) {
      setReport(initialReport);
      setFormData({
        title: initialReport.title,
        introduction: initialReport.introduction,
        body: initialReport.body
      });
    } else {
      const existingReport = getReportByInternshipId(internship.id);
      if (existingReport) {
        setReport(existingReport);
        setFormData({
          title: existingReport.title,
          introduction: existingReport.introduction,
          body: existingReport.body
        });
      }
    }
  }, [internship.id, initialReport, getReportByInternshipId]);

  useEffect(() => {
    setIsEditing(initialIsEditing);
  }, [initialIsEditing]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (report) {
      updateReport(report.id, formData);
      setReport({ ...report, ...formData });
    } else {
      const newReport = addReport(internship.id, formData);
      setReport(newReport);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this report? This action cannot be undone.')) {
      deleteReport(report.id);
      setReport(null);
      setFormData({
        title: '',
        introduction: '',
        body: ''
      });
    }
  };

  if (!isEditing && !report) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <h2>Create Internship Report</h2>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: '#E8B4B8',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
          >
            Create Report
          </button>
        </div>
        <div style={{ 
          color: '#666',
          background: '#f5f5f5',
          padding: 20,
          borderRadius: 8,
          marginTop: 16
        }}>
          <h4 style={{ marginTop: 0 }}>Report Guidelines:</h4>
          <ul style={{ paddingLeft: 20 }}>
            <li>Title: A clear, descriptive title for your internship experience</li>
            <li>Introduction: Brief overview of your internship and key responsibilities</li>
            <li>Body: Detailed description of your experience, learnings, and achievements</li>
          </ul>
        </div>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div style={{ padding: 24 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24
        }}>
          <h2>{report ? 'Edit Report' : 'Create Report'}</h2>
          <button
            onClick={() => setIsEditing(false)}
            style={{
              background: '#666',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Title
              <span style={{ color: '#666', fontSize: '0.9em' }}> (e.g., "Frontend Development Experience at Tech Innovators")</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter a descriptive title for your internship report"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '14px'
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Introduction
              <span style={{ color: '#666', fontSize: '0.9em' }}> (Brief overview of your internship)</span>
            </label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleInputChange}
              placeholder="Provide a brief introduction about your internship experience, including your role and main responsibilities"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '14px',
                minHeight: '100px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              Body
              <span style={{ color: '#666', fontSize: '0.9em' }}> (Detailed description of your experience)</span>
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Describe your internship experience in detail. Include:\n- Projects you worked on\n- Skills you developed\n- Challenges you overcame\n- Key achievements\n- Learning outcomes"
              required
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '14px',
                minHeight: '300px',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="submit"
              style={{
                background: '#E8B4B8',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 20,
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              {report ? 'Update Report' : 'Save Report'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              style={{
                background: '#fff',
                color: '#666',
                border: '1px solid #666',
                padding: '12px 24px',
                borderRadius: 20,
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
      }}>
        <h2>Internship Report</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: '#E8B4B8',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
          >
            Edit Report
          </button>
          <button
            onClick={handleDelete}
            style={{
              background: '#f44336',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
          >
            Delete Report
          </button>
        </div>
      </div>

      <div style={{
        background: '#fff',
        borderRadius: 8,
        padding: 24,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ color: '#2196F3', marginBottom: 16 }}>{report.title}</h3>
        
        <div style={{ marginBottom: 24 }}>
          <h4 style={{ color: '#E8B4B8', marginBottom: 8 }}>Introduction</h4>
          <p style={{ color: '#666', lineHeight: 1.6 }}>{report.introduction}</p>
        </div>

        <div>
          <h4 style={{ color: '#E8B4B8', marginBottom: 8 }}>Report Body</h4>
          <div style={{ 
            color: '#666', 
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap'
          }}>
            {report.body}
          </div>
        </div>

        <div style={{ 
          marginTop: 24,
          padding: '16px 0',
          borderTop: '1px solid #eee',
          color: '#666',
          fontSize: '0.9em'
        }}>
          <p>Created: {report.createdAt}</p>
          <p>Last Modified: {report.lastModified}</p>
        </div>
      </div>
    </div>
  );
};

export default InternshipReport; 