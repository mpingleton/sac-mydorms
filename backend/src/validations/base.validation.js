const Joi = require('joi');

const getBaseById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getBaseById,
};
