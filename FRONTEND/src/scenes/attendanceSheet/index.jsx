import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";
import Header from "../../components/Header";
import { januaryData, februaryData, marchData } from "../../data/Attendance";

const AttendenceSheet = () => {
  const theme = useTheme();

  const [selectedMonth, setSelectedMonth] = useState("March");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Call handleSearch when the component mounts to display March data by default
    handleSearch();
  }, []); // Empty dependency array ensures it only runs on mount

  const columns = [
    { field: "employee_name", headerName: "Employee Name", width: 120 },
    ...Array.from({ length: 30 }).map((_, index) => ({
      field: `day_${index + 1}`,
      headerName: `${index + 1}`,
      width: 30,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value === "Present" && <CheckCircleIcon style={{ color: theme.palette.success.main }} />}
          {params.value === "Absent" && <CancelIcon style={{ color: theme.palette.error.main }} />}
          {params.value === "Leave" && <StarIcon style={{ color: theme.palette.warning.main }} />}
        </div>
      ),
    })),
  ];

  const rows = filteredData.map((employee) => {
    const row = { id: employee.id, employee_id: employee.employee_id, employee_name: employee.employee_name };
    employee.days.forEach((day, index) => {
      row[`day_${index + 1}`] = day.status;
    });
    return row;
  });

  const handleSearch = () => {
    let selectedData;
    switch (selectedMonth) {
      case "January":
        selectedData = januaryData;
        break;
      case "February":
        selectedData = februaryData;
        break;
      case "March":
        selectedData = marchData;
        break;
      default:
        break;
    }

    setFilteredData(selectedData);
  };

  return (
    <Box m="20px">
    
      <Box display="flex" alignItems="center" mb={3} mt={4}>
        <FormControl variant="outlined" sx={{ marginRight: 2 }}>
          <InputLabel id="month-select-label">Select Month</InputLabel>
          <Select
            labelId="month-select-label"
            id="month-select"
            value={selectedMonth}
            label="Select Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <MenuItem value="January">January</MenuItem>
            <MenuItem value="February">February</MenuItem>
            <MenuItem value="March">March</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>
      <div style={{ height: "100%", width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          autoHeight
          disableColumnResize
          disableColumnMenu
        />
      </div>
    </Box>
  );
};

export default AttendenceSheet;
