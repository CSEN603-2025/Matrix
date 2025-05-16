import React, { useState } from 'react';
import CompanyRegistrationView from './CompanyRegistrationView';
import { sendCompanyStatusEmail } from '../services/emailService';
import { sendStatusNotification } from '../services/notificationService';
import { toast } from 'react-toastify';

const TestCompanyRegistration = () => {
  // Test company data
  const [testCompany] = useState({
    id: 'test-123',
    name: 'Test Company Inc.',
    industry: 'Technology',
    companySize: '50-100 employees',
    companyEmail: 'test@testcompany.com',
    registrationDate: '2024-03-20',
    status: 'Pending'
  });

  const [notifications, setNotifications] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);

  const handleApprove = async () => {
    try {
      // Send email notification
      await sendCompanyStatusEmail(testCompany, 'Active');
      
      // Send in-app notification
      const notification = sendStatusNotification(testCompany, 'Active');
      
      // Update notifications list
      setNotifications(prev => [notification, ...prev]);
      
      // Log email
      setEmailLogs(prev => [{
        to: testCompany.companyEmail,
        subject: 'Company Registration Approved',
        timestamp: new Date().toISOString()
      }, ...prev]);

      toast.success('Company approved successfully!');
    } catch (error) {
      console.error('Error in approval process:', error);
      toast.error('Failed to process approval');
    }
  };

  const handleReject = async () => {
    const reason = 'Incomplete documentation provided';
    try {
      // Send email notification
      await sendCompanyStatusEmail(testCompany, 'Rejected', reason);
      
      // Send in-app notification
      const notification = sendStatusNotification(testCompany, 'Rejected', reason);
      
      // Update notifications list
      setNotifications(prev => [notification, ...prev]);
      
      // Log email
      setEmailLogs(prev => [{
        to: testCompany.companyEmail,
        subject: 'Company Registration Rejected',
        timestamp: new Date().toISOString()
      }, ...prev]);

      toast.info('Company registration rejected');
    } catch (error) {
      console.error('Error in rejection process:', error);
      toast.error('Failed to process rejection');
    }
  };

  return (
    <div className="test-container">
      <h1>Test Company Registration System</h1>
      
      {/* Company Registration View */}
      <div className="test-section">
        <h2>Company Registration View</h2>
        <CompanyRegistrationView 
          company={testCompany}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </div>

      {/* Notifications Log */}
      <div className="test-section">
        <h2>In-App Notifications</h2>
        <div className="log-container">
          {notifications.length === 0 ? (
            <p>No notifications yet</p>
          ) : (
            notifications.map((notification, index) => (
              <div key={index} className="log-item">
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <small>{new Date(notification.timestamp).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Email Log */}
      <div className="test-section">
        <h2>Email Logs</h2>
        <div className="log-container">
          {emailLogs.length === 0 ? (
            <p>No emails sent yet</p>
          ) : (
            emailLogs.map((log, index) => (
              <div key={index} className="log-item">
                <strong>To: {log.to}</strong>
                <p>Subject: {log.subject}</p>
                <small>{new Date(log.timestamp).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        .test-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        h1 {
          color: var(--dark);
          margin-bottom: 2rem;
        }

        .test-section {
          margin-bottom: 3rem;
          background: white;
          border-radius: 8px;
          padding: 2rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .test-section h2 {
          color: var(--dark);
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .log-container {
          background: #f9f9f9;
          border-radius: 8px;
          padding: 1rem;
        }

        .log-item {
          background: white;
          padding: 1rem;
          margin-bottom: 1rem;
          border-radius: 4px;
          border-left: 4px solid var(--primary);
        }

        .log-item:last-child {
          margin-bottom: 0;
        }

        .log-item strong {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--dark);
        }

        .log-item p {
          margin: 0.5rem 0;
          color: #666;
        }

        .log-item small {
          display: block;
          color: #999;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default TestCompanyRegistration; 