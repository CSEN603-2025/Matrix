import React, { useState } from 'react';
import CompanyEvaluation from '../evaluations/CompanyEvaluation';
import InternshipReport from './InternshipReport';
import { useEvaluations } from '../../context/EvaluationsContext';
import { useReports } from '../../context/ReportsContext';

// Mock data for internships
const mockInternships = [
  {
    id: 1,
    companyName: 'Tech Innovators Inc.',
    position: 'Frontend Developer',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    status: 'Current',
    description: 'Working on React-based web applications and contributing to the company\'s main product development. Responsibilities include implementing new features, fixing bugs, and collaborating with the design team.',
    supervisor: 'Jane Smith',
    companyEvaluation: null // Current internship, no evaluation yet
  },
  {
    id: 2,
    companyName: 'Data Analytics Co.',
    position: 'Data Analyst Intern',
    startDate: '2023-06-01',
    endDate: '2023-08-31',
    status: 'Completed',
    description: 'Worked on data visualization projects using Python and Tableau. Analyzed customer behavior patterns and created interactive dashboards for stakeholders.',
    supervisor: 'John Doe',
    companyEvaluation: {
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
    startDate: '2023-01-10',
    endDate: '2023-04-10',
    status: 'Completed',
    description: 'Assisted in managing and deploying cloud infrastructure using AWS. Gained hands-on experience with containerization and microservices architecture.',
    supervisor: 'Mike Wilson',
    companyEvaluation: null // Completed but not evaluated yet
  },
  {
    id: 4,
    companyName: 'Tech Innovators Inc.',
    position: 'Software Engineering Intern',
    startDate: '2022-06-15',
    endDate: '2022-09-15',
    status: 'Completed',
    description: 'Worked on backend development using Node.js and MongoDB. Implemented RESTful APIs and improved database performance.',
    supervisor: 'Sarah Johnson',
    companyEvaluation: {
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
    id: 5,
    companyName: 'FinTech Solutions',
    position: 'Full Stack Developer Intern',
    startDate: '2022-01-15',
    endDate: '2022-04-15',
    status: 'Completed',
    description: 'Developed and maintained financial applications using React and Spring Boot. Implemented secure payment processing features and user authentication.',
    supervisor: 'David Chen',
    companyEvaluation: {
      workEnvironment: 3,
      learningOpportunities: 4,
      mentorship: 3,
      workLifeBalance: 4,
      overallRating: 3,
      recommend: false,
      pros: 'Good tech stack, interesting projects',
      cons: 'Limited guidance, unclear expectations',
      additionalComments: 'Good for experienced developers, might be challenging for beginners'
    }
  }
];

const InternshipHistory = () => {
  const { addEvaluation, getEvaluationByInternship } = useEvaluations();
  const { getReportByInternshipId } = useReports();
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedCompletedInternship, setSelectedCompletedInternship] = useState(null);

  const statusColors = {
    'Current': '#2196F3',
    'Completed': '#4CAF50'
  };

  // Filter internships based on search, status, and date
  const filteredInternships = mockInternships.filter(internship => {
    const matchesSearch = searchQuery === '' || 
      internship.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === '' || internship.status === statusFilter;
    
    let matchesDate = true;
    const today = new Date();
    const startDate = new Date(internship.startDate);
    const endDate = new Date(internship.endDate);
    
    switch(dateFilter) {
      case 'last3months':
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(today.getMonth() - 3);
        matchesDate = startDate >= threeMonthsAgo || endDate >= threeMonthsAgo;
        break;
      case 'last6months':
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        matchesDate = startDate >= sixMonthsAgo || endDate >= sixMonthsAgo;
        break;
      case 'lastyear':
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        matchesDate = startDate >= oneYearAgo || endDate >= oneYearAgo;
        break;
      default:
        matchesDate = true;
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSelectInternship = (internship) => {
    if (internship.status === 'Completed') {
      setSelectedCompletedInternship(internship);
      // Here you would typically make an API call to update the student's selected internship
      alert('Internship selected successfully!');
    }
  };

  const handleSaveEvaluation = (evaluation) => {
    addEvaluation(selectedInternship, evaluation);
    setSelectedInternship(prevInternship =>
      prevInternship ? { ...prevInternship, companyEvaluation: evaluation } : null
    );
    setShowEvaluation(false);
    alert('Evaluation submitted successfully!');
  };

  const handleViewReport = (internship) => {
    setSelectedInternship(internship);
    setShowReport(true);
    setShowDetails(false);
    setShowEvaluation(false);
  };

  const EvaluationButton = ({ internship }) => {
    if (internship.status !== 'Completed') {
      return null;
    }

    if (internship.companyEvaluation) {
      return (
        <button
          onClick={() => {
            setSelectedInternship(internship);
            setShowDetails(true);
          }}
          style={{
            background: '#4CAF50',
            color: '#fff',
            border: 'none',
            padding: '4px 12px',
            borderRadius: 16,
            fontSize: '0.9em',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span>✓</span>
          <span>Evaluated</span>
        </button>
      );
    }

    return (
      <button
        onClick={() => {
          setSelectedInternship(internship);
          setShowEvaluation(true);
        }}
        style={{
          background: '#E8B4B8',
          color: '#fff',
          border: 'none',
          padding: '4px 12px',
          borderRadius: 16,
          fontSize: '0.9em',
          cursor: 'pointer'
        }}
      >
        Evaluate Company
      </button>
    );
  };

  const ReportButton = ({ internship }) => {
    const hasReport = getReportByInternshipId(internship.id);
    
    return (
      <button
        onClick={() => handleViewReport(internship)}
        style={{
          background: hasReport ? '#4CAF50' : '#2196F3',
          color: '#fff',
          border: 'none',
          padding: '4px 12px',
          borderRadius: 16,
          cursor: 'pointer',
          fontSize: '0.9em',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}
      >
        {hasReport ? (
          <>
            <span>✓</span>
            <span>View Report</span>
          </>
        ) : (
          'Create Report'
        )}
      </button>
    );
  };

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
          <h2 style={{ margin: 0 }}>Internship Details</h2>
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
              <strong>Position:</strong> <span>{internship.position}</span>
              <strong>Supervisor:</strong> <span>{internship.supervisor}</span>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Internship Period</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8 }}>
              <strong>Start Date:</strong> <span>{internship.startDate}</span>
              <strong>End Date:</strong> <span>{internship.endDate}</span>
              <strong>Status:</strong> 
              <span style={{
                color: '#fff',
                background: statusColors[internship.status],
                padding: '2px 8px',
                borderRadius: 12,
                display: 'inline-block',
                fontSize: '0.9em'
              }}>
                {internship.status}
              </span>
            </div>
          </div>

          <div>
            <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Description</h3>
            <p style={{ margin: 0, lineHeight: 1.6 }}>{internship.description}</p>
          </div>

          {internship.status === 'Completed' && internship.companyEvaluation && (
            <div>
              <h3 style={{ color: '#E8B4B8', marginBottom: 12 }}>Your Company Evaluation</h3>
              <div style={{ display: 'grid', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <strong>Overall Rating:</strong>
                  <span>{internship.companyEvaluation.overallRating}</span>
                  <span style={{ color: '#FFD700' }}>★</span>
                </div>
                <div>
                  <strong>Work Environment:</strong> {internship.companyEvaluation.workEnvironment}/5
                </div>
                <div>
                  <strong>Learning Opportunities:</strong> {internship.companyEvaluation.learningOpportunities}/5
                </div>
                <div>
                  <strong>Mentorship:</strong> {internship.companyEvaluation.mentorship}/5
                </div>
                <div>
                  <strong>Work-Life Balance:</strong> {internship.companyEvaluation.workLifeBalance}/5
                </div>
                <div>
                  <strong>Recommendation:</strong>
                  <span style={{
                    color: '#fff',
                    background: internship.companyEvaluation.recommend ? '#4CAF50' : '#f44336',
                    padding: '2px 8px',
                    borderRadius: 12,
                    marginLeft: 8,
                    fontSize: '0.9em'
                  }}>
                    {internship.companyEvaluation.recommend ? 'Recommended' : 'Not Recommended'}
                  </span>
                </div>
                {internship.companyEvaluation.pros && (
                  <div>
                    <strong>Pros:</strong>
                    <p style={{ margin: '4px 0' }}>{internship.companyEvaluation.pros}</p>
                  </div>
                )}
                {internship.companyEvaluation.cons && (
                  <div>
                    <strong>Cons:</strong>
                    <p style={{ margin: '4px 0' }}>{internship.companyEvaluation.cons}</p>
                  </div>
                )}
                {internship.companyEvaluation.additionalComments && (
                  <div>
                    <strong>Additional Comments:</strong>
                    <p style={{ margin: '4px 0' }}>{internship.companyEvaluation.additionalComments}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div style={{ 
          marginTop: 24,
          display: 'flex',
          gap: 12,
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={() => handleViewReport(internship)}
            style={{
              background: '#2196F3',
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: 20,
              cursor: 'pointer'
            }}
          >
            View Report
          </button>
        </div>
      </div>
    </div>
  );

  const internshipListItem = (internship) => (
    <div
      key={internship.id}
      style={{
        background: '#fff',
        borderRadius: 8,
        padding: 20,
        marginBottom: 16,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, color: '#2196F3' }}>{internship.position}</h3>
          <p style={{ margin: '8px 0', color: '#666' }}>{internship.companyName}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{
            color: '#fff',
            background: statusColors[internship.status],
            padding: '4px 12px',
            borderRadius: 16,
            fontSize: '0.9em'
          }}>
            {internship.status}
          </span>
          <EvaluationButton internship={internship} />
          <ReportButton internship={internship} />
          <button
            onClick={() => {
              setSelectedInternship(internship);
              setShowDetails(true);
            }}
            style={{
              background: 'transparent',
              border: '1px solid #E8B4B8',
              color: '#E8B4B8',
              padding: '4px 12px',
              borderRadius: 16,
              cursor: 'pointer',
              fontSize: '0.9em'
            }}
          >
            View Details
          </button>
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
          <strong>Duration:</strong> {internship.startDate} - {internship.endDate}
        </div>
        <div>
          <strong>Supervisor:</strong> {internship.supervisor}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: 24 }}>
      <h2>My Internship History</h2>

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
          {/* Search Input */}
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
          
          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '14px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                minWidth: '180px'
              }}
            >
              <option value="">All Status</option>
              <option value="Current">Current Intern</option>
              <option value="Completed">Internship Completed</option>
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              style={{
                padding: '10px 16px',
                borderRadius: 8,
                border: '1px solid #ddd',
                fontSize: '14px',
                backgroundColor: '#fff',
                cursor: 'pointer',
                minWidth: '150px'
              }}
            >
              <option value="all">All Time</option>
              <option value="last3months">Last 3 Months</option>
              <option value="last6months">Last 6 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div style={{ 
          marginTop: 12,
          fontSize: '14px',
          color: '#666'
        }}>
          Found {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''}
          {searchQuery && ` matching "${searchQuery}"`}
          {(statusFilter || dateFilter !== 'all') && ' with selected filters'}
        </div>
      </div>

      {/* Internships List */}
      <div style={{ marginTop: 24 }}>
        {filteredInternships.length > 0 ? (
          filteredInternships.map(internship => internshipListItem(internship))
        ) : (
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: 40,
            textAlign: 'center',
            color: '#666'
          }}>
            No internships found matching your criteria
          </div>
        )}
      </div>

      {showDetails && selectedInternship && (
        <InternshipDetails internship={selectedInternship} />
      )}

      {showEvaluation && selectedInternship && (
        <CompanyEvaluation
          internship={selectedInternship}
          onClose={() => setShowEvaluation(false)}
          onSave={handleSaveEvaluation}
          existingEvaluation={selectedInternship.companyEvaluation}
        />
      )}

      {showReport && selectedInternship && (
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
            borderRadius: 8,
            width: '90%',
            maxWidth: 1000,
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => {
                setShowReport(false);
                setSelectedInternship(null);
              }}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                zIndex: 1
              }}
            >
              ×
            </button>
            <InternshipReport internship={selectedInternship} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipHistory; 