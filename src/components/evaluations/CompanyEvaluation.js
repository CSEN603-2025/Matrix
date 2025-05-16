import React, { useState } from 'react';

const CompanyEvaluation = ({ internship, onClose, onSave, existingEvaluation }) => {
  const [evaluation, setEvaluation] = useState(existingEvaluation || {
    workEnvironment: 0,
    learningOpportunities: 0,
    mentorship: 0,
    workLifeBalance: 0,
    overallRating: 0,
    recommend: null,
    pros: '',
    cons: '',
    additionalComments: ''
  });

  const handleRatingChange = (field, value) => {
    setEvaluation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(evaluation);
  };

  const RatingInput = ({ field, label }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 8, color: '#67595E' }}>{label}</label>
      <div style={{ display: 'flex', gap: 8 }}>
        {[1, 2, 3, 4, 5].map(num => (
          <button
            key={num}
            type="button"
            onClick={() => handleRatingChange(field, num)}
            style={{
              width: 40,
              height: 40,
              border: evaluation[field] === num ? 'none' : '1px solid #E8B4B8',
              borderRadius: 20,
              background: evaluation[field] === num ? '#E8B4B8' : 'transparent',
              color: evaluation[field] === num ? '#fff' : '#E8B4B8',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        padding: 32,
        borderRadius: 12,
        width: '90%',
        maxWidth: 800,
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <h2 style={{ margin: 0, color: '#67595E' }}>Company Evaluation</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#67595E'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: '#E8B4B8', marginBottom: 16 }}>Rating Categories</h3>
            <RatingInput field="workEnvironment" label="Work Environment" />
            <RatingInput field="learningOpportunities" label="Learning Opportunities" />
            <RatingInput field="mentorship" label="Mentorship Quality" />
            <RatingInput field="workLifeBalance" label="Work-Life Balance" />
            <RatingInput field="overallRating" label="Overall Rating" />
          </div>

          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: '#E8B4B8', marginBottom: 16 }}>Would you recommend this company?</h3>
            <div style={{ display: 'flex', gap: 16 }}>
              <button
                type="button"
                onClick={() => handleRatingChange('recommend', true)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: 20,
                  background: evaluation.recommend === true ? '#4CAF50' : '#e0e0e0',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                Yes, I recommend
              </button>
              <button
                type="button"
                onClick={() => handleRatingChange('recommend', false)}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: 20,
                  background: evaluation.recommend === false ? '#f44336' : '#e0e0e0',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                No, I don't recommend
              </button>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <h3 style={{ color: '#E8B4B8', marginBottom: 16 }}>Detailed Feedback</h3>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, color: '#67595E' }}>Pros</label>
              <textarea
                value={evaluation.pros}
                onChange={(e) => handleRatingChange('pros', e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  minHeight: 80,
                  resize: 'vertical'
                }}
                placeholder="What did you like about working here?"
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', marginBottom: 8, color: '#67595E' }}>Cons</label>
              <textarea
                value={evaluation.cons}
                onChange={(e) => handleRatingChange('cons', e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  minHeight: 80,
                  resize: 'vertical'
                }}
                placeholder="What could be improved?"
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 8, color: '#67595E' }}>Additional Comments</label>
              <textarea
                value={evaluation.additionalComments}
                onChange={(e) => handleRatingChange('additionalComments', e.target.value)}
                style={{
                  width: '100%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #ddd',
                  minHeight: 80,
                  resize: 'vertical'
                }}
                placeholder="Any other thoughts or advice for future interns?"
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 16 }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '12px 24px',
                border: '1px solid #E8B4B8',
                borderRadius: 8,
                background: 'transparent',
                color: '#E8B4B8',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                border: 'none',
                borderRadius: 8,
                background: '#E8B4B8',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              Save Evaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyEvaluation; 