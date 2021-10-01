import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Residents = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Residents">
      {`Hello ${user?.name}!`}
    </ContentLayout>
  );
};

export default Residents;
