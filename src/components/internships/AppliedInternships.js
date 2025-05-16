import React from 'react';
import { useAuth } from '../../context/AuthContext';

const AppliedInternships = () => {
  const { user } = useAuth();

  // Mock data for applied internships
  const appliedInternships = [
    {
      id: 1,
      company: 'IBM',
      position: 'Software Engineering Intern',
      location: 'Cairo',
      applicationDate: '2024-05-01',
      status: 'Pending',
      nextStep: 'Technical Interview'
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Cloud Engineering Intern',
      location: 'Remote',
      applicationDate: '2024-04-28',
      status: 'Under Review',
      nextStep: 'HR Screening'
    },
    {
      id: 3,
      company: 'Dell EMC',
      position: 'Systems Engineering Intern',
      location: 'Cairo',
      applicationDate: '2024-04-15',
      status: 'Rejected',
      nextStep: null
    }
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFD700';
      case 'under review':
        return '#3498db';
      case 'accepted':
        return '#2ecc71';
      case 'rejected':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h2 style={{ color: '#67595E', marginBottom: '24px' }}>Internships I Applied To</h2>
      
      <div style={{ display: 'grid', gap: '16px' }}>
        {appliedInternships.map(internship => (
          <div
            key={internship.id}
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: '0 0 8px', color: '#67595E', fontSize: '18px' }}>{internship.company}</h3>
                <h4 style={{ margin: '0 0 12px', color: '#67595E', fontWeight: '500' }}>{internship.position}</h4>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  color: '#A49393', 
                  fontSize: '14px',
                  marginBottom: '12px'
                }}>
                  <span>📍 {internship.location}</span>
                  <span>📅 Applied: {new Date(internship.applicationDate).toLocaleDateString()}</span>
                </div>

                {internship.nextStep && (
                  <div style={{ fontSize: '14px', color: '#67595E' }}>
                    Next Step: {internship.nextStep}
                  </div>
                )}
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#fff',
                  background: getStatusColor(internship.status)
                }}>
                  {internship.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {appliedInternships.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '32px', 
          color: '#A49393',
          background: '#fff',
          borderRadius: '8px'
        }}>
          You haven't applied to any internships yet
        </div>
      )}
    </div>
  );
};

export default AppliedInternships; 