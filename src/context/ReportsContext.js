import React, { createContext, useContext, useState } from 'react';

// Initial mock data
const initialReports = [
  {
    id: 1,
    internshipId: 1,
    title: 'Frontend Development Experience at Tech Innovators',
    studentName: 'John Doe',
    companyName: 'Tech Innovators',
    major: 'CS',
    type: 'Final Report',
    content: 'During my three-month internship at Tech Innovators Inc., I had the opportunity to work on cutting-edge web applications using React and modern frontend technologies. This report outlines my experiences, learnings, and contributions to the team.',
    submissionDate: '2024-02-15',
    status: 'Submitted',
    createdAt: '2024-02-15',
    lastModified: '2024-02-15'
  },
  {
    id: 2,
    internshipId: 2,
    title: 'Data Analysis Internship at Green Energy',
    studentName: 'Sara Lee',
    companyName: 'Green Energy',
    major: 'DS',
    type: 'Final Report',
    content: 'My internship at Green Energy focused on analyzing renewable energy data and creating visualizations for key stakeholders. I learned a lot about the energy sector and data science best practices.',
    submissionDate: '2024-03-10',
    status: 'Pending',
    createdAt: '2024-03-10',
    lastModified: '2024-03-10'
  },
  {
    id: 3,
    internshipId: 3,
    title: 'Backend API Development at Digital Solutions',
    studentName: 'Ali Hassan',
    companyName: 'Digital Solutions',
    major: 'IS',
    type: 'Progress Report',
    content: 'I contributed to the development of RESTful APIs and learned about scalable backend architectures. The team was supportive and I improved my Node.js skills.',
    submissionDate: '2024-04-05',
    status: 'Flagged',
    createdAt: '2024-04-05',
    lastModified: '2024-04-05'
  },
  {
    id: 4,
    internshipId: 4,
    title: 'Information Systems Internship at FinTech Corp',
    studentName: 'Mona Khaled',
    companyName: 'FinTech Corp',
    major: 'CS',
    type: 'Final Report',
    content: 'Worked on financial data integration and automation. Gained experience in Python and business process optimization.',
    submissionDate: '2024-04-20',
    status: 'Reviewed',
    createdAt: '2024-04-20',
    lastModified: '2024-04-20'
  },
  {
    id: 5,
    internshipId: 5,
    title: 'AI Research Internship at Data Minds',
    studentName: 'Laila Samir',
    companyName: 'Data Minds',
    major: 'DS',
    type: 'Final Report',
    content: 'Participated in AI research and implemented machine learning models for data analysis.',
    submissionDate: '2024-05-01',
    status: 'Rejected',
    createdAt: '2024-05-01',
    lastModified: '2024-05-01'
  },
  {
    id: 6,
    internshipId: 6,
    title: 'Mobile App Development at AppWorks',
    studentName: 'Omar Fathy',
    companyName: 'AppWorks',
    major: 'CS',
    type: 'Progress Report',
    content: 'Developed mobile applications using Flutter and React Native.',
    submissionDate: '2024-05-10',
    status: 'Accepted',
    createdAt: '2024-05-10',
    lastModified: '2024-05-10'
  },
  {
    id: 7,
    internshipId: 7,
    title: 'Cloud Computing Internship at CloudX',
    studentName: 'Nour El Din',
    companyName: 'CloudX',
    major: 'CS',
    type: 'Final Report',
    content: 'Worked on cloud infrastructure and deployment automation.',
    submissionDate: '2024-05-15',
    status: 'Reviewed',
    createdAt: '2024-05-15',
    lastModified: '2024-05-15'
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