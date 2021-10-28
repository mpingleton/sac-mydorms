const Joi = require('joi');

const getRoomById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getRoomById,
};
