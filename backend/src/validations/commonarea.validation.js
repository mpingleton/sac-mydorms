const Joi = require('joi');

const getPostById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const createPost = {
  body: Joi.object().keys({
    text: Joi.string().required(),
  }),
};

const getCommentById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const createComment = {
  body: Joi.object().keys({
    post_id: Joi.number().integer().required(),
    text: Joi.string().required(),
  }),
};

module.exports = {
  getPostById,
  createPost,
  getCommentById,
  createComment,
};
