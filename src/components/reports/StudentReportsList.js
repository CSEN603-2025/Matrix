import React, { useState, useEffect } from 'react';
import { useReports } from '../../context/ReportsContext';
import jsPDF from 'jspdf';
import { FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const ReportsList = () => {
  const { reports } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [filterMajor, setFilterMajor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [clarification, setClarification] = useState('');
  const [clarifyOpen, setClarifyOpen] = useState(false);
  const [clarifyType, setClarifyType] = useState('');
  const [clarifyReport, setClarifyReport] = useState(null);
  const [localReports, setLocalReports] = useState(reports);

  // Get unique majors for dropdown
  const majors = Array.from(new Set(reports.map(r => r.major).filter(Boolean)));
  // Get unique statuses for dropdown
  const statuses = Array.from(new Set(reports.map(r => r.status).filter(Boolean).concat(['Pending', 'Flagged', 'Rejected', 'Accepted', 'Submitted', 'Reviewed'])));

  // Update localReports if context reports change
  useEffect(() => { setLocalReports(reports); }, [reports]);

  // Show all submitted reports (not just 'Submitted' status)
  const filteredReports = localReports
    .filter(report => !filterMajor || report.major === filterMajor)
    .filter(report => !filterStatus || report.status === filterStatus);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadPDF = (report) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(report.title || 'Report', 10, 20);
    doc.setFontSize(12);
    doc.text(`Student: ${report.studentName || ''}`, 10, 35);
    doc.text(`Company: ${report.companyName || ''}`, 10, 45);
    doc.text(`Major: ${report.major || ''}`, 10, 55);
    doc.text(`Status: ${report.status || ''}`, 10, 65);
    doc.text(`Submission Date: ${formatDate(report.submissionDate)}`, 10, 75);
    doc.text('Content:', 10, 90);
    doc.setFontSize(11);
    doc.text(report.content || '', 10, 100, { maxWidth: 180 });
    doc.save(`${report.title || 'report'}.pdf`);
  };

  const handleStatusChange = (report, newStatus, withClarification = false) => {
    if (withClarification) {
      setClarifyReport(report);
      setClarifyType(newStatus);
      setClarification('');
      setClarifyOpen(true);
    } else {
      setLocalReports(prev => prev.map(r => r.id === report.id ? { ...r, status: newStatus } : r));
    }
  };

  const handleClarifySubmit = () => {
    setLocalReports(prev => prev.map(r => r.id === clarifyReport.id ? { ...r, status: clarifyType, clarification } : r));
    setClarifyOpen(false);
    setClarifyReport(null);
    setClarifyType('');
    setClarification('');
  };

  // Mock evaluation data
  const mockEvaluations = [
    {
      id: 1,
      studentName: 'John Doe',
      companyName: 'Tech Innovators',
      supervisor: 'Eng. Ahmed Mostafa',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      rating: 4.8,
      comments: 'Excellent performance and teamwork.'
    },
    {
      id: 2,
      studentName: 'Sara Lee',
      companyName: 'Green Energy',
      supervisor: 'Eng. Mona Fathy',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      rating: 4.2,
      comments: 'Great analytical skills.'
    }
  ];

  // Mock statistics
  const mockStats = {
    accepted: 2,
    rejected: 1,
    flagged: 1,
    avgReviewTime: '2.5 days',
    topCourses: ['React', 'Python', 'Data Science'],
    topRatedCompanies: [
      { name: 'Tech Innovators', avgRating: 4.8 },
      { name: 'Green Energy', avgRating: 4.2 }
    ],
    topCompaniesByCount: [
      { name: 'Tech Innovators', count: 3 },
      { name: 'Green Energy', count: 2 }
    ]
  };

  const handleDownloadStatsReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Internship Reports Statistics', 10, 20);
    doc.setFontSize(12);
    doc.text(`Accepted: ${mockStats.accepted}`, 10, 35);
    doc.text(`Rejected: ${mockStats.rejected}`, 10, 45);
    doc.text(`Flagged: ${mockStats.flagged}`, 10, 55);
    doc.text(`Average Review Time: ${mockStats.avgReviewTime}`, 10, 65);
    doc.text('Top Courses:', 10, 80);
    mockStats.topCourses.forEach((c, i) => doc.text(`- ${c}`, 20, 90 + i * 10));
    doc.text('Top Rated Companies:', 10, 120);
    mockStats.topRatedCompanies.forEach((c, i) => doc.text(`${c.name}: ${c.avgRating}`, 20, 130 + i * 10));
    doc.text('Top Companies by Internship Count:', 10, 160);
    mockStats.topCompaniesByCount.forEach((c, i) => doc.text(`${c.name}: ${c.count}`, 20, 170 + i * 10));
    doc.save('internship_statistics.pdf');
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#67595E', marginBottom: '8px' }}>Reports</h1>
        <p style={{ color: '#A49393' }}>Review all submitted internship reports</p>
        {/* Statistics Section */}
        <div style={{ background: '#fafafa', borderRadius: 8, padding: 24, margin: '24px 0', boxShadow: '0 2px 8px #eee' }}>
          <h2 style={{ color: '#E8B4B8', marginBottom: 12 }}>Real-Time Statistics</h2>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', marginBottom: 16 }}>
            <div><b>Accepted:</b> {mockStats.accepted}</div>
            <div><b>Rejected:</b> {mockStats.rejected}</div>
            <div><b>Flagged:</b> {mockStats.flagged}</div>
            <div><b>Average Review Time:</b> {mockStats.avgReviewTime}</div>
          </div>
          <div style={{ marginBottom: 8 }}><b>Top Courses:</b> {mockStats.topCourses.join(', ')}</div>
          <div style={{ marginBottom: 8 }}><b>Top Rated Companies:</b> {mockStats.topRatedCompanies.map(c => `${c.name} (${c.avgRating})`).join(', ')}</div>
          <div style={{ marginBottom: 8 }}><b>Top Companies by Internship Count:</b> {mockStats.topCompaniesByCount.map(c => `${c.name} (${c.count})`).join(', ')}</div>
          <button onClick={handleDownloadStatsReport} style={{ marginTop: 12, background: '#E8B4B8', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>Generate Statistics Report</button>
        </div>
        {/* Evaluation Reports Section */}
        <div style={{ background: '#fff', borderRadius: 8, padding: 24, margin: '24px 0', boxShadow: '0 2px 8px #eee' }}>
          <h2 style={{ color: '#E8B4B8', marginBottom: 12 }}>Evaluation Reports</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#E8B4B8' }}>
              <tr>
                <th style={{ padding: 14, textAlign: 'left' }}>Student</th>
                <th style={{ padding: 14, textAlign: 'left' }}>Company</th>
                <th style={{ padding: 14, textAlign: 'left' }}>Supervisor</th>
                <th style={{ padding: 14, textAlign: 'left' }}>Start Date</th>
                <th style={{ padding: 14, textAlign: 'left' }}>End Date</th>
                <th style={{ padding: 14, textAlign: 'left' }}>Rating</th>
                <th style={{ padding: 14, textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockEvaluations.map(e => (
                <tr key={e.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 14 }}>{e.studentName}</td>
                  <td style={{ padding: 14 }}>{e.companyName}</td>
                  <td style={{ padding: 14 }}>{e.supervisor}</td>
                  <td style={{ padding: 14 }}>{e.startDate}</td>
                  <td style={{ padding: 14 }}>{e.endDate}</td>
                  <td style={{ padding: 14 }}>{e.rating}</td>
                  <td style={{ padding: 14 }}>
                    <button style={{ background: '#E8B4B8', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setSelectedReport({ ...e, isEvaluation: true })}>View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
          <FormControl variant="outlined" size="small" style={{ minWidth: 160 }}>
            <InputLabel id="major-label">Major</InputLabel>
            <Select
              labelId="major-label"
              value={filterMajor}
              label="Major"
              onChange={e => setFilterMajor(e.target.value)}
            >
              <MenuItem value="">All Majors</MenuItem>
              {majors.map(m => (
                <MenuItem key={m} value={m}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" size="small" style={{ minWidth: 160 }}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={filterStatus}
              label="Status"
              onChange={e => setFilterStatus(e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {statuses.map(s => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#E8B4B8' }}>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Report Type</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Major</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Submission Date</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Company</th>
              <th style={{ padding: '16px', color: '#fff', textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px' }}>{report.studentName}</td>
                <td style={{ padding: '16px' }}>{report.type}</td>
                <td style={{ padding: '16px' }}>{report.major}</td>
                <td style={{ padding: '16px' }}>{report.status}</td>
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
                      onClick={() => handleDownloadPDF(report)}
                      style={{
                        padding: '8px 16px',
                        background: '#67595E',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Download PDF
                    </button>
                    {/* Status action buttons for Pending reports */}
                    {report.status === 'Pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(report, 'Accepted')}
                          style={{ padding: '8px 16px', background: '#4CAF50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleStatusChange(report, 'Rejected', true)}
                          style={{ padding: '8px 16px', background: '#F44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleStatusChange(report, 'Flagged', true)}
                          style={{ padding: '8px 16px', background: '#FFD700', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                          Flag
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
            <h2 style={{ color: '#67595E', marginBottom: '16px' }}>{selectedReport.title || 'Evaluation Report'}</h2>
            <div style={{ marginBottom: '16px' }}>
              <p><strong>Student:</strong> {selectedReport.studentName}</p>
              <p><strong>Company:</strong> {selectedReport.companyName}</p>
              {selectedReport.isEvaluation ? (
                <>
                  <p><strong>Supervisor:</strong> {selectedReport.supervisor}</p>
                  <p><strong>Start Date:</strong> {selectedReport.startDate}</p>
                  <p><strong>End Date:</strong> {selectedReport.endDate}</p>
                  <p><strong>Rating:</strong> {selectedReport.rating}</p>
                  <p><strong>Comments:</strong> {selectedReport.comments}</p>
                </>
              ) : (
                <>
                  <p><strong>Major:</strong> {selectedReport.major}</p>
                  <p><strong>Status:</strong> {selectedReport.status}</p>
                  <p><strong>Submission Date:</strong> {formatDate(selectedReport.submissionDate)}</p>
                  {selectedReport.clarification && (
                    <p style={{ color: '#F44336' }}><strong>Clarification:</strong> {selectedReport.clarification}</p>
                  )}
                </>
              )}
            </div>
            <div style={{ whiteSpace: 'pre-wrap' }}>{selectedReport.content}</div>
          </div>
        </div>
      )}

      {/* Clarification Dialog */}
      <Dialog open={clarifyOpen} onClose={() => setClarifyOpen(false)}>
        <DialogTitle>Submit Clarification</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Clarification Reason"
            type="text"
            fullWidth
            multiline
            minRows={3}
            value={clarification}
            onChange={e => setClarification(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClarifyOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleClarifySubmit} color="primary" disabled={!clarification.trim()}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportsList; 