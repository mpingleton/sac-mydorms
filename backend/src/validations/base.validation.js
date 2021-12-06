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

const createBuilding = {
  body: Joi.object().keys({
    base_id: Joi.number().integer().required(),
    building_number: Joi.string().required(),
    building_name: Joi.string().required(),
    address: Joi.string().required(),
  }),
};

module.exports = {
  getBuildingsByBase,
  getBaseById,
  createBase,
  createBuilding,
};
