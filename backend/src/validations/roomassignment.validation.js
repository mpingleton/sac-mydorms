const Joi = require('joi');

const getRoomAssignmentsForPersonnel = {
  params: Joi.object().keys({
    personnel_id: Joi.number().integer(),
  }),
};

const getPersonnelAssignedToRoom = {
  params: Joi.object().keys({
    room_id: Joi.number().integer(),
  }),
};

const createRoomAssignment = {
  params: Joi.object().keys({
    personnel_id: Joi.number().integer(),
    room_id: Joi.number().integer(),
  }),
};

module.exports = {
  getRoomAssignmentsForPersonnel,
  getPersonnelAssignedToRoom,
  createRoomAssignment,
};
