import React from 'react';

import { Stack } from '@mui/material';

import { Post } from './Post';

export const PostList = () => (
  <Stack direction="column" spacing={4} sx={{ minWidth: 350, maxWidth: '95vw', marginLeft: 'auto', marginRight: 'auto', alignSelf: 'center' }}>
    <Post />
    <Post />
    <Post />
  </Stack>
);

export default PostList;
