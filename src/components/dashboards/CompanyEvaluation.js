import React, { useState } from 'react';

const CompanyEvaluation = () => {
  const [evaluation, setEvaluation] = useState({
    company: '',
    rating: 0,
    comment: '',
    recommend: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Evaluation submitted:', evaluation);
    // Simulate saving to backend or localStorage
    alert("Thank you for your feedback!");
  };

  return (
    <div className="dashboard-section" style={{ padding: 24 }}>
      <h2>Company Evaluation</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 500 }}>
        <input
          type="text"
          placeholder="Company Name"
          value={evaluation.company}
          onChange={(e) => setEvaluation({ ...evaluation, company: e.target.value })}
          required
        />
        <select
          value={evaluation.rating}
          onChange={(e) => setEvaluation({ ...evaluation, rating: parseInt(e.target.value) })}
          required
        >
          <option value="">Rating (1-5)</option>
          {[1, 2, 3, 4, 5].map(r => (
            <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>
          ))}
        </select>
        <textarea
          placeholder="Write your feedback..."
          value={evaluation.comment}
          onChange={(e) => setEvaluation({ ...evaluation, comment: e.target.value })}
          rows={4}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={evaluation.recommend}
            onChange={(e) => setEvaluation({ ...evaluation, recommend: e.target.checked })}
          />
          Recommend this company to other students
        </label>
        <button className="btn btn-primary" type="submit">Submit Evaluation</button>
      </form>
    </div>
  );
};

export default CompanyEvaluation;
