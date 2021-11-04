import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Card, CardContent } from '@mui/material';

export const Event = ({ eventObject }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography>{eventObject.subject}</Typography>
      <Typography>{eventObject.created_by}</Typography>
      <Typography>{eventObject.location}</Typography>
      <Typography>{eventObject.scheduled}</Typography>
      <Typography>{eventObject.description}</Typography>
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
  },
};

export default Event;
