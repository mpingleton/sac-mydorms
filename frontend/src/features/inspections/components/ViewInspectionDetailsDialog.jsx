import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';

import getRoomInspectionById from '../api/getRoomInspectionById';

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

  React.useEffect(() => {
    if (inspection.id !== inspectionId && inspectionId > 0) {
      getRoomInspectionById(inspectionId).then((responseData) => setInspection(responseData));
    }
  });

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
            <Typography>{inspection.room_id}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Resident:</Typography>
            <Typography>{inspection.personnel_id}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Dorm Manager:</Typography>
            <Typography>{inspection.dorm_manager_id}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Timestamp:</Typography>
            <Typography>{inspection.timestamp}</Typography>
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
