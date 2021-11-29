import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Event Name', width: 90, editable: true },
  {
    field: 'Date',
    headerName: 'Date',
    width: 150,
    editable: true,
  },
  {
    field: 'Time',
    headerName: 'Time',
    width: 150,
    editable: true,
  },
];

const rows = [
  { id: 'Dance', Date: '12/01', Time: '17:30' },
  { id: 'Spring Jammer', Date: '01/29', Time: '6:00' },
  { id: 'Sports Tournament', Date: '02/24', Time: '15:45' },
  { id: 'Pot Luck', Date: '03/15', Time: '18:00' },
];
export const Events = () => (
  <Card
    sx={{ minHeight: 400, minWidth: 600 }}
    variant="outlined"
  >
    <CardContent>
      <Typography>Events</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
    </CardContent>
  </Card>
);

export default Events;
