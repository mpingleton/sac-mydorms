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
  '/base/:base_id',
  auth(),
  validate(eventValidation.getEventsByBase),
  eventController.getEventsByBase,
);

router.get(
  '/mybase',
  auth(),
  eventController.getEventsAtMyBase,
);

router.get(
  '/createdby/:personnel_id',
  auth(),
  validate(eventValidation.getEventsCreatedBy),
  eventController.getEventsCreatedBy,
);

router.get(
  '/createdbyme',
  auth(),
  eventController.getEventsCreatedByMe,
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
