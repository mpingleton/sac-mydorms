import React from 'react';
import PropTypes from 'prop-types';

import { Box, Modal, Typography } from '@mui/material';

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
        <Typography>{inspection.inspector_remarks}</Typography>
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
