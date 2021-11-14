const Joi = require('joi');

const createEnrollment = {
  body: Joi.object().keys({
    userId: Joi.number().integer().required(),
    personnelId: Joi.number().integer().required(),
  }),
};

module.exports = {
  createEnrollment,
};
