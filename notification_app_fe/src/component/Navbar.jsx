import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../state/AppContext';
import { NotificationsActive } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="md">
        <Toolbar disableGutters>
          <Box 
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer', gap: 1 }} 
            onClick={() => handleNavigation('/')}
          >
            <NotificationsActive color="primary" />
            <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
              Campus Connect
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              color="inherit" 
              onClick={() => handleNavigation('/')}
              sx={{ 
                color: location.pathname === '/' ? 'primary.main' : 'text.secondary',
                backgroundColor: location.pathname === '/' ? 'primary.light' : 'transparent',
                '&:hover': {
                  backgroundColor: location.pathname === '/' ? 'primary.light' : 'action.hover',
                }
              }}
            >
              All Notifications
            </Button>
            <Button 
              color="inherit" 
              onClick={() => handleNavigation('/priority')}
              sx={{ 
                color: location.pathname === '/priority' ? 'primary.main' : 'text.secondary',
                backgroundColor: location.pathname === '/priority' ? 'primary.light' : 'transparent',
                '&:hover': {
                  backgroundColor: location.pathname === '/priority' ? 'primary.light' : 'action.hover',
                }
              }}
            >
              Priority Inbox
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
