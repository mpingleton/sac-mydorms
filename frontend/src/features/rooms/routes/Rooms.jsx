import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Rooms = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Rooms">
      {`Hello ${user?.name} from the rooms page!`}
    </ContentLayout>
  );
};

export default Rooms;
