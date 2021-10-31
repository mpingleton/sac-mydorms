import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export const MessageList = () => {
  const columns = [
    { field: 'time', headerName: 'Date/Time', width: 150 },
    { field: 'from', headerName: 'From', width: 200 },
    { field: 'subject', headerName: 'Subject', width: 450 },
  ];

  const rows = [
    {
      id: 1,
      time: '1/1/2021',
      from: 'A1C John Doe',
      subject: 'BAH Concerns',
    },
    {
      id: 2,
      time: '1/14/2021',
      from: 'AB Josh Snuffy',
      subject: 'A/C Work Order Status',
    },
    {
      id: 3,
      time: '2/1/2021',
      from: 'SrA Jane Doe',
      subject: 'BAH Letter',
    },
  ];

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
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

export default MessageList;
