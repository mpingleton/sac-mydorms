import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';

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

export const ViewResidentDetailsDialog = ({ modalOpen, onClose }) => (
  <Modal
    open={modalOpen}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={modalStyle}>
      <Stack direction="column">
        <Stack direction="row">
          <Typography>A1C</Typography>
          <Typography>First</Typography>
          <Typography>Middle</Typography>
          <Typography>Last</Typography>
        </Stack>
        <Stack direction="row">
          <Typography>Phone:</Typography>
          <Typography>1234567890</Typography>
        </Stack>
        <Stack direction="row">
          <Typography>Email:</Typography>
          <Typography>first.last@us.af.mil</Typography>
        </Stack>
        <Stack direction="row">
          <Button variant="contained">Cancel</Button>
        </Stack>
      </Stack>
    </Box>
  </Modal>
);

ViewResidentDetailsDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

ViewResidentDetailsDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default ViewResidentDetailsDialog;
