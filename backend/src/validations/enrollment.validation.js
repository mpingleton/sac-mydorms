const Joi = require('joi');

const getEnrollmentForPerson = {
  params: Joi.object().keys({
    personnelId: Joi.number().integer().required(),
  }),
};

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

const createPendingEnrollment = {
  body: Joi.object().keys({
    personnelId: Joi.number().integer().required(),
  }),
};

const getPendingEnrollmentForPerson = {
  params: Joi.object().keys({
    personnelId: Joi.number().integer().required(),
  }),
};

module.exports = {
  getEnrollmentForPerson,
  createEnrollment,
  enrollCurrentUserUsingCode,
  createPendingEnrollment,
  getPendingEnrollmentForPerson,
};
