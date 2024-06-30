import React, { useState } from "react";
import { Box, Tab, Tabs, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import AttendenceSheet from "../attendanceSheet";
import TodaysAttendance from "../todaysAttendance";

const Attendence = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px">
      <Header title="ATTENDANCE" subtitle="Attendance Sheets" />
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Nested Tabs">
        <Tab label="Attendance Sheet" />
        <Tab label="Today's Attendance" />
      </Tabs>
      {tabValue === 0 && (
        <div>
          {/* Render the Attendance component for the "Attendance Sheet" tab */}
          <AttendenceSheet />
        </div>
      )}

      {tabValue === 1 && (
        <div>
          {/* Render Today's Attendance content here */}
          
          <TodaysAttendance/>
        </div>
      )}
    </Box>
  );
};

export default Attendence;
