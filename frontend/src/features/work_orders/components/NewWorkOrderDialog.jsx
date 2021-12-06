/* eslint-disable no-else-return */

import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Button, TextField, Stack, Typography } from '@mui/material';
import { BuildingSelector } from '@/components/BuildingSelector';
import { RoomSelector } from '@/components/RoomSelector';
import { RoomAssignmentSelector } from './RoomAssignmentSelector';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';
import getMyEnrollment from '@/api/getMyEnrollment';
import createWorkOrder from '@/api/createWorkOrder';

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

export const NewWorkOrderDialog = ({ modalOpen, onCreate, onClose }) => {
  const [userEnrollment, setUserEnrollment] = React.useState({});
  const [selectedBuildingId, setSelectedBuildingId] = React.useState(0);
  const [selectedRoomId, setSelectedRoomId] = React.useState(0);
  const [resSubject, setSubject] = React.useState('');
  const [resRemarks, setRemarks] = React.useState('');

  const { checkAccess } = useAuthorization();
  const { user } = useAuth();

  React.useEffect(() => {
    if (checkAccess({ allowedRoles: [ROLES.USER] })) {
      getMyEnrollment()
        .then((responseData) => {
          setUserEnrollment(responseData);
        });
    }
  }, [user.id, checkAccess]);

  if (userEnrollment.id === undefined) {
    return null;
  }

  const isDormManager = () => {
    if (checkAccess({ allowedRoles: [ROLES.USER] })
      && userEnrollment.personnelObject !== undefined) {
      return userEnrollment.personnelObject.is_dorm_manager;
    } else {
      return false;
    }
  };

  const subjectValidation = Joi.string().min(1).max(150).required()
    .validate(resSubject);
  const roomIdValidation = Joi.number().integer().min(1).required()
    .validate(selectedRoomId);
  const remarksValidation = Joi.string().min(1).max(150).required()
    .validate(resRemarks);

  const submitWorkOrder = () => {
    const data = {
      subject: resSubject,
      room_id: selectedRoomId,
      remarks: resRemarks,
    };

    createWorkOrder(data).then(() => {
      onClose();
      onCreate();
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
            New Work Order
          </Typography>
          {isDormManager() ? (
            <Stack direction="column" spacing={1}>
              <BuildingSelector
                baseId={userEnrollment.personnelObject.base_id}
                buildingId={selectedBuildingId}
                onSelectionChanged={(buildingId) => {
                  setSelectedBuildingId(buildingId);
                  setSelectedRoomId(0);
                }}
              />
              <RoomSelector
                buildingId={selectedBuildingId}
                roomId={selectedRoomId}
                onSelectionChanged={(roomId) => { setSelectedRoomId(roomId); }}
              />
            </Stack>
          ) : (
            <RoomAssignmentSelector
              personnelId={userEnrollment.personnel_id}
              roomId={selectedRoomId}
              onSelectionChanged={(roomId) => { setSelectedRoomId(roomId); }}
            />
          )}
          <TextField
            id="new-work-order-subject"
            label="Subject"
            error={subjectValidation.error && resSubject.length > 0}
            variant="standard"
            onChange={(event) => { setSubject(event.target.value); }}
          />
          <TextField
            id="new-work-order-remarks"
            label="Remarks"
            variant="standard"
            error={remarksValidation.error && resRemarks.length > 0}
            multiline
            maxRows={3}
            onChange={(event) => { setRemarks(event.target.value); }}
          />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={submitWorkOrder}
              disabled={
                subjectValidation.error
                || roomIdValidation.error
                || remarksValidation.error
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

NewWorkOrderDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onCreate: PropTypes.func,
  onClose: PropTypes.func,
};

NewWorkOrderDialog.defaultProps = {
  modalOpen: false,
  onCreate: () => {},
  onClose: () => {},
};

export default NewWorkOrderDialog;
