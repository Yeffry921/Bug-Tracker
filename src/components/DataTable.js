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

import ButtonMenu from "./ButtonMenu";
import ConfirmDialog from "./ConfirmDialog";

const options = [
  { name: "Active", color: "#2CC8BA" },
  { name: "In Progress", color: "#08AEEA" },
  { name: "On Track", color: "#74CB80" },
  { name: "On Hold", color: "#FBC11E" },
  { name: "Planning", color: "#A593FF" },
  { name: "Cancelled", color: "#F56B62" },
];

const createData = (title, created, status, deadline, id) => {
  return { title, created, status, deadline, id };
};

const DataTable = ({ projects }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = projects.map((project) => {
    return createData(
      project.title,
      new Date(project.dateCreated).toLocaleDateString(),
      project.status,
      new Date(project.deadline).toLocaleDateString(),
      project._id
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Grid item xs={12}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date-Created</TableCell>
              <TableCell>Deadline</TableCell>
              {/* <TableCell>Bugs</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row" align="left" sx={{ pl: "5px" }}>
                  <IconButton aria-label="settings" sx={{ mr: "5px" }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                  <Link to={`/bugs/${row.id}`}>{row.title}</Link>
                </TableCell>
                <TableCell>
                  <ButtonMenu
                    options={options}
                    status={row.status}
                    id={row.id}
                  />
                </TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.deadline}</TableCell>
                {/* <TableCell>{row.bugs}</TableCell> */}
              </TableRow>
            ))}

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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
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
