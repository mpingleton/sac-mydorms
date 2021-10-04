import React from 'react';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import { useRooms } from '../api/getRooms';

export const RoomList = () => {
  const roomsQuery = useRooms();

  if (!roomsQuery.data) {
    return null;
  }

  const columns = [
    { field: 'number', headerName: 'Room Number', width: 150 },
    { field: 'building', headerName: 'In Building', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const rows = roomsQuery.data.map((room) => (
    {
      id: room.id,
      number: room.room_number,
      building: room.building_name,
      status: room.status,
    }
  ));

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </Box>
  );
};

export default RoomList;
