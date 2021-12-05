import React from 'react';
import PropTypes from 'prop-types';

import { Select, MenuItem } from '@mui/material';

import getRoomAssignmentsForPersonnel from '@/api/getRoomAssignmentsForPersonnel';

export const RoomAssignmentSelector = ({ personnelId, roomId, onSelectionChanged }) => {
  const [roomAssignments, setRoomAssignments] = React.useState([]);

  React.useEffect(() => {
    getRoomAssignmentsForPersonnel(personnelId)
      .then((responseData) => setRoomAssignments(responseData));
  }, [personnelId]);

  return (
    <Select
      label="Room"
      value={roomId}
      disabled={personnelId <= 0}
      onChange={(event) => { onSelectionChanged(event.target.value); }}
    >
      <MenuItem disabled value={0}>
        <em>Please select a room...</em>
      </MenuItem>
      {roomAssignments.map((ra) => (
        <MenuItem value={ra.roomObject.id}>{ra.roomObject.room_number}</MenuItem>
      ))}
    </Select>
  );
};

RoomAssignmentSelector.propTypes = {
  personnelId: PropTypes.number,
  roomId: PropTypes.number,
  onSelectionChanged: PropTypes.func,
};

RoomAssignmentSelector.defaultProps = {
  personnelId: 0,
  roomId: 0,
  onSelectionChanged: () => {},
};

export default RoomAssignmentSelector;
