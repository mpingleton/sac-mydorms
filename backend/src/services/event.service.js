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

module.exports = {
  getEvents,
  getEventById,
  createEvent,
};
