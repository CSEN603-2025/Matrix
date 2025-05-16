import React, { useState } from 'react';
import CompanyRegistrationView from '../CompanyRegistrationView';

// Mock data
const summary = {
  students: 120,
  approvedInternships: 35,
  pendingApplications: 18,
  submittedReports: 50,
  activeCompanies: 22,
  pendingCompanies: 5,
  ongoingInternships: 28,
};

const students = [
  { id: '20231234', name: 'John Doe', major: 'CS', status: 'In Progress', supervisor: 'Dr. Smith', logbook: 40, report: 'Submitted' },
  { id: '20231235', name: 'Sara Lee', major: 'DS', status: 'Completed', supervisor: 'Dr. Brown', logbook: 60, report: 'Reviewed' },
];

const companies = [
  { 
    id: 1, 
    name: 'Tech Innovators', 
    status: 'Active', 
    internships: 2,
    companyName: 'Tech Innovators',
    industry: 'Technology',
    companySize: '201-500 employees',
    companyEmail: 'hr@techinnovators.com',
    registrationDate: '2024-05-01'
  },
  { 
    id: 2, 
    name: 'Green Energy', 
    status: 'Pending', 
    internships: 0,
    companyName: 'Green Energy',
    industry: 'Energy',
    companySize: '51-200 employees',
    companyEmail: 'contact@greenenergy.com',
    registrationDate: '2024-05-08'
  },
  { 
    id: 3, 
    name: 'Digital Solutions', 
    status: 'Pending', 
    internships: 0,
    companyName: 'Digital Solutions',
    industry: 'Technology',
    companySize: '51-200 employees',
    companyEmail: 'info@digitalsolutions.com',
    registrationDate: '2024-05-09'
  },
];

const applications = [
  { id: 1, student: 'John Doe', company: 'Tech Innovators', status: 'Pending', date: '2024-05-10', docs: true },
  { id: 2, student: 'Sara Lee', company: 'Green Energy', status: 'Approved', date: '2024-05-09', docs: true },
];

const logbooks = [
  { id: 1, student: 'John Doe', supervisor: 'Dr. Smith', date: '2024-05-10', status: 'On Time' },
  { id: 2, student: 'Sara Lee', supervisor: 'Dr. Brown', date: '2024-05-09', status: 'Late' },
];

const reports = [
  { id: 1, student: 'John Doe', status: 'Submitted', reviewer: '', grade: '' },
  { id: 2, student: 'Sara Lee', status: 'Reviewed', reviewer: 'Dr. Brown', grade: 'A' },
];

const notifications = [
  { id: 1, type: 'video_call', message: 'John Doe has requested a video call', date: '2024-05-10', status: 'pending' },
  { id: 2, type: 'announcement', message: 'Logbook deadline is 2024-05-15', date: '2024-05-10' },
  { id: 3, type: 'message', message: 'Student John Doe requested extension', date: '2024-05-09' },
];

const deadlines = [
  { type: 'Application', date: '2024-05-20' },
  { type: 'Logbook', date: '2024-05-15' },
  { type: 'Report', date: '2024-06-01' },
];

const requests = [
  { id: 1, type: 'Extension', student: 'John Doe', status: 'Pending' },
  { id: 2, type: 'Company Change', student: 'Sara Lee', status: 'Approved' },
];

const adminUsers = [
  { id: 1, name: 'Admin User', email: 'admin@guc.edu.eg', status: 'Active' },
];

const helpLinks = [
  { label: 'SCAD Admin Manual', url: '#' },
  { label: 'IT Support', url: '#' },
];

const statusColors = {
  Pending: '#FFD700',
  Approved: '#4CAF50',
  Rejected: '#F44336',
  Completed: '#4CAF50',
  'In Progress': '#E8B4B8',
  Reviewed: '#2196F3',
  Submitted: '#A49393',
  Active: '#4CAF50',
};

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

