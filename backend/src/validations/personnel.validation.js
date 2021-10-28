const Joi = require('joi');

const getPersonnelById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const putPersonnel = {
  body: Joi.object()
    .keys({
      rank: Joi.string().required(),
      first_name: Joi.string().required(),
      middle_name: Joi.string().required(),
      last_name: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().email().required(),
    }).min(1),
};

module.exports = {
  getPersonnelById,
  putPersonnel,
};
