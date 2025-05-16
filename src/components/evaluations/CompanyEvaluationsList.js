import React, { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, FormControlLabel, Switch } from '@mui/material';
import CompanyEvaluation from './CompanyEvaluation';
import { useEvaluations } from '../../context/EvaluationsContext';

// Mock data for evaluations with more diverse examples
const mockEvaluations = [
  {
    id: 1,
    companyName: 'Tech Innovators Inc.',
    position: 'Frontend Developer',
    period: 'Jan 2024 - Apr 2024',
    completionDate: '2024-04-15',
    status: 'Completed',
    evaluation: {
      workEnvironment: 4,
      learningOpportunities: 5,
      mentorship: 4,
      workLifeBalance: 4,
      overallRating: 4,
      recommend: true,
      pros: 'Great learning environment, supportive team',
      cons: 'Sometimes high workload',
      additionalComments: 'Excellent internship experience overall'
    }
  },
  {
    id: 2,
    companyName: 'Data Analytics Co.',
    position: 'Data Analyst Intern',
    period: 'Jun 2023 - Aug 2023',
    completionDate: '2023-08-31',
    status: 'Completed',
    evaluation: {
      workEnvironment: 5,
      learningOpportunities: 4,
      mentorship: 5,
      workLifeBalance: 3,
      overallRating: 4,
      recommend: true,
      pros: 'Excellent mentorship, real-world projects',
      cons: 'Work hours can be long',
      additionalComments: 'Great place to start your career'
    }
  },
  {
    id: 3,
    companyName: 'Cloud Solutions Ltd.',
    position: 'Cloud Engineering Intern',
    period: 'Sep 2023 - Dec 2023',
    completionDate: '2023-12-15',
    status: 'Completed',
    evaluation: {
      workEnvironment: 3,
      learningOpportunities: 4,
      mentorship: 3,
      workLifeBalance: 4,
      overallRating: 3.5,
      recommend: false,
      pros: 'Good exposure to cloud technologies',
      cons: 'Limited guidance and structure',
      additionalComments: 'Need better onboarding process'
    }
  },
  {
    id: 4,
    companyName: 'Marketing Masters',
    position: 'Digital Marketing Intern',
    period: 'Jan 2024 - Present',
    completionDate: null,
    status: 'Pending',
    evaluation: null
  }
];

