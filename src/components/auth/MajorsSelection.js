import React, { useState } from 'react';

const MajorsSelection = ({ onSubmit }) => {
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [studentType, setStudentType] = useState('');
  const [error, setError] = useState('');

  const majors = [
    {
      id: 1,
      name: 'Computer Science',
      code: 'CSE',
    },
    {
      id: 2,
      name: 'Electrical Engineering',
      code: 'EE',
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      code: 'ME',
    },
    {
      id: 4,
      name: 'Civil Engineering',
      code: 'CE',
    }
  ];

  // Generate array of semester numbers from 1 to 10
  const semesterNumbers = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMajor || !selectedSemester || !studentType) {
      setError('Please fill in all fields');
      return;
    }
    
    const selectedMajorData = majors.find(major => major.id === parseInt(selectedMajor));
    onSubmit({
      majorId: selectedMajorData.id,
      majorName: selectedMajorData.name,
      majorCode: selectedMajorData.code,
      semester: parseInt(selectedSemester),
      studentType: studentType
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '2rem' }}>
      <h2 style={{ color: '#67595E', marginBottom: '1.5rem', textAlign: 'center' }}>Registration Details</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Student Type Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#67595E',
              fontWeight: '500'
            }}
          >
            Student Type
          </label>
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            padding: '0.75rem',
            backgroundColor: '#f8f8f8',
            borderRadius: '8px'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer'
            }}>
              <input
                type="radio"
                name="studentType"
                value="student"
                checked={studentType === 'student'}
                onChange={(e) => setStudentType(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ color: '#67595E' }}>Student</span>
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              cursor: 'pointer'
            }}>
              <input
                type="radio"
                name="studentType"
                value="proStudent"
                checked={studentType === 'proStudent'}
                onChange={(e) => setStudentType(e.target.value)}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ color: '#67595E' }}>Pro Student</span>
            </label>
          </div>
        </div>

        {/* Major Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="major"
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              color: '#67595E',
              fontWeight: '500'
            }}
          >
            Major
          </label>
          <select
            id="major"
            value={selectedMajor}
            onChange={(e) => setSelectedMajor(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #E8B4B8',
              backgroundColor: '#fff',
              color: '#67595E',
              fontSize: '1rem'
            }}
            required
          >
            <option value="">Select a major</option>
            {majors.map(major => (
              <option key={major.id} value={major.id}>
                {major.name} ({major.code})
              </option>
            ))}
          </select>
        </div>

        {/* Semester Selection */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="semester"
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: '#67595E',
              fontWeight: '500'
            }}
          >
            Current Semester
          </label>
          <select
            id="semester"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #E8B4B8',
              backgroundColor: '#fff',
              color: '#67595E',
              fontSize: '1rem'
            }}
            required
          >
            <option value="">Select semester</option>
            {semesterNumbers.map(num => (
              <option key={num} value={num}>
                Semester {num}
              </option>
            ))}
          </select>
        </div>

        {error && (
          <div style={{ 
            color: '#F44336', 
            marginBottom: '1rem', 
            padding: '0.5rem', 
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#E8B4B8',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default MajorsSelection; 