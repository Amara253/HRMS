import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Badge, IconButton, Popover, List, ListItem, ListItemText, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';

const socket = io('http://localhost:5000'); // Adjust according to your server setup

const AdminNotifications = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Function to handle the reception of a new notification
      const handleNewNotification = (notification) => {
        console.log('Notification data:', notification); // For debugging
      setNotifications((prev) => [...prev, notification]);
    };

    // Subscribe to the 'newLeaveRequestNotification' event
    socket.on('newLeaveRequestNotification', handleNewNotification);

    // Cleanup function to run on component unmount
    return () => {
      // Unsubscribe from the 'newLeaveRequestNotification' event
      socket.off('newLeaveRequestNotification', handleNewNotification);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        sx={{
          "& .MuiPopover-paper": {
            minWidth: "250px", // Set a minimum width for the popover
            maxWidth: "400px", // Optional: Set a maximum width for the popover
            maxHeight: "60vh" // Adjust height based on viewport, allowing internal scroll
          }
        }}
      >
        <List sx={{ pt: 0 }}>
          {notifications.length > 0 ? notifications.map((notification, index) => (
            <ListItem key={index} button onClick={() => {/* Implement navigation logic here */}}>
              <ListItemText primary={notification.message} />
            </ListItem>
          )) : (
            // Display a message if there are no notifications
            <ListItem>
              <Typography textAlign="center" sx={{ width: "100%" }}>No new notifications</Typography>
            </ListItem>
          )}
        </List>
      </Popover>
    </>
  );
};

export default AdminNotifications;
