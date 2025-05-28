import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  Tooltip,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

function Topbar({ toggleTheme, mode }) {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

 
 const drawerWidth = 0;

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1, // ensures AppBar stays on top
        backgroundColor: "whitesmoke",
        color:"black"
        // ml: `${drawerWidth}px`,
        // width: `calc(100% - ${drawerWidth}px)`,
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-between", minHeight: 64 }}
      >
        {/* Logo and title */}
        <Box display="flex" alignItems="center" gap={1}>
          <WorkOutlineIcon fontSize="medium" />
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            Interview TAT
          </Typography>
        </Box>

        {/* Right section: Theme toggle + Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* <IconButton onClick={toggleTheme} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton> */}

          {/* Admin Name */}
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            Admin
          </Typography>

          {/* Avatar with menu */}
          <Tooltip title="Account settings">
            <IconButton onClick={handleOpenMenu} size="small" sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                S
              </Avatar>
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            onClick={handleCloseMenu}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                minWidth: 160,
                borderRadius: 2,
                bgcolor: theme.palette.background.paper,
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>Settings</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
