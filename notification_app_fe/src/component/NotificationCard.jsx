import React, { useContext } from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { EventAvailable, Work, Grade, Circle, CheckCircle } from '@mui/icons-material';
import { AppContext } from '../state/AppContext';
import { format } from 'date-fns';

const NotificationCard = ({ notification }) => {
  const { readIds, markAsRead } = useContext(AppContext);
  
  const id = notification.id || notification._id;
  const type = notification.type || notification.notification_type || 'General';
  const message = notification.message || notification.content || '';
  const timestamp = notification.timestamp || notification.createdAt || new Date().toISOString();
  
  const isRead = readIds.includes(id);

  const handleClick = () => {
    if (id) {
      markAsRead(id);
    }
  };

  const getTypeConfig = (type) => {
    switch (type.toLowerCase()) {
      case 'placement': 
        return { color: 'success', icon: <Work fontSize="small" /> };
      case 'result': 
        return { color: 'info', icon: <Grade fontSize="small" /> };
      case 'event': 
        return { color: 'warning', icon: <EventAvailable fontSize="small" /> };
      default: 
        return { color: 'primary', icon: null };
    }
  };

  const config = getTypeConfig(type);

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        mb: 2.5, 
        cursor: 'pointer',
        opacity: isRead ? 0.7 : 1,
        backgroundColor: isRead ? 'background.default' : 'background.paper',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      {!isRead && (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 16, 
            left: -8, 
            width: 16, 
            height: 16, 
            borderRadius: '50%', 
            backgroundColor: 'primary.main',
            border: '3px solid white',
            boxShadow: 1
          }} 
        />
      )}
      <CardContent sx={{ pl: isRead ? 2 : 3, py: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
          <Chip 
            icon={config.icon}
            label={type} 
            color={config.color} 
            size="small" 
            sx={{ 
              backgroundColor: `${config.color}.light`, 
              color: `${config.color}.dark`,
              '& .MuiChip-icon': { color: `${config.color}.dark` }
            }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>
              {format(new Date(timestamp), 'MMM dd, yyyy • h:mm a')}
            </Typography>
            {isRead && <CheckCircle color="success" sx={{ fontSize: 16, opacity: 0.5 }} />}
          </Box>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            fontWeight: isRead ? 400 : 600,
            color: isRead ? 'text.secondary' : 'text.primary',
            lineHeight: 1.6
          }}
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
