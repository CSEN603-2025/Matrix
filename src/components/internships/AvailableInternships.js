import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { sendInternshipApplicationNotification } from '../../services/notificationService';
import { sendInternshipApplicationEmail } from '../../services/emailService';
import { toast } from 'react-toastify';
import { useNotifications } from '../../context/NotificationContext';

const InternshipDetailModal = ({ internship, onClose, onApply }) => {
  const { user } = useAuth();
  const canApply = user?.role === 'student' || user?.role === 'pro_student';

  if (!internship) return null;

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
        padding: '32px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#67595E'
          }}
        >
          ×
        </button>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ color: '#67595E', margin: '0 0 8px' }}>{internship.position}</h2>
          <div style={{ color: '#A49393', fontSize: '18px' }}>{internship.company}</div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          background: '#fafafa',
          borderRadius: '8px'
        }}>
          <div>
            <div style={{ color: '#67595E', fontWeight: '600', marginBottom: '4px' }}>Location</div>
            <div>📍 {internship.location}</div>
          </div>
          <div>
            <div style={{ color: '#67595E', fontWeight: '600', marginBottom: '4px' }}>Duration</div>
            <div>⏱️ {internship.duration}</div>
          </div>
          <div>
            <div style={{ color: '#67595E', fontWeight: '600', marginBottom: '4px' }}>Industry</div>
            <div>🏢 {internship.industry}</div>
          </div>
          <div>
            <div style={{ color: '#67595E', fontWeight: '600', marginBottom: '4px' }}>Deadline</div>
            <div>📅 {new Date(internship.deadline).toLocaleDateString()}</div>
          </div>
          <div>
            <div style={{ color: '#67595E', fontWeight: '600', marginBottom: '4px' }}>Compensation</div>
            <div>💰 {internship.isPaid ? internship.salary : 'Unpaid'}</div>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#67595E', marginBottom: '12px' }}>Description</h3>
          <p style={{ 
            color: '#67595E', 
            lineHeight: '1.6',
            background: '#fff',
            padding: '16px',
            borderRadius: '8px',
            border: '1px solid #EED6D3'
          }}>
            {internship.description}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ color: '#67595E', marginBottom: '12px' }}>Required Skills</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {internship.requirements.map((skill, index) => (
              <span
                key={index}
                style={{
                  background: '#EED6D3',
                  color: '#67595E',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '14px'
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {canApply && (
          <button
            onClick={onApply}
            style={{
              width: '100%',
              padding: '16px',
              background: '#E8B4B8',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            Apply for this Internship
          </button>
        )}
      </div>
    </div>
  );
};

// New Application Modal Component
const ApplicationModal = ({ internship, onClose }) => {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [files, setFiles] = useState({
    cv: null,
    coverLetter: null,
    certificates: [],
    supportingDocs: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create application object
      const application = {
        id: Date.now(),
        studentId: user.id,
        studentName: user.name,
        position: internship.position,
        company: internship.company,
        applicationDate: new Date().toISOString(),
        status: 'Pending',
        files
      };

      // Send notifications to company
      await sendInternshipApplicationEmail(application, {
        id: internship.companyId,
        name: internship.company,
        companyEmail: internship.companyEmail
      });

      // Add notification for the company
      addNotification({
        recipientId: internship.companyId,
        recipientType: 'company',
        type: 'application',
        title: 'New Internship Application',
        message: `${user.name} has applied for the ${internship.position} position`,
        category: 'internship_application'
      });

      sendInternshipApplicationNotification(application, {
        id: internship.companyId,
        name: internship.company
      });

      toast.success('Application submitted successfully!');
      onClose();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        borderRadius: '8px',
        padding: '32px',
        width: '90%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#67595E'
          }}
        >
          ×
        </button>

        <h2 style={{ color: '#67595E', marginBottom: '24px' }}>Apply for {internship.position} at {internship.company}</h2>

        <form onSubmit={handleSubmit}>
          {/* Required Documents Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px' }}>Required Documents</h3>
            
            {/* CV Upload */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>
                CV/Resume <span style={{ color: '#E8B4B8' }}>*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFiles({ ...files, cv: e.target.files[0] })}
                required
                style={{ width: '100%' }}
              />
            </div>

            {/* Cover Letter Upload */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>
                Cover Letter
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFiles({ ...files, coverLetter: e.target.files[0] })}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Additional Documents Section */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ color: '#67595E', marginBottom: '16px' }}>Additional Documents</h3>
            
            {/* Certificates Upload */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>
                Certificates
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => setFiles({ ...files, certificates: Array.from(e.target.files) })}
                style={{ width: '100%' }}
              />
            </div>

            {/* Supporting Documents Upload */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: '#67595E' }}>
                Other Supporting Documents
              </label>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                multiple
                onChange={(e) => setFiles({ ...files, supportingDocs: Array.from(e.target.files) })}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              background: '#E8B4B8',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
            disabled={isSubmitting}
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

const AvailableInternships = () => {
  const { user } = useAuth();
  const canApply = user?.role === 'student' || user?.role === 'pro_student';
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    company: '',
    industry: '',
    duration: '',
    isPaid: ''
  });
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  // Mock data for available internships
  const internships = [
    {
      id: 1,
      company: 'IBM',
      position: 'Software Engineering Intern',
      location: 'Cairo',
      duration: '3 months',
      deadline: '2024-06-15',
      description: 'Join our software engineering team and work on cutting-edge projects.',
      requirements: ['Java', 'Spring Boot', 'React'],
      industry: 'Technology',
      isNew: true,
      isPaid: true,
      salary: '5000 EGP'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Cloud Engineering Intern',
      location: 'Remote',
      duration: '6 months',
      deadline: '2024-06-20',
      description: 'Work with Azure cloud services and help build scalable solutions.',
      requirements: ['Cloud Computing', 'Python', 'DevOps'],
      industry: 'Technology',
      isNew: true,
      isPaid: true,
      salary: '6000 EGP'
    },
    {
      id: 3,
      company: 'Vodafone',
      position: 'Network Engineering Intern',
      location: 'Alexandria',
      duration: '4 months',
      deadline: '2024-06-10',
      description: 'Support our network infrastructure team and learn about 5G technologies.',
      requirements: ['Networking', 'Linux', 'Cisco'],
      industry: 'Telecommunications',
      isNew: false,
      isPaid: true,
      salary: '4500 EGP'
    },
    {
      id: 4,
      company: 'Orange',
      position: 'Data Science Intern',
      location: 'Giza',
      duration: '3 months',
      deadline: '2024-06-25',
      description: 'Apply machine learning to solve real-world telecom problems.',
      requirements: ['Python', 'Machine Learning', 'SQL'],
      industry: 'Telecommunications',
      isNew: false,
      isPaid: false
    },
    {
      id: 5,
      company: 'Dell EMC',
      position: 'Systems Engineering Intern',
      location: 'Cairo',
      duration: '6 months',
      deadline: '2024-07-01',
      description: 'Work on enterprise storage solutions and cloud infrastructure.',
      requirements: ['Storage Systems', 'Linux', 'Networking'],
      industry: 'Technology',
      isNew: true,
      isPaid: true,
      salary: '5500 EGP'
    }
  ];

  // Get unique values for filters
  const companies = [...new Set(internships.map(internship => internship.company))];
  const industries = [...new Set(internships.map(internship => internship.industry))];
  const durations = [...new Set(internships.map(internship => internship.duration))];

  // Filter internships based on search term and filters
  const filteredInternships = internships.filter(internship => {
    const matchesSearch = searchTerm === '' || 
      internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCompany = filters.company === '' || internship.company === filters.company;
    const matchesIndustry = filters.industry === '' || internship.industry === filters.industry;
    const matchesDuration = filters.duration === '' || internship.duration === filters.duration;
    const matchesPaid = filters.isPaid === '' || 
      (filters.isPaid === 'paid' && internship.isPaid) ||
      (filters.isPaid === 'unpaid' && !internship.isPaid);
    
    return matchesSearch && matchesCompany && matchesIndustry && matchesDuration && matchesPaid;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: '#67595E', marginBottom: '24px' }}>Available Internships</h2>
      
      {/* Search and Filters Section */}
      <div style={{ 
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        marginBottom: '24px'
      }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search by job title or company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '4px',
              border: '1px solid #E8B4B8',
              fontSize: '14px'
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          alignItems: 'start'
        }}>
          {/* Company Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              color: '#67595E' 
            }}>
              Company
            </label>
            <select
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #E8B4B8',
                fontSize: '14px',
                color: '#67595E'
              }}
            >
              <option value="">All Companies</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              color: '#67595E' 
            }}>
              Industry
            </label>
            <select
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #E8B4B8',
                fontSize: '14px',
                color: '#67595E'
              }}
            >
              <option value="">All Industries</option>
              {industries.map(industry => (
                <option key={industry} value={industry}>{industry}</option>
              ))}
            </select>
          </div>

          {/* Duration Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              color: '#67595E' 
            }}>
              Duration
            </label>
            <select
              value={filters.duration}
              onChange={(e) => handleFilterChange('duration', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #E8B4B8',
                fontSize: '14px',
                color: '#67595E'
              }}
            >
              <option value="">All Durations</option>
              {durations.map(duration => (
                <option key={duration} value={duration}>{duration}</option>
              ))}
            </select>
          </div>

          {/* Paid/Unpaid Filter */}
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontSize: '14px', 
              color: '#67595E' 
            }}>
              Payment Type
            </label>
            <select
              value={filters.isPaid}
              onChange={(e) => handleFilterChange('isPaid', e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                borderRadius: '4px',
                border: '1px solid #E8B4B8',
                fontSize: '14px',
                color: '#67595E'
              }}
            >
              <option value="">All Types</option>
              <option value="paid">Paid Only</option>
              <option value="unpaid">Unpaid Only</option>
            </select>
          </div>
        </div>

        {/* Filter Summary */}
        <div style={{ 
          marginTop: '16px',
          padding: '12px',
          background: '#f8f8f8',
          borderRadius: '4px',
          fontSize: '14px',
          color: '#67595E'
        }}>
          Found {filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Internships List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredInternships.map(internship => (
          <div
            key={internship.id}
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onClick={() => {
              setSelectedInternship(internship);
              setShowApplicationModal(false);
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 8px', color: '#67595E', fontSize: '18px' }}>{internship.position}</h3>
                <p style={{ margin: '0 0 16px', color: '#A49393', fontSize: '14px' }}>{internship.company}</p>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#67595E', fontSize: '14px' }}>
                    📍 {internship.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#67595E', fontSize: '14px' }}>
                    ⏱️ {internship.duration}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#67595E', fontSize: '14px' }}>
                    💰 {internship.isPaid ? `${internship.salary}` : 'Unpaid'}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {internship.requirements.map((req, index) => (
                    <span
                      key={index}
                      style={{
                        background: '#EED6D3',
                        color: '#67595E',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px'
                      }}
                    >
                      {req}
                    </span>
                  ))}
                </div>
              </div>
              {canApply && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedInternship(internship);
                    setShowApplicationModal(true);
                  }}
                  style={{
                    background: '#E8B4B8',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* No Results Message */}
      {filteredInternships.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '32px', 
          color: '#A49393',
          background: '#fff',
          borderRadius: '8px',
          marginTop: '16px'
        }}>
          No internships found matching your criteria
        </div>
      )}

      {/* Internship Detail Modal */}
      {selectedInternship && !showApplicationModal && (
        <InternshipDetailModal
          internship={selectedInternship}
          onClose={() => setSelectedInternship(null)}
          onApply={() => setShowApplicationModal(true)}
        />
      )}
      
      {showApplicationModal && selectedInternship && (
        <ApplicationModal
          internship={selectedInternship}
          onClose={() => {
            setShowApplicationModal(false);
            setSelectedInternship(null);
          }}
        />
      )}
    </div>
  );
};

export default AvailableInternships; 