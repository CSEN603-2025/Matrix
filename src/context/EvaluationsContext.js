import React, { createContext, useContext, useState } from 'react';

// Initial mock data
const initialEvaluations = [
  {
    id: 1,
    companyName: 'Tech Innovators Inc.',
    position: 'Frontend Developer',
    period: 'Jan 2024 - Apr 2024',
    status: 'Current',
    evaluation: {
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
    id: 2,
    companyName: 'Data Analytics Co.',
    position: 'Data Analyst Intern',
    period: 'Jun 2023 - Aug 2023',
    status: 'Completed',
    evaluation: {
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
    period: 'Jan 2024 - Present',
    status: 'Current',
    evaluation: null
  },
  {
    id: 4,
    companyName: 'Digital Marketing Pro',
    position: 'Marketing Intern',
    period: 'Jan 2024 - Present',
    status: 'Current',
    evaluation: null
  },
  {
    id: 5,
    companyName: 'Software Solutions Inc.',
    position: 'Backend Developer',
    period: 'Jan 2024 - Present',
    status: 'Current',
    evaluation: {
      workEnvironment: 5,
      learningOpportunities: 5,
      mentorship: 4,
      workLifeBalance: 4,
      overallRating: 4.5,
      recommend: true,
      pros: 'Strong technical mentorship, modern tech stack',
      cons: 'Complex projects can be challenging',
      additionalComments: 'Great opportunity for technical growth'
    }
  }
];

const EvaluationsContext = createContext();

export const useEvaluations = () => {
  const context = useContext(EvaluationsContext);
  if (!context) {
    throw new Error('useEvaluations must be used within an EvaluationsProvider');
  }
  return context;
};

export const EvaluationsProvider = ({ children }) => {
  const [evaluations, setEvaluations] = useState(initialEvaluations);

  const addEvaluation = (internship, evaluation) => {
    const newEvaluation = {
      id: evaluations.length + 1,
      companyName: internship.companyName,
      position: internship.position,
      period: `${internship.startDate} - ${internship.endDate}`,
      status: internship.status || 'Completed',
      completionDate: new Date().toISOString().split('T')[0],
      evaluation
    };
    setEvaluations(prev => [...prev, newEvaluation]);
  };

  const updateEvaluation = (id, updatedEvaluation) => {
    setEvaluations(prev =>
      prev.map(evaluation =>
        evaluation.id === id
          ? { 
              ...evaluation, 
              ...updatedEvaluation,
              completionDate: new Date().toISOString().split('T')[0]
            }
          : evaluation
      )
    );
  };

  const deleteEvaluation = (id) => {
    if (window.confirm('Are you sure you want to delete this evaluation? This action cannot be undone.')) {
      setEvaluations(prev => prev.filter(evaluation => evaluation.id !== id));
    }
  };

  const getEvaluationByInternship = (companyName, position) => {
    return evaluations.find(
      evaluation => evaluation.companyName === companyName && evaluation.position === position
    );
  };

  const getCurrentInternEvaluations = () => {
    return evaluations.filter(evaluation => evaluation.status === 'Current');
  };

  const getPendingEvaluations = () => {
    return evaluations.filter(evaluation => !evaluation.evaluation);
  };

  return (
    <EvaluationsContext.Provider
      value={{
        evaluations,
        addEvaluation,
        updateEvaluation,
        deleteEvaluation,
        getEvaluationByInternship,
        getCurrentInternEvaluations,
        getPendingEvaluations
      }}
    >
      {children}
    </EvaluationsContext.Provider>
  );
}; 