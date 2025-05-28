import React, { useState } from "react";
import { Box, Paper, Typography, Tabs, Tab } from "@mui/material";
import AddCompany from "../components/AddCompany";
import AddInterviewExperience from "../components/AddInterviewExperience";

const AddPost = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 0,
        p: 1,
        backgroundColor: "background.paper",
        height: "80dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Typography variant="h4" sx={{color:"green",fontWeight:"bold"}}>
        Add New Post
      </Typography>

      {/* Tabs for Form Selection */}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        // sx={{ mb: 1 }}
      >
        <Tab label="Post Company" />
        <Tab label="Post Interview Experience" />
      </Tabs>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {activeTab === 0 && <AddCompany />}
        {activeTab === 1 && <AddInterviewExperience />}
      </Box>
    </Paper>
  );
};

export default AddPost;
