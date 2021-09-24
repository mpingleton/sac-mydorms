import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <ContentLayout title="Dashboard">
      {`Hello ${user?.name}!`}
    </ContentLayout>
  );
};

export default Dashboard;
