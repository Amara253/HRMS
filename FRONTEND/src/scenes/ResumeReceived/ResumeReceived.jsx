import React, { useState, useEffect } from 'react';
import { Box, FormControl, Select, MenuItem, Typography,Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Card, CardContent, List, ListItem, ListItemText, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { blue,red } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import axiosInstance from '../../utilis/ApiRequest';


const ResumeReceived = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [applicantData, setApplicantData] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
   const [verificationDialogOpen, setVerificationDialogOpen] = useState(false);
  const [selectedApplicantId, setSelectedApplicantId] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null); 
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [emailDataForConfirmation, setEmailDataForConfirmation] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  ////////////////////////////////////////////////


  
    const [emailData, setEmailData] = useState({
      to: 'mfaizanullah336@gmail.com',
      subject: 'Testing send-email api',
      text: 'so its fine I think!'
    });
    const [message, setMessage] = useState('');
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setEmailData({ ...emailData, [name]: value });
    // };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axiosInstance.post('http://localhost:5000/api/send-email', emailData);
        setMessage(response.data);
      } catch (error) {
        setMessage('Error sending email');
        console.error(error);
      }
    };



  /////////////////////////////////////////////////

  useEffect(() => {
    // Fetch applicant data based on selected job
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/applied-applicants/${selectedJob}`);
        // Add unique IDs to each row
        const formattedData = response.data.applicants.map((applicant, index) => ({
          ...applicant,
          id: index + 1, // Generate unique ID based on index
        }));
        setApplicantData(formattedData);
        
        // Fetch job details using the first job ID
        if (formattedData.length > 0) {
          const firstJobId = formattedData[0].jobId;
          fetchJobDetails(firstJobId);
        } else {
          setJobDetails(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setApplicantData([]);
        setJobDetails(null);
      }
    };

    if (selectedJob) {
      fetchData();
    }
  }, [selectedJob]);

  const fetchJobDetails = async (jobId) => {
    try {
      const response = await axiosInstance.get(`http://localhost:5000/api/get_job/${jobId}`);
      setJobDetails(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setJobDetails(null);
    }
  };

  const handleJobChange = (event) => {
    const selectedJob = event.target.value;
    setSelectedJob(selectedJob);
  };

  const handleCVClick = (cvLink) => {
    window.open(cvLink, '_blank');
  };

  const handleEmailSend = (applicantId) => {
    // Find the selected applicant based on the applicantId
    const selectedApplicant = applicantData.find((applicant) => applicant.id === applicantId);
    
    // Construct the email data for the confirmation dialog
    const emailDataForConfirmation = {
      to: selectedApplicant.email,
      subject: 'Shortlisted for the Job',
      text: 'Congratulations! You have been shortlisted for the job. Please stay tuned for further updates.',
    };
    setEmailData(emailData);
    // Set the email data for the confirmation dialog
    setEmailDataForConfirmation(emailDataForConfirmation);
  
    // Open the confirmation dialog
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = async (confirmed) => {
    // Close the confirmation dialog
    setConfirmationDialogOpen(false);
  
    if (confirmed) {
      // If confirmed, send the email
      try {
        // Use emailDataForConfirmation instead of emailData
        const response = await axiosInstance.post('http://localhost:5000/api/send-email', emailDataForConfirmation);
        console.log('Email sent successfully:', response.data);
        setSuccessDialogOpen(true);
        // Add any success message or UI update as needed
      } catch (error) {
        console.error('Error sending email:', error);
        // Handle the error, e.g., display an error message to the user
      }
    }
  };

  const handleShortlistClick = async (applicantId) => {
    setSelectedApplicantId(applicantId);
    setSelectedAction('shortlist');
    setVerificationDialogOpen(true);
  };
  
  const handleUnshortlistClick = async (applicantId) => {
    setSelectedApplicantId(applicantId);
    setSelectedAction('unshortlist');
    setVerificationDialogOpen(true);
  };
  
  const handleConfirmation = async () => {
    // Update UI immediately
    const updatedApplicantData = applicantData.map((applicant) => {
      if (applicant.id === selectedApplicantId) {
        return { ...applicant, shortlisted: selectedAction === 'shortlist' };
      }
      return applicant;
    });
    setApplicantData(updatedApplicantData);
  
    try {
      if (selectedAction === 'shortlist' || selectedAction === 'unshortlist') {
        // Send API request
        await axiosInstance.post(`http://localhost:5000/api/${selectedAction}/${selectedApplicantId}`, { jobId: selectedJob });
        
        // Update UI after successful request
        const response = await axiosInstance.get(`http://localhost:5000/api/applied-applicants/${selectedJob}`);
        const formattedData = response.data.applicants.map((applicant, index) => ({
          ...applicant,
          id: index + 1, // Assuming index is unique
        }));
        setApplicantData(formattedData);
      }
    } catch (error) {
      console.error(`Error ${selectedAction === 'shortlist' ? 'shortlisting' : 'unshortlisting'} applicant:`, error);
    }
  
    setVerificationDialogOpen(false);
  };
  const filteredApplicantData = applicantData.filter((applicant) => !applicant.shortlisted);

  return (
    <Box m="20px">
      {/* Job Selection Dropdown */}
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <Select
          value={selectedJob}
          onChange={handleJobChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Job' }}
        >
          <MenuItem value="" disabled>Select Job</MenuItem>
          <MenuItem value="Web Designer">Web Designer</MenuItem>
          <MenuItem value="Web Developer">Web Developer</MenuItem>
          <MenuItem value="Testing Engineer">Testing Engineer</MenuItem>
          <MenuItem value="Software Engineer">Software Engineer</MenuItem>
          <MenuItem value="Quality Assurance Engineer">Quality Assurance Engineer</MenuItem>
          {/* Add more job titles as needed */}
        </Select>
      </FormControl>

      {jobDetails && (
  
      <div style={{ padding: '10px', borderRadius: '9px', marginBottom: '20px',width:"400px" , boxShadow: '0 1px 2px'}}>
        <Typography><strong>JOB DESCRIPTION:</strong></Typography>
        <Typography><strong>Company:</strong> {jobDetails.companyName}</Typography>
        <Typography><strong>Salary Type:</strong> {jobDetails.salaryType}</Typography>
        <Typography><strong>Job Location:</strong> {jobDetails.jobLocation}</Typography>
        <Typography><strong>Posting Date:</strong> {jobDetails.postingDate}</Typography>
        <Typography><strong>Experience Level:</strong> {jobDetails.experienceLevel}</Typography>
        <Typography><strong>Skills:</strong> {jobDetails.skills.map(skill => skill.label).join(', ')}</Typography>
      </div>
    

)}


      {/* Data Grid for Resume Received */}
      <Box mt={3} style={{ height: 400, width: '100%' }}>
        <DataGrid

        sx={{ "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
           
          },
        
        }}
       
          rows={applicantData}
          columns={[
            { field: '_id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Name', width: 150 },
            // { field: 'jobId', headerName: 'Job ID', width: 200 },
            { field: 'email', headerName: 'Email', width: 250 },
            {
              field: 'cv',
              headerName: 'CV',
              width: 200,
              renderCell: (params) => (
                <a href="#" onClick={() => handleCVClick(params.value)} style={{ color: blue[500], textDecoration: 'underline' }}>
                  Uploaded Cv Link
                </a>
              ),
            },

            { field: 'status', headerName: 'Status', width: 200,
            renderCell: (params) => (
              params.row.shortlisted ? (
                <Button
                  variant="contained"
                  style={{ backgroundColor: blue[500], color: '#fff' }}
                  onClick={() => handleUnshortlistClick(params.row._id)}
                >
                  Shortlisted
                </Button>
              ) : (
                <Button
                  variant="contained"
                  style={{ backgroundColor: red[500], color: '#fff' }}
                  onClick={() => handleShortlistClick(params.row._id)}
                >
                  Not Shortlisted
                </Button>
              )
            ),
          },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 150,
              renderCell: (params) => (
                  <EmailIcon style={{ color: red[500] ,fontSize:30}}  onClick={() => handleEmailSend(params.row.id)}/>
                
               
              ),
            },
          ]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
     {/* Verification Dialog */}
     <Dialog
        open={verificationDialogOpen}
        onClose={() => setVerificationDialogOpen(false)}
        aria-labelledby="verification-dialog-title"
        aria-describedby="verification-dialog-description"
      >
        <DialogTitle id="verification-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="verification-dialog-description">
            {selectedAction === 'shortlist'
              ? 'Are you sure you want to shortlist this applicant?'
              : 'Are you sure you want to remove the shortlist for this applicant?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setVerificationDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmation} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

       {/* Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            Are you sure you want to send the following email to this applicant?
            <br />
            <br />
            <strong>Email Body:</strong>
            <br />
            {emailDataForConfirmation && emailDataForConfirmation.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleConfirmationDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirmationDialogClose(true)} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

       {/* Success Dialog */}
       <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            Email successfully sent!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    
    </Box>
  );
};

export default ResumeReceived;
