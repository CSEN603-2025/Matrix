import React, { useState } from 'react';
import CompanyRegistrationView from './CompanyRegistrationView';
import { sendCompanyStatusEmail } from '../services/emailService';
import { sendStatusNotification } from '../services/notificationService';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CompaniesView = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [filterIndustry, setFilterIndustry] = useState('');
  const [companies, setCompanies] = useState([
    { 
      id: 1, 
      name: 'Tech Innovators', 
      status: 'Active', 
      internships: 2,
      companyName: 'Tech Innovators',
      industry: 'Technology',
      companySize: '201-500 employees',
      companyEmail: 'hr@techinnovators.com',
      registrationDate: '2024-05-01'
    },
    { 
      id: 2, 
      name: 'Green Energy', 
      status: 'Pending', 
      internships: 0,
      companyName: 'Green Energy',
      industry: 'Energy',
      companySize: '51-200 employees',
      companyEmail: 'contact@greenenergy.com',
      registrationDate: '2024-05-08'
    },
    { 
      id: 3, 
      name: 'Digital Solutions', 
      status: 'Pending', 
      internships: 0,
      companyName: 'Digital Solutions',
      industry: 'Technology',
      companySize: '51-200 employees',
      companyEmail: 'info@digitalsolutions.com',
      registrationDate: '2024-05-09'
    },
    { 
      id: 4, 
      name: 'Global Consulting Group', 
      status: 'Pending', 
      internships: 0,
      companyName: 'Global Consulting Group',
      industry: 'Consulting',
      companySize: '501-1000 employees',
      companyEmail: 'careers@gcgroup.com',
      registrationDate: '2024-05-15',
      documents: {
        taxRegistration: true,
        commercialLicense: true,
        companyProfile: true
      },
      description: 'Leading international consulting firm specializing in business strategy, digital transformation, and market analysis. Looking to provide valuable internship experiences in consulting and business analytics.',
      address: {
        street: '123 Business Avenue',
        city: 'Dubai',
        country: 'UAE'
      },
      website: 'www.gcgroup.com',
      phoneNumber: '+971 4 123 4567'
    }
  ]);

  const statusColors = {
    Pending: '#FFD700',
    Approved: '#4CAF50',
    Rejected: '#F44336',
    Active: '#4CAF50',
  };

  // Get unique industries for dropdown
  const industries = Array.from(new Set(companies.map(c => c.industry)));

  const handleViewCompany = (company) => {
    setSelectedCompany(company);
    setShowCompanyDetails(true);
  };

  const handleApproveCompany = async (company) => {
    try {
      setIsProcessing(true);
      
      // Update the company status in the state
      setCompanies(prevCompanies => 
        prevCompanies.map(c => 
          c.id === company.id 
            ? { ...c, status: 'Active' } 
            : c
        )
      );

      // If the company was selected in the modal, update the selected company too
      if (selectedCompany && selectedCompany.id === company.id) {
        setSelectedCompany({ ...company, status: 'Active' });
      }

      // Send email notification
      await sendCompanyStatusEmail(company, 'Active');
      
      // Send in-app notification
      sendStatusNotification(company, 'Active');

      // Show success message
      toast.success('Company approved successfully. Notifications sent.');
      
      // Close the details modal if open
      setShowCompanyDetails(false);
    } catch (error) {
      console.error('Error approving company:', error);
      toast.error('Failed to process approval. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRejectClick = (company) => {
    setSelectedCompany(company);
    setShowRejectionModal(true);
  };

  const handleRejectSubmit = async () => {
    try {
      setIsProcessing(true);
      
      // Update the company status in the state
      setCompanies(prevCompanies => 
        prevCompanies.map(c => 
          c.id === selectedCompany.id 
            ? { ...c, status: 'Rejected' } 
            : c
        )
      );

      // Send email notification with rejection reason
      await sendCompanyStatusEmail(selectedCompany, 'Rejected', rejectionReason);
      
      // Send in-app notification
      sendStatusNotification(selectedCompany, 'Rejected', rejectionReason);

      // Show success message
      toast.success('Company rejected and notifications sent.');
      
      // Close modals and reset states
      setShowRejectionModal(false);
      setShowCompanyDetails(false);
      setRejectionReason('');
    } catch (error) {
      console.error('Error rejecting company:', error);
      toast.error('Failed to process rejection. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesStatus = !filterStatus || company.status === filterStatus;
    const matchesIndustry = !filterIndustry || company.industry === filterIndustry;
    const matchesSearch = !searchTerm || 
      company.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesIndustry && matchesSearch;
  });

  return (
    <div className="companies-view">
      <h2>Companies</h2>
      
      {/* Search and Filter Bar */}
      <div className="search-filter-bar" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          style={{ flex: 1, minWidth: 200, height: 40, borderRadius: 6, border: '1px solid #ddd', padding: '0 14px', fontSize: '1rem' }}
        />
        {/* Enhanced Status Filter */}
        <FormControl variant="outlined" size="small" style={{ minWidth: 150, height: 40 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={filterStatus}
            label="Status"
            onChange={(e) => setFilterStatus(e.target.value)}
            className="status-filter"
            style={{ height: 40, display: 'flex', alignItems: 'center' }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </Select>
        </FormControl>
        {/* Enhanced Industry Filter */}
        <FormControl variant="outlined" size="small" style={{ minWidth: 180, height: 40 }}>
          <InputLabel id="industry-label">Industry</InputLabel>
          <Select
            labelId="industry-label"
            value={filterIndustry}
            label="Industry"
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="industry-filter"
            style={{ height: 40, display: 'flex', alignItems: 'center' }}
          >
            <MenuItem value="">All Industries</MenuItem>
            {industries.map(ind => (
              <MenuItem key={ind} value={ind}>{ind}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {/* Companies Table */}
      <div className="companies-table">
        <table>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Industry</th>
              <th>Size</th>
              <th>Registration Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr key={company.id}>
                <td>{company.name}</td>
                <td>{company.industry}</td>
                <td>{company.companySize}</td>
                <td>{company.registrationDate}</td>
                <td>
                  <span className="status-badge" style={{ backgroundColor: statusColors[company.status] }}>
                    {company.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleViewCompany(company)}
                  >
                    View Details
                  </button>
                  {company.status === 'Pending' && (
                    <>
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleApproveCompany(company)}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleRejectClick(company)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Company Details Modal */}
      {showCompanyDetails && selectedCompany && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => {
                setShowCompanyDetails(false);
                setSelectedCompany(null);
              }}
            >
              ×
            </button>
            <CompanyRegistrationView 
              company={selectedCompany}
              onApprove={handleApproveCompany}
              onReject={handleRejectClick}
            />
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectionModal && (
        <div className="modal-overlay">
          <div className="modal-content rejection-modal">
            <h3>Reject Company Registration</h3>
            <p>Please provide a reason for rejecting {selectedCompany?.name}'s registration:</p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter rejection reason..."
              rows={4}
              className="rejection-reason-input"
            />
            <div className="modal-actions">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowRejectionModal(false);
                  setRejectionReason('');
                }}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleRejectSubmit}
                disabled={isProcessing || !rejectionReason.trim()}
              >
                {isProcessing ? 'Processing...' : 'Submit Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .companies-view {
          padding: 2rem;
        }

        h2 {
          color: var(--dark);
          margin-bottom: 2rem;
        }

        .search-filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .search-input,
        .status-filter {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        .search-input {
          flex: 1;
          min-width: 200px;
        }

        .status-filter {
          width: 150px;
        }

        .companies-table {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: var(--primary);
          color: white;
          padding: 1rem;
          text-align: left;
        }

        td {
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: none;
          font-weight: 500;
          cursor: pointer;
          margin-right: 0.5rem;
        }

        .btn-secondary {
          background: var(--secondary);
          color: var(--dark);
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-danger {
          background: #F44336;
          color: white;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 1200px;
          max-height: 90vh;
          overflow: auto;
          position: relative;
        }

        .modal-close {
          position: absolute;
          right: 1rem;
          top: 1rem;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: var(--dark);
          z-index: 1;
        }

        .rejection-modal {
          max-width: 500px;
          padding: 2rem;
        }

        .rejection-modal h3 {
          color: var(--dark);
          margin-bottom: 1rem;
        }

        .rejection-reason-input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin: 1rem 0;
          font-family: inherit;
          resize: vertical;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }

        button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default CompaniesView; 