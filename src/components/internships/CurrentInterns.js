import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StudentEvaluation from '../evaluations/StudentEvaluation';
import { useEvaluations } from '../../context/EvaluationsContext';

const CurrentInterns = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntern, setSelectedIntern] = useState(null);
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const navigate = useNavigate();
  const { evaluations, updateEvaluation, deleteEvaluation } = useEvaluations();

  // Get initial applications data
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
        post: 'Frontend Developer',
        progress: 45,
        startDate: '2024-05-10',
        supervisor: 'Dr. Smith',
        evaluationStatus: 'Pending',
        evaluation: null
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
        post: 'Data Analyst',
        progress: 75,
        startDate: '2024-05-09',
        supervisor: 'Dr. Brown',
        evaluationStatus: 'Completed',
        evaluation: {
          workEnvironment: 4,
          learningOpportunities: 5,
          mentorship: 4,
          workLifeBalance: 4,
          overallRating: 4.25,
          recommend: true,
          pros: 'Great learning environment, supportive team',
          cons: 'Sometimes high workload',
          additionalComments: 'Excellent internship experience overall'
        }
      },
    ];
  };

  const handleEvaluate = (intern) => {
    setSelectedIntern(intern);
    setShowEvaluationForm(true);
  };

  const handleEditEvaluation = (intern) => {
    setSelectedIntern(intern);
    setShowEvaluationForm(true);
  };

  const handleDeleteEvaluation = (intern) => {
    if (window.confirm('Are you sure you want to delete this evaluation? This action cannot be undone.')) {
      const applications = getInitialApplications();
      const updatedApplications = applications.map(app => 
        app.id === intern.id 
          ? { ...app, evaluationStatus: 'Pending', evaluation: null }
          : app
      );
      localStorage.setItem('companyApplications', JSON.stringify(updatedApplications));
      // Refresh the page data
      window.location.reload();
    }
  };

  const handleCloseEvaluation = () => {
    setSelectedIntern(null);
    setShowEvaluationForm(false);
  };

  const handleSaveEvaluation = (evaluation) => {
    // Update the intern's evaluation status and data
    const applications = getInitialApplications();
    const updatedApplications = applications.map(app => 
      app.id === selectedIntern.id 
        ? { 
            ...app, 
            evaluationStatus: 'Completed',
            evaluation: {
              ...evaluation,
              overallRating: calculateOverallRating(evaluation)
            }
          }
        : app
    );
    localStorage.setItem('companyApplications', JSON.stringify(updatedApplications));
    
    // Close the evaluation form
    handleCloseEvaluation();
  };

  const calculateOverallRating = (evaluation) => {
    const ratings = [
      evaluation.workEnvironment,
      evaluation.learningOpportunities,
      evaluation.mentorship,
      evaluation.workLifeBalance
    ];
    return ratings.reduce((a, b) => a + b) / ratings.length;
  };

  const currentInterns = getInitialApplications().filter(app => app.applicantStatus === 'Current Intern');

  const filteredInterns = currentInterns.filter(intern => {
    const matchesStatus = !statusFilter || intern.internshipStatus === statusFilter;
    const matchesSearch = !searchQuery || 
      intern.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      intern.post.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ padding: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ 
          color: '#67595E', 
          margin: '0 0 8px', 
          fontSize: '28px', 
          fontWeight: '600' 
        }}>
          Current Interns
        </h1>
        <p style={{ 
          color: '#A49393', 
          margin: '0',
          fontSize: '16px' 
        }}>
          Manage and monitor your current interns
        </p>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px',
        alignItems: 'center'
      }}>
        <TextField
          placeholder="Search interns..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: 200 }}
        />
        <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
          <InputLabel id="intern-status-filter-label">Status</InputLabel>
          <Select
            labelId="intern-status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* Interns Table */}
      <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>Name</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>ID</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>Position</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>Start Date</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>Progress</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>Supervisor</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>Evaluation</th>
              <th style={{ padding: '16px', textAlign: 'left', color: '#fff' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInterns.map((intern) => (
              <tr key={intern.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '16px' }}>{intern.studentName}</td>
                <td style={{ padding: '16px' }}>{intern.studentId}</td>
                <td style={{ padding: '16px' }}>{intern.post}</td>
                <td style={{ padding: '16px' }}>{intern.startDate}</td>
                <td style={{ padding: '16px' }}>
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
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#67595E',
                    marginLeft: '8px'
                  }}>
                    {intern.progress}%
                  </span>
                </td>
                <td style={{ padding: '16px' }}>{intern.supervisor}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    background: intern.evaluationStatus === 'Completed' ? '#4CAF50' : '#FFD700',
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}>
                    {intern.evaluationStatus}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {intern.evaluationStatus === 'Completed' ? (
                      <>
                        <button
                          style={{
                            background: 'none',
                            border: '1px solid #E8B4B8',
                            color: '#E8B4B8',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleEditEvaluation(intern)}
                        >
                          Edit
                        </button>
                        <button
                          style={{
                            background: '#FFE5E5',
                            border: 'none',
                            color: '#FF4444',
                            padding: '4px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                          onClick={() => handleDeleteEvaluation(intern)}
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        style={{
                          background: '#E8B4B8',
                          border: 'none',
                          color: '#fff',
                          padding: '4px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={() => handleEvaluate(intern)}
                      >
                        Add Evaluation
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Evaluation Form Modal */}
      {showEvaluationForm && selectedIntern && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            width: '90%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <StudentEvaluation
              intern={selectedIntern}
              onClose={handleCloseEvaluation}
              onSave={handleSaveEvaluation}
              existingEvaluation={selectedIntern.evaluation}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrentInterns; 