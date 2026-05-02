import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AppContext } from './state/AppContext';
import Navbar from './component/Navbar';
import Login from './page/Login';
import Notifications from './page/Notifications';
import Priority from './page/Priority';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AppContext);
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { token } = useContext(AppContext);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {token && <Navbar />}
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={<PrivateRoute><Notifications /></PrivateRoute>} />
          <Route path="/priority" element={<PrivateRoute><Priority /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
