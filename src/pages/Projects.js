import React, { useEffect, useReducer, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DataTable from "../components/DataTable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const getInitalState = () => {
  const projects = localStorage.getItem('projects')
  return projects ? JSON.parse(projects) : []
}

const initialState = getInitalState()


const projectReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PROJECT": {
      const newProject = action.payload.newProject;
      return { projects: [newProject, ...state.projects] };
    }
    case "CHANGE_STATUS": {
      const id = action.payload.id
      const projects = state.projects.find((project) => project.id === id)
    }

    default:
      throw new Error();
  }
};

const Projects = () => {
  const [open, setOpen] = useState(false);
  const [projectData, dispatch] = useReducer(projectReducer, initialState);
  const [title, setTitle] = useState("");
  const [startDateValue, setStartValue] = useState(new Date());
  const [dueDateValue, setDueValue] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projectData))
  }, [projectData])

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setStartValue(new Date());
    setDueValue(new Date());
  };

  const handleStartValue = (value) => {
    setStartValue(value);
  };

  const handleDueValue = (value) => {
    setDueValue(value);
  };

  const handleAddProject = () => {
    const newProject = {
      title,
      status: "Active",
      dateCreated: startDateValue.toLocaleDateString(),
      deadline: dueDateValue.toLocaleDateString(),
      bugs: [],
      id: Math.floor(Math.random() * 100),
    };

    dispatch({ type: "ADD_PROJECT", payload: { newProject } });
    handleClose();
  };

  return (
    <Box flex={8}>
      <Stack justifyContent="space-between" direction="row" p={2}>
        <Typography variant="h5">Projects</Typography>

        <Button variant="contained" onClick={handleClickOpen}>
          <Typography
            variant="span"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Add Project
          </Typography>
          <AddIcon sx={{ display: { xs: "block", sm: "none" } }} />
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Add Project</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <TextField
                id="standard-basic"
                variant="outlined"
                label="Project Name"
                sx={{ mt: "5px" }}
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />

              {/* <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Description"
                maxRows={3}
                multiline
                type="email"
                fullWidth
                variant="outlined"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              /> */}

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Start Date"
                  inputFormat="MM/dd/yyyy"
                  value={startDateValue}
                  onChange={handleStartValue}
                  renderInput={(params) => <TextField {...params} />}
                />

                <DesktopDatePicker
                  label="Due Date"
                  inputFormat="MM/dd/yyyy"
                  value={dueDateValue}
                  onChange={handleDueValue}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleAddProject}>
              Add
            </Button>
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>

      <DataTable projects={projectData.projects} />
    </Box>
  );
};

export default Projects;