const SCADOfficeDashboard = () => {
  const [studentFilter, setStudentFilter] = useState({ id: '', major: '', status: '' });
  const [companyFilter, setCompanyFilter] = useState('');
  const [appFilter, setAppFilter] = useState({ company: '', student: '', status: '' });
  const [showReport, setShowReport] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [showDateTimeDialog, setShowDateTimeDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentMade, setAppointmentMade] = useState(false);
  const [appointmentRequested, setAppointmentRequested] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showIncomingCall, setShowIncomingCall] = useState(true);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showCallerLeft, setShowCallerLeft] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);

  // Filtered lists (mock logic)
  const filteredStudents = students.filter(s =>
    (!studentFilter.id || s.id.includes(studentFilter.id)) &&
    (!studentFilter.major || s.major === studentFilter.major) &&
    (!studentFilter.status || s.status === studentFilter.status)
  );
  const filteredCompanies = companies.filter(c =>
    !companyFilter || c.status === companyFilter
  );
  const filteredApps = applications.filter(a =>
    (!appFilter.company || a.company === appFilter.company) &&
    (!appFilter.student || a.student === appFilter.student) &&
    (!appFilter.status || a.status === appFilter.status)
  );

  const handleRequestAppointment = (student) => {
    setSelectedStudent(student);
    setAppointmentRequested(true);
    setTimeout(() => setAppointmentRequested(false), 3000);
  };

  const handleAcceptVideoCall = () => {
    setShowNotifications(false);
    setShowDateTimeDialog(true);
  };

  const handleRejectVideoCall = () => {
    setShowNotifications(false);
  };

  const handleDateTimeSubmit = () => {
    setShowDateTimeDialog(false);
    setAppointmentMade(true);
    setTimeout(() => setAppointmentMade(false), 3000);
  };

  const handleCloseDialog = () => {
    setShowAppointmentDialog(false);
    setAppointmentMade(false);
    setSelectedStudent(null);
  };

  const handleAnswerCall = () => {
    setShowIncomingCall(false);
    setShowVideoCall(true);
    setTimeout(() => {
      setShowVideoCall(false);
      setShowCallerLeft(true);
      setTimeout(() => setShowCallerLeft(false), 3000);
    }, 50000);
  };

  const handleEndCall = () => {
    setShowVideoCall(false);
  };

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyDetails(true);
  };

  const handleApproveCompany = (company) => {
    // Here you would typically make an API call to approve the company
    console.log('Approving company:', company);
    const updatedCompanies = companies.map(c => 
      c.id === company.id ? { ...c, status: 'Active' } : c
    );
    // Update companies list
    companies.splice(0, companies.length, ...updatedCompanies);
    setShowCompanyDetails(false);
    setSelectedCompany(null);
  };

  const handleRejectCompany = (company) => {
    // Here you would typically make an API call to reject the company
    console.log('Rejecting company:', company);
    const updatedCompanies = companies.map(c => 
      c.id === company.id ? { ...c, status: 'Rejected' } : c
    );
    // Update companies list
    companies.splice(0, companies.length, ...updatedCompanies);
    setShowCompanyDetails(false);
    setSelectedCompany(null);
  };

  // Add before the return statement
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
    <div className="dashboard" style={{ padding: '2rem', position: 'relative' }}>
      {/* Incoming Call Notification */}
      {showIncomingCall && (
        <div style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          background: '#fff',
          padding: '1rem',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 1000
        }}>
          <div style={{ fontSize: '24px' }}>📞</div>
          <div>
            <div style={{ fontWeight: 600 }}>Incoming call from Sara Lee</div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleAnswerCall}
              style={{
                padding: '8px 16px',
                background: '#4CAF50',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Answer
            </button>
            <button
              onClick={() => setShowIncomingCall(false)}
              style={{
                padding: '8px 16px',
                background: '#F44336',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Reject
            </button>
          </div>
        </div>
      )}

      {/* Video Call Interface */}
      {showVideoCall && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '70vh',
          background: '#1a1a1a',
          borderRadius: '12px',
          zIndex: 1001,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1rem'
        }}>
          {/* Main Video Area */}
          <div style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            fontSize: '1.2rem'
          }}>
            {isCameraEnabled ? 'Camera View' : 'Camera Disabled'}
          </div>

          {/* Control Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '12px'
          }}>
            {/* Camera Toggle */}
            <button
              onClick={() => setIsCameraEnabled(!isCameraEnabled)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                background: isCameraEnabled ? '#fff' : '#666',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}
            >
              {isCameraEnabled ? '📹' : '🚫'}
            </button>

            {/* Microphone Toggle */}
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                position: 'relative'
              }}
            >
              🎤
              {isMicMuted && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                  width: '2px',
                  height: '30px',
                  background: '#F44336'
                }}/>
              )}
            </button>

            {/* Screen Share */}
            <button
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                background: isScreenSharing ? '#E8B4B8' : '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}
            >
              💻
            </button>

            {/* End Call */}
            <button
              onClick={handleEndCall}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: 'none',
                background: '#F44336',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}
            >
              📞
            </button>
          </div>
        </div>
      )}

      {/* Caller Left Message */}
      {showCallerLeft && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#F44336',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          Caller has left
        </div>
      )}

      {/* Company Registration Details Modal */}
      {showCompanyDetails && selectedCompany && (
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
            borderRadius: '12px',
            width: '90%',
            maxWidth: '1200px',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button 
              onClick={() => {
                setShowCompanyDetails(false);
                setSelectedCompany(null);
              }}
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
            <CompanyRegistrationView 
              company={selectedCompany}
              onApprove={handleApproveCompany}
              onReject={handleRejectCompany}
            />
          </div>
        </div>
      )}

      {/* 1. Dashboard Overview / Summary Cards */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Registered Students</div>
          <div style={{ fontSize: 32, color: '#E8B4B8', fontWeight: 700 }}>{summary.students}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Approved Internships</div>
          <div style={{ fontSize: 32, color: '#4CAF50', fontWeight: 700 }}>{summary.approvedInternships}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Pending Applications</div>
          <div style={{ fontSize: 32, color: '#FFD700', fontWeight: 700 }}>{summary.pendingApplications}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Submitted Reports</div>
          <div style={{ fontSize: 32, color: '#2196F3', fontWeight: 700 }}>{summary.submittedReports}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Active Companies</div>
          <div style={{ fontSize: 32, color: '#4CAF50', fontWeight: 700 }}>{summary.activeCompanies}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Pending Companies</div>
          <div style={{ fontSize: 32, color: '#FFD700', fontWeight: 700 }}>{summary.pendingCompanies}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee', position: 'relative' }}>
          <div style={{ fontSize: 18, fontWeight: 600 }}>Ongoing Internships</div>
          <div style={{ fontSize: 32, color: '#A49393', fontWeight: 700 }}>{summary.ongoingInternships}</div>
        </div>
        {/* Add Notification Box */}
        <div 
          style={{ 
            background: '#fff', 
            borderRadius: 10, 
            padding: 20, 
            flex: 1, 
            textAlign: 'center', 
            boxShadow: '0 2px 8px #eee',
            cursor: 'pointer',
            position: 'relative'
          }}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <div style={{ fontSize: 18, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span>Notifications</span>
            <div style={{ position: 'relative' }}>
              🔔
              {notifications.some(n => n.type === 'video_call' && n.status === 'pending') && (
                <span style={{ 
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#F44336',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '16px',
                  height: '16px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  !
                </span>
              )}
            </div>
          </div>
          <div style={{ fontSize: 32, color: '#E8B4B8', fontWeight: 700 }}>{notifications.length}</div>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              padding: '1rem',
              width: '300px',
              marginTop: '0.5rem',
              zIndex: 1000,
              textAlign: 'left'
            }}>
              {notifications.map(notification => (
                <div key={notification.id} style={{
                  padding: '0.75rem',
                  borderBottom: '1px solid #eee',
                  lastChild: { borderBottom: 'none' }
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>{notification.message}</div>
                  {notification.type === 'video_call' && notification.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAcceptVideoCall();
                        }}
                        style={{
                          padding: '4px 12px',
                          background: '#4CAF50',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRejectVideoCall();
                        }}
                        style={{
                          padding: '4px 12px',
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
                  )}
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '0.5rem' }}>{notification.date}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date/Time Selection Dialog */}
      {showDateTimeDialog && (
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
            padding: '20px',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 15px', color: '#67595E' }}>Choose Date and Time</h3>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#67595E' }}>Date:</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#67595E' }}>Time:</label>
              <input 
                type="time" 
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{ 
                  width: '100%',
                  padding: '8px',
                  borderRadius: '6px',
                  border: '1px solid #ccc'
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setShowDateTimeDialog(false)}
                style={{ 
                  padding: '8px 16px',
                  border: '1px solid #ccc',
                  borderRadius: '6px',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleDateTimeSubmit}
                style={{ 
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#E8B4B8',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Appointment Made Message */}
      {appointmentMade && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#4CAF50',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          Appointment made!
        </div>
      )}

      {/* Appointment Requested Message */}
      {appointmentRequested && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: '#E8B4B8',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}>
          Appointment requested
        </div>
      )}

      {/* 2. Student Management */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Student Management</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <input type="text" placeholder="Filter by ID" value={studentFilter.id} onChange={e => setStudentFilter({ ...studentFilter, id: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }} />
          <select value={studentFilter.major} onChange={e => setStudentFilter({ ...studentFilter, major: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Majors</option>
            <option value="CS">CS</option>
            <option value="DS">DS</option>
          </select>
          <select value={studentFilter.status} onChange={e => setStudentFilter({ ...studentFilter, status: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Major</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Supervisor</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Logbook</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Report</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, idx) => (
              <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{s.id}</td>
                <td style={{ padding: 12 }}>{s.name}</td>
                <td style={{ padding: 12 }}>{s.major}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[s.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{s.status}</span></td>
                <td style={{ padding: 12 }}>{s.supervisor}</td>
                <td style={{ padding: 12 }}>{s.logbook}</td>
                <td style={{ padding: 12 }}>{s.report}</td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>View Profile</button>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Assign Supervisor</button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => handleRequestAppointment(s)}
                    style={{ 
                      marginRight: 8,
                      background: '#E8B4B8',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Request Video Call
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 3. Company Management */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Company Management</h3>
        <select 
          value={companyFilter} 
          onChange={e => setCompanyFilter(e.target.value)} 
          style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc', marginBottom: 8 }}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Industry</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Size</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Registration Date</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((c) => (
              <tr key={c.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{c.name}</td>
                <td style={{ padding: 12 }}>{c.industry}</td>
                <td style={{ padding: 12 }}>{c.companySize}</td>
                <td style={{ padding: 12 }}>{c.registrationDate}</td>
                <td style={{ padding: 12 }}>
                  <span style={{ 
                    background: statusColors[c.status] || '#ccc', 
                    color: '#fff', 
                    borderRadius: 8, 
                    padding: '2px 10px' 
                  }}>
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: 12 }}>
                  <button 
                    className="btn btn-secondary" 
                    style={{ marginRight: 8 }}
                    onClick={() => handleViewCompany(c)}
                  >
                    View Details
                  </button>
                  {c.status === 'Pending' && (
                    <>
                      <button 
                        className="btn btn-primary" 
                        style={{ marginRight: 8 }}
                        onClick={() => handleApproveCompany(c)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        style={{ color: '#F44336', borderColor: '#F44336' }}
                        onClick={() => handleRejectCompany(c)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {c.status === 'Active' && (
                    <button 
                      className="btn btn-secondary" 
                      style={{ color: '#F44336', borderColor: '#F44336' }}
                    >
                      Deactivate
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Internship Applications */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Internship Applications</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
          <select value={appFilter.company} onChange={e => setAppFilter({ ...appFilter, company: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Companies</option>
            {companies.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
          <select value={appFilter.student} onChange={e => setAppFilter({ ...appFilter, student: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Students</option>
            {students.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <select value={appFilter.status} onChange={e => setAppFilter({ ...appFilter, status: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Company</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Docs</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((a, idx) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{a.student}</td>
                <td style={{ padding: 12 }}>{a.company}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[a.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{a.status}</span></td>
                <td style={{ padding: 12 }}>{a.date}</td>
                <td style={{ padding: 12 }}>{a.docs ? <a href="#">View</a> : '-'}</td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-primary" style={{ marginRight: 8 }}>Approve</button>
                  <button className="btn btn-secondary" style={{ marginRight: 8, color: '#F44336', borderColor: '#F44336' }}>Reject</button>
                  <button className="btn btn-secondary">Request Resubmission</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 5. Logbook Monitoring */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Logbook Monitoring</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Supervisor</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {logbooks.map((l, idx) => (
              <tr key={l.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{l.student}</td>
                <td style={{ padding: 12 }}>{l.supervisor}</td>
                <td style={{ padding: 12 }}>{l.date}</td>
                <td style={{ padding: 12 }}><span style={{ background: l.status === 'Late' ? '#F44336' : '#4CAF50', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{l.status}</span></td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Export</button>
                  <button className="btn btn-secondary">Detect Issues</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6. Final Report Tracking */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Final Report Tracking</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Reviewer</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Grade</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r, idx) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{r.student}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[r.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{r.status}</span></td>
                <td style={{ padding: 12 }}>{r.reviewer || '-'}</td>
                <td style={{ padding: 12 }}>{r.grade || '-'}</td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Download</button>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Mark Reviewed</button>
                  <button className="btn btn-secondary">Assign Reviewer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 7. Notifications & Messaging */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Notifications & Messaging</h3>
        <button className="btn btn-primary" style={{ marginBottom: 8 }}>Send Announcement</button>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {notifications.map((n, idx) => (
            <li key={n.id} style={{ marginBottom: 8, padding: 8, background: '#fafafa', borderRadius: 6, borderLeft: `4px solid ${n.type === 'announcement' ? '#E8B4B8' : '#FFD700'}` }}>
              {n.message} <span style={{ color: '#A49393', fontSize: 13, float: 'right' }}>{n.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Deadlines & Scheduling */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Deadlines & Scheduling</h3>
        <button className="btn btn-primary" style={{ marginBottom: 8 }}>Set New Deadline</button>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {deadlines.map((d, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <b>{d.type}:</b> {d.date}
            </li>
          ))}
        </ul>
      </div>

      {/* 9. Requests & Exceptions */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Requests & Exceptions</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Type</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, idx) => (
              <tr key={r.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{r.type}</td>
                <td style={{ padding: 12 }}>{r.student}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[r.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{r.status}</span></td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Approve</button>
                  <button className="btn btn-secondary" style={{ color: '#F44336', borderColor: '#F44336' }}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 10. Data Export & Reporting */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Data Export & Reporting</h3>
        <button className="btn btn-primary" style={{ marginRight: 8 }}>Export Student Status</button>
        <button className="btn btn-primary" style={{ marginRight: 8 }}>Export Application History</button>
        <button className="btn btn-primary">Export Logbook Summaries</button>
        <div style={{ marginTop: 8 }}>
          <button 
            className="btn btn-secondary"
            onClick={() => setShowReport(true)}
          >
            Generate University Report
          </button>
        </div>
      </div>

      {/* 11. Admin Tools */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Admin Tools</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((a, idx) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{a.name}</td>
                <td style={{ padding: 12 }}>{a.email}</td>
                <td style={{ padding: 12 }}><span style={{ background: statusColors[a.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px' }}>{a.status}</span></td>
                <td style={{ padding: 12 }}>
                  <button className="btn btn-secondary" style={{ marginRight: 8 }}>Deactivate</button>
                  <button className="btn btn-secondary">Reset Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 8 }}>
          <button className="btn btn-secondary" style={{ marginRight: 8 }}>Adjust System Rules</button>
          <button className="btn btn-secondary">System Backup/Reset</button>
        </div>
      </div>

      {/* 12. Help & Support */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <h3>Help & Support</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {helpLinks.map((link, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>{link.label}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Add the report component */}
      <UniversityReport />
    </div>
  );
};

export default SCADOfficeDashboard; 