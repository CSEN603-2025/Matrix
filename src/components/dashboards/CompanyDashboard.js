import React, { useState } from 'react';

// Mock data
const companyProfile = {
  name: 'Tech Innovators Inc.',
  logo: '',
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

const initialApplications = [
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
  'Current Intern': '#2196F3',
  'Internship Complete': '#9C27B0',
};

const CompanyDashboard = () => {
  const [filter, setFilter] = useState({ major: '', status: '', position: '', search: '' });
  const [applications, setApplications] = useState(initialApplications);

  const filteredApplications = applications.filter(app =>
    (!filter.major || app.major === filter.major) &&
    (!filter.status || app.status === filter.status) &&
    (!filter.position || internships.find(i => i.title === filter.position)) &&
    (!filter.search || app.studentName.toLowerCase().includes(filter.search.toLowerCase()) || app.studentId.includes(filter.search))
  );

  const openPositions = internships.length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const acceptedApps = applications.filter(a => a.status === 'Accepted').length;

  const updateStatus = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  return (
    <div className="dashboard" style={{ padding: 24 }}>
      <h2>Welcome, {companyProfile.name}!</h2>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, background: '#fff', padding: 16, borderRadius: 8 }}>
          <h4>Open Positions</h4>
          <p>{openPositions}</p>
        </div>
        <div style={{ flex: 1, background: '#fff', padding: 16, borderRadius: 8 }}>
          <h4>Pending Applications</h4>
          <p>{pendingApps}</p>
        </div>
        <div style={{ flex: 1, background: '#fff', padding: 16, borderRadius: 8 }}>
          <h4>Accepted Students</h4>
          <p>{acceptedApps}</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="dashboard-section">
        <h3>Student Applications</h3>
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Search by name or ID"
            value={filter.search}
            onChange={e => setFilter({ ...filter, search: e.target.value })}
          />
          <select value={filter.status} onChange={e => setFilter({ ...filter, status: e.target.value })}>
            <option value="">All Statuses</option>
            {Object.keys(statusColors).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12 }}>Student Name</th>
              <th style={{ padding: 12 }}>ID</th>
              <th style={{ padding: 12 }}>Major</th>
              <th style={{ padding: 12 }}>Date</th>
              <th style={{ padding: 12 }}>Status</th>
              <th style={{ padding: 12 }}>Change Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => (
              <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{app.studentName}</td>
                <td style={{ padding: 12 }}>{app.studentId}</td>
                <td style={{ padding: 12 }}>{app.major}</td>
                <td style={{ padding: 12 }}>{app.date}</td>
                <td style={{ padding: 12 }}>
                  <span style={{ background: statusColors[app.status] || '#ccc', color: '#fff', padding: '4px 8px', borderRadius: 6 }}>
                    {app.status}
                  </span>
                </td>
                <td style={{ padding: 12 }}>
                  <select
                    value={app.status}
                    onChange={e => updateStatus(app.id, e.target.value)}
                    style={{ padding: 6, borderRadius: 6 }}
                  >
                    {Object.keys(statusColors).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyDashboard;
