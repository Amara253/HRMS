
import React, { useContext } from "react";
import {Typography, Box } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@mui/system";
import Navbar from "../navbar";
import Banner from "../banner";
import { useState } from "react";
import Card from "../../components/Card";
import { useEffect } from "react";
import Jobs from "../jobs";
import Sidebar from "../sidebar/Sidebar";
import Newsletter from "../newsletter/Newsletter";
import Setting from "../profile/settings";
import AllJobs from "./AllJobs";
const HomeJoblists = () => {
  return (
    <div>
          <Navbar />
          <AllJobs/>
    </div>
  )
}

export default HomeJoblists;
