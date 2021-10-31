import React from 'react';

import { Typography, Card, CardContent, Stack, Button } from '@mui/material';

export const Post = () => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h6">SSgt Michael Pingleton (Dorm Manager)</Typography>
      <Typography>Lorem ipsum dolor something something idk how this goes tbh.</Typography>
      <Stack direction="row">
        <Button
          variant="contained"
          onClick={() => {}}
          sx={{ marginRight: 'auto' }}
        >
          View Post
        </Button>
        <Button
          variant="contained"
          onClick={() => {}}
          sx={{ marginLeft: 'auto' }}
        >
          3 Comments
        </Button>
      </Stack>
    </CardContent>
  </Card>
);

export default Post;
