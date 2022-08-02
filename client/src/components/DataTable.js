import { useState } from "react";
import { Link } from "react-router-dom/";
import TableHead from "@mui/material/TableHead";
import { Grid } from "@mui/material";
import TableFooter from "@mui/material/TableFooter";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonMenu from "./ButtonMenu";
import Button from "@mui/material/Button";

const DataTable = ({
  data,
  onHandleDelete,
  onHandleStatus,
  options,
  headCells,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [rowId, setRowId] = useState("");

  const getStatus = (id, status) => {
    onHandleStatus(id, status);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleOpen = (id) => {
    setOpen(true);
    setRowId(id);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (id) => {
    onHandleDelete(id);
    handleClose();
  };
  // Avoid a layout jump when reaching the last page with empty data.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((cell) => {
                return <TableCell key={cell.id}>{cell.title}</TableCell>;
              })}
              {/* <TableCell>Bugs</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((dataItem) => (
              <TableRow
                key={dataItem.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row" align="left" sx={{ pl: "5px" }}>
                  <IconButton
                    onClick={() => handleOpen(dataItem.id)}
                    aria-label="settings"
                    sx={{ mr: "5px" }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>

                  <Link to={`/bugs/${dataItem.id}`}>{dataItem.title}</Link>
                </TableCell>
                <TableCell>
                  <ButtonMenu
                    options={options}
                    status={dataItem.status}
                    id={dataItem.id}
                    onGetStatus={getStatus}
                  />
                </TableCell>
                <TableCell>{dataItem.created}</TableCell>
                <TableCell>{dataItem.deadline}</TableCell>
                {/* <TableCell>{dataItem.bugs}</TableCell> */}
              </TableRow>
            ))}

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Confirm"}</DialogTitle>

              <DialogActions>
                <Button onClick={handleClose}>Disagree</Button>
                <Button onClick={() => handleConfirm(rowId)} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={3}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "data per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default DataTable;
