import { Box } from "@mui/material";
import { Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState } from "react";
import LeaveTypes from "../leaveManagement/leaveTypes";
import PendingLeaves from "../leaveManagement/pendingLeaves";
import LeaveHistoryAdmin from "../leaveManagement/leaveHistoryAdmin";


const Leaves = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };


  return (
    <Box m="20px">
      <Header
        title="LEAVE MANAGEMENT"
        subtitle="List of Leaves"
      />
       <Tabs value={tabValue} onChange={handleTabChange} aria-label="Nested Tabs">
        <Tab label="Leave Types" />
        <Tab label="Pending Leaves"/>
        <Tab label="Leaves History" />
      </Tabs>
      {tabValue === 0 && (
        <div>
          <LeaveTypes/>
          
        </div>
      )}

      {tabValue === 1 && (
        <div>
          
          <PendingLeaves/>
        </div>
      )}

      {tabValue === 2 && (
        <div>
          <p></p>
        <LeaveHistoryAdmin/>
        </div>
      )}

    </Box>
  );
};

export default Leaves;