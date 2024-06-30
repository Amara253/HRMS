import * as React from 'react';
import { DataGrid, GridActionsCell } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText ,Button} from '@mui/material';
import axios from 'axios'; // Assuming you're using Axios for API calls
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import axiosInstance from '../../utilis/ApiRequest';
import { useAuth } from '../../utilis/AuthContext';

const LeaveHistory = () => {
  const {currentUser} = useAuth()
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  const [leaveRequests, setLeaveRequests] = React.useState([]);
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [selectedRequestId, setSelectedRequestId] = React.useState(null);

  React.useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axiosInstance.get(`http://localhost:5000/api/requestsbyid/${currentUser._id}`);
        setLeaveRequests(response.data);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleCancelRequest = async () => {
    try {
      const response = await axiosInstance.patch(`http://localhost:5000/api/requests/${selectedRequestId}`, { status: 'cancelled' });
      if (response.status === 200) {
        setLeaveRequests(leaveRequests.map(request => (request._id === selectedRequestId ? { ...request, status: 'cancelled' } : request)));
        setOpenCancelDialog(false);
      }
    } catch (error) {
      console.error('Error cancelling leave request:', error);
      // Handle error appropriately, e.g., show an error message to the user
    }
  };

  const handleCancelDialogClose = () => {
    setOpenCancelDialog(false);
    setSelectedRequestId(null);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'leaveType', headerName: 'Leave Type', width: 150 },
    {
        field: 'startDate',
        headerName: 'Requested Start Date',
        width: 150,
        type: 'date',
        valueFormatter: (params) => new Date(params.value).toLocaleDateString(),  // Format for display
      },
      {
        field: 'endDate',
        headerName: 'Requested End Date',
        width: 150,
        type: 'date',
        valueFormatter: (params) => new Date(params.value).toLocaleDateString(),  // Format for display
      },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => (
        params.row.status === 'pending' ? (
          <Button variant="contained" color="error" size="small" onClick={() => {
            setSelectedRequestId(params.row._id);
            setOpenCancelDialog(true);
          }}>
            Cancel
          </Button>
        ) : (
          <Button variant="contained" disabled size="small">
            {params.row.status === 'cancelled' ? 'Cancelled' : params.row.status}
          </Button>
        )
      ),
    },
  ];

  return (
    <div>
      <DataGrid
       sx={{ "& .MuiDataGrid-columnHeaders": {
        backgroundColor: colors.blueAccent[700],
       
      }}}
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
        open={openCancelDialog}
        onClose={handleCancelDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Cancellation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to cancel this leave request? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDialogClose}>No</Button>
          <Button onClick={handleCancelRequest} autoFocus color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
        </Dialog>
        </div>
   );
};


export default LeaveHistory;
