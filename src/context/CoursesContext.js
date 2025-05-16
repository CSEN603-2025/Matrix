import React, { createContext, useContext, useState } from 'react';

const CoursesContext = createContext();

export const useCourses = () => {
  return useContext(CoursesContext);
};

export const CoursesProvider = ({ children }) => {
  // Mock data for courses based on majors
  const coursesByMajor = {
    'Computer Science': [
      { id: 1, code: 'CSEN701', name: 'Embedded Systems', description: 'Study of embedded systems architecture and programming', credits: 3, isHelpful: false },
      { id: 2, code: 'CSEN702', name: 'Advanced Computer Architecture', description: 'Advanced concepts in computer architecture', credits: 3, isHelpful: false },
      { id: 3, code: 'CSEN703', name: 'Machine Learning', description: 'Introduction to machine learning algorithms and applications', credits: 3, isHelpful: false },
    ],
    'Engineering': [
      { id: 4, code: 'ENGR701', name: 'Advanced Engineering Mathematics', description: 'Advanced mathematical concepts for engineers', credits: 3, isHelpful: false },
      { id: 5, code: 'ENGR702', name: 'Control Systems', description: 'Study of control systems and their applications', credits: 3, isHelpful: false },
      { id: 6, code: 'ENGR703', name: 'Robotics', description: 'Introduction to robotics and automation', credits: 3, isHelpful: false },
    ],
    'Business': [
      { id: 7, code: 'BUSN701', name: 'Strategic Management', description: 'Advanced concepts in business strategy', credits: 3, isHelpful: false },
      { id: 8, code: 'BUSN702', name: 'Financial Analysis', description: 'Advanced financial analysis and decision making', credits: 3, isHelpful: false },
      { id: 9, code: 'BUSN703', name: 'Marketing Strategy', description: 'Advanced marketing concepts and strategies', credits: 3, isHelpful: false },
    ],
  };

  const [courses, setCourses] = useState(coursesByMajor);
  const [helpfulCourses, setHelpfulCourses] = useState([]);

  const getCoursesByMajor = (major) => {
    return courses[major] || [];
  };

  const toggleHelpfulCourse = (courseId, major) => {
    const updatedCourses = { ...courses };
    const majorCourses = updatedCourses[major];
    const courseIndex = majorCourses.findIndex(course => course.id === courseId);
    
    if (courseIndex !== -1) {
      majorCourses[courseIndex] = {
        ...majorCourses[courseIndex],
        isHelpful: !majorCourses[courseIndex].isHelpful
      };
      
      setCourses(updatedCourses);
      
      // Update helpful courses list
      if (majorCourses[courseIndex].isHelpful) {
        setHelpfulCourses([...helpfulCourses, majorCourses[courseIndex]]);
      } else {
        setHelpfulCourses(helpfulCourses.filter(course => course.id !== courseId));
      }
    }
  };

  const getHelpfulCourses = () => {
    return helpfulCourses;
  };

  const value = {
    courses,
    getCoursesByMajor,
    toggleHelpfulCourse,
    getHelpfulCourses,
  };

  return (
    <CoursesContext.Provider value={value}>
      {children}
    </CoursesContext.Provider>
  );
}; 