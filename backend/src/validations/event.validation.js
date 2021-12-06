const Joi = require('joi');

const getEventsByBase = {
  params: Joi.object().keys({
    base_id: Joi.number().integer(),
  }),
};

const getEventsCreatedBy = {
  params: Joi.object().keys({
    personnel_id: Joi.number().integer(),
  }),
};

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

module.exports = {
  getEventsByBase,
  getEventsCreatedBy,
  getEventById,
  createEvent,
  setResponse,
};
