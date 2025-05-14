import React, { useState } from 'react';

// Mock data
const companyProfile = {
  name: 'Tech Innovators Inc.',
  logo: '', // Add a logo URL if available
  email: 'contact@techinnovators.com',
  contactPerson: 'Jane Smith',
  contactRole: 'HR Manager',
  type: 'Technology',
  industry: 'Software Development',
};

const internships = [
  { id: 1, title: 'Frontend Developer', description: 'React-based web app', duration: '3 months', location: 'Remote', field: 'Web Development', deadline: '2024-06-01' },
  { id: 2, title: 'Data Analyst', description: 'Data visualization and reporting', duration: '6 months', location: 'On-site', field: 'Data Science', deadline: '2024-07-15' },
];

const applications = [
  { id: 1, studentName: 'John Doe', studentId: '20231234', major: 'Computer Science', date: '2024-05-10', status: 'Pending', cv: '#' },
  { id: 2, studentName: 'Sara Lee', studentId: '20231235', major: 'Data Science', date: '2024-05-09', status: 'Accepted', cv: '#' },
  { id: 3, studentName: 'Ali Hassan', studentId: '20231236', major: 'Computer Science', date: '2024-05-08', status: 'Rejected', cv: '#' },
];

const acceptedStudents = [
  { name: 'Sara Lee', email: 'sara.lee@email.com', start: '2024-06-10', end: '2024-09-10' },
];

const notifications = [
  { type: 'application', message: 'New application from John Doe', date: '2024-05-10' },
  { type: 'deadline', message: 'Approve applications for Data Analyst by 2024-07-15', date: '2024-05-09' },
  { type: 'admin', message: 'System maintenance on 2024-05-20', date: '2024-05-08' },
];

const helpLinks = [
  { label: 'FAQ for Companies', url: '#' },
  { label: 'Contact Internship Coordinator', url: '#' },
  { label: 'System Documentation', url: '#' },
];

const statusColors = {
  Pending: '#FFD700',
  Accepted: '#4CAF50',
  Rejected: '#F44336',
};

