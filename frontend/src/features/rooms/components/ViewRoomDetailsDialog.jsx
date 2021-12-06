import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';

import getRoomById from '@/api/getRoomById';
import getRoomAssignmentsByRoom from '@/api/getRoomAssignmentsByRoom';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ViewRoomDetailsDialog = ({ modalOpen, onClose, roomId }) => {
  const [room, setRoom] = React.useState({});

  React.useEffect(() => {
    if (roomId > 0) {
      getRoomById(roomId).then((roomResponseData) => {
        const roomObject = roomResponseData;
        getRoomAssignmentsByRoom(roomId).then((assignmentsResponseData) => {
          roomObject.assignments = assignmentsResponseData;
          setRoom(roomObject);
        });
      });
    }
  }, [roomId]);

  if (room.id === undefined) {
    return null;
  }

  const getStatusString = (status) => {
    let statusString = '';
    if (status === 0) {
      statusString = 'Unserviceable';
    } else if (status === 1) {
      statusString = 'Serviceable';
    }

    return statusString;
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
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">Room Number:</Typography>
            <Typography color="text.primary">{room.room_number}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">Status:</Typography>
            <Typography color="text.primary">{getStatusString(room.status)}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">Residents:</Typography>
            <Stack direction="column">
              {
                room.assignments.map((assignment) => (
                  <Typography color="text.primary">
                    {`
                    ${assignment.personnelObject.rank}
                    ${assignment.personnelObject.first_name}
                    ${assignment.personnelObject.middle_name}
                    ${assignment.personnelObject.last_name}
                    `}
                  </Typography>
                ))
              }
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

ViewRoomDetailsDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  roomId: PropTypes.number,
};

ViewRoomDetailsDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
  roomId: 0,
};

export default ViewRoomDetailsDialog;
