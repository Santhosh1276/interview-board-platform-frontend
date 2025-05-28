import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  CardHeader,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { get_allInterviews } from "../api/interview_api";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[4],
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.01)",
  },
}));

const InterviewStatsDashboard = () => {
  const theme = useTheme();
  const [interviewData, setInterviewData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [interviewRoleData, setInterviewRoleData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await get_allInterviews();
      if (res.status === "Success") {
        const interviews = res.interviews;
        setInterviewData(interviews);

        const roleCounts = {};
        const companyCounts = {};
        const interviewRoleCounts = {};

        interviews.forEach((item) => {
          roleCounts[item.role] = (roleCounts[item.role] || 0) + 1;
          companyCounts[item.company] = (companyCounts[item.company] || 0) + 1;
          interviewRoleCounts[item.role] =
            (interviewRoleCounts[item.role] || 0) + 1;
        });

        const formattedRoleData = Object.entries(roleCounts).map(
          ([role, count]) => ({
            name: role,
            value: count,
          })
        );

        const formattedCompanyData = Object.entries(companyCounts).map(
          ([company, count]) => ({
            name: company,
            value: count,
          })
        );

        const formattedInterviewRoleData = Object.entries(
          interviewRoleCounts
        ).map(([role, count]) => ({
          name: role,
          value: count,
        }));

        setRoleData(formattedRoleData);
        setCompanyData(formattedCompanyData);
        setInterviewRoleData(formattedInterviewRoleData);
      }
    }

    fetchData();
  }, []);

  const renderPieChart = (data, title, fillColor) => (
    <StyledCard>
      <CardHeader title={title} sx={{ textAlign: "center" }} />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={fillColor}
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </StyledCard>
  );

  return (
    <Box p={1} bgcolor={theme.palette.background.default}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          {renderPieChart(roleData, "Different Roles in Companies", "#8884d8")}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderPieChart(
            companyData,
            "Different Companies in Interviews",
            "#82ca9d"
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {renderPieChart(
            interviewRoleData,
            "Different Roles in Interviews",
            "#FF8042"
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default InterviewStatsDashboard;
