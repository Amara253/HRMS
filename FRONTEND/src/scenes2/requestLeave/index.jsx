import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
} from "@mui/material";
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from '../../utilis/ApiRequest';
import { useAuth } from '../../utilis/AuthContext';

const LeaveRequest = () => {


  const { currentUser } = useAuth()

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedLeaveType, setSelectedLeaveType] = useState('');
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [description, setDescription] = useState('');
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  useEffect(() => {
    // Fetch only active leaves from the backend
    const fetchActiveLeaves = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/get_leaves');
        const modifiedData = response.data
          .filter((row) => row.status === 'active')
          .map((row) => ({
            ...row,
            id: row._id,
          }));
        const leaveNames = modifiedData.map(leave => leave.name);
        setLeaveTypes(leaveNames);
      } catch (error) {
        console.error('Error fetching active leave data:', error);
      }
    };
  
    fetchActiveLeaves();
  }, []);
  const handleLeaveTypeChange = (event) => {
    setSelectedLeaveType(event.target.value);
  };

  const validateFields = () => {
    setErrorMessage(''); // Clear any previous error message

    if (!startDate || !endDate || !selectedLeaveType) {
      setErrorMessage('Please fill in all required fields.');
      setSubmitButtonDisabled(true);
      return false;
    }

    setSubmitButtonDisabled(false); // Enable submit button if all fields are filled
    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) {
      return; // Prevent submission if validation fails
    }

    try {
      const response = await axiosInstance.post('http://localhost:5000/api/requests', {
        userID: currentUser._id,
        username: currentUser.firstName + " "+ currentUser.lastName,
        startDate,
        endDate,
        leaveType: selectedLeaveType,
        description,
      });

      console.log('Leave request submitted successfully:', response.data);
      setOpenSuccessDialog(true); // Open success dialog
      // Clear form data and any error messages
      setStartDate('');
      setEndDate('');
      setSelectedLeaveType('');
      setDescription('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error submitting leave request:', error);
      setErrorMessage('An error occurred while submitting your request. Please try again later.');
    }
  };

  const handleCloseSuccessDialog = () => {
    setOpenSuccessDialog(false);
  };

  return (
    <Box p={3} maxWidth={900} >
      <Box display="flex" flexDirection="row"  marginBottom="40px">
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ marginRight: '10px' }}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>

      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="leave-type-label">Leave Type</InputLabel>
        <Select
          labelId="leave-type-label"
          id="leave-type"
          value={selectedLeaveType}
                  onChange={handleLeaveTypeChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
        >
          {leaveTypes.map((leave) => (
            <MenuItem key={leave} value={leave}>
              {leave}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Description"
        multiline
        rows={6}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginBottom: '20px' }}
        fullWidth
      />

<Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={{ backgroundColor: '#2196F3', width: '50%' }}
        disabled={submitButtonDisabled}
      >
        Submit Leave Request
      </Button>
      <Dialog open={openSuccessDialog} onClose={handleCloseSuccessDialog}>
        <DialogTitle style={{color:"green"}}>
          Success!
          <IconButton onClick={handleCloseSuccessDialog} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your leave request has been submitted successfully.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LeaveRequest;