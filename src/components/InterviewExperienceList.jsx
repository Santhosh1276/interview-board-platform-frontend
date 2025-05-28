import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Divider,
  Stack,
  Chip,
  Button,
  useTheme,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const InterviewExperienceList = ({ experiences = [] }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box p={{ xs: 2, md: 1 }}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {experiences.map((exp) => (
          <Grid item xs={12} md={6} key={exp._id}>
            <Card
              elevation={6}
              sx={{
                borderRadius: 3,
                borderLeft: `6px solid ${theme.palette.primary.main}`,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                backgroundColor:  "#fff",
                transition: "transform 1s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  justifyContent="space-between"
                  alignItems={{ xs: "flex-start", sm: "center" }}
                  spacing={1}
                  mb={1}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{ textTransform: "capitalize" }}
                    flex={1}
                    noWrap
                    title={`${exp.company} - ${exp.role}`}
                  >
                    {exp.company} — {exp.role}
                  </Typography>

                  <Chip
                    label={`${exp.experience} yr${
                      exp.experience > 1 ? "s" : ""
                    } exp`}
                    color="primary"
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600 }}
                  />
                </Stack>

                <Divider sx={{ mb: 2 }} />

                <Box
                  sx={{
                    whiteSpace: "pre-line",
                    maxHeight: 320,
                    overflowY: "auto",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                    px: 0.5,
                    mb: 1,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "sticky",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      height: 32,
                      background: isDark
                        ? "linear-gradient(180deg, rgba(18,18,18,0) 0%, rgba(18,18,18,1) 100%)"
                        : "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                      pointerEvents: "none",
                    },
                  }}
                >
                  {exp.process}
                </Box>

                {/* Posted by info */}
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", mb: 2 }}
                >
                  Posted by: {exp.postedBy || "Unknown"}
                </Typography>

                <Divider />

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon
                      fontSize="small"
                      color="action"
                      sx={{ mr: 0.5 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontStyle: "italic" }}
                    >
                      Updated on: {new Date(exp.updatedAt).toLocaleDateString()}
                    </Typography>
                  </Stack>
{/* 
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    sx={{ fontWeight: 600 }}
                    onClick={() => alert("View Details clicked")}
                  >
                    View Details
                  </Button> */}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InterviewExperienceList;
