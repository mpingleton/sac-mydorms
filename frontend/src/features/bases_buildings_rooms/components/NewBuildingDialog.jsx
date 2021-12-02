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

// import createBuilding from '@/api/createBuilding';

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

export const NewBuildingDialog = ({ baseId, modalOpen, onClose }) => {
  const [resBuildingNumber, setBuildingNumber] = React.useState('');
  const [resBuildingName, setBuildingName] = React.useState('');
  const [resBuildingAddress, setBuildingAddress] = React.useState('');

  const buildingNameValidation = Joi.string().min(1).max(150).required()
    .validate(resBuildingName);
  const buildingNumberValidation = Joi.string().min(1).max(10).required()
    .validate(resBuildingNumber);
  const buildingAddressValidation = Joi.string().min(1).max(150).required()
    .validate(resBuildingAddress);

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography>Create a New Building</Typography>
        </Stack>
      </Box>
    </Modal>
  );
};

NewBuildingDialog.propTypes = {
  baseId: PropTypes.number,
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewBuildingDialog.defaultProps = {
  baseId: 0,
  modalOpen: false,
  onClose: () => {},
};

export default NewBuildingDialog;
