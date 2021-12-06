const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getEvents = async () => {
  const events = await prisma.events.findMany({});
  return events;
};

const getEventsByBase = async (baseId) => {
  const events = await prisma.events.findMany({
    where: {
      base_id: baseId,
    },
  });

  return events;
};

const getEventsByCreator = async (personnelId) => {
  const events = await prisma.events.findMany({
    where: {
      created_by: personnelId,
    },
  });

  return events;
};

const getUpcomingEvents = async (baseId) => {
  const events = await prisma.events.findMany({
    where: {
      base_id: baseId,
      scheduled: {
        gt: new Date(),
      },
    },
  });

  return events;
};

const getEventById = async (id) => {
  const evnt = await prisma.events.findUnique({
    where: {
      id,
    },
  });

  return evnt;
};

const createEvent = async (
  baseId,
  createdBy,
  scheduled,
  location,
  subject,
  description,
) => {
  const data = {
    base_id: baseId,
    created_by: createdBy,
    scheduled,
    location,
    subject,
    description,
  };

  await prisma.events.create({ data });
};

const setResponse = async (
  eventId,
  personnelId,
  responseCode,
) => {
  const existingResponse = await prisma.eventResponses.findMany({
    where: {
      event_id: eventId,
      personnel_id: personnelId,
    },
  });
  if (existingResponse.length > 0) {
    await prisma.eventResponses.updateMany({
      where: {
        event_id: eventId,
        personnel_id: personnelId,
      },
      data: {
        response_code: responseCode,
      },
    });
  } else {
    await prisma.eventResponses.create({
      data: {
        event_id: eventId,
        personnel_id: personnelId,
        response_code: responseCode,
      },
    });
  }
};

const getResponsesForEvent = async (eventId) => {
  const responses = await prisma.eventResponses.findMany({
    where: {
      event_id: eventId,
    },
  });

  return responses;
};

module.exports = {
  getEvents,
  getEventsByBase,
  getEventsByCreator,
  getUpcomingEvents,
  getEventById,
  createEvent,
  setResponse,
  getResponsesForEvent,
};
