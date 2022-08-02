import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ButtonMenu from "./ButtonMenu";

const options = [
  { name: "In Progress", color: "#FBC11E" },
  { name: "On Track", color: "#74CB80" },
  { name: "Planning", color: "#A593FF" },
  { name: "Cancelled", color: "#F56B62" },
  { name: 'Open', color: '#08AEEA'}
];

function createData(title, severity, status, dateCreated, deadline, id) {
  return { title, severity, status, dateCreated, deadline, id };
}

export default function BugTable({ bugs }) {
  const rows = bugs.map((bug) => {
    return createData(
      bug.title,
      bug.severity,
      bug.status,
      bug.dateCreated,
      bug.deadline,
      bug.id
    );
  });

  console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Bug</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Severity</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Due Date</TableCell>
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
              <TableCell align="left">
                <ButtonMenu options={options} status={row.status} />
              </TableCell>
              <TableCell align="left">{row.severity}</TableCell>
              <TableCell align="left">{row.dateCreated}</TableCell>
              <TableCell align="left">{row.deadline}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
