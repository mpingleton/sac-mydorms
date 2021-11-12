const { ExtractJwt } = require('passport-jwt');

const { authService } = require('@/services');
const eventService = require('@/services/event.service');

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

module.exports = {
  getEvents,
  getEventById,
  createEvent,
};