import React, { createContext, useContext, useState } from 'react';

const CompanyDashboardContext = createContext();

export const useCompanyDashboard = () => {
  const context = useContext(CompanyDashboardContext);
  if (!context) {
    throw new Error('useCompanyDashboard must be used within a CompanyDashboardProvider');
  }
  return context;
};

export const CompanyDashboardProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const handleNotificationClick = (notificationId) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const value = {
    notifications,
    setNotifications,
    handleNotificationClick,
  };

  return (
    <CompanyDashboardContext.Provider value={value}>
      {children}
    </CompanyDashboardContext.Provider>
  );
};

export default CompanyDashboardContext; 