import React from 'react';

const CompanyRegistrationView = ({ company, onApprove, onReject }) => {
  return (
    <div className="company-registration-view">
      <h2>Company Registration Details</h2>
      
      <div className="registration-details">
        <div className="detail-group">
          <h3>Basic Information</h3>
          <div className="detail-row">
            <label>Company Name:</label>
            <span>{company.name}</span>
          </div>
          <div className="detail-row">
            <label>Industry:</label>
            <span>{company.industry}</span>
          </div>
          <div className="detail-row">
            <label>Company Size:</label>
            <span>{company.companySize}</span>
          </div>
          <div className="detail-row">
            <label>Email:</label>
            <span>{company.companyEmail}</span>
          </div>
          <div className="detail-row">
            <label>Registration Date:</label>
            <span>{company.registrationDate}</span>
          </div>
          <div className="detail-row">
            <label>Status:</label>
            <span className={`status-badge ${company.status.toLowerCase()}`}>
              {company.status}
            </span>
          </div>
        </div>

        {company.status === 'Pending' && (
          <div className="action-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => onApprove(company)}
            >
              Approve Registration
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => onReject(company)}
            >
              Reject Registration
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .company-registration-view {
          padding: 2rem;
        }

        h2 {
          color: var(--dark);
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .registration-details {
          background: white;
          border-radius: 8px;
          padding: 2rem;
        }

        .detail-group {
          margin-bottom: 2rem;
        }

        .detail-group h3 {
          color: var(--dark);
          margin-bottom: 1.5rem;
          font-size: 1.2rem;
        }

        .detail-row {
          display: flex;
          margin-bottom: 1rem;
          padding: 0.5rem 0;
          border-bottom: 1px solid #f5f5f5;
        }

        .detail-row label {
          width: 200px;
          color: #666;
          font-weight: 500;
        }

        .detail-row span {
          flex: 1;
          color: var(--dark);
        }

        .status-badge {
          display: inline-block;
          padding: 0.25rem 1rem;
          border-radius: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-badge.pending {
          background: #FFD700;
          color: #000;
        }

        .status-badge.active {
          background: #4CAF50;
          color: white;
        }

        .status-badge.rejected {
          background: #F44336;
          color: white;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          padding-top: 2rem;
          border-top: 1px solid #eee;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn:hover {
          transform: translateY(-1px);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-danger {
          background: #F44336;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default CompanyRegistrationView; 