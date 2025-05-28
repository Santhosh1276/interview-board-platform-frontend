// src/components/AppLayout.jsx
import React, { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Topbar from "../components/Topbar"
import Sidebar from "../components/Sidebar";
const AppLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Topbar
        toggleDrawer={handleDrawerToggle}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Sidebar mobileOpen={mobileOpen} toggleDrawer={handleDrawerToggle} />
      <main
        style={{
          marginLeft: isSmallScreen ? 0 : 160, // drawerWidth = 170
          padding: 20,
          paddingTop: 80,
          paddingBottom: isSmallScreen ? 56 : 20, // reserve space for BottomNav (56px high)
        }}
      >
        {children}
      </main>
    </ThemeProvider>
  );
};

export default AppLayout;
