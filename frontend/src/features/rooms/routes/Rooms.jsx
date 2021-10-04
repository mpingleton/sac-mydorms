import React from 'react';

import { ContentLayout } from '@/components/layout';

import { RoomList } from '../components/RoomList';

export const Rooms = () => (
  <ContentLayout title="Rooms">
    <RoomList />
  </ContentLayout>
);

export default Rooms;
