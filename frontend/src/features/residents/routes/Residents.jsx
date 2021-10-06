import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { ResidentList } from '../components/ResidentList';
import { NewResidentDialog } from '../components/NewResidentDialog';
import { ViewResidentDetailsDialog } from '../components/ViewResidentDetailsDialog';

export const Residents = () => {
  const [currentResidentListSelection, setResidentListSelection] = React.useState([]);
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
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => setNewResidentDialogOpen(true)}
          >
            New
          </Button>
          <Button
            variant="contained"
            onClick={() => setViewResidentDialogOpen(true)}
            disabled={currentResidentListSelection.length !== 1}
          >
            View
          </Button>
        </Stack>
        <ResidentList onSelectionChange={setResidentListSelection} />
      </Stack>
    </ContentLayout>
  );
};

export default Residents;
