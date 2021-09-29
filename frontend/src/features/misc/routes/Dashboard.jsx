import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Dashboard">
      <h1>
        Welcome
        <b>{user?.name}</b>
      </h1>
      <h4>
        Your role is :
        <b>{user?.role}</b>
      </h4>
    </ContentLayout>
  );
};

export default Dashboard;
