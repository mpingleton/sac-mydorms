import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Typography } from '@mui/material';

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
  const some = 'fjad';
  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} />
      <Typography>{some}</Typography>
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
