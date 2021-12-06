import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { RoomList } from '../components/RoomList';
import { ViewRoomDetailsDialog } from '../components/ViewRoomDetailsDialog';
import { AssignResidentDialog } from '../components/AssignResidentDialog';
import { BaseSelector } from '@/components/BaseSelector';
import { BuildingSelector } from '@/components/BuildingSelector';

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';
import getMyEnrollment from '@/api/getMyEnrollment';

export const Rooms = () => {
  const [userEnrollment, setUserEnrollment] = React.useState({});
  const [currentRoomListSelection, setRoomListSelection] = React.useState([]);
  const [isViewRoomDialogOpen, setViewRoomDialogOpen] = React.useState(false);
  const [isAssignResdientDialogOpen, setAssignResidentDialogOpen] = React.useState(false);
  const [selectedBaseId, setSelectedBaseId] = React.useState(0);
  const [selectedBuildingId, setSelectedBuildingId] = React.useState(0);

  const { checkAccess } = useAuthorization();
  const { user } = useAuth();

  React.useEffect(() => {
    if (checkAccess({ allowedRoles: [ROLES.USER] })) {
      getMyEnrollment()
        .then((responseData) => {
          setUserEnrollment(responseData);
          setSelectedBaseId(responseData.personnelObject.base_id);
        });
    }
  }, [user.id, checkAccess]);

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
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
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
          <BaseSelector
            baseId={selectedBaseId}
            disabled={userEnrollment.personnelObject !== undefined}
            onSelectionChanged={(baseId) => {
              setSelectedBaseId(baseId);
              setSelectedBuildingId(0);
            }}
          />
          <BuildingSelector
            baseId={selectedBaseId}
            buildingId={selectedBuildingId}
            onSelectionChanged={(buildingId) => setSelectedBuildingId(buildingId)}
          />
        </Stack>
        <RoomList
          buildingId={selectedBuildingId}
          onSelectionChange={setRoomListSelection}
        />
      </Stack>
    </ContentLayout>
  );
};

export default Rooms;
