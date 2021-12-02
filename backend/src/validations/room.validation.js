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

const createRoom = {
  body: Joi.object().keys({
    building_id: Joi.number().integer().required(),
    room_number: Joi.string().required(),
    status: Joi.number().integer().required(),
  }),
};

module.exports = {
  getRoomsInBuilding,
  getRoomById,
  createRoom,
};
