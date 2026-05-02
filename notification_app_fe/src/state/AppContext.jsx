import React, { createContext, useState, useEffect } from 'react';
import { Log } from '../hook/useLogger';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('access_token') || null);
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('read_ids') || '[]');
    } catch {
      return [];
    }
  });

  const saveToken = (newToken) => {
    localStorage.setItem('access_token', newToken);
    setToken(newToken);
    Log('AppContext', 'INFO', 'Auth', 'Token updated');
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    Log('AppContext', 'INFO', 'Auth', 'User logged out');
  };

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updatedIds = [...readIds, id];
      setReadIds(updatedIds);
      localStorage.setItem('read_ids', JSON.stringify(updatedIds));
      Log('AppContext', 'INFO', 'UI', `Notification ${id} marked as read`);
    }
  };

  return (
    <AppContext.Provider value={{ token, saveToken, logout, readIds, markAsRead }}>
      {children}
    </AppContext.Provider>
  );
};
