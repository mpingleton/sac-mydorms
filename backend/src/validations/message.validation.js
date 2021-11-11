const Joi = require('joi');

const getMessageById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const sendMessage = {
  body: Joi.object().keys({
    recipient_id: Joi.number().integer().required(),
    subject: Joi.string().required(),
    body: Joi.string().required(),
  }),
};

module.exports = {
  getMessageById,
  sendMessage,
};
