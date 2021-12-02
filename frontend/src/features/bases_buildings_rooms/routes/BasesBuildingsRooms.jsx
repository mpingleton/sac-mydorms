import React from 'react';

import {
  Stack,
  Button,
} from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { BaseList } from '../components/BaseList';
import { BuildingList } from '../components/BuildingList';
import { RoomList } from '../components/RoomList';

export const BasesBuildingsRooms = () => {
  const [selectedBaseId, setSelectedBaseId] = React.useState(0);
  const [selectedBuildingId, setSelectedBuildingId] = React.useState(0);
  const [selectedRoomId, setSelectedRoomId] = React.useState(0);

  return (
    <ContentLayout title="Manage Bases, Buildings, and Rooms">
      <Stack
        direction="row"
        justifyContent="space-evenly"
        spacing={1}
        sx={{ width: '100%', height: '100%' }}
      >
        <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
          <Stack direction="row" spacing={1}>
          </Stack>
          <BaseList
            baseId={selectedBaseId}
            onSelectionChanged={(baseId) => {
              setSelectedBaseId(baseId);
              setSelectedBuildingId(0);
              setSelectedRoomId(0);
            }}
          />
        </Stack>
        <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
          <Stack direction="row" spacing={1}>
          </Stack>
          <BuildingList
            baseId={selectedBaseId}
            buildingId={selectedBuildingId}
            onSelectionChanged={(buildingId) => {
              setSelectedBuildingId(buildingId);
              setSelectedRoomId(0);
            }}
          />
        </Stack>
        <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
          <Stack direction="row" spacing={1}>
          </Stack>
          <RoomList
            buildingId={selectedBuildingId}
            roomId={selectedRoomId}
            onSelectionChanged={(roomId) => {
              setSelectedRoomId(roomId);
            }}
          />
        </Stack>
      </Stack>
    </ContentLayout>
  );
};

export default BasesBuildingsRooms;
