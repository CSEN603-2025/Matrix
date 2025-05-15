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

const initialApplications = [
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
  const [filter, setFilter] = useState({ 
    major: '', 
    internshipStatus: '', 
    applicantStatus: '', 
    position: '', 
    search: '', 
    post: '' 
  });
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const filteredApplications = applications.filter(app =>
    (!filter.major || app.major === filter.major) &&
    (!filter.internshipStatus || app.internshipStatus === filter.internshipStatus) &&
    (!filter.applicantStatus || app.applicantStatus === filter.applicantStatus) &&
    (!filter.position || internships.find(i => i.title === filter.position)) &&
    (!filter.post || app.post === filter.post) &&
    (!filter.search || app.studentName.toLowerCase().includes(filter.search.toLowerCase()) || app.studentId.includes(filter.search))
  );

  const openPositions = internships.length;
  const pendingApps = applications.filter(a => a.internshipStatus === 'Pending').length;
  const acceptedApps = applications.filter(a => a.applicantStatus === 'Current Intern').length;

  const updateInternshipStatus = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, internshipStatus: newStatus } : app
      )
    );
  };

  const updateApplicantStatus = (id, newStatus) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === id ? { ...app, applicantStatus: newStatus } : app
      )
    );
  };

  const viewApplicantDetails = (applicant) => {
    setSelectedApplicant(applicant);
    setShowDetailsModal(true);
  };

  const ApplicantDetailsModal = ({ applicant, onClose }) => {
    if (!applicant) return null;

    return (
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
          padding: 24,
          borderRadius: 8,
          width: '80%',
          maxWidth: 600,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>Applicant Details</h2>
            <button 
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
              <strong>Name:</strong> <span>{applicant.studentName}</span>
              <strong>Student ID:</strong> <span>{applicant.studentId}</span>
              <strong>Major:</strong> <span>{applicant.major}</span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Application Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
              <strong>Post:</strong> <span>{applicant.post}</span>
              <strong>Internship Status:</strong> 
              <span>
                <span style={{ 
                  background: internshipStatusColors[applicant.internshipStatus] || '#ccc',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: 6
                }}>
                  {applicant.internshipStatus}
                </span>
              </span>
              <strong>Applicant Status:</strong> 
              <span>
                <span style={{ 
                  background: applicantStatusColors[applicant.applicantStatus] || '#ccc',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: 6
                }}>
                  {applicant.applicantStatus}
                </span>
              </span>
              <strong>Applied on:</strong> <span>{applicant.date}</span>
            </div>
          </div>

          <div style={{ marginBottom: 20 }}>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Documents</h3>
            <button 
              style={{
                background: '#E8B4B8',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer'
              }}
              onClick={() => window.open(applicant.cv, '_blank')}
            >
              View CV
            </button>
          </div>

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button
              onClick={onClose}
              style={{
                background: '#fff',
                border: '1px solid #E8B4B8',
                color: '#E8B4B8',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
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
          <h4>Current Interns</h4>
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

      {/* Applicant Details Modal */}
      {showDetailsModal && (
        <ApplicantDetailsModal
          applicant={selectedApplicant}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedApplicant(null);
          }}
        />
      )}
    </div>
  );
};

export default CompanyDashboard;
