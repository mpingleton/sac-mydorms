import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { RoomList } from '../components/RoomList';

export const Rooms = () => {
  const [currentRoomListSelection, setRoomListSelection] = React.useState([]);

  return (
    <ContentLayout title="Rooms">
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => {}}
            disabled={currentRoomListSelection.length !== 1}
          >
            View
          </Button>
          <Button
            variant="contained"
            onClick={() => {}}
            disabled={currentRoomListSelection.length !== 1}
          >
            Assign Resident
          </Button>
        </Stack>
        <RoomList onSelectionChange={setRoomListSelection} />
      </Stack>
    </ContentLayout>
  );
};

export default Rooms;
