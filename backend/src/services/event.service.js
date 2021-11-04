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

module.exports = {
  getEvents,
  getEventById,
};
