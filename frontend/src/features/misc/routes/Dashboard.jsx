import React from 'react';

import { Typography, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';
import { useAuthorization, ROLES } from '@/lib/authorization';
import { WorkOrder } from '../components/WorkOrder';
import { Inspection } from '../components/Inspection';
import { Events } from '../components/Events';

export const Dashboard = () => {
  const { checkAccess } = useAuthorization();
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      {checkAccess({ allowedRoles: [ROLES.ADMIN] }) ? (
        <Typography>
          This page is only visible to users.
        </Typography>
      ) : (
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
          <Events />
        </Stack>
      )}
    </ContentLayout>
  );
};

export default Dashboard;
