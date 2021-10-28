import React from 'react';

import { Typography } from '@mui/material';

import { ContentLayout } from '@/components/layout';
import { useAuth } from '@/lib/auth';

export const CommonArea = () => {
  const { user } = useAuth();

  return (
    <ContentLayout title="Common Area">
      <Typography>{`Hello ${user?.name} from the common area page!`}</Typography>
    </ContentLayout>
  );
};

export default CommonArea;
