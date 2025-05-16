import React, { useState } from 'react';

// Mock data for evaluations
const mockEvaluations = [
  {
    id: 1,
    studentId: '20231235',
    studentName: 'Sara Lee',
    internshipTitle: 'Data Analyst',
    completionDate: '2024-05-09',
    technicalSkills: 4,
    communicationSkills: 5,
    problemSolving: 4,
    initiative: 5,
    teamwork: 4,
    punctuality: 5,
    overallPerformance: 4.5,
    strengths: 'Excellent analytical skills and great team player',
    areasForImprovement: 'Could improve technical documentation',
    additionalComments: 'Would highly recommend for future positions',
    status: 'Completed'
  }
];

const StudentEvaluation = ({ intern, onClose, onSave, isEditing = false }) => {
  const [formData, setFormData] = useState({
    studentId: intern?.studentId || '',
    studentName: intern?.studentName || '',
    internshipTitle: intern?.post || '',
    completionDate: intern?.completionDate || new Date().toISOString().split('T')[0],
    technicalSkills: intern?.technicalSkills || 0,
    communicationSkills: intern?.communicationSkills || 0,
    problemSolving: intern?.problemSolving || 0,
    initiative: intern?.initiative || 0,
    teamwork: intern?.teamwork || 0,
    punctuality: intern?.punctuality || 0,
    overallPerformance: intern?.overallPerformance || 0,
    strengths: intern?.strengths || '',
    areasForImprovement: intern?.areasForImprovement || '',
    additionalComments: intern?.additionalComments || '',
    status: intern?.status || 'Completed'
  });

  // If intern is not provided, return null or an error message
  if (!intern) {
    return (
      <div style={{ 
        padding: '24px',
        textAlign: 'center',
        color: '#67595E'
      }}>
        <h2>Error: No intern data provided</h2>
        <button
          onClick={onClose}
          style={{
            padding: '12px 24px',
            border: '1px solid #E8B4B8',
            borderRadius: '8px',
            background: 'transparent',
            color: '#E8B4B8',
            cursor: 'pointer',
            marginTop: '16px'
          }}
        >
          Close
        </button>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const calculateOverallPerformance = () => {
    const skills = [
      formData.technicalSkills,
      formData.communicationSkills,
      formData.problemSolving,
      formData.initiative,
      formData.teamwork,
      formData.punctuality
    ];
    const sum = skills.reduce((acc, curr) => acc + Number(curr), 0);
    return (sum / skills.length).toFixed(1);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '24px' 
      }}>
        <h2 style={{ color: '#67595E', margin: 0 }}>
          {isEditing ? 'Edit Evaluation' : 'Evaluate Student'}
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

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Student Name</label>
              <input
                type="text"
                value={formData.studentName}
                disabled
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: '#f5f5f5'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Student ID</label>
              <input
                type="text"
                value={formData.studentId}
                disabled
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: '#f5f5f5'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Position</label>
              <input
                type="text"
                value={formData.internshipTitle}
                disabled
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: '#f5f5f5'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Evaluation Date</label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleInputChange}
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

          <h3 style={{ color: '#67595E', marginBottom: '16px' }}>Performance Ratings (1-5)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '24px' }}>
            {[
              { name: 'technicalSkills', label: 'Technical Skills' },
              { name: 'communicationSkills', label: 'Communication Skills' },
              { name: 'problemSolving', label: 'Problem Solving' },
              { name: 'initiative', label: 'Initiative' },
              { name: 'teamwork', label: 'Teamwork' },
              { name: 'punctuality', label: 'Punctuality' }
            ].map(skill => (
              <div key={skill.name}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>{skill.label}</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map(rating => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => handleInputChange({ target: { name: skill.name, value: rating } })}
                      style={{
                        width: '40px',
                        height: '40px',
                        border: formData[skill.name] === rating ? 'none' : '1px solid #E8B4B8',
                        borderRadius: '20px',
                        background: formData[skill.name] === rating ? '#E8B4B8' : 'transparent',
                        color: formData[skill.name] === rating ? '#fff' : '#E8B4B8',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Overall Performance</label>
            <div style={{ 
              padding: '16px', 
              background: '#f5f5f5', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '24px', color: '#67595E' }}>{calculateOverallPerformance()}</span>
              <span style={{ color: '#FFD700', fontSize: '24px' }}>★</span>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Strengths</label>
            <textarea
              name="strengths"
              value={formData.strengths}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="What are the student's key strengths?"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Areas for Improvement</label>
            <textarea
              name="areasForImprovement"
              value={formData.areasForImprovement}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="What areas could the student improve in?"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>Additional Comments</label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                minHeight: '80px',
                resize: 'vertical'
              }}
              placeholder="Any additional feedback or comments?"
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
            {isEditing ? 'Update' : 'Submit'} Evaluation
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentEvaluation; 