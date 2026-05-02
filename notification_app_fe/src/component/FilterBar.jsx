import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

const FilterBar = ({ currentFilter, onFilterChange }) => {
  const filters = ['All', 'Event', 'Result', 'Placement'];

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 2, 
      mb: 4, 
      p: 1.5, 
      backgroundColor: 'background.paper',
      borderRadius: 24,
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      flexWrap: 'wrap',
      border: '1px solid #f1f5f9'
    }}>
      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600, ml: 1 }}>
        Filter by:
      </Typography>
      {filters.map(filter => {
        const isActive = currentFilter === filter || (filter === 'All' && !currentFilter);
        return (
          <Chip
            key={filter}
            label={filter}
            onClick={() => onFilterChange(filter === 'All' ? '' : filter)}
            color={isActive ? 'primary' : 'default'}
            variant={isActive ? 'filled' : 'outlined'}
            sx={{ 
              cursor: 'pointer',
              border: isActive ? 'none' : '1px solid #e2e8f0',
              backgroundColor: isActive ? 'primary.main' : 'transparent',
              color: isActive ? 'white' : 'text.primary',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: isActive ? 'primary.dark' : '#f8fafc',
                transform: 'translateY(-1px)',
              }
            }}
          />
        );
      })}
    </Box>
  );
};

export default FilterBar;
