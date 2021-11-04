const eventService = require('@/services/event.service');

const getEvents = async (req, res) => {
  const events = await eventService.getEvents();
  res.send(200, events);
};

const getEventById = async (req, res) => {
  const evnt = await eventService.getEventById(parseInt(req.params.id, 10));
  res.send(200, evnt);
};

module.exports = {
  getEvents,
  getEventById,
};
