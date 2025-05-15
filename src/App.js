import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './components/dashboards/StudentDashboard';
import CompanyDashboard from './components/dashboards/CompanyDashboard';
import SCADOfficeDashboard from './components/dashboards/SCADOfficeDashboard';
import FacultyDashboard from './components/dashboards/FacultyDashboard';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import EnhancementsPage from './components/EnhancementsPage';
import Workshops from './components/workshops/Workshops';
import ProStudentDashboard from './components/ProStudentDashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
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
              path="/student-dashboard/workshops"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <Workshops />
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
              path="/company-dashboard/workshops"
              element={
                <ProtectedRoute allowedRoles={['company']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <Workshops />
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
              path="/scad-dashboard/workshops"
              element={
                <ProtectedRoute allowedRoles={['scad_office']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <Workshops />
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
            <Route
              path="/faculty-dashboard/workshops"
              element={
                <ProtectedRoute allowedRoles={['faculty']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <Workshops />
                    </div>
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/enhancements"
              element={
                <ProtectedRoute allowedRoles={['student', 'faculty', 'scad_office', 'company']}>
                  <EnhancementsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pro-student-dashboard"
              element={
                <ProtectedRoute allowedRoles={['pro_student']}>
                  <div style={{ display: 'flex' }}>
                    <Sidebar />
                    <div style={{ marginLeft: '260px', width: 'calc(100% - 260px)' }}>
                      <ProStudentDashboard />
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

export default App;
