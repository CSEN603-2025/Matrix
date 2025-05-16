// This would be replaced with actual API calls in a real application
let notifications = [];

const createNotification = (notification) => {
  const newNotification = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    isRead: false,
    ...notification
  };
  notifications.unshift(newNotification);
  return newNotification;
};

export const sendStatusNotification = (company, status, reason = '') => {
  const notificationType = status === 'Active' ? 'approval' : 'rejection';
  const title = status === 'Active' 
    ? 'Company Registration Approved'
    : 'Company Registration Rejected';
  
  const message = status === 'Active'
    ? `Your company registration has been approved. You can now start posting internship opportunities.`
    : `Your company registration has been rejected.${reason ? ` Reason: ${reason}` : ''}`;

  return createNotification({
    recipientId: company.id,
    recipientType: 'company',
    type: notificationType,
    title,
    message,
  });
};

export const sendInternshipApplicationNotification = (application, company) => {
  const title = 'New Internship Application';
  const message = `${application.studentName} has applied for the ${application.position} position.`;

  return createNotification({
    recipientId: company.id,
    recipientType: 'company',
    type: 'application',
    title,
    message,
    applicationId: application.id,
    studentId: application.studentId
  });
};

export const getNotifications = (userId, userType) => {
  return notifications.filter(
    notification => 
      notification.recipientId === userId && 
      notification.recipientType === userType
  );
};

export const markNotificationAsRead = (notificationId) => {
  notifications = notifications.map(notification =>
    notification.id === notificationId
      ? { ...notification, isRead: true }
      : notification
  );
};

export const markAllNotificationsAsRead = (userId, userType) => {
  notifications = notifications.map(notification =>
    notification.recipientId === userId && notification.recipientType === userType
      ? { ...notification, isRead: true }
      : notification
  );
};

export default {
  sendStatusNotification,
  sendInternshipApplicationNotification,
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead
}; 