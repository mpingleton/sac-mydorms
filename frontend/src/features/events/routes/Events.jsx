import React from 'react';

import { Typography } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const Events = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Events">
      <Typography>{`Hello ${user?.name} from the events page!`}</Typography>
    </ContentLayout>
  );
};

export default Events;
