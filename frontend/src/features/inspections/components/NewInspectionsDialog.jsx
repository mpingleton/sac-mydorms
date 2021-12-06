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
  Typography,
} from '@mui/material';

import { BuildingSelector } from '@/components/BuildingSelector';
import { RoomSelector } from '@/components/RoomSelector';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';
import getMyEnrollment from '@/api/getMyEnrollment';
import createRoomInspection from '@/api/createRoomInspection';
import getRoomAssignmentsByRoom from '@/api/getRoomAssignmentsByRoom';

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

export const NewInspectionsDialog = ({ modalOpen, onClose }) => {
  const [userEnrollment, setUserEnrollment] = React.useState({});
  const [personnelInRoom, setPersonnelInRoom] = React.useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = React.useState(0);
  const [resRoom, setRoom] = React.useState(0);
  const [resPersonId, setPersonId] = React.useState(0);
  const [resTimestamp, setTimestamp] = React.useState(new Date());
  const [resInspectorName, setInspectorName] = React.useState('');
  const [resInspectorRemarks, setInspectorRemarks] = React.useState('');

  const roomValidation = Joi.number().integer().min(1).required()
    .validate(resRoom);
  const personIdValidation = Joi.number().integer().min(1).required()
    .validate(resPersonId);
  const timestampValidation = Joi.number().integer().max(new Date().getTime())
    .validate(resTimestamp.getTime());
  const inspectorNameValidation = Joi.string().min(1).max(150).required()
    .validate(resInspectorName);
  const inspectorRemarksValidation = Joi.string().min(1).max(150).required()
    .validate(resInspectorRemarks);

  const { checkAccess } = useAuthorization();
  const { user } = useAuth();

  React.useEffect(() => {
    if (resRoom > 0) {
      getRoomAssignmentsByRoom(resRoom).then((roomAssignments) => {
        const p = [];
        roomAssignments.map((rm) => p.push(rm.personnelObject));
        setPersonnelInRoom(p);
      });
    }

    if (checkAccess({ allowedRoles: [ROLES.USER] })) {
      getMyEnrollment()
        .then((responseData) => {
          setUserEnrollment(responseData);
        });
    }
  }, [resRoom, user.id, checkAccess]);

  if (userEnrollment === undefined) {
    return null;
  }

  const submitInspection = () => {
    const data = {
      room_id: resRoom,
      timestamp: resTimestamp.toISOString(),
      resident_id: resPersonId,
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
          <Typography
            variant="h6"
            color="text.primary"
            style={{ marginLeft: 'auto', marginRight: 'auto' }}
          >
            New Inspection
          </Typography>
          <InputLabel id="room-selector-label">Room</InputLabel>
          <BuildingSelector
            baseId={userEnrollment.personnelObject.base_id}
            buildingId={selectedBuildingId}
            onSelectionChanged={(buildingId) => setSelectedBuildingId(buildingId)}
          />
          <RoomSelector
            buildingId={selectedBuildingId}
            roomId={resRoom}
            onSelectionChanged={(roomId) => setRoom(roomId)}
          />
          <InputLabel id="room-selector-label">For Resident</InputLabel>
          <Select
            labelId="resident-selector-label"
            label="Assigned Resident"
            error={personIdValidation.error}
            disabled={personnelInRoom.length === 0}
            onChange={(event) => { setPersonId(event.target.value); }}
          >
            <MenuItem value={0} disabled><em>Please select a resident...</em></MenuItem>
            {
              personnelInRoom.map((person) => (
                <MenuItem value={person.id}>
                  {
                   `
                    ${person.rank}
                    ${person.first_name}
                    ${person.last_name}
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
            error={inspectorNameValidation.error && resInspectorName.length > 0}
            variant="outlined"
            onChange={(event) => { setInspectorName(event.target.value); }}
          />
          <TextField
            id="filled-multiline-static"
            label="Comments"
            error={inspectorRemarksValidation.error && resInspectorRemarks.length > 0}
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
              disabled={
                roomValidation.error
                || personIdValidation.error
                || timestampValidation.error
                || inspectorNameValidation.error
                || inspectorRemarksValidation.error
              }
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
