import React from 'react';
import PropTypes from 'prop-types';

import { Typography, Card, CardContent, Stack, Button } from '@mui/material';

export const Post = ({ postObject }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="h6">{postObject.header}</Typography>
      <Typography>{postObject.postBody}</Typography>
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

Post.propTypes = {
  postObject: PropTypes.shape({
    id: PropTypes.number,
    header: PropTypes.string,
    postBody: PropTypes.string,
  }),
};

Post.defaultProps = {
  postObject: { id: 0, header: 'Loading...', postBody: 'Loading content...' },
};

export default Post;
