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

  const buildingNumberValidation = Joi.string().min(1).max(10).required()
    .validate(resBuildingNumber);
  const buildingNameValidation = Joi.string().min(1).max(50).required()
    .validate(resBuildingName);
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
          <TextField
            label="Building Number"
            error={buildingNumberValidation.error && resBuildingNumber.length > 0}
            variant="outlined"
            onChange={(event) => { setBuildingNumber(event.target.value); }}
          />
          <TextField
            label="Building Name"
            error={buildingNameValidation.error && resBuildingName.length > 0}
            variant="outlined"
            onChange={(event) => { setBuildingName(event.target.value); }}
          />
          <TextField
            label="Address"
            error={buildingAddressValidation.error && resBuildingAddress.length > 0}
            variant="outlined"
            onChange={(event) => { setBuildingAddress(event.target.value); }}
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
              disabled={
                buildingNumberValidation.error
                || buildingNameValidation.error
                || buildingAddressValidation.error
              }
              onClick={() => {}}
            >
              Create
            </Button>
          </Stack>
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
