import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { ResidentList } from '../components/ResidentList';
import { NewResidentDialog } from '../components/NewResidentDialog';
import { ViewResidentDetailsDialog } from '../components/ViewResidentDetailsDialog';

export const Residents = () => {
  const [isNewResidentDialogOpen, setNewResidentDialogOpen] = React.useState(false);
  const [isViewResidentDialogOpen, setViewResidentDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Residents">
      <NewResidentDialog
        modalOpen={isNewResidentDialogOpen}
        onClose={() => setNewResidentDialogOpen(false)}
      />
      <ViewResidentDetailsDialog
        modalOpen={isViewResidentDialogOpen}
        onClose={() => setViewResidentDialogOpen(false)}
      />
      <Stack direction="column">
        <Stack direction="row">
          <Button
            variant="contained"
            onClick={() => setNewResidentDialogOpen(true)}
          >
            New
          </Button>
          <Button
            variant="contained"
            onClick={() => setViewResidentDialogOpen(true)}
          >
            View
          </Button>
          <Button
            variant="contained"
            onClick={() => {}}
          >
            Assign To Room
          </Button>
        </Stack>
        <ResidentList />
      </Stack>
    </ContentLayout>
  );
};

export default Residents;
