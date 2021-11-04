import React from 'react';

import { Stack } from '@mui/material';

import { Event } from './Event';

import getEvents from '../api/getEvents';

export const EventList = () => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    getEvents().then((responseData) => {
      const data = [];
      responseData.map((responseEvent) => data.push({
        id: responseEvent.id,
        created_by: responseEvent.created_by,
        scheduled: responseEvent.scheduled,
        location: responseEvent.location,
        subject: responseEvent.subject,
        description: responseEvent.description,
      }));
      setEvents(data);
    });
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
