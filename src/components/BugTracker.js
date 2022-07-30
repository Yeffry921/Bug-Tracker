import React, { useContext } from "react";
import Stack from "@mui/material/Stack";
import { Divider, Box } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NavPages from "../routes/NavPage";
import { ProjectProvider } from "../project-context";

const BugTracker = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <Navbar />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
        sx={{ height: "100%" }}
      >
        <Sidebar />
        <ProjectProvider>
          <NavPages />
        </ProjectProvider>
      </Stack>
    </Box>
  );
};

export default BugTracker;
