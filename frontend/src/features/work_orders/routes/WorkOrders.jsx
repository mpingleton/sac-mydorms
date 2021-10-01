import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const WorkOrders = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Work Orders">
      {`Hello ${user?.name} from the work orders page!`}
    </ContentLayout>
  );
};

export default WorkOrders;
