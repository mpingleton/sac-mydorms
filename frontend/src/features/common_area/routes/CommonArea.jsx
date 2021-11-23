import React from 'react';

import { Stack, Button } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { PostList } from '../components/PostList';
import { NewPostDialog } from '../components/NewPostDialog';

export const CommonArea = () => {
  const [isNewPostDialogOpen, setNewPostDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Common Area">
      <NewPostDialog
        modalOpen={isNewPostDialogOpen}
        onClose={() => {
          setNewPostDialogOpen(false);
          window.location.reload();
        }}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setNewPostDialogOpen(true)}>New Post</Button>
        </Stack>
        <PostList />
      </Stack>
    </ContentLayout>
  );
};

export default CommonArea;
