import React from 'react';

import { Button } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { ResidentList } from '../components/ResidentList';

export const Residents = () => (
  <ContentLayout title="Residents">
    <Button
      variant="contained"
      onClick={() => {}}
    >
      New Resident
    </Button>
    <ResidentList />
  </ContentLayout>
);

export default Residents;
