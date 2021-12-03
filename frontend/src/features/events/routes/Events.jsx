/* eslint-disable no-else-return */

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

import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';
import getMyEnrollment from '@/api/getMyEnrollment';

export const Events = () => {
  const [isNewEventDialogOpen, setNewEventDialogOpen] = React.useState(false);

  const [userEnrollment, setUserEnrollment] = React.useState({});
  const [filterType, setFilterType] = React.useState('');
  const [selectedBaseId, setSelectedBaseId] = React.useState(0);
  const [selectedPersonnelId, setSelectedPersonnelId] = React.useState(0);

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

  let filterSelectors = null;
  if (filterType === 'inbase') {
    filterSelectors = (
      <BaseSelector
        baseId={selectedBaseId}
        disabled={userEnrollment.personnelObject !== undefined}
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
          disabled={userEnrollment.personnelObject !== undefined}
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
            {checkAccess({ allowedRoles: [ROLES.ADMIN] })
              && (<ToggleButton value="inbase">In Selected Base</ToggleButton>)}
            {checkAccess({ allowedRoles: [ROLES.USER] })
              && (<ToggleButton value="inmybase">In My Base</ToggleButton>)}
            <ToggleButton value="inperson">Posted By Selected Person</ToggleButton>
            {checkAccess({ allowedRoles: [ROLES.USER] })
              && (<ToggleButton value="byme">Posted By Me</ToggleButton>)}
            {checkAccess({ allowedRoles: [ROLES.ADMIN] })
              && (<ToggleButton value="all">All</ToggleButton>)}
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
