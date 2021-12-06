import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Card, CardContent, Button, Stack } from '@mui/material';

import postEventResponse from '@/api/postEventResponse';

export const Event = ({ eventObject }) => (
  <Card variant="outlined">
    <CardContent>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">{eventObject.subject}</Typography>
        <Typography>{`Scheduled: ${new Date(eventObject.scheduled).toLocaleString()}`}</Typography>
      </Stack>
      <Typography>
        {`
          Hosted by:
          ${eventObject.createdByObject.rank}
          ${eventObject.createdByObject.first_name}
          ${eventObject.createdByObject.last_name}
        `}
      </Typography>
      <Typography>{`Location: ${eventObject.location}`}</Typography>
      <Typography
        sx={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#CCCCCC', padding: 1 }}
      >
        {eventObject.description}
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
        sx={{ padding: 1 }}
      >
        <Typography>
          {
            `
              ${eventObject.responses.going}
              interested;
              ${eventObject.responses.notGoing}
              interested.
            `
          }
        </Typography>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => {
              postEventResponse(eventObject.id, 1);
            }}
          >
            Interested
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              postEventResponse(eventObject.id, 0);
            }}
          >
            Not Interested
          </Button>
        </Stack>
      </Stack>
    </CardContent>
  </Card>
);

Event.propTypes = {
  eventObject: PropTypes.shape(
    {
      id: PropTypes.number,
      created_by: PropTypes.number,
      scheduled: PropTypes.string,
      location: PropTypes.string,
      subject: PropTypes.string,
      description: PropTypes.string,
      createdByObject: PropTypes.shape({
        id: PropTypes.number,
        rank: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      }),
      responses: PropTypes.shape({
        going: PropTypes.number,
        notGoing: PropTypes.number,
      }),
    },
  ),
};

Event.defaultProps = {
  eventObject: {
    id: 0,
    created_by: 0,
    scheduled: new Date().toISOString(),
    location: '',
    subject: '',
    description: '',
    createdByObject: {
      id: 0,
      rank: '',
      first_name: '',
      last_name: '',
    },
    responses: {
      going: 0,
      notGoing: 0,
    },
  },
};

export default Event;
