import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { useResidents } from '../api/getResidents';

export const ResidentList = () => {
  const residentsQuery = useResidents();

  if (!residentsQuery.data) {
    return null;
  }

  const columns = [
    { field: 'rank', headerName: 'Rank', width: 150 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'middle_name', headerName: 'Middle Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 150 },
  ];

  const rows = residentsQuery.data.map((resident) => (
    {
      id: resident.id,
      rank: resident.rank,
      first_name: resident.first_name,
      middle_name: resident.middle_name,
      last_name: resident.last_name,
      email: resident.email,
    }
  ));

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableMultipleSelection
      />
    </Box>
  );
};

export default ResidentList;
