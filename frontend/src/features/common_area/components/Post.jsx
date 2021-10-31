import React from 'react';

import { Typography, Card, CardContent } from '@mui/material';

export const Post = () => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h6">This is a test title.</Typography>
      <Typography>This is the content of the post.</Typography>
    </CardContent>
  </Card>
);

export default Post;
