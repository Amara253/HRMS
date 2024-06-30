import * as React from 'react';
import { DataGrid, GridActionsCell } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText,Button } from '@mui/material';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { tokens } from "../../theme"; // Assuming theme integration
import { useTheme } from "@mui/material";
import axiosInstance from '../../utilis/ApiRequest';

const PendingLeaves = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [leaveRequests, setLeaveRequests] = React.useState([]);
  const [openApproveDialog, setOpenApproveDialog] = React.useState(false); // Renamed for clarity
  const [openRejectDialog, setOpenRejectDialog] = React.useState(false); // Added for rejection
  const [selectedRequestId, setSelectedRequestId] = React.useState(null);

  React.useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/requests');
        setLeaveRequests(response.data.filter(request => request.status === 'pending')); // Filter pending requests
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        // Handle errors appropriately, e.g., show error messages to the user
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApproveRequest = async () => {
    try {
      const response = await axiosInstance.patch(`http://localhost:5000/api/approve_requests/${selectedRequestId}`);
      if (response.status === 200) {
        setLeaveRequests(
          leaveRequests.map((request) => (request._id === selectedRequestId ? { ...request, status: 'approved' } : request))
        );
        setOpenApproveDialog(false);
      } else {
        console.error('Error approving leave request:', response.data);
        // Handle errors appropriately, e.g., show error messages to the user
      }
    } catch (error) {
      console.error('Error approving leave request:', error);
      // Handle errors appropriately, e.g., show error messages to the user
    }
  };

  const handleRejectRequest = async () => {
    try {
      const response = await axiosInstance.patch(`http://localhost:5000/api/reject_requests/${selectedRequestId}`);
      if (response.status === 200) {
        setLeaveRequests(
          leaveRequests.map((request) => (request._id === selectedRequestId ? { ...request, status: 'rejected' } : request))
        );
        setOpenRejectDialog(false);
      } else {
        console.error('Error rejecting leave request:', response.data);
        // Handle errors appropriately, e.g., show error messages to the user
      }
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      // Handle errors appropriately, e.g., show error messages to the user
    }
  };

  const handleCloseDialogs = () => {
    setOpenApproveDialog(false);
    setOpenRejectDialog(false);
    setSelectedRequestId(null);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'name', width: 100 },
    { field: 'leaveType', headerName: 'Leave Type', width: 100 },
    {
      field: 'startDate',
      headerName: 'Requested Start Date',
      width: 150,
      type: 'date',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(), // Format for display
    },
    {
      field: 'endDate',
      headerName: 'Requested End Date',
      width: 150,
      type: 'date',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(), // Format for display
    },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        params.row.status === 'pending' ? (
          <>
            <Button  style={{ marginRight: '10px' }}variant="contained" color="success" size="small" onClick={() => {
              // Handle approve request logic
              setSelectedRequestId(params.row._id);
              setOpenApproveDialog(true);
            }}>
              Approve
            </Button>
            <Button variant="contained" color="error" size="small" onClick={() => {
              // Handle reject request logic
              setSelectedRequestId(params.row._id);
              setOpenRejectDialog(true);
            }}>
              Reject
            </Button>
          </>
        ) : null // Don't render any actions for non-pending requests
      ),
    },
  ];
  
return (
    <div>
      <DataGrid
        sx={{ "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] } }}
        rows={leaveRequests}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row._id}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Actions: GridActionsCell,
        }}
      />
      <Dialog
        open={openApproveDialog}
        onClose={handleCloseDialogs}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Approval</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to approve this leave request? The action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>No</Button>
          <Button onClick={handleApproveRequest} autoFocus color="success">
            Yes, Approve
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openRejectDialog}
        onClose={handleCloseDialogs}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Rejection</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to reject this leave request? The action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialogs}>No</Button>
          <Button onClick={handleRejectRequest} autoFocus color="error">
            Yes, Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PendingLeaves;