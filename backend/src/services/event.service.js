const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getEvents = async () => {
  const events = await prisma.events.findMany({});
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
  createdBy,
  scheduled,
  location,
  subject,
  description,
) => {
  const data = {
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

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  setResponse,
};
