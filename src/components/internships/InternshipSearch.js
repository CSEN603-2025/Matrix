import React, { useState } from 'react';

// Mock data for available internships
const mockAvailableInternships = [
  {
    id: 1,
    companyName: 'Tech Innovators Inc.',
    position: 'Frontend Developer Intern',
    location: 'Remote',
    type: 'Full-time',
    duration: '3 months',
    deadline: '2024-06-30',
    requirements: [
      'Currently pursuing Computer Science or related field',
      'Knowledge of React and modern JavaScript',
      'Strong problem-solving skills'
    ],
    description: 'Join our dynamic team to work on cutting-edge web applications using React and modern frontend technologies.',
    skills: ['React', 'JavaScript', 'HTML/CSS', 'Git'],
    stipend: '$1000/month',
    openPositions: 2,
    postedDate: '2024-03-15'
  },
  {
    id: 2,
    companyName: 'Data Analytics Co.',
    position: 'Data Science Intern',
    location: 'Hybrid',
    type: 'Part-time',
    duration: '6 months',
    deadline: '2024-07-15',
    requirements: [
      'Background in Statistics or Data Science',
      'Experience with Python and SQL',
      'Knowledge of data visualization tools'
    ],
    description: 'Help us analyze complex datasets and create meaningful insights using advanced analytics tools.',
    skills: ['Python', 'SQL', 'Tableau', 'Machine Learning'],
    stipend: '$1200/month',
    openPositions: 3,
    postedDate: '2024-03-10'
  },
  {
    id: 3,
    companyName: 'Cloud Solutions Ltd.',
    position: 'Cloud Engineering Intern',
    location: 'On-site',
    type: 'Full-time',
    duration: '4 months',
    deadline: '2024-06-15',
    requirements: [
      'Knowledge of cloud platforms (AWS/Azure)',
      'Basic understanding of DevOps practices',
      'Programming experience in any language'
    ],
    description: 'Work with our cloud team to deploy and maintain scalable cloud infrastructure.',
    skills: ['AWS', 'Docker', 'Linux', 'Python'],
    stipend: '$1500/month',
    openPositions: 1,
    postedDate: '2024-03-20'
  }
];

const InternshipSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    duration: ''
  });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Filter internships based on search query and filters
  const filteredInternships = mockAvailableInternships.filter(internship => {
    const matchesSearch = searchQuery === '' || 
      internship.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLocation = filters.location === '' || internship.location === filters.location;
    const matchesType = filters.type === '' || internship.type === filters.type;
    
    return matchesSearch && matchesLocation && matchesType;
  });

  const InternshipDetails = ({ internship }) => (
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>{internship.position}</h2>
          <button 
            onClick={() => {
              setShowDetails(false);
              setSelectedInternship(null);
            }}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ display: 'grid', gap: 20 }}>
          <div>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Company Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
              <strong>Company:</strong> <span>{internship.companyName}</span>
              <strong>Location:</strong> <span>{internship.location}</span>
              <strong>Type:</strong> <span>{internship.type}</span>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Internship Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
              <strong>Duration:</strong> <span>{internship.duration}</span>
              <strong>Stipend:</strong> <span>{internship.stipend}</span>
              <strong>Deadline:</strong> <span>{internship.deadline}</span>
              <strong>Positions:</strong> <span>{internship.openPositions}</span>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Description</h3>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{internship.description}</p>
          </div>

          <div>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Requirements</h3>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {internship.requirements.map((req, index) => (
                <li key={index} style={{ marginBottom: 8 }}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Required Skills</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {internship.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: '#E8B4B8',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: 16,
                    fontSize: '0.9em'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 20 }}>
            <button
              style={{
                background: '#2196F3',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: 8,
                cursor: 'pointer',
                fontSize: '1em'
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>Available Internships</h2>

      {/* Search and Filter Section */}
      <div style={{ 
        background: '#fff',
        padding: 20,
        borderRadius: 8,
        marginBottom: 24,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          gap: 16, 
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Search by job title or company name..."
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
          <div style={{ display: 'flex', gap: 12 }}>
            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '14px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="">All Locations</option>
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '14px',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
            </select>
          </div>
        </div>

        {/* Search Results Summary */}
        <div style={{ 
          marginTop: 12,
          fontSize: '14px',
          color: '#666'
        }}>
          Found {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {(filters.location || filters.type) && ' with selected filters'}
        </div>
      </div>

      {/* Internships List */}
      <div style={{ marginTop: 24 }}>
        {filteredInternships.length > 0 ? (
          filteredInternships.map(internship => (
            <div
              key={internship.id}
              style={{
                background: '#fff',
                borderRadius: 8,
                padding: 20,
                marginBottom: 16,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                ':hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => {
                setSelectedInternship(internship);
                setShowDetails(true);
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: 0, color: '#2196F3' }}>{internship.position}</h3>
                  <p style={{ margin: '8px 0', color: '#666' }}>{internship.companyName}</p>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{
                    color: '#fff',
                    background: '#E8B4B8',
                    padding: '4px 12px',
                    borderRadius: 16,
                    fontSize: '0.9em'
                  }}>
                    {internship.location}
                  </span>
                  <span style={{
                    color: '#fff',
                    background: '#2196F3',
                    padding: '4px 12px',
                    borderRadius: 16,
                    fontSize: '0.9em'
                  }}>
                    {internship.type}
                  </span>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: 24, 
                marginTop: 12,
                color: '#666',
                fontSize: '0.9em'
              }}>
                <div>
                  <strong>Duration:</strong> {internship.duration}
                </div>
                <div>
                  <strong>Stipend:</strong> {internship.stipend}
                </div>
                <div>
                  <strong>Deadline:</strong> {internship.deadline}
                </div>
                <div>
                  <strong>Open Positions:</strong> {internship.openPositions}
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                gap: 8, 
                marginTop: 12,
                flexWrap: 'wrap'
              }}>
                {internship.skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      background: '#f0f0f0',
                      padding: '2px 8px',
                      borderRadius: 12,
                      fontSize: '0.8em',
                      color: '#666'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: 40,
            textAlign: 'center',
            color: '#666'
          }}>
            No internships found matching your search criteria
          </div>
        )}
      </div>

      {showDetails && selectedInternship && (
        <InternshipDetails internship={selectedInternship} />
      )}
    </div>
  );
};

export default InternshipSearch; 