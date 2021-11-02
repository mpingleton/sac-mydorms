import React from 'react';

import { Stack } from '@mui/material';

import { Event } from './Event';

export const EventList = () => (
  <Stack
    direction="column"
    spacing={4}
    sx={{
      minWidth: 350,
      maxWidth: '95vw',
      marginLeft: 'auto',
      marginRight: 'auto',
      alignSelf: 'center',
    }}
  >
    <Event />
    <Event />
  </Stack>
);

export default EventList;
