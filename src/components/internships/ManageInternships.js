import React, { useState } from 'react';
import InternshipPostForm from './InternshipPostForm';
import { toast } from 'react-toastify';

const ManageInternships = () => {
  const [internships, setInternships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);

  const handleCreateInternship = (internshipData) => {
    const newInternship = {
      id: Date.now(),
      ...internshipData,
      createdAt: new Date().toISOString(),
      status: 'Active'
    };

    setInternships(prev => [newInternship, ...prev]);
    setShowForm(false);
    toast.success('Internship posted successfully!');
  };

  const handleUpdateInternship = (internshipData) => {
    setInternships(prev =>
      prev.map(internship =>
        internship.id === editingInternship.id
          ? { ...internship, ...internshipData }
          : internship
      )
    );
    setEditingInternship(null);
    setShowForm(false);
    toast.success('Internship updated successfully!');
  };

  const handleDeleteInternship = (internshipId) => {
    if (window.confirm('Are you sure you want to delete this internship post?')) {
      setInternships(prev => prev.filter(internship => internship.id !== internshipId));
      toast.info('Internship deleted successfully');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="manage-internships">
      <div className="header">
        <h1>Manage Internships</h1>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingInternship(null);
            setShowForm(true);
          }}
        >
          Post New Internship
        </button>
      </div>

      {showForm ? (
        <InternshipPostForm
          internship={editingInternship}
          onSubmit={editingInternship ? handleUpdateInternship : handleCreateInternship}
          onCancel={() => {
            setShowForm(false);
            setEditingInternship(null);
          }}
        />
      ) : (
        <div className="internships-list">
          {internships.length === 0 ? (
            <div className="no-internships">
              <p>No internship posts yet. Click "Post New Internship" to create one.</p>
            </div>
          ) : (
            internships.map(internship => (
              <div key={internship.id} className="internship-card">
                <div className="internship-header">
                  <h2>{internship.title}</h2>
                  <div className="actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setEditingInternship(internship);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteInternship(internship.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="internship-details">
                  <div className="detail-row">
                    <span className="label">Duration:</span>
                    <span>{internship.duration}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Compensation:</span>
                    <span>
                      {internship.isPaid 
                        ? `Paid - ${internship.salary} AED/month`
                        : 'Unpaid'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Location:</span>
                    <span>{internship.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Start Date:</span>
                    <span>{formatDate(internship.startDate)}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Application Deadline:</span>
                    <span>{formatDate(internship.applicationDeadline)}</span>
                  </div>
                </div>

                <div className="skills">
                  <strong>Required Skills:</strong>
                  <p>{internship.skills}</p>
                </div>

                <div className="description">
                  <strong>Description:</strong>
                  <p>{internship.description}</p>
                </div>

                {internship.requirements && (
                  <div className="requirements">
                    <strong>Requirements:</strong>
                    <p>{internship.requirements}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      <style jsx>{`
        .manage-internships {
          padding: 2rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .header h1 {
          color: var(--dark);
          margin: 0;
        }

        .internships-list {
          display: grid;
          gap: 1.5rem;
        }

        .no-internships {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 8px;
          color: #666;
        }

        .internship-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .internship-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .internship-header h2 {
          color: var(--dark);
          margin: 0;
          font-size: 1.25rem;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
        }

        .internship-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          flex-direction: column;
        }

        .label {
          color: #666;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .skills,
        .description,
        .requirements {
          margin-bottom: 1rem;
        }

        .skills strong,
        .description strong,
        .requirements strong {
          display: block;
          color: var(--dark);
          margin-bottom: 0.5rem;
        }

        .skills p,
        .description p,
        .requirements p {
          color: #666;
          margin: 0;
          line-height: 1.5;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
        }

        .btn-secondary {
          background: #f5f5f5;
          color: var(--dark);
          border: 1px solid #ddd;
        }

        .btn-danger {
          background: #F44336;
          color: white;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default ManageInternships; 