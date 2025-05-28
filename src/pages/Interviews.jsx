import React, { useEffect, useState } from 'react'
import InterviewExperienceList from '../components/InterviewExperienceList'
import { get_allInterviews, getInterviewsByCompany } from '../api/interview_api'
import { Box } from '@mui/material'
import { useLocation } from "react-router-dom";

const Interviews = () => {
  const location = useLocation();
  const receivedData = location.state;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); // optional loading state
  const [error, setError] = useState(null); // optional error handling
  useEffect(() => {
    async function getAllInterviews() {
      setLoading(true);
      setError(null);

      try {
        if (receivedData?.company_name) {
          const fetchInterviews = await getInterviewsByCompany(
            receivedData.company_name
          );
          if (fetchInterviews?.status === "Success") {
            setData(fetchInterviews.interviews);
          } else {
            setError("Failed to fetch interviews for company");
          }
        } else {
          const fetchAllInterviews = await get_allInterviews();
          if (fetchAllInterviews?.status === "Success") {
            setData(fetchAllInterviews.interviews);
          } else {
            setError("Failed to fetch all interviews");
          }
        }
      } catch (err) {
        setError("Something went wrong");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getAllInterviews();
  }, [receivedData]);
  return (
    <Box
      sx={{
        overflow: "scroll",
        scrollbarWidth: "none", // Firefox
        "&::-webkit-scrollbar": {
          display: "none", // Chrome, Safari
        },
        height: "100dvh",
        overflowY: "auto",
        scrollBehavior: "smooth",
      }}
    >
      <InterviewExperienceList experiences={data} />
    </Box>
  );
}

export default Interviews