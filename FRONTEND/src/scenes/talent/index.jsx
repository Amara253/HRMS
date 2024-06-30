import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CreateJob from "../postjob";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import JobsPosted from "../editjob";
import ResumeReceived from "../ResumeReceived/ResumeReceived";
import Shortlisted from "../Shortlisted/Shortlisted";
import Selected from "../Selected/Selected";

const Talent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px">
      <Header title="Employee Recruitment" subtitle="Talent Acquisition" />

      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Nested Tabs">
        <Tab label="Post a Job" />
        <Tab label="Job Posted"/>
        <Tab label="Resume Received" />
        <Tab label="Short Listed Candidates" />
        <Tab label="Selected Candidates" />
      </Tabs>

      {tabValue === 0 && (
        <div>
          <CreateJob/>
          
        </div>
      )}

      {tabValue === 1 && (
        <div>
          <JobsPosted/>
          
        </div>
      )}

      {tabValue === 2 && (
        <div>
         <ResumeReceived/>
        </div>
      )}

      {tabValue === 3 && (
        <div>
           <p>All Shortlisted Applicants.</p>
         <Shortlisted/>
        </div>


      )}
      {tabValue === 4 && (
        <div>
          
          
          <p>All Selected Applicants.</p>
        <Selected/>
        </div>


      )}
    </Box>
  );
};

export default Talent;
