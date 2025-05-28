import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Dashboard, Business, Work, Add } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
  { label: "Interviews", icon: <Work />, path: "/interviews" },
  { label: "Companies", icon: <Business />, path: "/companies" },
  { label: "Add", icon: <Add />, path: "/add" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1300 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          navigate(newValue);
        }}
      >
        {navItems.map(({ label, icon, path }) => (
          <BottomNavigationAction
            key={path}
            label={label}
            icon={icon}
            value={path}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
