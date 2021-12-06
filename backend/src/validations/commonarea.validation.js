const Joi = require('joi');

const getPostById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const getPostsByBase = {
  params: Joi.object().keys({
    base_id: Joi.number().integer(),
  }),
};

const getPostsCreatedBy = {
  params: Joi.object().keys({
    personnel_id: Joi.number().integer(),
  }),
};

const createPost = {
  body: Joi.object().keys({
    text: Joi.string().max(1000).required(),
  }),
};

const getCommentById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const getCommentsByPost = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const createComment = {
  body: Joi.object().keys({
    post_id: Joi.number().integer().required(),
    text: Joi.string().max(1000).required(),
  }),
};

module.exports = {
  getPostById,
  getPostsByBase,
  getPostsCreatedBy,
  createPost,
  getCommentById,
  getCommentsByPost,
  createComment,
};
