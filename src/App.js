import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './components/dashboards/StudentDashboard';
import CompanyDashboard from './components/dashboards/CompanyDashboard';
import SCADOfficeDashboard from './components/dashboards/SCADOfficeDashboard';
import FacultyDashboard from './components/dashboards/FacultyDashboard';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route
              path="/student-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <StudentDashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/company-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['company']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <CompanyDashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/scad-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['scad_office']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <SCADOfficeDashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/faculty-dashboard/*"
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <FacultyDashboard />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
import EnhancementsPage from './components/EnhancementsPage';

<Route
  path="/enhancements"
  element={
    <ProtectedRoute allowedRoles={['student', 'faculty', 'scad_office', 'company']}>
      <EnhancementsPage />
    </ProtectedRoute>
  }
/>


export default App;
