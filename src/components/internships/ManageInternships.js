import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InternshipPostForm from './InternshipPostForm';
import { toast } from 'react-toastify';

// Mock data for company internships
const mockInternships = [
  {
    id: 1,
    title: 'Software Engineering Intern',
    description: 'Join our software engineering team and work on cutting-edge projects.',
    requirements: ['Java', 'Spring Boot', 'React'],
    field: 'Software Development',
    duration: '3 months',
    location: 'Cairo',
    deadline: '2024-06-15',
    isPaid: true,
    salary: '5000 EGP',
    status: 'Active',
    applicantsCount: 12
  },
  {
    id: 2,
    title: 'Data Science Intern',
    description: 'Work on machine learning and data analysis projects.',
    requirements: ['Python', 'Machine Learning', 'SQL'],
    field: 'Data Science',
    duration: '6 months',
    location: 'Remote',
    deadline: '2024-07-01',
    isPaid: true,
    salary: '6000 EGP',
    status: 'Active',
    applicantsCount: 8
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    description: 'Design user interfaces for our web and mobile applications.',
    requirements: ['Figma', 'Adobe XD', 'UI/UX Principles'],
    field: 'Design',
    duration: '4 months',
    location: 'Hybrid',
    deadline: '2024-06-30',
    isPaid: true,
    salary: '4500 EGP',
    status: 'Draft',
    applicantsCount: 0
  }
];

const ManageInternships = () => {
  const navigate = useNavigate();
  const [internships, setInternships] = useState(mockInternships);
  const [showForm, setShowForm] = useState(false);
  const [editingInternship, setEditingInternship] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [fieldFilter, setFieldFilter] = useState('');

  // Get unique values for filters
  const locations = [...new Set(mockInternships.map(internship => internship.location))];
  const fields = [...new Set(mockInternships.map(internship => internship.field))];
  const statuses = [...new Set(mockInternships.map(internship => internship.status))];

  // Filter internships based on search term and filters
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.requirements.some(req => req.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = !statusFilter || internship.status === statusFilter;
    const matchesLocation = !locationFilter || internship.location === locationFilter;
    const matchesField = !fieldFilter || internship.field === fieldFilter;

    return matchesSearch && matchesStatus && matchesLocation && matchesField;
  });

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

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#4CAF50';
      case 'draft':
        return '#FFA000';
      case 'closed':
        return '#F44336';
      default:
        return '#67595E';
    }
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

      {/* Search and Filters */}
      <div style={{ 
        background: '#fff', 
        padding: '16px', 
        borderRadius: '12px', 
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        display: 'grid',
        gap: '16px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'
      }}>
        <input
          type="text"
          placeholder="Search internships..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="">All Statuses</option>
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <select
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="">All Locations</option>
          {locations.map(location => (
            <option key={location} value={location}>{location}</option>
          ))}
        </select>
        <select
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px'
          }}
        >
          <option value="">All Fields</option>
          {fields.map(field => (
            <option key={field} value={field}>{field}</option>
          ))}
        </select>
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
          {filteredInternships.length === 0 ? (
            <div className="no-internships">
              <p>No internship posts match your search criteria.</p>
            </div>
          ) : (
            filteredInternships.map(internship => (
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
                        ? `Paid - ${internship.salary}`
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
                    <p>{internship.requirements.join(', ')}</p>
                  </div>
                )}

                <div className="status">
                  <strong>Status:</strong>
                  <span style={{
                    background: getStatusColor(internship.status),
                    color: '#fff',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {internship.status}
                  </span>
                </div>

                <div className="applicants">
                  <strong>Applicants:</strong>
                  <p>{internship.applicantsCount} {internship.applicantsCount === 1 ? 'applicant' : 'applicants'}</p>
                </div>
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