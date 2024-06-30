import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import axiosInstance from '../../utilis/ApiRequest';
import LineChart from '../../components/LineChart';
import PieChart from '../../components/PieChart';

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [subscribers, setSubscribers] = useState(0);
  const [newSubscribers, setNewSubscribers] = useState(0);
  const [employees, setEmployees] = useState(0);
  const [newEmployees, setNewEmployees] = useState(0);
  const [applicants, setApplicants] = useState(0);
  const [newApplicants, setNewApplicants] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [newEmailCount, setNewEmailCount] = useState(0);
  const [subscribersIncrease, setSubscribersIncrease] = useState(0);
  const [employeesIncrease, setEmployeesIncrease] = useState(0);
  const [applicantsIncrease, setApplicantsIncrease] = useState(0);
  const [emailCountIncrease, setEmailCountIncrease] = useState(0);

  useEffect(() => {
    const calculateIncrease = (prevValue, newValue, key) => {
      const increaseKey = `${key}Increase`;
      if (prevValue === newValue) {
        return sessionStorage.getItem(increaseKey) || '-';
      }
      const increase = ((newValue - prevValue) / prevValue) * 100;
      const increaseString = increase.toFixed(2) + '%';
      sessionStorage.setItem(increaseKey, increaseString);
      return increaseString;
    };
  
    const prevEmails = parseInt(sessionStorage.getItem('prevEmails')) || 0;
    const prevSubscribers = parseInt(sessionStorage.getItem('prevSubscribers')) || 0;
    const prevEmployees = parseInt(sessionStorage.getItem('prevEmployees')) || 0;
    const prevApplicants = parseInt(sessionStorage.getItem('prevApplicants')) || 0;
  
    setEmailCount(prevEmails);
    setSubscribers(prevSubscribers);
    setEmployees(prevEmployees);
    setApplicants(prevApplicants);
    axiosInstance.get('/email-count')
    .then(response => {
      const count = response.data.count;
      sessionStorage.setItem('prevEmails', count);
      setNewEmailCount(count);
      setEmailCountIncrease(calculateIncrease(prevEmails, count, 'emailCount'));
    })
    .catch(error => {
      console.error('Error fetching email count:', error);
    });

  axiosInstance.get('/subscribers')
    .then(response => {
      const totalSubscribers = response.data.length;
      setNewSubscribers(totalSubscribers);
      setSubscribersIncrease(calculateIncrease(prevSubscribers, totalSubscribers, 'subscribers'));
      sessionStorage.setItem('prevSubscribers', totalSubscribers);
    })
    .catch(error => {
      console.error('Error fetching subscribers:', error);
    });

  axiosInstance.get('/get_employees')
    .then(response => {
      const totalEmployees = response.data.length;
      setNewEmployees(totalEmployees);
      setEmployeesIncrease(calculateIncrease(prevEmployees, totalEmployees, 'employees'));
      sessionStorage.setItem('prevEmployees', totalEmployees);
    })
    .catch(error => {
      console.error('Error fetching employees:', error);
    });

  axiosInstance.get('/applicants')
    .then(response => {
      const totalApplicants = response.data.length;
      setNewApplicants(totalApplicants);
      setApplicantsIncrease(calculateIncrease(prevApplicants, totalApplicants, 'applicants'));
      sessionStorage.setItem('prevApplicants', totalApplicants);
    })
    .catch(error => {
      console.error('Error fetching applicants:', error);
    });
}, []);
  
  return (
    <Box m="10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "10px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newEmailCount} 
            subtitle="Emails"
            progress={newEmailCount / 100}
            increase={emailCountIncrease}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newApplicants}
            subtitle="Applicants"
            progress={newApplicants / 10}
            increase={applicantsIncrease}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newEmployees}
            subtitle="Employees"
            progress={newEmployees / 50}
            increase={employeesIncrease}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newSubscribers}
            subtitle="Subscribers"
            progress={newSubscribers / 25}
            increase={subscribersIncrease}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
               Employee Counts  Across 
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Departments
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          {/* <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box> */}
          <Box height="350px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        
        
        <Box
          gridColumn="span 5"
          gridRow="span 3"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
               Applied Applicants Counts  Across 
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Job Posts
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="350px" m="-20px 0 0 0">
            <PieChart isDashboard={true} />
          </Box>
          {/* <Box height="300px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box> */}
        </Box>
       
       
      </Box>
    </Box>
  );
};

export default Dashboard;
