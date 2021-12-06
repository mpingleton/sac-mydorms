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
        }}
      />
      <CardContent>
        <Stack direction="column" spacing={1}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="h6">{postObject.header}</Typography>
            <Typography>{new Date(postObject.timestamp).toLocaleString()}</Typography>
          </Stack>
          <Typography
            sx={{ borderWidth: 1, borderStyle: 'dashed', borderColor: '#CCCCCC', padding: 1 }}
          >
            {postObject.postBody}
          </Typography>
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
        </Stack>
      </CardContent>
    </Card>
  );
};

Post.propTypes = {
  postObject: PropTypes.shape({
    id: PropTypes.number,
    timestamp: PropTypes.string,
    header: PropTypes.string,
    postBody: PropTypes.string,
  }),
};

Post.defaultProps = {
  postObject: { id: 0, timestamp: new Date().toISOString(), header: 'Loading...', postBody: 'Loading content...' },
};

export default Post;
