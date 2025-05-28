import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import BottomNav from "./BottomNav";

const drawerWidth = 170;

const sidebarItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Interviews", path: "/interviews" },
  { label: "Companies", path: "/companies" },
  { label: "Add", path: "/add" },
];

function Sidebar() {
  const theme = useTheme();
  const location = useLocation();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // ⬅ Detect mobile

  if (isSmallScreen) return <BottomNav />; // Show BottomNav on mobile

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: theme.palette.background.paper,
          borderRight: `1px solid ${theme.palette.divider}`,
          paddingTop: theme.spacing(2),
        },
      }}
    >
      <Toolbar />
      <List sx={{ display: "flex", flexDirection: "column", gap: 1, px: 1 }}>
        {sidebarItems.map(({ label, path }) => {
          const isActive = location.pathname === path;

          return (
            <ListItemButton
              key={path}
              component={Link}
              to={path}
              sx={{
                borderRadius: 1,
                px: 2,
                py: 1.5,
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.primary,
                backgroundColor: isActive
                  ? theme.palette.action.selected
                  : "transparent",
                transition: "background-color 0.3s, color 0.3s",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontWeight: isActive ? "bold" : "normal",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>
    </Drawer>
  );
}

export default Sidebar;
