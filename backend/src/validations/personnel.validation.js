const Joi = require('joi');

const getPersonnelById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const putPersonnel = {
  body: Joi.object()
    .keys({
      rank: Joi.string(),
      first_name: Joi.string(),
      middle_name: Joi.string(),
      last_name: Joi.string(),
      phone: Joi.string(),
      email: Joi.string().email(),
    }).min(1),
};

module.exports = {
  getPersonnelById,
  putPersonnel,
};
