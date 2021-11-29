import React from 'react';
import { Typography, Card, CardContent, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

function createData(inspections, results, time) {
  return { inspections, results, time };
}

const rows = [
  createData('Room 1', 'Pass', '8:30'),
  createData('Room 2', 'Fail', '15.45'),
  createData('Room 3', 'Pass', '13:30'),
];

export const Inspection = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Inspections</Typography>
      <Table sx={{ minWidth: 500 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Inspection</TableCell>
            <TableCell align="left">Result</TableCell>
            <TableCell align="left">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.inspections}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ width: 150 }}>
                {row.inspections}
              </TableCell>
              <TableCell>{row.results}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default Inspection;
