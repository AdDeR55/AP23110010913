import React, { createContext, useState, useEffect } from 'react';
import { Log } from '../hook/useLogger';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [readIds, setReadIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('read_ids') || '[]');
    } catch {
      return [];
    }
  });

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      const updatedIds = [...readIds, id];
      setReadIds(updatedIds);
      localStorage.setItem('read_ids', JSON.stringify(updatedIds));
      Log('AppContext', 'INFO', 'UI', `Notification ${id} marked as read`);
    }
  };

  return (
    <AppContext.Provider value={{ readIds, markAsRead }}>
      {children}
    </AppContext.Provider>
  );
};
