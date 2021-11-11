const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const eventController = require('@/controllers/event.controller');
const eventValidation = require('@/validations/event.validation');

const router = express.Router();

router.get(
  '/',
  auth(),
  eventController.getEvents,
);

router.get(
  '/id/:id',
  auth(),
  validate(eventValidation.getEventById),
  eventController.getEventById,
);

router.put(
  '/',
  auth(),
  validate(eventValidation.createEvent),
  eventController.createEvent,
);

module.exports = router;
