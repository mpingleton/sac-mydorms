const Joi = require('joi');

const getRoomAssignmentsForPersonnel = {
  params: Joi.object().keys({
    personnel_id: Joi.number().integer().required(),
  }),
};

const getPersonnelAssignedToRoom = {
  params: Joi.object().keys({
    room_id: Joi.number().integer().required(),
  }),
};

const createRoomAssignment = {
  params: Joi.object().keys({
    personnel_id: Joi.number().integer().required(),
    room_id: Joi.number().integer().required(),
  }),
};

module.exports = {
  getRoomAssignmentsForPersonnel,
  getPersonnelAssignedToRoom,
  createRoomAssignment,
};
