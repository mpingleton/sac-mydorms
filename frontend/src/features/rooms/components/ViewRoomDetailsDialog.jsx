import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';

import getRoomById from '../api/getRoomById';

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
    if (room.id !== roomId && roomId > 0) {
      getRoomById(roomId).then((responseData) => setRoom(responseData));
    }
  });

  if (room.id === undefined) {
    return null;
  }

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
            <Typography>Room Number:</Typography>
            <Typography>{room.room_number}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Status:</Typography>
            <Typography>{room.status}</Typography>
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
