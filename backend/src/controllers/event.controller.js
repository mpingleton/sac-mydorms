const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const eventService = require('@/services/event.service');
const enrollmentService = require('@/services/enrollment.service');

const getEvents = async (req, res) => {
  const events = await eventService.getEvents();
  res.send(200, events);
};

const getEventById = async (req, res) => {
  const evnt = await eventService.getEventById(parseInt(req.params.id, 10));
  res.send(200, evnt);
};

const createEvent = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  await eventService.createEvent(
    user.id,
    req.body.scheduled,
    req.body.location,
    req.body.subject,
    req.body.description,
  );
  res.send(200);
};

const setResponse = async (req, res) => {
  const user = await authService.me(ExtractJwt.fromAuthHeaderAsBearerToken()(req));

  const enrollment = await enrollmentService.getEnrollmentByUserId(user.id);
  if (enrollment === null) {
    res.send(500);
  } else {
    await eventService.setResponse(
      req.body.eventId,
      enrollment.personnel_id,
      req.body.responseCode,
    );
    res.send(200);
  }
};

const getResponseCountForEvent = async (req, res) => {
  const responses = await eventService.getResponsesForEvent(req.params.event_id);
  const responseObject = {
    going: 0,
    notGoing: 0,
  };

  responses.map((response) => {
    if (response.response_code === 0) {
      responseObject.notGoing += 1;
    } else if (response.response_code === 1) {
      responseObject.going += 1;
    }

    return response.response_code;
  });

  res.send(200, responseObject);
};

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  setResponse,
  getResponseCountForEvent,
};
