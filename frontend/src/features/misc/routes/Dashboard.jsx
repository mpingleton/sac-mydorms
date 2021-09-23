import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <ContentLayout title="Dashboard">
      <AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" component="div">
            {user?.name}
            is
            {user?.role}
          </Typography>
        </Toolbar>
      </AppBar>
    </ContentLayout>
  );
};

export default Dashboard;
