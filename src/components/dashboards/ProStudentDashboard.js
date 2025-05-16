import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import SuggestedCompanies from '../companies/SuggestedCompanies';
import StudentProfile from '../profile/StudentProfile';
import MajorsList from '../majors/MajorsList';
import AppliedInternships from '../internships/AppliedInternships';

// Mock data for demonstration
const studentProfile = {
  name: 'John Doe',
  id: '20231234',
  email: 'john.doe@email.com',
  major: 'Computer Science',
  profilePic: '',
  internshipTerm: 'Summer 2025',
  internshipStatus: 'Applied',
  assignedCompany: 'Tech Innovators Inc.',
  assignedSupervisor: 'Dr. Smith',
  internshipDuration: 'May 2025 - August 2025',
  currentPhase: 'In Progress',
};

const applications = [
  { company: 'Tech Innovators Inc.', date: '2024-05-01', status: 'Pending', canWithdraw: true },
  { company: 'Creative Solutions LLC', date: '2024-04-15', status: 'Approved', canWithdraw: false },
  { company: 'Green Energy Corp.', date: '2024-03-20', status: 'Rejected', canWithdraw: false },
];

const logbook = {
  daysCompleted: 45,
  daysRequired: 60,
  lastLogDate: '2024-05-10',
};

const finalReport = {
  status: 'Submitted',
  downloadUrl: '#',
  feedback: 'Well written, minor formatting issues.',
  grade: 'A-',
  assessmentScore: null,
};

const codingProblem = {
  question: `What is the output of this code:
  
int x = 5;
for(int i = 0; i < 3; i++) {
    x += i;
    if(i == 1) continue;
    x *= 2;
}
print(x);`,
  correctAnswer: "26",
};

const todos = [
  { task: "Submit today's logbook", deadline: '2024-05-11', urgent: true },
  { task: 'Upload final report', deadline: '2024-05-20', urgent: false },
  { task: 'Review supervisor feedback', deadline: '2024-05-15', urgent: false },
];

const notifications = [
  { id: 1, from: 'SCAD Office', message: 'SCAD member appointment request', date: '2024-05-09', type: 'appointment' },
  { from: 'Admin', message: 'Internship fair next week!', date: '2024-05-09' },
  { from: 'Supervisor', message: 'Please update your logbook daily.', date: '2024-05-08' },
  { from: 'System', message: 'Your application was approved.', date: '2024-05-07' },
];

const usefulLinks = [
  { label: 'Internship Guide', url: '#' },
  { label: 'FAQs', url: '#' },
  { label: 'Support Contact', url: '#' },
  { label: 'Company Portal', url: '#' },
  { label: 'Suggested Companies', url: '/suggested-companies' },
];

const statusColors = {
  Pending: '#FFD700',
  Approved: '#4CAF50',
  Rejected: '#F44336',
};

const urgencyColors = {
  true: '#F44336',
  false: '#FFD700',
};

const videoCallAppointments = [
  { 
    id: 1, 
    requestedBy: 'SCAD Office',
    requestedFor: 'John Doe',
    status: 'Pending',
    date: '2024-05-15',
    time: '10:00 AM',
    duration: '30 minutes'
  }
];

const ProStudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const logbookProgress = Math.round((logbook.daysCompleted / logbook.daysRequired) * 100);
  const [appointments, setAppointments] = useState(videoCallAppointments);
  const [showAppointmentDialog, setShowAppointmentDialog] = useState(false);
  const [showDateTimeDialog, setShowDateTimeDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentMade, setAppointmentMade] = useState(false);
  const [showIncomingCall, setShowIncomingCall] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(true);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showCallerLeft, setShowCallerLeft] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [assessmentAnswer, setAssessmentAnswer] = useState('');
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const [finalReportState, setFinalReportState] = useState(finalReport);

  const handleRequestAppointment = () => {
    setAppointmentMade(true);
    setTimeout(() => setAppointmentMade(false), 3000);
  };

  return (
    <Routes>
      <Route path="/" element={
        <div className="dashboard" style={{ display: 'flex', gap: '2rem' }}>
          {/* Sidebar/Card */}
          <div style={{ minWidth: 260, maxWidth: 320 }}>
            <div style={{ background: '#EED6D3', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center' }}>
              {studentProfile.profilePic ? (
                <img src={studentProfile.profilePic} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #A49393', marginBottom: 12 }} />
              ) : (
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#A49393', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 12px' }}>
                  {user?.name?.[0] || 'P'}
                </div>
              )}
              <h3 style={{ margin: '8px 0 4px' }}>{user?.name || studentProfile.name}</h3>
              <div style={{ fontSize: 14, color: '#67595E' }}>{studentProfile.major}</div>
              <div style={{ fontSize: 13, color: '#A49393', margin: '8px 0' }}>{studentProfile.email}</div>
              <div style={{ fontSize: 13, color: '#A49393' }}>ID: {studentProfile.id}</div>
              <div style={{ margin: '12px 0 0', fontWeight: 500 }}>Internship: <br />{studentProfile.internshipDuration}</div>
              <div style={{ margin: '8px 0 0', fontWeight: 500 }}>Phase: <span style={{ color: '#4CAF50' }}>{studentProfile.currentPhase}</span></div>
              <div style={{ margin: '8px 0 0', fontWeight: 500, color: '#E8B4B8' }}>Pro Student</div>
            </div>

            {/* Useful Links */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee' }}>
              <h4 style={{ margin: '0 0 10px' }}>Useful Links</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {usefulLinks.map((link, idx) => (
                  <li key={idx} style={{ marginBottom: 8 }}>
                    <a href={link.url || "#!"} target="_blank" rel="noopener noreferrer" style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>{link.label}</a>
                  </li>
                ))}
                <li style={{ marginBottom: 8 }}>
                  <button
                    onClick={() => navigate('/pro-student-dashboard/majors')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#A49393',
                      textDecoration: 'underline',
                      fontSize: 15,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    View Majors List
                  </button>
                </li>
              </ul>
            </div>

            {/* Profile Views Box */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee', marginTop: 16 }}>
              <h4 style={{ margin: '0 0 10px' }}>Profile Views</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8, color: '#67595E', fontSize: 15 }}>Giza Systems</li>
                <li style={{ marginBottom: 8, color: '#67595E', fontSize: 15 }}>Elsewedy Electric</li>
                <li style={{ marginBottom: 8, color: '#67595E', fontSize: 15 }}>Siemens</li>
                <li style={{ marginBottom: 8, color: '#67595E', fontSize: 15 }}>Valeo</li>
              </ul>
            </div>

            {/* Online Assessments Box */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee', marginTop: 16 }}>
              <h4 style={{ margin: '0 0 10px' }}>Online Assessments</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: 8 }}>
                  <button 
                    onClick={() => setShowAssessment(true)}
                    style={{ 
                      background: 'none',
                      border: 'none',
                      color: '#A49393',
                      textDecoration: 'underline',
                      fontSize: 15,
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    Online Assessment 1
                  </button>
                </li>
              </ul>
            </div>

            {/* Add Applied Internships Link */}
            <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee', marginTop: 16 }}>
              <h4 style={{ margin: '0 0 10px' }}>Internships</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button
                    onClick={() => navigate('/pro-student-dashboard/applied-internships')}
                    style={{
                      background: '#E8B4B8',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      width: '49%',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    View My Applications
                  </button>
                  <button
                    onClick={() => navigate('/pro-student-dashboard/available-internships')}
                    style={{
                      background: '#67595E',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '8px 16px',
                      width: '49%',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    Browse Available Internships
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Welcome Banner */}
            <div className="dashboard-banner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', background: '#EED6D3', padding: '1.5rem', borderRadius: '12px' }}>
              <div>
                <h2 style={{ margin: 0 }}>Welcome, {user?.name || studentProfile.name}!</h2>
                <div style={{ color: '#67595E', marginTop: 4 }}>Pro Student Dashboard</div>
                <div style={{ color: '#67595E', marginTop: 4 }}>Internship Term: <b>{studentProfile.internshipTerm}</b></div>
                <div style={{ marginTop: 4 }}>
                  Internship Status: <span style={{ background: statusColors[studentProfile.internshipStatus] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px', fontWeight: 600 }}>{studentProfile.internshipStatus}</span>
                </div>
                {studentProfile.assignedCompany && (
                  <div style={{ marginTop: 4 }}>Assigned Company: <b>{studentProfile.assignedCompany}</b></div>
                )}
                {studentProfile.assignedSupervisor && (
                  <div style={{ marginTop: 4 }}>Supervisor: <b>{studentProfile.assignedSupervisor}</b></div>
                )}
              </div>
              <button
                onClick={() => navigate('/pro-student-dashboard/profile')}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#E8B4B8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>👤</span>
                View/Update Profile
              </button>
            </div>

            {/* Logbook Section */}
            <div className="dashboard-section" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>Logbook</h3>
                <button className="btn btn-primary" style={{ fontSize: 15 }}>Fill Today's Logbook</button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 8 }}>
                <span>Days completed: <b>{logbook.daysCompleted}</b> / {logbook.daysRequired}</span>
                <span>Last log: <b>{logbook.lastLogDate}</b></span>
                <button 
                  onClick={(e) => e.preventDefault()}
                  style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15, background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  View All Logs
                </button>
              </div>
              {/* Progress bar */}
              <div style={{ background: '#eee', borderRadius: 8, height: 18, width: '100%', margin: '8px 0 0' }}>
                <div style={{ width: `${logbookProgress}%`, background: '#E8B4B8', height: '100%', borderRadius: 8, textAlign: 'right', color: '#fff', fontWeight: 600, fontSize: 13, paddingRight: 8 }}>
                  {logbookProgress}%
                </div>
              </div>
            </div>

            {/* Final Report Section */}
            <div className="dashboard-section" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>Final Report</h3>
                <button className="btn btn-primary" style={{ fontSize: 15 }}>Upload Final Report</button>
              </div>
              <div>Status: <b>{finalReportState.status}</b></div>
              {finalReportState.downloadUrl && (
                <div><a href={finalReportState.downloadUrl} style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>Download Uploaded Report</a></div>
              )}
              {finalReportState.feedback && (
                <div>Feedback: <span style={{ color: '#4CAF50' }}>{finalReportState.feedback}</span></div>
              )}
              {finalReportState.grade && (
                <div>Grade: <span style={{ color: '#FFD700', fontWeight: 600 }}>{finalReportState.grade}</span></div>
              )}
              {finalReportState.assessmentScore && (
                <div>Online Assessment Score: <span style={{ color: '#4CAF50', fontWeight: 600 }}>{finalReportState.assessmentScore}</span></div>
              )}
            </div>

            {/* To-Do List / Reminders */}
            <div className="dashboard-section" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>To-Do List</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {todos.map((todo, idx) => (
                  <li key={idx} style={{ 
                    marginBottom: 8, 
                    padding: 8, 
                    background: '#fafafa', 
                    borderRadius: 6,
                    borderLeft: `4px solid ${urgencyColors[todo.urgent]}`
                  }}>
                    {todo.task}
                    <span style={{ color: '#A49393', fontSize: 13, float: 'right' }}>Due: {todo.deadline}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Notifications */}
            <div className="dashboard-section" style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ margin: 0 }}>Notifications</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {notifications.map((note, idx) => (
                  <li key={idx} style={{ 
                    marginBottom: 8, 
                    padding: 8, 
                    background: '#fafafa', 
                    borderRadius: 6,
                    borderLeft: `4px solid ${note.from === 'Admin' ? '#E8B4B8' : note.from === 'Supervisor' ? '#4CAF50' : '#A49393'}`
                  }}>
                    <b>{note.from}:</b> {note.message}
                    {note.type === 'appointment' && (
                      <button
                        onClick={() => setShowDateTimeDialog(true)}
                        style={{
                          float: 'right',
                          padding: '4px 12px',
                          background: '#E8B4B8',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          marginLeft: '8px'
                        }}
                      >
                        Respond
                      </button>
                    )}
                    <span style={{ color: '#A49393', fontSize: 13, float: 'right' }}>{note.date}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications Table */}
            <div className="dashboard-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h2 style={{ margin: 0 }}>My Internship Applications</h2>
                <button className="btn btn-primary" style={{ fontSize: 16, padding: '0.5rem 1.5rem' }}>Apply to New Company</button>
              </div>
              {/* Chart for application statuses (mock) */}
              <div style={{ marginBottom: 16 }}>
                <span style={{ fontWeight: 500 }}>Application Statuses: </span>
                <span style={{ background: statusColors['Pending'], color: '#fff', borderRadius: 8, padding: '2px 10px', marginRight: 8 }}>Pending: {applications.filter(a => a.status === 'Pending').length}</span>
                <span style={{ background: statusColors['Approved'], color: '#fff', borderRadius: 8, padding: '2px 10px', marginRight: 8 }}>Approved: {applications.filter(a => a.status === 'Approved').length}</span>
                <span style={{ background: statusColors['Rejected'], color: '#fff', borderRadius: 8, padding: '2px 10px' }}>Rejected: {applications.filter(a => a.status === 'Rejected').length}</span>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
                  <thead style={{ background: '#E8B4B8' }}>
                    <tr>
                      <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Company</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Date</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Status</th>
                      <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map((app, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: 12 }}>{app.company}</td>
                        <td style={{ padding: 12 }}>{app.date}</td>
                        <td style={{ padding: 12 }}>
                          <span style={{ background: statusColors[app.status], color: '#fff', borderRadius: 8, padding: '2px 10px' }}>
                            {app.status}
                          </span>
                        </td>
                        <td style={{ padding: 12 }}>
                          {app.canWithdraw && (
                            <button className="btn btn-danger" style={{ fontSize: 14, padding: '4px 12px' }}>Withdraw</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Assessment Modal */}
          {showAssessment && (
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
                width: '60%',
                maxHeight: '80vh',
                overflowY: 'auto',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h3 style={{ margin: 0, color: '#67595E' }}>Online Assessment 1</h3>
                  <button 
                    onClick={() => {
                      setShowAssessment(false);
                      setAssessmentAnswer('');
                    }}
                    style={{ 
                      background: 'none',
                      border: 'none',
                      fontSize: '20px',
                      cursor: 'pointer',
                      color: '#67595E'
                    }}
                  >
                    ×
                  </button>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <pre style={{ 
                    background: '#f5f5f5',
                    padding: '15px',
                    borderRadius: '8px',
                    overflowX: 'auto',
                    fontFamily: 'monospace'
                  }}>
                    {codingProblem.question}
                  </pre>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Your Answer:</label>
                  <input 
                    type="text"
                    value={assessmentAnswer}
                    onChange={(e) => setAssessmentAnswer(e.target.value)}
                    style={{ 
                      width: '100%',
                      padding: '8px',
                      borderRadius: '6px',
                      border: '1px solid #ccc'
                    }}
                    placeholder="Enter your answer..."
                  />
                </div>
                <button 
                  onClick={() => {
                    if (assessmentAnswer === codingProblem.correctAnswer) {
                      setShowScoreDialog(true);
                      setShowAssessment(false);
                    } else {
                      alert('Incorrect answer. Try again!');
                    }
                  }}
                  style={{ 
                    padding: '8px 16px',
                    background: '#E8B4B8',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  Submit Answer
                </button>
              </div>
            </div>
          )}

          {/* Score Dialog */}
          {showScoreDialog && (
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
                <h3 style={{ margin: '0 0 15px', color: '#67595E', textAlign: 'center' }}>Congratulations!</h3>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>You scored 5/5.</p>
                <p style={{ textAlign: 'center', marginBottom: '20px' }}>Would you like to share your score?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                  <button 
                    onClick={() => setShowScoreDialog(false)}
                    style={{ 
                      padding: '8px 16px',
                      background: '#E8B4B8',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Share Score
                  </button>
                  <button 
                    onClick={() => setShowScoreDialog(false)}
                    style={{ 
                      padding: '8px 16px',
                      background: '#ccc',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

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
                      background: '#ccc',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      setShowDateTimeDialog(false);
                      // Handle appointment scheduling here
                    }}
                    style={{ 
                      padding: '8px 16px',
                      background: '#E8B4B8',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Schedule
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      } />
      <Route path="/suggested-companies" element={<SuggestedCompanies />} />
      <Route path="/profile" element={<StudentProfile />} />
      <Route path="/majors" element={<MajorsList />} />
      <Route
        path="/applied-internships"
        element={<AppliedInternships />}
      />
    </Routes>
  );
};

export default ProStudentDashboard; 