import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography, TextField, Select, InputLabel, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import getWorkOrderById from '../api/getWorkOrderById';
import getCommentsByWorkOrderId from '../api/getCommentsByWorkOrderId';
import createWorkOrderComment from '../api/createWorkOrderComment';
import getPersonnelById from '../api/getPersonnelById';
import updateWorkOrderStatus from '../api/updateWorkOrderStatus';

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
  const [workOrder, setWorkOrder] = React.useState({});
  const [workOrderComments, setWorkOrderComments] = React.useState([]);
  const [newWorkOrderComment, setNewWorkOrderComment] = React.useState('');
  const [personnelObject, setPersonnelObject] = React.useState({});

  React.useEffect(() => {
    if (workOrder.id !== workOrderId && workOrderId > 0) {
      setPersonnelObject({});
      getWorkOrderById(workOrderId).then((responseData) => setWorkOrder(responseData));
      getCommentsByWorkOrderId(workOrderId).then(
        (responseData) => setWorkOrderComments(responseData),
      );
    }

    if (workOrder.id === workOrderId && personnelObject.id === undefined) {
      getPersonnelById(workOrder.created_by).then(
        (responseData) => setPersonnelObject(responseData),
      );
    }
  }, [
    workOrder.id,
    workOrder.room_id,
    workOrder.created_by,
    workOrderId,
    personnelObject.id,
  ]);

  if (workOrder.id === undefined) {
    return null;
  }

  const submitComment = () => {
    if (newWorkOrderComment.length === 0) {
      return;
    }

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

  const commentColumns = [
    { field: 'timestamp', headerName: 'Timestamp', width: 100 },
    { field: 'by', headerName: 'By', width: 150 },
    { field: 'comment', headerName: 'Comment', width: 390 },
  ];
  console.log(workOrderComments);
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
            <Typography>Subject:</Typography>
            <Typography>{workOrder.subject}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Room:</Typography>
            <Typography>
              {
                `
                ${workOrder.roomObject.room_number}
                (${workOrder.roomObject.buildingObject.building_name})
                `
              }
            </Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Created by:</Typography>
            <Typography>
              {
                `${personnelObject.rank}
                ${personnelObject.first_name}
                ${personnelObject.last_name}`
              }
            </Typography>
            <Typography>at:</Typography>
            <Typography>{new Date(workOrder.created_timestamp).toLocaleString()}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Remarks:</Typography>
            <Typography>{workOrder.creator_remarks}</Typography>
          </Stack>
          <InputLabel id="work-order-status-label">Status:</InputLabel>
          <Select
            labelId="work-order-status-label"
            id="work-order-status"
            label="Status"
            value={workOrder.status}
            onChange={(event) => {
              updateWorkOrderStatus(workOrder.id, event.target.value)
                .then(() => {
                  getWorkOrderById(workOrderId).then((responseData) => setWorkOrder(responseData));
                });
            }}
          >
            <MenuItem value={0}>Not Started</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Stalled</MenuItem>
            <MenuItem value={3}>Complete</MenuItem>
          </Select>
          <Stack direction="row" spacing={1}>
            <Typography>Comments:</Typography>
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
          <Stack direction="row" spacing={1}>
            <TextField
              id="new-work-order-comment"
              label={`Comment: (${newWorkOrderComment.length}/250)`}
              error={newWorkOrderComment.length > 250}
              variant="standard"
              multiline
              maxRows={3}
              value={newWorkOrderComment}
              onChange={(event) => { setNewWorkOrderComment(event.target.value); }}
              sx={{ width: '100%' }}
            />
            <Button variant="contained" onClick={submitComment} disabled={newWorkOrderComment.length === 0 || newWorkOrderComment.length > 250}>Send</Button>
          </Stack>
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
