import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Modal, Stack, TextField } from '@mui/material';

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
  const [resRoom, setRoom] = React.useState('');
  const [resInspectorName, setInspectorName] = React.useState('');
  const [resInspectorRemarks, setInspectorRemarks] = React.useState('');

  const submitInspection = () => {
    const data = {
      room_id: resRoom,
      inspector_name: resInspectorName,
      inspector_remarks: resInspectorRemarks,
    };

    console.log(data);
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
            id="room"
            label="Room"
            variant="outlined"
            onChange={(event) => { setRoom(event.target.value); }}
          />
          <TextField
            id="inspector"
            label="Inspector"
            variant="outlined"
            onChange={(event) => { setInspectorName(event.target.value); }}
          />
          <TextField
            id="filled-multiline-static"
            label="Comments"
            multiline
            rows={4}
            variant="outlined"
            onChange={(event) => { setInspectorRemarks(event.target.value); }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={submitInspection}>Create</Button>
          </Stack>
        </Stack>
      </Box>
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
