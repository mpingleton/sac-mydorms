import React from 'react';

import { Typography, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      <Stack direction="column" spacing={1}>
        <Typography>
          {`Hello ${user.name}, this is how the dashboard is starting to look!`}
        </Typography>
        <Stack direction="row" spacing={1}>
          <Typography>First card.</Typography>
          <Typography>Second card.</Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Typography>Third card.</Typography>
          <Typography>Fourth card.</Typography>
        </Stack>
      </Stack>
    </ContentLayout>
  );
};

export default Dashboard;
