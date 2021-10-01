import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Events = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Events">
      {`Hello ${user?.name} from the events page!`}
    </ContentLayout>
  );
};

export default Events;
