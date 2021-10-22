import React from 'react';
import PropTypes from 'prop-types';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';

import getRoom from '../api/getRooms';
import createRoomInspection from '../api/createRoomInspection';

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
  const [rooms, setRooms] = React.useState([]);

  const [resRoom, setRoom] = React.useState(0);
  const [resTimestamp, setTimestamp] = React.useState(new Date());
  const [resInspectorName, setInspectorName] = React.useState('');
  const [resInspectorRemarks, setInspectorRemarks] = React.useState('');

  React.useState(() => {
    getRoom().then((responseData) => setRooms(responseData));
  });

  const submitInspection = () => {
    const data = {
      room_id: resRoom,
      timestamp: resTimestamp.toISOString(),
      inspector_name: resInspectorName,
      inspector_remarks: resInspectorRemarks,
    };
    createRoomInspection(data).then(() => {
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
          <InputLabel id="room-selector-label">Room</InputLabel>
          <Select
            labelId="room-selector-label"
            label="Room"
            disabled={rooms.length === 0}
            onChange={(event) => { setRoom(event.target.value); }}
          >
            <MenuItem value={0} disabled><em>Please select a room...</em></MenuItem>
            {
              rooms.map((room) => (
                <MenuItem value={room.id}>
                  {
                    `
                      ${room.room_number}
                      (${room.buildingObject.building_name})
                    `
                  }
                </MenuItem>
              ))
            }
          </Select>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
              label="Timestamp"
              value={resTimestamp}
              onChange={(newTimestamp) => {
                setTimestamp(newTimestamp);
              }}
            />
          </LocalizationProvider>
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
            <Button
              variant="contained"
              onClick={submitInspection}
              disabled={resRoom <= 0}
            >
              Create
            </Button>
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
