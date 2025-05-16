import React, { useState } from 'react';

const internshipStatusColors = {
  'Pending': '#FFD700',
  'Accepted': '#4CAF50',
  'Finalized': '#2196F3',
  'Rejected': '#F44336',
};

const applicantStatusColors = {
  'Applied': '#FFD700',
  'Current Intern': '#2196F3',
  'Internship Complete': '#9C27B0',
};

// Mock data
const mockInternships = [
  { id: 1, title: 'Frontend Developer', description: 'React-based web app', duration: '3 months', location: 'Remote', field: 'Web Development', deadline: '2024-06-01' },
  { id: 2, title: 'Data Analyst', description: 'Data visualization and reporting', duration: '6 months', location: 'On-site', field: 'Data Science', deadline: '2024-07-15' },
];

const mockApplications = [
  { 
    id: 1, 
    studentName: 'John Doe', 
    studentId: '20231234', 
    major: 'Computer Science', 
    date: '2024-05-10', 
    internshipStatus: 'Pending',
    applicantStatus: 'Applied',
    cv: '#', 
    post: 'Frontend Developer' 
  },
  { 
    id: 2, 
    studentName: 'Sara Lee', 
    studentId: '20231235', 
    major: 'Data Science', 
    date: '2024-05-09', 
    internshipStatus: 'Finalized',
    applicantStatus: 'Current Intern',
    cv: '#', 
    post: 'Data Analyst' 
  },
  { 
    id: 3, 
    studentName: 'Ali Hassan', 
    studentId: '20231236', 
    major: 'Computer Science', 
    date: '2024-05-08', 
    internshipStatus: 'Rejected',
    applicantStatus: 'Applied',
    cv: '#', 
    post: 'Frontend Developer' 
  },
];

const Applications = () => {
  const [applications, setApplications] = useState(mockApplications);
  const [internships] = useState(mockInternships);
  const [filter, setFilter] = useState({ 
    major: '', 
    internshipStatus: '', 
    applicantStatus: '', 
    position: '', 
    search: '', 
    post: '' 
  });

  const updateInternshipStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, internshipStatus: newStatus } : app
    ));
  };

  const updateApplicantStatus = (applicationId, newStatus) => {
    setApplications(applications.map(app => 
      app.id === applicationId ? { ...app, applicantStatus: newStatus } : app
    ));
  };

  const viewApplicantDetails = (app) => {
    // Implement view details functionality
    console.log('Viewing details for:', app);
  };

  const filteredApplications = applications.filter(app =>
    (!filter.major || app.major === filter.major) &&
    (!filter.internshipStatus || app.internshipStatus === filter.internshipStatus) &&
    (!filter.applicantStatus || app.applicantStatus === filter.applicantStatus) &&
    (!filter.position || internships.find(i => i.title === filter.position)) &&
    (!filter.post || app.post === filter.post) &&
    (!filter.search || 
      app.studentName.toLowerCase().includes(filter.search.toLowerCase()) || 
      app.post.toLowerCase().includes(filter.search.toLowerCase()))
  );

  return (
    <div className="applications-page" style={{ padding: 24 }}>
      <h2>Student Applications</h2>

      {/* Summary Cards */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1, background: '#fff', padding: 16, borderRadius: 8 }}>
          <h4>Total Applications</h4>
          <p>{applications.length}</p>
        </div>
        <div style={{ flex: 1, background: '#fff', padding: 16, borderRadius: 8 }}>
          <h4>Pending Applications</h4>
          <p>{applications.filter(a => a.internshipStatus === 'Pending').length}</p>
        </div>
        <div style={{ flex: 1, background: '#fff', padding: 16, borderRadius: 8 }}>
          <h4>Accepted Applications</h4>
          <p>{applications.filter(a => a.internshipStatus === 'Accepted').length}</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="applications-section">
        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <input
            type="text"
            placeholder="Search by name or job title"
            value={filter.search}
            onChange={e => setFilter({ ...filter, search: e.target.value })}
            style={{ minWidth: '200px' }}
          />
          <select 
            value={filter.internshipStatus} 
            onChange={e => setFilter({ ...filter, internshipStatus: e.target.value })}
          >
            <option value="">All Internship Statuses</option>
            {Object.keys(internshipStatusColors).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select 
            value={filter.applicantStatus} 
            onChange={e => setFilter({ ...filter, applicantStatus: e.target.value })}
          >
            <option value="">All Applicant Statuses</option>
            {Object.keys(applicantStatusColors).map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select 
            value={filter.post} 
            onChange={e => setFilter({ ...filter, post: e.target.value })}
          >
            <option value="">All Posts</option>
            {internships.map(internship => (
              <option key={internship.id} value={internship.title}>{internship.title}</option>
            ))}
          </select>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12 }}>Student Name</th>
              <th style={{ padding: 12 }}>ID</th>
              <th style={{ padding: 12 }}>Major</th>
              <th style={{ padding: 12 }}>Post</th>
              <th style={{ padding: 12 }}>Date</th>
              <th style={{ padding: 12 }}>Internship Status</th>
              <th style={{ padding: 12 }}>Applicant Status</th>
              <th style={{ padding: 12 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map(app => (
              <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{app.studentName}</td>
                <td style={{ padding: 12 }}>{app.studentId}</td>
                <td style={{ padding: 12 }}>{app.major}</td>
                <td style={{ padding: 12 }}>{app.post}</td>
                <td style={{ padding: 12 }}>{app.date}</td>
                <td style={{ padding: 12 }}>
                  <select
                    value={app.internshipStatus}
                    onChange={e => updateInternshipStatus(app.id, e.target.value)}
                    style={{ 
                      padding: 6, 
                      borderRadius: 6,
                      backgroundColor: internshipStatusColors[app.internshipStatus] || '#ccc',
                      color: '#fff',
                      border: 'none'
                    }}
                  >
                    {Object.keys(internshipStatusColors).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: 12 }}>
                  <select
                    value={app.applicantStatus}
                    onChange={e => updateApplicantStatus(app.id, e.target.value)}
                    style={{ 
                      padding: 6, 
                      borderRadius: 6,
                      backgroundColor: applicantStatusColors[app.applicantStatus] || '#ccc',
                      color: '#fff',
                      border: 'none'
                    }}
                  >
                    {Object.keys(applicantStatusColors).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: 12 }}>
                  <button
                    onClick={() => viewApplicantDetails(app)}
                    style={{
                      background: '#E8B4B8',
                      color: '#fff',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: 6,
                      cursor: 'pointer'
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Applications; 