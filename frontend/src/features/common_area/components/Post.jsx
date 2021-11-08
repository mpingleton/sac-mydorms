import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Card, CardContent, Stack, Button } from '@mui/material';

import { ViewPostDialog } from './ViewPostDialog';

export const Post = ({ postObject }) => {
  const [isViewPostDialogOpen, setViewPostDialogOpen] = React.useState(false);

  return (
    <Card variant="outlined">
      <ViewPostDialog
        postObject={postObject}
        modalOpen={isViewPostDialogOpen}
        onClose={() => {
          setViewPostDialogOpen(false);
          window.location.reload();
        }}
      />
      <CardContent>
        <Typography variant="h6">{postObject.header}</Typography>
        <Typography>{postObject.postBody}</Typography>
        <Stack direction="row">
          <Button
            variant="contained"
            onClick={() => {
              setViewPostDialogOpen(true);
            }}
            sx={{ marginLeft: 'auto' }}
          >
            View Post
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

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
