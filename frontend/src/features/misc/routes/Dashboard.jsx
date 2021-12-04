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
        spacing={2}
      >
        <Typography>
          {`Hello ${user.username}, this is how the dashboard is starting to look!`}
        </Typography>
        <WorkOrder />
        <Inspection />
        <CommonArea />
        <Events />

      </Stack>
    </ContentLayout>
  );
};

export default Dashboard;
