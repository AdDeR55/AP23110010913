import React, { useState, useContext } from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, Avatar } from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { AppContext } from '../state/AppContext';

const Login = () => {
  const [inputToken, setInputToken] = useState('');
  const { saveToken } = useContext(AppContext);

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputToken.trim()) {
      saveToken(inputToken.trim());
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)',
      margin: '-32px' // offset container padding if any
    }}>
      <Card sx={{ 
        maxWidth: 420, 
        width: '100%', 
        p: 3,
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
        animation: 'slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <style>
          {`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
            <LockOutlined fontSize="large" />
          </Avatar>
          <Typography variant="h4" align="center" gutterBottom color="text.primary">
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Enter your JWT access token to access the Campus Connect dashboard.
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ width: '100%' }}>
            <TextField
              fullWidth
              label="Access Token"
              variant="outlined"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit"
              disabled={!inputToken.trim()}
              size="large"
              sx={{ py: 1.5 }}
            >
              Enter Dashboard
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
