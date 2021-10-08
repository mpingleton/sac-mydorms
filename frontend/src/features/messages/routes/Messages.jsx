import React from 'react';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Messages = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Messages">
      {`Hello ${user?.name} from the messages page!`}
    </ContentLayout>
  );
};

export default Messages;
