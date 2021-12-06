import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Box,
  Modal,
  Stack,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';

import getRoomById from '@/api/getRoomById';
import getPersonnelAssignedToBase from '@/api/getPersonnelAssignedToBase';
import createRoomAssignment from '@/api/createRoomAssignment';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AssignResidentDialog = ({ modalOpen, onClose, roomId }) => {
  const [room, setRoom] = React.useState({});
  const [residents, setResidents] = React.useState([]);
  const [selectedResidentId, setSelectedResidentId] = React.useState(0);

  React.useEffect(() => {
    if (roomId > 0) {
      getRoomById(roomId).then((roomObject) => {
        getPersonnelAssignedToBase(roomObject.buildingObject.base_id)
          .then((personnelObject) => {
            setRoom(roomObject);
            setResidents(personnelObject);
          });
      });
    }
  }, [roomId]);

  if (room.id === undefined || residents.length === 0) {
    return null;
  }

  const submitRoomAssignment = () => {
    createRoomAssignment(selectedResidentId, roomId);
  };

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography color="text.primary">
            {`Select a resident to assign to room ${room.room_number}.`}
          </Typography>
          <Select
            value={selectedResidentId}
            error={selectedResidentId <= 0}
            onChange={(event) => setSelectedResidentId(event.target.value)}
          >
            <MenuItem disabled value={0}>
              <em>Please select as resident to assign to this room.</em>
            </MenuItem>
            {residents.map((resident) => (
              <MenuItem value={resident.id}>
                {`${resident.rank} ${resident.first_name} ${resident.last_name}`}
              </MenuItem>
            ))}
          </Select>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={selectedResidentId <= 0}
              onClick={submitRoomAssignment}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

AssignResidentDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  roomId: PropTypes.number,
};

AssignResidentDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
  roomId: 0,
};

export default AssignResidentDialog;
