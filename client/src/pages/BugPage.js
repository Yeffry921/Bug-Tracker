import React, { useContext, useState, useEffect } from "react";
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
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

import DataTable from "../components/DataTable";
import BugContext from "../context/bug-context";
import bugServices from "../services/bugServices";

const options = [
  { name: "In Progress", color: "#FBC11E" },
  { name: "On Track", color: "#74CB80" },
  { name: "Planning", color: "#A593FF" },
  { name: "Cancelled", color: "#F56B62" },
  { name: "Open", color: "#08AEEA" },
];

function createData(title, severity, status, created, deadline, id) {
  return { title, severity, status, created, deadline, id };
}

const headCells = [
  { title: "Bug", id: 1 },
  { title: "Status", id: 2 },
  { title: "Severity", id: 3 },
  { title: "Date-Created", id: 4 },
  { title: "Deadline", id: 5 },
];

const BugPage = () => {
  const { dispatch, bugData } = useContext(BugContext);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [startDateValue, setStartValue] = useState(new Date());
  const [dueDateValue, setDueValue] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    // setIsLoading(true);

    setTimeout(() => {
      bugServices.getAllBugData(id).then((bugs) => {
        console.log(bugs);
        // setIsLoading(false);
        dispatch({ type: "GET_ALL", payload: { bugs } });
      });
    }, 2000);
  }, []);

  console.log(bugData);
  const bugModelData = bugData.bugs.map((bug) => {
    console.log(bug);
    return createData(
      bug.title,
      bug.severity,
      bug.status,
      new Date(bug.dateCreated).toLocaleDateString(),
      new Date(bug.deadline).toLocaleDateString(),
      bug._id
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

  const handleAddBug = () => {
    const newBugData = {
      title,
      status: "In Progress",
      severity: "Minor",
      dateCreated: startDateValue,
      deadline: dueDateValue,
      related_project_id: id,
    };

    console.log(newBugData);

    bugServices.addBugData(newBugData).then((newBug) => {
      console.log(newBug);
      dispatch({ type: "ADD_BUG", payload: { newBug } });
    });

    handleClose();
  };

  const handleBugDelete = (id) => {
    bugServices.deleteBug(id).then((data) => {
      dispatch({ type: "DELETE_BUG", payload: { id } });
    });
  };

  const handleBugStatus = (id, changedStatus) => {
    bugServices.changeBugStatus(id, changedStatus).then((data) => {
      dispatch({ type: "CHANGE_STATUS", payload: { data } });
    });
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
            Add Bugs
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
                label="Bug Name"
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
            <Button variant="contained" onClick={handleAddBug}>
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
          data={bugModelData}
          headCells={headCells}
          onHandleDelete={handleBugDelete}
          onHandleStatus={handleBugStatus}
          options={options}
          type="Bugs"
        />
      )}
    </Box>
  );
};

export default BugPage;
