import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Stack } from '@mui/material';
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

export const AssignResidentDialog = ({ modalOpen, onClose, roomId }) => {
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
          {room.room_number}
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
