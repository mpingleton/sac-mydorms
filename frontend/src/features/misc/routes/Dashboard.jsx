import React from 'react';

import { Typography, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ height: '100%' }}
      >
        <Typography>
          {`Hello ${user.name}, this is how the dashboard is starting to look!`}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          sx={{ width: '100%' }}
        >
          <Typography>First card.</Typography>
          <Typography>Second card.</Typography>
          <Typography>Fifth card.</Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          sx={{ width: '100%' }}
        >
          <Typography>Third card.</Typography>
          <Typography>Fourth card.</Typography>
        </Stack>
      </Stack>
    </ContentLayout>
  );
};

export default Dashboard;
