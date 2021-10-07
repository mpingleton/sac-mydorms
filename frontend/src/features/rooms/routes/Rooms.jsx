import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { RoomList } from '../components/RoomList';

export const Rooms = () => (
  <ContentLayout title="Rooms">
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1}>
        <Button
          variant="contained"
          onClick={() => {}}
        >
          View
        </Button>
        <Button
          variant="contained"
          onClick={() => {}}
        >
          Assign Resident
        </Button>
      </Stack>
      <RoomList />
    </Stack>
  </ContentLayout>
);

export default Rooms;
