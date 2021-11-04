const Joi = require('joi');

const getPostById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const getCommentById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

module.exports = {
  getPostById,
  getCommentById,
};
