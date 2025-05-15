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

// Mock data for university report
const universityReportData = {
  programStats: {
    totalStudents: 120,
    activeInternships: 28,
    completedInternships: 85,
    successRate: "87%",
    avgDuration: "3 months",
    majorDistribution: {
      "Computer Science": 45,
      "Data Science": 35,
      "Information Systems": 40
    }
  },
  companyStats: {
    totalCompanies: 22,
    topCompanies: [
      { name: "Tech Innovators", interns: 5 },
      { name: "Green Energy", interns: 4 },
      { name: "Digital Solutions", interns: 3 }
    ],
    sectors: {
      "Technology": "45%",
      "Energy": "25%",
      "Finance": "20%",
      "Healthcare": "10%"
    },
    newPartnerships: 8,
    avgSatisfaction: "4.2/5"
  },
  studentPerformance: {
    avgCompanyRating: "4.3/5",
    logbookCompletion: "92%",
    reportSubmission: "95%",
    jobOffers: 15,
    gradeDistribution: {
      "A": "35%",
      "B+": "45%",
      "B": "15%",
      "C+": "5%"
    }
  },
  academicMetrics: {
    facultyInvolved: 12,
    supervisorRatio: "1:10",
    avgReviewTime: "3 days",
    qualityScore: "4.1/5"
  }
};

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
  const [showReport, setShowReport] = useState(false);

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

  // Add the UniversityReport component
  const UniversityReport = () => (
    <div className="report-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      display: showReport ? 'flex' : 'none',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div className="report-content" style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '2rem',
        width: '90%',
        maxWidth: '1200px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button 
          onClick={() => setShowReport(false)}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#67595E'
          }}
        >
          ×
        </button>

        <h2 style={{ color: '#67595E', marginBottom: '1.5rem' }}>University Internship Program Report</h2>

        {/* Program Statistics */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#E8B4B8', marginBottom: '1rem' }}>Program Statistics</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #E8B4B8' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Total Students</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#E8B4B8' }}>{universityReportData.programStats.totalStudents}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #E8B4B8' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Active Internships</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#E8B4B8' }}>{universityReportData.programStats.activeInternships}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #E8B4B8' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Success Rate</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#E8B4B8' }}>{universityReportData.programStats.successRate}</div>
            </div>
          </div>
        </div>

        {/* Company Partnerships */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#E8B4B8', marginBottom: '1rem' }}>Company Partnerships</h3>
          <div style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #eee', padding: '1rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#EED6D3' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Company</th>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Interns</th>
                </tr>
              </thead>
              <tbody>
                {universityReportData.companyStats.topCompanies.map((company, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '12px' }}>{company.name}</td>
                    <td style={{ padding: '12px' }}>{company.interns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Student Performance */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#E8B4B8', marginBottom: '1rem' }}>Student Performance</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #A49393' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Average Company Rating</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#A49393' }}>{universityReportData.studentPerformance.avgCompanyRating}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #A49393' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Logbook Completion</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#A49393' }}>{universityReportData.studentPerformance.logbookCompletion}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #A49393' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Job Offers</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#A49393' }}>{universityReportData.studentPerformance.jobOffers}</div>
            </div>
          </div>
        </div>

        {/* Academic Integration */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#E8B4B8', marginBottom: '1rem' }}>Academic Integration</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #EED6D3' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Faculty Involved</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#67595E' }}>{universityReportData.academicMetrics.facultyInvolved}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #EED6D3' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Supervisor Ratio</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#67595E' }}>{universityReportData.academicMetrics.supervisorRatio}</div>
            </div>
            <div style={{ background: '#fafafa', padding: '1rem', borderRadius: '8px', borderLeft: '4px solid #EED6D3' }}>
              <div style={{ fontSize: '14px', color: '#67595E' }}>Average Review Time</div>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#67595E' }}>{universityReportData.academicMetrics.avgReviewTime}</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button 
            className="btn btn-primary" 
            style={{ marginRight: '1rem' }}
            onClick={() => window.print()}
          >
            Print Report
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowReport(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard" style={{ padding: 24 }}>
      {/* Welcome Banner */}
      <div className="dashboard-banner" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', background: '#EED6D3', padding: '1.5rem', borderRadius: '12px' }}>
        <div>
          <h2 style={{ margin: 0 }}>Faculty Dashboard</h2>
          <div style={{ color: '#67595E', marginTop: 4 }}>Manage and evaluate student internship reports</div>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowReport(true)}
          >
            Generate University Report
          </button>
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

      {/* Add the report component */}
      <UniversityReport />
    </div>
  );
};

export default FacultyDashboard; 