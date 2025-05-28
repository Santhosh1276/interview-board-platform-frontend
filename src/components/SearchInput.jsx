import React, { useState } from "react";
import { Box, TextField, Autocomplete, Button, useTheme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";



const SearchInput = ({ onSearch ,companies= [] }) => {
  const theme = useTheme();
  const [value, setValue] = useState("");

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    if (onSearch) onSearch(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        width: "100%",
        maxWidth: 400,
      }}
    >
      <Autocomplete
        freeSolo
        disableClearable
        options={companies}
        onChange={handleAutocompleteChange}
        sx={{ flexGrow: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            value={value}
            onChange={handleInputChange}
            placeholder="Search companies"
            variant="outlined"
            size="small"
            InputProps={{
              ...params.InputProps,
              type: "search",
              sx: {
                fontSize: 14,
                borderRadius: 2,
              },
            }}
          />
        )}
      />
      <Button
        onClick={handleSearch}
        variant="contained"
        size="small"
        startIcon={<SearchIcon />}
        sx={{
          textTransform: "none",
          fontSize: 14,
          px: 2,
          borderRadius: 2,
        }}
      >
        Search
      </Button>
    </Box>
  );
};

export default SearchInput;
