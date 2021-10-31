import React from 'react';

import { ContentLayout } from '@/components/layout';

import { PostList } from '../components/PostList';

export const CommonArea = () => (
  <ContentLayout title="Common Area">
    <PostList />
  </ContentLayout>
);

export default CommonArea;
