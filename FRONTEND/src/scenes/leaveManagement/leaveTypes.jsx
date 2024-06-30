import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utilis/ApiRequest';
import {
  Box,
    useTheme,
    Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import ConfirmationModal from '../../components/ConfirmationModal';
import { tokens } from "../../theme";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import IconButton from "@mui/material/IconButton";
import axios from 'axios';
import { DataGrid } from "@mui/x-data-grid";

const LeaveTypes = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [searchQuery, setSearchQuery] = useState('');
    const [leaveData, setLeaveData] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedLeave, setEditedLeave] = useState({
      _id: '',
      name: '',
      type: '',
      unit: '',
      status: '',
    });
    const [deleteConfirmation, setDeleteConfirmation] = useState({
      open: false,
      leaveInfo: {},
    });
  const handleAddLeave = () => {
    setEditedLeave({
      _id: '', // Reset _id for new leave
      name: '',
      type: '',
      unit: '',
      status: '',
    });
    setEditDialogOpen(true); // Corrected from setDialogOpen to setEditDialogOpen
  };
  const handleEditLeave = async (id) => {
  try {
    console.log('Leave ID:', id); // Log the leave ID
    const response = await axiosInstance.get(`http://localhost:5000/api/get_leave/${id}`);
    const existingLeave = response.data;
    console.log("Fetched leave Data:", existingLeave);

    // Check if existingLeave is valid before setting the state
    if (existingLeave) {
      // Update state structure based on the properties
      setEditedLeave({
        _id: existingLeave._id,
        name: existingLeave.name,
        type: existingLeave.type,
        unit: existingLeave.unit,
        status: existingLeave.status,
      });

      setEditDialogOpen(true);
    } else {
      console.error("Fetched leave data is invalid:", existingLeave);
    }
  } catch (error) {
    console.error("Error fetching leave data:", error);
  }
};


 
  

const handleDialogClose = () => {
    setEditDialogOpen(false);
};

