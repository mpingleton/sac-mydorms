import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Button, TextField, Stack, Typography } from '@mui/material';

import createPersonnel from '@/api/createPersonnel';

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

export const NewResidentDialog = ({ modalOpen, onClose }) => {
  const [resRank, setRank] = React.useState('');
  const [resFirstName, setFirstName] = React.useState('');
  const [resMiddleName, setMiddleName] = React.useState('');
  const [resLastName, setLastName] = React.useState('');
  const [resEmail, setEmail] = React.useState('');
  const [resPhone, setPhone] = React.useState('');

  const rankValidation = Joi.string().min(2).max(6).required()
    .validate(resRank);
  const firstNameValidation = Joi.string().min(1).max(150).required()
    .validate(resFirstName);
  const middleNameValidation = Joi.string().min(1).max(150).required()
    .validate(resMiddleName);
  const lastNameValidation = Joi.string().min(1).max(150).required()
    .validate(resLastName);
  const emailValidation = Joi.string().min(1).email({ tlds: { allow: false } }).required()
    .validate(resEmail);
  const phoneValidation = Joi.string().min(1).max(15).required()
    .validate(resPhone);

  const submitResident = () => {
    const data = {
      rank: resRank,
      first_name: resFirstName,
      middle_name: resMiddleName,
      last_name: resLastName,
      email: resEmail,
      phone: resPhone,
      is_dorm_manager: false,
    };
    createPersonnel(data).then(() => {
      onClose();
    });
  };

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Typography variant="h6" style={{ marginLeft: 'auto', marginRight: 'auto' }}>New Resident</Typography>
          <TextField
            id="new-resident-rank"
            label="Rank"
            error={rankValidation.error && resRank.length > 0}
            variant="standard"
            onChange={(event) => { setRank(event.target.value); }}
          />
          <TextField
            id="new-resident-first-name"
            label="First Name"
            error={firstNameValidation.error && resFirstName.length > 0}
            variant="standard"
            onChange={(event) => { setFirstName(event.target.value); }}
          />
          <TextField
            id="new-resident-middle-name"
            label="Middle Name"
            error={middleNameValidation.error && resMiddleName.length > 0}
            variant="standard"
            onChange={(event) => { setMiddleName(event.target.value); }}
          />
          <TextField
            id="new-resident-last-name"
            label="Last Name"
            error={lastNameValidation.error && resLastName.length > 0}
            variant="standard"
            onChange={(event) => { setLastName(event.target.value); }}
          />
          <TextField
            id="new-resident-email"
            label="Email"
            error={emailValidation.error && resEmail.length > 0}
            variant="standard"
            onChange={(event) => { setEmail(event.target.value); }}
          />
          <TextField
            id="new-resident-phone"
            label="Phone Number"
            error={phoneValidation.error && resPhone.length > 0}
            variant="standard"
            onChange={(event) => { setPhone(event.target.value); }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              disabled={
                rankValidation.error
                || firstNameValidation.error
                || middleNameValidation.error
                || lastNameValidation.error
                || emailValidation.error
                || phoneValidation.error
              }
              onClick={submitResident}
            >
              Create
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

NewResidentDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewResidentDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewResidentDialog;
