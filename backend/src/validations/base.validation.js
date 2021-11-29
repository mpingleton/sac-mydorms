const Joi = require('joi');

const getBuildingsByBase = {
  params: Joi.object().keys({
    base_id: Joi.number().integer().required(),
  }),
};

const getBaseById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createBase = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};

module.exports = {
  getBuildingsByBase,
  getBaseById,
  createBase,
};
