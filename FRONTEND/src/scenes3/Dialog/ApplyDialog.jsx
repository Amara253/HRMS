import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';
import upload from "../../utilis/upload.js";
import axiosInstance from '../../utilis/ApiRequest.js';

const ApplyDialog = ({ open, handleClose, jobId, handleApply, jobTitle }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [cv, setCv] = useState(null);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  // Function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCv(file);
  };

  // Function to handle form submission
  // Function to handle form submission
const handleSubmit = async () => {
    // Log job ID and apply
    if (!username || !email || !cv) {
      // Alert the user if any field is empty
      alert('Please fill in all fields.');
      return;
    }
    const cvPath = await upload(cv);
  
    try {
        await axiosInstance.post('http://localhost:5000/api/applied-applicants', {
          jobTitle,
          applicants: [
            {
              name: username,
              jobId,
              email,
              cv: cvPath
            }
          ]
        });
  
      // Reset form fields
      setUsername('');
      setEmail('');
      setCv(null);
  
      // Close the dialog
      handleClose();
      setSuccessDialogOpen(true);
    } catch (error) {
      console.error("Error during API request:", error);
      alert('Failed to submit application. Please try again.');
    }
  };
  
  // Function to handle dialog close
  const handleCloseDialog = () => {
    setUsername('');
    setEmail('');
    setCv(null);
    handleClose();
  };

  const handleCloseSuccessDialog = () => {
    setSuccessDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle style={{ fontWeight: 'bold' }}>{`Job Application for ${jobTitle}`}</DialogTitle>
        <DialogContent>
          <Box marginBottom={3} borderRadius={10} bgcolor="#f3f3f3" padding={3}>
            <Typography variant="subtitle1" marginBottom={2}>Your Information</Typography>
            <TextField
              autoFocus
              label="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Box marginTop={2}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </Box>
          <Box marginTop={3} borderRadius={10} bgcolor="#f3f3f3" padding={3}>
            <Typography variant="subtitle1" marginBottom={2}>Upload Your CV</Typography>
            <Box display="flex" alignItems="center">
              <input
                accept=".pdf,.doc,.docx"
                style={{ display: 'none' }}
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" startIcon={<CloudUploadIcon />} color="primary">
                  Upload CV
                </Button>
              </label>
              {cv && (
                <Typography variant="body2" marginLeft={1}>
                  {cv.name}
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Success dialog */}
      <Dialog open={successDialogOpen} onClose={handleCloseSuccessDialog}>
        <DialogContent style={{ color: "green", fontStyle: "bold" }}>
          <Typography>Your application was submitted successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApplyDialog;
