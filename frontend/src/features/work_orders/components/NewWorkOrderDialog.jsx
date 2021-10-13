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

export const NewWorkOrderDialog = ({ modalOpen, onClose }) => (
  <Modal
    open={modalOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Stack direction="column" spacing={1}>
        <TextField
          id="new-work-order-subject"
          label="Subject"
          variant="standard"
          onChange={() => {}}
        />
        <TextField
          id="new-work-order-room"
          label="For Room"
          variant="standard"
          onChange={() => {}}
        />
        <TextField
          id="new-work-order-remarks"
          label="Remarks"
          variant="standard"
          multiline
          maxRows={3}
          onChange={() => {}}
        />
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={() => {}}>Create</Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>
);

NewWorkOrderDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewWorkOrderDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewWorkOrderDialog;
