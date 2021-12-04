import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const WorkOrder = () => {
  const columns = [
    {
      field: 'subject',
      headerName: 'Subject',
      width: 90,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 90,
    },
  ];

  const rows = [
    { id: 1, subject: 'Sink', status: 'Open' },
    { id: 2, subject: 'Air Conditioner', status: 'Stalled' },
    { id: 3, subject: 'Water Leak', status: 'In Progress' },
  ];

  return (
    <Card
      sx={{ minHeight: 400, minWidth: 600 }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h6">Work Orders</Typography>
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

export default WorkOrder;
