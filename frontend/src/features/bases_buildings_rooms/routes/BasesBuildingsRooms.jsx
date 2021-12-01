import React from 'react';

import {
  Stack,
  Button,
} from '@mui/material';

import { ContentLayout } from '@/components/layout';

export const BasesBuildingsRooms = () => (
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
        // Base list
      </Stack>
      <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1}>
        </Stack>
        // Buildings list
      </Stack>
      <Stack direction="column" spacing={1} sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1}>
        </Stack>
        // Rooms list
      </Stack>
    </Stack>
  </ContentLayout>
);

export default BasesBuildingsRooms;
