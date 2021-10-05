import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Button, TextField, Stack } from '@mui/material';

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

export const NewResidentDialog = ({ modalOpen, onClose }) => (
  <Modal
    open={modalOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Stack direction="column">
        <TextField
          id="new-resident-first-name"
          label="First Name"
          variant="standard"
        />
        <TextField
          id="new-resident-middle-name"
          label="Middle Name"
          variant="standard"
        />
        <TextField
          id="new-resident-last-name"
          label="Last Name"
          variant="standard"
        />
        <TextField
          id="new-resident-email"
          label="Email"
          variant="standard"
        />
        <TextField
          id="new-resident-phone"
          label="Phone Number"
          variant="standard"
        />
        <Stack direction="row">
          <Button variant="contained">Cancel</Button>
          <Button variant="contained">Create</Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>
);

NewResidentDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewResidentDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewResidentDialog;
