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

  const submitNewBase = () => {
    createBase(resBaseName).then(() => { onClose(); });
  };

  const baseNameValidation = Joi.string().min(1).max(100).required()
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
          <TextField
            label="Base Name"
            error={baseNameValidation.error && resBaseName.length > 0}
            variant="outlined"
            onChange={(event) => { setBaseName(event.target.value); }}
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
              disabled={baseNameValidation.error}
              onClick={() => submitNewBase()}
            >
              Create
            </Button>
          </Stack>
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
