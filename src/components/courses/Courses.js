import React, { useState } from 'react';
import { useCourses } from '../../context/CoursesContext';
import { useAuth } from '../../context/AuthContext';

const Courses = () => {
  const { getCoursesByMajor, toggleHelpfulCourse, getHelpfulCourses } = useCourses();
  const { user } = useAuth();
  const userMajor = user?.major || 'Computer Science'; // Default to CS if no major specified
  const [showHelpful, setShowHelpful] = useState(false);

  const courses = getCoursesByMajor(userMajor);
  const helpfulCourses = getHelpfulCourses();

  const handleToggleHelpful = (courseId) => {
    toggleHelpfulCourse(courseId, userMajor);
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 24 
      }}>
        <h2>Courses in {userMajor}</h2>
        <button
          onClick={() => setShowHelpful(!showHelpful)}
          style={{
            background: showHelpful ? '#2196F3' : '#E8B4B8',
            color: '#fff',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 20,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {showHelpful ? 'Show All Courses' : 'Show Helpful Courses'}
        </button>
      </div>

      {showHelpful && helpfulCourses.length === 0 && (
        <div style={{
          background: '#fff',
          borderRadius: 8,
          padding: 20,
          marginBottom: 20,
          color: '#666',
          textAlign: 'center'
        }}>
          No courses marked as helpful yet. Select courses that helped you during your internship.
        </div>
      )}

      <div style={{ display: 'grid', gap: 20 }}>
        {(showHelpful ? helpfulCourses : courses).map(course => (
          <div
            key={course.id}
            style={{
              background: '#fff',
              borderRadius: 8,
              padding: 20,
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              border: course.isHelpful ? '2px solid #4CAF50' : 'none'
            }}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: 16 
            }}>
              <div>
                <h3 style={{ margin: 0, color: '#2196F3' }}>{course.name}</h3>
                <p style={{ 
                  margin: '8px 0', 
                  color: '#666',
                  fontSize: '0.9em'
                }}>
                  Course Code: {course.code}
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  background: '#E8B4B8',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: '0.9em'
                }}>
                  {course.credits} Credits
                </div>
                <button
                  onClick={() => handleToggleHelpful(course.id)}
                  style={{
                    background: course.isHelpful ? '#4CAF50' : '#fff',
                    color: course.isHelpful ? '#fff' : '#666',
                    border: `1px solid ${course.isHelpful ? '#4CAF50' : '#ddd'}`,
                    padding: '4px 12px',
                    borderRadius: 20,
                    cursor: 'pointer',
                    fontSize: '0.9em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  {course.isHelpful ? '✓ Helpful' : 'Mark as Helpful'}
                </button>
              </div>
            </div>

            <div style={{ color: '#666' }}>
              <p style={{ 
                margin: '0 0 8px 0',
                lineHeight: 1.5
              }}>
                {course.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses; 