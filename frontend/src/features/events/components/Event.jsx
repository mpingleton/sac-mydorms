import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Card, CardContent, Button } from '@mui/material';

import postEventResponse from '@/api/postEventResponse';

export const Event = ({ eventObject }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography>{eventObject.subject}</Typography>
      <Typography>
        {`
          ${eventObject.createdByObject.rank}
          ${eventObject.createdByObject.first_name}
          ${eventObject.createdByObject.last_name}
        `}
      </Typography>
      <Typography>{eventObject.location}</Typography>
      <Typography>{new Date(eventObject.scheduled).toLocaleString()}</Typography>
      <Typography>{eventObject.description}</Typography>
      <Typography>
        {
          `
            ${eventObject.responses.going}
            going;
            ${eventObject.responses.notGoing}
            not going.
          `
        }
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          postEventResponse(eventObject.id, 1);
        }}
      >
        Going
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          postEventResponse(eventObject.id, 0);
        }}
      >
        Not Going
      </Button>
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
