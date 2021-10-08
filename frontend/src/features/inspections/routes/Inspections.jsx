import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Inspections = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Inspections">
      {`Hello ${user?.name} from the inspections page!`}
    </ContentLayout>
  );
};

export default Inspections;
