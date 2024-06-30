
import { Box } from "@mui/material";
import { Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import React, { useState } from "react";
import LeaveRequest from "../requestLeave";
import LeaveHistory from "../leaveHistroy";

const LeaveForm = () => {
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
            subtitle="Send Leaves"
          />
           <Tabs value={tabValue} onChange={handleTabChange} aria-label="Nested Tabs">
            <Tab label="Request Leave" />
            <Tab label="Leaves History" />
          </Tabs>
          {tabValue === 0 && (
            <div>
              <LeaveRequest/>
              
            </div>
          )}
    
          {tabValue === 1 && (
            <div>
               <LeaveHistory/>
              
            </div>
          )}
    
          {tabValue === 2 && (
            <div>
            
            </div>
          )}
    
        </Box>
      );
}

export default LeaveForm;
