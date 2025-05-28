import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  FormHelperText,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { add_company } from "../api/company_api";
import { imageToURl } from "../api/add_images_bucket";

function AddCompany() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    image: null,
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Company name is required";
    if (!formData.location.trim())
      newErrors.location = "Company location is required";
    if (!formData.image) newErrors.image = "Company image is required";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length < 200) {
      newErrors.description = "Minimum 200 characters required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      const imageData = new FormData();
      imageData.append("file", formData?.image);
      let imageToUrl = await imageToURl(imageData);
      console.log(imageToUrl);
      if (imageToUrl?.status == "Success") {
        formData["image"] = imageToUrl?.url;
        let newCompany = await add_company(formData);
        console.log(newCompany)
        if (newCompany?.status == "Success") {
          setFormData({
            name: "",
            location: "",
            image: null,
            description: "",
          });
        }
      }

    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{
        p: 2,
        maxWidth: 1200,
        mx: "auto",
        mt: 1,
        mb: 2,
        borderRadius: 3,
        backgroundColor: "background.paper",
        border: "1px solid #e0e0e0",
        backgroundColor: "#fafafa",
        height: "57vh",
        // overflowX:"hidden"
      }}
    >
      {/* Company Name */}
      <TextField
        name="name"
        label="Company Name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        fullWidth
        required
      />

      {/* Company Location */}
      <TextField
        name="location"
        label="Company Location"
        value={formData.location}
        onChange={handleChange}
        error={!!errors.location}
        helperText={errors.location}
        fullWidth
        required
      />

      {/* Upload Image */}
      <Box display="flex" alignItems="center" gap={2}>
        <Button variant="contained" component="label">
          Upload Company Image
          <input
            type="file"
            name="image"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </Button>
        {formData.image && (
          <Avatar
            alt="Company"
            src={URL.createObjectURL(formData.image)}
            sx={{ width: 56, height: 56 }}
          />
        )}
      </Box>
      {errors.image && <FormHelperText error>{errors.image}</FormHelperText>}

      {/* Short Description */}
      <TextField
        name="description"
        label="Short Description"
        value={formData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
        multiline
        minRows={3}
        fullWidth
        required
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        sx={{
          alignSelf: "center",
          borderRadius: "20px",
          width: "300",
          backgroundColor: "green",
          fontWeight: "bold",
          // padding:{xs:10,sm:3}
          // marginBottom:10
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  );
}

export default AddCompany;
