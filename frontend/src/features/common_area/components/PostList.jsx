import React from 'react';

import { Stack } from '@mui/material';

import { Post } from './Post';

import getPosts from '../api/getPosts';

export const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getPosts().then((responseData) => {
      const data = [];
      responseData.map((responsePost) => data.push({
        id: responsePost.id,
        header: `
          ${responsePost.personnelObject.rank}
          ${responsePost.personnelObject.first_name}
          ${responsePost.personnelObject.last_name}
        `,
        postBody: responsePost.text,
      }));
      setPosts(data);
    });
  }, []);

  return (
    <Stack direction="column" spacing={4} sx={{ minWidth: 350, maxWidth: '95vw', marginLeft: 'auto', marginRight: 'auto', alignSelf: 'center' }}>
      {posts.map((post) => (<Post postObject={post} />))}
    </Stack>
  );
};

export default PostList;
