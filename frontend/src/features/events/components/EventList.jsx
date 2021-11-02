import React from 'react';

import { Stack } from '@mui/material';

import { Event } from './Event';

export const EventList = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    const data = [
      {
        id: 1,
        created_by: 1,
        scheduled: new Date().toISOString(),
        location: 'Ezekiel Hall Lobby',
        subject: 'Cookout',
        description: 'FSS will be hosting a cookout in the lobby of Ezekiel Hall!',
      },
      {
        id: 2,
        created_by: 1,
        scheduled: new Date().toISOString(),
        location: 'Tony Hall Lobby',
        subject: 'Test Event',
        description: 'This is another test event, but this time, in Tony Hall!',
      },
      {
        id: 3,
        created_by: 1,
        scheduled: new Date().toISOString(),
        location: 'Tony Hall Lobby',
        subject: 'Another Test Event',
        description: 'This is yet another test event, but this time, in Tony Hall!',
      },
    ];

    setEvents(data);
  }, []);

  return (
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
      {events.map((event) => (<Event eventObject={event} />))}
    </Stack>
  );
};

export default EventList;
