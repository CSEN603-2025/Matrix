import React, { createContext, useContext, useState } from 'react';

// Initial mock data
const initialReports = [
  {
    id: 1,
    internshipId: 1,
    title: 'Frontend Development Experience at Tech Innovators',
    introduction: 'During my three-month internship at Tech Innovators Inc., I had the opportunity to work on cutting-edge web applications using React and modern frontend technologies. This report outlines my experiences, learnings, and contributions to the team.',
    body: 'Throughout my internship, I was involved in several key projects:\n\n1. Feature Development\n- Implemented new user interface components\n- Collaborated with the design team on UI/UX improvements\n- Participated in code reviews and team discussions\n\n2. Technical Skills\n- Enhanced proficiency in React and related technologies\n- Learned best practices in frontend development\n- Gained experience with version control and CI/CD\n\n3. Professional Growth\n- Developed communication skills through team collaboration\n- Learned to manage deadlines and prioritize tasks\n- Gained insights into professional software development practices',
    createdAt: '2024-02-15',
    lastModified: '2024-02-15'
  }
];

const ReportsContext = createContext();

export const useReports = () => {
  const context = useContext(ReportsContext);
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
};

export const ReportsProvider = ({ children }) => {
  const [reports, setReports] = useState(initialReports);

  const addReport = (internshipId, reportData) => {
    const newReport = {
      id: reports.length + 1,
      internshipId,
      ...reportData,
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0]
    };
    setReports(prev => [...prev, newReport]);
    return newReport;
  };

  const updateReport = (reportId, updatedData) => {
    setReports(prev =>
      prev.map(report =>
        report.id === reportId
          ? {
              ...report,
              ...updatedData,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : report
      )
    );
  };

  const deleteReport = (reportId) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
  };

  const getReportByInternshipId = (internshipId) => {
    return reports.find(report => report.internshipId === internshipId);
  };

  return (
    <ReportsContext.Provider
      value={{
        reports,
        addReport,
        updateReport,
        deleteReport,
        getReportByInternshipId
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}; 