import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const Events = () => {
  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      width: 200,
    },
    {
      field: 'scheduled',
      headerName: 'Date',
      width: 90,
    },
  ];

  const rows = [
    { id: 1, subject: 'Dance', scheduled: '12/01' },
    { id: 2, subject: 'Spring Jammer', scheduled: '01/29' },
    { id: 3, subject: 'Sports Tournament', scheduled: '02/24' },
    { id: 4, subject: 'Pot Luck', scheduled: '03/15' },
  ];

  return (
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
};

export default Events;
