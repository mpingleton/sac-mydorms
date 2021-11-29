const Joi = require('joi');

const getRoomsInBuilding = {
  params: Joi.object().keys({
    building_id: Joi.number().integer().required(),
  }),
};

const getRoomById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getRoomsInBuilding,
  getRoomById,
};
