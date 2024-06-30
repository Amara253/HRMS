import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { List, ListItem, ListItemText, Badge, IconButton, Popover, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';

// Ensure this matches your Socket.IO server setup
const socket = io('http://localhost:5000');

const Notifications = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const handleNewNotification = (notification) => {
      console.log("New notification received:", notification); // For debugging purposes
      setNotifications((prev) => [...prev, notification]);
    };

    socket.on('leaveStatusChanged', handleNewNotification);

    // Clean up the effect to prevent memory leaks and multiple listeners being attached
    return () => {
      console.log("Cleaning up notification listener");
      socket.off('leaveStatusChanged', handleNewNotification);
    };
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{ overflow: "auto" }} // Adjusted for better scroll behavior
      >
        <List sx={{ width: '100%', maxWidth: 360, minWidth: 250, maxHeight: 400, overflow: 'auto', bgcolor: 'background.paper' }}>
          {notifications.length > 0 ? notifications.map((notification, index) => (
            <ListItem key={index} button onClick={() => {/* Navigate to leave history or handle read */}}>
              <ListItemText primary={`Your leave request has been ${notification.status}.`} />
            </ListItem>
          )) : (
            <ListItem>
              <Typography sx={{ mx: 'auto' }}>No notifications</Typography>
            </ListItem>
          )}
        </List>
      </Popover>
    </div>
  );
};

export default Notifications;
