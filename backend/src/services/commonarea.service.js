const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getPosts = async () => {
  const posts = await prisma.commonAreaPosts.findMany({});
  return posts;
};

const getPostsByBase = async (baseId) => {
  const posts = await prisma.commonAreaPosts.findMany({
    where: {
      base_id: baseId,
    },
  });
  return posts;
};

const getPostsCreatedBy = async (personnelId) => {
  const posts = await prisma.commonAreaPosts.findMany({
    where: {
      posted_by: personnelId,
    },
  });
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
  baseId,
  postedBy,
  timestamp,
  text,
  commentsEnabled,
) => {
  const data = {
    base_id: baseId,
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

const getCommentsByPost = async (id) => {
  const comments = await prisma.commonAreaPostComments.findMany({
    where: {
      post_id: id,
    },
  });

  return comments;
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
  getPostsByBase,
  getPostsCreatedBy,
  getPostById,
  createPost,
  getComments,
  getCommentById,
  getCommentsByPost,
  createComment,
};
