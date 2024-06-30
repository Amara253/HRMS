import React, { useEffect, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../../utilis/ApiRequest';
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme,
} from '@mui/material';
import { tokens } from "../../theme";
import { DataGrid } from "@mui/x-data-grid";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmationModal from '../../components/ConfirmationModal';

const JobsPosted = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [jobs, setJobs] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editedJob, setEditedJob] = useState({});
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    jobInfo: {},
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get('/get_all_jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
  
    fetchJobs();
  }, []);
  

  const handleEdit = async (id) => {
    try {
      const response = await axiosInstance.get(`/get_job/${id}`);
      const existingJob = response.data;
      console.log("Fetched Job Data:", existingJob);
  
      // Check if existingJob is valid before setting the state
      if (existingJob) {
        setEditedJob(existingJob);
        setEditDialogOpen(true);
      } else {
        console.error("Fetched job data is invalid:", existingJob);
      }
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  

  const handleActivateDeactivate = async (id, isActive) => {
    try {
      // Send the request to the backend to update the isActive state
      const response = await axiosInstance.put(`/activate_deactivate_job/${id}`, {
        isActive: !isActive,
      });

      console.log('Job activation/deactivation successful:', response.data);

      // Update the local state based on the response
      const updatedJobs = jobs.map((job) =>
        job._id === id ? { ...job, isActive: !isActive } : job
      );

      setJobs(updatedJobs);
    } catch (error) {
      console.error('Error activating/deactivating job:', error);
    }
  };
  
  
  
  
  
  

  const handleDialogClose = () => {
    console.log("Closing Dialog. Edited Job:", editedJob); // Add this line
    setEditDialogOpen(false);
    setEditedJob({});
  };
  
  

  const handleDialogSubmit = async () => {
    try {
      console.log("Submitting Edited Job:", editedJob); // Add this line
      await axiosInstance.put(`/edit_job/${editedJob._id}`, editedJob);
      const response = await axiosInstance.get("http://localhost:5000/api/get_jobs");
      setJobs(response.data);
      setEditDialogOpen(false);
      setEditedJob({});
    } catch (error) {
      console.error("Error updating job data:", error);
    }
  };
  

  const handleDelete = (id, jobTitle, companyName, postingDate, employmentType, jobLocation) => {
    setDeleteConfirmation({
      open: true,
      jobInfo: {
        id,
        jobTitle,
        companyName,
        postingDate,
        employmentType,
        jobLocation,
      },
    });
  };

  const handleConfirmDelete = () => {
    const { id, jobTitle } = deleteConfirmation.jobInfo;
    console.log(`Deleting job with ID: ${id}`);
    
    axiosInstance
      .delete(`http://localhost:5000/api/delete_job/${id}`)
      .then((response) => {
        console.log('Response from backend:', response.data);
        console.log('Job deleted successfully');
  
        // Update state to remove the deleted job
        setJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== id)
        );
  
        setDeleteConfirmation({ open: false, jobInfo: {} });
      })
      .catch((error) => {
        console.error('Error deleting job:', error);
        setDeleteConfirmation({ open: false, jobInfo: {} });
      });
  };
  

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({ open: false, jobInfo: {} });
  };

  const columns = [
    { field: 'jobTitle', headerName: 'Job Title', flex: 1 },
    { field: 'companyName', headerName: 'Company Name', flex: 1 },
    { field: 'minPrice', headerName: 'Minimum Price', flex: 1 },
    { field: 'maxPrice', headerName: 'Maximum Price', flex: 1 },
    { field: 'salaryType', headerName: 'Salary Type', flex: 1 },
    { field: 'jobLocation', headerName: 'Job Location', flex: 1 },
    { field: 'postingDate', headerName: 'Posting Date', flex: 1 },
    { field: 'experienceLevel', headerName: 'Experience Level', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => handleEdit(row._id)}>
            <ModeEditOutlineOutlinedIcon style={{ color: '#784B84', fontSize: 26 }} />
          </IconButton>
          <IconButton
            onClick={() =>
              handleDelete(
                row._id,
                row.jobTitle,
                row.companyName,
                row.postingDate,
                row.experienceLevel,
                row.employmentType,
                row.jobLocation
              )
            }
          >
            <DeleteOutlinedIcon style={{ color: '#D21F3C', fontSize: 20 }} />
          </IconButton>
        </Box>
      ),
      
    },
    {field:'isActive',headerName:'Status',flex:1,renderCell: ({ row }) => (
      <Button
      variant="contained"
      onClick={() => handleActivateDeactivate(row._id, row.isActive)}
      style={{
        backgroundColor: row.isActive ? '#E74C3C' : '#2ECC71',
        color: '#FFFFFF',
        fontWeight: 'bold',
      }}
    >
      {row.isActive ? 'Inactive' : 'Active'}
    </Button>
    ),},

  ];

  return (
    <Box  m="40px 0 0 0"
    height="75vh"
    sx={{
      "& .MuiDataGrid-root": {
        border: "none",
      },
      "& .MuiDataGrid-cell": {
        borderBottom: "none",
        fontSize: "0.9rem",
      },
      "& .name-column--cell": {
        color: colors.greenAccent[300],
      },
      "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.blueAccent[700],
        borderBottom: "none",
        fontSize: "1rem"
      },
      "& .MuiDataGrid-virtualScroller": {
        backgroundColor: colors.primary[400],
      },
      "& .MuiDataGrid-footerContainer": {
        borderTop: "none",
        backgroundColor: colors.blueAccent[700],
      },
      "& .MuiCheckbox-root": {
        color: `${colors.greenAccent[200]} !important`,
      },
    }}>
      <DataGrid
        checkboxSelection
        rows={jobs}
        columns={columns}
        pageSize={10}
        autoHeight
        getRowId={(row) => row._id}
      />
      <ConfirmationModal
        open={deleteConfirmation.open}
        onClose={handleCloseDeleteConfirmation}
        onConfirm={handleConfirmDelete}
        title="Delete Confirmation"
        content={
          <div>
            <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
              Are you sure?
            </Typography>
            <div style={{ marginLeft: '20px' }}>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Job Title: {deleteConfirmation.jobInfo.jobTitle}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Company Name: {deleteConfirmation.jobInfo.companyName}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Posting Date: {deleteConfirmation.jobInfo.postingDate}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Employment Type: {deleteConfirmation.jobInfo.employmentType}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Job Location: {deleteConfirmation.jobInfo.jobLocation}
              </Typography>
            </div>
          </div>
        }
      />
      <Dialog open={editDialogOpen} onClose={handleDialogClose}>
  <DialogTitle>Edit Job</DialogTitle>
  <DialogContent sx={{ padding: '20px' }}>
    <TextField
      fullWidth
      variant="filled"
      label="Job Title"
      value={editedJob.jobTitle}
      onChange={(e) => setEditedJob({ ...editedJob, jobTitle: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Company Name"
      value={editedJob.companyName}
      onChange={(e) => setEditedJob({ ...editedJob, companyName: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Minimum Price"
      type="number"
      value={editedJob.minPrice}
      onChange={(e) => setEditedJob({ ...editedJob, minPrice: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Maximum Price"
      type="number"
      value={editedJob.maxPrice}
      onChange={(e) => setEditedJob({ ...editedJob, maxPrice: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Salary Type"
      value={editedJob.salaryType}
      onChange={(e) => setEditedJob({ ...editedJob, salaryType: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Job Location"
      value={editedJob.jobLocation}
      onChange={(e) => setEditedJob({ ...editedJob, jobLocation: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Posting Date"
      type="date"
      value={editedJob.postingDate}
      onChange={(e) => setEditedJob({ ...editedJob, postingDate: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Experience Level"
      value={editedJob.experienceLevel}
      onChange={(e) => setEditedJob({ ...editedJob, experienceLevel: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
    <TextField
      fullWidth
      variant="filled"
      label="Employment Type"
      value={editedJob.employmentType}
      onChange={(e) => setEditedJob({ ...editedJob, employmentType: e.target.value })}
      sx={{ marginBottom: '16px' }}
    />
  </DialogContent>
  <DialogActions>
    <Button
      onClick={handleDialogClose}
      sx={{
        marginRight: '8px',
        backgroundColor: '#C0392B',
        fontWeight: 'bold',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#E74C32',
        },
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleDialogSubmit}
      sx={{
        backgroundColor: '#33852e',
        fontWeight: 'bold',
        color: '#FFFFFF',
        '&:hover': {
          backgroundColor: '#62a540',
        },
      }}
    >
      Save Changes
    </Button>
  </DialogActions>
</Dialog>
    </Box>
  );
};

export default JobsPosted;
