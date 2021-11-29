const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const roomController = require('@/controllers/room.controller');
const roomValidation = require('@/validations/room.validation');
const dormManagerGatekeeper = require('@/gatekeepers/dormmanager.gatekeeper');

const router = express.Router();

router.get(
  '/',
  auth(),
  dormManagerGatekeeper.isDormManager,
  roomController.getRooms,
);

router.get(
  '/in/building/:building_id',
  auth(),
  dormManagerGatekeeper.isDormManager,
  validate(roomValidation.getRoomsInBuilding),
  roomController.getRoomsInBuilding,
);

router.get(
  '/:id',
  auth(),
  dormManagerGatekeeper.isDormManager,
  validate(roomValidation.getRoomById),
  roomController.getRoomById,
);

module.exports = router;
