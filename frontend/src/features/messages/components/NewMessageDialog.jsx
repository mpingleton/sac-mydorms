import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Typography } from '@mui/material';

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
      <Typography>Hello world!</Typography>
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
