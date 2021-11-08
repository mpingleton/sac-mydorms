import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Card, CardContent } from '@mui/material';

import getPersonnelById from '../api/getPersonnelById';

export const Event = ({ eventObject }) => {
  const [creator, setCreator] = React.useState({});

  React.useEffect(() => {
    getPersonnelById(eventObject.created_by).then((data) => setCreator(data));
  }, [eventObject.created_by]);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography>{eventObject.subject}</Typography>
        <Typography>
          {`
            ${creator.rank}
            ${creator.first_name}
            ${creator.last_name}
          `}
        </Typography>
        <Typography>{eventObject.location}</Typography>
        <Typography>{eventObject.scheduled}</Typography>
        <Typography>{eventObject.description}</Typography>
      </CardContent>
    </Card>
  );
};

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
