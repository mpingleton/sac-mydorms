import React from 'react';

import { Box, Modal, Button } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { ResidentList } from '../components/ResidentList';

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

export const Residents = () => {
  const [modalOpen, setModalState] = React.useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  return (
    <ContentLayout title="Residents">
      <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          Hello!
          <Button
            variant="contained"
            onClick={closeModal}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={openModal}
      >
        New Resident
      </Button>
      <ResidentList />
    </ContentLayout>
  );
};

export default Residents;
