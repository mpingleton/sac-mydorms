import React from 'react';

import { Stack, Button } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { PostList } from '../components/PostList';

export const CommonArea = () => (
  <ContentLayout title="Common Area">
    <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => {}}>New Post</Button>
      </Stack>
      <PostList />
    </Stack>
  </ContentLayout>
);

export default CommonArea;
