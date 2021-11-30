import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from '@mui/material';

import getRoomsByBuilding from '@/api/getRoomsByBuilding';

export const RoomSelector = ({ disabled, buildingId, roomId, onSelectionChanged }) => {
  const [rooms, setRooms] = React.useState([]);

  React.useEffect(() => {
    getRoomsByBuilding(buildingId)
      .then((responseData) => setRooms(responseData));
  }, [buildingId]);

  return (
    <Select
      label="Room"
      value={roomId}
      disabled={disabled || buildingId <= 0}
      onChange={(event) => { onSelectionChanged(event.target.value); }}
    >
      <MenuItem disabled value={0}><em>{buildingId > 0 ? 'Please select a room...' : ''}</em></MenuItem>
      {rooms.map((room) => (<MenuItem value={room.id}>{room.room_number}</MenuItem>))}
    </Select>
  );
};

RoomSelector.propTypes = {
  disabled: PropTypes.bool,
  buildingId: PropTypes.number,
  roomId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

RoomSelector.defaultProps = {
  disabled: false,
  buildingId: 0,
  roomId: 0,
  onSelectionChanged: () => {},
};

export default RoomSelector;
