import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ManageInternships from '../internships/ManageInternships';
import { useAuth } from '../../context/AuthContext';
import { getNotifications, markNotificationAsRead } from '../../services/notificationService';

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

const CurrentInternsModal = ({ onClose }) => {
  const currentInterns = initialApplications.filter(app => app.applicantStatus === 'Current Intern');

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

const CompanyDashboard = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState(initialApplications);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCurrentInterns, setShowCurrentInterns] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [companyInternships, setCompanyInternships] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Load notifications when component mounts
      const userNotifications = getNotifications(user.id, 'company');
      setNotifications(userNotifications);
      
      // Load company internships - In a real app, this would be an API call
      setCompanyInternships(mockCompanyInternships);
    }
  }, [user]);

  const handleNotificationClick = (notification) => {
    if (notification.type === 'application') {
      // Find the application and show its details
      const application = applications.find(app => app.id === notification.applicationId);
      if (application) {
        setSelectedApplicant(application);
        setShowDetailsModal(true);
      }
    }
    // Mark notification as read
    markNotificationAsRead(notification.id);
    setNotifications(prevNotifications =>
      prevNotifications.map(n =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'application':
        return '📝';
      case 'deadline':
        return '⏰';
      case 'admin':
        return '👤';
      default:
        return '📌';
    }
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

  const DashboardHome = () => (
    <div className="dashboard" style={{ display: 'flex', gap: '2rem' }}>
      {/* Sidebar */}
      <div style={{ minWidth: 260, maxWidth: 320 }}>
        {/* Messages Section */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee', marginBottom: 16 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12
          }}>
            <h4 style={{ margin: 0 }}>Messages</h4>
            <div style={{ position: 'relative' }}>
              ✉️
              {notifications.some(n => !n.isRead) && (
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
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </div>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length > 0 ? (
              notifications.map((notification, idx) => (
                <div
                  key={`message-${notification.id || idx}`}
                  onClick={() => handleNotificationClick(notification)}
                  style={{ 
                    padding: '12px',
                    marginBottom: '8px',
                    background: notification.isRead ? '#f8f8f8' : '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: '1px solid #eee',
                    transition: 'all 0.2s ease',
                    opacity: notification.isRead ? 0.8 : 1
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '20px' }}>
                      {notification.type === 'application' ? '📝' : 
                       notification.type === 'message' ? '✉️' : 
                       notification.type === 'deadline' ? '⏰' : '📌'}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}>
                        {notification.title || notification.message}
                      </div>
                      <div style={{ fontSize: '12px', color: '#A49393', marginTop: '4px' }}>
                        {new Date(notification.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#A49393', padding: '12px' }}>
                No messages
              </div>
            )}
          </div>
        </div>

        {/* Notifications Section */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 2px 8px #eee', marginTop: 16 }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12
          }}>
            <h4 style={{ margin: 0 }}>Notifications</h4>
            <div style={{ position: 'relative' }}>
              🔔
              {notifications.some(n => !n.isRead) && (
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
                  {notifications.filter(n => !n.isRead).length}
                </span>
              )}
            </div>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {notifications.length > 0 ? (
              notifications.map((notification, idx) => (
                <div
                  key={`notification-${notification.id || idx}`}
                  onClick={() => handleNotificationClick(notification)}
                  style={{ 
                    padding: '12px',
                    marginBottom: '8px',
                    background: notification.isRead ? '#f8f8f8' : '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    border: '1px solid #eee',
                    transition: 'all 0.2s ease',
                    opacity: notification.isRead ? 0.8 : 1
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '20px' }}>{getNotificationIcon(notification.type)}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: notification.isRead ? 'normal' : 'bold' }}>
                        {notification.title || notification.message}
                      </div>
                      <div style={{ fontSize: '12px', color: '#A49393', marginTop: '4px' }}>
                        {new Date(notification.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#A49393', padding: '12px' }}>
                No notifications
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Quick Actions Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '24px'
        }}>
          {/* View Applications Card */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#E8B4B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              📝
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px', color: '#67595E' }}>Applications</h3>
              <p style={{ margin: '0 0 16px', color: '#A49393', fontSize: '14px' }}>
                View and manage internship applications
              </p>
              <button
                onClick={() => navigate('/applications')}
                style={{
                  background: '#E8B4B8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s ease',
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
            {applications.length > 0 && (
              <div style={{
                background: '#f8f8f8',
                padding: '8px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                color: '#67595E'
              }}>
                <span style={{ fontWeight: '500' }}>{applications.length}</span> pending {applications.length === 1 ? 'application' : 'applications'}
              </div>
            )}
          </div>

          {/* View Current Interns Card */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#E8B4B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              👥
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px', color: '#67595E' }}>Current Interns</h3>
              <p style={{ margin: '0 0 16px', color: '#A49393', fontSize: '14px' }}>
                View and manage your current interns
              </p>
              <button
                onClick={() => setShowCurrentInterns(true)}
                style={{
                  background: '#E8B4B8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s ease',
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
            {currentInterns.length > 0 && (
              <div style={{
                background: '#f8f8f8',
                padding: '8px 12px',
                borderRadius: '16px',
                fontSize: '14px',
                color: '#67595E'
              }}>
                <span style={{ fontWeight: '500' }}>{currentInterns.length}</span> active {currentInterns.length === 1 ? 'intern' : 'interns'}
              </div>
            )}
          </div>

          {/* View Internship Posts Card */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#E8B4B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px'
            }}>
              💼
            </div>
            <div>
              <h3 style={{ margin: '0 0 8px', color: '#67595E' }}>Internship Posts</h3>
              <p style={{ margin: '0 0 16px', color: '#A49393', fontSize: '14px' }}>
                View and manage all your internship postings
              </p>
              <button
                onClick={() => navigate('/company-dashboard/internships')}
                style={{
                  background: '#E8B4B8',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'background-color 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>View Company's Internship Posts</span>
                <span>→</span>
              </button>
            </div>
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
