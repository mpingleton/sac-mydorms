import React from 'react';

import { Typography } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Messages = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Messages">
      <Typography>{`Hello ${user?.name} from the messages page!`}</Typography>
    </ContentLayout>
  );
};

export default Messages;
