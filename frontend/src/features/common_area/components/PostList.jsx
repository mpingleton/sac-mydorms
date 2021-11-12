import React from 'react';

import { Stack } from '@mui/material';

import { Post } from './Post';

import getPosts from '@/api/getPosts';

export const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    getPosts().then((responseData) => {
      const data = [];
      responseData.map((responsePost) => data.push({
        id: responsePost.id,
        timestamp: responsePost.timestamp,
        header: `
          ${responsePost.personnelObject.rank}
          ${responsePost.personnelObject.first_name}
          ${responsePost.personnelObject.last_name}
        `,
        postBody: responsePost.text,
      }));

      if (data.length >= 2) {
        let swapCount = 0;
        do {
          swapCount = 0;
          for (let i = 1; i < data.length; i += 1) {
            const d0 = new Date(data[i - 1].timestamp);
            const d1 = new Date(data[i].timestamp);
            if (d0.getTime() < d1.getTime()) {
              const tmp = data[i - 1];
              data[i - 1] = data[i];
              data[i] = tmp;
              swapCount += 1;
            }
          }
        } while (swapCount > 0);
      }

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
