import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { formatDate } from '@/utils/format';
import { useUsers } from '../api/getUsers';

export const UsersList = () => {
  const usersQuery = useUsers();

  if (!usersQuery.data) return null;

  const columns = [
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'role', headerName: 'Role', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 150 },
  ];

  const rows = usersQuery.data.map((user) => (
    {
      id: user.id,
      username: user.username,
      role: user.role,
      createdAt: formatDate(user.createdAt),
    }
  ));

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default UsersList;
