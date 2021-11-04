const Joi = require('joi');

const getEventById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

module.exports = {
  getEventById,
};
