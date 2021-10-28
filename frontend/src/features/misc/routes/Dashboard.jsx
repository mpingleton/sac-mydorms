import React from 'react';

import { Typography } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      <Typography>{`Hello ${user?.name}!`}</Typography>
    </ContentLayout>
  );
};

export default Dashboard;
