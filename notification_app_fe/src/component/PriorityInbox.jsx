import React, { useEffect, useState } from 'react';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import NotificationCard from './NotificationCard';
import { useNotifications } from '../hook/useNotifications';
import axiosClient from '../api/axiosClient';

const PriorityInbox = () => {
  const { notifications, loading, error, fetchNotifications, getPrioritySorted } = useNotifications();
  const [topN, setTopN] = useState(10);
  const [sortedNotifications, setSortedNotifications] = useState([]);

  useEffect(() => {
    const fetchPriority = async () => {
      setSortedNotifications([]);
      try {
        const response = await axiosClient.get('/priority', { params: { limit: topN } });
        setSortedNotifications(response.data);
      } catch (err) {
        // Fallback to sorting all fetched notifications if the priority endpoint fails
        // This ensures the inbox is not empty if the backend has issues
        if (notifications.length > 0) {
          const sorted = getPrioritySorted(notifications, topN);
          setSortedNotifications(sorted);
        } else {
          // If even common notifications are empty, try to fetch them first
          const allNotifs = await fetchNotifications();
          const sorted = getPrioritySorted(allNotifs, topN);
          setSortedNotifications(sorted);
        }
      }
    };
    fetchPriority();
  }, [topN]);

  if (loading && notifications.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Priority Inbox
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Show Top</InputLabel>
          <Select
            value={topN}
            label="Show Top"
            onChange={(e) => setTopN(e.target.value)}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {sortedNotifications.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
          <Typography variant="h6">No priority notifications right now.</Typography>
        </Box>
      ) : (
        sortedNotifications.map(notif => (
          <NotificationCard key={notif.id || notif._id} notification={notif} />
        ))
      )}
    </Box>
  );
};

export default PriorityInbox;
