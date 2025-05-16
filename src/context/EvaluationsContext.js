import React, { createContext, useContext, useState } from 'react';

// Initial mock data
const initialEvaluations = [
  {
    id: 1,
    companyName: 'Tech Innovators Inc.',
    position: 'Frontend Developer',
    period: 'Jan 2024 - Apr 2024',
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
      evaluation
    };
    setEvaluations(prev => [...prev, newEvaluation]);
  };

  const updateEvaluation = (id, updatedEvaluation) => {
    setEvaluations(prev =>
      prev.map(evaluation =>
        evaluation.id === id
          ? { ...evaluation, evaluation: updatedEvaluation }
          : evaluation
      )
    );
  };

  const deleteEvaluation = (id) => {
    setEvaluations(prev => prev.filter(evaluation => evaluation.id !== id));
  };

  const getEvaluationByInternship = (companyName, position) => {
    return evaluations.find(
      evaluation => evaluation.companyName === companyName && evaluation.position === position
    );
  };

  return (
    <EvaluationsContext.Provider
      value={{
        evaluations,
        addEvaluation,
        updateEvaluation,
        deleteEvaluation,
        getEvaluationByInternship
      }}
    >
      {children}
    </EvaluationsContext.Provider>
  );
}; 