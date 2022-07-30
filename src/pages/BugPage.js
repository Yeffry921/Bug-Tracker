import React, { useReducer, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import BugTable from "../components/BugTable";

const initialState = {
  bugs: [
    {
      title: "bug #1",
      severity: "severe",
      status: "In Progress",
      dateCreated: "12/12/2034",
      deadline: "12/12/2035",
      id: 123456,
    },
  ]
};

const projectReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BUGS": {
      const newBug = action.payload.newBug;
      return { bugs: [newBug, ...state.bugs] };
    }
    // case "CHANGE_STATUS": {
    //   const id = action.payload.id
    //   const projects = state.projects.find((project) => project.id === id)
    // }
    default:
      throw new Error();
  }
};

const BugPage = () => {
  const [open, setOpen] = useState(false);
  const [bugData, dispatch] = useReducer(projectReducer, initialState);
  const [title, setTitle] = useState("");
  const [startDateValue, setStartValue] = useState(new Date());
  const [dueDateValue, setDueValue] = useState(new Date());

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
    const newBug = {
      title,
      status: "Active",
      dateCreated: startDateValue,
      deadline: dueDateValue,
      bugs: [],
      id: Math.random() * 10000,
    };

    dispatch({ type: "ADD_BUG", payload: { newBug } });
    handleClose();
  };

  return (
    <Box flex={8}>
      <Stack justifyContent="space-between" direction="row" p={2}>
        <Typography variant="h5">Bugs</Typography>

        <Button variant="contained" onClick={handleClickOpen}>
          <Typography
            variant="span"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Add Bug
          </Typography>
          <AddIcon sx={{ display: { xs: "block", sm: "none" } }} />
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth>
          <DialogTitle>Add Bug</DialogTitle>
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

      <BugTable bugs={bugData.bugs} />
    </Box>
  );
};

export default BugPage;
