import React, { useContext, useEffect, useReducer, useState } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";

import projectServices from "../projectServices";
import ProjectContext from "../project-context";

const options = [
  { name: "Active", color: "#2CC8BA" },
  { name: "In Progress", color: "#08AEEA" },
  { name: "On Track", color: "#74CB80" },
  { name: "On Hold", color: "#FBC11E" },
  { name: "Planning", color: "#A593FF" },
  { name: "Cancelled", color: "#F56B62" },
];

const headCells = [
  { title: "Project Name", id: 1 },
  { title: "Status", id: 2 },
  { title: "Date-Created", id: 3 },
  { title: "Deadline", id: 4 },
];

const createData = (title, created, status, deadline, id) => {
  return { title, created, status, deadline, id };
};

const Projects = () => {
  const { dispatch, projectData } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [startDateValue, setStartValue] = useState(new Date());
  const [dueDateValue, setDueValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      projectServices.getAllProjectData().then((projects) => {
        setIsLoading(false);
        dispatch({ type: "GET_ALL", payload: { projects } });
      });
    }, 2000);
  }, []);

  const projectModelData = projectData.projects.map((project) => {
    return createData(
      project.title,
      new Date(project.dateCreated).toLocaleDateString(),
      project.status,
      new Date(project.deadline).toLocaleDateString(),
      project._id
    );
  });

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
    const addedProject = {
      title,
      status: "Active",
      dateCreated: startDateValue,
      deadline: dueDateValue,
    };
    projectServices.addProjectData(addedProject).then((newProject) => {
      dispatch({ type: "ADD_PROJECT", payload: { newProject } });
    });

    handleClose();
  };

  const handleProjectDelete = (id) => {
    projectServices.deleteProject(id).then((data) => {
      dispatch({ type: "DELETE_PROJECT", payload: { id } });
    });
  };

  const handleProjectStatus = (id, changedStatus) => {
    projectServices.changeProjectStatus(id, changedStatus).then((data) => {
      dispatch({ type: "CHANGE_STATUS", payload: { data } });
    });
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

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </Box>
      ) : (
        <DataTable
          data={projectModelData}
          headCells={headCells}
          onHandleDelete={handleProjectDelete}
          onHandleStatus={handleProjectStatus}
          options={options}
        />
      )}
    </Box>
  );
};

export default Projects;
