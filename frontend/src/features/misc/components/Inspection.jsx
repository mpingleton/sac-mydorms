import React from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export const Inspection = () => {
  const columns = [
    {
      field: 'inspector',
      headerName: 'Inspector',
      width: 150,
    },
    {
      field: 'time',
      headerName: 'Time',
      width: 150,
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      width: 300,
    },
  ];

  const rows = [
    { id: 1, inspector: 'SSgt John Snuffy', time: '24 May 2021', remarks: 'Room clean.' },
    { id: 2, inspector: 'SSgt John Snuffy', time: '23 May 2021', remarks: 'Room clean.' },
    { id: 3, inspector: 'SSgt John Snuffy', time: '22 May 2021', remarks: 'Another test inspections.' },
  ];

  return (
    <Card
      sx={{ minHeight: 200, minWidth: 400 }}
      variant="outlined"
    >
      <CardContent>
        <Typography>Inspections</Typography>
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

export default Inspection;
