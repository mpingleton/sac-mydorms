import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { RoomList } from '../components/RoomList';
import { ViewRoomDetailsDialog } from '../components/ViewRoomDetailsDialog';
import { AssignResidentDialog } from '../components/AssignResidentDialog';

export const Rooms = () => {
  const [currentRoomListSelection, setRoomListSelection] = React.useState([]);
  const [isViewRoomDialogOpen, setViewRoomDialogOpen] = React.useState(false);
  const [isAssignResdientDialogOpen, setAssignResidentDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Rooms">
      <ViewRoomDetailsDialog
        modalOpen={isViewRoomDialogOpen}
        onClose={() => setViewRoomDialogOpen(false)}
        roomId={currentRoomListSelection[0]}
      />
      <AssignResidentDialog
        modalOpen={isAssignResdientDialogOpen}
        onClose={() => setAssignResidentDialogOpen(false)}
        roomId={currentRoomListSelection[0]}
      />
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => setViewRoomDialogOpen(true)}
            disabled={currentRoomListSelection.length !== 1}
          >
            View
          </Button>
          <Button
            variant="contained"
            onClick={() => setAssignResidentDialogOpen(true)}
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