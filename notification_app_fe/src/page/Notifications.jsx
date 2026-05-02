import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import NotificationCard from '../component/NotificationCard';
import FilterBar from '../component/FilterBar';
import PaginationControls from '../component/PaginationControls';
import { useNotifications } from '../hook/useNotifications';

const Notifications = () => {
  const { notifications, loading, error, totalPages, fetchNotifications } = useNotifications();
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const params = { page, limit };
    if (filter) {
      params.notification_type = filter;
    }
    fetchNotifications(params);
  }, [page, limit, filter, fetchNotifications]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page on limit change
  };

  return (
    <Box>
      <Typography variant="h5" component="h1" gutterBottom>
        All Notifications
      </Typography>
      
      <FilterBar currentFilter={filter} onFilterChange={handleFilterChange} />

      {error && (
        <Typography color="error" sx={{ my: 2 }}>{error}</Typography>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 && !error ? (
        <Box sx={{ textAlign: 'center', py: 5, color: 'text.secondary' }}>
          <Typography variant="h6">No notifications found.</Typography>
        </Box>
      ) : (
        <Box>
          {notifications.map(notif => (
            <NotificationCard key={notif.id || notif._id} notification={notif} />
          ))}
          <PaginationControls 
            currentPage={page} 
            totalPages={totalPages} 
            limit={limit} 
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Notifications;