const CompanyEvaluationsList = () => {
  const { evaluations, updateEvaluation, deleteEvaluation } = useEvaluations();
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentInternsOnly, setCurrentInternsOnly] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // Load evaluations from localStorage or use mock data if none exists
      const savedEvaluations = localStorage.getItem('internshipEvaluations');
      if (!savedEvaluations) {
        // If no evaluations exist in localStorage, use mock data
        localStorage.setItem('internshipEvaluations', JSON.stringify(mockEvaluations));
        updateEvaluation(null, mockEvaluations);
      } else {
        // Use saved evaluations
        updateEvaluation(null, JSON.parse(savedEvaluations));
      }
    } catch (err) {
      setError('Failed to load evaluations. Please refresh the page.');
    }
  }, [updateEvaluation]);

  const handleDeleteEvaluation = (evaluationId) => {
    try {
      if (window.confirm('Are you sure you want to delete this evaluation?')) {
        deleteEvaluation(evaluationId);
        // Update localStorage after deletion
        const updatedEvaluations = evaluations.filter(evaluation => evaluation.id !== evaluationId);
        localStorage.setItem('internshipEvaluations', JSON.stringify(updatedEvaluations));
      }
    } catch (err) {
      setError('Failed to delete evaluation. Please try again.');
    }
  };

  const handleUpdateEvaluation = (updatedEvaluation) => {
    try {
      const updated = {
        ...selectedEvaluation,
        evaluation: updatedEvaluation,
        status: 'Completed',
        completionDate: new Date().toISOString().split('T')[0]
      };
      
      // Update in context
      updateEvaluation(selectedEvaluation.id, updated);
      
      // Update in localStorage
      const updatedEvaluations = evaluations.map(evaluation => 
        evaluation.id === selectedEvaluation.id ? updated : evaluation
      );
      localStorage.setItem('internshipEvaluations', JSON.stringify(updatedEvaluations));
      
      setShowEditModal(false);
      setSelectedEvaluation(null);
    } catch (err) {
      setError('Failed to update evaluation. Please try again.');
    }
  };

  const handleCreateEvaluation = (newEvaluation) => {
    try {
      const newId = Math.max(...evaluations.map(e => e.id), 0) + 1;
      const evaluation = {
        id: newId,
        companyName: newEvaluation.companyName || '',
        position: newEvaluation.position || '',
        period: newEvaluation.period || '',
        completionDate: new Date().toISOString().split('T')[0],
        status: 'Completed',
        evaluation: {
          ...newEvaluation,
          workEnvironment: Number(newEvaluation.workEnvironment) || 0,
          learningOpportunities: Number(newEvaluation.learningOpportunities) || 0,
          mentorship: Number(newEvaluation.mentorship) || 0,
          workLifeBalance: Number(newEvaluation.workLifeBalance) || 0,
          overallRating: Number(newEvaluation.overallRating) || 0,
          recommend: newEvaluation.recommend ?? false,
          pros: newEvaluation.pros || '',
          cons: newEvaluation.cons || '',
          additionalComments: newEvaluation.additionalComments || ''
        }
      };
      
      // Update in context and localStorage
      const updatedEvaluations = [...evaluations, evaluation];
      updateEvaluation(null, updatedEvaluations);
      localStorage.setItem('internshipEvaluations', JSON.stringify(updatedEvaluations));
      
      setShowCreateModal(false);
    } catch (err) {
      setError('Failed to create evaluation. Please try again.');
    }
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = !searchQuery || 
      evaluation.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evaluation.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = !statusFilter || evaluation.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const RecommendationBadge = ({ recommended }) => (
    <span style={{
      background: recommended ? '#4CAF50' : '#f44336',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: 16,
      fontSize: '0.9em'
    }}>
      {recommended ? 'Recommended' : 'Not Recommended'}
    </span>
  );

  return (
    <div style={{ padding: '32px' }}>
      {error && (
        <div style={{
          padding: '12px',
          marginBottom: '24px',
          background: '#FFEBEE',
          color: '#D32F2F',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {error}
          <button
            onClick={() => setError(null)}
            style={{
              marginLeft: '12px',
              background: 'none',
              border: 'none',
              color: '#D32F2F',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ×
          </button>
        </div>
      )}

      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '32px' 
      }}>
        <div>
          <h1 style={{ 
            color: '#67595E', 
            margin: '0 0 8px', 
            fontSize: '28px', 
            fontWeight: '600' 
          }}>
            Internship Evaluations
          </h1>
          <p style={{ 
            color: '#A49393', 
            margin: '0',
            fontSize: '16px' 
          }}>
            View and manage your internship evaluations
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          style={{
            background: '#E8B4B8',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 24px',
            fontSize: '15px',
            fontWeight: '500',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>+ Create Evaluation</span>
        </button>
      </div>

      {/* Filters */}
      <div style={{ 
        display: 'flex', 
        gap: '16px', 
        marginBottom: '24px',
        alignItems: 'center'
      }}>
        <TextField
          placeholder="Search evaluations..."
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: 200 }}
        />
        <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
          <InputLabel id="evaluation-status-filter-label">Status</InputLabel>
          <Select
            labelId="evaluation-status-filter-label"
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={currentInternsOnly}
              onChange={(e) => setCurrentInternsOnly(e.target.checked)}
              color="primary"
            />
          }
          label="Current Interns Only"
          style={{ marginLeft: '8px' }}
        />
      </div>

      {/* Evaluations List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredEvaluations
          .filter(evaluation => !currentInternsOnly || evaluation.status === 'Current')
          .map(evaluation => (
          <div
            key={evaluation.id}
            style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              border: evaluation.status === 'Current' ? '2px solid #E8B4B8' : 'none'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <h3 style={{ margin: '0', color: '#67595E' }}>{evaluation.companyName}</h3>
                  {evaluation.status === 'Current' && (
                    <span style={{
                      background: '#E8B4B8',
                      color: '#fff',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: '500'
                    }}>
                      Current Intern
                    </span>
                  )}
                </div>
                <p style={{ margin: '0 0 4px', color: '#A49393' }}>
                  Position: {evaluation.position}
                </p>
                <p style={{ margin: '0 0 4px', color: '#A49393' }}>
                  Period: {evaluation.period}
                </p>
                {evaluation.completionDate && (
                  <p style={{ margin: '0', color: '#A49393' }}>
                    Evaluation Date: {new Date(evaluation.completionDate).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {!evaluation.evaluation && evaluation.status === 'Current' ? (
                  <button
                    onClick={() => {
                      setSelectedEvaluation(evaluation);
                      setShowCreateModal(true);
                    }}
                    style={{
                      background: '#E8B4B8',
                      border: 'none',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Add Evaluation
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setSelectedEvaluation(evaluation);
                        setShowEditModal(true);
                      }}
                      style={{
                        background: 'none',
                        border: '1px solid #E8B4B8',
                        color: '#E8B4B8',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteEvaluation(evaluation.id)}
                      style={{
                        background: '#FFE5E5',
                        border: 'none',
                        color: '#FF4444',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginTop: '24px',
              padding: '16px',
              background: '#F9F9F9',
              borderRadius: '8px'
            }}>
              <div>
                <p style={{ margin: '0 0 4px', color: '#67595E', fontWeight: '600' }}>Overall Rating</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{evaluation.evaluation.overallRating}/5</span>
                  <span style={{ color: '#FFD700' }}>★</span>
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', color: '#67595E', fontWeight: '600' }}>Work Environment</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{evaluation.evaluation.workEnvironment}/5</span>
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', color: '#67595E', fontWeight: '600' }}>Learning Opportunities</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{evaluation.evaluation.learningOpportunities}/5</span>
                </div>
              </div>
              <div>
                <p style={{ margin: '0 0 4px', color: '#67595E', fontWeight: '600' }}>Mentorship</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span>{evaluation.evaluation.mentorship}/5</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <div style={{ marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Recommendation</h4>
                <RecommendationBadge recommended={evaluation.evaluation.recommend} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Pros</h4>
                <p style={{ margin: '0', color: '#666' }}>{evaluation.evaluation.pros}</p>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Cons</h4>
                <p style={{ margin: '0', color: '#666' }}>{evaluation.evaluation.cons}</p>
              </div>
              {evaluation.evaluation.additionalComments && (
                <div>
                  <h4 style={{ margin: '0 0 8px', color: '#67595E' }}>Additional Comments</h4>
                  <p style={{ margin: '0', color: '#666' }}>{evaluation.evaluation.additionalComments}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredEvaluations.length === 0 && (
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '40px',
            textAlign: 'center',
            color: '#A49393'
          }}>
            No evaluations found
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <CompanyEvaluation
          internship={{
            companyName: '',
            position: '',
            period: '',
            status: 'Pending'
          }}
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateEvaluation}
          isCreating={true}
        />
      )}

      {/* Edit Modal */}
      {showEditModal && selectedEvaluation && (
        <CompanyEvaluation
          internship={{
            companyName: selectedEvaluation.companyName || '',
            position: selectedEvaluation.position || '',
            period: selectedEvaluation.period || '',
            status: selectedEvaluation.status || 'Pending'
          }}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEvaluation(null);
          }}
          onSave={handleUpdateEvaluation}
          existingEvaluation={selectedEvaluation.evaluation || {
            workEnvironment: 0,
            learningOpportunities: 0,
            mentorship: 0,
            workLifeBalance: 0,
            overallRating: 0,
            recommend: null,
            pros: '',
            cons: '',
            additionalComments: ''
          }}
        />
      )}
    </div>
  );
};

export default CompanyEvaluationsList; 