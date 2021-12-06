const Joi = require('joi');

const getRoomInspectionsForResident = {
  params: Joi.object().keys({
    personnel_id: Joi.number().integer().required(),
  }),
};

const getRoomInspectionsForRoom = {
  params: Joi.object().keys({
    room_id: Joi.number().integer().required(),
  }),
};

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
  getRoomInspectionsForResident,
  getRoomInspectionsForRoom,
  getRoomInspectionById,
  createRoomInspection,
};
