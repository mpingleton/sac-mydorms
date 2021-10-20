import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';

import getRoomInspectionById from '../api/getRoomInspectionById';
import getRoomById from '../api/getRoomById';
import getResidentById from '../api/getResidentById';

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

export const ViewInspectionDetailsDialog = ({ modalOpen, onClose, inspectionId }) => {
  const [inspection, setInspection] = React.useState({});
  const [roomObject, setRoomObject] = React.useState({});
  const [personnelObject, setPersonnelObject] = React.useState({});
  const [dormManagerPersonnelObject, setDormManagerPersonnelObject] = React.useState({});

  React.useEffect(() => {
    if (inspection.id !== inspectionId && inspectionId > 0) {
      setRoomObject({});
      setPersonnelObject({});
      getRoomInspectionById(inspectionId).then((responseData) => setInspection(responseData));
    }

    if (inspection.id === inspectionId && roomObject.id === undefined) {
      getRoomById(inspection.room_id).then((responseData) => setRoomObject(responseData));
    }

    if (inspection.id === inspectionId && personnelObject.id === undefined) {
      getResidentById(inspection.personnel_id)
        .then((responseData) => setPersonnelObject(responseData));
    }

    if (inspection.id === inspectionId && dormManagerPersonnelObject.id === undefined) {
      getResidentById(inspection.dorm_manager_id)
        .then((responseData) => setDormManagerPersonnelObject(responseData));
    }
  }, [
    inspection.id,
    inspection.room_id,
    inspection.personnel_id,
    inspection.dorm_manager_id,
    inspectionId,
    roomObject.id,
    personnelObject.id,
    dormManagerPersonnelObject.id,
  ]);

  if (inspection.id === undefined) {
    return null;
  }

  return (
    <Modal
      open={modalOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1}>
            <Typography>Room:</Typography>
            <Typography>{roomObject.room_number}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Resident:</Typography>
            <Typography>
              {`
                ${personnelObject.rank}
                ${personnelObject.first_name}
                ${personnelObject.middle_name}
                ${personnelObject.last_name}
              `}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Dorm Manager:</Typography>
            <Typography>
              {`
                ${dormManagerPersonnelObject.rank}
                ${dormManagerPersonnelObject.first_name}
                ${dormManagerPersonnelObject.middle_name}
                ${dormManagerPersonnelObject.last_name}
              `}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Timestamp:</Typography>
            <Typography>{inspection.timestamp}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Inspector:</Typography>
            <Typography>{inspection.inspector_name}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Remarks:</Typography>
            <Typography>{inspection.inspector_remarks}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

ViewInspectionDetailsDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  inspectionId: PropTypes.number,
};

ViewInspectionDetailsDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
  inspectionId: 0,
};

export default ViewInspectionDetailsDialog;
