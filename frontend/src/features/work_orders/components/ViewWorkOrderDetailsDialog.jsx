import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';

import getWorkOrderById from '../api/getWorkOrderById';

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

export const ViewWorkOrderDetailsDialog = ({ modalOpen, onClose, workOrderId }) => {
  const [workOrder, setWorkOrder] = React.useState({});

  React.useEffect(() => {
    if (workOrder.id !== workOrderId && workOrderId > 0) {
      getWorkOrderById(workOrderId).then((responseData) => setWorkOrder(responseData));
    }
  });

  if (workOrder.id === undefined) {
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
            <Button variant="contained" onClick={onClose}>Cancel</Button>
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
