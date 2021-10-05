import React from 'react';

import { Button } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { ResidentList } from '../components/ResidentList';
import { NewResidentDialog } from '../components/NewResidentDialog';

export const Residents = () => {
  const [modalOpen, setModalState] = React.useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  return (
    <ContentLayout title="Residents">
      <Button
        variant="contained"
        onClick={openModal}
      >
        New Resident
      </Button>
      <NewResidentDialog
        modalOpen={modalOpen}
        onClose={closeModal}
      />
      <ResidentList />
    </ContentLayout>
  );
};

export default Residents;
