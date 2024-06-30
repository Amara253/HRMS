import React, { useState ,useEffect} from "react";
// import DatePicker from "@mui/lab/DatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmationModal from '../../components/ConfirmationModal';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from '@mui/icons-material/Cancel';
import InputBase from "@mui/material/InputBase";
import SendIcon from '@mui/icons-material/Send';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import axiosInstance from "../../utilis/ApiRequest.js";

import {
  Box,
  useTheme,
  Tab,
  TextField,
  Tabs,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { Formik,Field,ErrorMessage, useField } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

import upload from "../../utilis/upload.js";
 
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  gender: "", // New field
  password: "", // New field
  designation: "", // New field
  department: "",
  education: "",  
  address: "",   // New field
  date:"",
  uploadImage: "", // New field
  uploadCv: "", // New field
  joiningDate: "", // New field
  leaving: "", // New field (optional)
};
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
const emailRegExp=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
  gender: yup.string().required("required"), // New field
  password: yup.string().required("required"), // New field
  designation: yup.string().required("required"), // New field
  department: yup.string().required("required"), // New field
  date: yup.string().required("required"), // New field
  education: yup.string().required("required"), // New field
  uploadImage: yup.string().required("required"), // New field
  uploadCv: yup.string().required("required"), // New field
  address: yup.string().required("required"), // New field
  joiningDate: yup.string().required("required"), // New field
  leaving: yup.string(), // New field (optional)
});

const Payroll = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

