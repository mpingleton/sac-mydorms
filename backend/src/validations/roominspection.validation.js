const Joi = require('joi');

const getRoomInspectionById = {
  params: Joi.object().keys({
    id: Joi.number().integer(),
  }),
};

const createRoomInspection = {
  body: Joi.object().keys({
    timestamp: Joi.string(),
    room_id: Joi.number().integer(),
    inspector_name: Joi.string(),
    inspector_remarks: Joi.string(),
  }),
};

module.exports = {
  getRoomInspectionById,
  createRoomInspection,
};
