import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField ,InputAdornment, IconButton} from '@mui/material'; // Correct import for TextField
import axios from 'axios';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axiosInstance from '../../utilis/ApiRequest';

const LeaveHistoryAdmin = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [leaveRequests, setLeaveRequests] = React.useState([]);
  const [searchText, setSearchText] = React.useState(''); // Initialize searchText with an empty string

  React.useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axiosInstance.get('http://localhost:5000/api/requests');
        setLeaveRequests(response.data.filter((request) => request.status === 'approved' || request.status === 'rejected'));
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        // Add error handling for the user
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    if (value) {
      setSearchText(value.toLowerCase()); // Search case-insensitively
    } else {
      setSearchText(''); // Reset searchText if value is undefined or empty
    }
  };
  
  const filteredLeaveRequests = React.useMemo(() => {
    if (!searchText) return leaveRequests;

    return leaveRequests.filter((request) => {
      const employeeName = request.employeeName ? request.employeeName.toLowerCase() : '';
      const leaveType = request.leaveType ? request.leaveType.toLowerCase() : '';
      const description = request.description ? request.description.toLowerCase() : '';

      return (
        employeeName.includes(searchText) ||
        leaveType.includes(searchText) ||
        description.includes(searchText)
      );
    });
  }, [leaveRequests, searchText]);

  const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'username', headerName: 'name', width: 100 },
    { field: 'leaveType', headerName: 'Leave Type', width: 100 },
    {
      field: 'startDate',
      headerName: 'Requested Start Date',
      width: 150,
      type: 'date',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'endDate',
      headerName: 'Requested End Date',
      width: 150,
      type: 'date',
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'status', headerName: 'Status', width: 100, 
    renderCell: (params) => {
      const status = params.row.status;
      let color;
      if (status === 'approved') {
        color = 'green'; // Green color for approved status
      } else if (status === 'rejected') {
        color = 'red'; // Red color for rejected status
      } else {
        color = 'inherit';
      }
      return <div style={{ color }}>{status}</div>;
    }
}
  ];

  return (
    <div>
     <TextField
  label="Search Leave History (Employee Name, Leave Type, Description)" // Clarify search criteria
  value={searchText}
  onChange={handleSearchChange}
  // Consider adjusting width based on layout
  sx={{ 
    width: '50%', 
    marginBottom: '10px',
    backgroundColor: '#f5f5f5', // Off-white background color
  }}
  InputProps={{
    endAdornment: (
      <InputAdornment position="end">
        <IconButton>
          <SearchIcon sx={{ color: colors.blueAccent[700] }} />
        </IconButton>
      </InputAdornment>
    ),
  }}
/>
      <DataGrid
        sx={{ "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.blueAccent[700] } }}
        rows={filteredLeaveRequests}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5, 10, 20]}
        getRowId={(row) => row._id}
        // No checkboxSelection or disableSelectionOnClick needed
      />
    </div>
  );
};

export default LeaveHistoryAdmin;
