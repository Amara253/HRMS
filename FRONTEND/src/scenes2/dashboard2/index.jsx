import React from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useAuth } from '../../utilis/AuthContext';
import axiosInstance from '../../utilis/ApiRequest';

const Dashboard2 = () => {
  const { currentUser } = useAuth();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [leaveStats, setLeaveStats] = React.useState({
    totalRequested: 0,
    totalAccepted: 0,
    totalRejected: 0,
    totalPending: 0,
    progress: 0, // Add default progress value
  });

  React.useEffect(() => {
    fetchLeaveStats();
  }, []);

  const fetchLeaveStats = async () => {
    try {
      const response = await axiosInstance.get(`/requestsbyid/${currentUser._id}`);
      const leaveRequests = response.data;
  
      // Filter out canceled status leaves
      const nonCanceledLeaves = leaveRequests.filter(req => req.status !== 'cancelled');
  
      const totalRequested = nonCanceledLeaves.length;
      const totalAccepted = nonCanceledLeaves.filter(req => req.status === 'approved').length;
      const totalRejected = nonCanceledLeaves.filter(req => req.status === 'rejected').length;
      const totalPending = nonCanceledLeaves.filter(req => req.status === 'pending').length;
  
      // Calculate the progress based on the monthly limit (5 leaves)
      const monthlyLimit = 5;
      const progress = totalRequested <= monthlyLimit ? totalRequested / monthlyLimit : 1;
  
      setLeaveStats({
        totalRequested,
        totalAccepted,
        totalRejected,
        totalPending,
        progress,
      });
    } catch (error) {
      console.error('Error fetching leave statistics:', error);
    }
  };
  

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
            title={leaveStats.totalRequested.toString()}
            subtitle="Total Leaves Requested"
            progress={leaveStats.progress.toFixed(2)} // Use progress from state
            increase={`+${((leaveStats.totalRequested ) /5 * 100).toFixed(0)}%`}
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
            title={leaveStats.totalAccepted.toString()}
            subtitle="Leaves Accepted"
            progress="0.50"
            increase={`+${((leaveStats.totalAccepted ) / leaveStats.totalRequested * 100).toFixed(0)}%`}
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
            title={leaveStats.totalRejected.toString()}
            subtitle="Leaves Rejected"
            progress="0.30"
            increase={`+${(leaveStats.totalRejected / leaveStats.totalRequested * 100).toFixed(0)}%`}
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
            title={leaveStats.totalPending.toString()}
            subtitle="Pending Leaves"
            progress="0.80"
            increase={`+${((leaveStats.totalPending ) / leaveStats.totalRequested * 100).toFixed(0)}%`}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
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
                {/* Revenue Generated */}
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {/* $59,342.32 */}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                {/* <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                /> */}
              </IconButton>
            </Box>
          </Box>
          
        </Box>
        
        

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            
          </Typography>
         
        </Box>
        {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        
      </Box>
    </Box>
  );
};

export default Dashboard2;
