import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null);
  const [profile, setProfile] = useState({
    // Basic Info
    name: user?.name || 'John Doe',
    id: user?.id || '20231234',
    email: user?.email || 'john.doe@email.com',
    major: 'Computer Science',
    graduationYear: '2025',
    
    // Job Interests
    jobInterests: [
      'Software Development',
      'Data Science',
      'Machine Learning'
    ],
    preferredIndustries: [
      'Technology',
      'Finance',
      'Healthcare'
    ],
    
    // Previous Experience
    previousInternships: [
      {
        companyName: 'Tech Solutions Inc.',
        position: 'Software Development Intern',
        duration: 'Jun 2023 - Aug 2023',
        responsibilities: [
          'Developed and maintained web applications using React',
          'Collaborated with senior developers on feature implementation',
          'Participated in code reviews and team meetings'
        ]
      }
    ],
    partTimeJobs: [
      {
        companyName: 'Digital Agency',
        position: 'Junior Web Developer',
        duration: 'Sep 2023 - Present',
        responsibilities: [
          'Build and maintain client websites',
          'Optimize website performance',
          'Create responsive designs'
        ]
      }
    ],
    
    // College Activities
    collegeActivities: [
      {
        name: 'Computer Science Club',
        role: 'Technical Lead',
        duration: '2023 - Present',
        description: 'Organize technical workshops and coding competitions'
      },
      {
        name: 'Robotics Team',
        role: 'Team Member',
        duration: '2022 - 2023',
        description: 'Participated in national robotics competition'
      }
    ],
    
    // Skills
    technicalSkills: [
      'JavaScript',
      'React',
      'Python',
      'SQL',
      'Git'
    ],
    softSkills: [
      'Team Leadership',
      'Problem Solving',
      'Communication',
      'Time Management'
    ]
  });

  // Save original profile when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setOriginalProfile({...profile});
    }
  }, [isEditing]);

  const handleInputChange = (e, section, index, field) => {
    const { name, value } = e.target;
    
    if (section && index !== undefined && field) {
      // Handle nested array updates (for arrays of objects like internships)
      setProfile(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index ? { ...item, [field]: field === 'responsibilities' ? value.split(',').map(r => r.trim()) : value } : item
        )
      }));
    } else if (section && field) {
      // Handle nested object updates
      setProfile(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      // Handle direct field updates (like name, major)
      setProfile(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayInputChange = (section, value) => {
    setProfile(prev => ({
      ...prev,
      [section]: value.split(',').map(item => item.trim())
    }));
  };

  const addExperience = (section) => {
    const newEntry = {
      companyName: '',
      position: '',
      duration: '',
      responsibilities: []
    };
    
    setProfile(prev => ({
      ...prev,
      [section]: [...prev[section], newEntry]
    }));
  };

  const addActivity = () => {
    const newActivity = {
      name: '',
      role: '',
      duration: '',
      description: ''
    };
    
    setProfile(prev => ({
      ...prev,
      collegeActivities: [...prev.collegeActivities, newActivity]
    }));
  };

  const removeItem = (section, index) => {
    setProfile(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save the profile
    console.log('Saving profile:', profile);
    setShowSaveSuccess(true);
    setIsEditing(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  const handleCancel = () => {
    if (originalProfile) {
      setProfile(originalProfile);
    }
    setIsEditing(false);
  };

  return (
    <div className="student-profile" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '2rem',
        background: '#EED6D3',
        padding: '1rem',
        borderRadius: '8px',
        position: 'relative'
      }}>
        <h1 style={{ margin: 0 }}>Student Profile</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>💾</span>
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#F44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>✖️</span>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#E8B4B8',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>✏️</span>
                Edit Profile
              </button>
              <button
                onClick={() => navigate(-1)}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#67595E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>✖️</span>
                Close
              </button>
            </>
          )}
        </div>
        
        {showSaveSuccess && (
          <div style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#4CAF50',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>✓</span>
            Profile updated successfully!
          </div>
        )}
      </div>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Basic Information</h2>
        <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                background: !isEditing ? '#f5f5f5' : 'white'
              }}
            />
          </div>
          <div>
            <label>Student ID</label>
            <input
              type="text"
              name="id"
              value={profile.id}
              disabled
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                background: '#f5f5f5'
              }}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              disabled
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                background: '#f5f5f5'
              }}
            />
          </div>
          <div>
            <label>Major</label>
            <input
              type="text"
              name="major"
              value={profile.major}
              onChange={handleInputChange}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd',
                background: !isEditing ? '#f5f5f5' : 'white'
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Job Interests</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label>Areas of Interest (comma-separated)</label>
            <input
              type="text"
              value={profile.jobInterests.join(', ')}
              onChange={(e) => handleArrayInputChange('jobInterests', e.target.value)}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          <div>
            <label>Preferred Industries (comma-separated)</label>
            <input
              type="text"
              value={profile.preferredIndustries.join(', ')}
              onChange={(e) => handleArrayInputChange('preferredIndustries', e.target.value)}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Previous Internships</h2>
          {isEditing && (
            <button
              onClick={() => addExperience('previousInternships')}
              style={{
                padding: '0.25rem 0.5rem',
                background: '#67595E',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Internship
            </button>
          )}
        </div>
        {profile.previousInternships.map((internship, index) => (
          <div key={index} style={{ 
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div>
                <label>Company Name</label>
                <input
                  type="text"
                  value={internship.companyName}
                  onChange={(e) => handleInputChange(e, 'previousInternships', index, 'companyName')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              <div>
                <label>Position</label>
                <input
                  type="text"
                  value={internship.position}
                  onChange={(e) => handleInputChange(e, 'previousInternships', index, 'position')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              <div>
                <label>Duration</label>
                <input
                  type="text"
                  value={internship.duration}
                  onChange={(e) => handleInputChange(e, 'previousInternships', index, 'duration')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Responsibilities (comma-separated)</label>
              <textarea
                value={internship.responsibilities.join(', ')}
                onChange={(e) => handleInputChange(e, 'previousInternships', index, 'responsibilities')}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  minHeight: '100px'
                }}
              />
            </div>
            {isEditing && (
              <button
                onClick={() => removeItem('previousInternships', index)}
                style={{
                  padding: '0.25rem 0.5rem',
                  background: '#F44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Part-time Jobs</h2>
          {isEditing && (
            <button
              onClick={() => addExperience('partTimeJobs')}
              style={{
                padding: '0.25rem 0.5rem',
                background: '#67595E',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Job
            </button>
          )}
        </div>
        {profile.partTimeJobs.map((job, index) => (
          <div key={index} style={{ 
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div>
                <label>Company Name</label>
                <input
                  type="text"
                  value={job.companyName}
                  onChange={(e) => handleInputChange(e, 'partTimeJobs', index, 'companyName')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              <div>
                <label>Position</label>
                <input
                  type="text"
                  value={job.position}
                  onChange={(e) => handleInputChange(e, 'partTimeJobs', index, 'position')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              <div>
                <label>Duration</label>
                <input
                  type="text"
                  value={job.duration}
                  onChange={(e) => handleInputChange(e, 'partTimeJobs', index, 'duration')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Responsibilities (comma-separated)</label>
              <textarea
                value={job.responsibilities.join(', ')}
                onChange={(e) => handleInputChange(e, 'partTimeJobs', index, 'responsibilities')}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  minHeight: '100px'
                }}
              />
            </div>
            {isEditing && (
              <button
                onClick={() => removeItem('partTimeJobs', index)}
                style={{
                  padding: '0.25rem 0.5rem',
                  background: '#F44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>College Activities</h2>
          {isEditing && (
            <button
              onClick={addActivity}
              style={{
                padding: '0.25rem 0.5rem',
                background: '#67595E',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add Activity
            </button>
          )}
        </div>
        {profile.collegeActivities.map((activity, index) => (
          <div key={index} style={{ 
            border: '1px solid #ddd',
            borderRadius: '4px',
            padding: '1rem',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(2, 1fr)' }}>
              <div>
                <label>Activity Name</label>
                <input
                  type="text"
                  value={activity.name}
                  onChange={(e) => handleInputChange(e, 'collegeActivities', index, 'name')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              <div>
                <label>Role</label>
                <input
                  type="text"
                  value={activity.role}
                  onChange={(e) => handleInputChange(e, 'collegeActivities', index, 'role')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
              <div>
                <label>Duration</label>
                <input
                  type="text"
                  value={activity.duration}
                  onChange={(e) => handleInputChange(e, 'collegeActivities', index, 'duration')}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                />
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <label>Description</label>
              <textarea
                value={activity.description}
                onChange={(e) => handleInputChange(e, 'collegeActivities', index, 'description')}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  minHeight: '100px'
                }}
              />
            </div>
            {isEditing && (
              <button
                onClick={() => removeItem('collegeActivities', index)}
                style={{
                  padding: '0.25rem 0.5rem',
                  background: '#F44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginTop: '1rem'
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Skills</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label>Technical Skills (comma-separated)</label>
            <input
              type="text"
              value={profile.technicalSkills.join(', ')}
              onChange={(e) => handleArrayInputChange('technicalSkills', e.target.value)}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          <div>
            <label>Soft Skills (comma-separated)</label>
            <input
              type="text"
              value={profile.softSkills.join(', ')}
              onChange={(e) => handleArrayInputChange('softSkills', e.target.value)}
              disabled={!isEditing}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentProfile; 