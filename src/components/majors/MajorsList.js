import React, { useState } from 'react';

const MajorsList = () => {
  const [selectedMajor, setSelectedMajor] = useState(null);
  
  const majors = [
    {
      id: 1,
      name: 'Computer Science',
      code: 'CSE',
      totalSemesters: 8,
      semesters: [
        { number: 1, courses: 6, creditHours: 18 },
        { number: 2, courses: 6, creditHours: 17 },
        { number: 3, courses: 6, creditHours: 18 },
        { number: 4, courses: 6, creditHours: 18 },
        { number: 5, courses: 6, creditHours: 17 },
        { number: 6, courses: 6, creditHours: 18 },
        { number: 7, courses: 5, creditHours: 15 },
        { number: 8, courses: 5, creditHours: 15 }
      ]
    },
    {
      id: 2,
      name: 'Electrical Engineering',
      code: 'EE',
      totalSemesters: 8,
      semesters: [
        { number: 1, courses: 6, creditHours: 17 },
        { number: 2, courses: 6, creditHours: 18 },
        { number: 3, courses: 6, creditHours: 18 },
        { number: 4, courses: 6, creditHours: 17 },
        { number: 5, courses: 6, creditHours: 18 },
        { number: 6, courses: 6, creditHours: 17 },
        { number: 7, courses: 5, creditHours: 15 },
        { number: 8, courses: 5, creditHours: 15 }
      ]
    },
    {
      id: 3,
      name: 'Mechanical Engineering',
      code: 'ME',
      totalSemesters: 8,
      semesters: [
        { number: 1, courses: 6, creditHours: 18 },
        { number: 2, courses: 6, creditHours: 17 },
        { number: 3, courses: 6, creditHours: 18 },
        { number: 4, courses: 6, creditHours: 18 },
        { number: 5, courses: 6, creditHours: 17 },
        { number: 6, courses: 6, creditHours: 18 },
        { number: 7, courses: 5, creditHours: 15 },
        { number: 8, courses: 5, creditHours: 15 }
      ]
    },
    {
      id: 4,
      name: 'Civil Engineering',
      code: 'CE',
      totalSemesters: 8,
      semesters: [
        { number: 1, courses: 6, creditHours: 17 },
        { number: 2, courses: 6, creditHours: 18 },
        { number: 3, courses: 6, creditHours: 18 },
        { number: 4, courses: 6, creditHours: 17 },
        { number: 5, courses: 6, creditHours: 18 },
        { number: 6, courses: 6, creditHours: 17 },
        { number: 7, courses: 5, creditHours: 15 },
        { number: 8, courses: 5, creditHours: 15 }
      ]
    }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: '#67595E' }}>Available Majors</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
        {majors.map(major => (
          <div 
            key={major.id}
            style={{ 
              background: '#fff',
              borderRadius: '8px',
              padding: '1.5rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              border: selectedMajor?.id === major.id ? '2px solid #E8B4B8' : '1px solid #eee'
            }}
            onClick={() => setSelectedMajor(selectedMajor?.id === major.id ? null : major)}
          >
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={{ margin: '0 0 0.5rem', color: '#67595E' }}>{major.name}</h2>
              <div style={{ color: '#A49393', fontSize: '0.9rem' }}>Code: {major.code}</div>
              <div style={{ color: '#A49393', fontSize: '0.9rem' }}>Total Semesters: {major.totalSemesters}</div>
            </div>
            
            {selectedMajor?.id === major.id && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ margin: '0 0 1rem', color: '#67595E', fontSize: '1rem' }}>Semester Details</h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                  gap: '1rem'
                }}>
                  {major.semesters.map(semester => (
                    <div 
                      key={semester.number}
                      style={{
                        background: '#f8f8f8',
                        padding: '0.75rem',
                        borderRadius: '6px',
                        fontSize: '0.9rem'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', color: '#67595E', marginBottom: '0.5rem' }}>
                        Semester {semester.number}
                      </div>
                      <div style={{ color: '#A49393', fontSize: '0.8rem' }}>
                        Courses: {semester.courses}
                      </div>
                      <div style={{ color: '#A49393', fontSize: '0.8rem' }}>
                        Credits: {semester.creditHours}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MajorsList; 