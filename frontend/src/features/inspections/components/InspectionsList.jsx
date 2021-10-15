import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export const InspectionsList = () => {
  const columns = [
    { field: 'room', headerName: 'Room', width: 100 },
    { field: 'subject', headerName: 'Subject', width: 200 },
    { field: 'remarks', headerName: 'Creator Remarks', width: 300 },
    { field: 'status', headerName: 'Status', width: 100 },
  ];

  const rows = [];
  return (
    <Box sx={{ height: '400px', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        disableMultipleSelection
      />
    </Box>
  );
};

export default InspectionsList;
