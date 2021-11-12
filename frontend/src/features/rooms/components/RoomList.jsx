import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getRooms from '@/api/getRooms';

export const RoomList = ({ onSelectionChange }) => {
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    if (rooms.length === 0) {
      getRooms().then((roomsData) => setRooms(roomsData));
    }
  });

  const columns = [
    { field: 'number', headerName: 'Room Number', width: 150 },
    { field: 'building', headerName: 'In Building', width: 250 },
    { field: 'status', headerName: 'Status', width: 150 },
  ];

  const rows = rooms.map((room) => {
    let statusString = '';
    if (room.status === 0) {
      statusString = 'Unserviceable';
    } else if (room.status === 1) {
      statusString = 'Serviceable';
    }

    return {
      id: room.id,
      number: room.room_number,
      building: room.buildingObject.building_name,
      status: statusString,
    };
  });

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        onSelectionModelChange={onSelectionChange}
        disableMultipleSelection
      />
    </Box>
  );
};

RoomList.propTypes = {
  onSelectionChange: PropTypes.func,
};

RoomList.defaultProps = {
  onSelectionChange: () => {},
};

export default RoomList;
