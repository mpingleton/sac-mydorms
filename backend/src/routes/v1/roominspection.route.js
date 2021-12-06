const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const roomInspectionController = require('@/controllers/roominspection.controller');
const roomInspectionValidation = require('@/validations/roominspection.validation');
const dormManagerGatekeeper = require('@/gatekeepers/dormmanager.gatekeeper');

const router = express.Router();

router.get(
  '/',
  auth(),
  roomInspectionController.getRoomInspections,
);

router.get(
  '/my',
  auth(),
  roomInspectionController.getMyRoomInspections,
);

router.get(
  '/resident/:personnel_id',
  auth(),
  validate(roomInspectionValidation.getRoomInspectionsForResident),
  roomInspectionController.getRoomInspectionsForResident,
);

router.get(
  '/room/:room_id',
  auth(),
  validate(roomInspectionValidation.getRoomInspectionsForRoom),
  roomInspectionController.getRoomInspectionsForRoom,
);

router.get(
  '/createdbyme',
  auth(),
  roomInspectionController.getRoomInspectionsCreatedByMe,
);

router.get(
  '/:id',
  auth(),
  validate(roomInspectionValidation.getRoomInspectionById),
  roomInspectionController.getRoomInspectionById,
);

router.put(
  '/',
  auth(),
  dormManagerGatekeeper.isDormManager,
  validate(roomInspectionValidation.createRoomInspection),
  roomInspectionController.createRoomInspection,
);

module.exports = router;
