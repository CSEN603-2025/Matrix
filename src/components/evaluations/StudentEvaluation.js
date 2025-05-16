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

const StudentEvaluation = () => {
  const [evaluations, setEvaluations] = useState(mockEvaluations);
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [selectedEvaluation, setSelectedEvaluation] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    studentName: '',
    internshipTitle: '',
    completionDate: '',
    technicalSkills: 0,
    communicationSkills: 0,
    problemSolving: 0,
    initiative: 0,
    teamwork: 0,
    punctuality: 0,
    overallPerformance: 0,
    strengths: '',
    areasForImprovement: '',
    additionalComments: '',
    status: 'Completed'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedEvaluation) {
      // Update existing evaluation
      setEvaluations(evaluations.map(evaluation => 
        evaluation.id === selectedEvaluation.id ? { ...formData, id: evaluation.id } : evaluation
      ));
    } else {
      // Create new evaluation
      setEvaluations([...evaluations, { ...formData, id: Date.now() }]);
    }
    handleCloseForm();
  };

  const handleEdit = (evaluation) => {
    setSelectedEvaluation(evaluation);
    setFormData(evaluation);
    setShowEvaluationForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this evaluation?')) {
      setEvaluations(evaluations.filter(evaluation => evaluation.id !== id));
    }
  };

  const handleCloseForm = () => {
    setShowEvaluationForm(false);
    setSelectedEvaluation(null);
    setFormData({
      studentId: '',
      studentName: '',
      internshipTitle: '',
      completionDate: '',
      technicalSkills: 0,
      communicationSkills: 0,
      problemSolving: 0,
      initiative: 0,
      teamwork: 0,
      punctuality: 0,
      overallPerformance: 0,
      strengths: '',
      areasForImprovement: '',
      additionalComments: '',
      status: 'Completed'
    });
  };

  const EvaluationForm = () => (
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
        padding: 24,
        borderRadius: 8,
        width: '80%',
        maxWidth: 800,
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <h2>{selectedEvaluation ? 'Edit Evaluation' : 'New Evaluation'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <div>
              <label>Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label>Internship Title</label>
              <input
                type="text"
                name="internshipTitle"
                value={formData.internshipTitle}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
            <div>
              <label>Completion Date</label>
              <input
                type="date"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleInputChange}
                required
                style={{ width: '100%', padding: 8, marginTop: 4 }}
              />
            </div>
          </div>

          <h3>Performance Ratings (1-5)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              'technicalSkills',
              'communicationSkills',
              'problemSolving',
              'initiative',
              'teamwork',
              'punctuality'
            ].map(skill => (
              <div key={skill}>
                <label>{skill.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                <input
                  type="number"
                  name={skill}
                  value={formData[skill]}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  required
                  style={{ width: '100%', padding: 8, marginTop: 4 }}
                />
              </div>
            ))}
          </div>

          <div>
            <label>Overall Performance (1-5)</label>
            <input
              type="number"
              name="overallPerformance"
              value={formData.overallPerformance}
              onChange={handleInputChange}
              min="1"
              max="5"
              step="0.5"
              required
              style={{ width: '100%', padding: 8, marginTop: 4 }}
            />
          </div>

          <div>
            <label>Strengths</label>
            <textarea
              name="strengths"
              value={formData.strengths}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4, minHeight: 80 }}
            />
          </div>

          <div>
            <label>Areas for Improvement</label>
            <textarea
              name="areasForImprovement"
              value={formData.areasForImprovement}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: 8, marginTop: 4, minHeight: 80 }}
            />
          </div>

          <div>
            <label>Additional Comments</label>
            <textarea
              name="additionalComments"
              value={formData.additionalComments}
              onChange={handleInputChange}
              style={{ width: '100%', padding: 8, marginTop: 4, minHeight: 80 }}
            />
          </div>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'flex-end', marginTop: 16 }}>
            <button
              type="button"
              onClick={handleCloseForm}
              style={{
                padding: '8px 16px',
                border: '1px solid #ccc',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                padding: '8px 16px',
                background: '#2196F3',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer'
              }}
            >
              {selectedEvaluation ? 'Update' : 'Submit'} Evaluation
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2>Student Evaluations</h2>
        <button
          onClick={() => setShowEvaluationForm(true)}
          style={{
            padding: '8px 16px',
            background: '#2196F3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          New Evaluation
        </button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
          <thead style={{ background: '#E8B4B8' }}>
            <tr>
              <th style={{ padding: 12 }}>Student Name</th>
              <th style={{ padding: 12 }}>Student ID</th>
              <th style={{ padding: 12 }}>Internship</th>
              <th style={{ padding: 12 }}>Completion Date</th>
              <th style={{ padding: 12 }}>Overall Performance</th>
              <th style={{ padding: 12 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {evaluations.map(evaluation => (
              <tr key={evaluation.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: 12 }}>{evaluation.studentName}</td>
                <td style={{ padding: 12 }}>{evaluation.studentId}</td>
                <td style={{ padding: 12 }}>{evaluation.internshipTitle}</td>
                <td style={{ padding: 12 }}>{evaluation.completionDate}</td>
                <td style={{ padding: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span>{evaluation.overallPerformance}</span>
                    <span style={{ color: '#FFD700' }}>★</span>
                  </div>
                </td>
                <td style={{ padding: 12 }}>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => handleEdit(evaluation)}
                      style={{
                        padding: '4px 8px',
                        background: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(evaluation.id)}
                      style={{
                        padding: '4px 8px',
                        background: '#F44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEvaluationForm && <EvaluationForm />}
    </div>
  );
};

export default StudentEvaluation; 