import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { mainNavbarItems } from "./navbarListItems";
import { Box, Switch } from "@mui/material";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Box bgcolor="#444" sx={{ flexBasis: "0 0 10%" }}>
      <List>
        {mainNavbarItems.map((item, index) => (
          <NavLink to={item.route} style={{textDecoration: 'none'}} key={item.id}>
            <ListItemButton sx={{ color: "#fff" }}>
              <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </NavLink>
        ))}

        <ListItem sx={{ padding: "0" }}>
          <ListItemButton component="a" href="#simple-list">
            <ListItemIcon sx={{ color: "#fff" }}>
              <ModeNightIcon />
            </ListItemIcon>
            <Switch
            // onChange={(e) => setMode(mode === "light" ? "dark" : "light")}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
