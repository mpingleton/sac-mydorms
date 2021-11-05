const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPosts = async () => {
  const posts = await prisma.commonAreaPosts.findMany({});
  return posts;
};

const getPostById = async (id) => {
  const post = await prisma.commonAreaPosts.findUnique({
    where: {
      id,
    },
  });

  return post;
};

const createPost = async (
  postedBy,
  timestamp,
  text,
  commentsEnabled,
) => {
  const data = {
    posted_by: postedBy,
    timestamp,
    text,
    comments_enabled: commentsEnabled,
  };

  await prisma.commonAreaPosts.create({ data });
};

const getComments = async () => {
  const comments = await prisma.commonAreaPostComments.findMany({});
  return comments;
};

const getCommentById = async (id) => {
  const comment = await prisma.commonAreaPostComments.findUnique({
    where: {
      id,
    },
  });

  return comment;
};

const createComment = async (
  postId,
  commenterId,
  timestamp,
  text,
  isVisible,
) => {
  const data = {
    post_id: postId,
    commenter_id: commenterId,
    timestamp,
    text,
    is_visible: isVisible,
  };

  await prisma.commonAreaPostComments.create({ data });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  getComments,
  getCommentById,
  createComment,
};
