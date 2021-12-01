import React from 'react';

import {
  Stack,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { EventList } from '../components/EventList';
import { NewEventDialog } from '../components/NewEventDialog';
import { BaseSelector } from '@/components/BaseSelector';
import { PersonnelSelector } from '@/components/PersonnelSelector';

export const Events = () => {
  const [isNewEventDialogOpen, setNewEventDialogOpen] = React.useState(false);

  const [filterType, setFilterType] = React.useState('all');
  const [selectedBaseId, setSelectedBaseId] = React.useState(0);
  const [selectedPersonnelId, setSelectedPersonnelId] = React.useState(0);

  let filterSelectors = null;
  if (filterType === 'inbase') {
    filterSelectors = (
      <BaseSelector
        baseId={selectedBaseId}
        onSelectionChanged={(baseId) => {
          setSelectedBaseId(baseId);
          setSelectedPersonnelId(0);
        }}
      />
    );
  } else if (filterType === 'inperson') {
    filterSelectors = (
      <Stack direction="row" spacing={1}>
        <BaseSelector
          baseId={selectedBaseId}
          onSelectionChanged={(baseId) => {
            setSelectedBaseId(baseId);
            setSelectedPersonnelId(0);
          }}
        />
        <PersonnelSelector
          baseId={selectedBaseId}
          personnelId={selectedPersonnelId}
          onSelectionChanged={(personnelId) => {
            setSelectedPersonnelId(personnelId);
          }}
        />
      </Stack>
    );
  }

  return (
    <ContentLayout title="Events">
      <NewEventDialog
        modalOpen={isNewEventDialogOpen}
        onClose={() => {
          setNewEventDialogOpen(false);
          window.location.reload();
        }}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setNewEventDialogOpen(true)}>New Event</Button>
          <ToggleButtonGroup
            value={filterType}
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
          >
            <ToggleButton value="inbase">In Selected Base</ToggleButton>
            <ToggleButton value="inmybase">In My Base</ToggleButton>
            <ToggleButton value="inperson">Posted By Selected Person</ToggleButton>
            <ToggleButton value="byme">Posted By Me</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>
          {filterSelectors}
        </Stack>
        <EventList
          listType={filterType}
          baseId={selectedBaseId}
          personnelId={selectedPersonnelId}
        />
      </Stack>
    </ContentLayout>
  );
};

export default Events;