const [allowances, setAllowances] = useState([]);
const [openDialog, setOpenDialog] = useState(false);
  const [newAllowanceData, setNewAllowanceData] = useState({ name: "", value: "" });
  const [editedAllowance, setEditedAllowance] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [isBasicSalaryDialogOpen, setIsBasicSalaryDialogOpen] = useState(false);
  const [newDesignationSalaryData, setNewDesignationSalaryData] = useState({
    designation: '',
    salary: '',
  });
  const [designationsSalaries, setDesignationsSalaries] = useState([]);
  const [editedDesignationSalary, setEditedDesignationSalary] = useState(null);
  const [isBasicSalaryEditDialogOpen, setIsBasicSalaryEditDialogOpen] = useState(false);


  const [deductions, setDeductions] = useState([]);
  const [isDeductionDialogOpen, setIsDeductionDialogOpen] = useState(false);
  const [newDeductionData, setNewDeductionData] = useState({
    designation: '',
    tax: 0,
  });
  const [editedDeduction, setEditedDeduction] = useState(null);
  const [isEditDeductionDialogOpen, setIsEditDeductionDialogOpen] = useState(false);
  
 
  const [showForm, setShowForm] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);
  const [payslipData, setPayslipData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    
      fetchPayslipData(employeeId);
    
  }, []);


  useEffect(() => {
    fetchAllowances();
  }, []);

  useEffect(() => {
    // Fetch basic salaries when the component mounts
    fetchBasicSalaries();
  }, []);

  useEffect(() => {
    fetchDeductions();
  }, []);
  
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    employeeInfo: {},
  });
  
   
    
   
    

  

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 }, // Assuming MongoDB uses _id as the identifier
    {
      field: "profilepic",
      headerName: "Profile",
      flex: 1,
      renderCell: ({ row }) => (
        <img
          src={row.profilepic} // Use the profilepic field from the row object
          alt="Profile Pic"
          style={{ width: 50, height: 50, borderRadius: '50%' }} // Adjust the size as needed
        />
      ),
    },
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "contact", headerName: "Contact", flex: 1 },
  { field: "designation", headerName: "Designation", flex: 1 },
  { field: "department", headerName: "Department", flex: 1 },
  { field: "salary", headerName: "Salary", flex: 1 },
  {
    field: "payslip",
    headerName: "Generate Payslip",
    flex: 2,
    renderCell: ({ row }) => (
      <Box display="flex" alignItems="center">
      
        <IconButton onClick={() => handleGenerateSlip(row._id)}>
          <DownloadOutlinedIcon style={{ color: '#008000', fontSize: 26 }} />
        </IconButton>
      </Box>
    ),
  },

 
 
 
  ];
  const [activeTab, setActiveTab] = useState("Generating_Payslips");
 
 
  const [employeeData, setEmployeeData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("http://localhost:5000/api/get_employees");
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
 
    fetchData(); // Call the function when the component mounts
  }, []);
 
  const handleTabChange = async (event, newValue) => {
    setActiveTab(newValue);
 
    if (newValue === "viewAllEmployees") {
      try {
        const response = await axiosInstance.get("http://localhost:5000/api/get_employees");
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
 

 
//////////////////////////////////////////////////////
 
const [values, setValues] = useState({
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  gender: "", // New field
  password: "", // New field
  designation: "", // New field
  department: "", // New field
  education: "", // New field
  address: "", // New field
  // uploadImage: "", // New field
  // uploadCv: "",
  date: "",
  // profilepic: "",
  // profilecv: "",
  // joiningDate: "", // New field
  // leaving: "", // New field (optional)
});
 



 
 
  const fetchAllowances = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/get_allowances");
      setAllowances(response.data);
    } catch (error) {
      console.error("Error fetching allowances:", error);
    }
  };

  const handleAddAllowance = async () => {
    try {
      await axiosInstance.post("http://localhost:5000/api/add_allowance", newAllowanceData);
      fetchAllowances();
      setOpenDialog(false);
    } catch (error) {
      console.error("Error adding allowance:", error);
    }
  };

 const handleEditAllowance = (allowance) => {
  setEditedAllowance(allowance); // Set the edited allowance data
  setEditDialogOpen(true); // Open the dialog for editing
};

const handleEditedAllowanceChange = (e) => {
  const { name, value } = e.target;
  setEditedAllowance((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  const handleDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleDialogSave = async () => {
    try {
      await axiosInstance.put(`http://localhost:5000/api/edit_allowance/${editedAllowance._id}`, editedAllowance);
      fetchAllowances();
      // The dialog will close automatically, no need to call handleDialogClose()
    } catch (error) {
      console.error("Error editing allowance:", error);
    }
    setEditDialogOpen(false)
  };

  const handleDeleteAllowance = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/delete_allowance/${id}`);
      fetchAllowances();
    } catch (error) {
      console.error("Error deleting allowance:", error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAllowanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  
  const fetchBasicSalaries = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/get_basic_salaries");
      setDesignationsSalaries(response.data);
    } catch (error) {
      console.error("Error fetching designation salaries:", error);
    }
  };
  
  const handleAddBasicSalary = async () => {
    try {
      await axiosInstance.post("http://localhost:5000/api/add_basic_salary", newDesignationSalaryData);
      fetchBasicSalaries();
      setIsBasicSalaryDialogOpen(false);
    } catch (error) {
      console.error("Error adding designation salary:", error);
    }
  };
  
  const handleEditDesignationSalary = (designationSalary) => {
    setEditedDesignationSalary(designationSalary);
    setIsBasicSalaryEditDialogOpen(true);
  };
  
  const handleEditedDesignationSalaryChange = (e) => {
    const { name, value } = e.target;
    setEditedDesignationSalary((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleEditDialogClose = () => {
    setIsBasicSalaryEditDialogOpen(false);
  };
  
  const handleSaveEditedDesignationSalary = async () => {
    try {
      await axiosInstance.put(`http://localhost:5000/api/edit_basic_salary/${editedDesignationSalary._id}`, editedDesignationSalary);
      fetchBasicSalaries();
      setIsBasicSalaryEditDialogOpen(false);
    } catch (error) {
      console.error("Error editing designation salary:", error);
    }
  };
  
  const handleDeleteDesignationSalary = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/delete_basic_salary/${id}`);
      fetchBasicSalaries();
    } catch (error) {
      console.error("Error deleting designation salary:", error);
    }
  };
  
  const handleOpenBasicSalaryDialog = () => {
    setNewDesignationSalaryData({ designation: '', salary: '' });
    setIsBasicSalaryDialogOpen(true);
  };
  
  const handleCloseBasicSalaryDialog = () => {
    setIsBasicSalaryDialogOpen(false);
  };
  
  const handleBasicSalaryInputChange = (e) => {
    const { name, value } = e.target;
    setNewDesignationSalaryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const fetchDeductions = async () => {
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/get_deductions");
      setDeductions(response.data);
    } catch (error) {
      console.error("Error fetching deductions:", error);
    }
  };

  const handleOpenDeductionDialog = () => {
    setNewDeductionData({ designation: '', tax: '' })
    setIsDeductionDialogOpen(true);
  };

  const handleCloseDeductionDialog = () => {
    setIsDeductionDialogOpen(false);
  };

  const handleDeductionInputChange = (e) => {
    const { name, value } = e.target;
    setNewDeductionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddDeduction = async () => {
    try {
      await axiosInstance.post("http://localhost:5000/api/add_deduction", newDeductionData);
      fetchDeductions();
      setIsDeductionDialogOpen(false);
    } catch (error) {
      console.error("Error adding deduction:", error);
    }
  };

  const handleEditDeduction = (deduction) => {
    setEditedDeduction(deduction);
    setIsEditDeductionDialogOpen(true);
  };

  const handleEditedDeductionChange = (e) => {
    const { name, value } = e.target;
    setEditedDeduction((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditDeductionDialogClose = () => {
    setIsEditDeductionDialogOpen(false);
  };

  const handleSaveEditedDeduction = async () => {
    try {
      await axiosInstance.put(`http://localhost:5000/api/edit_deduction/${editedDeduction._id}`, editedDeduction);
      fetchDeductions();
      setIsEditDeductionDialogOpen(false);
    } catch (error) {
      console.error("Error editing deduction:", error);
    }
  };

  const handleDeleteDeduction = async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:5000/api/delete_deduction/${id}`);
      fetchDeductions();
    } catch (error) {
      console.error("Error deleting deduction:", error);
    }
  };


  const fetchPayslipData = async (id) => {
    try {
      const response = await axiosInstance.get(`http://localhost:5000/api/payslip/${id}`);
      if (response.status === 200) {
        
        setPayslipData(response.data);
        const employeeIndex = employeeData.findIndex((employee) => employee._id === id);
      if (employeeIndex !== -1) {
        // Update the salary of the employee in the employeeData array
        const updatedEmployeeData = [...employeeData];
        updatedEmployeeData[employeeIndex].salary = response.data.totalSalary;
        setEmployeeData(updatedEmployeeData);

      } else {
        console.error('Failed to fetch payslip data');
      }
      }
    } catch (error) {
      console.error('Error fetching payslip data:', error);
    }
  };

  const handleGenerateSlip = (id) => {
   
    fetchPayslipData(id); // Pass id directly instead of employeeId
    setShowForm(true); // Show the payslip form
  };


  
  
 /////////////////////////////////////////////////////////////////////////////////
 
  return (
    <Box m="20px">
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tab label="Generate Payslips" value="Generating_Payslips" />
      <Tab label="Basic Salary" value="DesignationSalary" />
      <Tab label="Allowances" value="Allowances" />
      <Tab label="Deductions" value="Deductions" />
      
    </Tabs>
 
    
    {activeTab === "DesignationSalary" && (
  <Box>
    <h1>Designation and Salaries</h1>
    <Button onClick={handleOpenBasicSalaryDialog} startIcon={<AddCircleOutlineOutlinedIcon style={{ color: '#008000', fontSize: 26 }} />}>
      Add Basic Salary
    </Button>
    <Dialog open={isBasicSalaryDialogOpen} onClose={handleCloseBasicSalaryDialog}>
      <DialogTitle>Add New Designation Salary</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Designation"
          name="designation"
          value={newDesignationSalaryData.designation}
          onChange={handleBasicSalaryInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Salary"
          name="salary"
          value={newDesignationSalaryData.salary}
          onChange={handleBasicSalaryInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseBasicSalaryDialog}>Cancel</Button>
        <Button onClick={handleAddBasicSalary}>Add</Button>
      </DialogActions>
    </Dialog>
    <TableContainer component={Paper}>
      <Table>
        <TableHead >
          <TableRow  sx={{ backgroundColor: colors.blueAccent[700] }}>
            <TableCell>Designation</TableCell>
            <TableCell>Salary (PKR)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {designationsSalaries.map((designationSalary) => (
            <TableRow key={designationSalary._id}>
              <TableCell>{designationSalary.designation}</TableCell>
              <TableCell>{designationSalary.salary}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditDesignationSalary(designationSalary)}>
                  <ModeEditOutlineOutlinedIcon style={{ color: '#784B84', fontSize: 23 }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteDesignationSalary(designationSalary._id)}>
                  <DeleteOutlinedIcon style={{ color: '#D21F3C', fontSize: 23 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={isBasicSalaryEditDialogOpen} onClose={handleEditDialogClose}>
      <DialogTitle>Edit Designation Salary</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Designation"
          name="designation"
          value={editedDesignationSalary ? editedDesignationSalary.designation : ""}
          onChange={handleEditedDesignationSalaryChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Salary"
          name="salary"
          value={editedDesignationSalary ? editedDesignationSalary.salary : ""}
          onChange={handleEditedDesignationSalaryChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditDialogClose}>Cancel</Button>
        <Button onClick={handleSaveEditedDesignationSalary}>Save</Button>
      </DialogActions>
    </Dialog>
  </Box>
)}


{activeTab === "Allowances" && (
  <Box> 

<div>
      <h1>Allowances</h1>
      <Button onClick={handleOpenDialog} startIcon={<AddCircleOutlineOutlinedIcon style={{ color: '#008000', fontSize: 26 }}/>}>
        Add Allowance
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Allowance</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            name="name"
            value={newAllowanceData.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Value"
            name="value"
            value={newAllowanceData.value}
            onChange={handleInputChange}
            fullWidth
          />
        </DialogContent>
        <Box sx={{ padding: "10px" }}>
          <Button onClick={handleAddAllowance}>Add</Button>
        </Box>
      </Dialog>
      <TableContainer component={Paper}  >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: colors.blueAccent[700] }}>
              <TableCell>Type</TableCell>
              <TableCell>Amount (PKR)</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allowances.map((allowance) => (
              <TableRow key={allowance._id}>
                <TableCell>{allowance.name}</TableCell>
                <TableCell>{allowance.value}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditAllowance(allowance)}>
                  <ModeEditOutlineOutlinedIcon style={{ color: '#784B84',fontSize: 23 }} />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAllowance(allowance._id)}>
                  <DeleteOutlinedIcon style={{ color: '#D21F3C', fontSize: 23 }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  </Box>

   )}
    <Dialog open={editDialogOpen} onClose={handleDialogClose} onExited={() => setEditedAllowance(null)}>
  <DialogTitle>Edit Allowance</DialogTitle>
  <DialogContent>
    <TextField
      fullWidth
      margin="normal"
      label="Name"
      name="name"
      value={editedAllowance ? editedAllowance.name : ""}
      onChange={handleEditedAllowanceChange} // Use the new function to handle changes
    />
    <TextField
      fullWidth
      margin="normal"
      label="Value"
      name="value"
      value={editedAllowance ? editedAllowance.value : ""}
      onChange={handleEditedAllowanceChange} // Use the new function to handle changes
    />
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
    <Button onClick={handleDialogSave}>Save</Button> {/* Ensure this function is implemented */}
  </DialogActions>
</Dialog>

     

{activeTab === "Deductions" && (
  <Box>
    <h1>Deductions</h1>
    <Button onClick={handleOpenDeductionDialog} startIcon={<AddCircleOutlineOutlinedIcon style={{ color: '#008000', fontSize: 26 }} />}>
      Add Deduction
    </Button>
    <Dialog open={isDeductionDialogOpen} onClose={handleCloseDeductionDialog}>
      <DialogTitle>Add New Deduction</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Designation"
          name="designation"
          value={newDeductionData.designation}
          onChange={handleDeductionInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Tax"
          name="tax"
          value={newDeductionData.tax}
          onChange={handleDeductionInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDeductionDialog}>Cancel</Button>
        <Button onClick={handleAddDeduction}>Add</Button>
      </DialogActions>
    </Dialog>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: colors.blueAccent[700] }}>
            <TableCell>Designation</TableCell>
            <TableCell>Tax (PKR)</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deductions.map((deduction) => (
            <TableRow key={deduction._id}>
              <TableCell>{deduction.designation}</TableCell>
              <TableCell>{deduction.tax}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleEditDeduction(deduction)}>
                  <ModeEditOutlineOutlinedIcon style={{ color: '#784B84', fontSize: 23 }} />
                </IconButton>
                <IconButton onClick={() => handleDeleteDeduction(deduction._id)}>
                  <DeleteOutlinedIcon style={{ color: '#D21F3C', fontSize: 23 }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={isEditDeductionDialogOpen} onClose={handleEditDeductionDialogClose}>
      <DialogTitle>Edit Deduction</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Designation"
          name="designation"
          value={editedDeduction ? editedDeduction.designation : ""}
          onChange={handleEditedDeductionChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Tax"
          name="tax"
          value={editedDeduction ? editedDeduction.tax : ""}
          onChange={handleEditedDeductionChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditDeductionDialogClose}>Cancel</Button>
        <Button onClick={handleSaveEditedDeduction}>Save</Button>
      </DialogActions>
    </Dialog>
  </Box>
)}
  
  {activeTab === "Generating_Payslips" && (
  <Box>
   
    <h3>Select Start Date and End Date for Generating Payslips: </h3>
    <TextField
      label="Start Date"
      type="date"
      defaultValue={startDate} // You need to have a state variable for startDate
      onChange={(e) => setStartDate(e.target.value)} // You need to have a setState function for startDate
      style={{ marginBottom: '10px' }}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
    <TextField
      label="End Date"
      type="date"
      defaultValue={endDate} // You need to have a state variable for endDate
      onChange={(e) => setEndDate(e.target.value)} // You need to have a setState function for endDate
      style={{ marginBottom: '20px' }}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
    />
    <Box
      m="0 0 0 0"
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
      }}
    >
      <DataGrid
        checkboxSelection
        rows={employeeData}
        columns={columns}
        getRowId={(row) => row._id} // Specify the field to be used as the row id
      />
    </Box>
    <Dialog open={showForm} onClose={() => setShowForm(false)}>
      <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold' }}>Payslip</DialogTitle>
      <DialogContent>
        <div>
          <p>Start Date: {startDate}</p>
          <p>End Date: {endDate}</p>
        </div>
        <table style={{ width: '100%' }}>
          <tbody>
            <tr>
              <td>Name:</td>
              <td>{payslipData && payslipData.name}</td>
            </tr>
            <tr>
              <td>Employee ID:</td>
              <td>{payslipData && payslipData.employeeId}</td>
            </tr>
            <tr>
              <td>Designation:</td>
              <td>{payslipData && payslipData.designation}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{payslipData && payslipData.email}</td>
            </tr>
            <tr>
              <td>Basic Salary:</td>
              <td>PKR {payslipData && payslipData.basicSalary.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Allowances added:</td>
              <td>
                <ul>
                  {payslipData &&
                    payslipData.allowances.map((allowance, index) => (
                      <li key={index}>{allowance.name}: PKR {allowance.value.toFixed(2)}</li>
                    ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Salary:</td>
              <td>PKR {payslipData && payslipData.sub_total.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="2"><hr style={{ width: '100%', marginBottom: '10px' }} /></td>
            </tr>
            <tr>
              <td>Tax Deducted:</td>
              <td>PKR {payslipData && payslipData.taxAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td colSpan="2"><hr style={{ width: '100%', marginBottom: '10px' }} /></td>
            </tr>
            <tr>
              <td>Total Salary:</td>
              <td>PKR {payslipData && (payslipData.totalSalary).toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </DialogContent>
      <DialogActions style={{ justifyContent: 'center' }}>
        <IconButton>
          <SendIcon />
        </IconButton>
        <IconButton>
          <SaveIcon />
        </IconButton>
        <IconButton>
          <DownloadIcon />
        </IconButton>
        <Button onClick={() => setShowForm(false)} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
)}

     
    </Box>
  );

  

};
 
export default Payroll;