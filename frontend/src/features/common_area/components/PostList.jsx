import React from 'react';
import PropTypes from 'prop-types';

import { Stack } from '@mui/material';

import { Post } from './Post';

import getPosts from '@/api/getPosts';
import getPostsAtMyBase from '@/api/getPostsAtMyBase';
import getPostsCreatedByMe from '@/api/getPostsCreatedByMe';
import getPostsByBase from '@/api/getPostsByBase';
import getPostsCreatedBy from '@/api/getPostsCreatedBy';

/*
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
*/

export const PostList = ({ listType, baseId, personnelId }) => {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    if (listType === 'all') {
      getPosts()
        .then((responseData) => responseData.map((responsePost) => ({
          id: responsePost.id,
          timestamp: responsePost.timestamp,
          header: `
            ${responsePost.personnelObject.rank}
            ${responsePost.personnelObject.first_name}
            ${responsePost.personnelObject.last_name}
          `,
          postBody: responsePost.text,
        })))
        .then((responseData) => setPosts(responseData));
    } else if (listType === 'inbase') {
      getPostsByBase(baseId)
        .then((responseData) => responseData.map((responsePost) => ({
          id: responsePost.id,
          timestamp: responsePost.timestamp,
          header: `
            ${responsePost.personnelObject.rank}
            ${responsePost.personnelObject.first_name}
            ${responsePost.personnelObject.last_name}
          `,
          postBody: responsePost.text,
        })))
        .then((responseData) => setPosts(responseData));
    } else if (listType === 'inmybase') {
      getPostsAtMyBase(baseId)
        .then((responseData) => responseData.map((responsePost) => ({
          id: responsePost.id,
          timestamp: responsePost.timestamp,
          header: `
            ${responsePost.personnelObject.rank}
            ${responsePost.personnelObject.first_name}
            ${responsePost.personnelObject.last_name}
          `,
          postBody: responsePost.text,
        })))
        .then((responseData) => setPosts(responseData));
    } else if (listType === 'byme') {
      getPostsCreatedByMe()
        .then((responseData) => responseData.map((responsePost) => ({
          id: responsePost.id,
          timestamp: responsePost.timestamp,
          header: `
            ${responsePost.personnelObject.rank}
            ${responsePost.personnelObject.first_name}
            ${responsePost.personnelObject.last_name}
          `,
          postBody: responsePost.text,
        })))
        .then((responseData) => setPosts(responseData));
    } else if (listType === 'inperson') {
      getPostsCreatedBy(personnelId)
        .then((responseData) => responseData.map((responsePost) => ({
          id: responsePost.id,
          timestamp: responsePost.timestamp,
          header: `
            ${responsePost.personnelObject.rank}
            ${responsePost.personnelObject.first_name}
            ${responsePost.personnelObject.last_name}
          `,
          postBody: responsePost.text,
        })))
        .then((responseData) => setPosts(responseData));
    } else {
      setPosts([]);
    }
  }, [listType, baseId, personnelId]);

  return (
    <Stack direction="column" spacing={4} sx={{ minWidth: 350, maxWidth: '95vw', marginLeft: 'auto', marginRight: 'auto', alignSelf: 'center' }}>
      {posts.map((post) => (<Post postObject={post} />))}
    </Stack>
  );
};

PostList.propTypes = {
  listType: PropTypes.string,
  baseId: PropTypes.number,
  personnelId: PropTypes.number,
};

PostList.defaultProps = {
  listType: 'all',
  baseId: 0,
  personnelId: 0,
};

export default PostList;
