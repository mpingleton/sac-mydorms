import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Modal,
  Button,
  TextField,
  Stack,
  Typography,
} from '@mui/material';

// import createRoom from '@/api/createRoom';

const Joi = require('joi');

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

export const NewRoomDialog = ({ buildingId, modalOpen, onClose }) => {
  const [resRoomNumber, setRoomNumber] = React.useState('');

  const roomNumberValidation = Joi.string().min(1).max(10).required()
    .validate(resRoomNumber);

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography>Create a New Room</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

NewRoomDialog.propTypes = {
  buildingId: PropTypes.number,
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewRoomDialog.defaultProps = {
  buildingId: 0,
  modalOpen: false,
  onClose: () => {},
};

export default NewRoomDialog;
