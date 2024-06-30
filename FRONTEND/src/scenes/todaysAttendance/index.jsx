import React, { useState, useEffect } from "react";
import { Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, useTheme } from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";

// Replace with the actual data import
import { marchData } from "../../data/Attendance";

const TodaysAttendance = () => {
    const [todaysData, setTodaysData] = useState([]);
    const theme = useTheme();

  useEffect(() => {
    // Assuming "today" is a random day between 1 and 31
    const today = Math.floor(Math.random() * 31) + 1;

    // Filter data for today
    const filteredData = marchData.map((employee) => {
      const todayStatus = employee.days[today - 1].status;
      const checkIn = todayStatus === "Present" ? employee.days[today - 1].checkIn : "-";
      const checkOut = todayStatus === "Present" ? employee.days[today - 1].checkOut : "-";
      return {
        id: employee.id,
        employee_name: employee.employee_name,
        checkIn,
        checkOut,
        status: todayStatus,
      };
    });

    setTodaysData(filteredData);
  }, []);

  const columns = [
    { field: "employee_name", headerName: "Employee Name", width: 250 },
    { field: "checkIn", headerName: "Check-In", width: 250 },
    { field: "checkOut", headerName: "Check-Out", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value === "Present" && <CheckCircleIcon style={{ color: theme.palette.success.main }} />}
          {params.value === "Absent" && <CancelIcon style={{ color: theme.palette.error.main }} />}
          {params.value === "Leave" && <StarIcon style={{ color: theme.palette.warning.main }} />}
        </div>
      ),
    },
  ];

  return (
    <Box m="20px">
      <div style={{ height: "600px", width: "100%" }}>
        <DataGrid rows={todaysData} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};

export default TodaysAttendance;
