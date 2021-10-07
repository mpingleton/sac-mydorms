import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Button, TextField, Stack } from '@mui/material';

import createResident from '../api/createResident';

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
  const [resFirstName, setFirstName] = React.useState('');
  const [resMiddleName, setMiddleName] = React.useState('');
  const [resLastName, setLastName] = React.useState('');
  const [resEmail, setEmail] = React.useState('');
  const [resPhone, setPhone] = React.useState('');

  const submitResident = () => {
    const data = {
      rank: 'DbA',
      first_name: resFirstName,
      middle_name: resMiddleName,
      last_name: resLastName,
      email: resEmail,
      phone: resPhone,
    };
    createResident(data).then(() => {
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
          <TextField
            id="new-resident-first-name"
            label="First Name"
            variant="standard"
            onChange={(event) => { setFirstName(event.target.value); }}
          />
          <TextField
            id="new-resident-middle-name"
            label="Middle Name"
            variant="standard"
            onChange={(event) => { setMiddleName(event.target.value); }}
          />
          <TextField
            id="new-resident-last-name"
            label="Last Name"
            variant="standard"
            onChange={(event) => { setLastName(event.target.value); }}
          />
          <TextField
            id="new-resident-email"
            label="Email"
            variant="standard"
            onChange={(event) => { setEmail(event.target.value); }}
          />
          <TextField
            id="new-resident-phone"
            label="Phone Number"
            variant="standard"
            onChange={(event) => { setPhone(event.target.value); }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={submitResident}>Create</Button>
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
