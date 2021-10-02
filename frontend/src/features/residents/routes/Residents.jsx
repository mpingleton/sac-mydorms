import React from 'react';

import { ContentLayout } from '@/components/layout';

import { ResidentList } from '../components/ResidentList';

export const Residents = () => (
  <ContentLayout title="Residents">
    <ResidentList />
  </ContentLayout>
);

export default Residents;
