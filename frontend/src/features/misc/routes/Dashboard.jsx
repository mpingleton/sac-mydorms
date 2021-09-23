import React from 'react';

import { AppBar, Toolbar } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <ContentLayout title="Dashboard">
      <AppBar position="absolute">
        <Toolbar />
      </AppBar>
      <h1>
        Welcome
        <b>{`${user?.firstName} ${user?.lastName}`}</b>
      </h1>
      <h4>
        Your role is :
        <b>{user?.role}</b>
      </h4>
    </ContentLayout>
  );
};

export default Dashboard;
