import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

import getRoomsByBuilding from '@/api/getRoomsByBuilding';

export const RoomList = ({ buildingId, roomId, onSelectionChanged }) => {
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    getRoomsByBuilding(buildingId).then((responseData) => setRooms(responseData));
  }, [buildingId]);

  const columns = [
    { field: 'number', headerName: 'Number', width: 200 },
  ];

  const rows = rooms.map((room) => (
    {
      id: room.id,
      number: room.room_number,
    }
  ));

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        roomId={roomId}
        onSelectionModelChange={(selection) => {
          onSelectionChanged(selection.length > 0 ? selection[0] : 0);
        }}
        disableMultipleSelection
      />
    </Box>
  );
};

RoomList.propTypes = {
  buildingId: PropTypes.number,
  roomId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

RoomList.defaultProps = {
  buildingId: 0,
  roomId: 0,
  onSelectionChanged: () => {},
};

export default RoomList;
