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

import createRoom from '@/api/createRoom';

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

  const submitNewRoom = () => {
    createRoom(buildingId, resRoomNumber, 0).then(() => { onClose(); });
  };

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
          <TextField
            label="Room Number"
            error={roomNumberValidation.error && resRoomNumber.length > 0}
            variant="outlined"
            onChange={(event) => { setRoomNumber(event.target.value); }}
          />
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              disabled={roomNumberValidation.error}
              onClick={() => submitNewRoom()}
            >
              Create
            </Button>
          </Stack>
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
