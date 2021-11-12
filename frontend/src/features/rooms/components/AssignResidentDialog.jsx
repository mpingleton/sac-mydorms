import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import getRoomById from '@/api/getRoomById';
import getResidents from '@/api/getResidents';
import createRoomAssignment from '@/api/createRoomAssignment';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AssignResidentDialog = ({ modalOpen, onClose, roomId }) => {
  const [room, setRoom] = React.useState({});
  const [residents, setResidents] = React.useState([]);
  const [selectedResidents, setSelectedResidents] = React.useState([]);

  React.useEffect(() => {
    if (room.id !== roomId && roomId > 0) {
      getRoomById(roomId).then((responseData) => setRoom(responseData));
    }
    if (residents.length === 0) {
      getResidents().then((responseData) => setResidents(responseData));
    }
  });

  if (room.id === undefined || residents.length === 0) {
    return null;
  }

  const columns = [
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'first_name', headerName: 'First Name', width: 150 },
    { field: 'middle_name', headerName: 'Middle Name', width: 150 },
    { field: 'last_name', headerName: 'Last Name', width: 150 },
  ];

  const rows = residents.map((resident) => (
    {
      id: resident.id,
      rank: resident.rank,
      first_name: resident.first_name,
      middle_name: resident.middle_name,
      last_name: resident.last_name,
    }
  ));

  const submitRoomAssignment = () => {
    const promises = [];

    selectedResidents.forEach((residentId) => {
      promises.push(createRoomAssignment(residentId, roomId));
    });

    Promise.all(promises)
      .then(() => {
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
          <Typography>
            {`Select a resident to assign to room ${room.room_number}.`}
          </Typography>
          <Box sx={{ width: '100%', height: '300px' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={20}
              rowsPerPageOptions={[5]}
              onSelectionModelChange={setSelectedResidents}
              checkboxSelection
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={submitRoomAssignment}>Create</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

AssignResidentDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  roomId: PropTypes.number,
};

AssignResidentDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
  roomId: 0,
};

export default AssignResidentDialog;
