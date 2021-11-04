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

module.exports = {
  getPosts,
  getPostById,
  getComments,
  getCommentById,
};
