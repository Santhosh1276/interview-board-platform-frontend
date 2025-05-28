import  { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  Autocomplete,
} from "@mui/material";
import { add_interview } from "../api/interview_api";
import { get_allCompanies } from "../api/company_api";



const AddInterviewExperience = () => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    experience: "",
    process: "",
  });

  const [errors, setErrors] = useState({});

   let [dataForFilter,SetDataFilter] = useState([])
    useEffect(() => {
      async function fetchCompanies() {
        let fetchAllCompanies = await get_allCompanies();
        if (fetchAllCompanies?.status == 'Success') {
          let company_filter = fetchAllCompanies?.data?.map((val) => {
            return val?.name
          })
          SetDataFilter(company_filter)
        }
      }
  
      fetchCompanies(); 
    }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.company) newErrors.company = "Company is required";
    if (!formData.role.trim()) newErrors.role = "Job role is required";
    if (!formData.experience.trim())
      newErrors.experience = "Experience is required";
    if (!formData.process.trim())
      newErrors.process = "Interview process is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submitted:", formData);
      let newInterview = await add_interview(formData)
      console.log(newInterview, newInterview)
      if (newInterview?.status == 'Success') {
        setFormData({
          company: "",
          role: "",
          experience: "",
          process: "",
        });
      }
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 1,
        maxWidth: 1200,
        mx: "auto",
        mt: 1,
        borderRadius: 3,
        height: "62dvh",
        border: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        {/* Company (Autocomplete) */}
        <Autocomplete
          options={dataForFilter}
          value={formData.company}
          onChange={(e, newValue) =>
            setFormData((prev) => ({ ...prev, company: newValue }))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Company Name"
              error={!!errors.company}
              helperText={errors.company}
              required
            />
          )}
        />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Job Role"
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              error={!!errors.role}
              helperText={errors.role}
              required
              fullWidth
              sx={{ width: "100%" }}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              label="Experience"
              name="experience"
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, experience: e.target.value }))
              }
              error={!!errors.experience}
              helperText={errors.experience}
              required
              fullWidth
              sx={{ width: "100" }}
            />
          </Grid>
        </Grid>

        <TextField
          label="Interview Process"
          name="process"
          value={formData.process}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, process: e.target.value }))
          }
          error={!!errors.process}
          helperText={errors.process}
          fullWidth
          required
          multiline
          minRows={4}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          sx={{
            alignSelf: "center",
            borderRadius: "20px",
            width: "300",
            backgroundColor: "green",
            fontWeight: "bold",
            // mb:2
          }}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default AddInterviewExperience;
