import React from 'react';
import { useAuth } from '../../context/AuthContext';

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
  status: 'Submitted', // Not Uploaded, Submitted, Reviewed
  downloadUrl: '#',
  feedback: 'Well written, minor formatting issues.',
  grade: 'A-',
};

const todos = [
  { task: "Submit today's logbook", deadline: '2024-05-11', urgent: true },
  { task: 'Upload final report', deadline: '2024-05-20', urgent: false },
  { task: 'Review supervisor feedback', deadline: '2024-05-15', urgent: false },
];

const notifications = [
  { from: 'Admin', message: 'Internship fair next week!', date: '2024-05-09' },
  { from: 'Supervisor', message: 'Please update your logbook daily.', date: '2024-05-08' },
  { from: 'System', message: 'Your application was approved.', date: '2024-05-07' },
];

const usefulLinks = [
  { label: 'Internship Guide', url: '#' },
  { label: 'FAQs', url: '#' },
  { label: 'Support Contact', url: '#' },
  { label: 'Company Portal', url: '#' },
];

const statusColors = {
  Pending: '#FFD700',
  Approved: '#4CAF50',
  Rejected: '#F44336',
};

const urgencyColors = {
  true: '#F44336', // urgent
  false: '#FFD700', // not urgent
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const logbookProgress = Math.round((logbook.daysCompleted / logbook.daysRequired) * 100);

  return (
    <div className="dashboard" style={{ display: 'flex', gap: '2rem' }}>
      {/* Sidebar/Card */}
      <div style={{ minWidth: 260, maxWidth: 320 }}>
        <div style={{ background: '#EED6D3', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center' }}>
          {studentProfile.profilePic ? (
            <img src={studentProfile.profilePic} alt="Profile" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #A49393', marginBottom: 12 }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#A49393', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 12px' }}>
              {user?.name?.[0] || 'S'}
            </div>
          )}
          <h3 style={{ margin: '8px 0 4px' }}>{user?.name || studentProfile.name}</h3>
          <div style={{ fontSize: 14, color: '#67595E' }}>{studentProfile.major}</div>
          <div style={{ fontSize: 13, color: '#A49393', margin: '8px 0' }}>{studentProfile.email}</div>
          <div style={{ fontSize: 13, color: '#A49393' }}>ID: {studentProfile.id}</div>
          <div style={{ margin: '12px 0 0', fontWeight: 500 }}>Internship: <br />{studentProfile.internshipDuration}</div>
          <div style={{ margin: '8px 0 0', fontWeight: 500 }}>Phase: <span style={{ color: '#4CAF50' }}>{studentProfile.currentPhase}</span></div>
        </div>
        {/* Useful Links */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee' }}>
          <h4 style={{ margin: '0 0 10px' }}>Useful Links</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {usefulLinks.map((link, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Welcome Banner */}
        <div className="dashboard-banner" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', background: '#EED6D3', padding: '1.5rem', borderRadius: '12px' }}>
          <div>
            <h2 style={{ margin: 0 }}>Welcome, {user?.name || studentProfile.name}!</h2>
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
            <a href="#" style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>View All Logs</a>
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
          <div>Status: <b>{finalReport.status}</b></div>
          {finalReport.downloadUrl && (
            <div><a href={finalReport.downloadUrl} style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>Download Uploaded Report</a></div>
          )}
          {finalReport.feedback && (
            <div>Feedback: <span style={{ color: '#4CAF50' }}>{finalReport.feedback}</span></div>
          )}
          {finalReport.grade && (
            <div>Grade: <span style={{ color: '#FFD700', fontWeight: 600 }}>{finalReport.grade}</span></div>
          )}
        </div>

        {/* To-Do List / Reminders */}
        <div className="dashboard-section" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>To-Do List / Reminders</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {todos.map((todo, idx) => (
              <li key={idx} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ width: 12, height: 12, borderRadius: '50%', background: urgencyColors[todo.urgent], display: 'inline-block' }}></span>
                <span>{todo.task}</span>
                <span style={{ color: '#A49393', fontSize: 13 }}>Deadline: {todo.deadline}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Notifications Panel */}
        <div className="dashboard-section" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Notifications</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {notifications.map((note, idx) => (
              <li key={idx} style={{ marginBottom: 8, padding: 8, background: '#fafafa', borderRadius: 6, cursor: 'pointer', borderLeft: `4px solid ${note.from === 'Admin' ? '#E8B4B8' : note.from === 'Supervisor' ? '#4CAF50' : '#A49393'}` }}>
                <b>{note.from}:</b> {note.message} <span style={{ color: '#A49393', fontSize: 13, float: 'right' }}>{note.date}</span>
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
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
            <thead style={{ background: '#E8B4B8' }}>
              <tr>
                <th style={{ padding: 12, textAlign: 'left' }}>Company Name</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Date of Submission</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{app.company}</td>
                  <td style={{ padding: 12 }}>{app.date}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ background: statusColors[app.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px', fontWeight: 600 }}>{app.status}</span>
                  </td>
                  <td style={{ padding: 12 }}>
                    {app.canWithdraw ? (
                      <button className="btn btn-secondary" style={{ fontSize: 14, padding: '0.3rem 1rem' }}>Withdraw</button>
                    ) : (
                      <span style={{ color: '#aaa' }}>-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 