const handleDialogSubmit = async () => {
    console.log('Submitting edited leave:', editedLeave);
    try {
        const response = editedLeave._id
            ? await axiosInstance.put(`http://localhost:5000/api/edit_leave/${editedLeave._id}`, editedLeave)
            : await axiosInstance.post('http://localhost:5000/api/add_leave', editedLeave);

        console.log(response.data); // Log the response data

        // Fetch leave data again after updating or adding
        fetchLeaveData();
        setEditDialogOpen(false);
    } catch (error) {
        console.error('Error updating or adding leave:', error);
    }
};
const fetchLeaveData = () => {
  axiosInstance.get('http://localhost:5000/api/get_leaves')
        .then((response) => {
            const modifiedData = response.data.map((row) => ({
                ...row,
                id: row._id,
            }));
            setLeaveData(modifiedData);
        })
        .catch((error) => {
            console.error('Error fetching leave data:', error);
        });
};

  
  const handleActivateDeactivate = async (id, status) => {
    try {
      const newStatus = status === 'active' ? 'inactive' : 'active';
  
      // Send the request to the backend to update the status
      const response = await axiosInstance.put(
        `http://localhost:5000/api/activate_deactivate_leave/${id}`,
        { status: newStatus }
      );
  
      console.log('Leave activation/deactivation successful:', response.data);
  
      // Update the local state based on the response
      const updatedLeaveData = leaveData.map((leave) =>
        leave._id === id ? { ...leave, status: newStatus } : leave
      );
  
      setLeaveData(updatedLeaveData);
    } catch (error) {
      console.error('Error activating/deactivating leave:', error);
    }
  };
  
  
  
  const columns = [
    { field: 'name', headerName: 'Leave Name', flex: 1 },
    { field: 'type', headerName: 'Leave Type', flex: 1 },
    { field: 'unit', headerName: 'Leave Unit', flex: 1 },
    {
        field: 'status',
        headerName: 'Status',
        flex: 1,
        renderCell: ({ row }) => (
          <Button
            variant="contained"
            onClick={() => handleActivateDeactivate(row._id, row.status)}
            style={{
              backgroundColor: row.status === 'active' ? '#E74C3C' : '#2ECC71',
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
          >
            {row.status === 'active' ? 'inactive' : 'active'}
          </Button>
        ),
      },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" alignItems="center">
          <IconButton onClick={() => handleEditLeave(row._id)}>
            <ModeEditOutlineOutlinedIcon style={{ color: '#784B84', fontSize: 26 }} />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(row._id, row.name, row.type, row.unit, row.status)}
          >
            <DeleteOutlinedIcon style={{ color: '#D21F3C', fontSize: 20 }} />
          </IconButton>
        </Box>
      ),
    },
  ];

  const handleDelete = (id, name, type, unit, status) => {
    setDeleteConfirmation({
      open: true,
      leaveInfo: {
        id,
        name,
        type,
        unit,
        status,
      },
    });
  };
  
  const handleConfirmDelete = () => {
    const { id, name } = deleteConfirmation.leaveInfo;
    console.log(`Deleting leave with ID: ${id}`);
    
    axiosInstance
      .delete(`http://localhost:5000/api/delete_leave/${id}`)
      .then((response) => {
        console.log('Response from backend:', response.data);
        console.log('Leave deleted successfully');
  
        // Update state to remove the deleted leave
        setLeaveData((prevLeaveData) =>
          prevLeaveData.filter((leave) => leave._id !== id)
        );
  
        setDeleteConfirmation({ open: false, leaveInfo: {} });
      })
      .catch((error) => {
        console.error('Error deleting leave:', error);
        setDeleteConfirmation({ open: false, leaveInfo: {} });
      });
  };
  
  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({ open: false, leaveInfo: {} });
  };
  

  const handleSearch = async () => {
    try {
      if (!searchQuery) {
        // If searchQuery is empty, fetch the initial leave data
        fetchLeaveData();
      } else {
        // Use the searchQuery to filter leaveData
        const filteredLeaveData = leaveData.filter((leave) => {
          const leaveName = leave.name.toLowerCase();
          const leaveType = leave.type.toLowerCase();
          const leaveUnit = leave.unit.toLowerCase();
          const query = searchQuery.toLowerCase();
  
          // Check if any of the leave properties contains the searchQuery
          return leaveName.includes(query) || leaveType.includes(query) || leaveUnit.includes(query);
        });
  
        // Update leaveData with the filtered results
        setLeaveData(filteredLeaveData);
      }
    } catch (error) {
      console.error('Error searching for leave:', error);
    }
  };
  

  useEffect(() => {
    // Fetch leave data initially
    fetchLeaveData();
  }, []);

  return (
    <div>
      <Box m="40px 0 0 0">
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={colors.blueAccent[700]}
          borderRadius="5px"
          p={1}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{ width: "400px", ml: 2 }}
            backgroundColor={colors.blueAccent[900]}
            borderRadius="5px"
          >
            <InputBase
              placeholder="Search"
              sx={{ flex: 1, ml: 2 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box ml="auto">
            <IconButton onClick={handleAddLeave}>
              <AddCircleOutlineOutlinedIcon
                style={{ color: '#fff', fontSize: 40 }}
              />
            </IconButton>
          </Box>
        </Box>

        {/* Display leave data in a DataGrid */}
        <DataGrid
          columns={columns}
          rows={leaveData}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
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
                Leave Name: {deleteConfirmation.leaveInfo.name}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Leave Type: {deleteConfirmation.leaveInfo.type}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Leave Unit: {deleteConfirmation.leaveInfo.unit}
              </Typography>
              <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
                Status: {deleteConfirmation.leaveInfo.status}
              </Typography>
            </div>
          </div>
        }
      />


        {/* Leave Dialog */}
        <Dialog open={editDialogOpen} onClose={handleDialogClose}>

        <DialogTitle>{editedLeave._id ? 'Edit Leave Type' : 'Add Leave Type'}</DialogTitle>
        <DialogContent sx={{ padding: '20px' }}>
          <TextField
            fullWidth
            variant="filled"
            label="Leave Name"
            value={editedLeave.name}
            onChange={(e) => setEditedLeave({ ...editedLeave, name: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Leave Type"
            value={editedLeave.type}
            onChange={(e) => setEditedLeave({ ...editedLeave, type: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          <TextField
            fullWidth
            variant="filled"
            label="Leave Unit"
            value={editedLeave.unit}
            onChange={(e) => setEditedLeave({ ...editedLeave, unit: e.target.value })}
            sx={{ marginBottom: '16px' }}
          />
          {/* Display status as a button */}
          <Button
            fullWidth
            variant="contained"
            onClick={() => setEditedLeave({ ...editedLeave, status: editedLeave.status === 'active' ? 'inactive' : 'active' })}
            sx={{ marginBottom: '16px', backgroundColor: editedLeave.status === 'active' ? '#4CAF50' : '#D21F3C', color: '#fff' }}
          >
            {editedLeave.status === 'active' ? 'Active' : 'Inactive'}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Box>
    </div>
  );
};

export default LeaveTypes;
