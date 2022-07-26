import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonMenu from "./ButtonMenu";
import { Grid } from "@mui/material";

function createData(title, created, status, deadline, bugs, id) {
  return { title, created, status, deadline, bugs, id };
}

export default function BasicTable({ projects }) {
  const rows = projects.map((project) => {
    console.log(project.dateCreated);
    return createData(
      project.title,
      project.dateCreated.toLocaleDateString(),
      project.status,
      project.deadline.toLocaleDateString(),
      project.bugs.length,
      project.id
    );
  });

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
              <TableCell>Bugs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell>
                  <ButtonMenu status={row.status} />
                </TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell>{row.deadline}</TableCell>
                <TableCell>{row.bugs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
