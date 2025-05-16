import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getNotifications, markNotificationAsRead, markAllNotificationsAsRead } from '../services/notificationService';

const Messages = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    if (user) {
      // Load notifications when component mounts
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = () => {
    const userNotifications = getNotifications(user.id, user.role);
    setNotifications(userNotifications);
  };

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      markNotificationAsRead(notification.id);
      // Update local state to mark as read
      setNotifications(prevNotifications =>
        prevNotifications.map(n =>
          n.id === notification.id ? { ...n, isRead: true } : n
        )
      );
    }
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead(user.id, user.role);
    // Update local state
    setNotifications(prevNotifications =>
      prevNotifications.map(n => ({ ...n, isRead: true }))
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'approval':
        return '✅';
      case 'rejection':
        return '❌';
      default:
        return '📝';
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-header">
        <h2>Messages</h2>
        {notifications.some(n => !n.isRead) && (
          <button 
            className="mark-all-read"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="messages-content">
        <div className="notifications-list">
          {notifications.length === 0 ? (
            <div className="no-messages">
              No messages to display
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`notification-item ${notification.isRead ? 'read' : 'unread'} ${selectedNotification?.id === notification.id ? 'selected' : ''}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="notification-content">
                  <div className="notification-title">
                    {notification.title}
                    {!notification.isRead && <span className="unread-dot" />}
                  </div>
                  <div className="notification-preview">
                    {notification.message.substring(0, 60)}...
                  </div>
                  <div className="notification-date">
                    {formatDate(notification.timestamp)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="message-detail">
          {selectedNotification ? (
            <div className="selected-message">
              <h3>{selectedNotification.title}</h3>
              <div className="message-date">
                {formatDate(selectedNotification.timestamp)}
              </div>
              <div className="message-body">
                {selectedNotification.message}
              </div>
            </div>
          ) : (
            <div className="no-message-selected">
              Select a message to view details
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .messages-container {
          padding: 2rem;
          height: calc(100vh - 80px);
          display: flex;
          flex-direction: column;
        }

        .messages-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .messages-header h2 {
          color: var(--dark);
          margin: 0;
        }

        .mark-all-read {
          background: none;
          border: none;
          color: var(--primary);
          cursor: pointer;
          font-weight: 500;
        }

        .messages-content {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2rem;
          flex: 1;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .notifications-list {
          border-right: 1px solid #eee;
          overflow-y: auto;
        }

        .notification-item {
          padding: 1rem;
          border-bottom: 1px solid #eee;
          cursor: pointer;
          display: flex;
          gap: 1rem;
          transition: background-color 0.2s;
        }

        .notification-item:hover {
          background-color: #f9f9f9;
        }

        .notification-item.selected {
          background-color: #f0f0f0;
        }

        .notification-item.unread {
          background-color: #fef6f6;
        }

        .notification-icon {
          font-size: 1.5rem;
        }

        .notification-content {
          flex: 1;
        }

        .notification-title {
          font-weight: 500;
          color: var(--dark);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
        }

        .notification-preview {
          color: #666;
          font-size: 0.9rem;
          margin: 0.25rem 0;
        }

        .notification-date {
          color: #999;
          font-size: 0.8rem;
        }

        .message-detail {
          padding: 2rem;
          overflow-y: auto;
        }

        .selected-message h3 {
          color: var(--dark);
          margin: 0 0 0.5rem;
        }

        .message-date {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .message-body {
          white-space: pre-line;
          line-height: 1.6;
        }

        .no-messages,
        .no-message-selected {
          color: #666;
          text-align: center;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Messages; 