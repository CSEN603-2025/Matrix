import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ManageInternships from '../internships/ManageInternships';
import CurrentInterns from '../internships/CurrentInterns';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';
import { getNotifications, markNotificationAsRead } from '../../services/notificationService';
import { useCompanyDashboard } from '../../contexts/CompanyDashboardContext';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CompanyEvaluationsList from '../evaluations/CompanyEvaluationsList';

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

// Move initialApplications outside the component
const getInitialApplications = () => {
  const savedApplications = localStorage.getItem('companyApplications');
  if (savedApplications) {
    return JSON.parse(savedApplications);
  }
  return [
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
};

const acceptedStudents = [
  { name: 'Sara Lee', email: 'sara.lee@email.com', start: '2024-06-10', end: '2024-09-10' },
];

const mockNotifications = [
  { 
    id: 1,
    type: 'status',
    status: 'approved',
    message: 'Your company registration has been approved! You can now post internship opportunities.',
    date: '2024-05-10',
    isRead: false
  },
  { 
    id: 2,
    type: 'application',
    message: 'New application from John Doe',
    date: '2024-05-10',
    isRead: false
  },
  { 
    id: 3,
    type: 'deadline',
    message: 'Approve applications for Data Analyst by 2024-07-15',
    date: '2024-05-09',
    isRead: true
  },
  { 
    id: 4,
    type: 'admin',
    message: 'System maintenance on 2024-05-20',
    date: '2024-05-08',
    isRead: true
  },
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

// Mock data for company internships - In a real app, this would come from an API
const mockCompanyInternships = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    description: 'Join our software engineering team and work on cutting-edge projects.',
    requirements: ['Java', 'Spring Boot', 'React'],
    field: 'Software Development',
    duration: '3 months',
    location: 'Cairo',
    deadline: '2024-06-15',
    isPaid: true,
    salary: '5000 EGP',
    status: 'Active',
    applicantsCount: 12
  },
  {
    id: 2,
    title: 'Data Science Intern',
    description: 'Work on machine learning and data analysis projects.',
    requirements: ['Python', 'Machine Learning', 'SQL'],
    field: 'Data Science',
    duration: '6 months',
    location: 'Remote',
    deadline: '2024-07-01',
    isPaid: true,
    salary: '6000 EGP',
    status: 'Active',
    applicantsCount: 8
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    description: 'Design user interfaces for our web and mobile applications.',
    requirements: ['Figma', 'Adobe XD', 'UI/UX Principles'],
    field: 'Design',
    duration: '4 months',
    location: 'Hybrid',
    deadline: '2024-06-30',
    isPaid: true,
    salary: '4500 EGP',
    status: 'Draft',
    applicantsCount: 0
  }
];

const NotificationsSection = ({ notifications, handleNotificationClick, getNotificationIcon }) => (
  <div style={{ marginBottom: '32px' }}>
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      <h3 style={{ 
        color: '#67595E', 
        margin: '0 0 16px', 
        fontSize: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <span>🔔</span> Notifications
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {notifications && notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={index}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: notification.type === 'status' 
                  ? notification.status === 'approved' 
                    ? '#E8F5E9' 
                    : '#FFEBEE'
                  : '#F5F5F5',
                border: notification.type === 'status'
                  ? `1px solid ${notification.status === 'approved' ? '#4CAF50' : '#F44336'}`
                  : '1px solid #E0E0E0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: notification.isRead ? 0.7 : 1
              }}
              onClick={() => handleNotificationClick(notification)}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: notification.type === 'status'
                  ? notification.status === 'approved'
                    ? '#4CAF50'
                    : '#F44336'
                  : '#E8B4B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '20px'
              }}>
                {notification.type === 'status'
                  ? notification.status === 'approved'
                    ? '✓'
                    : '×'
                  : getNotificationIcon(notification.type)
                }
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  color: '#67595E',
                  fontWeight: notification.isRead ? '400' : '600',
                  marginBottom: '4px'
                }}>
                  {notification.message}
                </div>
                <div style={{ 
                  color: '#A49393',
                  fontSize: '14px'
                }}>
                  {new Date(notification.date).toLocaleDateString()} • {new Date(notification.date).toLocaleTimeString()}
                </div>
              </div>
              {!notification.isRead && (
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#E8B4B8'
                }} />
              )}
            </div>
          ))
        ) : (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px', 
            color: '#A49393',
            fontSize: '14px'
          }}>
            No new notifications
          </div>
        )}
      </div>
    </div>
  </div>
);

const CompanyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showCurrentInterns, setShowCurrentInterns] = useState(false);
  const { notifications, markAsRead, addNotification, clearNotifications } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [companyInternships, setCompanyInternships] = useState([]);
  const [applicationFilter, setApplicationFilter] = useState('');
  const [internFilter, setInternFilter] = useState('');
  const [dummyNotificationAdded, setDummyNotificationAdded] = useState(false);

  useEffect(() => {
    if (user && !dummyNotificationAdded) {
      setCompanyInternships(mockCompanyInternships);
      // Clear existing notifications and add dummy notification
      clearNotifications();
      addNotification({
        id: Date.now(),
        type: 'application',
        title: 'New Internship Application',
        message: 'Jane Doe has applied for the Software Engineering Intern position',
        timestamp: new Date().toISOString(),
        applicationId: 'dummy-123'
      });
      setDummyNotificationAdded(true);
    }
  }, [user, dummyNotificationAdded]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      setDummyNotificationAdded(false);
    };
  }, []);

  const handleNotificationClick = (notification) => {
    markAsRead(notification.id);
    if (notification.type === 'application' && notification.applicationId) {
      navigate(`/company-dashboard/applications/${notification.applicationId}`);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return '📝';
      case 'status':
        return '📢';
      case 'deadline':
        return '⏰';
      default:
        return '📌';
    }
  };

  const DashboardHome = () => (
    <div className="dashboard" style={{ padding: '32px' }}>
      {/* Welcome Section */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          color: '#67595E', 
          margin: '0 0 8px', 
          fontSize: '28px', 
          fontWeight: '600' 
        }}>
          Welcome back, {companyProfile.name}
        </h1>
        <p style={{ 
          color: '#A49393', 
          margin: '0',
          fontSize: '16px' 
        }}>
          Here's what's happening with your internship program
        </p>
      </div>

      {/* Notifications Section */}
      <NotificationsSection 
        notifications={notifications} 
        handleNotificationClick={handleNotificationClick}
        getNotificationIcon={getNotificationIcon}
      />

      {/* Statistics Overview */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <StatCard
          icon="📝"
          title="Pending Applications"
          value={getInitialApplications().filter(app => app.internshipStatus === 'Pending').length}
        />
        <StatCard
          icon="👥"
          title="Current Interns"
          value={getInitialApplications().filter(app => app.applicantStatus === 'Current Intern').length}
        />
        <StatCard
          icon="💼"
          title="Active Job Posts"
          value={companyInternships.filter(post => post.status === 'Active').length}
        />
        <StatCard
          icon="⭐"
          title="Pending Evaluations"
          value={getInitialApplications().filter(app => app.applicantStatus === 'Current Intern').length}
        />
      </div>

      {/* Applications Section */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ color: '#67595E', margin: 0 }}>Recent Applications</h3>
          <button
            onClick={() => navigate('/applications')}
            style={{
              background: '#E8B4B8',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 20px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(232, 180, 184, 0.08)'
            }}
          >
            See More
          </button>
        </div>
        <FormControl variant="outlined" size="small" style={{ minWidth: 150, height: 40, marginBottom: 16 }}>
          <InputLabel id="application-status-label">Status</InputLabel>
          <Select
            labelId="application-status-label"
            value={applicationFilter}
            label="Status"
            onChange={e => setApplicationFilter(e.target.value)}
            style={{ height: 40 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Student</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Position</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Date</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Status</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getInitialApplications()
              .filter(app => !applicationFilter || app.internshipStatus === applicationFilter)
              .slice(0, 5)
              .map((app) => (
                <tr key={app.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{app.studentName}</td>
                  <td style={{ padding: 12 }}>{app.post}</td>
                  <td style={{ padding: 12 }}>{app.date}</td>
                  <td style={{ padding: 12 }}>
                    <span style={{ 
                      background: statusColors[app.internshipStatus] || '#ccc',
                      color: '#fff',
                      borderRadius: 8,
                      padding: '2px 10px'
                    }}>
                      {app.internshipStatus}
                    </span>
                  </td>
                  <td style={{ padding: 12 }}>
                    <button
                      onClick={() => viewApplicantDetails(app)}
                      style={{
                        background: 'none',
                        border: '1px solid #E8B4B8',
                        color: '#E8B4B8',
                        borderRadius: 4,
                        padding: '4px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Current Interns Section */}
      <div className="dashboard-section" style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ color: '#67595E', margin: 0 }}>Current Interns</h3>
          <button
            onClick={() => navigate('/company-dashboard/current-interns')}
            style={{
              background: '#E8B4B8',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 20px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(232, 180, 184, 0.08)'
            }}
          >
            See More
          </button>
        </div>
        <FormControl variant="outlined" size="small" style={{ minWidth: 150, height: 40, marginBottom: 16 }}>
          <InputLabel id="intern-status-label">Status</InputLabel>
          <Select
            labelId="intern-status-label"
            value={internFilter}
            label="Status"
            onChange={e => setInternFilter(e.target.value)}
            style={{ height: 40 }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Name</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Position</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Start Date</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Progress</th>
              <th style={{ padding: 12, textAlign: 'left', color: '#fff' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {getInitialApplications().filter(app => app.applicantStatus === 'Current Intern')
              .filter(intern => !internFilter || intern.status === internFilter)
              .slice(0, 5)
              .map((intern) => (
                <tr key={intern.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: 12 }}>{intern.studentName}</td>
                  <td style={{ padding: 12 }}>{intern.post}</td>
                  <td style={{ padding: 12 }}>{intern.date}</td>
                  <td style={{ padding: 12 }}>
                    <div style={{ 
                      width: '100px', 
                      height: '8px', 
                      background: '#eee', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${intern.progress}%`,
                        height: '100%',
                        background: '#E8B4B8',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </td>
                  <td style={{ padding: 12 }}>
                    <button
                      onClick={() => navigate(`/interns/${intern.id}`)}
                      style={{
                        background: 'none',
                        border: '1px solid #E8B4B8',
                        color: '#E8B4B8',
                        borderRadius: 4,
                        padding: '4px 12px',
                        cursor: 'pointer'
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Cards Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        <ActionCard
          icon="👥"
          title="Current Interns"
          description={`Monitor and manage your current interns. You have ${getInitialApplications().filter(app => app.applicantStatus === 'Current Intern').length} active interns.`}
          buttonText="View Current Interns"
          onClick={() => navigate('/company-dashboard/current-interns')}
        />
        <ActionCard
          icon="💼"
          title="Job Posts"
          description={`Manage your internship postings. You have ${companyInternships.filter(post => post.status === 'Active').length} active positions.`}
          buttonText="Manage Job Posts"
          onClick={() => navigate('/company-dashboard/internships')}
        />
        <ActionCard
          icon="⭐"
          title="Student Evaluations"
          description={`Review and evaluate intern performance. ${getInitialApplications().filter(app => app.applicantStatus === 'Current Intern').length} evaluations pending.`}
          buttonText="View Evaluations"
          onClick={() => navigate('/company-dashboard/evaluations')}
        />
      </div>
    </div>
  );

  // Reusable components
  const StatCard = ({ icon, title, value }) => (
    <div style={{
      background: '#fff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          background: '#E8B4B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>
          {icon}
        </div>
        <div>
          <h3 style={{ margin: '0 0 4px', color: '#67595E', fontSize: '16px' }}>{title}</h3>
          <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#67595E' }}>{value}</p>
        </div>
      </div>
    </div>
  );

  const ActionCard = ({ icon, title, description, buttonText, onClick }) => (
    <div style={{
      background: '#fff',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        background: '#E8B4B8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px'
      }}>
        {icon}
      </div>
      <div>
        <h3 style={{ margin: '0 0 12px', color: '#67595E', fontSize: '20px', fontWeight: '600' }}>{title}</h3>
        <p style={{ margin: '0 0 20px', color: '#A49393', fontSize: '15px', lineHeight: '1.5' }}>{description}</p>
        <button
          onClick={onClick}
          style={{
            background: '#E8B4B8',
            color: '#fff',
            border: 'none',
            borderRadius: '12px',
            padding: '14px 24px',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
            width: '100%',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <span>{buttonText}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );

  const viewApplicantDetails = (applicant) => {
    // Implement the logic to view applicant details
  };

  const CurrentInternsModal = ({ onClose }) => {
    // Implement the logic to close the current interns modal
  };

  return (
    <Routes>
      <Route path="/" element={
        <>
          <DashboardHome />
          {showCurrentInterns && (
            <CurrentInternsModal onClose={() => setShowCurrentInterns(false)} />
          )}
        </>
      } />
      <Route path="/internships" element={<ManageInternships />} />
      <Route path="/current-interns" element={<CurrentInterns />} />
      <Route path="/evaluations" element={<CompanyEvaluationsList />} />
    </Routes>
  );
};

export default CompanyDashboard;
