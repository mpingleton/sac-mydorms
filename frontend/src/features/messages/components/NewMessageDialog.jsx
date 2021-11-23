import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Stack, TextField, Select, MenuItem, Button } from '@mui/material';

import getPersonnel from '@/api/getPersonnel';
import sendMessage from '@/api/sendMessage';

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
    getPersonnel().then((data) => setPersonnel(data));
  }, []);

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
          <Select
            label="To"
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
            onChange={(event) => setSubject(event.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
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
              disabled={resSubject.length === 0 || resMessageBody.length === 0}
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
