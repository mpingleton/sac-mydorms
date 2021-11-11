const Joi = require('joi');

const getEventById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const createEvent = {
  body: Joi.object().keys({
    scheduled: Joi.string().required(),
    location: Joi.string().required(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
  }),
};

module.exports = {
  getEventById,
  createEvent,
};
