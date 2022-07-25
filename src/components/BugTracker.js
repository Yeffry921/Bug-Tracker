import React from "react";
import Stack from "@mui/material/Stack";
import { Divider, Box } from "@mui/material";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import NavPages from "../routes/NavPage";

const BugTracker = () => {
  return (
    <Box>
      <Navbar />
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" />}
      >
        <Sidebar />
        <NavPages />
      </Stack>
    </Box>
  );
};

export default BugTracker;
