import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ButtonMenu from './ButtonMenu';

const projects = [
  {
    title: "Project Number #1",
    dateCreated: "12/12/21",
    status: "Active",
    deadline: "06/12/22",
    id: 12345,
    bugs: ["bug 1", "bug 2", "bug3"],
  },
  {
    title: "Project Number #2",
    dateCreated: "12/12/21",
    status: "On Hold",
    deadline: "06/12/22",
    id: 12346,
    bugs: ["my bug 1", "my bug 2", "my bug 3"],
  },
  {
    title: "Project Number #3",
    dateCreated: "12/12/21",
    status: "In Progress",
    deadline: "06/12/22",
    id: 1275,
    bugs: [
      {
        title: "bug #1",
        severity: "severe",
        status: "in progress",
        createdAt: "12/12/2034",
        dueDate: "12/12/2035",
      },
    ],
  },
];

function createData(title, created, status, deadline, bugs, id) {
  return { title, created, status, deadline, bugs, id };
}

const rows = projects.map((project) => {
  return createData(project.title, project.dateCreated, project.status, project.deadline, project.bugs.length, project.id )
})


export default function BasicTable() {
  return (
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
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.title}</TableCell>
              <TableCell>
                <ButtonMenu status={row.status}/>
              </TableCell>
              <TableCell>{row.created}</TableCell>
              <TableCell>{row.deadline}</TableCell>
              <TableCell>{row.bugs}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}