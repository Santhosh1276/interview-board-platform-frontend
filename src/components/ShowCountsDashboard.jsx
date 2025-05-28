import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";

const ShowCountsDashboard = () => {
  const [users, setUsers] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true);
      try {
        // Replace these with your actual API calls
        const usersResponse = await fetch("/api/users");
        const usersData = await usersResponse.json();

        const interviewsResponse = await fetch("/api/interviews");
        const interviewsData = await interviewsResponse.json();

        const companiesResponse = await fetch("/api/companies");
        const companiesData = await companiesResponse.json();

        setUsers(usersData);
        setInterviews(interviewsData);
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllData();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {/* Users Dashboard */}
      <Grid size={{ xs: 14, sm: 6, md: 4 }}>
        <Card
          style={{ backgroundColor: "orange", flex: 4 }}
          elevation={3}
          sx={{ borderRadius: "20px" }}
        >
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Users
            </Typography>
            <Typography variant="h3">{users.length}</Typography>
            <Typography color="textSecondary">
              Total registered users
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Interviews Dashboard */}
      <Grid size={{ xs: 14, sm: 6, md: 4 }}>
        <Card elevation={3} sx={{ borderRadius: "20px",backgroundColor:"lightgreen" }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Interviews Uploaded
            </Typography>
            <Typography variant="h3">{interviews.length}</Typography>
            <Typography color="textSecondary">
              Total interviews uploaded
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Companies Dashboard */}
      <Grid size={{ xs: 14, sm: 6, md: 4 }}>
        <Card elevation={3} sx={{ borderRadius: "20px" ,backgroundColor:"violet"}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Companies
            </Typography>
            <Typography variant="h3">{companies.length}</Typography>
            <Typography color="textSecondary">
              Total companies listed
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShowCountsDashboard;
