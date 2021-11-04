const commonAreaService = require('@/services/commonarea.service');

const getPosts = async (req, res) => {
  const posts = await commonAreaService.getPosts();
  res.send(200, posts);
};

const getPostById = async (req, res) => {
  const post = await commonAreaService.getPostById(parseInt(req.params.id, 10));
  res.send(200, post);
};

const getComments = async (req, res) => {
  const comments = await commonAreaService.getComments();
  res.send(200, comments);
};

const getCommentById = async (req, res) => {
  const comment = await commonAreaService.getCommentById(parseInt(req.params.id, 10));
  res.send(200, comment);
};

module.exports = {
  getPosts,
  getPostById,
  getComments,
  getCommentById,
};
