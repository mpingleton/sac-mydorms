import React from 'react';

import { Stack } from '@mui/material';

import { Post } from './Post';

export const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    const data = [
      { id: 1, header: 'SSgt Michael Pingleton', postBody: 'This is the first test post.' },
      { id: 2, header: 'A1C John Doe', postBody: 'This is the second test post.' },
      { id: 3, header: 'AB Tony Smith', postBody: 'This is the third test post.' },
      { id: 4, header: 'TSgt Abc Defg', postBody: 'This is the fourth test post.' },
      { id: 5, header: 'TSgt Abc Defg', postBody: 'This is the fifth test post.' },
    ];

    setPosts(data);
  }, []);

  return (
    <Stack direction="column" spacing={4} sx={{ minWidth: 350, maxWidth: '95vw', marginLeft: 'auto', marginRight: 'auto', alignSelf: 'center' }}>
      {posts.map((post) => (<Post postObject={post} />))}
    </Stack>
  );
};

export default PostList;
