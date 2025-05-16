import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ManageInternships from '../internships/ManageInternships';
import { useAuth } from '../../context/AuthContext';
import { getNotifications, markNotificationAsRead } from '../../services/notificationService';
import { useCompanyDashboard } from '../../contexts/CompanyDashboardContext';

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

const notifications = [
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

  // Define initial notifications
  const initialNotifications = [
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

  const [applications, setApplications] = useState(getInitialApplications);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCurrentInterns, setShowCurrentInterns] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [companyInternships, setCompanyInternships] = useState([]);

  useEffect(() => {
    if (user) {
      // In a real app, this would fetch from an API
      setNotifications(initialNotifications);
      setCompanyInternships(mockCompanyInternships);
    }
  }, [user]);

  const handleNotificationClick = (notification) => {
    if (notification.type === 'status') {
      setNotifications(prevNotifications =>
        prevNotifications.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    } else if (notification.type === 'application') {
      const application = applications.find(app => app.id === notification.applicationId);
      if (application) {
        setSelectedApplicant(application);
        setShowDetailsModal(true);
      }
      setNotifications(prevNotifications =>
        prevNotifications.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return '📝';
      case 'deadline':
        return '⏰';
      case 'admin':
        return '👤';
      case 'status':
        return '🔔';
      default:
        return '📌';
    }
  };

  const getNotificationStyle = (notification) => {
    if (notification.type === 'status') {
      return {
        background: notification.status === 'approved' ? '#E8F5E9' : '#FFEBEE',
        border: `1px solid ${notification.status === 'approved' ? '#4CAF50' : '#F44336'}`,
        padding: '12px',
        marginBottom: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        opacity: notification.isRead ? 0.8 : 1
      };
    }
    return {
      padding: '12px',
      marginBottom: '8px',
      background: notification.isRead ? '#f8f8f8' : '#fff',
      borderRadius: '8px',
      cursor: 'pointer',
      border: '1px solid #eee',
      transition: 'all 0.2s ease',
      opacity: notification.isRead ? 0.8 : 1
    };
  };

  const currentInterns = applications.filter(app => app.applicantStatus === 'Current Intern');

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#4CAF50';
      case 'draft':
        return '#FFA000';
      case 'closed':
        return '#F44336';
      default:
        return '#67595E';
    }
  };

  const updateApplicationStatus = (applicationId, newStatus) => {
    setApplications(prevApplications => 
      prevApplications.map(app => 
        app.id === applicationId 
          ? { ...app, internshipStatus: newStatus } 
          : app
      )
    );
  };

  const CurrentInternsModal = ({ onClose }) => {
    const currentInterns = applications.filter(app => app.applicantStatus === 'Current Intern');

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
          borderRadius: '12px',
          padding: '24px',
          width: '90%',
          maxWidth: '800px',
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #eee'
          }}>
            <div>
              <h2 style={{ margin: '0 0 8px', color: '#67595E' }}>Current Interns</h2>
              <p style={{ margin: 0, color: '#A49393', fontSize: '14px' }}>
                {currentInterns.length} active {currentInterns.length === 1 ? 'intern' : 'interns'}
              </p>
            </div>
            <button
              onClick={onClose}
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

          {/* Interns List */}
          <div style={{ display: 'grid', gap: '16px' }}>
            {currentInterns.length > 0 ? (
              currentInterns.map((intern) => (
                <div
                  key={intern.id}
                  style={{
                    background: '#f8f8f8',
                    borderRadius: '8px',
                    padding: '16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr auto',
                    gap: '16px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <h3 style={{ margin: 0, color: '#67595E', fontSize: '16px' }}>{intern.studentName}</h3>
                      <span style={{
                        background: '#E8B4B8',
                        color: '#fff',
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px'
                      }}>
                        {intern.post}
                      </span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '14px', color: '#67595E' }}>
                      <div>
                        <strong>Student ID:</strong> {intern.studentId}
                      </div>
                      <div>
                        <strong>Major:</strong> {intern.major}
                      </div>
                      <div>
                        <strong>Start Date:</strong> {new Date(intern.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => window.open(intern.cv, '_blank')}
                      style={{
                        background: '#E8B4B8',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>View CV</span>
                    </button>
                    <button
                      onClick={() => {/* Add contact functionality */}}
                      style={{
                        background: '#fff',
                        color: '#E8B4B8',
                        border: '1px solid #E8B4B8',
                        borderRadius: '4px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <span>Contact</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '32px', color: '#A49393' }}>
                No current interns at the moment
              </div>
            )}
          </div>
        </div>
      </div>
    );
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
              📝
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', color: '#67595E', fontSize: '16px' }}>Pending Applications</h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#67595E' }}>
                {applications.filter(app => app.internshipStatus === 'Pending').length}
              </p>
            </div>
          </div>
        </div>

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
              👥
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', color: '#67595E', fontSize: '16px' }}>Current Interns</h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#67595E' }}>
                {applications.filter(app => app.applicantStatus === 'Current Intern').length}
              </p>
            </div>
          </div>
        </div>

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
              💼
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', color: '#67595E', fontSize: '16px' }}>Active Job Posts</h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#67595E' }}>
                {companyInternships.filter(post => post.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>

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
              ⭐
            </div>
            <div>
              <h3 style={{ margin: '0 0 4px', color: '#67595E', fontSize: '16px' }}>Pending Evaluations</h3>
              <p style={{ margin: '0', fontSize: '24px', fontWeight: '600', color: '#67595E' }}>
                {currentInterns.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Actions Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Applications Card */}
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
            📝
          </div>
          <div>
            <h3 style={{ margin: '0 0 12px', color: '#67595E', fontSize: '20px', fontWeight: '600' }}>Applications</h3>
            <p style={{ margin: '0 0 20px', color: '#A49393', fontSize: '15px', lineHeight: '1.5' }}>
              Review and manage internship applications. {applications.filter(app => app.internshipStatus === 'Pending').length} pending applications require your attention.
            </p>
            <button
              onClick={() => navigate('/applications')}
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
              <span>View Applications</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Current Interns Card */}
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
            👥
          </div>
          <div>
            <h3 style={{ margin: '0 0 12px', color: '#67595E', fontSize: '20px', fontWeight: '600' }}>Current Interns</h3>
            <p style={{ margin: '0 0 20px', color: '#A49393', fontSize: '15px', lineHeight: '1.5' }}>
              Monitor and manage your current interns. You have {currentInterns.length} active {currentInterns.length === 1 ? 'intern' : 'interns'}.
            </p>
            <button
              onClick={() => setShowCurrentInterns(true)}
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
              <span>View Current Interns</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Job Posts Card */}
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
            💼
          </div>
          <div>
            <h3 style={{ margin: '0 0 12px', color: '#67595E', fontSize: '20px', fontWeight: '600' }}>Job Posts</h3>
            <p style={{ margin: '0 0 20px', color: '#A49393', fontSize: '15px', lineHeight: '1.5' }}>
              Manage your internship postings. You have {companyInternships.filter(post => post.status === 'Active').length} active positions.
            </p>
            <button
              onClick={() => navigate('/company-dashboard/internships')}
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
              <span>Manage Job Posts</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Student Evaluations Card */}
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
            ⭐
          </div>
          <div>
            <h3 style={{ margin: '0 0 12px', color: '#67595E', fontSize: '20px', fontWeight: '600' }}>Student Evaluations</h3>
            <p style={{ margin: '0 0 20px', color: '#A49393', fontSize: '15px', lineHeight: '1.5' }}>
              Review and evaluate intern performance. {currentInterns.length} evaluations pending.
            </p>
            <button
              onClick={() => navigate('/company-dashboard/evaluations')}
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
              <span>View Evaluations</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* SCAD Internships Card */}
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
            🎯
          </div>
          <div>
            <h3 style={{ margin: '0 0 12px', color: '#67595E', fontSize: '20px', fontWeight: '600' }}>SCAD Internships</h3>
            <p style={{ margin: '0 0 20px', color: '#A49393', fontSize: '15px', lineHeight: '1.5' }}>
              Browse all internship opportunities managed by the SCAD office.
            </p>
            <button
              onClick={() => navigate('/company-dashboard/available-internships')}
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
              <span>View SCAD Internships</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
    </Routes>
  );
};

export default CompanyDashboard;
