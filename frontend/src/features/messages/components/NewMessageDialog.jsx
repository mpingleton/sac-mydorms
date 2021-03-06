import React from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Modal,
  Stack,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';

import getPersonnelInMyBase from '@/api/getPersonnelInMyBase';
import sendMessage from '@/api/sendMessage';

const Joi = require('joi');

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

export const NewMessageDialog = ({ modalOpen, onClose }) => {
  const [personnel, setPersonnel] = React.useState([]);
  const [resRecipientId, setRecipientId] = React.useState(-1);
  const [resSubject, setSubject] = React.useState('');
  const [resMessageBody, setMessageBody] = React.useState('');

  React.useEffect(() => {
    getPersonnelInMyBase().then((data) => setPersonnel(data));
  }, []);

  const recipientIdValidation = Joi.number().integer().min(1).required()
    .validate(resRecipientId);
  const subjectValidation = Joi.string().min(1).max(150).required()
    .validate(resSubject);
  const messageBodyValidation = Joi.string().min(1).max(1000).required()
    .validate(resMessageBody);

  const send = () => {
    sendMessage(resRecipientId, resSubject, resMessageBody).then(() => { onClose(); });
  };

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction="column" spacing={1}>
          <Typography
            variant="h6"
            color="text.primary"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            New Messsage
          </Typography>
          <Select
            label="To"
            error={recipientIdValidation.error}
            onChange={(event) => setRecipientId(event.target.value)}
          >
            <MenuItem value={0} disabled>
              <em>Please select a person to send this message to...</em>
            </MenuItem>
            {personnel.map((person) => (
              <MenuItem value={person.id}>
                {`
                  ${person.rank}
                  ${person.first_name}
                  ${person.middle_name}
                  ${person.last_name}
                `}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Subject"
            variant="outlined"
            error={subjectValidation.error && resSubject.length > 0}
            onChange={(event) => setSubject(event.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            error={messageBodyValidation.error && resMessageBody.length > 0}
            multiline
            rows={4}
            onChange={(event) => setMessageBody(event.target.value)}
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
                recipientIdValidation.error
                || subjectValidation.error
                || messageBodyValidation.error
              }
              onClick={() => send()}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

NewMessageDialog.propTypes = {
  modalOpen: PropTypes.func,
  onClose: PropTypes.func,
};

NewMessageDialog.defaultProps = {
  modalOpen: () => {},
  onClose: () => {},
};

export default NewMessageDialog;
