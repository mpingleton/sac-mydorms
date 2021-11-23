import React from 'react';

import { Stack, Button } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { EventList } from '../components/EventList';
import { NewEventDialog } from '../components/NewEventDialog';

export const Events = () => {
  const [isNewEventDialogOpen, setNewEventDialogOpen] = React.useState(false);

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
        </Stack>
        <EventList />
      </Stack>
    </ContentLayout>
  );
};

export default Events;
