const Joi = require('joi');

const createEnrollment = {
  body: Joi.object().keys({
    userId: Joi.number().integer().required(),
    personnelId: Joi.number().integer().required(),
  }),
};

const enrollCurrentUserUsingCode = {
  body: Joi.object().keys({
    registrationCode: Joi.string().required(),
  }),
};

module.exports = {
  createEnrollment,
  enrollCurrentUserUsingCode,
};
