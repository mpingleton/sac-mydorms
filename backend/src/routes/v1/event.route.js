const express = require('express');

const auth = require('@/middlewares/auth');
const validate = require('@/middlewares/validate');
const eventController = require('@/controllers/event.controller');
const eventValidation = require('@/validations/event.validation');
const dormManagerGatekeeper = require('@/gatekeepers/dormmanager.gatekeeper');

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
  dormManagerGatekeeper.isDormManager,
  validate(eventValidation.createEvent),
  eventController.createEvent,
);

router.post(
  '/response',
  auth(),
  validate(eventValidation.setResponse),
  eventController.setResponse,
);

module.exports = router;
