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

      if (data.length >= 2) {
        let swapCount = 0;
        do {
          swapCount = 0;
          for (let i = 1; i < data.length; i += 1) {
            const d0 = new Date(data[i - 1].scheduled);
            const d1 = new Date(data[i].scheduled);
            if (d0.getTime() < d1.getTime()) {
              const tmp = data[i - 1];
              data[i - 1] = data[i];
              data[i] = tmp;
              swapCount += 1;
            }
          }
        } while (swapCount > 0);
      }

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
