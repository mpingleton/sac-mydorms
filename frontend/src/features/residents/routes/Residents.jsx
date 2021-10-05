import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { ResidentList } from '../components/ResidentList';
import { NewResidentDialog } from '../components/NewResidentDialog';

export const Residents = () => {
  const [modalOpen, setModalState] = React.useState(false);
  const openModal = () => setModalState(true);
  const closeModal = () => setModalState(false);

  return (
    <ContentLayout title="Residents">
      <NewResidentDialog
        modalOpen={modalOpen}
        onClose={closeModal}
      />
      <Stack direction="column">
        <Stack direction="row">
          <Button
            variant="contained"
            onClick={openModal}
          >
            New Resident
          </Button>
        </Stack>
        <ResidentList />
      </Stack>
    </ContentLayout>
  );
};

export default Residents;
