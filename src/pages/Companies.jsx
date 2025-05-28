import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import Typography from "@mui/material/Typography";
import CompaniesCard from "../components/CompaniesCard";
import { Box } from "@mui/material";
import configData from "../configs/configData";
import { Grid } from "@mui/material";
import { get_allCompanies } from "../api/company_api";

const Companies = () => {
  console.log(configData);
  let [data, setData] = useState([]);
  let [dataForFilter, SetDataFilter] = useState([]);
  useEffect(() => {
    async function fetchCompanies() {
      let fetchAllCompanies = await get_allCompanies();
      if (fetchAllCompanies?.status == "Success") {
        let company_filter = fetchAllCompanies?.data?.map((val) => {
          return val?.name;
        });
        setData(fetchAllCompanies?.data);
        SetDataFilter(company_filter);
      }
    }

    fetchCompanies();
  }, []);

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
      <Typography variant="h4" gutterBottom>
        Companies Section
      </Typography>
      <SearchInput
        companies={dataForFilter}
        onSearch={(query) => {
          // filter companies or make API call
          console.log("Query from search bar:", query);
        }}
      />

      <Grid container spacing={2} padding={1} sx={{ gap: 3 }}>
        {data?.length &&
          data.map((val, i) => (
            <Grid item xs={12} sm={6} md={3} key={val.id || i}>
              <CompaniesCard data={val} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Companies;
