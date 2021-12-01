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
import { BaseSelector } from '@/components/BaseSelector';
import { BuildingSelector } from '@/components/BuildingSelector';
import { RoomSelector } from '@/components/RoomSelector';
import { PersonnelSelector } from '@/components/PersonnelSelector';

export const Inspections = () => {
  const [currentInspectionSelection, setInspectionSelection] = React.useState([]);
  const [isNewInspectionDialogOpen, setNewInspectionDialogOpen] = React.useState(false);
  const [isViewInspectionDetailsDialogOpen,
    setViewInspectionDetailsDialogOpen] = React.useState(false);

  const [filterType, setFilterType] = React.useState('all');
  const [selectedBaseId, setSelectedBaseId] = React.useState(0);
  const [selectedPersonnelId, setSelectedPersonnelId] = React.useState(0);
  const [selectedBuildingId, setSelectedBuildingId] = React.useState(0);
  const [selectedRoomId, setSelectedRoomId] = React.useState(0);

  let filterSelectors = null;
  if (filterType === 'inresident') {
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
  } else if (filterType === 'inroom') {
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
          onSelectionChanged={(roomId) => {
            setSelectedRoomId(roomId);
          }}
        />
      </Stack>
    );
  }

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
            onChange={(event) => {
              setFilterType(event.target.value);
            }}
          >
            <ToggleButton value="inroom">For Selected Room</ToggleButton>
            <ToggleButton value="inresident">For Selected Resident</ToggleButton>
            <ToggleButton value="byme">Created By Me</ToggleButton>
            <ToggleButton value="all">All</ToggleButton>
          </ToggleButtonGroup>
          {filterSelectors}
        </Stack>
        <InspectionsList
          listType={filterType}
          baseId={selectedBaseId}
          buildingId={selectedBuildingId}
          roomId={selectedRoomId}
          personnelId={selectedPersonnelId}
          onSelectionChange={setInspectionSelection}
        />
      </Stack>
    </ContentLayout>
  );
};

export default Inspections;
