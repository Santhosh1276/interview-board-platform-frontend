import { Box } from "@mui/material";
import React from "react";
import ShowCountsDashboard from "../components/ShowCountsDashboard";
import InterviewStatsDashboard from "../components/InterviewStatsDashboard";

const Dashboard = () => {
  return (
    <Box>
      <ShowCountsDashboard />
      <InterviewStatsDashboard />
    </Box>
  );
};

export default Dashboard;
