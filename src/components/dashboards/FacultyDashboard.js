import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Dummy data for demonstration
const dummyReports = [
  {
    id: 1,
    studentName: 'John Doe',
    company: 'Tech Corp',
    submissionDate: '2024-03-15',
    status: 'Pending',
    document: 'report1.pdf',
  },
  {
    id: 2,
    studentName: 'Jane Smith',
    company: 'Innovation Inc',
    submissionDate: '2024-03-14',
    status: 'Accepted',
    document: 'report2.pdf',
  },
  // Add more dummy data as needed
];

const dummyStats = {
  accepted: 15,
  rejected: 5,
  flagged: 3,
};

const statusColors = {
  Pending: '#FFD700',
  Accepted: '#4CAF50',
  Rejected: '#F44336',
  Flagged: '#E8B4B8',
};

const FacultyDashboard = () => {
  const [reports, setReports] = useState(dummyReports);
  const [selectedReport, setSelectedReport] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [comment, setComment] = useState('');

  const handleStatusChange = (reportId, newStatus) => {
    setReports(reports.map(report =>
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedReport(null);
    setComment('');
  };

  const handleSubmitComment = () => {
    // Handle comment submission
    console.log('Comment submitted:', comment);
    handleCloseDialog();
  };

  const handleDownloadPDF = (reportId) => {
    // Simulate PDF download
    console.log(`Downloading PDF for report ${reportId}`);
  };

  const handleGenerateSummary = () => {
    // Simulate summary report generation
    console.log('Generating summary report');
  };

  const chartData = [
    { name: 'Accepted', value: dummyStats.accepted },
    { name: 'Rejected', value: dummyStats.rejected },
    { name: 'Flagged', value: dummyStats.flagged },
  ];

  return (
    <div className="dashboard" style={{ padding: 24 }}>
      {/* Welcome Banner */}
      <div className="dashboard-banner" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', background: '#EED6D3', padding: '1.5rem', borderRadius: '12px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Faculty Dashboard</h2>
          <div style={{ color: '#67595E', marginTop: 4 }}>Manage and evaluate student internship reports</div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Accepted Reports</div>
          <div style={{ fontSize: 32, color: '#4CAF50', fontWeight: 700 }}>{dummyStats.accepted}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Rejected Reports</div>
          <div style={{ fontSize: 32, color: '#F44336', fontWeight: 700 }}>{dummyStats.rejected}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Flagged Reports</div>
          <div style={{ fontSize: 32, color: '#E8B4B8', fontWeight: 700 }}>{dummyStats.flagged}</div>
        </div>
      </div>

      {/* Statistics Chart */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3 style={{ margin: '0 0 16px' }}>Report Statistics</h3>
        <div style={{ background: '#fff', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px #eee' }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#E8B4B8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reports Table */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0 }}>Internship Reports</h3>
          <button className="btn btn-primary" onClick={handleGenerateSummary}>Generate Summary Report</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Student Name</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Company</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Submission Date</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{report.studentName}</td>
                <td style={{ padding: 12 }}>{report.company}</td>
                <td style={{ padding: 12 }}>{report.submissionDate}</td>
                <td style={{ padding: 12 }}>
                  <span style={{ background: statusColors[report.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px', fontWeight: 600 }}>
                    {report.status}
                  </span>
                </td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-primary" onClick={() => handleViewDetails(report)} style={{ marginRight: 8 }}>
                    View
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleDownloadPDF(report.id)}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Details Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent>
          {selectedReport && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Student: {selectedReport.studentName}</Typography>
              <Typography>Company: {selectedReport.company}</Typography>
              <Typography>Submission Date: {selectedReport.submissionDate}</Typography>
              <Typography>Status: {selectedReport.status}</Typography>
              
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Status Update</Typography>
                <button
                  className="btn btn-primary"
                  onClick={() => handleStatusChange(selectedReport.id, 'Accepted')}
                  style={{ marginRight: 8 }}
                >
                  Accept
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleStatusChange(selectedReport.id, 'Rejected')}
                  style={{ marginRight: 8, color: '#F44336', borderColor: '#F44336' }}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleStatusChange(selectedReport.id, 'Flagged')}
                  style={{ color: '#E8B4B8', borderColor: '#E8B4B8' }}
                >
                  Flag
                </button>
              </Box>

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Clarification Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{ mt: 2 }}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <button className="btn btn-secondary" onClick={handleCloseDialog}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmitComment}>Submit</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FacultyDashboard; 