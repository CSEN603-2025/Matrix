import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubmitReport = () => {
  const navigate = useNavigate();
  const [reportContent, setReportContent] = useState('');
  const [reportType, setReportType] = useState('weekly');
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock submission - in real app, this would be an API call
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/my-reports');
    }, 1500);
  };

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#67595E', marginBottom: '8px' }}>Submit Report</h1>
        <p style={{ color: '#A49393' }}>Submit your internship report content</p>
      </div>

      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#67595E', fontWeight: '500' }}>
            Report Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter report title..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
            required
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#67595E', fontWeight: '500' }}>
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '16px'
            }}
          >
            <option value="weekly">Weekly Report</option>
            <option value="monthly">Monthly Report</option>
            <option value="final">Final Report</option>
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', marginBottom: '8px', color: '#67595E', fontWeight: '500' }}>
            Report Content
          </label>
          <div style={{ marginBottom: '8px', color: '#A49393', fontSize: '14px' }}>
            Please include:
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              <li>Summary of work completed</li>
              <li>Key achievements and learnings</li>
              <li>Challenges faced and solutions implemented</li>
              <li>Plans for next period (if applicable)</li>
            </ul>
          </div>
          <textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Paste or write your report content here..."
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              minHeight: '400px',
              fontSize: '16px',
              resize: 'vertical',
              lineHeight: '1.5'
            }}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button
            type="button"
            onClick={() => navigate('/my-reports')}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #E8B4B8',
              background: '#fff',
              color: '#E8B4B8',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!reportContent.trim() || !title.trim() || isSubmitting}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              background: '#E8B4B8',
              color: '#fff',
              fontSize: '16px',
              cursor: 'pointer',
              opacity: (!reportContent.trim() || !title.trim() || isSubmitting) ? 0.7 : 1
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmitReport; 