import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";

import Dashboard from "./pages/Dashboard";
import AppLayout from "./pages/AppLayout";
import Companies from "./pages/Companies";
import AddPost from "./pages/AddPost";
import Interviews from "./pages/Interviews";
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);
  console.log(darkMode, "<<<<< toggle theme");

  const theme = createTheme({
    palette: { mode: darkMode ? "dark" : "light" },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AppLayout>
                <Dashboard />
              </AppLayout>
            }
          />

          <Route
            path="/companies"
            element={
              <AppLayout>
                <Companies />
              </AppLayout>
            }
          />
          <Route
            path="/interviews"
            element={
              <AppLayout>
                <Interviews />
              </AppLayout>
            }
          />

          <Route
            path="/add"
            element={
              <AppLayout>
                <AddPost />
              </AppLayout>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