const CompanyDashboard = () => {
  const [filter, setFilter] = useState({ major: '', status: '', position: '', search: '' });

  // Filtering logic (mock)
  const filteredApplications = applications.filter(app =>
    (!filter.major || app.major === filter.major) &&
    (!filter.status || app.status === filter.status) &&
    (!filter.position || internships.find(i => i.title === filter.position)) &&
    (!filter.search || app.studentName.toLowerCase().includes(filter.search.toLowerCase()) || app.studentId.includes(filter.search))
  );

  // Stats
  const openPositions = internships.length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const acceptedApps = applications.filter(a => a.status === 'Accepted').length;

  return (
    <div className="dashboard" style={{ display: 'flex', gap: '2rem' }}>
      {/* Sidebar: Profile & Help */}
      <div style={{ minWidth: 260, maxWidth: 320 }}>
        {/* Company Profile Overview */}
        <div style={{ background: '#EED6D3', borderRadius: 12, padding: 24, marginBottom: 24, textAlign: 'center' }}>
          {companyProfile.logo ? (
            <img src={companyProfile.logo} alt="Logo" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #A49393', marginBottom: 12 }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#A49393', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 12px' }}>
              {companyProfile.name[0]}
            </div>
          )}
          <h3 style={{ margin: '8px 0 4px' }}>{companyProfile.name}</h3>
          <div style={{ fontSize: 14, color: '#67595E' }}>{companyProfile.type} - {companyProfile.industry}</div>
          <div style={{ fontSize: 13, color: '#A49393', margin: '8px 0' }}>{companyProfile.email}</div>
          <div style={{ fontSize: 13, color: '#A49393' }}>Contact: {companyProfile.contactPerson} ({companyProfile.contactRole})</div>
          <button className="btn btn-secondary" style={{ marginTop: 12 }}>Edit Profile</button>
        </div>
        {/* Help & Support */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee' }}>
          <h4 style={{ margin: '0 0 10px' }}>Help & Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {helpLinks.map((link, idx) => (
              <li key={idx} style={{ marginBottom: 8 }}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#A49393', textDecoration: 'underline', fontSize: 15 }}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        {/* Legal Document Upload */}
<div style={{ marginTop: 20, background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee' }}>
  <h4 style={{ margin: '0 0 10px' }}>Legal Documents</h4>
  <input type="file" accept=".pdf,.doc,.docx,.png,.jpg" />
  <button className="btn btn-secondary" style={{ marginTop: 10 }}>Upload Document</button>
</div>

        {/* Account Controls */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginTop: 24, boxShadow: '0 2px 8px #eee' }}>
          <h4 style={{ margin: '0 0 10px' }}>Account</h4>
          <button className="btn btn-secondary" style={{ width: '100%', marginBottom: 8 }}>Change Password</button>
          <button className="btn btn-secondary" style={{ width: '100%', marginBottom: 8 }}>Log Out</button>
          <button className="btn btn-secondary" style={{ width: '100%', color: '#F44336', borderColor: '#F44336' }}>Deactivate Profile</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Welcome Banner */}
        <div className="dashboard-banner" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', background: '#EED6D3', padding: '1.5rem', borderRadius: '12px' }}>
          <div>
            <h2 style={{ margin: 0 }}>Welcome, {companyProfile.name}!</h2>
            <div style={{ color: '#67595E', marginTop: 4 }}>Manage your internships and student applications efficiently.</div>
          </div>
        </div>

        {/* Internship Status Summary */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
          <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Open Positions</div>
            <div style={{ fontSize: 32, color: '#E8B4B8', fontWeight: 700 }}>{openPositions}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Pending Applications</div>
            <div style={{ fontSize: 32, color: '#FFD700', fontWeight: 700 }}>{pendingApps}</div>
          </div>
          <div style={{ background: '#fff', borderRadius: 10, padding: 20, flex: 1, textAlign: 'center', boxShadow: '0 2px 8px #eee' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Accepted Students</div>
            <div style={{ fontSize: 32, color: '#4CAF50', fontWeight: 700 }}>{acceptedApps}</div>
          </div>
        </div>

        {/* Internship Listings Management */}
        <div className="dashboard-section" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Internship Listings</h3>
            <button className="btn btn-primary">📤 Post New Internship</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
            <thead style={{ background: '#E8B4B8' }}>
              <tr>
                <th style={{ padding: 12, textAlign: 'left' }}>Title</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Description</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Duration</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Location</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Field</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Deadline</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {internships.map((intern, idx) => (
                <tr key={intern.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{intern.title}</td>
                  <td style={{ padding: 12 }}>{intern.description}</td>
                  <td style={{ padding: 12 }}>{intern.duration}</td>
                  <td style={{ padding: 12 }}>{intern.location}</td>
                  <td style={{ padding: 12 }}>{intern.field}</td>
                  <td style={{ padding: 12 }}>{intern.deadline}</td>
                  <td style={{ padding: 12 }}>
                    <button className="btn btn-secondary" style={{ marginRight: 8 }}>✏️ Edit</button>
                    <button className="btn btn-secondary" style={{ marginRight: 8, color: '#F44336', borderColor: '#F44336' }}>🗑️ Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Student Applications Panel + Filtering */}
        <div className="dashboard-section" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Student Applications</h3>
            {/* Filtering & Search */}
            <div style={{ display: 'flex', gap: 8 }}>
              <input type="text" placeholder="Search by name or ID" value={filter.search} onChange={e => setFilter({ ...filter, search: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }} />
              <select value={filter.major} onChange={e => setFilter({ ...filter, major: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
                <option value="">All Majors</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
              </select>
              <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select value={filter.position} onChange={e => setFilter({ ...filter, position: e.target.value })} style={{ padding: 6, borderRadius: 6, border: '1px solid #ccc' }}>
                <option value="">All Positions</option>
                {internships.map(i => <option key={i.id} value={i.title}>{i.title}</option>)}
              </select>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
            <thead style={{ background: '#E8B4B8' }}>
              <tr>
                <th style={{ padding: 12, textAlign: 'left' }}>Student Name</th>
                <th style={{ padding: 12, textAlign: 'left' }}>ID</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Major</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Application Date</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Status</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, idx) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{app.studentName}</td>
                  <td style={{ padding: 12 }}>{app.studentId}</td>
                  <td style={{ padding: 12 }}>{app.major}</td>
                  <td style={{ padding: 12 }}>{app.date}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ background: statusColors[app.status] || '#ccc', color: '#fff', borderRadius: 8, padding: '2px 10px', fontWeight: 600 }}>{app.status}</span>
                  </td>
                  <td style={{ padding: 12 }}>
                    <button className="btn btn-primary" style={{ marginRight: 8 }}>✅ Accept</button>
                    <button className="btn btn-secondary" style={{ marginRight: 8, color: '#F44336', borderColor: '#F44336' }}>❌ Reject</button>
                    <a href={app.cv} className="btn btn-secondary" style={{ marginRight: 8 }}>📄 View CV</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Accepted Students View */}
        <div className="dashboard-section" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ margin: 0 }}>Accepted Students</h3>
            <button className="btn btn-primary">Export List</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
            <thead style={{ background: '#E8B4B8' }}>
              <tr>
                <th style={{ padding: 12, textAlign: 'left' }}>Name</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Email</th>
                <th style={{ padding: 12, textAlign: 'left' }}>Start Date</th>
                <th style={{ padding: 12, textAlign: 'left' }}>End Date</th>
              </tr>
            </thead>
            <tbody>
              {acceptedStudents.map((s, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{s.name}</td>
                  <td style={{ padding: 12 }}>{s.email}</td>
                  <td style={{ padding: 12 }}>{s.start}</td>
                  <td style={{ padding: 12 }}>{s.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notifications Panel */}
        <div className="dashboard-section" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Notifications</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {notifications.map((note, idx) => (
              <li key={idx} style={{ marginBottom: 8, padding: 8, background: '#fafafa', borderRadius: 6, borderLeft: `4px solid ${note.type === 'application' ? '#E8B4B8' : note.type === 'deadline' ? '#FFD700' : '#A49393'}` }}>
                {note.message} <span style={{ color: '#A49393', fontSize: 13, float: 'right' }}>{note.date}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Inbox / Messaging (Optional) */}
        <div className="dashboard-section" style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <h3 style={{ margin: 0 }}>Inbox / Messaging</h3>
          </div>
          <div style={{ background: '#fff', borderRadius: 8, padding: 16, color: '#A49393', textAlign: 'center' }}>
            <span>Direct messages from Admin and Students will appear here. (Feature coming soon!)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard; 