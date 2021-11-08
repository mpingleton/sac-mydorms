import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Stack, TextField, Select, MenuItem, Button } from '@mui/material';

const style = {
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

export const NewMessageDialog = ({ modalOpen, onClose }) => (
  <Modal
    open={modalOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Stack direction="column" spacing={1}>
        <Select
          label="To"
          onChange={() => {}}
        >
          <MenuItem value={0} disabled>
            <em>Please select a person to send this message to...</em>
          </MenuItem>
        </Select>
        <TextField
          label="Subject"
          variant="outlined"
          onChange={() => {}}
        />
        <TextField
          label="Body"
          variant="outlined"
          multiline
          rows={4}
          onChange={() => {}}
        />
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled
            onClick={() => {}}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>
);

NewMessageDialog.propTypes = {
  modalOpen: PropTypes.func,
  onClose: PropTypes.func,
};

NewMessageDialog.defaultProps = {
  modalOpen: () => {},
  onClose: () => {},
};

export default NewMessageDialog;
