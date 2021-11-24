import React from 'react';
import PropTypes from 'prop-types';

import { Button, Box, Modal, Stack, Typography } from '@mui/material';

import { EnrollmentDetails } from './EnrollmentDetails';

import getPersonnelById from '@/api/getPersonnelById';

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

export const ViewResidentDetailsDialog = ({ modalOpen, onClose, residentId }) => {
  const [resident, setResident] = React.useState({});

  React.useEffect(() => {
    if (resident.id !== residentId && residentId > 0) {
      getPersonnelById(residentId).then((responseData) => setResident(responseData));
    }
  });

  if (resident.id === undefined) {
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
            <Typography>{resident.rank}</Typography>
            <Typography>{resident.first_name}</Typography>
            <Typography>{resident.middle_name}</Typography>
            <Typography>{resident.last_name}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Phone:</Typography>
            <Typography>{resident.phone}</Typography>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Typography>Email:</Typography>
            <Typography>{resident.email}</Typography>
          </Stack>
          <EnrollmentDetails personnelId={resident.id} />
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={onClose}>Close</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

ViewResidentDetailsDialog.propTypes = {
  modalOpen: PropTypes.bool,
  onClose: PropTypes.func,
  residentId: PropTypes.number,
};

ViewResidentDetailsDialog.defaultProps = {
  modalOpen: false,
  onClose: () => {},
  residentId: 0,
};

export default ViewResidentDetailsDialog;
