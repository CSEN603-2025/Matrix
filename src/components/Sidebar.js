import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const isActive = (path) => location.pathname === path;

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Dashboard', path: '/student-dashboard', icon: '📊' },
          { label: 'SCAD Internships', path: '/student-dashboard/available-internships', icon: '🎯' },
          { label: 'Applications', path: '/student-dashboard/applications', icon: '📝' },
          { label: 'My Internships', path: '/my-internships', icon: '💼' },
          { label: 'Company Evaluations', path: '/company-evaluations', icon: '⭐' },
          { label: 'Courses', path: '/student-dashboard/courses', icon: '📚' },
          { label: 'Internship Reports', path: '/my-reports', icon: '📄' },
          { label: 'Suggested Companies', path: '/student-dashboard/suggested-companies', icon: '🏢' },
          { label: 'Workshops', path: '/student-dashboard/workshops', icon: '📅' },
          { label: 'Messages', path: '/student-dashboard/messages', icon: '💬' }
        ];
      case 'pro_student':
        return [
          { label: 'Dashboard', path: '/pro-student-dashboard', icon: '📊' },
          { label: 'SCAD Internships', path: '/pro-student-dashboard/available-internships', icon: '🎯' },
          { label: 'Applications', path: '/pro-student-dashboard/applications', icon: '📝' },
          { label: 'My Internships', path: '/my-internships', icon: '💼' },
          { label: 'Company Evaluations', path: '/company-evaluations', icon: '⭐' },
          { label: 'Courses', path: '/pro-student-dashboard/courses', icon: '📚' },
          { label: 'Internship Reports', path: '/my-reports', icon: '📄' },
          { label: 'Suggested Companies', path: '/pro-student-dashboard/suggested-companies', icon: '🏢' },
          { label: 'Workshops', path: '/pro-student-dashboard/workshops', icon: '📅' },
          { label: 'Messages', path: '/pro-student-dashboard/messages', icon: '💬' }
        ];
      case 'company':
        return [
          { label: 'Dashboard', path: '/company-dashboard', icon: '📊' },
          { label: 'SCAD Internships', path: '/company-dashboard/available-internships', icon: '🎯' },
          { label: 'Job Posts', path: '/company-dashboard/internships', icon: '💼' },
          { label: 'Applications', path: '/applications', icon: '📝' },
          { label: 'Evaluations', path: '/company-dashboard/evaluations', icon: '📋' },
          { label: 'Messages', path: '/company-dashboard/messages', icon: '💬' }
        ];
      case 'faculty':
        return [
          { label: 'Dashboard', path: '/faculty-dashboard', icon: '📊' },
          { label: 'Students', path: '/faculty-dashboard/students', icon: '👥' },
          { label: 'Companies', path: '/faculty-dashboard/companies', icon: '🏢' },
          { label: 'Reports', path: '/faculty-dashboard/reports', icon: '📈' },
          { label: 'Schedule', path: '/faculty-dashboard/schedule', icon: '📅' },
          { label: 'Workshops', path: '/faculty-dashboard/workshops', icon: '📅' },
          { label: 'Messages', path: '/faculty-dashboard/messages', icon: '💬' }
        ];
      case 'scad_office':
        return [
          { label: 'Dashboard', path: '/scad-dashboard', icon: '📊' },
          { label: 'SCAD Internships', path: '/scad-dashboard/available-internships', icon: '🎯' },
          { label: 'Companies', path: '/scad-dashboard/companies', icon: '🏢' },
          { label: 'Student Reports', path: '/scad-dashboard/student-reports', icon: '📝' },
          { label: 'Workshops', path: '/scad-dashboard/workshops', icon: '📚' },
          { label: 'Messages', path: '/scad-dashboard/messages', icon: '💬' },
        ];
      default:
        return [];
    }
  };

  // Hamburger menu button
  const HamburgerButton = () => (
    <button
      onClick={() => setIsOpen(!isOpen)}
      style={{
        position: 'fixed',
        left: isOpen ? '220px' : '20px',
        top: '20px',
        zIndex: 1000,
        background: '#E8B4B8',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
        transition: 'left 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
      }}
    >
      <span style={{
        display: 'block',
        width: '20px',
        height: '2px',
        background: '#fff',
        transition: 'all 0.3s ease',
      }}></span>
      <span style={{
        display: 'block',
        width: '20px',
        height: '2px',
        background: '#fff',
        transition: 'all 0.3s ease',
      }}></span>
      <span style={{
        display: 'block',
        width: '20px',
        height: '2px',
        background: '#fff',
        transition: 'all 0.3s ease',
      }}></span>
    </button>
  );

  return (
    <>
      <HamburgerButton />
      <div style={{
        width: '260px',
        background: '#fff',
        height: '100vh',
        position: 'fixed',
        left: isOpen ? 0 : '-260px',
        top: 0,
        paddingTop: '80px',
        boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
        zIndex: 900,
        transition: 'left 0.3s ease'
      }}>
        <nav style={{ padding: '1rem' }}>
          {getNavigationItems().map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              style={{
                width: '100%',
                padding: '0.8rem 1rem',
                marginBottom: '0.5rem',
                background: isActive(item.path) ? '#EED6D3' : 'transparent',
                border: 'none',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                cursor: 'pointer',
                color: isActive(item.path) ? '#67595E' : '#A49393',
                fontWeight: isActive(item.path) ? '600' : '400',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar; 