import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname === path;

  const getNavigationItems = () => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Dashboard', path: '/student-dashboard', icon: '📊' },
          { label: 'Applications', path: '/student-dashboard/applications', icon: '📝' },
          { label: 'Logbook', path: '/student-dashboard/logbook', icon: '📔' },
          { label: 'Final Report', path: '/student-dashboard/report', icon: '📄' },
          { label: 'Schedule', path: '/student-dashboard/schedule', icon: '📅' },
          { label: 'Workshops', path: '/student-dashboard/workshops', icon: '📅' },
          { label: 'Messages', path: '/student-dashboard/messages', icon: '💬' }
        ];
      case 'company':
        return [
          { label: 'Dashboard', path: '/company-dashboard', icon: '📊' },
          { label: 'Internships', path: '/company-dashboard/internships', icon: '💼' },
          { label: 'Applications', path: '/company-dashboard/applications', icon: '📝' },
          { label: 'Students', path: '/company-dashboard/students', icon: '👥' },
          { label: 'Reports', path: '/company-dashboard/reports', icon: '📈' },
          { label: 'Workshops', path: '/company-dashboard/workshops', icon: '📅' },
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
          { label: 'Students', path: '/scad-dashboard/students', icon: '👥' },
          { label: 'Companies', path: '/scad-dashboard/companies', icon: '🏢' },
          { label: 'Applications', path: '/scad-dashboard/applications', icon: '📝' },
          { label: 'Reports', path: '/scad-dashboard/reports', icon: '📈' },
          { label: 'Workshops', path: '/scad-dashboard/workshops', icon: '📅' },
          { label: 'Settings', path: '/scad-dashboard/settings', icon: '⚙️' }
        ];
      default:
        return [];
    }
  };

  return (
    <div style={{
      width: '260px',
      background: '#fff',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      paddingTop: '80px',
      boxShadow: '2px 0 4px rgba(0, 0, 0, 0.1)',
      zIndex: 900
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
  );
};

export default Sidebar; 