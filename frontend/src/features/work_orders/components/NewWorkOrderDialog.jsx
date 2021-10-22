import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Button, TextField, Stack, Select, InputLabel, MenuItem } from '@mui/material';

import createWorkOrder from '../api/createWorkOrder';
import getRooms from '../api/getRooms';

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

export const NewWorkOrderDialog = ({ modalOpen, onClose }) => {
  const [resSubject, setSubject] = React.useState('');
  const [resRoomId, setRoomId] = React.useState(-1);
  const [resRemarks, setRemarks] = React.useState('');
  const [resRoomList, setRoomList] = React.useState([]);

  React.useState(() => {
    if (resRoomList.length === 0) {
      getRooms().then((roomsData) => setRoomList(roomsData));
    }
  });

  const submitIsEnabled = () => resRemarks.length !== 0
    && resRoomId >= 0
    && resSubject.length !== 0;

  const submitWorkOrder = () => {
    const data = {
      subject: resSubject,
      room_id: resRoomId,
      remarks: resRemarks,
    };

    createWorkOrder(data).then(() => {
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
            id="new-work-order-subject"
            label="Subject"
            variant="standard"
            onChange={(event) => { setSubject(event.target.value); }}
          />
          <InputLabel id="new-work-order-room-label">For Room</InputLabel>
          <Select
            labelId="new-work-order-room-label"
            id="new-work-order-room"
            label="For Room"
            onChange={(event) => { setRoomId(event.target.value); }}
          >
            {
              resRoomList.map((room) => (
                <MenuItem value={room.id}>
                  {`${room.room_number} (${room.buildingObject.building_name})`}
                </MenuItem>
              ))
            }
          </Select>
          <TextField
            id="new-work-order-remarks"
            label="Remarks"
            variant="standard"
            multiline
            maxRows={3}
            onChange={(event) => { setRemarks(event.target.value); }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={submitWorkOrder} disabled={!submitIsEnabled()}>Create</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

NewWorkOrderDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

NewWorkOrderDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
};

export default NewWorkOrderDialog;
