import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";
import { Outlet, Route, Routes } from "react-router-dom";
import Projects from "../pages/Projects";
import { ProjectProvider } from "../context/project-context";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const BugTracker = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Navbar />
      <Stack sx={{ display: "flex", flexDirection: 'row', height: '100%' }}>
        <Sidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};

export default BugTracker;
