import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import getEnrollmentForPerson from '@/api/getEnrollmentForPerson';
import getPendingEnrollmentForPerson from '@/api/getPendingEnrollmentForPerson';
import createPendingEnrollment from '@/api/createPendingEnrollment';

export const EnrollmentDetails = ({ personnelId }) => {
  const [enrollment, setEnrollment] = React.useState({});
  const [pendingEnrollment, setPendingEnrollment] = React.useState({});

  React.useEffect(() => {
    getEnrollmentForPerson(personnelId).then((responseData) => setEnrollment(responseData));
    getPendingEnrollmentForPerson(personnelId)
      .then((responseData) => setPendingEnrollment(responseData));
  }, [personnelId]);

  const createButton = (
    <Button
      variant="contained"
      onClick={() => {
        createPendingEnrollment(personnelId)
          .then((responseData) => setPendingEnrollment(responseData));
      }}
    >
      Create Pending Enrollment
    </Button>
  );

  return (
    <Stack direction="row" spacing={1}>
      <Typography>{enrollment.id === -1 ? 'Not Enrolled' : 'Enrolled'}</Typography>
      <Typography>
        {
          pendingEnrollment.id === -1 && enrollment.id === -1
            ? createButton : pendingEnrollment.registrationCode
        }
      </Typography>
    </Stack>
  );
};

EnrollmentDetails.propTypes = {
  personnelId: PropTypes.number,
};

EnrollmentDetails.defaultProps = {
  personnelId: 0,
};

export default EnrollmentDetails;
