import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { getInterviewsByCompany } from "../api/interview_api";
import { useNavigate } from "react-router-dom";

export default function CompaniesCard({ data }) {
  const navigate = useNavigate();
  const dataToSend = {
    company_name: data?.name,
  };
  const handleInterviews = async () => {
    navigate("/interviews", { state: dataToSend });
  };

  return (
    <Card
      sx={{
        maxWidth: 270,
        minHeight: 300,
        borderRadius: 3,
        boxShadow: 1,
        overflow: "hidden",
        transition: "transform 0.6s ease",
        ":hover": {
          transform: "translateY(-1px)",
          boxShadow: 3,
        },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: 2,
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={data?.image || "/default-company.jpg"} // Replace with actual default
        alt={data?.name || "Company Logo"}
        sx={{
          objectFit: "cover",
          backgroundColor: "#f5f5f5",
          // padding: 2,
          overflow: "hidden",
        }}
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{ fontWeight: 600 }}
        >
          {data?.name || "Company Name"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", height: 60, overflow: "auto" }}
        >
          {data?.description || "No description available."}
        </Typography>
      </CardContent>
      <CardActions sx={{ px: 2, pb: 2 }}>
        <Button
          variant="outlined"
          size="small"
          fullWidth
          color="primary"
          sx={{
            textTransform: "none",
            borderRadius: 25,
            fontWeight: 500,
            // backgroundColor: "whitesmoke",
            // color: "black",
          }}
          onClick={handleInterviews}
        >
          Interviews
        </Button>
      </CardActions>
    </Card>
  );
}
