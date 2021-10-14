import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import getWorkOrderById from '../api/getWorkOrderById';
import getCommentsByWorkOrderId from '../api/getCommentsByWorkOrderId';
import createWorkOrderComment from '../api/createWorkOrderComment';

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

  React.useEffect(() => {
    if (workOrder.id !== workOrderId && workOrderId > 0) {
      getWorkOrderById(workOrderId).then((responseData) => setWorkOrder(responseData));
      getCommentsByWorkOrderId(workOrderId).then(
        (responseData) => setWorkOrderComments(responseData),
      );
    }
  });

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

  const commentRows = workOrderComments.map((comment) => (
    {
      id: comment.id,
      by: comment.personnel_id,
      timestamp: comment.timestamp,
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
            <Typography>{workOrder.room_id}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Created by:</Typography>
            <Typography>{workOrder.created_by}</Typography>
            <Typography>at:</Typography>
            <Typography>{workOrder.created_timestamp}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Remarks:</Typography>
            <Typography>{workOrder.creator_remarks}</Typography>
          </Stack>
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
              label="Comment"
              variant="standard"
              multiline
              maxRows={3}
              value={newWorkOrderComment}
              onChange={(event) => { setNewWorkOrderComment(event.target.value); }}
              sx={{ width: '100%' }}
            />
            <Button variant="contained" onClick={submitComment} disabled={newWorkOrderComment.length === 0}>Send</Button>
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
