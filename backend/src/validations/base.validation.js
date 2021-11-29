const Joi = require('joi');

const getBaseById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createBase = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  getBaseById,
  createBase,
};
