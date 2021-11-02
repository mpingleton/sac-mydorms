import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Modal,
  Stack,
  Button,
  Typography,
} from '@mui/material';

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

export const NewEventDialog = ({ modalOpen, onClose }) => (
  <Modal
    open={modalOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Stack direction="column" spacing={1}>
        <Typography variant="h6" style={{ marginLeft: 'auto', marginRight: 'auto' }}>New Event</Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={onClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={onClose}
            disabled={false}
          >
            Post
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>
);

NewEventDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewEventDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewEventDialog;
