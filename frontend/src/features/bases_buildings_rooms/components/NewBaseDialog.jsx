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

import createBase from '@/api/createBase';

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

export const NewBaseDialog = ({ modalOpen, onClose }) => {
  const [resBaseName, setBaseName] = React.useState('');

  const baseNameValidation = Joi.string().min(1).max(10).required()
    .validate(resBaseName);

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography>Create a New Base</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

NewBaseDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewBaseDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewBaseDialog;
