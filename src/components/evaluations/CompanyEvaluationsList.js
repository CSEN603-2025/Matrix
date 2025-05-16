import React, { useState } from 'react';
import CompanyEvaluation from './CompanyEvaluation';
import { useEvaluations } from '../../context/EvaluationsContext';

// Mock data for evaluations
const mockEvaluations = [
  {
    id: 1,
    companyName: 'Tech Innovators Inc.',
    position: 'Frontend Developer',
    period: 'Jan 2024 - Apr 2024',
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
  }
];

const CompanyEvaluationsList = () => {
  const { evaluations, updateEvaluation, deleteEvaluation } = useEvaluations();
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteEvaluation = (evaluationId) => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      deleteEvaluation(evaluationId);
    }
  };

  const handleUpdateEvaluation = (updatedEvaluation) => {
    updateEvaluation(selectedEvaluation.id, updatedEvaluation);
    setShowEditModal(false);
    setSelectedEvaluation(null);
  };

  const filteredEvaluations = evaluations.filter(evaluation =>
    evaluation.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    evaluation.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div style={{ padding: 24 }}>
      <h2>My Company Evaluations</h2>

      {/* Search Bar */}
      <div style={{ 
        background: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 24,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <input
          type="text"
          placeholder="Search by company name or position..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: 8,
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        />
      </div>

      {/* Evaluations List */}
      <div style={{ display: 'grid', gap: 20 }}>
        {filteredEvaluations.map(evaluation => (
          <div
            key={evaluation.id}
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 20,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, color: '#2196F3' }}>{evaluation.companyName}</h3>
                <p style={{ margin: '8px 0', color: '#666' }}>{evaluation.position}</p>
                <p style={{ margin: '4px 0', color: '#666', fontSize: '0.9em' }}>{evaluation.period}</p>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => {
                    setSelectedEvaluation(evaluation);
                    setShowEditModal(true);
                  }}
                  style={{
                    background: '#E8B4B8',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 20,
                    cursor: 'pointer'
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvaluation(evaluation.id)}
                  style={{
                    background: '#f44336',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: 20,
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 16,
              marginBottom: 16
            }}>
              <div>
                <strong>Overall Rating: </strong>
                <span>{evaluation.evaluation.overallRating}/5</span>
                <span style={{ color: '#FFD700', marginLeft: 4 }}>★</span>
              </div>
              <div>
                <strong>Work Environment: </strong>
                <span>{evaluation.evaluation.workEnvironment}/5</span>
              </div>
              <div>
                <strong>Learning: </strong>
                <span>{evaluation.evaluation.learningOpportunities}/5</span>
              </div>
              <div>
                <strong>Mentorship: </strong>
                <span>{evaluation.evaluation.mentorship}/5</span>
              </div>
            </div>

            <div style={{ marginBottom: 12 }}>
              <RecommendationBadge recommended={evaluation.evaluation.recommend} />
            </div>

            {evaluation.evaluation.pros && (
              <div style={{ marginBottom: 8 }}>
                <strong>Pros: </strong>
                <span style={{ color: '#666' }}>{evaluation.evaluation.pros}</span>
              </div>
            )}
            {evaluation.evaluation.cons && (
              <div style={{ marginBottom: 8 }}>
                <strong>Cons: </strong>
                <span style={{ color: '#666' }}>{evaluation.evaluation.cons}</span>
              </div>
            )}
            {evaluation.evaluation.additionalComments && (
              <div>
                <strong>Additional Comments: </strong>
                <span style={{ color: '#666' }}>{evaluation.evaluation.additionalComments}</span>
              </div>
            )}
          </div>
        ))}

        {filteredEvaluations.length === 0 && (
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: 40,
            textAlign: 'center',
            color: '#666'
          }}>
            No evaluations found matching your search
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedEvaluation && (
        <CompanyEvaluation
          internship={selectedEvaluation}
          onClose={() => {
            setShowEditModal(false);
            setSelectedEvaluation(null);
          }}
          onSave={handleUpdateEvaluation}
          existingEvaluation={selectedEvaluation.evaluation}
        />
      )}
    </div>
  );
};

export default CompanyEvaluationsList; 