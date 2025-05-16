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
import { Routes, Route } from 'react-router-dom';
import InternshipReportsList from '../reports/InternshipReportsList';

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
    <Routes>
      <Route path="/" element={
        <div style={{ padding: '20px' }}>
          <h2>Faculty Dashboard</h2>
          {/* Add your dashboard overview content here */}
        </div>
      } />
      <Route path="reports" element={<InternshipReportsList />} />
      <Route path="*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default FacultyDashboard; 