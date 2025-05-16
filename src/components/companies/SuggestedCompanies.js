import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const SuggestedCompanies = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    industry: '',
    jobInterests: [],
    rating: 0
  });

  // Mock data - In a real app, this would come from an API
  const mockCompanies = [
    {
      id: 1,
      name: 'Tech Innovators',
      industry: 'Technology',
      rating: 4.8,
      totalInterns: 45,
      currentOpenings: 3,
      logo: '🏢',
      jobAreas: ['Software Development', 'Data Science', 'UI/UX Design'],
      recommendations: [
        {
          internName: 'Sarah Ahmed',
          comment: 'Great learning environment with supportive mentors.',
          rating: 5,
          period: 'Summer 2023'
        }
      ],
      matchScore: 95
    },
    {
      id: 2,
      name: 'Global Consulting Group',
      industry: 'Consulting',
      rating: 4.6,
      totalInterns: 30,
      currentOpenings: 2,
      logo: '🏢',
      jobAreas: ['Business Analysis', 'Strategy', 'Digital Transformation'],
      recommendations: [
        {
          internName: 'Mohammed Ali',
          comment: 'Excellent exposure to real-world consulting projects.',
          rating: 4.5,
          period: 'Fall 2023'
        }
      ],
      matchScore: 88
    },
    {
      id: 3,
      name: 'EcoSolutions',
      industry: 'Environmental',
      rating: 4.7,
      totalInterns: 20,
      currentOpenings: 4,
      logo: '🏢',
      jobAreas: ['Environmental Engineering', 'Sustainability', 'Green Tech'],
      recommendations: [
        {
          internName: 'Lina Hassan',
          comment: 'Amazing opportunity to work on sustainable projects.',
          rating: 5,
          period: 'Spring 2024'
        }
      ],
      matchScore: 92
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setCompanies(mockCompanies);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredCompanies = companies.filter(company => {
    if (filters.industry && company.industry !== filters.industry) return false;
    if (filters.rating && company.rating < filters.rating) return false;
    return true;
  });

  const renderStars = (rating) => {
    return '⭐'.repeat(Math.floor(rating));
  };

  return (
    <div className="suggested-companies">
      <div className="header">
        <h1>Suggested Companies</h1>
        <p>Personalized recommendations based on your profile and past intern experiences</p>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label>Industry</label>
          <select 
            name="industry" 
            value={filters.industry}
            onChange={handleFilterChange}
          >
            <option value="">All Industries</option>
            <option value="Technology">Technology</option>
            <option value="Consulting">Consulting</option>
            <option value="Environmental">Environmental</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Minimum Rating</label>
          <select 
            name="rating" 
            value={filters.rating}
            onChange={handleFilterChange}
          >
            <option value="0">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
          </select>
        </div>
      </div>

      {/* Companies List */}
      {loading ? (
        <div className="loading">Loading suggested companies...</div>
      ) : (
        <div className="companies-grid">
          {filteredCompanies.map(company => (
            <div key={company.id} className="company-card">
              <div className="company-header">
                <div className="company-logo">{company.logo}</div>
                <div className="company-info">
                  <h2>{company.name}</h2>
                  <div className="company-rating">
                    {renderStars(company.rating)} ({company.rating})
                  </div>
                </div>
                <div className="match-score">
                  <span>{company.matchScore}%</span>
                  Match
                </div>
              </div>

              <div className="company-details">
                <div className="detail-row">
                  <span>Industry:</span>
                  <span>{company.industry}</span>
                </div>
                <div className="detail-row">
                  <span>Total Interns:</span>
                  <span>{company.totalInterns}</span>
                </div>
                <div className="detail-row">
                  <span>Current Openings:</span>
                  <span className="openings">{company.currentOpenings}</span>
                </div>
              </div>

              <div className="job-areas">
                <strong>Job Areas:</strong>
                <div className="tags">
                  {company.jobAreas.map((area, index) => (
                    <span key={index} className="tag">{area}</span>
                  ))}
                </div>
              </div>

              <div className="recommendations">
                <strong>Intern Recommendations:</strong>
                {company.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation">
                    <div className="recommendation-header">
                      <span className="intern-name">{rec.internName}</span>
                      <span className="period">{rec.period}</span>
                    </div>
                    <p>{rec.comment}</p>
                    <div className="rec-rating">{renderStars(rec.rating)}</div>
                  </div>
                ))}
              </div>

              <button className="view-details-btn">
                View Opportunities
              </button>
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .suggested-companies {
          padding: 2rem;
        }

        .header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .header h1 {
          color: var(--dark);
          margin-bottom: 0.5rem;
        }

        .header p {
          color: #666;
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-group label {
          font-weight: 500;
          color: var(--dark);
        }

        .filter-group select {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          min-width: 200px;
        }

        .companies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 2rem;
        }

        .company-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .company-header {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: 1rem;
          align-items: center;
        }

        .company-logo {
          font-size: 2.5rem;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f5f5f5;
          border-radius: 12px;
        }

        .company-info h2 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--dark);
        }

        .company-rating {
          color: #FFD700;
          margin-top: 0.25rem;
        }

        .match-score {
          background: var(--primary);
          color: white;
          padding: 0.5rem;
          border-radius: 8px;
          text-align: center;
          font-size: 0.875rem;
        }

        .match-score span {
          display: block;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .company-details {
          display: grid;
          gap: 0.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          color: #666;
        }

        .openings {
          color: var(--primary);
          font-weight: 500;
        }

        .job-areas {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: #f0f0f0;
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.875rem;
          color: var(--dark);
        }

        .recommendations {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .recommendation {
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 8px;
        }

        .recommendation-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .intern-name {
          font-weight: 500;
          color: var(--dark);
        }

        .period {
          color: #666;
          font-size: 0.875rem;
        }

        .recommendation p {
          margin: 0.5rem 0;
          color: #444;
          font-size: 0.9375rem;
        }

        .rec-rating {
          color: #FFD700;
          font-size: 0.875rem;
        }

        .view-details-btn {
          background: var(--primary);
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .view-details-btn:hover {
          transform: translateY(-2px);
        }

        .loading {
          text-align: center;
          padding: 3rem;
          color: #666;
        }
      `}</style>
    </div>
  );
};

export default SuggestedCompanies; 