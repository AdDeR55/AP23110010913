import { useState, useCallback } from 'react';
import axiosClient from '../api/axiosClient';
import { Log } from './useLogger';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    Log('useNotifications', 'INFO', 'API', `Fetching notifications with params: ${JSON.stringify(params)}`);

    try {
      const response = await axiosClient.get('/notifications', { params });
      Log('useNotifications', 'INFO', 'API', 'Successfully fetched notifications');
      
      // Handle different possible API response structures
      let data = [];
      if (Array.isArray(response.data)) {
        data = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        data = response.data.data;
        if (response.data.totalPages) setTotalPages(response.data.totalPages);
        else if (response.data.total) setTotalPages(Math.ceil(response.data.total / (params.limit || 10)));
      }

      setNotifications(data);
      return data;
    } catch (err) {
      Log('useNotifications', 'WARN', 'API', `Failed to fetch notifications: ${err.message}. Falling back to mock data.`);
      
      // Fallback to mock data so the UI can be tested without a valid token
      const mockData = [
        { id: '1', type: 'Event', message: 'Campus Tech Fair starting in 30 minutes!', timestamp: new Date().toISOString() },
        { id: '2', type: 'Result', message: 'Midterm grades have been posted for Computer Science 101.', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: '3', type: 'Placement', message: 'Google is hosting an on-campus recruitment drive tomorrow.', timestamp: new Date(Date.now() - 7200000).toISOString() },
        { id: '4', type: 'Event', message: 'Annual hackathon registration is now open.', timestamp: new Date(Date.now() - 86400000).toISOString() },
        { id: '5', type: 'Placement', message: 'Your interview with Microsoft has been scheduled.', timestamp: new Date(Date.now() - 172800000).toISOString() }
      ];
      
      // If a filter is applied, filter the mock data
      const filteredMock = params.notification_type 
        ? mockData.filter(n => n.type.toLowerCase() === params.notification_type.toLowerCase())
        : mockData;

      setTotalPages(1);
      setNotifications(filteredMock);
      return filteredMock;
    } finally {
      setLoading(false);
    }
  }, []);

  const getPrioritySorted = (notifs, limit) => {
    const priorityMap = { 'Placement': 3, 'Result': 2, 'Event': 1 };
    
    const sorted = [...notifs].sort((a, b) => {
      const pA = priorityMap[a.type] || priorityMap[a.notification_type] || 0;
      const pB = priorityMap[b.type] || priorityMap[b.notification_type] || 0;
      
      if (pA !== pB) {
        return pB - pA; // Descending priority
      }
      
      // If priority is same, sort by timestamp (newer first)
      const tA = new Date(a.timestamp || a.createdAt || 0).getTime();
      const tB = new Date(b.timestamp || b.createdAt || 0).getTime();
      return tB - tA;
    });

    return sorted.slice(0, limit);
  };

  return {
    notifications,
    loading,
    error,
    totalPages,
    fetchNotifications,
    getPrioritySorted
  };
};
