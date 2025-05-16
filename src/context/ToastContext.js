import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ message: '', visible: false });

  const showToast = useCallback((message, duration = 3000) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div style={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: '#333',
          color: '#fff',
          padding: '16px 32px',
          borderRadius: 8,
          boxShadow: '0 2px 8px #0002',
          zIndex: 9999,
          fontSize: 16,
        }}>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
}; 