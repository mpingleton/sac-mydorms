import React from 'react';

import { Typography, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';
import { WorkOrder } from '../components/WorkOrder';
import { Inspection } from '../components/Inspection';
import { CommonArea } from '../components/CommonArea';
import { Events } from '../components/Events';

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
          <WorkOrder />
          <Inspection />
        </Stack>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          sx={{ width: '100%' }}
        >
          <CommonArea />
          <Events />
        </Stack>
      </Stack>
    </ContentLayout>
  );
};

export default Dashboard;
