const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const roomController = require('@/controllers/room.controller');
const roomValidation = require('@/validations/room.validation');

const router = express.Router();

router.get(
  '/',
  auth(),
  roomController.getRooms,
);

router.get(
  '/:id',
  auth(),
  validate(roomValidation.getRoomById),
  roomController.getRoomById,
);

module.exports = router;
