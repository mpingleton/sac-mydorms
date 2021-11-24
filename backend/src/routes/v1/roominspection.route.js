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
