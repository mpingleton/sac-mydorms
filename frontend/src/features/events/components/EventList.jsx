import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import { Event } from './Event';

import getEvents from '@/api/getEvents';
import getEventsAtMyBase from '@/api/getEventsAtMyBase';
import getEventsByBase from '@/api/getEventsByBase';
import getEventsCreatedBy from '@/api/getEventsCreatedBy';
import getEventsCreatedByMe from '@/api/getEventsCreatedByMe';

/*
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
      createdByObject: responseEvent.createdByObject,
      responses: responseEvent.responses,
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
*/

export const EventList = ({ listType, baseId, personnelId }) => {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    if (listType === 'all') {
      getEvents()
        .then((responseData) => responseData.map((responseEvent) => ({
          id: responseEvent.id,
          created_by: responseEvent.created_by,
          scheduled: responseEvent.scheduled,
          location: responseEvent.location,
          subject: responseEvent.subject,
          description: responseEvent.description,
          createdByObject: responseEvent.createdByObject,
          responses: responseEvent.responses,
        })))
        .then((responseData) => setEvents(responseData));
    } else if (listType === 'inbase') {
      getEventsByBase(baseId)
        .then((responseData) => responseData.map((responseEvent) => ({
          id: responseEvent.id,
          created_by: responseEvent.created_by,
          scheduled: responseEvent.scheduled,
          location: responseEvent.location,
          subject: responseEvent.subject,
          description: responseEvent.description,
          createdByObject: responseEvent.createdByObject,
          responses: responseEvent.responses,
        })))
        .then((responseData) => setEvents(responseData));
    } else if (listType === 'inmybase') {
      getEventsAtMyBase()
        .then((responseData) => responseData.map((responseEvent) => ({
          id: responseEvent.id,
          created_by: responseEvent.created_by,
          scheduled: responseEvent.scheduled,
          location: responseEvent.location,
          subject: responseEvent.subject,
          description: responseEvent.description,
          createdByObject: responseEvent.createdByObject,
          responses: responseEvent.responses,
        })))
        .then((responseData) => setEvents(responseData));
    } else if (listType === 'inperson') {
      getEventsCreatedBy(personnelId)
        .then((responseData) => responseData.map((responseEvent) => ({
          id: responseEvent.id,
          created_by: responseEvent.created_by,
          scheduled: responseEvent.scheduled,
          location: responseEvent.location,
          subject: responseEvent.subject,
          description: responseEvent.description,
          createdByObject: responseEvent.createdByObject,
          responses: responseEvent.responses,
        })))
        .then((responseData) => setEvents(responseData));
    } else if (listType === 'byme') {
      getEventsCreatedByMe()
        .then((responseData) => responseData.map((responseEvent) => ({
          id: responseEvent.id,
          created_by: responseEvent.created_by,
          scheduled: responseEvent.scheduled,
          location: responseEvent.location,
          subject: responseEvent.subject,
          description: responseEvent.description,
          createdByObject: responseEvent.createdByObject,
          responses: responseEvent.responses,
        })))
        .then((responseData) => setEvents(responseData));
    } else {
      setEvents([]);
    }
  }, [listType, baseId, personnelId]);

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

EventList.propTypes = {
  listType: PropTypes.string,
  baseId: PropTypes.number,
  personnelId: PropTypes.number,
};

EventList.defaultProps = {
  listType: 'all',
  baseId: 0,
  personnelId: 0,
};

export default EventList;
