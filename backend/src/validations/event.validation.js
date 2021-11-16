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

const setResponse = {
  body: Joi.object().keys({
    eventId: Joi.number().integer().required(),
    responseCode: Joi.number().integer().required(),
  }),
};

const getResponseCountForEvent = {
  params: {
    event_id: Joi.number().integer().required(),
  },
};

module.exports = {
  getEventById,
  createEvent,
  setResponse,
  getResponseCountForEvent,
};
