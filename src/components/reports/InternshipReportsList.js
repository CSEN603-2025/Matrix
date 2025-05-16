import React, { useState } from 'react';
import { useReports } from '../../context/ReportsContext';
import InternshipReport from '../internships/InternshipReport';
import { useNavigate } from 'react-router-dom';
import { 
  TextField, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextareaAutosize
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const InternshipReportsList = () => {
  const { reports, deleteReport, submitReport } = useReports();
  const [selectedReport, setSelectedReport] = useState(null);
  const [showReport, setShowReport] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [actionReason, setActionReason] = useState('');
  const [actionType, setActionType] = useState(null); // 'flag' or 'reject'
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

  const filteredReports = reports.filter(report => {
    const matchesSearch = !searchQuery || 
      report.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || report.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return '#4CAF50';
      case 'Rejected':
        return '#f44336';
      case 'Flagged':
        return '#ff9800';
      default:
        return '#2196F3';
    }
  };

  const getInitialReports = () => {
    const savedReports = localStorage.getItem('internshipReports');
    if (savedReports) {
      return JSON.parse(savedReports);
    }
    return [
      {
        id: 1,
        studentName: 'John Doe',
        studentId: '20231234',
        companyName: 'Tech Corp',
        submissionDate: '2024-03-15',
        startDate: '2024-01-15',
        endDate: '2024-03-15',
        status: 'Pending',
        position: 'Frontend Developer',
        supervisor: 'Sarah Johnson',
        department: 'Engineering',
        reportContent: {
          weeklyTasks: [
            'Implemented new user interface components',
            'Fixed bugs in the authentication system',
            'Participated in code reviews'
          ],
          learningOutcomes: 'Gained practical experience in React and modern web development practices.',
          challenges: 'Adapting to the team\'s coding standards and learning new technologies.',
          recommendations: 'The internship program would benefit from more structured mentorship sessions.',
          attachments: ['weekly_report.pdf', 'project_documentation.pdf']
        }
      },
      {
        id: 2,
        studentName: 'Sara Lee',
        studentId: '20231235',
        companyName: 'Data Analytics Co',
        submissionDate: '2024-03-14',
        startDate: '2024-01-10',
        endDate: '2024-03-10',
        status: 'Pending',
        position: 'Data Analyst Intern',
        supervisor: 'Michael Chen',
        department: 'Data Science',
        reportContent: {
          weeklyTasks: [
            'Analyzed customer behavior data',
            'Created visualization dashboards',
            'Presented findings to stakeholders'
          ],
          learningOutcomes: 'Improved data analysis skills and learned to use advanced visualization tools.',
          challenges: 'Working with large datasets and ensuring data accuracy.',
          recommendations: 'More training on specialized data analysis tools would be helpful.',
          attachments: ['data_analysis_report.pdf']
        }
      }
    ];
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
    setShowReport(true);
  };

  const handleCloseReport = () => {
    setSelectedReport(null);
    setShowReport(false);
  };

  const handleAction = (report, action) => {
    setSelectedReport(report);
    setActionType(action);
    setShowReasonModal(true);
  };

  const handleSubmitAction = () => {
    // Here you would typically make an API call to update the report status
    console.log(`${actionType} report ${selectedReport.id} with reason: ${actionReason}`);
    setShowReasonModal(false);
    setActionReason('');
    setActionType(null);
    setSelectedReport(null);
  };

  const handleDownload = (report) => {
    // Implement download functionality
    console.log('Downloading report:', report.id);
  };

  const ReportDetailsModal = () => (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '32px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0, color: '#67595E' }}>Internship Evaluation Report</h2>
          <button
            onClick={handleCloseReport}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#67595E'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '32px' }}>
          {/* Student Information Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Student Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Student Name</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.studentName}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Student ID</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.studentId}</p>
              </div>
            </div>
          </div>

          {/* Company Information Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Company Information
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Company Name</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.companyName}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Position</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.position}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Main Supervisor</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.supervisor || 'Not specified'}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Department</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.department || 'Not specified'}</p>
              </div>
            </div>
          </div>

          {/* Internship Period Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Internship Period
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Start Date</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.startDate || selectedReport.submissionDate}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>End Date</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.endDate || 'Not specified'}</p>
              </div>
              <div>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Status</h4>
                <p style={{ margin: '0', color: '#666' }}>{selectedReport.status}</p>
              </div>
            </div>
          </div>

          {/* Weekly Tasks Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Weekly Tasks
            </h3>
            <ul style={{ margin: 0, paddingLeft: '20px' }}>
              {selectedReport.reportContent.weeklyTasks.map((task, index) => (
                <li key={index} style={{ color: '#666', marginBottom: '8px' }}>{task}</li>
              ))}
            </ul>
          </div>

          {/* Learning Outcomes Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Learning Outcomes
            </h3>
            <p style={{ margin: '0', color: '#666' }}>{selectedReport.reportContent.learningOutcomes}</p>
          </div>

          {/* Challenges Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Challenges
            </h3>
            <p style={{ margin: '0', color: '#666' }}>{selectedReport.reportContent.challenges}</p>
          </div>

          {/* Recommendations Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Recommendations
            </h3>
            <p style={{ margin: '0', color: '#666' }}>{selectedReport.reportContent.recommendations}</p>
          </div>

          {/* Attachments Section */}
          <div>
            <h3 style={{ color: '#67595E', marginBottom: '16px', borderBottom: '2px solid #E8B4B8', paddingBottom: '8px' }}>
              Attachments
            </h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {selectedReport.reportContent.attachments.map((attachment, index) => (
                <button
                  key={index}
                  style={{
                    background: '#E8B4B8',
                    border: 'none',
                    color: '#fff',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onClick={() => {/* Handle download */}}
                >
                  {attachment}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ReasonModal = () => (
    <Dialog open={showReasonModal} onClose={() => setShowReasonModal(false)}>
      <DialogTitle style={{ color: '#67595E' }}>
        {actionType === 'flag' ? 'Flag Report' : 'Reject Report'}
      </DialogTitle>
      <DialogContent>
        <TextareaAutosize
          minRows={4}
          placeholder={`Please provide a reason for ${actionType}ging this report...`}
          value={actionReason}
          onChange={(e) => setActionReason(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '12px',
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: '14px',
            minWidth: '400px'
          }}
        />
      </DialogContent>
      <DialogActions style={{ padding: '16px' }}>
        <Button 
          onClick={() => setShowReasonModal(false)}
          style={{ color: '#67595E' }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmitAction}
          style={{ 
            backgroundColor: '#E8B4B8',
            color: 'white'
          }}
          disabled={!actionReason.trim()}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#67595E', marginBottom: '8px' }}>My Reports</h1>
        <p style={{ color: '#A49393' }}>View and manage your internship reports</p>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <TextField
          placeholder="Search reports..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: 200 }}
        />
        <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Accepted">Accepted</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
            <MenuItem value="Flagged">Flagged</MenuItem>
          </Select>
        </FormControl>
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
            {filteredReports.map((report) => (
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
        <ReportDetailsModal />
      )}
      <ReasonModal />
    </div>
  );
};

export default InternshipReportsList; 