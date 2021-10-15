import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Modal, Stack, TextField, Typography } from '@mui/material';

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

export const NewInspectionsDialog = ({ modalOpen, onClose }) => {
  const some = 'dfds';
  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <TextField
            id="room"
            label="Room"
            variant="outlined"
          />
          <TextField
            id="time"
            label="Time"
            variant="outlined"
          />
          <TextField
            id="inspector"
            label="Inspector"
            variant="outlined"
          />
          <TextField
            id="filled-multiline-static"
            label="Comments"
            multiline
            rows={4}
            variant="outlined"
          />
        </Stack>
        <Button variant="contained">Send</Button>
        <Typography>{some}</Typography>
      </Box>
    </Modal>
  );
};

NewInspectionsDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewInspectionsDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewInspectionsDialog;
