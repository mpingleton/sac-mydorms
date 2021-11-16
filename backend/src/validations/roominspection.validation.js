const Joi = require('joi');

const getRoomInspectionById = {
  params: Joi.object().keys({
    id: Joi.number().integer().required(),
  }),
};

const createRoomInspection = {
  body: Joi.object().keys({
    timestamp: Joi.string().required(),
    room_id: Joi.number().integer().required(),
    resident_id: Joi.number().integer().required(),
    inspector_name: Joi.string().required(),
    inspector_remarks: Joi.string().required(),
  }),
};

module.exports = {
  getRoomInspectionById,
  createRoomInspection,
};
