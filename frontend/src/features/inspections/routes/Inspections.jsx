import React from 'react';

import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { InspectionsList } from '../components/InspectionsList';
import { NewInspectionsDialog } from '../components/NewInspectionsDialog';
import { ViewInspectionDetailsDialog } from '../components/ViewInspectionDetailsDialog';

export const Inspections = () => {
  const [currentInspectionSelection, setInspectionSelection] = React.useState([]);
  const [isNewInspectionDialogOpen, setNewInspectionDialogOpen] = React.useState(false);
  const [isViewInspectionDetailsDialogOpen,
    setViewInspectionDetailsDialogOpen] = React.useState(false);

  const [filterType, setFilterType] = React.useState('all');

  return (
    <ContentLayout title="Inspections">
      <NewInspectionsDialog
        modalOpen={isNewInspectionDialogOpen}
        onClose={() => {
          setNewInspectionDialogOpen(false);
          window.location.reload();
        }}
      />
      <ViewInspectionDetailsDialog
        modalOpen={isViewInspectionDetailsDialogOpen}
        onClose={() => {
          setViewInspectionDetailsDialogOpen(false);
        }}
        inspectionId={currentInspectionSelection[0]}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setNewInspectionDialogOpen(true)}>New</Button>
          <Button
            variant="contained"
            onClick={() => setViewInspectionDetailsDialogOpen(true)}
            disabled={currentInspectionSelection.length !== 1}
          >
            View
          </Button>
          <ToggleButtonGroup
            value={filterType}
            onChange={(event) => { setFilterType(event.target.value); }}
          >
            <ToggleButton value="inroom">For Selected Room</ToggleButton>
            <ToggleButton value="inresident">For Selected Resident</ToggleButton>
            <ToggleButton value="byme">Created By Me</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <InspectionsList
          listType={filterType}
          onSelectionChange={setInspectionSelection}
        />
      </Stack>
    </ContentLayout>
  );
};

export default Inspections;
