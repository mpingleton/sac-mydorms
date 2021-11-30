import React from 'react';

import { Button, Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { BaseSelector } from '@/components/BaseSelector';
import { ResidentList } from '../components/ResidentList';
import { NewResidentDialog } from '../components/NewResidentDialog';
import { ViewResidentDetailsDialog } from '../components/ViewResidentDetailsDialog';

export const Residents = () => {
  const [currentResidentListSelection, setResidentListSelection] = React.useState([]);
  const [isNewResidentDialogOpen, setNewResidentDialogOpen] = React.useState(false);
  const [isViewResidentDialogOpen, setViewResidentDialogOpen] = React.useState(false);
  const [filterType, setFilterType] = React.useState('all');
  const [selectedBaseId, setSelectedBaseId] = React.useState(0);

  let filterSelectors = null;
  if (filterType === 'base') {
    filterSelectors = (
      <BaseSelector
        baseId={selectedBaseId}
        onSelectionChanged={(baseId) => {
          setSelectedBaseId(baseId);
        }}
      />
    );
  }

  return (
    <ContentLayout title="Residents">
      <NewResidentDialog
        modalOpen={isNewResidentDialogOpen}
        onClose={() => setNewResidentDialogOpen(false)}
      />
      <ViewResidentDetailsDialog
        modalOpen={isViewResidentDialogOpen}
        onClose={() => setViewResidentDialogOpen(false)}
        residentId={currentResidentListSelection[0]}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
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
          <ToggleButtonGroup
            value={filterType}
            onChange={(event) => { setFilterType(event.target.value); }}
            sx={{ marginLeft: 'auto' }}
          >
            <ToggleButton value="base">By Base</ToggleButton>
            <ToggleButton value="mybase">My Base</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>
          {filterSelectors}
        </Stack>
        <ResidentList
          listType={filterType}
          baseId={selectedBaseId}
          onSelectionChange={setResidentListSelection}
        />
      </Stack>
    </ContentLayout>
  );
};

export default Residents;
