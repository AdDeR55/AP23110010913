import React from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const PaginationControls = ({ currentPage, totalPages, limit, onPageChange, onLimitChange }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, flexWrap: 'wrap', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="limit-select-label">Per Page</InputLabel>
          <Select
            labelId="limit-select-label"
            value={limit}
            label="Per Page"
            onChange={(e) => onLimitChange(e.target.value)}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
          variant="outlined" 
          disabled={currentPage <= 1} 
          onClick={() => onPageChange(currentPage - 1)}
          startIcon={<ChevronLeft />}
        >
          Prev
        </Button>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          Page {currentPage} of {totalPages || 1}
        </Typography>
        <Button 
          variant="outlined" 
          disabled={currentPage >= totalPages} 
          onClick={() => onPageChange(currentPage + 1)}
          endIcon={<ChevronRight />}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaginationControls;
