import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import StarIcon from "@mui/icons-material/Star";
import Header from "../../components/Header";
import { marchData } from "../../data/Attendance";

const Attendence2 = () => {
  const johnDoeData = marchData.find((employee) => employee.employee_name === "John Doe");

  const columns = [
    {
      field: "day",
      headerName: "Date",
      width: 250,
      valueFormatter: (params) =>
        new Date(2024, 2, params.value).toLocaleDateString("en-GB"), // Assuming 2024, 2 corresponds to March 2024
    },
    { field: "checkIn", headerName: "Check-In", width: 250 },
    { field: "checkOut", headerName: "Check-Out", width: 250 },
    {
      field: "status",
      headerName: "Status",
      width: 220,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {params.value === "Present" && (
            <CheckCircleIcon style={{ color: "green" }} />
          )}
          {params.value === "Absent" && (
            <CancelIcon style={{ color: "red" }} />
          )}
          {params.value === "Leave" && (
            <StarIcon style={{ color: "yellow" }} />
          )}
        </div>
      ),
    },
  ];

  const rows = johnDoeData.days.map((day) => ({
    id: day.day,
    day: day.day,
    checkIn: day.checkIn || "-",
    checkOut: day.checkOut || "-",
    status: day.status,
  }));

  return (
    <Box m="20px">
      <Header title="ATTENDANCE" subtitle="Attendance Sheet" />
      <div style={{ height: "800px", width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </Box>
  );
};

export default Attendence2;
