import React, { useState } from 'react';

const CompanyEvaluation = ({ internship = {}, onClose, onSave, existingEvaluation, isCreating = false }) => {
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

  const [internshipDetails, setInternshipDetails] = useState({
    companyName: internship?.companyName || '',
    position: internship?.position || '',
    period: internship?.period || ''
  });

  const [error, setError] = useState(null);

  const handleRatingChange = (field, value) => {
    setError(null);
    setEvaluation(prev => ({
      ...prev,
      [field]: value,
      overallRating: field !== 'overallRating' ? calculateOverallRating({
        ...prev,
        [field]: value
      }) : value
    }));
  };

  const handleInternshipChange = (field, value) => {
    setError(null);
    setInternshipDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateOverallRating = (ratings) => {
    const ratingFields = ['workEnvironment', 'learningOpportunities', 'mentorship', 'workLifeBalance'];
    const sum = ratingFields.reduce((acc, field) => acc + (ratings[field] || 0), 0);
    return Number((sum / ratingFields.length).toFixed(1));
  };

  const validateForm = () => {
    // Check if all required ratings are provided
    const requiredRatings = ['workEnvironment', 'learningOpportunities', 'mentorship', 'workLifeBalance'];
    const missingRatings = requiredRatings.filter(field => !evaluation[field]);
    
    if (missingRatings.length > 0) {
      setError('Please provide all ratings');
      return false;
    }

    // Check if recommendation is selected
    if (evaluation.recommend === null) {
      setError('Please select a recommendation');
      return false;
    }

    // Check if pros and cons are provided
    if (!evaluation.pros.trim()) {
      setError('Please provide strengths/pros');
      return false;
    }

    if (!evaluation.cons.trim()) {
      setError('Please provide areas for improvement/cons');
      return false;
    }

    // For creating new evaluation, check internship details
    if (isCreating) {
      if (!internshipDetails.companyName.trim() || 
          !internshipDetails.position.trim() || 
          !internshipDetails.period.trim()) {
        setError('Please provide all internship details');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      if (isCreating) {
        onSave({
          ...evaluation,
          ...internshipDetails,
          overallRating: calculateOverallRating(evaluation)
        });
      } else {
        onSave({
          ...evaluation,
          overallRating: calculateOverallRating(evaluation)
        });
      }
    } catch (err) {
      setError('Failed to save evaluation. Please try again.');
    }
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
        borderRadius: '12px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <div style={{ padding: '24px' }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px' 
          }}>
            <h2 style={{ color: '#67595E', margin: 0 }}>
              {isCreating ? 'Create Evaluation' : 'Edit Evaluation'}
            </h2>
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

          {error && (
            <div style={{
              padding: '12px',
              marginBottom: '16px',
              background: '#FFEBEE',
              color: '#D32F2F',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isCreating && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ color: '#E8B4B8', marginBottom: '16px' }}>Internship Details</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Company Name</label>
                    <input
                      type="text"
                      value={internshipDetails.companyName}
                      onChange={(e) => handleInternshipChange('companyName', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Position</label>
                    <input
                      type="text"
                      value={internshipDetails.position}
                      onChange={(e) => handleInternshipChange('position', e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>
                <div style={{ marginTop: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Period</label>
                  <input
                    type="text"
                    value={internshipDetails.period}
                    onChange={(e) => handleInternshipChange('period', e.target.value)}
                    placeholder="e.g., Jan 2024 - Apr 2024"
                    required
                    style={{
                      width: '100%',
                      padding: '8px',
                      border: '1px solid #ddd',
                      borderRadius: '4px'
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#E8B4B8', marginBottom: '16px' }}>Ratings</h3>
              <RatingInput field="workEnvironment" label="Work Environment" />
              <RatingInput field="learningOpportunities" label="Learning Opportunities" />
              <RatingInput field="mentorship" label="Mentorship" />
              <RatingInput field="workLifeBalance" label="Work-Life Balance" />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#E8B4B8', marginBottom: '16px' }}>Recommendation</h3>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button
                  type="button"
                  onClick={() => handleRatingChange('recommend', true)}
                  style={{
                    padding: '12px 24px',
                    border: evaluation.recommend === true ? 'none' : '1px solid #4CAF50',
                    borderRadius: '8px',
                    background: evaluation.recommend === true ? '#4CAF50' : 'transparent',
                    color: evaluation.recommend === true ? '#fff' : '#4CAF50',
                    cursor: 'pointer'
                  }}
                >
                  Recommend
                </button>
                <button
                  type="button"
                  onClick={() => handleRatingChange('recommend', false)}
                  style={{
                    padding: '12px 24px',
                    border: evaluation.recommend === false ? 'none' : '1px solid #f44336',
                    borderRadius: '8px',
                    background: evaluation.recommend === false ? '#f44336' : 'transparent',
                    color: evaluation.recommend === false ? '#fff' : '#f44336',
                    cursor: 'pointer'
                  }}
                >
                  Do Not Recommend
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ color: '#E8B4B8', marginBottom: '16px' }}>Detailed Feedback</h3>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Pros</label>
                <textarea
                  value={evaluation.pros}
                  onChange={(e) => handleRatingChange('pros', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="What were the strengths of this internship?"
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Cons</label>
                <textarea
                  value={evaluation.cons}
                  onChange={(e) => handleRatingChange('cons', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="What could be improved?"
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Additional Comments</label>
                <textarea
                  value={evaluation.additionalComments}
                  onChange={(e) => handleRatingChange('additionalComments', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    minHeight: '80px',
                    resize: 'vertical'
                  }}
                  placeholder="Any other thoughts or advice for future interns?"
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '12px 24px',
                  border: '1px solid #E8B4B8',
                  borderRadius: '8px',
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
                  borderRadius: '8px',
                  background: '#E8B4B8',
                  color: '#fff',
                  cursor: 'pointer'
                }}
              >
                {isCreating ? 'Create' : 'Update'} Evaluation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyEvaluation; 