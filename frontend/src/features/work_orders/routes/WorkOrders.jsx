import React from 'react';

import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { WorkOrderList } from '../components/WorkOrderList';
import { NewWorkOrderDialog } from '../components/NewWorkOrderDialog';
import { ViewWorkOrderDetailsDialog } from '../components/ViewWorkOrderDetailsDialog';
import { BaseSelector } from '../components/BaseSelector';
import { BuildingSelector } from '../components/BuildingSelector';
import { RoomSelector } from '../components/RoomSelector';

export const WorkOrders = () => {
  const [currentWorkOrderListSelection, setWorkOrderListSelection] = React.useState([]);
  const [isNewWorkOrderDialogOpen, setNewWorkOrderDialogOpen] = React.useState(false);
  const [isViewWorkOrderDialogOpen, setViewWorkOrderDialogOpen] = React.useState(false);
  const [filterType, setFilterType] = React.useState('me');
  const [selectedBaseId, setSelectedBaseId] = React.useState(0);
  const [selectedBuildingId, setSelectedBuildingId] = React.useState(0);
  const [selectedRoomId, setSelectedRoomId] = React.useState(0);

  let filterSelectors = null;
  if (filterType === 'room') {
    filterSelectors = (
      <Stack direction="row" spacing={1}>
        <BaseSelector
          baseId={selectedBaseId}
          onSelectionChanged={(baseId) => {
            setSelectedBaseId(baseId);
            setSelectedBuildingId(0);
            setSelectedRoomId(0);
          }}
        />
        <BuildingSelector
          baseId={selectedBaseId}
          buildingId={selectedBuildingId}
          onSelectionChanged={(buildingId) => {
            setSelectedBuildingId(buildingId);
            setSelectedRoomId(0);
          }}
        />
        <RoomSelector
          buildingId={selectedBuildingId}
          roomId={selectedRoomId}
          onSelectionChanged={(roomId) => { setSelectedRoomId(roomId); }}
        />
      </Stack>
    );
  }

  return (
    <ContentLayout title="Work Orders">
      <NewWorkOrderDialog
        modalOpen={isNewWorkOrderDialogOpen}
        onClose={() => {
          setNewWorkOrderDialogOpen(false);
          window.location.reload();
        }}
      />
      <ViewWorkOrderDetailsDialog
        modalOpen={isViewWorkOrderDialogOpen}
        onClose={() => setViewWorkOrderDialogOpen(false)}
        workOrderId={currentWorkOrderListSelection[0]}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => setNewWorkOrderDialogOpen(true)}
          >
            New
          </Button>
          <Button
            variant="contained"
            onClick={() => setViewWorkOrderDialogOpen(true)}
            disabled={currentWorkOrderListSelection.length !== 1}
          >
            View
          </Button>
          <ToggleButtonGroup
            value={filterType}
            onChange={(event) => { setFilterType(event.target.value); }}
            sx={{ marginLeft: 'auto' }}
          >
            <ToggleButton value="me">Created By Me</ToggleButton>
            <ToggleButton value="room">By Building/Room</ToggleButton>
          </ToggleButtonGroup>
          {filterSelectors}
        </Stack>
        <WorkOrderList
          listType={filterType}
          baseId={selectedBaseId}
          buildingId={selectedBuildingId}
          roomId={selectedRoomId}
          onSelectionChange={setWorkOrderListSelection}
        />
      </Stack>
    </ContentLayout>
  );
};

export default WorkOrders;
