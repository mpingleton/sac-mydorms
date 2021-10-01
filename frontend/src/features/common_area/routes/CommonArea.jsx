import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const CommonArea = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Common Area">
      {`Hello ${user?.name} from the common area page!`}
    </ContentLayout>
  );
};

export default CommonArea;
