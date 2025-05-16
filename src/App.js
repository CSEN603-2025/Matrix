import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { EvaluationsProvider } from './context/EvaluationsContext';
import { ReportsProvider } from './context/ReportsContext';
import { CoursesProvider } from './context/CoursesContext';
import { CompanyDashboardProvider } from './contexts/CompanyDashboardContext';
import { NotificationProvider } from './context/NotificationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import StudentDashboard from './components/dashboards/StudentDashboard';
import CompanyDashboard from './components/dashboards/CompanyDashboard';
import SCADOfficeDashboard from './components/dashboards/SCADOfficeDashboard';
import FacultyDashboard from './components/dashboards/FacultyDashboard';
import ProStudentDashboard from './components/dashboards/ProStudentDashboard';
import Hero from './components/Hero';
import Sidebar from './components/Sidebar';
import EnhancementsPage from './components/EnhancementsPage';
import Workshops from './components/workshops/Workshops';
import Applications from './components/Applications';
import StudentEvaluation from './components/evaluations/StudentEvaluation';
import InternshipHistory from './components/internships/InternshipHistory';
import InternshipSearch from './components/internships/InternshipSearch';
import CompanyEvaluationsList from './components/evaluations/CompanyEvaluationsList';
import Courses from './components/courses/Courses';
import CompaniesView from './components/CompaniesView';
import Messages from './components/Messages';
import TestCompanyRegistration from './components/TestCompanyRegistration';
import AvailableInternships from './components/internships/AvailableInternships';
import InternshipReportsList from './components/reports/InternshipReportsList';
import SubmitReport from './components/reports/SubmitReport';
import StudentReportsList from './components/reports/StudentReportsList';
import SCADInternships from './components/internships/SCADInternships';
import SCADStudentStatus from './components/dashboards/SCADStudentStatus';
import './App.css';

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  // Don't show sidebar on login/register pages
  const showSidebar = !location.pathname.includes('/login') && 
                     !location.pathname.includes('/register') && 
                     location.pathname !== '/';

  return (
    <div className="App">
      {showSidebar && <Sidebar />}
      <div style={{ 
        marginLeft: showSidebar ? '260px' : '0',
        width: showSidebar ? 'calc(100% - 260px)' : '100%',
        transition: 'margin-left 0.3s ease, width 0.3s ease'
      }}>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/test" element={<TestCompanyRegistration />} />
          <Route
            path="/student-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pro-student-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['pro_student']}>
                <ProStudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard/courses"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pro-student-dashboard/courses"
            element={
              <ProtectedRoute allowedRoles={['pro_student']}>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <CompanyDashboardProvider>
                  <CompanyDashboard />
                </CompanyDashboardProvider>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scad-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['scad_office']}>
                <SCADOfficeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-dashboard/*"
            element={
              <ProtectedRoute allowedRoles={['faculty']}>
                <FacultyDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard/workshops"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <Workshops />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard/workshops"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <Workshops />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scad-dashboard/workshops"
            element={
              <ProtectedRoute allowedRoles={['scad_office']}>
                <Workshops />
              </ProtectedRoute>
            }
          />
          <Route
            path="/faculty-dashboard/workshops"
            element={
              <ProtectedRoute allowedRoles={['faculty']}>
                <Workshops />
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
            path="/applications"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard/evaluations"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <StudentEvaluation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard/internships"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <InternshipHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pro-student-dashboard/internships"
            element={
              <ProtectedRoute allowedRoles={['pro_student']}>
                <InternshipHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/internships"
            element={
              <ProtectedRoute allowedRoles={['student', 'pro_student']}>
                <InternshipSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-internships"
            element={
              <ProtectedRoute allowedRoles={['student', 'pro_student']}>
                <InternshipHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reports"
            element={
              <ProtectedRoute allowedRoles={['student', 'pro_student']}>
                <InternshipReportsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-evaluations"
            element={
              <ProtectedRoute allowedRoles={['student', 'pro_student']}>
                <CompanyEvaluationsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scad-dashboard/companies"
            element={
              <ProtectedRoute allowedRoles={['scad_office']}>
                <CompaniesView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scad-dashboard/student-reports"
            element={
              <ProtectedRoute allowedRoles={['scad_office']}>
                <StudentReportsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard/messages"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-dashboard/available-internships"
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <AvailableInternships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pro-student-dashboard/available-internships"
            element={
              <ProtectedRoute allowedRoles={['pro_student']}>
                <AvailableInternships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-dashboard/available-internships"
            element={
              <ProtectedRoute allowedRoles={['company']}>
                <AvailableInternships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scad-dashboard/available-internships"
            element={
              <ProtectedRoute allowedRoles={['scad_office']}>
                <AvailableInternships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scad-dashboard/internships"
            element={
              <ProtectedRoute allowedRoles={['scad_office']}>
                <SCADInternships />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submit-report"
            element={
              <ProtectedRoute allowedRoles={['student', 'pro_student']}>
                <SubmitReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/scad-dashboard/student-status"
            element={
              <ProtectedRoute allowedRoles={['scad_office']}>
                <SCADStudentStatus />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <EvaluationsProvider>
            <ReportsProvider>
              <CoursesProvider>
                <CompanyDashboardProvider>
                  <AppContent />
                  <ToastContainer position="bottom-right" />
                </CompanyDashboardProvider>
              </CoursesProvider>
            </ReportsProvider>
          </EvaluationsProvider>
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
