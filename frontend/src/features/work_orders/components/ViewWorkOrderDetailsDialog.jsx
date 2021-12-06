/* eslint-disable no-else-return */

import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography, TextField, Select, InputLabel, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';
import getMyEnrollment from '@/api/getMyEnrollment';
import getWorkOrderById from '@/api/getWorkOrderById';
import getCommentsByWorkOrderId from '@/api/getCommentsByWorkOrderId';
import createWorkOrderComment from '@/api/createWorkOrderComment';
import getPersonnelById from '@/api/getPersonnelById';
import updateWorkOrderStatus from '@/api/updateWorkOrderStatus';

const Joi = require('joi');

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ViewWorkOrderDetailsDialog = ({ modalOpen, onClose, workOrderId }) => {
  const [userEnrollment, setUserEnrollment] = React.useState({});
  const [workOrder, setWorkOrder] = React.useState({});
  const [workOrderComments, setWorkOrderComments] = React.useState([]);
  const [newWorkOrderComment, setNewWorkOrderComment] = React.useState('');
  const [personnelObject, setPersonnelObject] = React.useState({});

  const { checkAccess } = useAuthorization();
  const { user } = useAuth();

  React.useEffect(() => {
    if (checkAccess({ allowedRoles: [ROLES.USER] })) {
      getMyEnrollment()
        .then((responseData) => {
          setUserEnrollment(responseData);
        });
    }

    if (workOrderId > 0) {
      getWorkOrderById(workOrderId).then((workOrderResponse) => {
        setWorkOrder(workOrderResponse);
        getPersonnelById(workOrderResponse.created_by).then(
          (responseData) => setPersonnelObject(responseData),
        );
      });
      getCommentsByWorkOrderId(workOrderId).then(
        (responseData) => setWorkOrderComments(responseData),
      );
    }
  }, [user.id, workOrderId, checkAccess]);

  if (workOrder.id === undefined) {
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

  const newWorkOrderCommentValidation = Joi.string().min(1).max(250).required()
    .validate(newWorkOrderComment);

  const submitComment = () => {
    const data = {
      workOrderId,
      comment: newWorkOrderComment,
    };

    createWorkOrderComment(data).then(() => {
      setNewWorkOrderComment('');
      getCommentsByWorkOrderId(workOrderId).then(
        (responseData) => setWorkOrderComments(responseData),
      );
    });
  };

  const statusString = (status) => {
    if (status === 0) {
      return 'Not Started';
    } else if (status === 1) {
      return 'In Progress';
    } else if (status === 2) {
      return 'Stalled';
    } else if (status === 3) {
      return 'Complete';
    }
    return '';
  };

  const commentColumns = [
    { field: 'timestamp', headerName: 'Timestamp', width: 100 },
    { field: 'by', headerName: 'By', width: 150 },
    { field: 'comment', headerName: 'Comment', width: 390 },
  ];

  const commentRows = workOrderComments.map((comment) => (
    {
      id: comment.id,
      by: `${comment.personnelObject.rank} ${comment.personnelObject.first_name} ${comment.personnelObject.last_name}`,
      timestamp: new Date(comment.timestamp).toLocaleString(),
      comment: comment.comment,
    }
  ));

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
            <Typography color="text.secondary">Subject:</Typography>
            <Typography color="text.primary">{workOrder.subject}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">Room:</Typography>
            <Typography color="text.primary">
              {
                `
                ${workOrder.roomObject.room_number}
                (${workOrder.roomObject.buildingObject.building_name})
                `
              }
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">Created by:</Typography>
            <Typography color="text.primary">
              {
                `${personnelObject.rank}
                ${personnelObject.first_name}
                ${personnelObject.last_name}`
              }
            </Typography>
            <Typography color="text.secondary">at:</Typography>
            <Typography color="text.primary">
              {new Date(workOrder.created_timestamp).toLocaleString()}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">Remarks:</Typography>
            <Typography color="text.primary">{workOrder.creator_remarks}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <InputLabel id="work-order-status-label">Status:</InputLabel>
            {isDormManager() ? (
              <Select
                labelId="work-order-status-label"
                id="work-order-status"
                label="Status"
                value={workOrder.status}
                onChange={(event) => {
                  updateWorkOrderStatus(workOrder.id, event.target.value)
                    .then(() => {
                      getWorkOrderById(workOrderId)
                        .then((responseData) => setWorkOrder(responseData));
                    });
                }}
              >
                <MenuItem value={0}>Not Started</MenuItem>
                <MenuItem value={1}>In Progress</MenuItem>
                <MenuItem value={2}>Stalled</MenuItem>
                <MenuItem value={3}>Complete</MenuItem>
              </Select>
            ) : (<Typography color="text.primary">{statusString(workOrder.status)}</Typography>)}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography color="text.secondary">Comments:</Typography>
          </Stack>
          <Stack direction="row" spacing={1} sx={{ height: 300 }}>
            <DataGrid
              rows={commentRows}
              columns={commentColumns}
              pageSize={20}
              rowsPerPageOptions={[5]}
              disableMultipleSelection
            />
          </Stack>
          {isDormManager() && (
            <Stack direction="row" spacing={1}>
              <TextField
                id="new-work-order-comment"
                label={`Comment: (${newWorkOrderComment.length}/250)`}
                error={newWorkOrderCommentValidation.error && newWorkOrderComment.length > 0}
                variant="standard"
                multiline
                maxRows={3}
                value={newWorkOrderComment}
                onChange={(event) => { setNewWorkOrderComment(event.target.value); }}
                sx={{ width: '100%' }}
              />
              <Button
                variant="contained"
                onClick={submitComment}
                disabled={newWorkOrderCommentValidation.error}
              >
                Send
              </Button>
            </Stack>
          )}
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

ViewWorkOrderDetailsDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  workOrderId: PropTypes.number,
};

ViewWorkOrderDetailsDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
  workOrderId: 0,
};

export default ViewWorkOrderDetailsDialog;
