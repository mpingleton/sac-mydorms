import React from 'react';
import PropTypes from 'prop-types';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
  Box,
  Modal,
  Stack,
  Button,
  Typography,
  TextField,
} from '@mui/material';

import createEvent from '@/api/createEvent';

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

export const NewEventDialog = ({ modalOpen, onClose }) => {
  const [resScheduled, setScheduled] = React.useState(new Date());
  const [resSubject, setSubject] = React.useState('');
  const [resLocation, setLocation] = React.useState('');
  const [resDesc, setDesc] = React.useState('');

  const scheduledValidation = Joi.number().integer().min(new Date().getTime())
    .validate(resScheduled.getTime());
  const subjectValidation = Joi.string().min(1).max(150).required()
    .validate(resSubject);
  const locationValidation = Joi.string().min(1).max(150).required()
    .validate(resLocation);
  const descValidation = Joi.string().max(1000)
    .validate(resDesc);

  const submitEvent = () => {
    createEvent(
      resScheduled.toISOString(),
      resLocation,
      resSubject,
      resDesc,
    ).then(() => { onClose(); });
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
          <Typography variant="h6" style={{ marginLeft: 'auto', marginRight: 'auto' }}>New Event</Typography>
          <TextField
            variant="outlined"
            label="Subject"
            error={subjectValidation.error && resSubject.length > 0}
            onChange={(event) => setSubject(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Scheduled"
              value={resScheduled}
              onChange={(newTimestamp) => {
                setScheduled(newTimestamp);
              }}
            />
          </LocalizationProvider>
          <TextField
            variant="outlined"
            label="Location"
            error={locationValidation.error && resLocation.length > 0}
            onChange={(event) => setLocation(event.target.value)}
          />
          <TextField
            variant="outlined"
            label="Description"
            error={descValidation.error && resDesc.length > 0}
            multiline
            rows={4}
            onChange={(event) => setDesc(event.target.value)}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={submitEvent}
              disabled={
                scheduledValidation.error
                || subjectValidation.error
                || locationValidation.error
                || descValidation.error
              }
            >
              Post
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

NewEventDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewEventDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewEventDialog;
