import React from 'react';
import { Typography, Card, CardContent, Table, TableRow, TableCell, TableHead, TableBody } from '@mui/material';

function createData(workOrder, progress, time) {
  return { workOrder, progress, time };
}

const rows = [
  createData('Sink', 'Open', '16:45'),
  createData('Air Conditioner', 'Stalled', '8:30'),
  createData('Water Leak', 'In Progress', '10:45'),
  createData('Door Lock', 'Stalled', '13:30'),
];

export const WorkOrder = () => (
  <Card
    sx={{ minHeight: 200, minWidth: 400 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Work Orders</Typography>
      <Table sx={{ minWidth: 500 }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Work Order</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.workOrder}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{ width: 150 }}>
                {row.workOrder}
              </TableCell>
              <TableCell>{row.progress}</TableCell>
              <TableCell>{row.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default WorkOrder;
