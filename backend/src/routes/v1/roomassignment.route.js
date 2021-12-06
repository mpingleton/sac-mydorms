const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const roomAssignmentController = require('@/controllers/roomassignment.controller');
const roomAssignmentValidation = require('@/validations/roomassignment.validation');
const dormManagerGatekeeper = require('@/gatekeepers/dormmanager.gatekeeper');

const router = express.Router();

router.get(
  '/',
  auth(),
  dormManagerGatekeeper.isDormManager,
  roomAssignmentController.getRoomAssignments,
);

router.get(
  '/personnel/:personnel_id',
  auth(),
  validate(roomAssignmentValidation.getRoomAssignmentsForPersonnel),
  roomAssignmentController.getRoomAssignmentsForPersonnel,
);

router.get(
  '/room/:room_id',
  auth(),
  validate(roomAssignmentValidation.getPersonnelAssignedToRoom),
  roomAssignmentController.getPersonnelAssignedToRoom,
);

router.put(
  '/:personnel_id/:room_id',
  auth(),
  dormManagerGatekeeper.isDormManager,
  validate(roomAssignmentValidation.createRoomAssignment),
  roomAssignmentController.createRoomAssignment,
);

module.exports = router;
